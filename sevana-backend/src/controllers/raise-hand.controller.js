const { z } = require('zod');
const pool = require('../config/db');
const { nearbyClause } = require('../utils/geo');

const createAlertSchema = z.object({
  message: z.string().max(300).optional(),
  lat: z.number(),
  lng: z.number(),
  radius_km: z.number().min(0.5).max(20).default(2),
});

// POST /api/raise-hand - general "Alert nearby" quick action (not tied to a report)
async function createAlert(req, res) {
  const parsed = createAlertSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  const { message, lat, lng, radius_km } = parsed.data;

  const { rows } = await pool.query(
    `INSERT INTO raise_hand_alerts (user_id, message, lat, lng, radius_km)
     VALUES ($1,$2,$3,$4,$5) RETURNING *`,
    [req.user.id, message || null, lat, lng, radius_km]
  );
  res.status(201).json({ alert: rows[0] });
}

// GET /api/raise-hand/nearby?lat=&lng=
async function nearbyAlerts(req, res) {
  const lat = parseFloat(req.query.lat);
  const lng = parseFloat(req.query.lng);
  if (Number.isNaN(lat) || Number.isNaN(lng)) {
    return res.status(400).json({ error: 'lat and lng are required' });
  }

  const geo = nearbyClause({ lat, lng, radiusKm: 10 }); // wide net, alert.radius_km narrows further below
  const { rows } = await pool.query(
    `SELECT ra.*, u.name AS raised_by
     FROM raise_hand_alerts ra
     JOIN users u ON u.id = ra.user_id
     WHERE ra.status = 'active'
       AND ${geo.clause}
       AND earth_distance(ll_to_earth($1,$2), ll_to_earth(ra.lat, ra.lng)) <= ra.radius_km * 1000
     ORDER BY ra.created_at DESC
     LIMIT 50`,
    geo.params
  );
  res.json({ alerts: rows });
}

module.exports = { createAlert, nearbyAlerts };
