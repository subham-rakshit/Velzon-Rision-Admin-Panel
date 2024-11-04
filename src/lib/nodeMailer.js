import { generateOTPEmailTemplate } from "@/helpers/emails/sendMailTemplate";
import nodemailer from "nodemailer";

//NOTE: Nodemailer transporter
export const mailTransport = () => {
  let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT, //INFO: Typically 587 for TLS, 465 for SSL
    secure: false, //INFO: Use `true` for port 465, `false` for all other ports
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });
  return transporter;
};

//NOTE: Verification email function
export const sendVerificationEmail = async (email, username, verifyCode) => {
  try {
    // Email Send
    mailTransport().sendMail({
      from: process.env.SMTP_MAIL,
      to: email,
      subject: "Velzon Admin Verification Code",
      html: generateOTPEmailTemplate({ code: verifyCode, name: username }),
    });

    // Response
    return { success: true, message: "Verification email send successfully" };
  } catch (emailError) {
    // Error Response
    console.error("Error sending verification email", emailError);
    return { success: false, message: "Failed to send verification email" };
  }
};
