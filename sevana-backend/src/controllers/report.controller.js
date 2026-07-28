const { z } = require("zod");
const pool = require("../db/db");
const { nearbyClause } = require("../utils/geo");
const { awardXP } = require("../utils/xp.util");

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
});

// POST /api/v1/reports - "Report Animal" quick action
async function createReport(req, res) {
  const parsed = createReportSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }
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
  } = parsed.data;

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
    return res.status(201).json({ report: rows[0], xpAwarded: xp });
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
  const lat = parseFloat(req.query.lat);
  const lng = parseFloat(req.query.lng);
  const radius = parseFloat(req.query.radius) || 5; // km default
  const { severity, status } = req.query;

  const params = [];
  const conditions = [];

  if (!Number.isNaN(lat) && !Number.isNaN(lng)) {
    const geo = nearbyClause({
      lat,
      lng,
      radiusKm: radius,
      paramOffset: params.length,
    });
    conditions.push(geo.clause);
    params.push(...geo.params);
  }

  if (severity && VALID_SEVERITY.includes(severity)) {
    params.push(severity);
    conditions.push(`severity = $${params.length}`);
  }

  if (status && VALID_STATUS.includes(status)) {
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

  return res.json({ reports: rows });
}

async function getReport(req, res) {
  const { rows } = await pool.query(
    `SELECT ar.*, u.full_name AS reporter_name
     FROM animal_reports ar JOIN users u ON u.id = ar.reported_by
     WHERE ar.id = $1`,
    [req.params.id],
  );
  if (!rows.length) {
    return res.status(404).json({ error: "Report not found" });
  }

  return res.json({ report: rows[0] });
}

const statusSchema = z.object({ status: z.enum(VALID_STATUS) });

// PATCH /api/v1/reports/:id/status - dispatch/acknowledge/rescue progression
async function updateStatus(req, res) {
  const parsed = statusSchema.safeParse(req.body);
  if (!parsed.success)
    return res.status(400).json({ error: parsed.error.flatten() });

  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const { rows } = await client.query(
      `UPDATE animal_reports SET status = $1, updated_at = now()
       WHERE id = $2 RETURNING *`,
      [parsed.data.status, req.params.id],
    );
    if (!rows.length) {
      await client.query("ROLLBACK");
      return res.status(404).json({ error: "Report not found" });
    }

    let xp = null;
    if (parsed.data.status === "rescued") {
      // Award XP to everyone who responded to this report, not just the reporter
      const { rows: responders } = await client.query(
        `SELECT volunteer_id FROM rescues WHERE report_id = $1`,
        [req.params.id],
      );
      for (const r of responders) {
        await awardXP(client, {
          userId: r.volunteer_id,
          reason: "rescue_confirmed",
          refTable: "animal_reports",
          refId: req.params.id,
        });
      }
      xp = { awardedTo: responders.length };
    }

    await client.query("COMMIT");
    return res.json({ report: rows[0], xp });
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
  const parsed = respondSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const existing = await client.query(
      `SELECT id FROM animal_reports WHERE id = $1`,
      [req.params.id],
    );

    if (!existing.rows.length) {
      await client.query("ROLLBACK");
      return res.status(404).json({ error: "Report not found" });
    }

    const existingRescue = await client.query(
      `SELECT id
       FROM rescues
       WHERE report_id = $1
         AND volunteer_id = $2`,
      [req.params.id, req.user.id],
    );

    if (existingRescue.rows.length) {
      await client.query("ROLLBACK");
      return res.status(409).json({
        error: "You already responded to this report",
      });
    }

    const inserted = await client.query(
      `INSERT INTO rescues (report_id, volunteer_id, notes)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [req.params.id, req.user.id, parsed.data.notes || null],
    );

    // Bump status to acknowledged if it was just reported
    await client.query(
      `UPDATE animal_reports
       SET status = 'responders_joining',
           updated_at = now()
       WHERE id = $1
         AND status = 'reported'`,
      [req.params.id],
    );

    const xp = await awardXP(client, {
      userId: req.user.id,
      reason: "raise_hand_responded",
      refTable: "animal_reports",
      refId: req.params.id,
    });

    await client.query("COMMIT");

    return res.status(201).json({
      response: inserted.rows[0],
      xpAwarded: xp,
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
