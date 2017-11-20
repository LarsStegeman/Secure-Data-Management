var express = require('express');
var router = express.Router();

// MySQL DB
const db = require('../db/db.js');

// GET all hospitals IDs
router.get('/', function(req, res, next) {
  db.query('SELECT hospitalID from hospital', function (error, results, fields) {
    if(error){
      // Error 500
      res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
    } else {
      res.send(JSON.stringify(results));
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
      res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
    } else {
      res.send(JSON.stringify(results));
    }
	});
});

module.exports = router;
