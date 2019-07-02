let response =  require("express");
let express = require('express');
let router = express.Router();
const assert = require('assert');
const MongoClient = require('mongodb').MongoClient;
let Submission = require('../models/submission.model');
let CONNECTION_URL = 'mongodb+srv://dbUser:dbUserPassword@cluster0-n8uu3.mongodb.net/test?retryWrites=true&w=majority';
const dbName = "QuizDB";
const client = new MongoClient(CONNECTION_URL);


const findDocuments = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('Submissions');
  // Find some documents
  collection.find({}).toArray(function (err, docs) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(docs);
    callback(docs);
  });
};

const insertDocuments = function(db, callback, data) {
  // Get the documents collection
  const collection = db.collection('Submissions');
  // Insert some documents
  collection.insert(data, function(err, result) {
    callback(result);
  });
}


router.get('/', function (req, res, next) {
  res.render('index');
});

router.post("/createSubmission", function(req,res)  {
  //create sub object
  let _Submission = Submission({
    SubmitTime: req.body.SubmitTime,
    ID: req.body.ID,
    Questions: req.body.Questions,
    Username: req.body.Username
  });


  client.connect(function(err) {
    assert.equal(null, err);
    console.log("Connected correctly to server");
    const db = client.db(dbName);

    let result = function (data) {
      res.send(data);
    };

    insertDocuments(db, result, _Submission);
    //findDocuments(db,  result);
  });

});

router.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '../../dist/index.html'));
});


module.exports = router;
