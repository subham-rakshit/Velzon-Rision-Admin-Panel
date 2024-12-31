import bcrypt from "bcryptjs";

import dbConnect from "@/lib/db/dbConnect";
import UserModel from "@/model/User";
import { ResetPasswordSchema } from "@/schemas";
import { NextResponse } from "next/server";

export async function POST(request) {
  await dbConnect();
  try {
    const body = await request.json();
    const { resetPasswordCode, newPassword, confirmNewPassword } = body;

    // NOTE VALIDATE the verification schema
    const validatedFields = ResetPasswordSchema.safeParse(body);
    if (!validatedFields.success) {
      let zodErrors = {};
      validatedFields.error.issues.forEach((issue) => {
        zodErrors = {
          ...zodErrors,
          [issue.path[0]]: { message: issue.message },
        };
      });

      return NextResponse.json(
        { success: false, errors: zodErrors },
        { status: 400 }
      );
    }

    // NOTE If RESET_CODE is present in User Model
    const userDetails = await UserModel.findOne({
      forgetPasswordCode: resetPasswordCode,
      forgetPasswordCodeExpiry: { $gte: Date.now() }, // handle 1hr time expiry
    });
    if (!userDetails) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid or expired password reset code. Please request a new one.",
        },
        { status: 400 }
      );
    }

    // NOTE Compare the new password with the old password
    const passwordCompareStatus = bcrypt.compareSync(
      newPassword,
      userDetails.password
    );
    if (passwordCompareStatus) {
      return NextResponse.json(
        {
          success: false,
          message:
            "New password cannot be the same as the current password. Please choose a different one.",
        },
        { status: 400 }
      );
    }

    // NOTE HASHED_NEW_PASSWORD and save in DB AND remove the reset code and expiry
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    userDetails.password = hashedPassword;
    userDetails.forgetPasswordCode = undefined;
    userDetails.forgetPasswordCodeExpiry = undefined;

    await userDetails.save(); // Save the updated verified user details.

    // NOTE SUCCESS_RESPONSE
    return NextResponse.json(
      {
        success: true,
        message: `Password has been successfully reset. Please log in with your new password.`,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(`Password reset error SERVER: ${error}`);

    return NextResponse.json(
      {
        success: false,
        message:
          "An error occurred while resetting your password. Please try again later.",
      },
      { status: 500 }
    );
  }
}
