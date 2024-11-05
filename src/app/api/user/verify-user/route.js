import UserModel from "@/model/User";
import dbConnect from "@/lib/dbConnect";
import { VerifySchema } from "@/schemas";

export async function POST(request) {
  await dbConnect();
  try {
    const reqBody = await request.json();
    const { token } = reqBody;

    //INFO: Handle not getting token
    if (!token) {
      return Response.json(
        { success: false, message: "Token not found" },
        { status: 404 }
      );
    }

    //INFO: Validate the verification schema
    const validatedFields = VerifySchema.safeParse({
      token,
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

    //NOTE: If token is present ****
    const userDetails = await UserModel.findOne({
      verifyCode: token,
      verifyCodeExpiry: { $gte: Date.now() }, // handle 1hr time expiry
    });

    if (!userDetails) {
      return Response.json(
        { success: false, message: "Token session expired" },
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
