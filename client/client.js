const net = require('net');
var client = net.connect({port: 4004}, function(){
  console.log('connected to server!');
  client.write('hospitals');
});
client.on('data', function(data) {
   console.log(data.toString());
   client.end();
});
client.on('end', function() {
   console.log('disconnected from server');
});
