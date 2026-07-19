require("dotenv").config();
const { Client } = require("pg");

async function test() {
  const client = new Client({
    host: "127.0.0.1",
    port: 5432,
    user: "sevana_user",
    password: "sevana_pass",
    database: "sevana_db",
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
    console.error(err);
  }
}

test();