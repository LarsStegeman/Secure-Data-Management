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
module.export.insertEmployer = function(employerID, name, address, callback){
  connection.query('INSERT INTO employer(employerID, name, address)'
    + 'VALUES(:id, :name, address=:address)',
    {
      id: employerID,
      name: name,
      address: address
    },
    function(err, result){
      callback(err, result);
    });
}

//update values of a employer
module.export.updateValues = function(employerID, name, address, callback){
  connection.query('UPDATE employer SET name=:name, address=:address WHERE employerID=:id',
  {
    id: employerID,
    name: name,
    address: address
  },
  function(err, result){
    callback(err, result);
  });
};

//fire a patient
module.export.removePatient = function(patientID, employerID, callback){
  connection.query('DELETE FROM patientemployer WHERE patientID=:patientID AND employerID=:employerID',
  {
      patientID: patientID,
      employerID: employerID
  },
  function(err, result){
    callback(err, result);
  });
};
