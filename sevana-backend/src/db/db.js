const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function verifyConnection() {
  try {
    const result = await pool.query(
      "SELECT current_user, current_database()"
    );

    console.log("✅ PostgreSQL Connected");
    console.table(result.rows);
  } catch (err) {
    console.error("❌ Database Connection Failed");
    console.error(err.message);
    process.exit(1);
  }
}

verifyConnection();

module.exports = pool;
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