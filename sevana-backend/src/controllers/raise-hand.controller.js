const { z } = require('zod');
const pool = require('../db/db');
const { nearbyClause } = require('../utils/geo');
const { success, created, fail } = require("../shared/response");

const createAlertSchema = z.object({
  message: z.string().max(300).optional(),
  lat: z.number(),
  lng: z.number(),
  radius_km: z.number().min(0.5).max(20).default(2),
});

// POST /api/raise-hand - general "Alert nearby" quick action (not tied to a report)
async function createAlert(req, res) {
  const parsed = createAlertSchema.safeParse(req.body);
  if (!parsed.success) return fail(res, { statusCode: 400, message: "Validation failed." });
  const { message, lat, lng, radius_km } = parsed.data;

  const { rows } = await pool.query(
    `INSERT INTO raise_hand_alerts (user_id, message, lat, lng, radius_km)
     VALUES ($1,$2,$3,$4,$5) RETURNING *`,
    [req.user.id, message || null, lat, lng, radius_km]
  );
  return created(res, { message: "Alert created successfully.", data: rows[0] });
}

// GET /api/raise-hand/nearby?lat=&lng=
async function nearbyAlerts(req, res) {
  const lat = parseFloat(req.query.lat);
  const lng = parseFloat(req.query.lng);
  if (Number.isNaN(lat) || Number.isNaN(lng)) {
    return fail(res, { statusCode: 400, message: "lat and lng are required." });
  }

  const geo = nearbyClause({ lat, lng, radiusKm: 10 }); // wide net, alert.radius_km narrows further below
  const { rows } = await pool.query(
    `SELECT ra.*, u.full_name AS raised_by
     FROM raise_hand_alerts ra
     JOIN users u ON u.id = ra.user_id
     WHERE ra.status = 'active'
       AND ${geo.clause}
       AND earth_distance(ll_to_earth($1,$2), ll_to_earth(ra.lat, ra.lng)) <= ra.radius_km * 1000
     ORDER BY ra.created_at DESC
     LIMIT 50`,
    geo.params
  );
  return success(res, { message: "Nearby alerts fetched successfully.", data: rows });
}

module.exports = { createAlert, nearbyAlerts };
