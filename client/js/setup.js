const fs = require("fs");
const path = require("path");

const KEY_DIR = path.join("client", "keys");
const PUBLIC_KEY_NAME = path.join(KEY_DIR, "pubkey.key");
const PRIVATE_KEY_NAME = path.join(KEY_DIR, "privkey.key");

// Creates the directory if it doesn't exist
if (!fs.existsSync(KEY_DIR)){
	fs.mkdirSync(KEY_DIR);
}

async function copyKey(path, destName) {
	return await fs.copyFile(path, destName, (err) => {
    if (err) throw err;
    console.log(destName + " was copied successfully");
  });
}

document.getElementById("setKeys").onclick = function() {
  var publicKey = document.getElementById('publicKey').files[0];
  var privateKey = document.getElementById('privateKey').files[0];
  if(publicKey || privateKey) {
    if (publicKey) {
      if (window.confirm("This will replace your current public key. Are you sure?")) {
        copyKey(publicKey.path, PUBLIC_KEY_NAME);
      }
    }
    if (privateKey) {
      if (window.confirm("This will replace your current private key. Are you sure?")) {
        copyKey(privateKey.path, PRIVATE_KEY_NAME);
      }
    }
  } else {
    window.alert("No key selected!");
  }
};
