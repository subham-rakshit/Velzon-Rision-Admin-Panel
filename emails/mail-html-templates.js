// NOTE: Verification email template
export const verificationEmailTemplate = ({ token, username }) => {
  return `
    <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Your Velzon Verification Token</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 0;
              background-color: #f4f4f4;
              color: #333;
            }
            .container {
              max-width: 600px;
              margin: 20px auto;
              padding: 20px;
              background-color: #ffffff;
              border: 1px solid #ddd;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              border-radius: 10px;
            }
            .header {
              text-align: center;
              border-bottom: 1px solid #ddd;
              padding-bottom: 10px;
              margin-bottom: 20px;
              background-color: transparent;
              color: #000;
            }
            .header h2 {
              margin: 0;
            }
            .content {
              font-size: 16px;
              line-height: 1.6;
            }
            .button {
              display: inline-block;
              padding: 10px 20px;
              font-size: 18px;
              font-weight: bold;
              color: #fff;
              background-color: #04cae0;
              border: none;
              border-radius: 5px;
              text-decoration: none;
              text-align: center;
              margin: 20px 0;
              transition: background-color 0.3s;
            }
            .button:hover {
              background-color: #218838;
            }
            .footer {
              font-size: 16px;
              margin-top: 20px;
              text-align: center;
              border-top: 1px solid #ddd;
              padding-top: 10px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>Your Verification Token</h2>
            </div>
            <div class="content">
              <p>Hello, <strong>${username}</strong></p>
              <p>To verify your email account, please click the button below:</p>
              <a href="${process.env.DOMAIN_URL}/verify-account/${token}" class="button">Click Here</a>
              <p>This link will expire in one hour.</p>
              <p>If you did not request this token, please ignore this email.</p>
            </div>
            <div class="footer">
              <p>Best regards,<br>Velzon Team.</p>
            </div>
          </div>
        </body>
      </html>
  `;
};

//NOTE: Reset password email template
export const resetPasswordTokenEmailTemplate = ({ token, username }) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Password Reset</title>
    </head>
    <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; color: #333; padding: 20px;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
          <h2 style="color: #333;"><strong>${username}</strong> Your Password Reset Link</h2>
          <p>You have requested to reset your password. Please click the link below to reset your password:</p>
          <p style="margin-bottom: 20px;"><a href="${process.env.DOMAIN_URL}/reset-password/${token}" style="background-color: #007bff; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 4px;">Click Here</a></p>
          <p>This link will expire in one hour.</p>
          <p>If you did not request a password reset, please ignore this email.</p>
          <p>Thank you!</p>
      </div>
    </body>
    </html>
  `;
};
