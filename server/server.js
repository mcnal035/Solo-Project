
const express = require('express');
require('dotenv').config();

const app = express();
const bodyParser = require('body-parser');
const sessionMiddleware = require('./modules/session-middleware');

const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const timeRouter = require('./routes/time.router');
const guestRouter = require('./routes/guest.router');


// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/schedule', timeRouter);
app.use('/api/guest_log', guestRouter);

// Serve static files
app.use(express.static('build'));

// //twilio
// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// const client = require('twilio')(accountSid, authToken);
// // twilio message.
// client.messages
//   .create({
//   to: process.env.MY_PHONE_NUMBER,
//   from: '+16129792992',
//   body:'New calendar Date has been added.'
// })
// .then((message) => console.log(message.sid));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
