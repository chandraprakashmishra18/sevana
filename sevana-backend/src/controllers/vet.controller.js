const pool = require('../db/db');
const { nearbyClause } = require('../utils/geo');
const { success, fail } = require("../shared/response");

// GET /api/vets?lat=&lng=&radius=&service=
async function listVets(req, res) {
  const lat = parseFloat(req.query.lat);
  const lng = parseFloat(req.query.lng);
  const radius = parseFloat(req.query.radius) || 5;

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

  const where = conditions.length
    ? `WHERE ${conditions.join(" AND ")}`
    : "";

  const { rows } = await pool.query(
    `
    SELECT *
    FROM vets
    ${where}
    ORDER BY clinic_name ASC
    LIMIT 50
    `,
    params
  );

  return success(res, { message: "Vets fetched successfully.", data: rows });
}

async function getVet(req, res) {
  const { rows } = await pool.query(`SELECT * FROM vets WHERE id = $1`, [req.params.id]);
  if (!rows.length) return fail(res, { statusCode: 404, message: "Vet not found." });
  return success(res, { message: "Vet fetched successfully.", data: rows[0] });
}

module.exports = { listVets, getVet };
