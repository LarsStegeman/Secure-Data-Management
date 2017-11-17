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
  document.getElementById("content").innerHTML = "<p>Name: " + response[0]['name']['data'] + "</p>" + "<p>Address: " + response[0]['address']['data'] + "</p>";
}

function printPatient(response){
  console.log(response);
  response = JSON.parse(response);
  document.getElementById("content").innerHTML = "<p>Name: " + response[0]['name']['data']
  + "</p>" + "<p>Address: " + response[0]['address']['data'] + "</p>"
  + "</p>" + "<p>birthDate: " + response[0]['birthDate']['data'] + "</p>"
  + "</p>" + "<p>bloodGroup: " + response[0]['bloodGroup']['data'] + "</p>"
  + "</p>" + "<p>mobileNumber: " + response[0]['mobileNumber']['data'] + "</p>"
  + "</p>" + "<p>gender: " + response[0]['gender']['data'] + "</p>";
}
