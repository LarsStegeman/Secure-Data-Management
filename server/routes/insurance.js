const express = require('express');
const router = express.Router();

// MySQL DB
const db = require('../db/db.js');
// Crypto/key related
const crypto = require('../crypto.js');

// GET next insurance ID
// RETURNS string with integer value of next ID
router.get('/next', function(req, res, next) {
  db.query('SELECT AUTO_INCREMENT FROM information_schema.tables WHERE table_name = \'insurance\' AND table_schema = DATABASE( ) ;', function (error, results, fields) {
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

/* POST insurance */
router.post('/', function (req, res) {
    let params = {
      name: crypto.ab2str(req.body.name.data),
      address: crypto.ab2str(req.body.name.data)
    };
    db.query("INSERT INTO insurance SET ?", params, function (error, results, fields) {
      if(error){
        console.log(error);
        // Error 500
        res.status(500).send({ error: error });
      } else {
        console.log("Insurance POST request successful");
        crypto.keygen("insurance", results.insertId);
        res.send(results);
      }
    });
});

module.exports = router;
