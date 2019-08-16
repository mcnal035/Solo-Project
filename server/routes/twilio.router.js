// //twilio
const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken)


router.get('/text', (req, res) => {
    client.messages.create({
    to: process.env.MY_PHONE_NUMBER,
    from: '+16129792992',
    body:'New calendar Date has been added.'
  })
  .then((message) => console.log(message.body));
});


