const connection = require('../db');

module.exports.getHealthClubs = function(callback){
  connection.query('SELECT * FROM healthclub',
    function(err, result){
      callback(err, result);
    });
};

module.exports.getHealthClubbyID = function(clubID, callback){
  connection.query('SELECT * FROM healthclub WHERE clubID = :id',
    {
      id: clubID
    },
    function(err, result){
      callback(err, result);
    });
};

module.exports.getPacients = function(clubID, callback){
  connection.query('SELECT * FROM patienthealthclub WHERE clubID = :id',
  {
    id: clubID
  },
  function(err, result){
    callback(err, result);
  });
};
