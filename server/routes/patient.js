const express = require('express');
const router = express.Router();

// MySQL DB
const db = require('../db/db.js');
// Crypto/key related
const crypto = require('../crypto.js');

// GET all patients IDs
router.get('/', function(req, res, next) {
  db.query('SELECT patientID from patient', function (error, results, fields) {
    if(error){
      console.log(error);
      // Error 500
      res.status(500).send({ error: error });
    } else {
      res.status(200).send(results);
    }
  	});
});


// GET next Patient ID
// RETURNS string with integer value of next ID
router.get('/next', function(req, res, next) {
  db.query('SELECT AUTO_INCREMENT FROM information_schema.tables WHERE table_name = \'patient\' AND table_schema = DATABASE( ) ;', function (error, results, fields) {
    if(error){
      console.log(error);
      // Error 500
      res.status(500).send({ error: error });
    } else {
      let nextID = JSON.stringify(results).match(db.numberPattern)[0];
      res.status(200).send(nextID);
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
      res.status(200).send(results);
    }
	});
});

/************************************************************************/
/***************************** ASSOCIATION ROUTES ***********************/
/************************************************************************/

// GET ALL PATIENT ASSOCIATIONS
router.get('/associations/:id', function (req, res) {
  console.log("get associations received");
  let patientID = req.params.id;
  if (!patientID) {
    res.status(400).send({ error: 'Please provide patientID' });
  }
  let query = 'SELECT doc.*, hos.*, hc.*, emp.*, ins.* FROM patient pat LEFT JOIN patientdoctor doc ON pat.patientID=doc.patientID LEFT JOIN patienthospital hos ON doc.patientID=hos.patientID LEFT JOIN patienthealthclub hc ON hos.patientID=hc.patientID LEFT JOIN patientemployer emp ON hc.patientID=emp.patientID LEFT JOIN patientinsurance ins ON emp.patientID=ins.patientID WHERE pat.patientID=?'
  db.query(query, [patientID], function (error, results, fields) {
    if(error){
      console.log(error);
      // Error 500
      res.status(500).send({ error: error });
    } else {
      console.log("get associations successfully");
      console.log(results);
      res.status(200).send(results);
    }
	});
});

/***************************** PATIENT-HOSPITAL ***********************/
// GET PATIENT-HOSPITAL using hospitalID
router.get('/hospital/:hospitalid', function (req, res) {
  let hospitalID = req.params.hospitalid;
  if (!hospitalID) {
    res.status(400).send({ error: 'Please provide hospitalID' });
  }
  db.query('select * from patienthospital where hospitalID=?', [hospitalID], function (error, results, fields) {
    if(error){
      console.log(error);
      // Error 500
      res.status(500).send({ error: error });
    } else {
      res.status(200).send(results);
    }
	});
});

// POST PATIENT-HOSPITAL
router.post('/:id/hospital/:hospitalid', function (req, res) {
  console.log("POST RECEIVED: New patient-hospital association");
  let patientID = req.params.id;
  let hospitalID = req.params.hospitalid;
  if (!patientID || !hospitalID) {
    res.status(400).send({ error: 'Please provide patientID and hospitalID' });
  }
  let params = {
    patientID: patientID,
    hospitalID: hospitalID
  };
  if (req.body.data) {
    params.data = new Buffer(req.body.data.data, 'binary');
  }
  db.query('INSERT INTO patienthospital SET ? ', params, function (error, results, fields) {
    if(error){
      console.log(error);
      // Error 500
      res.status(500).send({ error: error });
    } else {
      console.log("POST SUCCESSFUL: New patient-hospital association");
      res.status(200).send(results);
    }
	});
});

/* PUT PATIENT-HOSPITAL */
router.put('/:id/hospital/:hospitalid', function (req, res) {
    let patientID = req.params.id;
    let hospitalID = req.params.hospitalid;
    if (!patientID || !hospitalID) {
      res.status(400).send({ error: 'Please provide patientID and hospitalID' });
    }
    let params = {
      data: new Buffer(req.body.data.data, 'binary')
    };
    console.log("PUT RECEIVED: To edit patient-hospital notes");
    db.query("UPDATE patienthospital SET ? WHERE patientID = ? AND hospitalID = ?", [params, patientID, hospitalID], function (error, results, fields) {
      if(error){
        console.log(error);
        // Error 500
        res.status(500).send({ error: error });
      } else {
        console.log("PUT SUCCESS: Edited patient-hospital notes");
        res.status(200).send(results);
      }
    });
});

