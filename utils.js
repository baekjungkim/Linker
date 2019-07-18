import dotenv from "dotenv";
dotenv.config();
import Twilio from "twilio";

const twilioClient = Twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

export const dateYYYYMMDD = () => {
  const date = new Date();
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  if (month < 10) {
    month = "0" + month;
  }
  if (day < 10) {
    day = "0" + day;
  }

  return year + "" + month + "" + day;
};

export const sendVerificationSMS = (to, key) => {
  sendSMS(to, `Linker 인증번호 : ${key}`);
};

const sendSMS = (to, body) => {
  return twilioClient.messages.create({
    body,
    to,
    from: process.env.TWILIO_PHONE
  });
};
