// Builds the WHERE fragment + params for "within radius_km of (lat,lng)"
// using the earthdistance/cube extensions enabled in schema.sql.
// earth_box + ll_to_earth lets Postgres use the gist index for a fast
// bounding-box filter before the exact distance check.
function nearbyClause({ lat, lng, radiusKm, paramOffset = 0 }) {
  const p1 = paramOffset + 1;
  const p2 = paramOffset + 2;
  const p3 = paramOffset + 3;

  return {
    clause: `earth_box(ll_to_earth($${p1}, $${p2}), $${p3} * 1000) @> ll_to_earth(lat, lng)
             AND earth_distance(ll_to_earth($${p1}, $${p2}), ll_to_earth(lat, lng)) <= $${p3} * 1000`,
    params: [lat, lng, radiusKm],
  };
}

module.exports = { nearbyClause };
