if (process.argv.length != 5) {
    console.log("You must run the script with 3 arguments! [pacientID] [entity type] [entity ID]");
    process.exit(-1);
}

// MySQL DB
const db = require('./db/db.js');
// Crypto/key related
const crypto = require('./crypto.js');

const patientID = process.argv[2];
const entityType = process.argv[3];
const entityID = process.argv[4];
const attribute = entityType + "ID";

let doctorParams = {
  "patientID": patientID,
  "doctorID": entityID
};

let hospitalParams = {
  "patientID": patientID,
  "hospitalID": entityID
};

let healthclubParams = {
  "patientID": patientID,
  "healthclubID": entityID
};

let employerParams = {
  "patientID": patientID,
  "employerID": entityID
};

let insuranceParams = {
  "patientID": patientID,
  "employerID": entityID
};

let params = {};

switch(entityType) {
  case "doctor" :
    params = doctorParams;
    break;
  case "hospital":
    params = hospitalParams;
    break;
  case "healthclub":
    params = healthclubParams;
    break;
  case "employer":
    params = employerParams;
    break;
  case "insurance":
    params = insuranceParams;
    break;
  default:
    console.log("The entity type must be \"doctor\", \"hospital\", \"healthclub\", \"employer\", \"insurance\"");
    process.exit(-1);
}

/************* ACCESS POLICY: *******
- name: doctor(R), insurance(R), employer(R), hospital(R)
- birthdate: doctor(R), insurance(R), employer(R), hospital(R)
- address: insurance(R), employer(R), hospital(R)
- mobilenumber: insurance(R), employer(R), hospital(R)
- bloodgroup: doctor(R), hospital(R)
- notes: doctor(R), hospital(R/W)
***************************/

db.query("INSERT INTO patient" + entityType + " SET ?", params, function (error, results, fields) {
  if(error){
    console.log(error);
  } else {
    db.query('SELECT * from patient WHERE patientID=?', [patientID], function (error, results, fields) {
      if(error){
        console.log(error);
      } else {
        switch (entityType) {
          case "doctor" :

            break;
          case "hospital":
            params = hospitalParams;
            break;
          case "healthclub":
            params = healthclubParams;
            break;
          case "employer":
            params = employerParams;
            break;
          case "insurance":
            params = insuranceParams;
            break;
          default:
            console.log("The entity type must be \"doctor\", \"hospital\", \"healthclub\", \"employer\", \"insurance\"");
            process.exit(-1);
        }
      }
    	});
  }
});
