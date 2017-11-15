let fs = require('fs');

if (!fs.existsSync("client/vendor")){
	fs.mkdirSync("client/vendor");
}

fs.copyFile("node_modules/bootstrap/dist/js/bootstrap.js", "client/vendor/bootstrap.js", (err) => {
  if (err) throw err;
});

fs.copyFile("node_modules/bootstrap/dist/css/bootstrap.css", "client/vendor/bootstrap.css", (err) => {
  if (err) throw err;
});

fs.copyFile("node_modules/jquery/dist/jquery.js", "client/vendor/jquery.js", (err) => {
  if (err) throw err;
});
