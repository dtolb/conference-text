const express = require('express');
const router = express.Router();

const Group = require('../models/Group');
const bw = require('./bandwidth');

router.post('/', async (req, res, next) => {
  console.log(req.body);
  const text = 'Welcome to conference text, please text this'
  try {
    const myGroup = new Group(req.body)
    const result = await myGroup.save();
    res.json({result});
    const outMessage = await bw.sendMessage({
      to: req.body.adminNumbers,
      from: req.body.bandwidthAdminNumber,
      text: `${text} group!`,
      applicationId: bw.applicationId
    });
    const payload = {
      members: req.body.members,
      from: req.body.bandwidthMemberNumber,
      text: `${text} number!`,
      applicationId: bw.applicationId
    }
    const messages = await bw.sendMessages(payload);
    console.log(outMessage);
  }
  catch (e) {
    console.log('Error Saving Group');
    console.log(e);
    next(e);
  };
});


module.exports = router;