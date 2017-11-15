var net = require('net');

// Get db connection
const db = require('./db/db.js');
const hospital = require('./db/hospitals/hospitals.js');

module.exports.verifyInput = function(data){
  var hospitals = hospital.getHospitals(function(err, result){
    console.log("a");
    if (err) throw err;
    var string = JSON.stringify(result);

    var json = JSON.parse(string);
    console.log(json);

    return json;
  });
};
