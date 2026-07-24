const pool = require('../config/db');
const { nearbyClause } = require('../utils/geo');

// GET /api/vets?lat=&lng=&radius=&service=
async function listVets(req, res) {
  const lat = parseFloat(req.query.lat);
  const lng = parseFloat(req.query.lng);
  const radius = parseFloat(req.query.radius) || 5;
  const { service } = req.query;

  const params = [];
  const conditions = [];

  if (!Number.isNaN(lat) && !Number.isNaN(lng)) {
    const geo = nearbyClause({ lat, lng, radiusKm: radius, paramOffset: params.length });
    conditions.push(geo.clause);
    params.push(...geo.params);
  }

  if (service) {
    params.push(service);
    conditions.push(`$${params.length} = ANY(services)`);
  }

  const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';

  const { rows } = await pool.query(
    `SELECT * FROM vets ${where} ORDER BY is_verified DESC, rating DESC NULLS LAST LIMIT 50`,
    params
  );
  res.json({ vets: rows });
}

async function getVet(req, res) {
  const { rows } = await pool.query(`SELECT * FROM vets WHERE id = $1`, [req.params.id]);
  if (!rows.length) return res.status(404).json({ error: 'Vet not found' });
  res.json({ vet: rows[0] });
}

module.exports = { listVets, getVet };
