const express = require('express');
const router = express.Router();

// MySQL DB
const db = require('../db/db.js');
// Crypto/key related
const crypto = require('../crypto.js');

// GET all doctors IDs
router.get('/', function(req, res, next) {
  db.query('SELECT doctorID from doctor', function (error, results, fields) {
    if(error){
      console.log(error);
      // Error 500
      res.status(500).send({ error: error });
    } else {
      res.send(results);
    }
  	});
});

// Get a single doctor
router.get('/:id', function (req, res) {
  let doctorID = req.params.id;
  if (!doctorID) {
    return res.status(400).send({ error: true, message: 'Please provide doctorID' });
  }
  db.query('select * from doctor where doctorID=?', [doctorID], function (error, results, fields) {
    if(error){
      console.log(error);
      // Error 500
      res.status(500).send({ error: error });
    } else {
      res.send(results);
    }
	});
});

// GET next doctor ID
// RETURNS string with integer value of next ID
router.get('/next', function(req, res, next) {
  db.query('SELECT AUTO_INCREMENT FROM information_schema.tables WHERE table_name = \'doctor\' AND table_schema = DATABASE( ) ;', function (error, results, fields) {
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

/* POST doctor */
router.post('/', function (req, res) {
  console.log("POST RECEIVED: New doctor data");
    let params = {
      name: new Buffer(req.body.name.data, 'binary'),
      address: new Buffer(req.body.address.data, 'binary'),
      birthdate: new Buffer(req.body.birthdate.data, 'binary'),
      mobilenumber: new Buffer(req.body.mobilenumber.data, 'binary')
    };
    db.query("INSERT INTO doctor SET ?", params, function (error, results, fields) {
      if(error){
        console.log(error);
        // Error 500
        res.status(500).send({ error: error });
      } else {
        console.log("POST SUCCESS: New doctor");
        crypto.keygen("doctor", results.insertId);
        res.send(results);
      }
    });
});

/* PUT doctor */
router.put('/:id', function (req, res) {
    let doctorID = req.params.id;
    if (!doctorID) {
      return res.status(400).send({ error: true, message: 'Please provide doctorID' });
    }
    console.log("PUT RECEIVED: To edit doctor " + doctorID);
    let params = {
      name: new Buffer(req.body.name.data, 'binary'),
      address: new Buffer(req.body.address.data, 'binary'),
      birthdate: new Buffer(req.body.birthdate.data, 'binary'),
      mobilenumber: new Buffer(req.body.mobilenumber.data, 'binary')
    };
    db.query("UPDATE doctor SET ? WHERE doctorID = ?", [params, doctorID], function (error, results, fields) {
      if(error){
        console.log(error);
        // Error 500
        res.status(500).send({ error: error });
      } else {
        console.log("PUT SUCCESS: Edited doctor");
        res.send(results);
      }
    });
});

/* DELETE doctor */
router.delete('/:id', function (req, res) {
  let doctorID = req.params.id;
  if (!doctorID) {
    return res.status(400).send({ error: true, message: 'Please provide doctorID' });
  }
  db.query('DELETE FROM doctor WHERE doctorID=?', [doctorID], function (error, results, fields) {
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
