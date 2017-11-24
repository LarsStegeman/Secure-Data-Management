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
const entityType = getParams(window.location.search)["type"];
const entityID = getParams(window.location.search)["id"];

document.getElementById("nav-patient").classList.add("active");
client.httpGetAsync(client.SERVER_URL + "patient/doctor/" + entityID, function(response){printPatient(response);});

document.getElementById("nav-doctor").onmousedown = function(){
  window.location.replace("doctor.html?type=" + entityType + "&id=" + entityID);
}

document.getElementById("nav-changeuser").onmousedown = function() {
  window.location.replace("index.html");
};

document.getElementById("nav-keys").onmousedown = function(){
  window.location.replace("setup.html");
};

let decryptButton = function(id){
  let enc_name = new Buffer(userInfo[id]['name']['data'], 'binary');
  let enc_address = new Buffer(userInfo[id]['address']['data'], 'binary');
  let enc_birthdate = new Buffer(userInfo[id]['birthdate']['data'], 'binary');
  let enc_mobilenumber = new Buffer(userInfo[id]['mobilenumber']['data'], 'binary');
  let enc_bloodgroup = new Buffer(userInfo[id]['bloodgroup']['data'], 'binary');
  let enc_gender = new Buffer(userInfo[id]['gender']['data'], 'binary');
  let enc_notes = '';

  let dec_name = crypto.decrypt(entityType, entityID, enc_name);
  document.getElementById('patientName'+id).innerHTML = dec_name;
  let dec_address = crypto.decrypt(entityType, entityID, enc_address);
  document.getElementById('patientAddress'+id).innerHTML = dec_address;
  let dec_birthdate = crypto.decrypt(entityType, entityID, enc_birthdate);
  document.getElementById('patientBirth'+id).innerHTML = dec_birthdate;
  let dec_mobilenumber = crypto.decrypt(entityType, entityID, enc_mobilenumber);
  document.getElementById('patientNumber'+id).innerHTML = dec_mobilenumber;
  let dec_bloodgroup = crypto.decrypt(entityType, entityID, enc_bloodgroup);
  document.getElementById('patientBlood'+id).innerHTML = dec_bloodgroup;
  let dec_gender = crypto.decrypt(entityType, entityID, enc_gender);
  document.getElementById('patientGender'+id).innerHTML = dec_gender;
  if(userInfo[id]['notes']){
    enc_notes = new Buffer(userInfo[id]['notes']['data'], 'binary');
    let dec_notes = crypto.decrypt(entityType, entityID, enc_notes);
    document.getElementById('patientNotes'+id).innerHTML = dec_notes;
  }
};

function printPatient(response) {
  userInfo = JSON.parse(response);
  if (userInfo.length > 0) {
    for (let i = 0; i < userInfo.length; i++) {
      let divPatient = document.createElement('div');
      divPatient.innerHTML = '<dl class="dl-horizontal">'
        +  '<dt>Patient ID</dt><dd id="patientId' + i + '">' + userInfo[i]['patientID'] + '</dd>'
        +  '<dt>Name</dt><dd id="patientName' + i + '">' + userInfo[i]['name']['data'] + '</dd>'
        +  '<dt>Address</dt><dd id="patientAddress' + i + '">' + userInfo[i]['address']['data'] + '</dd>'
        +  '<dt>Birth Date</dt><dd id="patientBirth' + i + '">' + userInfo[i]['birthdate']['data'] + '</dd>'
        +  '<dt>Blood Group</dt><dd id="patientBlood' + i + '">' + userInfo[i]['bloodgroup']['data'] + '</dd>'
        +  '<dt>Mobile Number</dt><dd id="patientNumber' + i + '">' + userInfo[i]['mobilenumber']['data'] + '</dd>'
        +  '<dt>Gender</dt><dd id="patientGender' + i + '">' + userInfo[i]['gender']['data'] + '</dd>'
        +  '<dt>Health Notes</dt><dd id="patientNotes' + i + '">' + (userInfo[i]['notes'] ? userInfo[i]['notes']['data'] : '') + '</dd>'
        + '</dl>'
        + '<div id="messages"></div>'
        + '<input type="button" id="decryptButton' + i + '" value="Decrypt" onmousedown="decryptButton('+i+')">'
       document.getElementById("content").appendChild(divPatient);
    }
  } else {
    alert("No patients are associated to doctor ID="+entityID);
  }
}
