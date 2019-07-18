import User from "../models/User";
import { sendVerificationSMS } from "../utils";

export const home = (req, res) => {
  res.render("home");
};

export const postSmsRequest = async (req, res) => {
  let {
    body: { phone }
  } = req;
  const user = await User.findOne({ phoneNumber: phone });
  if (user) {
    res.status(400).send();
  } else {
    const phoneVerification = Math.floor(Math.random() * 1000000).toString();
    phone = "+82" + phone;
    await sendVerificationSMS(phone, phoneVerification);
    res.status(200).send(phoneVerification);
  }
};
