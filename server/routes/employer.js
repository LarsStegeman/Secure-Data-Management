const express = require('express');
const router = express.Router();

// MySQL DB
const db = require('../db/db.js');
// Crypto/key related
const crypto = require('../crypto.js');

// GET all employers IDs
router.get('/', function(req, res, next) {
  db.query('SELECT employerID from employer', function (error, results, fields) {
    if(error){
      console.log(error);
      // Error 500
      res.status(500).send({ error: error });
    } else {
      res.send(results);
    }
  	});
});

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

// Get a single employer
router.get('/:id', function (req, res) {
  let employerID = req.params.id;
  if (!employerID) {
    return res.status(400).send({ error: true, message: 'Please provide employerID' });
  }
  db.query('select * from employer where employerID=?', [employerID], function (error, results, fields) {
    if(error){
      console.log(error);
      // Error 500
      res.status(500).send({ error: error });
    } else {
      res.send(results);
    }
	});
});

/* POST employer */
router.post('/', function (req, res) {
    console.log("POST RECEIVED: New employer data");
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
        console.log("POST SUCCESS: New employer");
        crypto.keygen("employer", results.insertId);
        res.send(results);
      }
    });
});

/* PUT employer */
router.put('/:id', function (req, res) {
    let employerID = req.params.id;
    if (!employerID) {
      return res.status(400).send({ error: true, message: 'Please provide employerID' });
    }
    console.log("PUT RECEIVED: To edit employer " + employerID);
    let params = {
      name: new Buffer(req.body.name.data, 'binary'),
      address: new Buffer(req.body.address.data, 'binary')
    };
    db.query("UPDATE employer SET ? WHERE employerID = ?", [params, employerID], function (error, results, fields) {
      if(error){
        console.log(error);
        // Error 500
        res.status(500).send({ error: error });
      } else {
        console.log("PUT SUCCESS: Edited employer");
        res.send(results);
      }
    });
});

/* DELETE employer */
router.delete('/:id', function (req, res) {
  let employerID = req.params.id;
  if (!employerID) {
    return res.status(400).send({ error: true, message: 'Please provide employerID' });
  }
  db.query('DELETE FROM employer WHERE employerID=?', [employerID], function (error, results, fields) {
    if(error){
      console.log(error);
      // Error 500
      res.status(500).send({ error: error });
    } else {
      res.send(results);
    }
	});
});

module.exports = router;
