const connection = require('../db');

//get all employers in db
module.exports.getEmployers = function(callback){
  connection.query('SELECT * FROM employer',
    function(err, result){
      callback(err, result);
    });
};

//get a certain employer by id
module.exports.getEmployerbyID = function(employerID, callback){
  connection.query('SELECT * FROM employer WHERE employerID = :id',
    {
      id: employerID
    },
    function(err, result){
      callback(err, result);
    });
};

//get all pacients from patient-employer relation
module.exports.getPacients = function(employerID, callback){
  connection.query('SELECT * FROM patientemployer WHERE employerID = :id',
  {
    id: employerID
  },
  function(err, result){
    callback(err, result);
  });
};


//create a new Employer
module.export.insertEmployer = function(employerID, name, callback){
  connection.query('INSERT INTO employer(employerID, name)'
    + 'VALUES(:id, :name)',
    {
      id: employerID,
      name: name
    },
    function(err, result){
      callback(err, result);
    });
}
