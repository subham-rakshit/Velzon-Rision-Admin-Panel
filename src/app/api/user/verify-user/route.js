import dbConnect from "@/lib/db/dbConnect";
import handleResponse from "@/lib/middleware/responseMiddleware";
import UserModel from "@/model/User";

export async function POST(request) {
  await dbConnect();
  try {
    const reqBody = await request.json();
    const { otp } = reqBody;

    // INFO: Handle not getting token
    if (!otp) {
      return handleResponse({
        res: Response,
        status: 404,
        success: false,
        message: "Verification code not found",
      });
    }

    // NOTE: If token is present ****
    const userDetails = await UserModel.findOne({
      verifyCode: otp,
      verifyCodeExpiry: { $gte: Date.now() }, // handle 1hr time expiry
    });

    if (!userDetails) {
      return handleResponse({
        res: Response,
        status: 400,
        success: false,
        message: "Invalid OTP || Token session has been expired",
      });
    }

    userDetails.isVerified = true;
    userDetails.verifyCode = undefined;
    userDetails.verifyCodeExpiry = undefined;

    await userDetails.save(); // Save the updated verified user details.

    // INFO: Response
    return handleResponse({
      res: Response,
      status: 200,
      success: true,
      message: `Email verification successful`,
    });
  } catch (error) {
    console.error(`Error verifying user account: ${error}`);
    return handleResponse({
      res: Response,
      status: 500,
      success: false,
      message: `Error verifying user account: ${error.message}`,
    });
  }
}
