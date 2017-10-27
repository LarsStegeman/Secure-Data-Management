var net = require('net');
const cpabe = require("node-cp-abe");

// keys has public and private key.
var keys = cpabe.setup();


var server = net.createServer(function(socket) {
	socket.on('data', function(data){
		//Log request
		console.log(data.toString());
		
		//Look up username in table and send encrypted data back
		
	});
});

server.listen(4004);


