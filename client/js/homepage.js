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
entityType = getParams(window.location.search)["type"];
entityID = getParams(window.location.search)["id"];

document.getElementById("navbar-user").innerHTML = entityType + " " + entityID;

switch(entityType){
  case "patient":
    document.getElementById("nav-patient").classList.add("active");
    break;
  case "doctor":
    document.getElementById("nav-doctor").classList.add("active");
    break;
  case "hospital":
    document.getElementById("nav-hospital").classList.add("active");
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

document.getElementById("nav-changeuser").onmousedown = function() {
  window.location.replace("index.html");
}
