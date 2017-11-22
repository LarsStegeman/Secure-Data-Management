const express = require('express');
const router = express.Router();

// MySQL DB
const db = require('../db/db.js');

// GET next employer ID
router.get('/next', function(req, res, next) {
  db.query('SELECT AUTO_INCREMENT FROM information_schema.tables WHERE table_name = \'employer\' AND table_schema = DATABASE( ) ;', function (error, results, fields) {
    if(error){
      console.log(error);
      // Error 500
      res.status(500).send({ error: error });
    } else {
      res.send(JSON.stringify(results));
    }
  	});
});

/* POST employer */
router.post('/', function (req, res) {
    let params = req.body;
    console.log(params);
    db.query("INSERT INTO employer SET ?", params, function (error, results, fields) {
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
