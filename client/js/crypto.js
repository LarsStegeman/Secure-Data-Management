const cpabe = require("node-cp-abe");
const fs = require('fs');
const path = require("path");

const KEY_DIR = path.join(__dirname, "../keys");

function getKeyFromFile(filename){
  destinyPath = path.join(KEY_DIR, filename);
  console.log(destinyPath);
  return fs.readFileSync(destinyPath);
}

module.exports.decrypt = function(identity, id, value, callback) {
  var pubkey = getKeyFromFile("pubkey.key")
  var privkey = getKeyFromFile("privkey.key")
  var policy = "" + identity + " = " + id;

  let decrypted = cpabe.decryptMessage(pubkey, privkey, value);
  console.log("decrypted" + decrypted);
  callback(decrypted);
}

module.exports.encrypt = function(identity, id, value, callback) {
  var pubkey = getKeyFromFile("pubkey.key")
  var policy = "" + identity + " = " + id;
  let enc_value = cpabe.encryptMessage(pubkey, policy, new Buffer(value));

  console.log("encrypted" + enc_value);
  callback(enc_value);
}
