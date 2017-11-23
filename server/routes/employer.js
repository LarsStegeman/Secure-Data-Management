const express = require('express');
const router = express.Router();

// MySQL DB
const db = require('../db/db.js');
// Crypto/key related
const crypto = require('../crypto.js');

// GET next employer ID
// RETURNS string with integer value of next ID
router.get('/next', function(req, res, next) {
  db.query('SELECT AUTO_INCREMENT FROM information_schema.tables WHERE table_name = \'employer\' AND table_schema = DATABASE( ) ;', function (error, results, fields) {
    if(error){
      console.log(error);
      // Error 500
      res.status(500).send({ error: error });
    } else {
      let nextID = JSON.stringify(results).match(db.numberPattern)[0];
      res.send(nextID);
    }
  	});
});

/* POST employer */
router.post('/', function (req, res) {
    console.log("RECEIVED: New employer data");
    let params = {
      name: new Buffer(req.body.name.data, 'binary'),
      address: new Buffer(req.body.address.data, 'binary')
    };
    db.query("INSERT INTO employer SET ?", params, function (error, results, fields) {
      if(error){
        console.log(error);
        // Error 500
        res.status(500).send({ error: error });
      } else {
        console.log("SUCCESS: New employer");
        crypto.keygen("employer", results.insertId);
        res.send(results);
      }
    });
});

module.exports = router;
