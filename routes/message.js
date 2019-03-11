const express = require('express');
const router = express.Router();
const axios = require('axios');
const bw = require('./bandwidth');

const Message = require('../models/Message');
const MessageCallback = require('../models/MessageCallback');
const Group = require('../models/Group');

router.post('/', async (req, res) => {
  //console.log(req.body)
  try {
    res.sendStatus(200);
    const messagePayload = req.body[0]
    const myCallback = new MessageCallback(messagePayload);
    const result = await myCallback.save();
    //console.log(result);
    if (messagePayload.message.direction === 'out') {
      return result;
    }
    const query = {$or: [
      { bandwidthAdminNumber: messagePayload.message.owner },
      { bandwidthMemberNumber: messagePayload.message.owner },
    ]};
    const myGroup = await Group.findOne(query).exec();
    console.log(myGroup);
    if (!myGroup) {
      return;
    }
    const fromAdmin = (myGroup.adminNumbers.includes(messagePayload.message.from));
    const toAdminNumber = (messagePayload.message.owner === myGroup.bandwidthAdminNumber);
    if (fromAdmin && toAdminNumber) {
      const payload = {
        members: myGroup.members,
        from: myGroup.bandwidthMemberNumber,
        text: messagePayload.message.text,
        applicationId:  messagePayload.message.applicationId
      }
      const messages = await bw.sendMessages(payload);
      return messages;
    }
    else {
      console.log(`Number ${messagePayload.message.from} is not an admin`);
    }
    const member = myGroup.members.filter(obj => {
      return obj.phoneNumber === messagePayload.message.from;
    })
    if (member.length !== 0) {
      const message = await bw.sendMessage({
        to: myGroup.adminNumbers,
        from: myGroup.bandwidthAdminNumber,
        text: `${member[0].name}: ${messagePayload.message.text}`,
        media: messagePayload.message.media,
        applicationId: messagePayload.message.applicationId
      });

      return message;
    }
    else {
      console.log(`Unknown member number: ${messagePayload.message.from}`);
    }
  }
  catch (e) {
    console.log('Error Matching and Sending Messages');
    console.log(e);
  };
});


module.exports = router;