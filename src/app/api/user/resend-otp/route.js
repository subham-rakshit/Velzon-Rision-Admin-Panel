import dbConnect from "@/lib/db/dbConnect";
import { sendEmail } from "@/lib/utils/mailer";
import UserModel from "@/model/User";
import { EmailSchema } from "@/schemas";
import { NextResponse } from "next/server";

export async function POST(request) {
  await dbConnect();

  try {
    const body = await request.json();
    const { email } = body;

    // NOTE Validate the email by zod schema
    const validatedFields = EmailSchema.safeParse(body);
    if (!validatedFields.success) {
      return Response.json(
        {
          success: false,
          message: validatedFields.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    // INFO: Fetch the user details
    const userDetails = await UserModel.findOne({ email });
    if (!userDetails) {
      return NextResponse.json(
        {
          success: false,
          message: `No account found with this email address. Please provide your registered email address.`,
        },
        { status: 400 }
      );
    }

    // INFO: Send verification email
    const emailResponse = await sendEmail({
      email: userDetails.email,
      emailType: "RESEND",
      username: userDetails.username,
      userId: userDetails._id,
    });

    // INFO: Response send email with error
    if (!emailResponse.success) {
      return NextResponse.json(
        {
          success: false,
          message: `There was an issue sending the OTP. Please try again later.`,
        },
        { status: 400 }
      );
    }

    // INFO: Response send email with success
    return NextResponse.json(
      {
        success: true,
        message:
          "An OTP has been successfully sent to your registered email address.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(`Error resending otp SERVER: ${error}`);
    return NextResponse.json(
      {
        success: false,
        message:
          "An unexpected error occurred while processing your request. Please try again later.",
      },
      { status: 500 }
    );
  }
}
