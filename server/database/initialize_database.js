var mysql      = require('mysql');
var fs 	       = require('fs');
//Connect to database
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'password',
  database : 'PatientHealthData',
  multipleStatements: true,
});

connection.connect();

var sql = fs.readFileSync('sdm_project.sql').toString();

connection.query(sql, function (err, result) {
  if (err) throw err;
  console.log("Tables created");
});

connection.end();

