// // const { Pool } = require('pg');
// // require('dotenv').config();

// // const pool = new Pool({
// //   connectionString: process.env.DATABASE_URL,
// // });

// // pool.on('error', (err) => {
// //   console.error('Unexpected error on idle Postgres client', err);
// //   process.exit(1);
// // });

// // module.exports = pool;
// const { Pool } = require("pg");
// require("dotenv").config();

// console.log("DATABASE_URL from Node:");
// console.log(process.env.DATABASE_URL);

// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
// });

// pool
//   .query("SELECT current_user, current_database()")
//   .then((res) => {
//     console.log("Connected as:", res.rows[0]);
//   })
//   .catch((err) => {
//     console.error("Database connection failed:");
//     console.error(err);
//   });

// module.exports = pool;

const { Pool } = require("pg");
require("dotenv").config();

console.log("=== DATABASE_URL ===");
console.log(process.env.DATABASE_URL);
console.log("====================");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool
  .query("SELECT current_user, current_database()")
  .then((res) => {
    console.log("Connected as:", res.rows[0]);
  })
  .catch((err) => {
    console.error("Database connection failed:");
    console.error(err);
  });

module.exports = pool;