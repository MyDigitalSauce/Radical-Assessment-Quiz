var express = require('express');
var router = express.Router();
const path = require('path');
var Submission = require('../models/submission.model');

router.get('/', function (req, res, next) {
  res.render('index');
});

router.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '../../dist/index.html'));
});

router.post("/createSubmission", function(req,res)  {

  //create sub object
  let _Submission = Submission({
    SubmitTime: req.body.SubmitTime,
    ID: req.body.ID,
    Questions: req.body.Questions
  });

  //save the object
  _Submission.save(function(err, result)  {
    if(err) {
      return res.status(500).json({
        title: 'Error saving Submission',
        error: err
      })
    }
    res.status(200).json({
      title: 'success',
      result: result
    });
  });
});

module.exports = router;
