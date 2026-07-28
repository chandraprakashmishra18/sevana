const pool = require("../db/db");
const { nearbyClause } = require("../utils/geo");

// GET /api/users/me/stats - "3 Active / 5 Vets Nearby / 7 My Rescues" on Home
async function myStats(req, res) {
  const { lat, lng } = req.query;
  const latitude = Number(lat);
  const longitude = Number(lng);
  const hasLocation = Number.isFinite(latitude) && Number.isFinite(longitude);
  const geo = hasLocation
    ? nearbyClause({ lat: latitude, lng: longitude, radiusKm: 5 })
    : null;

  const [active, mine, vetsNearby] = await Promise.all([
    pool.query(
      `SELECT COUNT(*) FROM animal_reports
       WHERE status IN (
         'reported',
         'responders_joining',
         'responder_on_site',
         'first_aid_given',
         'transport_in_progress',
         'at_veterinary_clinic',
         'under_treatment',
         'recovering'
       )`,
    ),
    pool.query(
      `SELECT COUNT(*) FROM (
         SELECT id FROM animal_reports WHERE reported_by = $1
         UNION
         SELECT report_id FROM rescues WHERE volunteer_id = $1
       ) t`,
      [req.user.id],
    ),
    geo
      ? pool.query(`SELECT COUNT(*) FROM vets WHERE ${geo.clause}`, geo.params)
      : Promise.resolve({ rows: [{ count: 0 }] }),
  ]);

  res.json({
    active: Number(active.rows[0].count),
    myRescues: Number(mine.rows[0].count),
    vetsNearby: Number(vetsNearby.rows[0].count),
  });
}

module.exports = { myStats };
