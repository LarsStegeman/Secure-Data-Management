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
    break;
  case "doctor":
    document.getElementById("nav-doctor").classList.add("active");
    break;
  case "hospital":
    document.getElementById("nav-hospital").classList.add("active");
    httpGetAsync("localhost:8080/hospital/"+entityID, function(response){printHospital(response)});
    break;
  case "healthclub":
    document.getElementById("nav-healthclub").classList.add("active");
    break;
  case "employer":
    document.getElementById("nav-employer").classList.add("active");
    break;
  case "insurance":
    document.getElementById("nav-insurance").classList.add("active");
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
    console.log(theUrl);
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
      callback(xmlHttp.responseText);
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }

    xmlHttp.open("GET", theUrl, true); // true for asynchronous
    xmlHttp.send(null);
}

function printHospital(response){
  console.log(response);
}
