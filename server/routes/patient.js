var express = require('express');
var router = express.Router();

// MySQL DB
const db = require('../db/db.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  db.query('SELECT patientID from patient', function (error, results, fields) {
	  	if(error){
	  		res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
	  		//If there is error, we send the error in the error section with 500 status
	  	} else {
  			res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  			//If there is no error, all is good and response is 200OK.
	  	}
  	});
});

//rest api to get a single patient data
router.get('/:id', function (req, res) {
  let patientID = req.params.id;
  if (!patientID) {
    return res.status(400).send({ error: true, message: 'Please provide patientID' });
  }

  db.query('select * from patient where patientID=?', [patientID], function (error, results, fields) {
    if (error) throw error;
	  res.end(JSON.stringify(results));
	});
});

module.exports = router;
