const { Pool } = require("pg");

const pool = new Pool({
  host: "127.0.0.1",
  port: 5432,
  user: "sevana_user",
  password: "sevana_pass",
  database: "sevana_db",
});

pool
  .query("SELECT current_user, current_database()")
  .then((res) => {
    console.log("✅ Connected:", res.rows[0]);
  })
  .catch((err) => {
    console.error("❌ PostgreSQL Connection Failed");
    console.error(err);
  });

pool.on("error", (err) => {
  console.error("Unexpected PostgreSQL Error:", err);
  process.exit(1);
});

module.exports = pool;