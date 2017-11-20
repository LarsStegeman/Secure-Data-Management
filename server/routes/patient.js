var express = require('express');
var router = express.Router();

// MySQL DB
const db = require('../db/db.js');

// GET all patients IDs
router.get('/', function(req, res, next) {
  db.query('SELECT patientID from patient', function (error, results, fields) {
    if(error){
      // Error 500
      res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
    } else {
      res.send(JSON.stringify(results));
    }
  	});
});

// Get single patient
router.get('/:id', function (req, res) {
  let patientID = req.params.id;
  if (!patientID) {
    return res.status(400).send({ error: true, message: 'Please provide patientID' });
  }
  db.query('select * from patient where patientID=?', [patientID], function (error, results, fields) {
    if(error){
      console.log(error);
      // Error 500
      res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
    } else {
      res.send(JSON.stringify(results));
    }
	});
});

module.exports = router;
