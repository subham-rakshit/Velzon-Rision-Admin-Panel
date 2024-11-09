import {
  resetPasswordTokenEmailTemplate,
  verificationEmailTemplate,
} from "../../emails/mail-html-templates";
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

//NOTE: 4 digits OTP generator
export const generateOTP = () => {
  return Math.floor(1000 + Math.random() * 9000); // Ex - 1000 + 0.6789 * 9000
};

//NOTE: Verification email function
export const sendEmail = async ({ email, emailType, username, userId }) => {
  try {
    //INFO: Create tokenCode and save in DB according to email type
    const otp = generateOTP();
    const verifyToken = uuidv4();

    if (emailType === "VERIFY" || emailType === "RESEND") {
      await UserModel.findByIdAndUpdate(userId, {
        verifyCode: otp,
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
        emailType === "VERIFY" || emailType === "RESEND"
          ? "Velzon Admin Verification Code"
          : "Rest Your Password",
      html:
        emailType === "VERIFY" || "RESEND"
          ? verificationEmailTemplate({ otp, username })
          : resetPasswordTokenEmailTemplate({ token: verifyToken, username }),
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
