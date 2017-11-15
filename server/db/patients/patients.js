const connection = require('../db');
//get all patients in db
module.exports.getPatients = function(callback){
  connection.query('SELECT * FROM patient',
    function(err, result){
      callback(err, result);
    });
};

//get patient with a certain ID
module.exports.getPatientbyID = function(patientID, callback){
  connection.query('SELECT * FROM patient WHERE patientID = :id',
    {
      id: patientID
    },
    function(err, result){
      callback(err, result);
    });
};

//get all doctors id of a certain patient
module.exports.getDoctors = function(patientID, callback){
  connection.query('SELECT * FROM patientdoctor WHERE patientID = :id',
  {
    id: patientID
  },
  function(err, result){
    callback(err, result);
  });
};

//get all employers id of a certain patient
module.exports.getEmployers = function(patientID, callback){
  connection.query('SELECT * FROM patientemployer WHERE patientID = :id',
  {
    id: patientID
  },
  function(err, result){
    callback(err, result);
  });
};

//get all healthclubs id of a certain patient
module.exports.getHelthClubs = function(patientID, callback){
  connection.query('SELECT * FROM patienthealthclub WHERE patientID = :id',
  {
    id: patientID
  },
  function(err, result){
    callback(err, result);
  });
};

//get all hospitals id of a certain patient
module.exports.getHospitals = function(patientID, callback){
  connection.query('SELECT * FROM patienthospital WHERE patientID = :id',
  {
    id: patientID
  },
  function(err, result){
    callback(err, result);
  });
};

//get all insurances id of a certain patient
module.exports.getInsurances = function(patientID, callback){
  connection.query('SELECT * FROM patientinsurance WHERE patientID = :id',
  {
    id: patientID
  },
  function(err, result){
    callback(err, result);
  });
};

//insert a new patient into the db
module.exports.newPatient = function(patientID, name, address, birthDate, bloodGroup, mobileNumber, gender, callback){
  connection.query('INSERT INTO patient(patientID, name, address, birthDate, bloodGroup, mobileNumber, gender)'
    + 'VALUES(:patientID, :name, :address, :birthDate, :bloodGroup, :mobileNumber, :gender)',
  {
    patientID: patientID,
    name: name,
    address: address,
    birthDate: birthDate,
    bloodGroup: bloodGroup,
    mobileNumber: mobileNumber,
    gender: gender
  },
  function(err, result){
    callback(err, result);
  });
};

//insert a new patient-doctor relation
module.exports.newDoctor = function(patientID, doctorID, callback){
  connection.query('INSERT INTO patientdoctor(patientID, doctorID) VALUES(:patientID,:doctorID)',
  {
    patientID: patientID,
    doctorID: doctorID
  },
  function(err, result){
    callback(err, result);
  });
};

//insert a new patient-employer relation
module.export.newEmployer = function(patientID, employerID, callback){
  connection.query('INSERT INTO patientemployer(patientID, employerID) VALUES(:patientID,:employerID)',
  {
    patientID: patientID,
    employerID: employerID
  },
  function(err, result){
    callback(err, result);
  });
};

//insert a new patient-healthclub relation
module.export.newHealthClub = function(patientID, clubID, callback){
  connection.query('INSERT INTO patienthealthclub(patientID, clubID) VALUES(:patientID,:clubID)',
  {
    patientID: patientID,
    clubID: clubID
  },
  function(err, result){
    callback(err, result);
  });
};

//insert a new patient-hospital relation
module.export.newHospital = function(patientID, hospitalID, callback){
  connection.query('INSERT INTO patienthospital(patientID, hospitalID) VALUES(:patientID,:hospitalID)',
  {
    patientID: patientID,
    hospitalID: hospitalID
  },
  function(err, result){
    callback(err, result);
  });
};

//insert a new patient-insurance relation
module.export.newInsurance = function(patientID, insuranceID, callback){
  connection.query('INSERT INTO patientinsurance(patientID, insuranceID) VALUES(:patientID,:insuranceID)',
  {
    patientID: patientID,
    insuranceID: insuranceID
  },
  function(err, result){
    callback(err, result);
  });
};

//update values of a patient
module.export.updateValues = function(patientID, name, address, birthDate, bloodGroup, mobileNumber, gender, notes, callback){
  connection.query('UPDATE patient SET name=:name, address=:address, birthDate=:birthDate, '
    + 'bloodGroup=:bloodGroup, mobileNumber=:mobileNumber, notes=:notes WHERE patientID=:id',
  {
    id: patientID,
    name: name,
    addres: address,
    birthDate: birthDate,
    bloodGroup: bloodGroup,
    mobileNumber: mobileNumber,
    gender: gender,
    notes: notes
  },
  function(err, result){
    callback(err, result);
  });
};

//update notes of a patient
module.export.updateValues = function(patientID, notes, callback){
  connection.query('UPDATE patient SET notes=:notes WHERE patientID=:id',
  {
    id: patientID,
    notes: notes
  },
  function(err, result){
    callback(err, result);
  });
};
