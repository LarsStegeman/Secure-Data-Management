const express = require('express');
const router = express.Router();

// MySQL DB
const db = require('../db/db.js');
// Crypto/key related
const crypto = require('../crypto.js');

// GET all patients IDs
router.get('/', function(req, res, next) {
  db.query('SELECT patientID from patient', function (error, results, fields) {
    if(error){
      console.log(error);
      // Error 500
      res.status(500).send({ error: error });
    } else {
      res.send(results);
    }
  	});
});


// GET next Patient ID
// RETURNS string with integer value of next ID
router.get('/next', function(req, res, next) {
  db.query('SELECT AUTO_INCREMENT FROM information_schema.tables WHERE table_name = \'patient\' AND table_schema = DATABASE( ) ;', function (error, results, fields) {
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

// Get single patient
router.get('/:id', function (req, res) {
  let patientID = req.params.id;
  if (!patientID) {
    res.status(400).send({ error: 'Please provide patientID' });
  }
  db.query('select * from patient where patientID=?', [patientID], function (error, results, fields) {
    if(error){
      console.log(error);
      // Error 500
      res.status(500).send({ error: error });
    } else {
      res.send(results);
    }
	});
});

/* POST patient */
router.post('/', function (req, res) {
  console.log("POST RECEIVED: New patient data");
  let params = {
    name: new Buffer(req.body.name.data, 'binary'),
    address: new Buffer(req.body.address.data, 'binary'),
    birthdate: new Buffer(req.body.birthdate.data, 'binary'),
    mobilenumber: new Buffer(req.body.mobilenumber.data, 'binary'),
    gender: new Buffer(req.body.gender.data, 'binary'),
    bloodgroup: new Buffer(req.body.bloodgroup.data, 'binary'),
    notes: new Buffer(req.body.notes.data, 'binary')
  };
    db.query("INSERT INTO patient SET ? ", params, function (error, results, fields) {
      if(error){
        console.log(error);
        // Error 500
        res.status(500).send({ error: error });
      } else {
        console.log("POST SUCCESS: New patient");
        crypto.keygen("patient", results.insertId);
        res.send(results);
      }
    });
});

/* PUT patient */
router.put('/:id', function (req, res) {
    let patientID = req.params.id;
    if (!patientID) {
      return res.status(400).send({ error: true, message: 'Please provide patientID' });
    }
    console.log("PUT RECEIVED: TO edit patient " + patientID);
    let params = {
      name: new Buffer(req.body.name.data, 'binary'),
      address: new Buffer(req.body.address.data, 'binary')
    };
    db.query("UPDATE patient SET ? WHERE patientID = ?", [params, patientID], function (error, results, fields) {
      if(error){
        console.log(error);
        // Error 500
        res.status(500).send({ error: error });
      } else {
        console.log("PUT SUCCESS: Edited patient");
        res.send(results);
      }
    });
});

/* DELETE patient */
router.delete('/:id', function (req, res) {
  let patientID = req.params.id;
  if (!patientID) {
    return res.status(400).send({ error: true, message: 'Please provide patientID' });
  }
  db.query('DELETE FROM patient WHERE patientID=?', [patientID], function (error, results, fields) {
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
