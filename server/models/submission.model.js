var mongoose = require('mongoose');
var schema = mongoose.Schema;

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

module.exports = mongoose.model('Submission', subSchema);