/* DELETE patient-hospital */
router.delete('/:id/hospital/:hospitalid', function (req, res) {
  let patientID = req.params.id;
  let hospitalID = req.params.hospitalid;
  if (!patientID || !hospitalID) {
    res.status(400).send({ error: 'Please provide patientID and hospitalID' });
  }
  db.query('DELETE FROM patienthospital WHERE patientID = ? AND hospitalID = ?', [patientID, hospitalID], function (error, results, fields) {
    if(error){
      console.log(error);
      // Error 500
      res.status(500).send({ error: error });
    } else {
      res.status(200).send(results);
    }
	});
});

/***************************** PATIENT-HEALTHCLUB ***********************/
// GET PATIENT-HEALTHCLUB using healthclubID
router.get('/healthclub/:healthclubid', function (req, res) {
  let healthclubID = req.params.healthclubid;
  if (!healthclubID) {
    res.status(400).send({ error: 'Please provide healthclubID' });
  }
  db.query('select * from patienthealthclub where healthclubID=?', [healthclubID], function (error, results, fields) {
    if(error){
      console.log(error);
      // Error 500
      res.status(500).send({ error: error });
    } else {
      res.status(200).send(results);
    }
	});
});

// POST patient-healthclub association
router.post('/:id/healthclub/:healthclubid', function (req, res) {
  console.log("POST RECEIVED: New patient-healthclub association");
  let patientID = req.params.id;
  let healthclubID = req.params.healthclubid;
  if (!patientID || !healthclubID) {
    res.status(400).send({ error: 'Please provide patientID and healthclubID' });
  }
  let params = {
    patientID: patientID,
    healthclubID: healthclubID
  };
  if (req.body.data) {
    params.data = new Buffer(req.body.data.data, 'binary');
  }
  db.query('INSERT INTO patienthealthclub SET ? ', params, function (error, results, fields) {
    if(error){
      console.log(error);
      // Error 500
      res.status(500).send({ error: error });
    } else {
      console.log("POST SUCCESSFUL: New patient-healthclub association");
      res.status(200).send(results);
    }
	});
});

/* PUT PATIENT-HEALTHCLUB */
router.put('/:id/healthclub/:healthclubid', function (req, res) {
    let patientID = req.params.id;
    let healthclubID = req.params.healthclubid;
    if (!patientID || !healthclubID) {
      res.status(400).send({ error: 'Please provide patientID and healthclubID' });
    }
    let params = {
      data: new Buffer(req.body.data.data, 'binary')
    };
    console.log("PUT RECEIVED: To edit patient-healthclub notes");
    db.query("UPDATE patienthealthclub SET ? WHERE patientID = ? AND healthclubID = ?", [params, patientID, healthclubID], function (error, results, fields) {
      if(error){
        console.log(error);
        // Error 500
        res.status(500).send({ error: error });
      } else {
        console.log("PUT SUCCESS: Edited patient-healthclub notes");
        res.status(200).send(results);
      }
    });
});

/* DELETE patient-healthclub */
router.delete('/:id/healthclub/:healthclubid', function (req, res) {
  let patientID = req.params.id;
  let healthclubID = req.params.healthclubid;
  if (!patientID || !healthclubID) {
    res.status(400).send({ error: 'Please provide patientID and healthclubID' });
  }
  db.query('DELETE FROM patienthealthclub WHERE patientID = ? AND healthclubID = ?', [patientID, healthclubID], function (error, results, fields) {
    if(error){
      console.log(error);
      // Error 500
      res.status(500).send({ error: error });
    } else {
      res.status(200).send(results);
    }
	});
});

