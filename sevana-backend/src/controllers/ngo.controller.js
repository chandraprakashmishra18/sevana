const pool = require('../db/db');
const { nearbyClause } = require('../utils/geo');
const { success, fail } = require("../shared/response");
const { idParamSchema, nearbyQuerySchema } = require("../validators/directory.validator");

// GET /api/v1/ngos?lat=&lng=&radius=
async function listNGOs(req, res) {
  const { lat, lng, radius } = nearbyQuerySchema.parse(req.query);

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
  const { id } = idParamSchema.parse(req.params);
  const { rows } = await pool.query(
    `SELECT * FROM ngos WHERE id = $1`,
    [id]
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
