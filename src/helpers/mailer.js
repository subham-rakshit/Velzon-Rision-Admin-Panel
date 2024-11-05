import { verificationEmailTemplate } from "../../emails/mail-html-templates";
import UserModel from "@/model/User";
import nodemailer from "nodemailer";
import { v4 as uuidv4 } from "uuid";

//NOTE: Nodemailer transporter with MailTrap SMTP
export const mailTransport = () => {
  let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });
  return transporter;
};

//NOTE: 6 digits OTP generator
export const generateOTP = () => {
  let otp = "";
  for (let i = 0; i <= 5; i++) {
    const randomValue = Math.round(Math.random() * 9);
    otp += randomValue;
  }
  return otp;
};

//NOTE: Verification email function
export const sendEmail = async ({ email, emailType, username, userId }) => {
  try {
    //INFO: Create tokenCode and save in DB according to email type
    const verifyToken = uuidv4();
    if (emailType === "VERIFY") {
      await UserModel.findByIdAndUpdate(userId, {
        verifyCode: verifyToken,
        verifyCodeExpiry: Date.now() + 3600000, // 1hr
      });
    } else if (emailType === "RESET") {
      await UserModel.findByIdAndUpdate(userId, {
        forgetPasswordCode: verifyToken,
        forgetPasswordCodeExpiry: Date.now() + 3600000, // 1hr
      });
    }

    //INFO: Nodemailer transporter with MailTrap SMTP
    var transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    //INFO: Mail Options
    const mailOptions = {
      from: process.env.SMTP_MAIL,
      to: email,
      subject:
        emailType === "VERIFY"
          ? "Velzon Admin Verification Code"
          : "Rest Your Password",
      html: verificationEmailTemplate({ token: verifyToken, username }),
    };

    //INFO: Email Response
    await transporter.sendMail(mailOptions);
    return { success: true, message: "Verification email send successfully" };
  } catch (emailError) {
    // Error Response
    console.error("Error sending verification email", emailError);
    return { success: false, message: "Failed to send verification email" };
  }
};
