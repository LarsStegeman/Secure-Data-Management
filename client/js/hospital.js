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
var userInfo = null;

document.getElementById("nav-hospital").classList.add("active");
client.httpGetAsync(client.SERVER_URL + "hospital/" + entityID, function(response){printHospital(response)});


function printHospital(response){
  response = JSON.parse(response);
  userInfo = response[0];
  document.getElementById("hospitalName").innerHTML = JSON.stringify(userInfo['name']['data']);
  document.getElementById("hospitalAddress").innerHTML = JSON.stringify(userInfo['address']['data']);
}

document.getElementById("nav-patient").onmousedown = function(){
  window.location.replace("patienthospital.html" + window.location.search);
}

//switch user (logout)
document.getElementById("nav-changeuser").onmousedown = function() {
  window.location.replace("index.html");
}

document.getElementById("nav-keys").onmousedown = function(){
  window.location.replace("setup.html");
}

document.getElementById("decryptButton").onmousedown = function(){
  let enc_name = new Buffer(userInfo.name.data, 'binary');
  let enc_address = new Buffer(userInfo.address.data, 'binary');

  dec_name = crypto.decrypt(entityType, entityID, enc_name);
  document.getElementById('hospitalName').innerHTML = dec_name;
  dec_address = crypto.decrypt(entityType, entityID, enc_address);
  document.getElementById('hospitalAddress').innerHTML = dec_address;
}
