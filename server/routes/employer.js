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
    let params = {
      name: new TextDecoder("utf-8").decode(req.body.name.data),
      address: new TextDecoder("utf-8").decode(req.body.address.data),
    };
    db.query("INSERT INTO employer SET ?", params, function (error, results, fields) {
      if(error){
        console.log(error);
        // Error 500
        res.status(500).send({ error: error });
      } else {
        crypto.keygen("employer", results.insertId);
        res.send(results);
      }
    });
});

module.exports = router;
