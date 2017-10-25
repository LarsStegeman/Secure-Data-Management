var exports = module.exports = {};
var spawn = require('child_process').spawnSync;
var fs 	       = require('fs');

//Setup of cpabe. Creates master_key and pub_key
exports.setup = function() {
  spawn('cpabe-setup');
};


//Generates key with with attrbites.
exports.keygen = function(attributes) {
  var keygen = spawn('cpabe-keygen', ['pub_key', 'master_key', attributes]);
  return fs.readFileSync('priv_key');
};

exports.encrypt = function(data, attributes) {
  fs.writeFileSync('dataToEncrypt', data);
  var encrypt = spawn('cpabe-enc', ['pub_key', 'dataToEncrypt', attributes]);
  return fs.readFileSync('dataToEncrypt.cpabe');
};

exports.decrypt = function(data_enc, key) {
  fs.writeFileSync('dataToDecrypt.cpabe', data_enc);
  fs.writeFileSync('user_key', key);
  var decrypt = spawn('cpabe-dec', ['pub_key', 'userKey','dataToDecrypt.cpabe']);
  return fs.readFileSync('dataToDecrypt');
};

