const client = require('./js/client.js');

// https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
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

//get type and id of user
const entityType = getParams(window.location.search)["type"];
const entityID = getParams(window.location.search)["id"];

document.getElementById("navbar-user").innerHTML = entityType + " " + entityID;

//select active bar based on user
switch(entityType){
  case "patient":
    document.getElementById("nav-patient").classList.add("active");
    window.location.replace("patient.html?type=" + entityType + "&id=" + entityID);
    //httpGetAsync(client.SERVER_URL + "patient/" + entityID, function(response){printPatient(response);});
    break;
  case "doctor":
    document.getElementById("nav-doctor").classList.add("active");
    client.httpGetAsync(client.SERVER_URL + "doctor/" + entityID, function(response){printDoctor(response);});
    break;
  case "hospital":
    document.getElementById("nav-hospital").classList.add("active");
    window.location.replace("hospital.html?type=" + entityType + "&id=" + entityID);
    //client.httpGetAsync(client.SERVER_URL + "hospital/" + entityID, function(response){printNameAddress(response);});
    break;
  case "healthclub":
    document.getElementById("nav-healthclub").classList.add("active");
    client.httpGetAsync(client.SERVER_URL + "healthclub/" + entityID, function(response){printNameAddress(response);});
    break;
  case "employer":
    document.getElementById("nav-employer").classList.add("active");
    client.httpGetAsync(client.SERVER_URL + "employer/" + entityID, function(response){printNameAddress(response);});
    break;
  case "insurance":
    document.getElementById("nav-insurance").classList.add("active");
    window.location.replace("insurance.html?type=" + entityType + "&id=" + entityID);
    //client.httpGetAsync(client.SERVER_URL + "insurance/" + entityID, function(response){printNameAddress(response)});
    break;
  default:
    console.log(entityType);
}

//switch user (logout)
document.getElementById("nav-changeuser").onmousedown = function() {
  window.location.replace("index.html");
};

function printNameAddress(response){
  console.log(response);
  response = JSON.parse(response);
  document.getElementById("content").innerHTML = "<dl clas='dl-horizontal'><dt>Name</dt><dd>" + response[0]['name']['data'] + "</dd>" + "<dt>Address</dt><dd> " + response[0]['address']['data'] + "</dd>";
}

function printDoctor(response){
  console.log(response);
  response = JSON.parse(response);
  document.getElementById("content").innerHTML = "<dl class='dl-horizontal'><dt>Name</dt><dd>" + response[0]['name']['data']
  + "</dd>" + "<dt>Address</dt><dd> " + response[0]['address']['data'] + "</dd>"
  + "<dt>Birth Date</dt><dd> " + response[0]['birthDate']['data'] + "</dd>"
  + "<dt>Mobile Number</dt><dd> " + response[0]['mobileNum']['data'] + "</dd>"
  + "</dl>";
}

function addData(data){
  console.log("data:");
  console.log(data);
  if(entityType && entityID) {
    window.location.reload();
  }
}
