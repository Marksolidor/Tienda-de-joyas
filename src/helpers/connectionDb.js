const { Pool } = require("pg");
require("dotenv").config();
const format = require("pg-format");
console.log(process.env.PASSWORD);
const pool = new Pool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  allowExitOnIdle: true,
});

module.exports = { pool, format };
