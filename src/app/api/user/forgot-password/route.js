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

    // NOTE VALIDATE the registration schema
    const validatedFields = EmailSchema.safeParse(body);
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

    // NOTE GET the user details by provided forgotPasswordEmail
    const userDetails = await UserModel.findOne({ email }).exec();
    if (!userDetails) {
      return NextResponse.json(
        {
          success: false,
          message: `The provided email address is not registered. Please use a valid registered email address.`,
        },
        { status: 400 }
      );
    }

    // NOTE Send RESET LINK to the user email
    const emailResponse = await sendEmail({
      email: userDetails.email,
      emailType: "RESET",
      username: userDetails.username,
      userId: userDetails._id,
    });

    // NOTE RESPONSE send email with error
    if (!emailResponse.success) {
      return NextResponse.json(
        {
          success: false,
          message: `We encountered an issue while sending the reset password email. Please try again later.`,
        },
        { status: 400 }
      );
    }

    // NOTE RESPONSE send email with success
    return NextResponse.json(
      {
        success: true,
        message: `A password reset link has been successfully sent to your email address. Please check your inbox.`,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(`Error forgot password send email error: ${error}`);

    return NextResponse.json(
      {
        success: false,
        message: `An unexpected error occurred while processing your request. Please try again later.`,
      },
      { status: 500 }
    );
  }
}
