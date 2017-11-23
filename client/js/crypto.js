const cpabe = require("node-cp-abe");
const fs = require('fs');
const path = require("path");

const KEY_DIR = path.join(__dirname, "../keys");
const PUBLIC_KEY_NAME = "pubkey.key";
const PRIVATE_KEY_NAME = "privkey.key";

// Creates the key directory if it doesn't exist
function checkKeyDirectory() {
	if (!fs.existsSync(KEY_DIR)){
		fs.mkdirSync(KEY_DIR);
	}
}

async function copyKeyFile(sourcePath, filename) {
	checkKeyDirectory();
	destinyPath = path.join(KEY_DIR, filename);
	return await fs.copyFile(sourcePath, destinyPath, (err) => {
    if (err) throw err;
    console.log(sourcePath + " was copied successfully");
  });
}

function getKeyFromFile(filename){
  destinyPath = path.join(KEY_DIR, filename);
  return fs.readFileSync(destinyPath);
}

function encrypt(identity, id, value) {
  let pubkey = getKeyFromFile(PUBLIC_KEY_NAME);
  let policy = "" + identity + " = " + id;
  let enc_value = cpabe.encryptMessage(pubkey, policy, new Buffer(value));
	console.log("Encrypted successfully:");
	//console.log(Array.apply([], enc_value).join(","))
  return enc_value;
}

function encryptPolicy(policy, value) {
	console.log("encryptPolicy");
	let pubkey = getKeyFromFile(PUBLIC_KEY_NAME);
	console.log("pibkey");
  let enc_value = cpabe.encryptMessage(pubkey, policy, new Buffer(value));
	console.log("Encrypted successfully:");
	//console.log(Array.apply([], enc_value).join(","))
  return enc_value;
}

function decrypt(identity, id, value) {
  let pubkey = getKeyFromFile(PUBLIC_KEY_NAME);
	let privkey = getKeyFromFile(PRIVATE_KEY_NAME);
  let policy = "" + identity + " = " + id;
	//console.log("a");
  let decrypted = cpabe.decryptMessage(pubkey, privkey, value);
	//console.log("b");
  console.log("decrypted" + decrypted.toString());
  return decrypted.toString();
}

module.exports.KEY_DIR = KEY_DIR;
module.exports.PUBLIC_KEY_NAME = PUBLIC_KEY_NAME;
module.exports.PRIVATE_KEY_NAME = PRIVATE_KEY_NAME;
module.exports.checkKeyDirectory = checkKeyDirectory;
module.exports.copyKeyFile = copyKeyFile;
module.exports.getKeyFromFile = getKeyFromFile;
module.exports.encrypt = encrypt;
module.exports.encryptPolicy = encryptPolicy;
module.exports.decrypt = decrypt;
