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

document.getElementById("nav-employer").classList.add("active");
client.httpGetAsync(client.SERVER_URL + "employer/" + entityID, function(response){printemployer(response);});


function printemployer(response){
  console.log(response);
  response = JSON.parse(response);
  userInfo = response[0];
  document.getElementById("employerName").innerHTML = response[0]['name']['data'];
  document.getElementById("employerAddress").innerHTML = response[0]['address']['data'];
}

//add Data to notes of a employer
//by now it's only replacing notes with data, but we need to append it to the notes. Maybe decrypting, append and encrypt again.
function addData(data){

  client.httpPutAsync(client.SERVER_URL + "employer/" + entityID, data, function(response){
    console.log(response);
  });
  if(entityType && entityID) {
    window.location.replace("employer.html?type=" + entityType + "&id=" + entityID);
  }
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
  document.getElementById('employerName').innerHTML = dec_name;
  document.getElementById('messages').innerHTML = '';
  let dec_address = crypto.decrypt(entityType, entityID, enc_address);
  document.getElementById('employerAddress').innerHTML = dec_address;
};
