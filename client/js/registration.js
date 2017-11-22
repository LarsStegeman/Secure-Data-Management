const fs = require("fs");
const path = require("path");

const KEY_DIR = path.join("client", "keys");
const PUBLIC_KEY_NAME = path.join(KEY_DIR, "pubkey.key");

function setEntity(result) {
  let entity = result.value;
  console.log(entity);
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
        document.getElementById("birthDate").setAttribute("required", "required"); // Birth date required
        document.getElementById("formGender").setAttribute("style", "display: block;"); // Shows gender
        document.getElementById("formBlood").setAttribute("style", "display: block;"); // Shows blood type
        document.getElementById("blood").setAttribute("required", "required"); // Blood type required
        document.getElementById("formHealthNotes").setAttribute("style", "display: block;"); // Shows personal notes
        break;
      case "doctor":
        console.log("doctor switch");
        document.getElementById("formNumber").setAttribute("style", "display: block;"); // Shows number
        document.getElementById("number").setAttribute("required", "required"); // Number required
        document.getElementById("formBirthdate").setAttribute("style", "display: block;"); // Shows birth date
        document.getElementById("birthDate").setAttribute("required", "required"); // Birth date required
        document.getElementById("formGender").setAttribute("style", "display: none;"); // Hides gender
        document.getElementById("formBlood").setAttribute("style", "display: none;"); // Hides blood type
        document.getElementById("blood").removeAttribute("required");// Blood type not required
        document.getElementById("formHealthNotes").setAttribute("style", "display: none;"); // Hides Health notes
        break;
      default:
        console.log("default switch");
        document.getElementById("formNumber").setAttribute("style", "display: none;"); // Hides number
        document.getElementById("number").removeAttribute("required"); // Number not required
        document.getElementById("formBirthdate").setAttribute("style", "display: none;"); // Hides birth date
        document.getElementById("birthDate").removeAttribute("required"); // Birth date not required
        document.getElementById("formGender").setAttribute("style", "display: none;"); // Hides gender
        document.getElementById("formBlood").setAttribute("style", "display: none;"); // Hides blood type
        document.getElementById("blood").removeAttribute("required"); // Blood type not required
        document.getElementById("formHealthNotes").setAttribute("style", "display: none;"); // Hides Health notes
        break;
    }
  } else {
    document.getElementById("registrationForm").setAttribute("style", "display: none;"); // Hides the whole form
  }
}

document.getElementById("registBtn").onmousedown = function() {
  // Creates the directory if it doesn't exist
  if (!fs.existsSync(path.join(KEY_DIR, PUBLIC_KEY_NAME))) {
    window.alert("No public key found! Please go to the setup page and set your public key");
    window.location.replace("setup.html");
    return;
  }
  
  let type = document.getElementById("type").value;
  let name = document.getElementById("name").value;
  let address = document.getElementById("address").value;
  let number, birthdate, gender, blood, healthNotes = "";
  if (type == "patient" || type == "doctor") {
    number = document.getElementById("number").value;
    birthdate = document.getElementById("birthDate").value;
    if (type == "patient") {
      gender = document.getElementById("gender").value;
      blood = document.getElementById("blood").value;
    }
  }
};
