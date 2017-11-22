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
	checkKeyDirectory();
	const keys = cpabe.setup();
	saveKeyToFile(keys.pubkey, PUBLIC_KEY_NAME);
	saveKeyToFile(keys.mstkey, MASTER_KEY_NAME);
}

// Generates Private Key with policy: "entity = id"
function keygen(entity, id) {
		let publicKey = getKeyFromFile(PUBLIC_KEY_NAME);
		let masterKey = getKeyFromFile(MASTER_KEY_NAME);
		let policy = "" + entity + " = " + id;
		let privKey = cpabe.keygen(publicKey, masterKey, [policy]);
		saveKeyToFile(privKey, "" + entity + id + ".key");
}

// Converts ArrayBuffer to String
function ab2str(buf) {
  return String.fromCharCode.apply(null, new Uint16Array(buf));
}

// Converts String to ArrayBuffer
function str2ab(str) {
  var buf = new ArrayBuffer(str.length*2); // 2 bytes for each char
  var bufView = new Uint16Array(buf);
  for (var i=0, strLen=str.length; i<strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}

/*module.exports.KEY_DIR = KEY_DIR;
module.exports.PUBLIC_KEY_NAME = PUBLIC_KEY_NAME;
module.exports.MASTER_KEY_NAME = MASTER_KEY_NAME;
module.exports.checkKeyDirectory = checkKeyDirectory;
module.exports.saveKeyToFile = saveKeyToFile;*/
module.exports.setup = setup;
module.exports.keygen = keygen;
module.exports.ab2str = ab2str;
module.exports.str2ab = str2ab;
