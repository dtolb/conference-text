const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const schema = new Schema({
  id            : {type: String, required: true},
  time          : {type: String, required: true},
  to            : {type: [String], required: true},
  from          : {type: String, required: true},
  text          : {type: String, required: true},
  applicationId : {type: String, required: true},
  tag           : {type: String, required: true},
  owner         : {type: String, required: true},
  direction     : {type: String, required: true},
  segmentCount  : {type: Number, required: true},
});

module.exports = mongoose.model('Message', schema);