var net = require('net');
const Step = require('step');
const cpabe = require('node-cp-abe');
const fs = require('fs');

//Connect to database
const db = require('./database/db.js');

// keys has public and private key.
var keys = cpabe.setup();

fs.writeFile('pubkey', keys.pubkey.toString('base64'), function(err) {
    if(err) {
        return console.log(err);
    }
	console.log("The file was saved!");
});

createUser('testpatient');

// Create server
var server = net.createServer(function(socket) {
	socket.on('data', function(data){
		//Log request
		console.log(data.toString());
		
		//Look up username in table and send encrypted data back
		db.query('SELECT data FROM patient WHERE name = \''+ data.toString() + '\';',  function (err, result) {
 			if (err) throw err;
  			//console.log(result[0].data);
			socket.write(result[0].data);	
		});
	});
});

//server.listen(4004);



//Create user
function createUser(name){
	Step(
		function readPatientID() {
			db.query('SELECT PatientID FROM patient ORDER BY PatientID DESC LIMIT 1;', this);
		},
		function genKey(err, result) {
			if (err) throw err;
			//Parse result;
			let patientID;
			if(result.length === 0){
				patientID = 0;
			}else{
				patientID = result[0].PatientID + 1;
			}
			//Generate key
			let patientkey = cpabe.keygen(keys.pubkey, keys.mstkey, ['patient = ' + patientID]);
			
			fs.writeFile('patientkey', patientkey.toString('base64'), function(err) {
   				if(err) {
        			return console.log(err);
    			}
				console.log("The file was saved!");
			});
			//console.log(patientkey.toString('base64'));
			
			//Generate data
			let encryptedData = cpabe.encryptMessage(keys.pubkey, 'patient=' + patientID, new Buffer('test data'));
			let databaseEncryption = encryptedData.toString('base64');
			
			//Insert into database
			db.query('INSERT INTO patient VALUES (' + patientID + ',\'' + name + '\',\'' + databaseEncryption + '\');', this);
					
		},
		function print(err,result){
			if (err) throw err;
			console.log("succesfully created user:" + name);
			});
		}

	);
}














