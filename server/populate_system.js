const cpabe = require("node-cp-abe");
const crypto = require('../server/crypto.js');
const path = require("path");
const fs = require('fs');

// MySQL DB
const db = require('../server/db/db.js');

//Make sure MASTERKEY and PUBLICKEY are generated
crypto.setup();

//Make 2 keys for each entity
const entities = ['patient', 'hospital', 'healthclub', 'insurance' , 'employee', 'doctor'];

for (var i = 0; i < entities.length; i++) {
	crypto.keygen(entities[i], 1);
	crypto.keygen(entities[i], 2);
}

//Patient1
let params1 = {
    name: new Buffer(encrypt('patient = 1 or hospital = 1' , 'name1'), 'binary'),
    address: new Buffer(encrypt('patient = 1 or hospital = 1',  'address1'), 'binary'),
    birthdate: new Buffer(encrypt('patient = 1 or hospital = 1',  '1-1-1900'), 'binary'),
    mobilenumber: new Buffer(encrypt('patient = 1 or hospital = 1',  '00011122233'), 'binary'),
    gender: new Buffer(encrypt('patient = 1 or hospital = 1',  'F'), 'binary'),
    bloodgroup: new Buffer(encrypt('patient = 1 or hospital = 1',  'bloodgroup1'), 'binary'),
    notes: new Buffer(encrypt('patient = 1 or hospital = 1', 'Note'), 'binary')
};

db.query("INSERT INTO patient SET ? ", params1, function (error, results, fields) {
       if(error){
        console.log(error);
	}
});

//Patient2
let params2 = {
    name: new Buffer(encrypt('patient = 2 or doctor = 1', 'name2'), 'binary'),
    address: new Buffer(encrypt('patient = 2 or doctor = 1', 'address2'), 'binary'),
    birthdate: new Buffer(encrypt('patient = 2 or doctor = 1', '1-1-1901'), 'binary'),
    mobilenumber: new Buffer(encrypt('patient = 2 or doctor = 1', '3322111000'), 'binary'),
    gender: new Buffer(encrypt('patient = 2 or doctor = 1', 'M'), 'binary'),
    bloodgroup: new Buffer(encrypt('patient = 2 or doctor = 1', 'bloodgroup2'), 'binary'),
    notes: new Buffer(encrypt('patient = 2 or doctor = 1', 'Note2'), 'binary')
};

db.query("INSERT INTO patient SET ? ", params2, function (error, results, fields) {
       if(error){
        console.log(error);
	}
});

//Doctor1
let params3 = {
    name: new Buffer(encrypt('doctor = 1', 'name1'), 'binary'),
    address: new Buffer(encrypt('doctor = 1', 'address1'), 'binary'),
    birthdate: new Buffer(encrypt('doctor = 1', '1-1-1901'), 'binary'),
    mobilenumber: new Buffer(encrypt('doctor = 1', '3322111000'), 'binary')
};

 db.query("INSERT INTO doctor SET ?", params3, function (error, results, fields) {
       if(error){
        console.log(error);
	}
});

//Hospital1
let params4 = {
    name: new Buffer(encrypt('hospital = 1', 'name1'), 'binary'),
    address: new Buffer(encrypt('hospital = 1', 'address1'), 'binary')
};

db.query("INSERT INTO hospital SET ?", params4, function (error, results, fields) {
       if(error){
        console.log(error);
	}
});

//Association Doctor1 Patient2
let association1 = {
	patientID: 2,
	doctorID: 1
};
db.query("INSERT INTO patientdoctor SET ?", association1, function (error, results, fields) {
       if(error){
       	console.log(error);
	}
});

//Association Hospital1 Patient1

let data_enc = new Buffer(encrypt('hospital = 1 or patient = 1', 'hospital data'), 'binary');
let association2 = {
	patientID: 1,
	hospitalID: 1,
	data: data_enc
};
db.query("INSERT INTO patienthospital SET ?", association2, function (error, results, fields) {
       if(error){
        console.log(error);
	}
});


function encrypt(policy, value) {
	let pubkey = getKeyFromFile(crypto.PUBLIC_KEY_NAME);
	let enc_value = cpabe.encryptMessage(pubkey, policy, new Buffer(value));
	console.log("Encrypted successfully:");
	return enc_value;
}

function getKeyFromFile(filename){
  let destinyPath = path.join(crypto.KEY_DIR, filename);
  return fs.readFileSync(destinyPath);
}
