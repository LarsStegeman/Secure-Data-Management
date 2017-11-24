const cpabe = require("node-cp-abe");
const fs = require('fs');
const path = require("path");

// Directory to save key files
const KEY_DIR = path.join(__dirname, "keys");
const PUBLIC_KEY_NAME = "pubkey.key";
const MASTER_KEY_NAME = "mstkey.key";

// Creates the key directory if it doesn't exist
function checkKeyDirectory() {
	if (!fs.existsSync(KEY_DIR)){
		fs.mkdirSync(KEY_DIR);
		return false;
	} else {
		return fs.existsSync(path.join(KEY_DIR, MASTER_KEY_NAME)) && fs.existsSync(path.join(KEY_DIR, PUBLIC_KEY_NAME));
	}
}

// Saves key to KEY_DIR/filename
function saveKeyToFile(key, filename) {
	destinyPath = path.join(KEY_DIR, filename);
	fs.writeFileSync(destinyPath, key);
	console.log("Saved " + destinyPath);
}

// Gets key from filename
function getKeyFromFile(filename){
  let destinyPath = path.join(KEY_DIR, filename);
  return fs.readFileSync(destinyPath);
}

// Generate Master Key and Public Key and save them to file
function setup() {
	if(!checkKeyDirectory()) {
		console.log("No pair Master/Public key found. Generating a new Master/Public key pair...");
		const keys = cpabe.setup();
		saveKeyToFile(keys.pubkey, PUBLIC_KEY_NAME);
		saveKeyToFile(keys.mstkey, MASTER_KEY_NAME);
	}
}

// Generates Private Key with policy: "entity = id"
function keygen(entity, id) {
		let publicKey = getKeyFromFile(PUBLIC_KEY_NAME);
		let masterKey = getKeyFromFile(MASTER_KEY_NAME);
		let policy = "" + entity + " = " + id;
		let privKey = cpabe.keygen(publicKey, masterKey, [policy]);
		saveKeyToFile(privKey, "" + entity + id + ".key");
}

function bin2String(array) {
  var result = "";
  for (var i = 0; i < array.length; i++) {
    result += String.fromCharCode(parseInt(array[i], 2));
  }
  return result;
}

module.exports.KEY_DIR = KEY_DIR;
module.exports.PUBLIC_KEY_NAME = PUBLIC_KEY_NAME;
module.exports.MASTER_KEY_NAME = MASTER_KEY_NAME;
module.exports.checkKeyDirectory = checkKeyDirectory;
module.exports.saveKeyToFile = saveKeyToFile;
module.exports.setup = setup;
module.exports.keygen = keygen;
