const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function ensureMigrationTable(client) {
  await client.query(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      id SERIAL PRIMARY KEY,
      filename TEXT UNIQUE NOT NULL,
      checksum TEXT NOT NULL,
      executed_at TIMESTAMPTZ DEFAULT NOW()
    );
  `);
}

function checksum(content) {
  return crypto.createHash("sha256").update(content).digest("hex");
}

async function migrate() {
  const client = await pool.connect();

  try {
    await ensureMigrationTable(client);

    const migrationsDir = path.join(__dirname, "migrations");

    const files = fs
      .readdirSync(migrationsDir)
      .filter(f => f.endsWith(".sql"))
      .sort();

    console.log("====================================");
    console.log("Running Database Migrations");
    console.log("====================================\n");

    for (const file of files) {

      const sql = fs.readFileSync(
        path.join(migrationsDir, file),
        "utf8"
      );

      const hash = checksum(sql);

      const existing = await client.query(
        `SELECT checksum
         FROM schema_migrations
         WHERE filename = $1`,
        [file]
      );

      if (existing.rowCount > 0) {

        if (existing.rows[0].checksum !== hash) {
          throw new Error(
            `Migration "${file}" was modified after execution.`
          );
        }

        console.log(`⏭️  Skipped ${file}`);
        continue;
      }

      console.log(`▶ Running ${file}`);

      await client.query("BEGIN");

      try {

        await client.query(sql);

        await client.query(
          `INSERT INTO schema_migrations(filename, checksum)
           VALUES($1,$2)`,
          [file, hash]
        );

        await client.query("COMMIT");

        console.log(`✅ Executed ${file}\n`);

      } catch (err) {

        await client.query("ROLLBACK");

        throw err;
      }
    }

    console.log("\n====================================");
    console.log("Database is up to date.");
    console.log("====================================");

  } finally {

    client.release();
    await pool.end();

  }
}

migrate().catch(err => {

  console.error("\n❌ Migration Failed");
  console.error(err.message);

  process.exit(1);

});