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

function updatePolicies(id, data, relations){
  console.log("updatePolicies");
  console.log(data);
  console.log(Array.apply([], data).join(","))
  console.log(relations);
  var finalData = data;
  for (i=0; i < data.length; i++){
    console.log(data[i]);
    var policy = getPolicy(id, relations);
    finalData[i] = encryptPolicy(patient, id, policy, data[i]);
  }
  console.log(Array.apply([], finalData).join(","))
  return finalData;
}

function getPolicy(id, relations){
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
      }
    }
    if (relations[i].hospitalID){
      if (!policyObj.hospitals.includes(relations[i].hospitalID)){
        policyObj.hospitals.push(relations[i].hospitalID);
      }
    }
    if (relations[i].healclubID){
      if (!policyObj.healthclubs.includes(relations[i].healclubID)){
        policyObj.healthclubs.push(relations[i].healclubID);
      }
    }
    if (relations[i].insuranceID){
      if (!policyObj.insurances.includes(relations[i].insuranceID)){
        policyObj.insurances.push(relations[i].insuranceID);
      }
    }
    if (relations[i].employerID){
      if (!policyObj.employers.includes(relations[i].employerID)){
        policyObj.employers.push(relations[i].employerID);
      }
    }
  }
  console.log(policyObj);
  console.log(Array.apply([], policyObj).join(","))
  return policyObj;
}

module.exports.getPatientRelations = getPatientRelations;
module.exports.getEntityPatients = getEntityPatients;
module.exports.updatePolicies = updatePolicies;
