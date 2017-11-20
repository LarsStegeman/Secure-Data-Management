const cpabe = require("node-cp-abe");
const fs = require('fs');
const path = require("path");

const args = process.argv;

const KEY_DIR = path.join(__dirname, "keys");

if (args.length < 4){
  throw "not enough arguments; Usage: npm run keygen (identity Type) (id)";
}

function saveKeyToFile(key, filename) {
	destinyPath = path.join(KEY_DIR, filename);
	fs.writeFileSync(destinyPath, key);
}

function getKeyFromFile(filename){
  destinyPath = path.join(KEY_DIR, filename);
  console.log(destinyPath);
  return fs.readFileSync(destinyPath);
}

function testEncryption(identity, id) {

  var pubkey = getKeyFromFile("pubkey.key")
  var mstkey = getKeyFromFile("mstkey.key")
  var policy = "" + identity + " = " + id;
  //console.log(pubkey);
  // Create other keys
	let key = cpabe.keygen(pubkey, mstkey, [policy]);

	saveKeyToFile(key, ""+identity+id+".key");

	// Plain text message.
	let name = 'hospital 1 name';
	let address = 'hospital 1 address';

	// Encrypt message.
	let enc_name = cpabe.encryptMessage(pubkey, policy, new Buffer(name));
	let enc_address = cpabe.encryptMessage(pubkey, policy, new Buffer(address));
	//console.log("encrypted data = " + enc_name);
  let decrypted = cpabe.decryptMessage(pubkey, key, enc_name);
  console.log("decrypted" + decrypted);
}

testEncryption(args[2], args[3]);
