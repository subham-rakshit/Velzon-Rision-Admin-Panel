import UserModel from "@/model/User";
import dbConnect from "@/lib/dbConnect";

export async function POST(request) {
  await dbConnect();
  try {
    const reqBody = await request.json();
    const { otp } = reqBody;

    //INFO: Handle not getting token
    if (!otp) {
      return Response.json(
        { success: false, message: "Verification code not found" },
        { status: 404 }
      );
    }

    //NOTE: If token is present ****
    const userDetails = await UserModel.findOne({
      verifyCode: otp,
      verifyCodeExpiry: { $gte: Date.now() }, // handle 1hr time expiry
    });

    if (!userDetails) {
      return Response.json(
        { success: false, message: "Invalid OTP || Token session has been expired" },
        { status: 400 }
      );
    }

    userDetails.isVerified = true;
    userDetails.verifyCode = undefined;
    userDetails.verifyCodeExpiry = undefined;

    await userDetails.save(); // Save the updated verified user details.

    //INFO: Response
    return Response.json(
      {
        success: true,
        message: `Email verification successful`,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(`Error verifying user account: ${error}`);
    return Response.json(
      {
        success: false,
        message: `Error verifying user account: ${error.message}`,
      },
      { status: 500 }
    );
  }
}
