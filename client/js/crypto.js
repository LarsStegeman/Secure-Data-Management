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
	console.log("1")
  let pubkey = getKeyFromFile(PUBLIC_KEY_NAME);
	console.log("2");
  let policy = "" + identity + " = " + id;
  let enc_value = cpabe.encryptMessage(pubkey, policy, new Buffer(value));
	console.log("Encrypted successfully:");
	console.log(Array.apply([], enc_value).join(","))
  return enc_value;
}

function decrypt(identity, id, value) {
	console.log("a");
  let pubkey = getKeyFromFile(PUBLIC_KEY_NAME);
	console.log("b");
	let privkey = getKeyFromFile(PRIVATE_KEY_NAME);
	console.log("c");
  let policy = "" + identity + " = " + id;
  let decrypted = cpabe.decryptMessage(pubkey, privkey, value);
  console.log("decrypted" + decrypted);
  return decrypted;
}

module.exports.KEY_DIR = KEY_DIR;
module.exports.PUBLIC_KEY_NAME = PUBLIC_KEY_NAME;
module.exports.PRIVATE_KEY_NAME = PRIVATE_KEY_NAME;
module.exports.checkKeyDirectory = checkKeyDirectory;
module.exports.copyKeyFile = copyKeyFile;
module.exports.getKeyFromFile = getKeyFromFile;
module.exports.encrypt = encrypt;
module.exports.decrypt = decrypt;
