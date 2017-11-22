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
	}
}

/************** KEY GENERATION **************/
function saveKeyToFile(key, filename) {
	destinyPath = path.join(KEY_DIR, filename);
	fs.writeFileSync(destinyPath, key);
}

function getKeyFromFile(filename){
  let destinyPath = path.join(KEY_DIR, filename);
  console.log(destinyPath);
  return fs.readFileSync(destinyPath);
}

function keygen(entity, id) {
		let publicKey = getKeyFromFile(PUBLIC_KEY_NAME);
		let masterKey = getKeyFromFile(MASTER_KEY_NAME);
		let policy = "" + entity + " = " + id;
		let privKey = cpabe.keygen(publicKey, masterKey, [policy]);
		saveKeyToFile(privKey, "" + entity + id + ".key");
}

module.exports.KEY_DIR = KEY_DIR;
module.exports.PUBLIC_KEY_NAME = PUBLIC_KEY_NAME;
module.exports.MASTER_KEY_NAME = MASTER_KEY_NAME;
module.exports.checkKeyDirectory = checkKeyDirectory;
module.exports.saveKeyToFile = saveKeyToFile;
module.exports.setup = cpabe.setup;
module.exports.keygen = keygen;
