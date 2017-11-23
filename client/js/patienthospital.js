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
console.log(entityType + " " + entityID);

document.getElementById("nav-patient").classList.add("active");
client.httpGetAsync(client.SERVER_URL + "patient/hospital/" + entityID, function(response){printPatient(response);});


function printPatient(response) {
  response = JSON.parse(response);
  console.log(response);
  if (response.length > 0) {
    for (let i = 0; i < response.length; i++) {
      let divPatient = document.createElement('div');
      divPatient.innerHTML = '<dl class="dl-horizontal">'
        +  '<dt>Patient ID</dt><dd id="patientId' + i + '">' + response[i]['patientID'] + '</dd>'
        +  '<dt>Name</dt><dd id="patientName' + i + '">' + response[i]['name']['data'] + '</dd>'
        +  '<dt>Address</dt><dd id="patientAddress' + i + '">' + response[i]['address']['data'] + '</dd>'
        +  '<dt>Birth Date</dt><dd id="patientBirth' + i + '">' + response[i]['birthdate']['data'] + '</dd>'
        +  '<dt>Blood Group</dt><dd id="patientBlood' + i + '">' + response[i]['bloodgroup']['data'] + '</dd>'
        +  '<dt>Mobile Number</dt><dd id="patientNumber' + i + '">' + response[i]['mobilenumber']['data'] + '</dd>'
        +  '<dt>Gender</dt><dd id="patientGender' + i + '">' + response[i]['gender']['data'] + '</dd>'
        +  '<dt>Health Notes</dt><dd id="patientNotes' + i + '">' + (response[i]['notes'] ? response[i]['notes']['data'] : '') + '</dd>'
        +  '<dt>Hospital Related Data</dt><dd id="patientData' + i + '">' + (response[i]['data'] ? response[i]['data']['data'] : '') + '</dd>'
        + '</dl>'
        + '<form id="addNotesForm' + i + '">'
        + '<label>Add Hospital Related Data</label>'
        /*  <br><input type="text" id="dataInput">
          <br><button id="addNote" type="button">Add Health Data</button>
        </form>
        <div id="messages"></div>
        <button id="decryptButton">Decrypt</button>

      document.getElementById("content").appendChild(divPatient);
        */
    }
  } else {
    alert("No patients are associated to hospital ID="+entityID);
  }
}

/*
//add Data to notes of a patient
//by now it's only replacing notes with data, but we need to append it to the notes. Maybe decrypting, append and encrypt again.
document.getElementById("addNote").onmousedown = function(){
  var data = document.getElementById('dataInput').value;
  let enc_notes = new Buffer(userInfo.notes.data, 'binary');
  var dec_notes = crypto.decrypt(entityType, entityID, enc_notes);
  dec_notes = dec_notes + "<br>" + data;
  console.log(dec_notes);
  let final_enc = crypto.encrypt(entityType, entityID, dec_notes);
  console.log(entityType + " after encrypt " + entityID);
  let encryptedEntity = {};
  // Name encryption
  encryptedEntity.notes = final_enc;
  console.log(entityType + " final " + entityID);

  window.location.replace("patient.html?type=" + entityType + "&id=" + entityID);
  client.httpPutAsync(client.SERVER_URL + "patient/" + entityID, encryptedEntity, function(response){
    console.log(response);
    console.log(entityType + " after put " + entityID);
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
    console.log("after post");
    console.log(response);
    relation.getPatientRelations(entityType, entityID, function(relations){
      var enc = relation.updatePolicies(entityID, userInfo, relations);
      console.log("final data");
      console.log(enc);
    });
    window.location.replace("patient.html?type=" + entityType + "&id=" + entityID);
  });
  window.location.replace("patient.html?type=" + entityType + "&id=" + entityID);
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

  document.getElementById('relation-insert-button').style.display = 'block';
};
*/
