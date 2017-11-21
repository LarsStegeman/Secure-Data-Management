const client = require('./js/client.js');
const crypto = require('./js/crypto.js');

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
client.httpGetAsync("http://localhost:8080/patient/" + entityID, function(response){printPatient(response)});


function printPatient(response){
  console.log(response);
  response = JSON.parse(response);
  userInfo = response[0];
  document.getElementById("patientName").innerHTML = response[0]['name']['data'];
  document.getElementById("patientAddress").innerHTML = response[0]['address']['data'];
  document.getElementById("patientBirth").innerHTML = response[0]['birthDate']['data'];
  document.getElementById("patientBlood").innerHTML = response[0]['bloodGroup']['data'];
  document.getElementById("patientNumber").innerHTML = response[0]['mobileNumber']['data'];
  document.getElementById("patientGender").innerHTML = response[0]['gender']['data'];
  if (response[0]['notes'])
    document.getElementById("patientNotes").innerHTML = response[0]['notes']['data'];
}

//add Data to notes of a patient
//by now it's only replacing notes with data, but we need to append it to the notes. Maybe decrypting, append and encrypt again.
function addData(data){

  client.httpPutAsync("http://localhost:8080/patient/" + entityID, data, function(response){
    console.log(response);
  });
  if(entityType && entityID) {
    window.location.replace("patient.html?type=" + entityType + "&id=" + entityID);
  }
}


//switch user (logout)
document.getElementById("nav-changeuser").onmousedown = function() {
  window.location.replace("index.html");
}

document.getElementById("nav-keys").onmousedown = function(){
  window.location.replace("setup.html");
}

document.getElementById("decryptButton").onmousedown = function(){
  var value = userInfo['name'];
  var string = value['data'].toString('utf8')
  console.log(string);
  var buff = new Buffer(string);
  console.log(buff);
  var name = "tobias o mal cheiroso";


  crypto.encrypt(entityType, entityID, name, function(enc){
    console.log(enc);
    crypto.decrypt(entityType, entityID, buff, function(decrypted){
      console.log(decrypted);
      document.getElementById('patientName').innerHTML = decrypted;
    });
  })
/*
  buff = new Buffer(name);
  console.log("buffer");
  console.log(buff);
  crypto.decrypt(entityType, entityID, buff, function(decrypted){
    console.log(decrypted);
    document.getElementById('patientName').innerHTML = decrypted;
  });
  */
}
