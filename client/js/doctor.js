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

document.getElementById("nav-doctor").classList.add("active");
client.httpGetAsync(client.SERVER_URL + "doctor/" + entityID, function(response){printdoctor(response);});


function printdoctor(response){
  response = JSON.parse(response);
  userInfo = response[0];
  document.getElementById("doctorName").innerHTML = response[0]['name']['data'];
  document.getElementById("doctorAddress").innerHTML = response[0]['address']['data'];
  document.getElementById("doctorBirth").innerHTML = response[0]['birthdate']['data'];
  document.getElementById("doctorNumber").innerHTML = response[0]['mobilenumber']['data'];
}

//switch user (logout)
document.getElementById("nav-changeuser").onmousedown = function() {
  window.location.replace("index.html");
};

document.getElementById("nav-keys").onmousedown = function(){
  window.location.replace("setup.html");
};

document.getElementById("decryptButton").onmousedown = function(){

  let enc_name = new Buffer(userInfo.name.data, 'binary');
  let enc_address = new Buffer(userInfo.address.data, 'binary');
  let enc_birthdate = new Buffer(userInfo.birthdate.data, 'binary');
  let enc_mobilenumber = new Buffer(userInfo.mobilenumber.data, 'binary');

  document.getElementById('messages').innerHTML = 'wrong key';
  let dec_name = crypto.decrypt(entityType, entityID, enc_name);
  document.getElementById('doctorName').innerHTML = dec_name;
  document.getElementById('messages').innerHTML = '';
  let dec_address = crypto.decrypt(entityType, entityID, enc_address);
  document.getElementById('doctorAddress').innerHTML = dec_address;
  let dec_birthdate = crypto.decrypt(entityType, entityID, enc_birthdate);
  document.getElementById('doctorBirth').innerHTML = dec_birthdate;
  let dec_mobilenumber = crypto.decrypt(entityType, entityID, enc_mobilenumber);
  document.getElementById('doctorNumber').innerHTML = dec_mobilenumber;
};
