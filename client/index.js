var net = require('net');
var cpabe = require('node-cp-abe');
var gui = require('nw.gui');
const fs = require('fs');

cpabe.setup();
'use strict'
var login = document.getElementById("login");


var client = new net.Socket();
client.connect(4004, 'localhost', function() {
	console.log('Connected to server');
});

client.on('error', function(err) {
	console.log(err);
	login.disabled = true;	
})

login.addEventListener("click", sendToServer);

function sendToServer(){
	//Get both values when button is clicked
	var username = document.getElementById("username").value;
	var key = document.getElementById("key").value;

	//Send username to server
	console.log("Sending request to server");	
	client.write(username);
}


client.on('data', function(data) {
	console.log('Received: ' + data);
	
	//Create buffers
	var key = Buffer.from(fs.readFileSync('patientkey'), 'base64');
	var pubkey = Buffer.from(fs.readFileSync('pubkey'), 'base64');
	var data  = Buffer.from(data, 'base64');
	console.log('try to decrypt');
	//Try to decrypt
	console.log(cpabe.decryptMessage(pubkey, key, data));
});




