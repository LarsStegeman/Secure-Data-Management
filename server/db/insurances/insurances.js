const connection = require('../db');

//get all insurances in db
module.exports.getInsurances = function(callback){
  connection.query('SELECT * FROM insurance',
    function(err, result){
      callback(err, result);
    });
};

//get a certain insurance by id
module.exports.getInsurancesbyID = function(insuranceID, callback){
  connection.query('SELECT * FROM insurance WHERE insuranceID = :id',
    {
      id: insuranceID
    },
    function(err, result){
      callback(err, result);
    });
};

//get al pacients from pacient-club relation
module.exports.getPacients = function(insuranceID, callback){
  connection.query('SELECT * FROM patientinsurance WHERE insuranceID = :id',
  {
    id: insuranceID
  },
  function(err, result){
    callback(err, result);
  });
};

//create a new insurance
module.export.insertInsurance = function(insuranceID, name, address, callback){
  connection.query('INSERT INTO insurance(insuranceID, name, address)'
    + 'VALUES(:id, :name, :addres)',
    {
      id: insuranceID,
      name: name,
      address: address
    },
    function(err, result){
      callback(err, result);
    });
}
