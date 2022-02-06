const { Pool } = require("pg");
require("dotenv").config();

const connectionString = `postgres://${process.env.USER}:${process.env.PASSWORD}@${process.env.HOST}:${process.env.PGPORT}/${process.env.DATABASE}`;

// const pool = new Pool({
//   user: process.env.USER,
//   password: process.env.PASSWORD,
//   host: process.env.HOST,
//   port: process.env.PORT,
//   database: process.env.DATABASE,
//   ssl: { rejectUnauthorized: false },
// });

const pool = new Pool({
  connectionString: connectionString,
  ssl: { rejectUnauthorized: false },
});

module.exports = pool;
