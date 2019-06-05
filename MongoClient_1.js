const MongoClient = require('mongodb').MongoClient;
let CONNECTION_URL = 'mongodb+srv://dbUser:dbUserPassword@cluster0-n8uu3.mongodb.net/test?retryWrites=true&w=majority';
const dbName = "QuizDB";
const client = new MongoClient(CONNECTION_URL);
var mongoose = require('mongoose');
var schema = mongoose.Schema;
const assert = require('assert');

var subSchema = new schema({
  Questions: {type: [{
    ID: {type: String},
    TitleText: {type: String},
    Answer: {type: Object},
    UserID: {type: String},
    Time: {type: String},
  }]},
  SubmitTime: {type: String},
  ID: {type: String},
  Username: {type: String}
});

_Submission = mongoose.model('Submission', subSchema);

const findDocuments = function(db, callback) {
  const collection = db.collection('Submissions');
  collection.find({}).toArray(function (err, docs) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(docs);
    callback(docs);
  });
};

client.connect(function(err) {
  assert.equal(null, err);
  console.log("Connected correctly to server");
  const db = client.db(dbName);
  let result = function (data) {
    console.log(data);
  };
  findDocuments(db, result);
});
