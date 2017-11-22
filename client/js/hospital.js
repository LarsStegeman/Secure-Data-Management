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
client.httpGetAsync("http://localhost:8080/hospital/" + entityID, function(response){printHospital(response)});


function printHospital(response){
  console.log("printHospital")
  console.log(response);
  response = JSON.parse(response);
  userInfo = response[0];
  console.log(userInfo['name']['data']);
  //console.log(JSON.stringify(response[0]['name']['data']));
  document.getElementById("hospitalName").innerHTML = JSON.stringify(userInfo['name']['data']);
  document.getElementById("hospitalAddress").innerHTML = JSON.stringify(userInfo['address']['data']);
}


//switch user (logout)
document.getElementById("nav-changeuser").onmousedown = function() {
  window.location.replace("index.html");
}

document.getElementById("nav-keys").onmousedown = function(){
  window.location.replace("setup.html");
}

document.getElementById("decryptButton").onmousedown = function(){
  var value = JSON.stringify(userInfo['name']['data']);
  var string = value.toString('utf8')
  console.log(string);
  var buff = new Buffer.from(value);
  console.log(buff);
  var name = "patientname";

  /**
  crypto.encrypt(entityType, entityID, name, function(enc){
    console.log(enc);
    console.log(enc[0]);
    console.log(enc[1]);
    console.log(enc[2]);
    console.log(enc[3]);
    console.log(enc[4]);
    console.log(enc['data']);
    crypto.decrypt(entityType, entityID, enc, function(decrypted){
      console.log(decrypted);
      document.getElementById('hospitalName').innerHTML = decrypted;
    });
  });
  */
  crypto.decrypt(entityType, entityID, buff, function(decrypted){
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
