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

document.getElementById("nav-insurance").classList.add("active");
client.httpGetAsync(client.SERVER_URL + "insurance/" + entityID, function(response){printinsurance(response);});


function printinsurance(response){
  response = JSON.parse(response);
  userInfo = response[0];
  document.getElementById("insuranceName").innerHTML = response[0]['name']['data'];
  document.getElementById("insuranceAddress").innerHTML = response[0]['address']['data'];
}

document.getElementById("nav-patient").onmousedown = function(){
  window.location.replace("patientinsurance.html" + window.location.search);
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

  document.getElementById('messages').innerHTML = 'wrong key';
  let dec_name = crypto.decrypt(entityType, entityID, enc_name);
  document.getElementById('insuranceName').innerHTML = dec_name;
  document.getElementById('messages').innerHTML = '';
  let dec_address = crypto.decrypt(entityType, entityID, enc_address);
  document.getElementById('insuranceAddress').innerHTML = dec_address;
};
