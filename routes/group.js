const express = require('express');
const router = express.Router();

const Group = require('../models/Group');
const bw = require('./bandwidth');

router.post('/', async (req, res, next) => {
  console.log(req.body);
  const adminText = 'Welcome to conference text, please text this group to send messages to all members';
  const groupText = 'Welcome to the Bandwidth Enterprise Connect texting tool! We’ll use this throughout the event for group communication with the Bandwidth team onsite. To ask a question, simply reply to this number - only the show admins will see your text.  To opt out, reply "STOP" - to opt back in, reply "UNSTOP"';
  try {
    const myGroup = new Group(req.body)
    const result = await myGroup.save();
    res.json({result});
    const outMessage = await bw.sendMessage({
      to: req.body.adminNumbers,
      from: req.body.bandwidthAdminNumber,
      text: adminText,
      applicationId: bw.applicationId
    });
    const payload = {
      members: req.body.members,
      from: req.body.bandwidthMemberNumber,
      text: groupText,
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