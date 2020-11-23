const mysql = require('mysql');

// Create an instance of the MySQL DB Connection.
var dbConnection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Attempt to connect to the MySQL DB Connection.
dbConnection.connect(function(err) {
  if (err) throw err;
  console.log("Connected to database!");
});

module.exports = dbConnection;