/***************************** PATIENT-DOCTOR ***********************/
// GET PATIENT-DOCTOR using doctorID
router.get('/doctor/:doctorid', function (req, res) {
  let doctorID = req.params.doctorid;
  if (!doctorID) {
    res.status(400).send({ error: 'Please provide doctorID' });
  }
  db.query('select * from patientdoctor where doctorID=?', [doctorID], function (error, results, fields) {
    if(error){
      console.log(error);
      // Error 500
      res.status(500).send({ error: error });
    } else {
      res.status(200).send(results);
    }
	});
});

// POST patient-doctor association
router.post('/:id/doctor/:doctorid', function (req, res) {
  console.log("POST RECEIVED: New patient-doctor association");
  let patientID = req.params.id;
  let doctorID = req.params.doctorid;
  if (!patientID || !doctorID) {
    res.status(400).send({ error: 'Please provide patientID and doctorID' });
  }
  let params = {
    patientID: patientID,
    doctorID: doctorID
  };
  db.query('INSERT INTO patientdoctor SET ? ', params, function (error, results, fields) {
    if(error){
      console.log(error);
      // Error 500
      res.status(500).send({ error: error });
    } else {
      console.log("POST SUCCESSFUL: New patient-doctor association");
      res.status(200).send(results);
    }
	});
});

/* DELETE patient-doctor */
router.delete('/:id/doctor/:doctorid', function (req, res) {
  let patientID = req.params.id;
  let doctorID = req.params.doctorid;
  if (!patientID || !doctorID) {
    res.status(400).send({ error: 'Please provide patientID and doctorID' });
  }
  db.query('DELETE FROM patientdoctor WHERE patientID = ? AND doctorID = ?', [patientID, doctorID], function (error, results, fields) {
    if(error){
      console.log(error);
      // Error 500
      res.status(500).send({ error: error });
    } else {
      res.status(200).send(results);
    }
	});
});

/***************************** PATIENT-EMPLOYER ***********************/
// GET PATIENT-EMPLOYER using employerID
router.get('/employer/:employerid', function (req, res) {
  let employerID = req.params.employerid;
  if (!employerID) {
    res.status(400).send({ error: 'Please provide employerID' });
  }
  db.query('select * from patientemployer where employerID=?', [employerID], function (error, results, fields) {
    if(error){
      console.log(error);
      // Error 500
      res.status(500).send({ error: error });
    } else {
      res.status(200).send(results);
    }
	});
});

// POST patient-employer association
router.post('/:id/employer/:employerid', function (req, res) {
  console.log("POST RECEIVED: New patient-employer association");
  let patientID = req.params.id;
  let employerID = req.params.employerid;
  if (!patientID || !employerID) {
    res.status(400).send({ error: 'Please provide patientID and employerID' });
  }
  let params = {
    patientID: patientID,
    employerID: employerID
  };
  db.query('INSERT INTO patientemployer SET ? ', params, function (error, results, fields) {
    if(error){
      console.log(error);
      // Error 500
      res.status(500).send({ error: error });
    } else {
      console.log("POST SUCCESSFUL: New patient-employer association");
      res.status(200).send(results);
    }
	});
});

/* DELETE patient-employer */
router.delete('/:id/employer/:employerid', function (req, res) {
  let patientID = req.params.id;
  let employerID = req.params.employerid;
  if (!patientID || !employerID) {
    res.status(400).send({ error: 'Please provide patientID and employerID' });
  }
  db.query('DELETE FROM patientemployer WHERE patientID = ? AND employerID = ?', [patientID, employerID], function (error, results, fields) {
    if(error){
      console.log(error);
      // Error 500
      res.status(500).send({ error: error });
    } else {
      res.status(200).send(results);
    }
	});
});

/***************************** PATIENT-INSURANCE ***********************/
// GET PATIENT-INSURANCE using insuranceID
router.get('/insurance/:insuranceid', function (req, res) {
  let insuranceID = req.params.insuranceid;
  if (!insuranceID) {
    res.status(400).send({ error: 'Please provide insuranceID' });
  }
  db.query('select * from patientinsurance where insuranceID=?', [insuranceID], function (error, results, fields) {
    if(error){
      console.log(error);
      // Error 500
      res.status(500).send({ error: error });
    } else {
      res.status(200).send(results);
    }
	});
});

