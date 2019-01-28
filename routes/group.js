const express = require('express');
const router = express.Router();

const Group = require('../models/Group');

router.post('/', async (req, res, next) => {
  console.log(req.body);
  try {
    const myGroup = new Group(req.body)
    const result = await myGroup.save();
    res.json({result});
  }
  catch (e) {
    console.log('Error Saving Group');
    console.log(e);
    next(e);
  };
});


module.exports = router;