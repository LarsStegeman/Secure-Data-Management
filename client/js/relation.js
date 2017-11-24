const client = require('./client.js');
const crypto = require('./crypto.js');

function getPatientRelations(entity, id, callback){
  client.httpGetAsync(client.SERVER_URL + "patient/associations/" + id, function(response){
    console.log(response);
    callback(response);
  });
};

function getEntityPatients(entity, id, callback){
  client.httpGetAsync(client.SERVER_URL + "patient/" + entity + "/" + id, function(response){
    console.log(response);
    callback(response);
  });
};

function updatePolicies(id, data, policy){
  var finalData = [];
  for (i=0; i < data.length; i++){
    finalData[i] = crypto.encryptPolicy(policy, data[i]);
  }
  return finalData;
}

function getPolicy(id, relations, doctor, hospital, healthclub, insurance, employer){
  var finalPolicy = 'patient = ' + id;
  var policyObj = new Object();
  policyObj.doctors = [];
  policyObj.hospitals = [];
  policyObj.healthclubs = [];
  policyObj.insurances = [];
  policyObj.employers = [];
  for (i=0; i < relations.length; i++){
    if (relations[i].doctorID && doctor){
      if (!policyObj.doctors.includes(relations[i].doctorID)){
        policyObj.doctors.push(relations[i].doctorID);
        finalPolicy = finalPolicy + ' or doctor = ' + relations[i].doctorID;
      }
    }
    if (relations[i].hospitalID && hospital){
      if (!policyObj.hospitals.includes(relations[i].hospitalID)){
        policyObj.hospitals.push(relations[i].hospitalID);
        finalPolicy = finalPolicy + ' or hospital = ' + relations[i].hospitalID;
      }
    }
    if (relations[i].healthclubID && healthclub){
      if (!policyObj.healthclubs.includes(relations[i].healthclubID)){
        policyObj.healthclubs.push(relations[i].healthclubID);
        finalPolicy = finalPolicy + ' or healthclub = ' + relations[i].healthclubID;
      }
    }
    if (relations[i].insuranceID && insurance){
      if (!policyObj.insurances.includes(relations[i].insuranceID)){
        policyObj.insurances.push(relations[i].insuranceID);
        finalPolicy = finalPolicy + ' or insurance = ' + relations[i].insuranceID;
      }
    }
    if (relations[i].employerID && employer){
      if (!policyObj.employers.includes(relations[i].employerID)){
        policyObj.employers.push(relations[i].employerID);
        finalPolicy = finalPolicy + ' or employer = ' + relations[i].employerID;
      }
    }
  }
  return finalPolicy;
}

module.exports.getPatientRelations = getPatientRelations;
module.exports.getEntityPatients = getEntityPatients;
module.exports.updatePolicies = updatePolicies;
module.exports.getPolicy = getPolicy;
