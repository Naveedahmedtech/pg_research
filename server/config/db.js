const { Pool } = require("pg");
require("dotenv").config();
const fs = require("fs");
const path = require("path");

console.log(process.env.USER);
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

pool.on("error", (err) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});

pool.connect((err, client, release) => {
  if (err) {
    console.error("Error connecting to database:", err);
  } else {
    console.log("Connected to database successfully");

    release();
  }
});

//   const initSql = fs.readFileSync("/models/init.sql").toString();
const initSqlPath = path.join(__dirname, "../models", "init.sql");
const initSql = fs.readFileSync(initSqlPath).toString();

pool.query(initSql, (err, result) => {
  if (!err) {
    console.log("All Database tables Initialilzed successfully : ");
    // console.log(result)
  } else {
    console.log("Error Occurred While Initializing Database tables");
    console.log(err);
  }
});

module.exports = { pool };
