const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    type          : {type: String, required: true},
    time          : {type: String, required: true},
    description   : {type: String, required: false},
    to            : {type: String, required: true},
    errorCode     : {type: Number, required: false},
    message       : {
      id            : {type: String, required: true},
      time          : {type: String, required: true},
      to            : {type: [String], required: true},
      from          : {type: String, required: true},
      text          : {type: String, required: true},
      applicationId : {type: String, required: true},
      media         : {type: [String], required: true},
      owner         : {type: String, required: true},
      direction     : {type: String, required: true},
      segmentCount  : {type: Number, required: false},
    }
});

module.exports = mongoose.model('MessageCallback', schema);