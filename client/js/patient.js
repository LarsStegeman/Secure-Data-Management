const client = require('./js/client.js');

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

document.getElementById("nav-patient").classList.add("active");
client.httpGetAsync("http://localhost:8080/patient/" + entityID, function(response){printPatient(response)});


function printPatient(response){
  console.log(response);
  response = JSON.parse(response);
  document.getElementById("patientName").innerHTML = response[0]['name']['data'];
  document.getElementById("patientAddress").innerHTML = response[0]['address']['data'];
  document.getElementById("patientBirth").innerHTML = response[0]['birthDate']['data'];
  document.getElementById("patientBlood").innerHTML = response[0]['bloodGroup']['data'];
  document.getElementById("patientNumber").innerHTML = response[0]['mobileNumber']['data'];
  document.getElementById("patientGender").innerHTML = response[0]['gender']['data'];
  document.getElementById("patientNotes").innerHTML = response[0]['notes'];
}

function addData(data){
  console.log(data);
  if(entityType && entityID) {
    window.location.replace("patient.html?type=" + entityType + "&id=" + entityID);
  }
}
