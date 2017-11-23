const client = require('./js/client.js');
const crypto = require('./js/crypto.js');

function getPatientRelations(entity, id, callback){
  client.httpGetAsync(client.SERVER_URL + "patient/" + id + '/relations', function(response){
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

function updatePolicies(patient, id, data, relations){
  var finaldata = data;
  for (i=0; i < data.length; i++){
    console.log(data[i]);
    var policy = getPolicy(relations);
    finalData[i] = encrypt(patient, id, policy, data[i]);
  }
  return finalData;
}

function getPolicy(relations){
  return "do policy parsing [patient=1 or doctor=2]";
}

module.exports.getPatientRelations = getPatientRelations;
module.exports.getEntityPatients = getEntityPatients;
module.exports.updatePolicies = updatePolicies;
