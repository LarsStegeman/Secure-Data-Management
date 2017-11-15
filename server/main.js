const cpabe = require("node-cp-abe");
const fs = require('fs');
const path = require("path");
const net = require('net');

// MySQL DB
const db = require('./db/db.js');

//imports
const inputs = require('./inputs.js');

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
var pat1_unser = new Buffer(pat1_ser, 'binary');

[USED] ALSO WORKS:
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

// Create other keys
var patient1 = cpabe.keygen(keys.pubkey, keys.mstkey, ["patient = 1"]);
var patient2 = cpabe.keygen(keys.pubkey, keys.mstkey, ["patient = 2"]);

saveKeyToFile(patient1, "patient1skey");
saveKeyToFile(patient2, "patient2skey");

// Plain text message.
var message = 'hospital 1 name';

// Encrypt message.
var enc_data = cpabe.encryptMessage(keys.pubkey, 'patient=1', new Buffer(message));
console.log("encrypted data");

var server = net.createServer(function(socket) {
  console.log('client connected');

	socket.on('data', function(data){
    console.log('received');
		console.log(data.toString());

		var result = inputs.verifyInput(data);
    socket.write(string);
	});

  socket.on('end', function(){
    console.log('client disconnected');
  });

  socket.pipe(socket);
});

server.listen(4004);

/*
// Store in database (Hospital table)
let query = db.query('INSERT INTO hospital SET ?', {name: enc_data}, function (error, results, fields) {
  if (error) throw error;
  console.log("Inserted Hospital ID: " + results.insertId);

	// Read from database (Hospital table)
	query = db.query('SELECT * FROM hospital', function (error, results, fields) {
	  if (error) throw error;

		//decryption
		try {
			var decrypted = cpabe.decryptMessage(keys.pubkey, patient1, results[0].name);
			console.log("decrypted: " + decrypted.toString());
		} catch (e) {
			console.log(e);
		}
	});
	console.log("Executed: " + query.sql);
});
console.log("Executed: " + query.sql);
*/
