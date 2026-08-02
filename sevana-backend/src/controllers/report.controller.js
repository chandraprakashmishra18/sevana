const { z } = require("zod");
const pool = require("../db/db");
const { nearbyClause } = require("../utils/geo");
const { awardXP } = require("../utils/xp.util");
const { success, created, fail } = require("../shared/response");

const VALID_SEVERITY = [
  "low",
  "medium",
  "high",
  "critical",
];
const VALID_STATUS = [
  "reported",
  "responders_joining",
  "responder_on_site",
  "first_aid_given",
  "transport_in_progress",
  "at_veterinary_clinic",
  "under_treatment",
  "recovering",
  "rescued",
  "closed",
];
const createReportSchema = z.object({
  animal_type: z.string().min(2).max(50),

  species: z.string().max(100).optional(),

  breed: z.string().max(100).optional(),

  gender: z.enum(["male", "female", "unknown"]).optional(),

  estimated_age: z.string().optional(),

  color: z.string().optional(),

  severity: z.enum(["low", "medium", "high", "critical"]),

  condition: z.string().min(5),

  latitude: z.number(),

  longitude: z.number(),

  address: z.string().optional(),

  city: z.string().optional(),

  state: z.string().optional(),

  landmark: z.string().optional(),

  images: z
    .array(
      z.object({
        url: z.string().url(),
        publicId: z.string(),
      })
    )
    .min(1, "At least one image is required."),
});

const reportIdParamSchema = z.object({ id: z.string().uuid() });
const listReportsQuerySchema = z
  .object({
    lat: z.coerce.number().min(-90).max(90).optional(),
    lng: z.coerce.number().min(-180).max(180).optional(),
    radius: z.coerce.number().positive().max(100).default(5),
    severity: z.enum(VALID_SEVERITY).optional(),
    status: z.enum(VALID_STATUS).optional(),
  })
  .refine((data) => (data.lat === undefined) === (data.lng === undefined), {
    message: "lat and lng must be provided together.",
  });

// POST /api/v1/reports - "Report Animal" quick action
async function createReport(req, res) {
  const {
    animal_type,
    species,
    breed,
    gender,
    estimated_age,
    color,
    severity,
    condition,
    latitude,
    longitude,
    address,
    city,
    state,
    landmark,
    images,
  } = createReportSchema.parse(req.body);

  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const { rows } = await client.query(
      `
INSERT INTO animal_reports
(
reported_by,
animal_type,
species,
breed,
gender,
estimated_age,
color,
severity,
condition,
latitude,
longitude,
address,
city,
state,
landmark
)
VALUES
(
$1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15
)
RETURNING *
`,
      [
        req.user.id,
        animal_type,
        species ?? null,
        breed ?? null,
        gender ?? "unknown",
        estimated_age ?? null,
        color ?? null,
        severity,
        condition,
        latitude,
        longitude,
        address ?? null,
        city ?? null,
        state ?? null,
        landmark ?? null,
      ],
    );

    const xp = await awardXP(client, {
      userId: req.user.id,
      reason: "report_submitted",
      refTable: "animal_reports",
      refId: rows[0].id,
    });

    await client.query("COMMIT");
    return created(res, {
      message: "Animal report created successfully.",
      data: { report: rows[0], xpAwarded: xp },
    });
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
}

// GET /api/v1/reports?lat=&lng=&radius=&severity=&status=
// Powers "Active Near You" feed on Home + RescueFeed screen
async function listReports(req, res) {
  const { lat, lng, radius, severity, status } = listReportsQuerySchema.parse(req.query);

  const params = [];
  const conditions = [];

  if (lat !== undefined && lng !== undefined) {
    const geo = nearbyClause({
      lat,
      lng,
      radiusKm: radius,
      paramOffset: params.length,
    });
    conditions.push(geo.clause);
    params.push(...geo.params);
  }

  if (severity) {
    params.push(severity);
    conditions.push(`severity = $${params.length}`);
  }

  if (status) {
    params.push(status);
    conditions.push(`status = $${params.length}`);
  } else {
    // default: hide closed reports from the live feed
    conditions.push(`status != 'closed'`);
  }

  const where = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";

  const { rows } = await pool.query(
    `SELECT ar.*, u.full_name AS reporter_name,
            (SELECT COUNT(*) FROM rescues rr WHERE rr.report_id = ar.id) AS responder_count
     FROM animal_reports ar
     JOIN users u ON u.id = ar.reported_by
     ${where}
     ORDER BY
       CASE ar.severity
         WHEN 'critical' THEN 0
         WHEN 'high' THEN 1
         WHEN 'medium' THEN 2
         ELSE 3
       END,
       ar.created_at DESC
     LIMIT 100`,
    params,
  );

  return success(res, { message: "Reports fetched successfully.", data: rows });
}

