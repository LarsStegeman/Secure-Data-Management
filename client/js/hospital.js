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

document.getElementById("nav-hospital").classList.add("active");
client.httpGetAsync("http://localhost:8080/hospital/" + entityID, function(response){printHospital(response)});


function printHospital(response){
  console.log("printHospital")
  response = JSON.parse(response);
  console.log(JSON.stringify(response[0]['name']['data']));
  document.getElementById("hospitalName").innerHTML = JSON.stringify(response[0]['name']['data']);
  document.getElementById("hospitalAddress").innerHTML = JSON.stringify(response[0]['address']['data']);
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
  var name = "patientname";


  //crypto.encrypt(entityType, entityID, name, function(enc){
    //console.log(enc);
  //})
  crypto.decrypt(entityType, entityID, value, function(decrypted){
    console.log(decrypted);
    document.getElementById('hospitalName').innerHTML = decrypted;
  });
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
