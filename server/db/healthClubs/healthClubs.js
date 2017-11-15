const connection = require('../db');

//get all healthclubs in db
module.exports.getHealthClubs = function(callback){
  connection.query('SELECT * FROM healthclub',
    function(err, result){
      callback(err, result);
    });
};

//get a certain healthclub by id
module.exports.getHealthClubbyID = function(clubID, callback){
  connection.query('SELECT * FROM healthclub WHERE clubID = :id',
    {
      id: clubID
    },
    function(err, result){
      callback(err, result);
    });
};

//get all pacients id from patient-club relation
module.exports.getPacients = function(clubID, callback){
  connection.query('SELECT * FROM patienthealthclub WHERE clubID = :id',
  {
    id: clubID
  },
  function(err, result){
    callback(err, result);
  });
};


//create a new HealthClub
module.exports.insertClub = function(clubID, name, callback){
  connection.query('INSERT INTO healthclub(clubID, name, address)'
    + 'VALUES(:id, :name, :address)',
    {
      id: clubID,
      name: name,
      address: address
    },
    function(err, result){
      callback(err, result);
    });
}

//update values of a healthclub
module.exports.updateValues = function(clubID, name, address,callback){
  connection.query('UPDATE healthclub SET name=:name, address=:address WHERE clubID=:id',
  {
    id: clubID,
    name: name,
    address: address
  },
  function(err, result){
    callback(err, result);
  });
};


//remove a patient from patient-club
module.exports.removePatient = function(patientID, clubID, callback){
  connection.query('DELETE FROM patienthealthclub WHERE patientID=:patientID AND clubID=:clubID',
  {
      patientID: patientID,
      clubID: clubID
  },
  function(err, result){
    callback(err, result);
  });
};