async function getReport(req, res) {
  const { id } = reportIdParamSchema.parse(req.params);
  const { rows } = await pool.query(
    `SELECT ar.*, u.full_name AS reporter_name
     FROM animal_reports ar JOIN users u ON u.id = ar.reported_by
     WHERE ar.id = $1`,
    [id],
  );
  if (!rows.length) {
    return fail(res, { statusCode: 404, message: "Report not found." });
  }

  return success(res, { message: "Report fetched successfully.", data: rows[0] });
}

const statusSchema = z.object({ status: z.enum(VALID_STATUS) });

// PATCH /api/v1/reports/:id/status - dispatch/acknowledge/rescue progression
async function updateStatus(req, res) {
  const { status } = statusSchema.parse(req.body);
  const { id } = reportIdParamSchema.parse(req.params);

  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const { rows } = await client.query(
      `UPDATE animal_reports SET status = $1, updated_at = now()
       WHERE id = $2 RETURNING *`,
      [status, id],
    );
    if (!rows.length) {
      await client.query("ROLLBACK");
      return fail(res, { statusCode: 404, message: "Report not found." });
    }

    let xp = null;
    if (status === "rescued") {
      // Award XP to everyone who responded to this report, not just the reporter
      const { rows: responders } = await client.query(
        `SELECT volunteer_id FROM rescues WHERE report_id = $1`,
        [id],
      );
      for (const r of responders) {
        await awardXP(client, {
          userId: r.volunteer_id,
          reason: "rescue_confirmed",
          refTable: "animal_reports",
          refId: id,
        });
      }
      xp = { awardedTo: responders.length };
    }

    await client.query("COMMIT");
    return success(res, {
      message: "Report status updated successfully.",
      data: { report: rows[0], xp },
    });
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
}

const respondSchema = z.object({
  notes: z.string().max(500).optional(),
});

// POST /api/v1/reports/:id/respond - "Raise Hand" on a specific report
async function respondToReport(req, res) {
  const { notes } = respondSchema.parse(req.body);
  const { id } = reportIdParamSchema.parse(req.params);

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const existing = await client.query(
      `SELECT id FROM animal_reports WHERE id = $1`,
      [id],
    );

    if (!existing.rows.length) {
      await client.query("ROLLBACK");
      return fail(res, { statusCode: 404, message: "Report not found." });
    }

    const existingRescue = await client.query(
      `SELECT id
       FROM rescues
       WHERE report_id = $1
         AND volunteer_id = $2`,
      [id, req.user.id],
    );

    if (existingRescue.rows.length) {
      await client.query("ROLLBACK");
      return fail(res, {
        statusCode: 409,
        message: "You already responded to this report.",
      });
    }

    const inserted = await client.query(
      `INSERT INTO rescues (report_id, volunteer_id, notes)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [id, req.user.id, notes || null],
    );

    // Bump status to acknowledged if it was just reported
    await client.query(
      `UPDATE animal_reports
       SET status = 'responders_joining',
           updated_at = now()
       WHERE id = $1
         AND status = 'reported'`,
      [id],
    );

    const xp = await awardXP(client, {
      userId: req.user.id,
      reason: "raise_hand_responded",
      refTable: "animal_reports",
      refId: id,
    });

    await client.query("COMMIT");

    return created(res, {
      message: "Response to report created successfully.",
      data: { response: inserted.rows[0], xpAwarded: xp },
    });
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
}

module.exports = {
  createReport,
  listReports,
  getReport,
  updateStatus,
  respondToReport,
};
