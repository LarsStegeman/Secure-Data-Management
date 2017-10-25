var cpabe = require('./cpabe/cpabe_wrapper.js');

cpabe.setup();
var key = cpabe.keygen('patient');

var enc_data = cpabe.encrypt('hello patient', 'patient');

var dec_data = cpabe.decrypt(enc_data, key);

console.log(dec_data.toString());
