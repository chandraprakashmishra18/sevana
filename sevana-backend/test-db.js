const { Client } = require("pg");

const client = new Client({
  host: "127.0.0.1",
  port: 5432,
  user: "sevana_user",
  password: "sevana_pass",
  database: "sevana_db",
});

(async () => {
  try {
    await client.connect();
    console.log("✅ Connected successfully!");

    const res = await client.query(
      "SELECT current_user, current_database()"
    );

    console.log(res.rows[0]);
    await client.end();
  } catch (err) {
    console.error(err);
  }
})();