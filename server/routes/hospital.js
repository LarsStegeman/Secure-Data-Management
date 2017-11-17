var express = require('express');
var router = express.Router();

// MySQL DB
const db = require('../db/db.js');

/* GET hospital listing. */
router.get('/', function(req, res, next) {
  db.query('SELECT hospitalID from hospital', function (error, results, fields) {
	  	if(error){
	  		res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
	  		//If there is error, we send the error in the error section with 500 status
	  	} else {
  			res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  			//If there is no error, all is good and response is 200OK.
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
    if (error) throw error;
	  res.end(JSON.stringify(results));
	});
});

module.exports = router;
