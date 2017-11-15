const connection = require('../db');

//get all doctors in db
module.exports.getDoctors = function(callback){
  connection.query('SELECT * FROM doctor',
    function(err, result){
      callback(err, result);
    });
};

//get a doctor by ID
module.exports.getDoctorbyID = function(doctorID, callback){
  connection.query('SELECT * FROM patient WHERE doctorID = :id',
    {
      id: doctorID
    },
    function(err, result){
      callback(err, result);
    });
};

//get patients id from patient-doctor relation
module.exports.getPacients = function(doctorID, callback){
  connection.query('SELECT * FROM patientdoctor WHERE doctorID = :id',
  {
    id: doctorID
  },
  function(err, result){
    callback(err, result);
  });
};

//get hospitals id from doctor-hospital relation
module.exports.getHospitals = function(doctorID, callback){
  connection.query('SELECT * FROM doctorhospital WHERE doctorID = :id',
  {
    id: doctorID
  },
  function(err, result){
    callback(err, result);
  });
};

//create a new doctor
module.exports.insertDoctor = function(doctorID, name, birthDate, address, mobileNum, callback){
  connection.query('INSERT INTO doctor(doctorID, name, birthDate, address, mobileNum)'
    + 'VALUES(:id, :name, :birth, :add, :mob)',
    {
      id: doctorID,
      name: name,
      birth: birthDate,
      add: address,
      mob: mobileNum
    },
    function(err, result){
      callback(err, result);
    });
}

//insert a new patient-doctor relation
module.exports.newPatient = function(patientID, doctorID, callback){
  connection.query('INSERT INTO patientdoctor(patientID, doctorID) VALUES(:patientID, :doctorID)',
  {
    patientID: patientID,
    doctorID: doctorID
  },
  function(err, result){
    callback(err, result);
  });
};

//update values of a doctor
module.exports.updateValues = function(doctorID, name, birthDate, address, mobileNum, callback){
  connection.query('UPDATE patient SET name=:name, birthDate=:birthDate, address=:address, mobileNum=:mobileNum WHERE doctorID=:id',
  {
    id: doctorID,
    name: name,
    birthDate: birthDate,
    address: address,
    mobileNum: mobileNum
  },
  function(err, result){
    callback(err, result);
  });
};
