const mysql = require('mysql');


// connect to database
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database:"nodepay"
});

con.connect(function(err) {
  if (err) throw err;
});

module.exports = con;
