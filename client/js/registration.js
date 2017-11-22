const fs = require("fs");
const path = require("path");
const toastr = require("toastr");

const crypto = require('./js/crypto.js');
const client = require('./js/client.js');

function setEntity(result) {
  let entity = result.value;
  if(entity) {
    document.getElementById("registrationForm").setAttribute("style", "display: block;");
    document.getElementById("formName").setAttribute("style", "display: block;");
    document.getElementById("formAddress").setAttribute("style", "display: block;");
    document.getElementById("formButton").setAttribute("style", "display: block;");
    switch(entity) {
      case "patient":
        document.getElementById("formNumber").setAttribute("style", "display: block;"); // Shows number
        document.getElementById("number").setAttribute("required", "required"); // Number required
        document.getElementById("formBirthdate").setAttribute("style", "display: block;"); // Shows birth date
        document.getElementById("birthdate").setAttribute("required", "required"); // Birth date required
        document.getElementById("formGender").setAttribute("style", "display: block;"); // Shows gender
        document.getElementById("formBlood").setAttribute("style", "display: block;"); // Shows blood type
        document.getElementById("bloodgroup").setAttribute("required", "required"); // Blood type required
        document.getElementById("formHealthNotes").setAttribute("style", "display: block;"); // Shows personal notes
        break;
      case "doctor":
        document.getElementById("formNumber").setAttribute("style", "display: block;"); // Shows number
        document.getElementById("number").setAttribute("required", "required"); // Number required
        document.getElementById("formBirthdate").setAttribute("style", "display: block;"); // Shows birth date
        document.getElementById("birthdate").setAttribute("required", "required"); // Birth date required
        document.getElementById("formGender").setAttribute("style", "display: none;"); // Hides gender
        document.getElementById("formBlood").setAttribute("style", "display: none;"); // Hides blood type
        document.getElementById("bloodgroup").removeAttribute("required");// Blood type not required
        document.getElementById("formHealthNotes").setAttribute("style", "display: none;"); // Hides Health notes
        break;
      default:
        document.getElementById("formNumber").setAttribute("style", "display: none;"); // Hides number
        document.getElementById("number").removeAttribute("required"); // Number not required
        document.getElementById("formBirthdate").setAttribute("style", "display: none;"); // Hides birth date
        document.getElementById("birthdate").removeAttribute("required"); // Birth date not required
        document.getElementById("formGender").setAttribute("style", "display: none;"); // Hides gender
        document.getElementById("formBlood").setAttribute("style", "display: none;"); // Hides blood type
        document.getElementById("bloodgroup").removeAttribute("required"); // Blood type not required
        document.getElementById("formHealthNotes").setAttribute("style", "display: none;"); // Hides Health notes
        break;
    }
  } else {
    document.getElementById("registrationForm").setAttribute("style", "display: none;"); // Hides the whole form
  }
}

function getValueAndEncrypt(attribute, type, id) {
  let value = document.getElementById(attribute).value;
  let encrypted = crypto.encrypt(type, id, value);
  // toast notification('Encrypted ' + attribute + ' successfully');
  return encrypted;
}

document.getElementById("registBtn").onmousedown = function() {
  // Checks for Public Key existence for encryption purposes
  if (!fs.existsSync(path.join(crypto.KEY_DIR, crypto.PUBLIC_KEY_NAME))) {
    window.alert("No public key found! Please go to the setup page and set your public key");
    window.location.replace("setup.html");
    return;
  }

  let type = document.getElementById("type").value;
  let nextUrl = client.SERVER_URL + type + "/next";

  client.httpGetAsync(nextUrl, function(nextID){
    let encryptedEntity = {};
    // Name encryption
    encryptedEntity.name = getValueAndEncrypt("name", type, nextID);
    // Address encryption
    encryptedEntity.address = getValueAndEncrypt("address", type, nextID);

    let number, birthdate, gender, blood, healthNotes = "";
    if (type == "patient" || type == "doctor") {
      encryptedEntity.number = getValueAndEncrypt("number", type, nextID);
      encryptedEntity.birthdate = getValueAndEncrypt("birthdate", type, nextID);
      if (type == "patient") {
        encryptedEntity.gender = getValueAndEncrypt("gender", type, nextID);
        encryptedEntity.bloodgroup = getValueAndEncrypt("bloodgroup", type, nextID);
        encryptedEntity.notes = getValueAndEncrypt("notes", type, nextID);
      }
    }
    client.httpPostAsync(client.SERVER_URL + type, encryptedEntity, console.log);
  });
};
