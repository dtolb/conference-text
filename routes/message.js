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
  const messagePayload = req.body[0]
  try {
    res.sendStatus(200);
    const myCallback = new MessageCallback(messagePayload);
    const result = await myCallback.save();
    //console.log(result);
    if (messagePayload.message.direction === 'out') {
      return result;
    }
    const myGroup = await Group.find({ bandwidthAdminNumber: messagePayload.message.owner }).exec();
    if (!myGroup) {

    }
    if (myGroup.adminNumber === messagePayload.message.from) {
      const messages = [];
      for (let i = 0; i < myGroup.memberNumbers.length; i++) {
        const message = sendMessage({
          to: myGroup.memberNumbers[i],
          from: messagePayload.message.owner,
          text: messagePayload.message.text,
          media: messagePayload.message.media,
          applicationId: messagePayload.message.applicationId
        });
        messages.push(message);
      }
      const responses = await Promise.all(messages);
      //console.log(responses);
    }
    else if (myGroup.memberNumbers.indexOf(messagePayload.message.from) > -1) {
      const message = await sendMessage({
        to: myGroup.adminNumber,
        from: messagePayload.message.owner,
        text: messagePayload.message.text,
        media: messagePayload.message.media,
        applicationId: messagePayload.message.applicationId
      });
    }
    else {
      console.log('Number mismatch');
    }
  }
  catch (e) {
    console.log('Error Matching and Sending Messages');
    console.log(e);
  };
});


module.exports = router;