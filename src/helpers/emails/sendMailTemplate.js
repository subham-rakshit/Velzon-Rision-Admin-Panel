//NOTE: OTP email template
export const generateOTPEmailTemplate = ({ code, name }) => {
  return `
    <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${name} Your Velzon OTP Code</title>
        </head>
        <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4;">
          <div style="max-width: 600px; margin: 20px auto; padding: 20px; background-color: #fff; border: 1px solid #ddd; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
            <div style="text-align: center; border-bottom: 1px solid #ddd; padding-bottom: 10px; margin-bottom: 20px;">
              <h2 style="margin: 0; color: #333;">Your OTP Code</h2>
            </div>
            <div style="font-size: 16px; color: #333;">
              <p>Hello,</p>
              <p>Your One-Time Password (OTP) is:</p>
              <p style="text-align: center; font-size: 24px; color: #000; font-weight: bold; margin: 20px 0;">${code}</p>
              <p>If you did not request this OTP, please ignore this email.</p>
            </div>
            <div style="font-size: 16px; color: #333; margin-top: 20px; text-align: center; border-top: 1px solid #ddd; padding-top: 10px;">
              <p>Best regards,<br>Velzon Team.</p>
            </div>
          </div>
        </body>
      </html>
  `;
};
