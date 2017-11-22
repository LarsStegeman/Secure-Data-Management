var express = require('express');
var router = express.Router();

// MySQL DB
const db = require('../db/db.js');

// GET all patients IDs
router.get('/', function(req, res, next) {
  db.query('SELECT patientID from patient', function (error, results, fields) {
    if(error){
      console.log(error);
      // Error 500
      res.status(500).send({ error: error });
    } else {
      res.send(JSON.stringify(results));
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
      res.send(JSON.stringify(results));
    }
	});
});

/* POST patient */
router.post('/', function (req, res) {
    let params = req.body;
    console.log(params);
    db.query("INSERT INTO patient SET ? ", params, function (error, results, fields) {
      if(error){
        console.log(error);
        // Error 500
        res.status(500).send({ error: error });
      } else {
        res.send(JSON.stringify(results));
      }
    });
});

/* PUT patient */
// If the body's request includes the patientID, this can change the patientID in the DB
router.put('/:id', function (req, res) {
    let patientID = req.params.id;
    let params = req.body;
    console.log(params);
    console.log(patientID);

    db.query("UPDATE patient SET ? WHERE patientID = ?", [params, patientID], function (error, results, fields) {
      if(error){
        console.log(error);
        // Error 500
        res.status(500).send({ error: error });
      } else {
        res.send(JSON.stringify(results));
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
      res.send(JSON.stringify(results));
    }
	});
});

module.exports = router;
