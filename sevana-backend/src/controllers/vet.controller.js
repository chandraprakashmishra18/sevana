const pool = require('../db/db');
const { nearbyClause } = require('../utils/geo');
const { success, fail } = require("../shared/response");
const { idParamSchema, nearbyQuerySchema } = require("../validators/directory.validator");

// GET /api/vets?lat=&lng=&radius=&service=
async function listVets(req, res) {
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
  const { id } = idParamSchema.parse(req.params);
  const { rows } = await pool.query(`SELECT * FROM vets WHERE id = $1`, [id]);
  if (!rows.length) return fail(res, { statusCode: 404, message: "Vet not found." });
  return success(res, { message: "Vet fetched successfully.", data: rows[0] });
}

module.exports = { listVets, getVet };
