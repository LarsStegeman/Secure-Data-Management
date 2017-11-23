const express = require('express');
const router = express.Router();

// MySQL DB
const db = require('../db/db.js');
// Crypto/key related
const crypto = require('../crypto.js');

// GET all insurances IDs
router.get('/', function(req, res, next) {
  db.query('SELECT insuranceID from insurance', function (error, results, fields) {
    if(error){
      console.log(error);
      // Error 500
      res.status(500).send({ error: error });
    } else {
      res.send(results);
    }
  	});
});

// Get a single insurance
router.get('/:id', function (req, res) {
  let insuranceID = req.params.id;
  if (!insuranceID) {
    return res.status(400).send({ error: true, message: 'Please provide insuranceID' });
  }
  db.query('select * from insurance where insuranceID=?', [insuranceID], function (error, results, fields) {
    if(error){
      console.log(error);
      // Error 500
      res.status(500).send({ error: error });
    } else {
      res.send(results);
    }
	});
});

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
    console.log("POST RECEIVED: New insurance data");
    let params = {
      name: new Buffer(req.body.name.data, 'binary'),
      address: new Buffer(req.body.address.data, 'binary')
    };
    db.query("INSERT INTO insurance SET ?", params, function (error, results, fields) {
      if(error){
        console.log(error);
        // Error 500
        res.status(500).send({ error: error });
      } else {
        console.log("POST SUCCESS: New insurance");
        crypto.keygen("insurance", results.insertId);
        res.send(results);
      }
    });
});

/* PUT insurance */
router.put('/:id', function (req, res) {
    let insuranceID = req.params.id;
    if (!insuranceID) {
      return res.status(400).send({ error: true, message: 'Please provide insuranceID' });
    }
    console.log("PUT RECEIVED: TO edit insurance " + insuranceID);
    let params = {
      name: new Buffer(req.body.name.data, 'binary'),
      address: new Buffer(req.body.address.data, 'binary')
    };
    db.query("UPDATE insurance SET ? WHERE insuranceID = ?", [params, insuranceID], function (error, results, fields) {
      if(error){
        console.log(error);
        // Error 500
        res.status(500).send({ error: error });
      } else {
        console.log("PUT SUCCESS: Edited insurance");
        res.send(results);
      }
    });
});

/* DELETE insurance */
router.delete('/:id', function (req, res) {
  let insuranceID = req.params.id;
  if (!insuranceID) {
    return res.status(400).send({ error: true, message: 'Please provide insuranceID' });
  }
  db.query('DELETE FROM insurance WHERE insuranceID=?', [insuranceID], function (error, results, fields) {
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
