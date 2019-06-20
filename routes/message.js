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
    if (messagePayload.message.direction.toLowerCase() !== 'in') {
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
    const messageText     = (messagePayload.message.text);
    const fromAdmin       = (myGroup.adminNumbers.includes(messagePayload.message.from));
    const toAdminNumber   = (messagePayload.message.owner === myGroup.bandwidthAdminNumber);
    const isBroadcast     = (messageText.toLowerCase().startsWith("#"))
    const isDirectMessage = (messageText.toLowerCase().startsWith("@"))
    if (fromAdmin && toAdminNumber && isBroadcast) {
      const text = messageText.substring(1).trim();
      const payload = {
        members       : myGroup.members,
        from          : myGroup.bandwidthMemberNumber,
        text          : text,
        applicationId : messagePayload.message.applicationId
      }
      const messages = await bw.sendMessages(payload);
      return messages;
    }
    else if (fromAdmin && toAdminNumber && isDirectMessage) {
      // grab first word (username)
      const userName = (messageText.substr(1).trim().split(" ")[0]);
      const text = messageText.substring(1).replace(userName, "").trim();
      const member = myGroup.members.filter(obj => {
        return obj.userName === userName;
      });
      if (member.length !== 0) {
        const message = await bw.sendMessage({
          to            : member[0].phoneNumber,
          from          : myGroup.bandwidthMemberNumber,
          text          : text,
          applicationId : messagePayload.message.applicationId
        })
        return message;
      }
    }
    else {
      console.log(`Did not broadcast message: ${messageText} from ${messagePayload.message.from}`);
    }
    const member = myGroup.members.filter(obj => {
      return obj.phoneNumber === messagePayload.message.from;
    })
    const isMember = (member.length !== 0)
    if (isMember) {
      const message = await bw.sendMessage({
        to            : myGroup.adminNumbers,
        from          : myGroup.bandwidthAdminNumber,
        text          : `${member[0].userName}: ${messagePayload.message.text}\n reply @${member[0].userName} to send a message to ${member[0].name}`,
        media         : messagePayload.message.media,
        applicationId : messagePayload.message.applicationId
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