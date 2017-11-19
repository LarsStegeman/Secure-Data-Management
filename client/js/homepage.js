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
entityType = getParams(window.location.search)["type"];
entityID = getParams(window.location.search)["id"];


document.getElementById("navbar-user").innerHTML = entityType + " " + entityID;

//select active bar based on user
switch(entityType){
  case "patient":
    document.getElementById("nav-patient").classList.add("active");
    httpGetAsync("http://localhost:8080/patient/" + entityID, function(response){printPatient(response)});
    break;
  case "doctor":
    document.getElementById("nav-doctor").classList.add("active");
    httpGetAsync("http://localhost:8080/doctor/" + entityID, function(response){printDoctor(response)});
    break;
  case "hospital":
    document.getElementById("nav-hospital").classList.add("active");
    httpGetAsync("http://localhost:8080/hospital/" + entityID, function(response){printNameAddress(response)});
    break;
  case "healthclub":
    document.getElementById("nav-healthclub").classList.add("active");
    httpGetAsync("http://localhost:8080/healthclub/" + entityID, function(response){printNameAddress(response)});
    break;
  case "employer":
    document.getElementById("nav-employer").classList.add("active");
    httpGetAsync("http://localhost:8080/employer/" + entityID, function(response){printNameAddress(response)});
    break;
  case "insurance":
    document.getElementById("nav-insurance").classList.add("active");
    httpGetAsync("http://localhost:8080/insurance/" + entityID, function(response){printNameAddress(response)});
    break;
  default:
    console.log(entityType);
}

//switch user (logout)
document.getElementById("nav-changeuser").onmousedown = function() {
  window.location.replace("index.html");
}

function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
        callback(xmlHttp.responseText);
      }
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous
    xmlHttp.send();
}

function printNameAddress(response){
  console.log(response);
  response = JSON.parse(response);
  document.getElementById("content").innerHTML = "<dl clas='dl-horizontal'><dt>Name</dt><dd>" + response[0]['name']['data'] + "</dd>" + "<dt>Address</dt><dd> " + response[0]['address']['data'] + "</dd>";
}

function printPatient(response){
  console.log(response);
  response = JSON.parse(response);
  document.getElementById("content").innerHTML = "<dl class='dl-horizontal'><dt>Name</dt><dd>" + response[0]['name']['data']
  + "</dd>" + "<dt>Address</dt><dd> " + response[0]['address']['data'] + "</dd>"
  + "<dt>birthDate</dt><dd> " + response[0]['birthDate']['data'] + "</dd>"
  + "<dt>bloodGroup</dt><dd> " + response[0]['bloodGroup']['data'] + "</dd>"
  + "<dt>mobileNumber</dt><dd> " + response[0]['mobileNumber']['data'] + "</dd>"
  + "<dt>gender</dt><dd> " + response[0]['gender']['data'] + "</dd>"
  + "</dl>";
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
