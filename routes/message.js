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
    const messageText = messagePayload.message.text;
    const fromAdmin = (myGroup.adminNumbers.includes(messagePayload.message.from));
    const toAdminNumber = (messagePayload.message.owner === myGroup.bandwidthAdminNumber);
    const isBroadcast = (messageText.toLowerCase().startsWith("#"))
    const isDirectMessage = (messageText.toLowerCase().startsWith("@"))
    if (fromAdmin && toAdminNumber && isBroadcast) {
      const payload = {
        members: myGroup.members,
        from: myGroup.bandwidthMemberNumber,
        text: messageText,
        applicationId:  messagePayload.message.applicationId
      }
      const messages = await bw.sendMessages(payload);
      return messages;
    }
    else if (fromAdmin && toAdminNumber && isDirectMessage) {
      // grab first word (username)
      const userName = (messageText.substr(1).trim().split(" ")[0]);
      const user = myGroup.members.filter(obj => {
        return obj.userName === userName;
      });
      if (user.length !== 0) {
        const message = await bw.sendMessage({
          to: user.phoneNumber,
          from: myGroup.bandwidthMemberNumber,
          text: messageText,
          applicationId: messagePayload.message.applicationId
        })
        return message;
      }
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
        text: `${member[0].userName}: ${messagePayload.message.text}`,
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