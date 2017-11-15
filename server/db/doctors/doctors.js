const connection = require('../db');

module.exports.getDoctors = function(callback){
  connection.query('SELECT * FROM doctor',
    function(err, result){
      callback(err, result);
    });
};

module.exports.getDoctorbyID = function(doctorID, callback){
  connection.query('SELECT * FROM patient WHERE doctorID = :id',
    {
      id: doctorID
    },
    function(err, result){
      callback(err, result);
    });
};

module.exports.getPacients = function(doctorID, callback){
  connection.query('SELECT * FROM patientdoctor WHERE doctorID = :id',
  {
    id: doctorID
  },
  function(err, result){
    callback(err, result);
  });
};

module.exports.getHospitals = function(doctorID, callback){
  connection.query('SELECT * FROM doctorhospital WHERE doctorID = :id',
  {
    id: doctorID
  },
  function(err, result){
    callback(err, result);
  });
};
