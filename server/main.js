const express = require('express');
const bodyParser = require('body-parser'); // to support JSON-encoded bodies
const cpabe = require("node-cp-abe");
const fs = require('fs');
const path = require("path");

// Directory to save key files
const KEY_DIR = path.join(__dirname, "keys");

// Creates the directory if it doesn't exist
if (!fs.existsSync(KEY_DIR)){
	fs.mkdirSync(KEY_DIR);
}

// MySQL DB
const db = require('./db/db.js');

// Express
const app = express();

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

const index = require('./routes/index'); // API index
const patient = require('./routes/patient'); // Patient route
const hospital = require('./routes/hospital'); // Hospital route

app.use('/', index);
app.use('/patient', patient);
app.use('/hospital', hospital);

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

function saveKeyToFile(key, filename) {
	destinyPath = path.join(KEY_DIR, filename);
	fs.writeFileSync(destinyPath, key);
}

// keys has public and master key.
let keys = cpabe.setup();

// Save public key file
saveKeyToFile(keys.pubkey, "pubkey");

// Create other keys
let patient1 = cpabe.keygen(keys.pubkey, keys.mstkey, ["patient = 1"]);
let patient2 = cpabe.keygen(keys.pubkey, keys.mstkey, ["patient = 2"]);

saveKeyToFile(patient1, "patient1skey");
saveKeyToFile(patient2, "patient2skey");

// Plain text message.
let name = 'hospital 1 name';
let address = 'hospital 1 address';

// Encrypt message.
let enc_name = cpabe.encryptMessage(keys.pubkey, 'patient=1', new Buffer(name));
let enc_address = cpabe.encryptMessage(keys.pubkey, 'patient=1', new Buffer(address));
console.log("encrypted data");


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
app.listen(8080, function () {
    console.log('Node app is running on port 8080');
});



// Store in database (Hospital table)
/*
let query = db.query('INSERT INTO hospital SET ?', {name: enc_name, address: enc_address}, function (error, results, fields) {
  if (error) throw error;
  console.log("Inserted Hospital ID: " + results.insertId);
	/*
	// Read from database (Hospital table)
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
*/
