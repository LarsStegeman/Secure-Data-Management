const client = require('./client.js');
const crypto = require('./crypto.js');

function getPatientRelations(entity, id, callback){
  console.log("get Patient " + id + "relations");
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
  console.log("updatePolicies");
  console.log(data.length);
  var finalData = [];
  for (i=0; i < data.length; i++){
    console.log(i);
    console.log(data[i]);
    finalData[i] = crypto.encryptPolicy(policy, data[i]);
    console.log(finalData[i]);
  }
  return finalData;
}

function getPolicy(id, relations){
  var finalPolicy = 'patient = ' + id;
  var policyObj = new Object();
  policyObj.doctors = [];
  policyObj.hospitals = [];
  policyObj.healthclubs = [];
  policyObj.insurances = [];
  policyObj.employers = [];
  for (i=0; i < relations.length; i++){
    if (relations[i].doctorID){
      if (!policyObj.doctors.includes(relations[i].doctorID)){
        policyObj.doctors.push(relations[i].doctorID);
        finalPolicy = finalPolicy + ' or doctor = ' + relations[i].doctorID;
      }
    }
    if (relations[i].hospitalID){
      if (!policyObj.hospitals.includes(relations[i].hospitalID)){
        policyObj.hospitals.push(relations[i].hospitalID);
        finalPolicy = finalPolicy + ' or hospital = ' + relations[i].hospitalID;
      }
    }
    if (relations[i].healclubID){
  console.log(finalPolicy);
      if (!policyObj.healthclubs.includes(relations[i].healclubID)){
        policyObj.healthclubs.push(relations[i].healclubID);
        finalPolicy = finalPolicy + ' or healthclub = ' + relations[i].healclubID;
      }
    }
    if (relations[i].insuranceID){
      if (!policyObj.insurances.includes(relations[i].insuranceID)){
        policyObj.insurances.push(relations[i].insuranceID);
        finalPolicy = finalPolicy + ' or insurance = ' + relations[i].insuranceID;
      }
    }
    if (relations[i].employerID){
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
