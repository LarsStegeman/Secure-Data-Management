var net = require('net');
const cpabe = require("node-cp-abe")


// keys has public and private key.
var keys = cpabe.setup();

//Message to decrypt.
var message = 'hello patient 1';

var patient1 = cpabe.keygen(keys.pubkey, keys.mstkey, ["patient = 1"]);
var patient2 = cpabe.keygen(keys.pubkey, keys.mstkey, ["patient = 2"]);


//encryption.
var enc_data = cpabe.encryptMessage(keys.pubkey, 'patient=1', new Buffer(message));

//decryption
var decrypted = cpabe.decryptMessage(keys.pubkey, patient1, enc_data);
console.log("decrypted: " + decrypted.toString());

// Will not decrypt
var decrypted = cpabe.decryptMessage(keys.pubkey, patient2, enc_data);
console.log("decrypted: " + decrypted.toString());





var server = net.createServer(function(socket) {
	socket.on('data', function(data){
		//Log request
		console.log(data.toString());
		
		//Look up username in table and send encrypted data back
		
	});
});

//server.listen(4004);


