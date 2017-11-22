const fs = require("fs");
const path = require("path");

const crypto = require('./js/crypto.js');

document.getElementById("setKeys").onclick = function() {
  var publicKey = document.getElementById('publicKey').files[0];
  var privateKey = document.getElementById('privateKey').files[0];
  if(publicKey || privateKey) {
    if (publicKey) {
      if (window.confirm("This will replace your current public key. Are you sure?")) {
        crypto.copyKeyFile(publicKey.path, crypto.PUBLIC_KEY_NAME);
      }
    }
    if (privateKey) {
      if (window.confirm("This will replace your current private key. Are you sure?")) {
        crypto.copyKeyFile(privateKey.path, crypto.PRIVATE_KEY_NAME);
      }
    }
  } else {
    window.alert("No key selected!");
  }
};
