const client = require('./js/client.js');
const crypto = require('./js/crypto.js');
const relation = require('./js/relation.js');

var userInfo;

const getParams = query => {
  if (!query) {
    return { };
  }

  return (/^[?#]/.test(query) ? query.slice(1) : query)
    .split('&')
    .reduce((params, param) => {
      let [ key, value ] = param.split('=');
      params[key] = value ? decodeURIComponent(value.replace(/\+/g, ' ')) : '';
      return params;
    }, { });
};
entityType = getParams(window.location.search)["type"];
entityID = getParams(window.location.search)["id"];

document.getElementById("nav-patient").classList.add("active");
client.httpGetAsync(client.SERVER_URL + "patient/" + entityID, function(response){printPatient(response);});


function printPatient(response){
  response = JSON.parse(response);
  userInfo = response[0];
  document.getElementById("patientName").innerHTML = response[0]['name']['data'];
  document.getElementById("patientAddress").innerHTML = response[0]['address']['data'];
  document.getElementById("patientBirth").innerHTML = response[0]['birthdate']['data'];
  document.getElementById("patientBlood").innerHTML = response[0]['bloodgroup']['data'];
  document.getElementById("patientNumber").innerHTML = response[0]['mobilenumber']['data'];
  document.getElementById("patientGender").innerHTML = response[0]['gender']['data'];
  if (response[0]['notes'])
    document.getElementById("patientNotes").innerHTML = response[0]['notes']['data'];
}

//add Data to notes of a patient
//by now it's only replacing notes with data, but we need to append it to the notes. Maybe decrypting, append and encrypt again.
document.getElementById("addNote").onmousedown = function(){
  var data = document.getElementById('dataInput').value;
  let enc_notes = new Buffer(userInfo.notes.data, 'binary');
  var dec_notes = crypto.decrypt(entityType, entityID, enc_notes);
  dec_notes = dec_notes + "<br>" + data;
  let final_enc = crypto.encrypt(entityType, entityID, dec_notes);
  let encryptedEntity = {};
  // Name encryption
  encryptedEntity.notes = final_enc;

  client.httpPutAsync(client.SERVER_URL + "patient/notes/" + entityID, encryptedEntity, function(response){
    console.log(response);
    window.location.replace("patient.html?type=" + entityType + "&id=" + entityID);
  });
}

//switch user (logout)
document.getElementById("nav-changeuser").onmousedown = function() {
  window.location.replace("index.html");
};

document.getElementById("nav-keys").onmousedown = function(){
  window.location.replace("setup.html");
};

document.getElementById('relation-insert-button').onmousedown = function(){
  var entitySelect = document.getElementById('inputEntity');
  var entity = entitySelect.options[entitySelect.selectedIndex].value;
  var id = document.getElementById('inputID').value;
  client.httpPostAsync(client.SERVER_URL + 'patient/' + entityID + '/' + entity + '/'+ id, null, function(response){
    console.log(response);
    relation.getPatientRelations(entityType, entityID, function(relations){
      relations = JSON.parse(relations);
      var policyname = relation.getPolicy(entityID, relations, true, true, true, true, true);
      var policyaddress = relation.getPolicy(entityID, relations, true, true, true, true, true);
      var policyblood = relation.getPolicy(entityID, relations, true, true, true, true, true);
      var policybirth = relation.getPolicy(entityID, relations, true, true, true, true, true);
      var policynumber = relation.getPolicy(entityID, relations, true, true, true, true, true);
      var policygender = relation.getPolicy(entityID, relations, true, true, true, true, true);
      var policynotes = relation.getPolicy(entityID, relations, true, true, true, false, false);


      var newCypher = new Object();
      newCypher.name = crypto.encryptPolicy(policyname, crypto.decrypt(entityType, entityID, new Buffer(userInfo.name.data, 'binary')));
      newCypher.address = crypto.encryptPolicy(policyaddress, crypto.decrypt(entityType, entityID, new Buffer(userInfo.address.data, 'binary')));
      newCypher.bloodgroup = crypto.encryptPolicy(policyblood, crypto.decrypt(entityType, entityID, new Buffer(userInfo.bloodgroup.data, 'binary')));
      newCypher.birthdate = crypto.encryptPolicy(policybirth, crypto.decrypt(entityType, entityID, new Buffer(userInfo.birthdate.data, 'binary')));
      newCypher.mobilenumber = crypto.encryptPolicy(policynumber, crypto.decrypt(entityType, entityID, new Buffer(userInfo.mobilenumber.data, 'binary')));
      newCypher.gender = crypto.encryptPolicy(policygender, crypto.decrypt(entityType, entityID, new Buffer(userInfo.gender.data, 'binary')));
      newCypher.notes = crypto.encryptPolicy(policynotes, crypto.decrypt(entityType, entityID, new Buffer(userInfo.notes.data, 'binary')));

      client.httpPutAsync(client.SERVER_URL + 'patient/' + entityID, newCypher, function(result){
        console.log(result);
        window.alert("Association between patient " + entityID + " and " + entity + " " + id + " created successfully!");
        window.location.replace("patient.html?type=" + entityType + "&id=" + entityID);
      });
    });
    //window.location.replace("patient.html?type=" + entityType + "&id=" + entityID);
  });
  //window.location.replace("patient.html?type=" + entityType + "&id=" + entityID);
};

document.getElementById('relation-delete-button').onmousedown = function(){
  var entitySelect = document.getElementById('inputEntity-delete');
  var entity = entitySelect.options[entitySelect.selectedIndex].value;
  var id = document.getElementById('inputID-delete').value;
  client.httpDelAsync(client.SERVER_URL + 'patient/' + entityID + '/' + entity + '/'+ id, function(response){
    console.log(response);
    relation.getPatientRelations(entityType, entityID, function(relations){
      relations = JSON.parse(relations);
      var policyname = relation.getPolicy(entityID, relations, true, true, true, true, true);
      var policyaddress = relation.getPolicy(entityID, relations, true, true, true, true, true);
      var policyblood = relation.getPolicy(entityID, relations, true, true, true, true, true);
      var policybirth = relation.getPolicy(entityID, relations, true, true, true, true, true);
      var policynumber = relation.getPolicy(entityID, relations, true, true, true, true, true);
      var policygender = relation.getPolicy(entityID, relations, true, true, true, true, true);
      var policynotes = relation.getPolicy(entityID, relations, true, true, true, false, false);

      console.log(policyname);
      var newCypher = new Object();
      newCypher.name = crypto.encryptPolicy(policyname, crypto.decrypt(entityType, entityID, new Buffer(userInfo.name.data, 'binary')));
      newCypher.address = crypto.encryptPolicy(policyaddress, crypto.decrypt(entityType, entityID, new Buffer(userInfo.address.data, 'binary')));
      newCypher.bloodgroup = crypto.encryptPolicy(policyblood, crypto.decrypt(entityType, entityID, new Buffer(userInfo.bloodgroup.data, 'binary')));
      newCypher.birthdate = crypto.encryptPolicy(policybirth, crypto.decrypt(entityType, entityID, new Buffer(userInfo.birthdate.data, 'binary')));
      newCypher.mobilenumber = crypto.encryptPolicy(policynumber, crypto.decrypt(entityType, entityID, new Buffer(userInfo.mobilenumber.data, 'binary')));
      newCypher.gender = crypto.encryptPolicy(policygender, crypto.decrypt(entityType, entityID, new Buffer(userInfo.gender.data, 'binary')));
      newCypher.notes = crypto.encryptPolicy(policynotes, crypto.decrypt(entityType, entityID, new Buffer(userInfo.notes.data, 'binary')));

      client.httpPutAsync(client.SERVER_URL + 'patient/' + entityID, newCypher, function(result){
        console.log(result);
        window.alert("Association between patient " + entityID + " and " + entity + " " + id + " removed successfully!");
        window.location.replace("patient.html?type=" + entityType + "&id=" + entityID);
      });
    });
    //window.location.replace("patient.html?type=" + entityType + "&id=" + entityID);
  });
  //window.location.replace("patient.html?type=" + entityType + "&id=" + entityID);
};

document.getElementById("decryptButton").onmousedown = function(){

  let enc_name = new Buffer(userInfo.name.data, 'binary');
  let enc_address = new Buffer(userInfo.address.data, 'binary');
  let enc_birthdate = new Buffer(userInfo.birthdate.data, 'binary');
  let enc_mobilenumber = new Buffer(userInfo.mobilenumber.data, 'binary');
  let enc_bloodgroup = new Buffer(userInfo.bloodgroup.data, 'binary');
  let enc_gender = new Buffer(userInfo.gender.data, 'binary');
  let enc_notes = new Buffer(userInfo.notes.data, 'binary');

  document.getElementById('messages').innerHTML = 'wrong key';
  let dec_name = crypto.decrypt(entityType, entityID, enc_name);
  document.getElementById('patientName').innerHTML = dec_name;
  document.getElementById('messages').innerHTML = '';
  let dec_address = crypto.decrypt(entityType, entityID, enc_address);
  document.getElementById('patientAddress').innerHTML = dec_address;
  let dec_birthdate = crypto.decrypt(entityType, entityID, enc_birthdate);
  document.getElementById('patientBirth').innerHTML = dec_birthdate;
  let dec_mobilenumber = crypto.decrypt(entityType, entityID, enc_mobilenumber);
  document.getElementById('patientNumber').innerHTML = dec_mobilenumber;
  let dec_bloodgroup = crypto.decrypt(entityType, entityID, enc_bloodgroup);
  document.getElementById('patientBlood').innerHTML = dec_bloodgroup;
  let dec_gender = crypto.decrypt(entityType, entityID, enc_gender);
  document.getElementById('patientGender').innerHTML = dec_gender;
  let dec_notes = crypto.decrypt(entityType, entityID, enc_notes);
  document.getElementById('patientNotes').innerHTML = dec_notes;
  document.getElementById('addNotesDiv').innerHTML = '<label>Add Health Data</label>'
  + '<br><input type="text" id="dataInput">'
  + '<br>';

  document.getElementById('relation-insert').innerHTML = '<form id="relation-form">'
  + '<select id="inputEntity">'
    + '<option value="doctor">Doctor</option>'
    + '<option value="hospital">Hospital</option>'
    + '<option value="healthclub">HealthClub</option>'
    + '<option value="insurance">Insurance</option>'
    + '<option value="employer">Employer</option>'
  + '</select>'
  + '<input type="number" id="inputID">'
  + '</form>';

  document.getElementById('relation-delete').innerHTML = '<form id="relation-delete-form">'
  + '<select id="inputEntity-delete">'
    + '<option value="doctor">Doctor</option>'
    + '<option value="hospital">Hospital</option>'
    + '<option value="healthclub">HealthClub</option>'
    + '<option value="insurance">Insurance</option>'
    + '<option value="employer">Employer</option>'
  + '</select>'
  + '<input type="number" id="inputID-delete">'
  + '</form>';

  document.getElementById('addNote').style.display = 'block';
  document.getElementById('relation-insert-button').style.display = 'block';
  document.getElementById('relation-delete-button').style.display = 'block';
  document.getElementById("decryptButton").style.display = 'none';
};
