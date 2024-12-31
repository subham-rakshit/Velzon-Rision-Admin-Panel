import dbConnect from "@/lib/db/dbConnect";
import UserModel from "@/model/User";
import { NextResponse } from "next/server";

export async function POST(request) {
  await dbConnect();
  try {
    const reqBody = await request.json();
    const { otp } = reqBody;

    // INFO: Handle not getting token
    if (!otp) {
      return NextResponse.json(
        {
          success: false,
          message: "Verification code is required to proceed.",
        },
        { status: 404 }
      );
    }

    // NOTE: If token is present ****
    const userDetails = await UserModel.findOne({
      verifyCode: otp,
      verifyCodeExpiry: { $gte: Date.now() }, // handle 1hr time expiry
    });

    if (!userDetails) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid OTP or the OTP has expired. Please request a new one.",
        },
        { status: 400 }
      );
    }

    userDetails.isVerified = true;
    userDetails.verifyCode = undefined;
    userDetails.verifyCodeExpiry = undefined;

    await userDetails.save(); // Save the updated verified user details.

    // INFO: Response
    return NextResponse.json(
      {
        success: true,
        message:
          "Email verification successful. Please login using your credentials.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(`Error verifying user account: ${error}`);

    return NextResponse.json(
      {
        success: false,
        message:
          "An error occurred while verifying your account. Please try again later.",
      },
      { status: 500 }
    );
  }
}
