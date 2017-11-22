const express = require('express');
const router = express.Router();

// MySQL DB
const db = require('../db/db.js');

// GET all doctos IDs
router.get('/', function(req, res, next) {
  db.query('SELECT doctorID from doctor', function (error, results, fields) {
    if(error){
      console.log(error);
      // Error 500
      res.status(500).send({ error: error });
    } else {
      res.send(JSON.stringify(results));
    }
  	});
});

// GET next doctor ID
router.get('/next', function(req, res, next) {
  db.query('SELECT AUTO_INCREMENT FROM information_schema.tables WHERE table_name = \'doctor\' AND table_schema = DATABASE( ) ;', function (error, results, fields) {
    if(error){
      console.log(error);
      // Error 500
      res.status(500).send({ error: error });
    } else {
      res.send(JSON.stringify(results));
    }
  	});
});

// Get a single doctor
router.get('/:id', function (req, res) {
  let doctorID = req.params.id;
  if (!doctorID) {
    return res.status(400).send({ error: true, message: 'Please provide doctorID' });
  }
  db.query('select * from hospital where doctorID=?', [doctorID], function (error, results, fields) {
    if(error){
      console.log(error);
      // Error 500
      res.status(500).send({ error: error });
    } else {
      res.send(JSON.stringify(results));
    }
	});
});

/* POST doctor */
router.post('/', function (req, res) {
    let params = req.body;
    console.log(params);
    db.query("INSERT INTO doctor SET ?", params, function (error, results, fields) {
      if(error){
        console.log(error);
        // Error 500
        res.status(500).send({ error: error });
      } else {
        res.send(JSON.stringify(results));
      }
    });
});

/* PUT doctor */
// If the body's request includes the doctorID, this can change the doctorID in the DB
router.put('/:id', function (req, res) {
    let doctorID = req.params.id;
    let params = req.body;
    console.log(params);
    db.query("UPDATE doctor SET ? WHERE doctorID = ?", [params, doctorID], function (error, results, fields) {
      if(error){
        console.log(error);
        // Error 500
        res.status(500).send({ error: error });
      } else {
        res.send(JSON.stringify(results));
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
      res.send(JSON.stringify(results));
    }
	});
});

module.exports = router;
