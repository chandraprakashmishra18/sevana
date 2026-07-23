const fs = require("fs");
const path = require("path");
const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function migrate() {
  const client = await pool.connect();

  try {
    const migrationsDir = path.join(__dirname, "migrations");

    const files = fs
      .readdirSync(migrationsDir)
      .filter((file) => file.endsWith(".sql"))
      .sort();

    console.log("====================================");
    console.log("Running Database Migrations");
    console.log("====================================\n");

    for (const file of files) {
      console.log(`Running ${file}...`);

      const sql = fs.readFileSync(
        path.join(migrationsDir, file),
        "utf8"
      );

      await client.query("BEGIN");

      try {
        await client.query(sql);
        await client.query("COMMIT");

        console.log(`✅ ${file} completed\n`);
      } catch (err) {
        await client.query("ROLLBACK");

        console.error(`❌ Error in ${file}`);
        console.error(err.message);

        process.exit(1);
      }
    }

    console.log("====================================");
    console.log("🎉 All migrations completed!");
    console.log("====================================");
  } finally {
    client.release();
    await pool.end();
  }
}

migrate().catch((err) => {
  console.error(err);
  process.exit(1);
});