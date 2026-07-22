const { Pool } = require("pg");

const pool = new Pool({
  host: "127.0.0.1",
  port: 5432,
  user: "sevana",
  password: "sevana123",
  database: "sevana",
});

// Test the database connection
pool
  .query("SELECT current_user, current_database()")
  .then((res) => {
    console.log("✅ Connected to PostgreSQL");
    console.log("User:", res.rows[0].current_user);
    console.log("Database:", res.rows[0].current_database);
  })
  .catch((err) => {
    console.error("❌ PostgreSQL Connection Failed");
    console.error(err.message);
  });

pool.on("error", (err) => {
  console.error("Unexpected PostgreSQL Error:", err);
  process.exit(1);
});

module.exports = pool;