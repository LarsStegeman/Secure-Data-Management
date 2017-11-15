const connection = require('../db');

module.exports.getHospitals = function(callback){
  connection.query('SELECT * FROM hospital',
    function(err, result){
      callback(err, result);
    });
};

module.exports.getHospitalbyID = function(hospitalID, callback){
  connection.query('SELECT * FROM hospital WHERE hospitalID = :id',
    {
      id: hospitalID
    },
    function(err, result){
      callback(err, result);
    });
};

module.exports.getDoctors = function(hospitalID, callback){
  connection.query('SELECT * FROM doctorhospital WHERE hospitalID = :id',
  {
    id: hospitalID
  },
  function(err, result){
    callback(err, result);
  });
};

module.exports.getPatients = function(hospitalID, callback){
  connection.query('SELECT * FROM patienthospital WHERE hospitalID = :id',
  {
    id: hospitalID
  },
  function(err, result){
    callback(err, result);
  });
};
