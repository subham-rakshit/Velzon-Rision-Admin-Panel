import UserModel from "@/model/User";
import dbConnect from "@/lib/db/dbConnect";
import { ResetPasswordSchema } from "@/schemas";
import bcrypt from "bcryptjs";

export async function POST(request) {
  await dbConnect();
  try {
    const reqBody = await request.json();
    const { token, newPassword, confirmPassword } = reqBody;

    //INFO: Handle not getting token
    if (!token) {
      return Response.json(
        { success: false, message: "Token not found" },
        { status: 404 }
      );
    }

    //INFO: Validate the verification schema
    const validatedFields = ResetPasswordSchema.safeParse({
      newPassword,
      confirmPassword,
    });
    if (!validatedFields.success) {
      return Response.json(
        {
          success: false,
          message: validatedFields.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    //INFO: Check the password and cofirmPassword
    if (newPassword !== confirmPassword) {
      return Response.json(
        {
          success: false,
          message: "New password and Confirm password must be same.",
        },
        { status: 400 }
      );
    }

    //INFO: If token is present ****
    const userDetails = await UserModel.findOne({
      forgetPasswordCode: token,
      forgetPasswordCodeExpiry: { $gte: Date.now() }, // handle 1hr time expiry
    });

    if (!userDetails) {
      return Response.json(
        { success: false, message: "Reset password session expired" },
        { status: 400 }
      );
    }
    const passwordCompareStatus = bcrypt.compareSync(
      newPassword,
      userDetails.password
    );
    if (passwordCompareStatus) {
      return Response.json(
        {
          success: false,
          message: "New password cannot be the same as the old password",
        },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    userDetails.password = hashedPassword;
    userDetails.forgetPasswordCode = undefined;
    userDetails.forgetPasswordCodeExpiry = undefined;

    await userDetails.save(); // Save the updated verified user details.

    //INFO: Response
    return Response.json(
      {
        success: true,
        message: `Password reset successful. Please Login`,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(`Password reset error: ${error}`);
    return Response.json(
      {
        success: false,
        message: `Password reset error: ${error.message}`,
      },
      { status: 500 }
    );
  }
}
