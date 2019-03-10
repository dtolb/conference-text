const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const schema = new Schema({
  bandwidthMemberNumber : {type: String, required: true},
  bandwidthAdminNumber  : {type: String, required: true},
  adminNumbers          : {type: [String], required: true},
  members         : [{
    phoneNumber : {type: String, required: true},
    name        : {type: String, required: true},
  }], required: true},
);

module.exports = mongoose.model('Group', schema);