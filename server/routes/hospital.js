const express = require('express');
const router = express.Router();

// MySQL DB
const db = require('../db/db.js');
// Crypto/key related
const crypto = require('../crypto.js');

// GET all hospitals IDs
router.get('/', function(req, res, next) {
  db.query('SELECT hospitalID from hospital', function (error, results, fields) {
    if(error){
      console.log(error);
      // Error 500
      res.status(500).send({ error: error });
    } else {
      res.send(results);
    }
  	});
});

// GET next hospital ID
// RETURNS string with integer value of next ID
router.get('/next', function(req, res, next) {
  db.query('SELECT AUTO_INCREMENT FROM information_schema.tables WHERE table_name = \'hospital\' AND table_schema = DATABASE( ) ;', function (error, results, fields) {
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

// Get a single hospital
router.get('/:id', function (req, res) {
  let hospitalID = req.params.id;
  if (!hospitalID) {
    return res.status(400).send({ error: true, message: 'Please provide hospitalID' });
  }
  db.query('select * from hospital where hospitalID=?', [hospitalID], function (error, results, fields) {
    if(error){
      console.log(error);
      // Error 500
      res.status(500).send({ error: error });
    } else {
      res.send(results);
    }
	});
});

/* POST hospital */
router.post('/', function (req, res) {
    let params = {
      name: crypto.ab2str(req.body.name.data),
      address: crypto.ab2str(req.body.name.data)
    };
    db.query("INSERT INTO hospital SET ?", params, function (error, results, fields) {
      if(error){
        console.log(error);
        // Error 500
        res.status(500).send({ error: error });
      } else {
        console.log("Hospital POST request successful");
        crypto.keygen("hospital", results.insertId);
        res.send(results);
      }
    });
});

/* PUT hospital */
// If the body's request includes the hospitalID, this can change the hospitalID in the DB
router.put('/:id', function (req, res) {
    let hospitalID = req.params.id;
    let params = req.body;
    console.log(params);
    db.query("UPDATE hospital SET ? WHERE hospitalID = ?", [params, hospitalID], function (error, results, fields) {
      if(error){
        console.log(error);
        // Error 500
        res.status(500).send({ error: error });
      } else {
        res.send(results);
      }
    });
});

/* DELETE hospital */
router.delete('/:id', function (req, res) {
  let hospitalID = req.params.id;
  if (!hospitalID) {
    return res.status(400).send({ error: true, message: 'Please provide hospitalID' });
  }
  db.query('DELETE FROM hospital WHERE hospitalID=?', [hospitalID], function (error, results, fields) {
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
