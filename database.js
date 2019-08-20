const util = require("util"); // from "util";
const mysql = require("mysql");

let connectionPool = null;

console.log(process.env.NODE_ENV);

if (process.env.NODE_ENV === "production") {
  console.log("Your in Production Env");
  connectionPool = mysql.createPool({
    //connectionLimit: process.env.prodConnectionLimit,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    socketPath: `/cloudsql/${process.env.MYSQLDB_INSTANCE_NAME}`
  });
} else {
  console.log("Your in Development Env");
  connectionPool = mysql.createPool({
    //connectionLimit: process.env.prodConnectionLimit,
    host: process.env.MYSQLDB_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
  });

  connectionPool.on("error", function(err) {
    console.log("[mysql error]", err);
  });
}

connectionPool.query = util.promisify(connectionPool.query);
module.exports = connectionPool;

//======================================================
