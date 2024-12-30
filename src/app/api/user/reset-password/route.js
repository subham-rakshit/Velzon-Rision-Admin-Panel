import bcrypt from "bcryptjs";

import dbConnect from "@/lib/db/dbConnect";
import handleResponse from "@/lib/middleware/responseMiddleware";
import UserModel from "@/model/User";
import { ResetPasswordSchema } from "@/schemas";

export async function POST(request) {
  await dbConnect();
  try {
    const reqBody = await request.json();
    const { token, newPassword, confirmPassword } = reqBody;

    // INFO: Handle not getting token
    if (!token) {
      return handleResponse({
        res: Response,
        status: 404,
        success: false,
        message: "Token not found",
      });
    }

    // INFO: Validate the verification schema
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

    // INFO: Check the password and cofirmPassword
    if (newPassword !== confirmPassword) {
      return handleResponse({
        res: Response,
        status: 400,
        success: false,
        message: "New password and Confirm password must be same.",
      });
    }

    // INFO: If token is present ****
    const userDetails = await UserModel.findOne({
      forgetPasswordCode: token,
      forgetPasswordCodeExpiry: { $gte: Date.now() }, // handle 1hr time expiry
    });

    if (!userDetails) {
      return handleResponse({
        res: Response,
        status: 400,
        success: false,
        message: "Reset password session expired",
      });
    }
    const passwordCompareStatus = bcrypt.compareSync(
      newPassword,
      userDetails.password
    );
    if (passwordCompareStatus) {
      return handleResponse({
        res: Response,
        status: 400,
        success: false,
        message: "New password cannot be the same as the old password",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    userDetails.password = hashedPassword;
    userDetails.forgetPasswordCode = undefined;
    userDetails.forgetPasswordCodeExpiry = undefined;

    await userDetails.save(); // Save the updated verified user details.

    // INFO: Response
    return handleResponse({
      res: Response,
      status: 200,
      success: true,
      message: `Password reset successful. Please Login`,
    });
  } catch (error) {
    console.error(`Password reset error: ${error}`);
    return handleResponse({
      res: Response,
      status: 500,
      success: false,
      message: `Password reset error: ${error.message}`,
    });
  }
}
