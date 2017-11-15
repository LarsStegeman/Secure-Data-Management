const connection = require('../db');

module.exports.getEmployers = function(callback){
  connection.query('SELECT * FROM employer',
    function(err, result){
      callback(err, result);
    });
};

module.exports.getEmployerbyID = function(employerID, callback){
  connection.query('SELECT * FROM employer WHERE employerID = :id',
    {
      id: employerID
    },
    function(err, result){
      callback(err, result);
    });
};

module.exports.getPacients = function(employerID, callback){
  connection.query('SELECT * FROM patientemployer WHERE employerID = :id',
  {
    id: employerID
  },
  function(err, result){
    callback(err, result);
  });
};
