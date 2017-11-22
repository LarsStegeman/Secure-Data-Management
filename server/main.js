const express = require('express');
const bodyParser = require('body-parser'); // to support JSON-encoded bodies

// MySQL DB
const db = require('./db/db.js');
// Crypto/key related
const crypto = require('./crypto.js');

// Express
const app = express();
app.all('/', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
 });

// config
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

/************** ROUTES ***************/
const index = require('./routes/index'); // API index
const patient = require('./routes/patient'); // Patient route
const hospital = require('./routes/hospital'); // Hospital route
const doctor = require('./routes/doctor'); // Doctor route
const healthclub = require('./routes/healthclub'); // Health Club route
const insurance = require('./routes/insurance'); // Insurance route
const employer = require('./routes/employer'); // Employer route

app.use('/', index);
app.use('/patient', patient);
app.use('/hospital', hospital);
app.use('/doctor', doctor);
app.use('/healthclub', healthclub);
app.use('/insurance', insurance);
app.use('/employer', employer);

/****************** NOTES FOR (UN)SERIALIZING KEYS ****************
WONT WORK: "TypeError: Second argument must be a Buffer of private key"
let pat1_ser = JSON.stringify(patient1);
let pat1_unser = JSON.parse(pat1_ser);

WORKS:
let pat1_ser = patient1.toString('binary');
let pat1_unser = new Buffer(pat1_ser, 'binary');

[USED] ALSO WORKS:
fs.writeFile(path, key);
fs.readFile(path);
*******************************************************************/

// keys.pubkey and keys.mstkey
const keys = crypto.setup();

// Save public key file
crypto.checkKeyDirectory();
crypto.saveKeyToFile(keys.pubkey, crypto.PUBLIC_KEY_NAME);
crypto.saveKeyToFile(keys.mstkey, crypto.MASTER_KEY_NAME);


// Catch 404 error and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = err;

  // render the error page
  res.status(err.status || 500);
});

// Start server
app.listen(8080, function () {
    console.log('SDM-PHR server is running on port 8080 (localhost)');
});

/****************** FOR TESTS ONLIY ******************/
/*
function testEncryption() {
	// Create other keys
	let patient1 = cpabe.keygen(keys.pubkey, keys.mstkey, ["patient = 1"]);
	let patient2 = cpabe.keygen(keys.pubkey, keys.mstkey, ["patient = 2"]);

	saveKeyToFile(patient1, "patient1skey.key");
	saveKeyToFile(patient2, "patient2skey.key");

	// Plain text message.
	let name = 'hospital 1 name';
	let address = 'hospital 1 address';

	// Encrypt message.
	let enc_name = cpabe.encryptMessage(keys.pubkey, 'patient=1', new Buffer(name));
	let enc_address = cpabe.encryptMessage(keys.pubkey, 'patient=1', new Buffer(address));
	console.log("encrypted data");
}

function testStorageAndDecryption() {
	// STORE in database (Hospital table)
	let query = db.query('INSERT INTO hospital SET ?', {name: enc_name, address: enc_address}, function (error, results, fields) {
	  if (error) throw error;
	  console.log("Inserted Hospital ID: " + results.insertId);

		// READ from database (Hospital table)
		query = db.query('SELECT * FROM hospital', function (error, results, fields) {
		  if (error) throw error;

			//decryption
			try {
				let decrypted = cpabe.decryptMessage(keys.pubkey, patient1, results[0].name);
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
testEncryption();
// testStorageAndDecryption(); // Can only insert once before resetting or specifying ID
*/
