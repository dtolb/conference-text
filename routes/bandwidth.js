const axios = require('axios');

const accountId     = process.env.BANDWIDTH_ACCOUNT_ID;
const apiToken   = process.env.BANDWIDTH_API_TOKEN;
const apiSecret  = process.env.BANDWIDTH_API_SECRET;
module.exports.applicationId = process.env.BANDWIDTH_APPLICATION || 'ed22c391-94e2-4d5a-a73b-b849d063c056';

if (!accountId || !apiToken || !apiSecret || !module.exports.applicationId) {
  throw new Error('Invalid or non-existing Bandwidth credentials. \Please set your: \n * accountId \n * apiToken \n * apiSecret');
}

const messageV2API = axios.create({
  baseURL: `https://messaging.bandwidth.com/api/v2/users/${accountId}/messages`,
  auth: {
    username: apiToken,
    password: apiSecret
  },
  headers: {
    'Content-type': 'application/json',
    'Accept': 'application/json'
  }
});

module.exports.buildToArray = function (message) {
  let toNumbers = message.message.to;
  let index = toNumbers.indexOf(message.to);
  if (index > -1 ) {
    toNumbers.splice(index, 1);
  }
  toNumbers.push(message.message.from);
  return toNumbers;
};

module.exports.sendMessages = async (payload) => {
  const messages = [];
  for (let i = 0; i < payload.members.length; i++) {
    const message = module.exports.sendMessage({
      to: payload.members[i].phoneNumber,
      from: payload.from,
      text: payload.text,
      applicationId: payload.applicationId
    });
    messages.push(message);
  }
  const responses = await Promise.all(messages);
  return responses;
};

module.exports.sendMessage = async (message) => {
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