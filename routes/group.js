const express = require('express');
const router = express.Router();

const Group = require('../models/Group');
const bw = require('./bandwidth');

router.post('/', async (req, res, next) => {
  console.log(req.body);
  const adminText = 'Welcome to conference text, please text this group to send messages to all members.\nIn order to send a message to all members, prefix your message with "#" like:\n"#Hey everyone food is at noon"\nTo send a message to a specific member, prefix your message with "@username" like:\n "@dtolb Food is at noon"';
  const groupText = 'Welcome to the Bandwidth ITW texting tool! We’ll use this throughout the event for group communication with the Bandwidth team onsite. To ask a question, simply reply to this number - only the show admins will see your text.  To opt out, reply “STOP” - to opt back in, reply “UNSTOP”';
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