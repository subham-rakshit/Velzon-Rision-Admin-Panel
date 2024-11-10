import dbConnect from "@/lib/db/dbConnect";
import { EmailSchema } from "@/schemas";
import UserModel from "@/model/User";
import { sendEmail } from "@/lib/utils/mailer";
import handleResponse from "@/lib/middleware/responseMiddleware";

export async function POST(request) {
  await dbConnect();

  try {
    const { email } = await request.json();

    //NOTE: Validate the email by zod schema
    const validatedFields = EmailSchema.safeParse({
      email,
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

    //INFO: Fetch the user details
    const userDetails = await UserModel.findOne({ email });
    if (!userDetails) {
      return handleResponse({
        res: Response,
        status: 400,
        success: false,
        message: `Invalid email address. Please provide your registered email address`,
      });
    }

    //INFO: Send verification email
    const emailResponse = await sendEmail({
      email: userDetails.email,
      emailType: "RESET",
      username: userDetails.username,
      userId: userDetails._id,
    });

    //INFO: Response send email with error
    if (!emailResponse.success) {
      return handleResponse({
        res: Response,
        status: 400,
        success: false,
        message: `Unable to send reset password link`,
      });
    }

    //INFO: Response send email with success
    return handleResponse({
      res: Response,
      status: 200,
      success: true,
      message: `Reset link has been successfully sent to your email`,
    });
  } catch (error) {
    console.error(`Error forgot password send email error: ${error}`);
    return handleResponse({
      res: Response,
      status: 500,
      success: false,
      message: `Error forgot password send email error: ${error.message}`,
    });
  }
}
