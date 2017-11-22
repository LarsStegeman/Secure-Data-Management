const db = require('./db/db.js');
const cpabe = require('node-cp-abe');

function testEncryptionStorageAndDecryption() {
  const keys = cpabe.setup();

	// Create other keys
	let patient1 = cpabe.keygen(keys.pubkey, keys.mstkey, ["patient = 1"]);

	// Plain text message.
	let name = 'hospital 1 name';
	let address = 'hospital 1 address';

	// Encrypt message.
	let enc_name = cpabe.encryptMessage(keys.pubkey, 'patient = 1', new Buffer(name));
	let enc_address = cpabe.encryptMessage(keys.pubkey, 'patient = 1', new Buffer(address));
	console.log("encrypted data");

	// STORE in database (Hospital table)
	let query = db.query('INSERT INTO hospital SET ?', {name: enc_name, address: enc_address}, function (error, results, fields) {
	  if (error) throw error;
	  console.log("Inserted Hospital ID: " + results.insertId);

		// READ from database (Hospital table)
		query = db.query('SELECT * FROM hospital', function (error, results, fields) {
		  if (error) throw error;

			//decryption
			try {
				let decrypted = cpabe.decryptMessage(keys.pubkey, patient1, results[results.length-1].name);
				console.log("decrypted: " + decrypted.toString());
			} catch (e) {
				console.log(e);
			}
		});
		console.log("Executed: " + query.sql);
	});
	console.log("Executed: " + query.sql);
}

// TESTS
testEncryptionStorageAndDecryption();
