var net = require('net');
const cpabe = require("node-cp-abe");
const fs = require('fs');
const path = require("path");

// Directory to save key files
const KEY_DIR = path.join(__dirname, "keys");

// Creates the directory if it doesn't exist
if (!fs.existsSync(KEY_DIR)){
	fs.mkdirSync(KEY_DIR);
}

/****************** NOTES FOR (UN)SERIALIZING KEYS ****************
WONT WORK: "TypeError: Second argument must be a Buffer of private key"
var pat1_ser = JSON.stringify(patient1);
var pat1_unser = JSON.parse(pat1_ser);

WORKS:
var pat1_ser = patient1.toString('binary');
var pat1_unser = new Buffer(pat1_ser, 'binary');'binary'

ALSO WORKS:
fs.writeFile(path, key);
fs.readFile(path);
*******************************************************************/

function saveKeyToFile(key, filename) {
	destinyPath = path.join(KEY_DIR, filename);
	fs.writeFileSync(destinyPath, key);
}

// keys has public and master key.
var keys = cpabe.setup();

// Save public key file
saveKeyToFile(keys.pubkey, "pubkey");

// Message to decrypt.
var message = 'hello patient 1';

var patient1 = cpabe.keygen(keys.pubkey, keys.mstkey, ["patient = 1"]);
var patient2 = cpabe.keygen(keys.pubkey, keys.mstkey, ["patient = 2"]);

saveKeyToFile(patient1, "patient1skey");

//encryption.
var enc_data = cpabe.encryptMessage(keys.pubkey, 'patient=1', new Buffer(message));
console.log("encrypted data");

//decryption
try {
	var decrypted = cpabe.decryptMessage(keys.pubkey, patient1, enc_data);
	console.log("decrypted: " + decrypted.toString());
} catch (e) {
	console.log(e);
}

try {
	// Will not decrypt
	var decrypted = cpabe.decryptMessage(keys.pubkey, patient2, enc_data);
	console.log("decrypted: " + decrypted.toString());
} catch (e) {
	console.log(e);
}

var server = net.createServer(function(socket) {
	socket.on('data', function(data){
		//Log request
		console.log(data.toString());

		//Look up username in table and send encrypted data back

	});
});

//server.listen(4004);
