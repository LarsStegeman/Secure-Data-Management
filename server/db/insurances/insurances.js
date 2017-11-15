const connection = require('../db');

module.exports.getInsurances = function(callback){
  connection.query('SELECT * FROM insurance',
    function(err, result){
      callback(err, result);
    });
};

module.exports.getInsurancesbyID = function(insuranceID, callback){
  connection.query('SELECT * FROM insurance WHERE insuranceID = :id',
    {
      id: insuranceID
    },
    function(err, result){
      callback(err, result);
    });
};

module.exports.getPacients = function(insuranceID, callback){
  connection.query('SELECT * FROM patientinsurance WHERE insuranceID = :id',
  {
    id: insuranceID
  },
  function(err, result){
    callback(err, result);
  });
};
