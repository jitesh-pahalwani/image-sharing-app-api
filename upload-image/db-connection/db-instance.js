const mysql = require('mysql');

var dbConnection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

dbConnection.connect(function(err) {
  if (err) throw err;
  console.log("Connected to database!");
});

module.exports = dbConnection;