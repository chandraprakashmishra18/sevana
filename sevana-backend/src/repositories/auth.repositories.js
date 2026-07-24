const pool = require("../config/db");

async function findByEmail(email) {
  const { rows } = await pool.query(
    `SELECT * FROM users WHERE email = $1 LIMIT 1`,
    [email]
  );

  return rows[0] || null;
}

async function findByPhone(phone) {
  const { rows } = await pool.query(
    `SELECT * FROM users WHERE phone = $1 LIMIT 1`,
    [phone]
  );

  return rows[0] || null;
}

async function findByIdentifier(identifier) {
  const { rows } = await pool.query(
    `
    SELECT *
    FROM users
    WHERE email = $1
       OR phone = $1
    LIMIT 1
    `,
    [identifier]
  );

  return rows[0] || null;
}

async function findById(id) {
  const { rows } = await pool.query(
    `
    SELECT *
    FROM users
    WHERE id = $1
    LIMIT 1
    `,
    [id]
  );

  return rows[0] || null;
}

async function createUser({
  full_name,
  email,
  phone,
  password_hash,
  role = "user",
}) {

  const { rows } = await pool.query(
    `
    INSERT INTO users (
      full_name,
      email,
      phone,
      password_hash,
      role
    )
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
    `,
    [
      full_name,
      email,
      phone,
      password_hash,
      role,
    ]
  );

  return rows[0];
}

async function updateLastLogin(id) {
  await pool.query(
    `
    UPDATE users
    SET last_login = NOW()
    WHERE id = $1
    `,
    [id]
  );
}

module.exports = {
  createUser,
  findByEmail,
  findByPhone,
  findByIdentifier,
  findById,
  updateLastLogin,
};