// POST patient-insurance association
router.post('/:id/insurance/:insuranceid', function (req, res) {
  console.log("POST RECEIVED: New patient-insurance association");
  let patientID = req.params.id;
  let insuranceID = req.params.insuranceid;
  if (!patientID || !insuranceID) {
    res.status(400).send({ error: 'Please provide patientID and insuranceID' });
  }
  let params = {
    patientID: patientID,
    insuranceID: insuranceID
  };
  db.query('INSERT INTO patientinsurance SET ? ', params, function (error, results, fields) {
    if(error){
      console.log(error);
      // Error 500
      res.status(500).send({ error: error });
    } else {
      console.log("POST SUCCESSFUL: New patient-insurance association");
      res.status(200).send(results);
    }
	});
});

/* DELETE patient-insurance */
router.delete('/:id/insurance/:insuranceid', function (req, res) {
  let patientID = req.params.id;
  let insuranceID = req.params.insuranceid;
  if (!patientID || !insuranceID) {
    res.status(400).send({ error: 'Please provide patientID and insuranceID' });
  }
  db.query('DELETE FROM patientinsurance WHERE patientID = ? AND insuranceID = ?', [patientID, insuranceID], function (error, results, fields) {
    if(error){
      console.log(error);
      // Error 500
      res.status(500).send({ error: error });
    } else {
      res.status(200).send(results);
    }
	});
});

/********************************* END OF ASSOCIATIONS ***************************************/

/* POST patient */
router.post('/', function (req, res) {
  console.log("POST RECEIVED: New patient data");
  let params = {
    name: new Buffer(req.body.name.data, 'binary'),
    address: new Buffer(req.body.address.data, 'binary'),
    birthdate: new Buffer(req.body.birthdate.data, 'binary'),
    mobilenumber: new Buffer(req.body.mobilenumber.data, 'binary'),
    gender: new Buffer(req.body.gender.data, 'binary'),
    bloodgroup: new Buffer(req.body.bloodgroup.data, 'binary'),
    notes: new Buffer(req.body.notes.data, 'binary')
  };
    db.query("INSERT INTO patient SET ? ", params, function (error, results, fields) {
      if(error){
        console.log(error);
        // Error 500
        res.status(500).send({ error: error });
      } else {
        console.log("POST SUCCESS: New patient");
        crypto.keygen("patient", results.insertId);
        res.status(200).send(results);
      }
    });
});

/* PUT patient */
router.put('/:id', function (req, res) {
    let patientID = req.params.id;
    if (!patientID) {
      return res.status(400).send({ error: true, message: 'Please provide patientID' });
    }
    console.log("PUT RECEIVED: TO edit whole patient " + patientID);
    let params = {
      name: new Buffer(req.body.name.data, 'binary'),
      address: new Buffer(req.body.address.data, 'binary'),
      birthdate: new Buffer(req.body.birthdate.data, 'binary'),
      mobilenumber: new Buffer(req.body.mobilenumber.data, 'binary'),
      gender: new Buffer(req.body.gender.data, 'binary'),
      bloodgroup: new Buffer(req.body.bloodgroup.data, 'binary'),
      notes: new Buffer(req.body.notes.data, 'binary')
    };
    db.query("UPDATE patient SET ? WHERE patientID = ?", [params, patientID], function (error, results, fields) {
      if(error){
        console.log(error);
        // Error 500
        res.status(500).send({ error: error });
      } else {
        console.log("PUT SUCCESS: Edited whole patient");
        res.status(200).send(results);
      }
    });
});

/* PUT FOR PATIENT NOTES ONLY */
router.put('/notes/:id', function (req, res) {
    let patientID = req.params.id;
    if (!patientID) {
      return res.status(400).send({ error: true, message: 'Please provide patientID' });
    }
    console.log("PUT RECEIVED: TO edit patient " + patientID + " notes");
    let params = {
      notes: new Buffer(req.body.notes.data, 'binary')
    };
    db.query("UPDATE patient SET ? WHERE patientID = ?", [params, patientID], function (error, results, fields) {
      if(error){
        console.log(error);
        // Error 500
        res.status(500).send({ error: error });
      } else {
        console.log("PUT SUCCESS: Edited patient notes");
        res.status(200).send(results);
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
      res.status(200).send(results);
    }
	});
});

module.exports = router;
