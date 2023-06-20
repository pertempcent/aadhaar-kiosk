import twilio from 'twilio';
import generateOTP from '../utils/otp.js';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const sendSMS = (phone, message) => {
  const client = twilio(accountSid, authToken);
  client.messages
    .create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phone,
    })
    .then((message) => console.log(message.sid));
};

// sendSMS ('+919637884048', generateOTP());
export default sendSMS;