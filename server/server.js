var net = require('net');

// Get db connection
const db = require('./db/db.js');

var server = net.createServer(function(socket) {
  console.log('client connected');

	socket.on('data', function(data){
    console.log('received');
		console.log(data.toString());

    if (data.toString() == 'hospitals'){
      var hospitals = db.query('Select * FROM hospital', function (err, result, fields) {
        if (err) throw err;
        var string = JSON.stringify(result)
        var json = JSON.parse(string);
        console.log(json);
        socket.write(string);
      });
    }
	});

  socket.on('end', function(){
    console.log('client disconnected');
  });

  socket.pipe(socket);
});

server.listen(4004);
