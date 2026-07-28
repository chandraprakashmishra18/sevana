const pool = require("../db/db");
const { nearbyClause } = require("../utils/geo");

/**
 * GET /api/v1/users/me
 * Returns the logged-in user's profile
 */
async function getMyProfile(req, res) {
  const { rows } = await pool.query(
    `
    SELECT
      id,
      full_name,
      email,
      phone,
      avatar_url,
      role,
      is_verified,
      is_active,
      xp,
      level,
      latitude,
      longitude,
      area,
      city,
      state,
      pincode,
      bio,
      blood_group,
      emergency_contact_name,
      emergency_contact_phone,
      last_login,
      created_at,
      updated_at
    FROM users
    WHERE id = $1
    `,
    [req.user.id]
  );

  if (rows.length === 0) {
    return res.status(404).json({
      success: false,
      message: "User not found.",
    });
  }

  return res.json({
    success: true,
    user: rows[0],
  });
}

/**
 * PATCH /api/v1/users/me
 * Update logged-in user's profile
 */
async function updateMyProfile(req, res) {
  const allowedFields = [
    "full_name",
    "phone",
    "avatar_url",
    "latitude",
    "longitude",
    "area",
    "city",
    "state",
    "pincode",
    "bio",
    "blood_group",
    "emergency_contact_name",
    "emergency_contact_phone",
  ];

  const updates = [];
  const values = [];
  let index = 1;

  for (const field of allowedFields) {
    if (req.body[field] !== undefined) {
      updates.push(`${field} = $${index++}`);
      values.push(req.body[field]);
    }
  }

  if (updates.length === 0) {
    return res.status(400).json({
      success: false,
      message: "No valid fields provided for update.",
    });
  }

  updates.push("updated_at = NOW()");
  values.push(req.user.id);

  const { rows } = await pool.query(
    `
    UPDATE users
    SET ${updates.join(", ")}
    WHERE id = $${index}
    RETURNING
      id,
      full_name,
      email,
      phone,
      avatar_url,
      role,
      is_verified,
      is_active,
      xp,
      level,
      latitude,
      longitude,
      area,
      city,
      state,
      pincode,
      bio,
      blood_group,
      emergency_contact_name,
      emergency_contact_phone,
      last_login,
      created_at,
      updated_at
    `,
    values
  );

  return res.json({
    success: true,
    message: "Profile updated successfully.",
    user: rows[0],
  });
}

/**
 * GET /api/v1/users/me/stats
 * Powers the 3 stat tiles on HomeScreen
 */
async function myStats(req, res) {
  const { lat, lng } = req.query;

  const latitude = Number(lat);
  const longitude = Number(lng);

  const hasLocation =
    Number.isFinite(latitude) && Number.isFinite(longitude);

  const geo = hasLocation
    ? nearbyClause({
        lat: latitude,
        lng: longitude,
        radiusKm: 5,
      })
    : null;

  const [active, mine, vetsNearby] = await Promise.all([
    pool.query(
      `
      SELECT COUNT(*) FROM animal_reports
      WHERE status IN (
        'reported',
        'responders_joining',
        'responder_on_site',
        'first_aid_given',
        'transport_in_progress',
        'at_veterinary_clinic',
        'under_treatment',
        'recovering'
      )
      `
    ),

    pool.query(
      `
      SELECT COUNT(*) FROM (
        SELECT id
        FROM animal_reports
        WHERE reported_by = $1

        UNION

        SELECT report_id
        FROM rescues
        WHERE volunteer_id = $1
      ) t
      `,
      [req.user.id]
    ),

    geo
      ? pool.query(
          `SELECT COUNT(*) FROM vets WHERE ${geo.clause}`,
          geo.params
        )
      : Promise.resolve({
          rows: [{ count: 0 }],
        }),
  ]);

  return res.json({
    success: true,
    data: {
      active: Number(active.rows[0].count),
      myRescues: Number(mine.rows[0].count),
      vetsNearby: Number(vetsNearby.rows[0].count),
    },
  });
}

module.exports = {
  getMyProfile,
  updateMyProfile,
  myStats,
};