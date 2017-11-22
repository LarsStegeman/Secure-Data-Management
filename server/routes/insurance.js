const express = require('express');
const router = express.Router();

// MySQL DB
const db = require('../db/db.js');

// GET next insurance ID
router.get('/next', function(req, res, next) {
  db.query('SELECT AUTO_INCREMENT FROM information_schema.tables WHERE table_name = \'insurance\' AND table_schema = DATABASE( ) ;', function (error, results, fields) {
    if(error){
      console.log(error);
      // Error 500
      res.status(500).send({ error: error });
    } else {
      res.send(JSON.stringify(results));
    }
  	});
});

/* POST insurance */
router.post('/', function (req, res) {
    let params = req.body;
    console.log(params);
    db.query("INSERT INTO insurance SET ?", params, function (error, results, fields) {
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
