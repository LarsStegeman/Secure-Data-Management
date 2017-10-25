var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'password',
});

connection.connect();

//Drop old database
connection.query("DROP DATABASE IF EXISTS PatientHealthData;", function (err, result) {
    if (err) throw err;
	console.log("Dropped database");
});

//Create new database
connection.query("CREATE DATABASE PatientHealthData;", function (err, result) {
    if (err) throw err;
    console.log("Database created");
});

connection.end();



