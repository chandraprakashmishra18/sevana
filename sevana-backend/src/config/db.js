const { Pool } = require("pg");
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// rest of the file...

pool
  .query("SELECT current_user, current_database()")
  .then((res) => {
    console.log("✅ PostgreSQL Connected");
    console.log(res.rows[0]);
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