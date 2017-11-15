const mysql = require('mysql');

let connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'password',
  database : 'PatientHealthData'
});

connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;
