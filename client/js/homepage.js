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
    break;
  case "doctor":
    document.getElementById("nav-doctor").classList.add("active");
    window.location.replace("doctor.html?type=" + entityType + "&id=" + entityID);
    break;
  case "hospital":
    document.getElementById("nav-hospital").classList.add("active");
    window.location.replace("hospital.html?type=" + entityType + "&id=" + entityID);
    break;
  case "healthclub":
    document.getElementById("nav-healthclub").classList.add("active");
    window.location.replace("healthclub.html?type=" + entityType + "&id=" + entityID);
    break;
  case "employer":
    document.getElementById("nav-employer").classList.add("active");
    window.location.replace("employer.html?type=" + entityType + "&id=" + entityID);
    break;
  case "insurance":
    document.getElementById("nav-insurance").classList.add("active");
    window.location.replace("insurance.html?type=" + entityType + "&id=" + entityID);
    break;
  default:
    console.log(entityType);
}

//switch user (logout)
document.getElementById("nav-changeuser").onmousedown = function() {
  window.location.replace("index.html");
};
