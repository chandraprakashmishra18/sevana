require("dotenv").config();
const { Client } = require("pg");

async function test() {
  console.log("DATABASE_URL:", process.env.DATABASE_URL);

  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    await client.connect();
    console.log("✅ Connected");

    const result = await client.query(
      "SELECT current_user, current_database()"
    );

    console.log(result.rows);

    await client.end();
  } catch (err) {
    console.error("❌ Connection failed");
    console.error(err);
  }
}

test();