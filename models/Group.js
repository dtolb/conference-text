const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const schema = new Schema({
  bandwidthNumber : {type: String, required: true},
  adminNumber     : {type: String, required: true},
  memberNumbers   : {type: [String], required: true},
});

module.exports = mongoose.model('Group', schema);