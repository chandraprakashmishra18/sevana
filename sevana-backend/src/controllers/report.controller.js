const { z } = require('zod');
const pool = require('../config/db');
const { nearbyClause } = require('../utils/geo');
const { awardXP } = require('../utils/xp');

const VALID_SEVERITY = ['critical', 'moderate', 'low'];
const VALID_STATUS = ['reported', 'acknowledged', 'in_progress', 'rescued', 'closed'];
const VALID_BEHAVIOR = ['calm', 'scared', 'aggressive'];

const createReportSchema = z.object({
  species: z.string().max(60).optional(),
  description: z.string().max(1000).optional(),
  photo_url: z.string().url().optional(),
  severity: z.enum(VALID_SEVERITY).default('moderate'),
  behavior: z.enum(VALID_BEHAVIOR).optional(),
  lat: z.number(),
  lng: z.number(),
  address_label: z.string().max(200).optional(),
});

// POST /api/animals - "Report Animal" quick action
async function createReport(req, res) {
  const parsed = createReportSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }
 const {
  species,
  description,
  photo_url,
  severity,
  behavior,
  lat,
  lng,
  address_label,
} = parsed.data;

  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const { rows } = await client.query(
      `INSERT INTO animal_reports
       (
reporter_id,
species,
description,
photo_url,
severity,
behavior,
lat,
lng,
address_label
)
VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
       RETURNING *`,
    [
 req.user.id,
 species || null,
 description || null,
 photo_url || null,
 severity,
 behavior || null,
 lat,
 lng,
 address_label || null
]
    );

    const xp = await awardXP(client, {
      userId: req.user.id,
      reason: 'report_submitted',
      refTable: 'animal_reports',
      refId: rows[0].id,
    });

    await client.query('COMMIT');
    res.status(201).json({ report: rows[0], xpAwarded: xp });
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
}

// GET /api/animals?lat=&lng=&radius=&severity=&status=
// Powers "Active Near You" feed on Home + RescueFeed screen
async function listReports(req, res) {
  const lat = parseFloat(req.query.lat);
  const lng = parseFloat(req.query.lng);
  const radius = parseFloat(req.query.radius) || 5; // km default
  const { severity, status } = req.query;

  const params = [];
  const conditions = [];

  if (!Number.isNaN(lat) && !Number.isNaN(lng)) {
    const geo = nearbyClause({ lat, lng, radiusKm: radius, paramOffset: params.length });
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

  const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';

  const { rows } = await pool.query(
    `SELECT ar.*, u.name AS reporter_name,
            (SELECT COUNT(*) FROM rescue_responses rr WHERE rr.animal_report_id = ar.id) AS responder_count
     FROM animal_reports ar
     JOIN users u ON u.id = ar.reporter_id
     ${where}
     ORDER BY
       CASE ar.severity WHEN 'critical' THEN 0 WHEN 'moderate' THEN 1 ELSE 2 END,
       ar.created_at DESC
     LIMIT 100`,
    params
  );

  res.json({ reports: rows });
}

async function getReport(req, res) {
  const { rows } = await pool.query(
    `SELECT ar.*, u.name AS reporter_name
     FROM animal_reports ar JOIN users u ON u.id = ar.reporter_id
     WHERE ar.id = $1`,
    [req.params.id]
  );
  if (!rows.length) return res.status(404).json({ error: 'Report not found' });
  res.json({ report: rows[0] });
}

const statusSchema = z.object({ status: z.enum(VALID_STATUS) });

// PATCH /api/animals/:id/status - dispatch/acknowledge/rescue progression
async function updateStatus(req, res) {
  const parsed = statusSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const { rows } = await client.query(
      `UPDATE animal_reports SET status = $1, updated_at = now()
       WHERE id = $2 RETURNING *`,
      [parsed.data.status, req.params.id]
    );
    if (!rows.length) {
      await client.query('ROLLBACK');
      return res.status(404).json({ error: 'Report not found' });
    }

    let xp = null;
    if (parsed.data.status === 'rescued') {
      // Award XP to everyone who responded to this report, not just the reporter
      const { rows: responders } = await client.query(
        `SELECT volunteer_id FROM rescue_responses WHERE animal_report_id = $1`,
        [req.params.id]
      );
      for (const r of responders) {
        await awardXP(client, {
          userId: r.volunteer_id,
          reason: 'rescue_confirmed',
          refTable: 'animal_reports',
          refId: req.params.id,
        });
      }
      xp = { awardedTo: responders.length };
    }

    await client.query('COMMIT');
    res.json({ report: rows[0], xp });
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
}

// POST /api/animals/:id/respond - "Raise Hand" on a specific report
// POST /api/animals/:id/respond - "Raise Hand" on a specific report
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
      [req.params.id]
    );

    if (!existing.rows.length) {
      await client.query("ROLLBACK");
      return res.status(404).json({ error: "Report not found" });
    }

    const inserted = await client.query(
      `INSERT INTO rescue_responses (animal_report_id, volunteer_id, note)
       VALUES ($1, $2, $3)
       ON CONFLICT (animal_report_id, volunteer_id) DO NOTHING
       RETURNING *`,
      [
        req.params.id,
        req.user.id,
        parsed.data.note || null,
      ]
    );

    if (!inserted.rows.length) {
      await client.query("ROLLBACK");
      return res.status(409).json({
        error: "You already responded to this report",
      });
    }

    // Bump status to acknowledged if it was just reported
    await client.query(
      `UPDATE animal_reports
       SET status = 'acknowledged',
           updated_at = now()
       WHERE id = $1
         AND status = 'reported'`,
      [req.params.id]
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

// GET /api/users/me/stats - "3 Active / 5 Vets Nearby / 7 My Rescues" on Home
async function myStats(req, res) {
  const { lat, lng } = req.query;

  const [active, mine, vetsNearby] = await Promise.all([
    pool.query(`SELECT COUNT(*) FROM animal_reports WHERE status IN ('reported','acknowledged','in_progress')`),
    pool.query(
      `SELECT COUNT(*) FROM (
         SELECT id FROM animal_reports WHERE reporter_id = $1
         UNION
         SELECT animal_report_id FROM rescue_responses WHERE volunteer_id = $1
       ) t`,
      [req.user.id]
    ),
    lat && lng
      ? pool.query(
          `SELECT COUNT(*) FROM vets WHERE ${nearbyClause({ lat: parseFloat(lat), lng: parseFloat(lng), radiusKm: 5 }).clause}`,
          nearbyClause({ lat: parseFloat(lat), lng: parseFloat(lng), radiusKm: 5 }).params
        )
      : Promise.resolve({ rows: [{ count: 0 }] }),
  ]);

  res.json({
    active: parseInt(active.rows[0].count, 10),
    myRescues: parseInt(mine.rows[0].count, 10),
    vetsNearby: parseInt(vetsNearby.rows[0].count, 10),
  });
}

module.exports = { createReport, listReports, getReport, updateStatus, respondToReport, myStats };
