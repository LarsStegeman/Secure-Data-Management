const express = require('express');
const router = express.Router();

// MySQL DB
const db = require('../db/db.js');
// Crypto/key related
const crypto = require('../crypto.js');

// GET all health clubs IDs
router.get('/', function(req, res, next) {
  db.query('SELECT clubID from healthclub', function (error, results, fields) {
    if(error){
      console.log(error);
      // Error 500
      res.status(500).send({ error: error });
    } else {
      res.send(results);
    }
  	});
});

// GET next health club ID
// RETURNS string with integer value of next ID
router.get('/next', function(req, res, next) {
  db.query('SELECT AUTO_INCREMENT FROM information_schema.tables WHERE table_name = \'healthclub\' AND table_schema = DATABASE( ) ;', function (error, results, fields) {
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

// Get a single health club
router.get('/:id', function (req, res) {
  let clubID = req.params.id;
  if (!clubID) {
    return res.status(400).send({ error: true, message: 'Please provide clubID' });
  }
  db.query('select * from healthclub where clubID=?', [clubID], function (error, results, fields) {
    if(error){
      console.log(error);
      // Error 500
      res.status(500).send({ error: error });
    } else {
      res.send(results);
    }
	});
});

/* POST health club */
router.post('/', function (req, res) {
    console.log("RECEIVED: New healthclub data");
    let params = {
      name: new Buffer(req.body.name.data, 'binary'),
      address: new Buffer(req.body.address.data, 'binary')
    };
    db.query("INSERT INTO healthclub SET ?", params, function (error, results, fields) {
      if(error){
        console.log(error);
        // Error 500
        res.status(500).send({ error: error });
      } else {
        console.log("SUCCESS: New healthclub");
        crypto.keygen("healthclub", results.insertId);
        res.send(results);
      }
    });
});

/* PUT health club */
// If the body's request includes the clubID, this can change the clubID in the DB
router.put('/:id', function (req, res) {
    let clubID = req.params.id;
    let params = req.body;
    console.log(params);
    db.query("UPDATE healthclub SET ? WHERE clubID = ?", [params, clubID], function (error, results, fields) {
      if(error){
        console.log(error);
        // Error 500
        res.status(500).send({ error: error });
      } else {
        res.send(results);
      }
    });
});

/* DELETE healthclub */
router.delete('/:id', function (req, res) {
  let clubID = req.params.id;
  if (!clubID) {
    return res.status(400).send({ error: true, message: 'Please provide clubID' });
  }
  db.query('DELETE FROM healthclub WHERE clubID=?', [clubID], function (error, results, fields) {
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
