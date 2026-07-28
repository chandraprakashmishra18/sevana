const pool = require('../db/db');
const { nearbyClause } = require('../utils/geo');
const { success, fail } = require("../shared/response");

// GET /api/v1/ngos?lat=&lng=&radius=
async function listNGOs(req, res) {
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

  const where =
    conditions.length > 0
      ? `WHERE ${conditions.join(" AND ")}`
      : "";

  const { rows } = await pool.query(
    `
      SELECT *
      FROM ngos
      ${where}
      ORDER BY organization_name ASC
      LIMIT 50
    `,
    params
  );

  return success(res, { message: "NGOs fetched successfully.", data: rows });
}

// GET /api/v1/ngos/:id
async function getNGO(req, res) {
  const { rows } = await pool.query(
    `SELECT * FROM ngos WHERE id = $1`,
    [req.params.id]
  );

  if (!rows.length) {
    return fail(res, { statusCode: 404, message: "NGO not found." });
  }

  return success(res, { message: "NGO fetched successfully.", data: rows[0] });
}

module.exports = {
  listNGOs,
  getNGO,
};
