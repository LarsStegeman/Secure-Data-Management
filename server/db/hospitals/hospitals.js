const connection = require('../db');

//get all hospitals in db
module.exports.getHospitals = function(callback){
  connection.query('SELECT * FROM hospital',
    function(err, result){
      console.log(result);
      callback(err, result);
    });
};

//get an hospital with a certain ID
module.exports.getHospitalbyID = function(hospitalID, callback){
  connection.query('SELECT * FROM hospital WHERE hospitalID = :id',
    {
      id: hospitalID
    },
    function(err, result){
      callback(err, result);
    });
};

//get doctors id of doctor-hospital relation
module.exports.getDoctors = function(hospitalID, callback){
  connection.query('SELECT * FROM doctorhospital WHERE hospitalID = :id',
  {
    id: hospitalID
  },
  function(err, result){
    callback(err, result);
  });
};

//get patients id of patient-hospital relation
module.exports.getPatients = function(hospitalID, callback){
  connection.query('SELECT * FROM patienthospital WHERE hospitalID = :id',
  {
    id: hospitalID
  },
  function(err, result){
    callback(err, result);
  });
};

//create a new hospital
module.exports.insertHospital = function(hospitalID, name, address, callback){
  connection.query('INSERT INTO hospital(hospitalID, name, address)'
    + 'VALUES(:id, :name, :address)',
    {
      id: hospitalID,
      name: name,
      address: address
    },
    function(err, result){
      callback(err, result);
    });
}

//insert a new patient-hospital relation
module.exports.newPatient = function(patientID, hospitalID, callback){
  connection.query('INSERT INTO patienthospital(patientID, hospitalID) VALUES(:patientID, :hospitalID)',
  {
    patientID: patientID,
    hospitalID: hospitalID
  },
  function(err, result){
    callback(err, result);
  });
};

//insert a new doctor-hospital relation
module.exports.newDoctor = function(doctorID, hospitalID, callback){
  connection.query('INSERT INTO doctorhospital(doctorID, hospitalID) VALUES(:doctorID, :hospitalID)',
  {
    doctorID: doctorID,
    hospitalID: hospitalID
  },
  function(err, result){
    callback(err, result);
  });
};


//update values of a hospital
module.exports.updateValues = function(hospitalID, name, address, callback){
  connection.query('UPDATE hospital SET name=:name, address=:address WHERE hospitalID=:id',
  {
    id: hospitalID,
    name: name,
    address: address
  },
  function(err, result){
    callback(err, result);
  });
};

//fire a doctor
module.exports.removeDoctor = function(doctorID, hospitalID, callback){
  connection.query('DELETE FROM doctorhospital WHERE doctorID=:doctorID AND hospitalID=:hospitalID',
  {
      doctorID: doctorID,
      hospitalID: hospitalID
  },
  function(err, result){
    callback(err, result);
  });
};

//remove patient from hospital
module.exports.removePatient = function(patientID, hospitalID, callback){
  connection.query('DELETE FROM patienthospital WHERE patientID=:patientID AND hospitalID=:hospitalID',
  {
      patientID: patientID,
      hospitalID: hospitalID
  },
  function(err, result){
    callback(err, result);
  });
};
