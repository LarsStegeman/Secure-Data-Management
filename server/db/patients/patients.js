const connection = require('../db');

module.exports.getPatients = function(callback){
  connection.query('SELECT * FROM patient',
    function(err, result){
      callback(err, result);
    });
};

module.exports.getPatientbyID = function(patientID, callback){
  connection.query('SELECT * FROM patient WHERE patientID = :id',
    {
      id: patientID
    },
    function(err, result){
      callback(err, result);
    });
};

module.exports.getDoctors = function(patientID, callback){
  connection.query('SELECT * FROM patientdoctor WHERE patientID = :id',
  {
    id: patientID
  },
  function(err, result){
    callback(err, result);
  });
};

module.exports.getEmployers = function(patientID, callback){
  connection.query('SELECT * FROM patientemployer WHERE patientID = :id',
  {
    id: patientID
  },
  function(err, result){
    callback(err, result);
  });
};

module.exports.getHelthClubs = function(patientID, callback){
  connection.query('SELECT * FROM patienthealthclub WHERE patientID = :id',
  {
    id: patientID
  },
  function(err, result){
    callback(err, result);
  });
};

module.exports.getHospitals = function(patientID, callback){
  connection.query('SELECT * FROM patienthospital WHERE patientID = :id',
  {
    id: patientID
  },
  function(err, result){
    callback(err, result);
  });
};

module.exports.getInsurances = function(patientID, callback){
  connection.query('SELECT * FROM patientinsurance WHERE patientID = :id',
  {
    id: patientID
  },
  function(err, result){
    callback(err, result);
  });
};
