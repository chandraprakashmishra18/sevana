require('dotenv').config();
const app = require('./app');

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Sevana Animal Rescue backend running on port ${PORT}`);
});
const pool = require("./config/db");

async function verifyDatabase() {
  try {
    const result = await pool.query(
      "SELECT current_user, current_database()"
    );

    console.log("✅ Connected to PostgreSQL");
    console.table(result.rows);
  } catch (err) {
    console.error("❌ Database connection failed");
    console.error(err.message);
    process.exit(1);
  }
}

verifyDatabase();
