const express = require('express');
const router = express.Router();
const axios = require('axios');

const userId     = process.env.BANDWIDTH_USER_ID;
const apiToken   = process.env.BANDWIDTH_API_TOKEN;
const apiSecret  = process.env.BANDWIDTH_API_SECRET;

if (!userId || !apiToken || !apiSecret ) {
  throw new Error('Invalid or non-existing Bandwidth credentials. \Please set your: \n * userId \n * apiToken \n * apiSecret');
}

const Message = require('../models/Message');
const MessageCallback = require('../models/MessageCallback');
const Group = require('../models/Group');

const messageV2API = axios.create({
  baseURL: `https://api.catapult.inetwork.com/v2/users/${userId}/messages`,
  auth: {
    username: apiToken,
    password: apiSecret
  },
  headers: {
    'Content-type': 'application/json',
    'Accept': 'application/json'
  }
});

const buildToArray = function (message) {
  let toNumbers = message.message.to;
  let index = toNumbers.indexOf(message.to);
  if (index > -1 ) {
    toNumbers.splice(index, 1);
  }
  toNumbers.push(message.message.from);
  return toNumbers;
};

const sendMessage = async (message) => {
  //console.log(message);
  try {
    const outMessage = await messageV2API.post('', message);
    return outMessage.data;
  }
  catch (e) {
    console.log('Error sending message');
    console.log(e);
    return 'Error Sending Message';
  }
};

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
    const myGroup = await Group.find(query).exec();
    if (!myGroup) {
      return;
    }
    if (myGroup.adminNumbers.includes(messagePayload.message.from)) {
      const messages = [];
      for (let i = 0; i < myGroup.members.length; i++) {
        const message = sendMessage({
          to: myGroup.members[i].phoneNumber,
          from: myGroup.bandwidthMemberNumber,
          text: messagePayload.message.text,
          media: messagePayload.message.media,
          applicationId: messagePayload.message.applicationId
        });
        messages.push(message);
      }
      const responses = await Promise.all(messages);
      return responses;
    }
    const member = myGroup.members.filter(obj => {
      return obj.phoneNumber === messagePayload.message.from;
    })
    if (member.length !== 0) {
      const message = await sendMessage({
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