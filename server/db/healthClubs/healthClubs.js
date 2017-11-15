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
module.export.insertClub = function(clubID, name, callback){
  connection.query('INSERT INTO healthclub(clubID, name)'
    + 'VALUES(:id, :name)',
    {
      id: clubID,
      name: name
    },
    function(err, result){
      callback(err, result);
    });
}

//update values of a healthclub
module.export.updateValues = function(clubID, name, callback){
  connection.query('UPDATE healthclub SET name=:name WHERE clubID=:id',
  {
    id: clubID,
    name: name
  },
  function(err, result){
    callback(err, result);
  });
};


//remove a patient from patient-club
module.export.removePatient = function(patientID, clubID, callback){
  connection.query('DELETE FROM patienthealthclub WHERE patientID=:patientID AND clubID=:clubID',
  {
      patientID: patientID,
      clubID: clubID
  },
  function(err, result){
    callback(err, result);
  });
};
