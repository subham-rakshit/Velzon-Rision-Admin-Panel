import UserModel from "@/model/User";
import dbConnect from "@/lib/dbConnect";
import { sendEmail } from "@/helpers/mailer";
import { EmailSchema } from "@/schemas";

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
      return Response.json(
        {
          success: false,
          message: `Invalid email address. Please provide your registered email address`,
        },
        { status: 400 }
      );
    }

    //INFO: Send verification email
    const emailResponse = await sendEmail({
      email: userDetails.email,
      emailType: "RESEND",
      username: userDetails.username,
      userId: userDetails._id,
    });

    //INFO: Response send email with error
    if (!emailResponse.success) {
      return Response.json(
        {
          success: false,
          message: "Unable to send the OTP",
        },
        { status: 400 }
      );
    }

    //INFO: Response send email with success
    return Response.json(
      {
        success: true,
        message: "OTP has been successfully sent to your email.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(`Error resending otp: ${error}`);
    return Response.json(
      {
        success: false,
        message: `Error to resend otp: ${error.message}`,
      },
      { status: 500 }
    );
  }
}
