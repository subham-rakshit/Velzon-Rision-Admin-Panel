import dbConnect from "@/lib/db/dbConnect";
import { sendEmail } from "@/lib/utils/mailer";
import UserModel from "@/model/User";
import { RegistrationSchema } from "@/schemas";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request) {
  await dbConnect(); // INFO: Database connection

  try {
    const body = await request.json();
    const { email, username, password, confirmPassword } = body;

    // NOTE: Handle not getting request data
    if (!email || !username || !password || !confirmPassword) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid inputs.",
        },
        { status: 404 }
      );
    }

    // NOTE VALIDATE the registration schema
    const validatedFields = RegistrationSchema.safeParse(body);
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

    // NOTE: EXISTENCE_CHECK if user is already existing by email address but not verified
    const existingUserByEmail = await UserModel.findOne({
      email,
    });
    if (existingUserByEmail) {
      // NOTE Check if existing user is verified
      if (existingUserByEmail.isVerified) {
        return NextResponse.json(
          {
            success: false,
            message:
              "User already exists. Please login with your register credentials.",
          },
          { status: 400 }
        );
      } else {
        // NOTE Check if existing user is not verified, then modify the user details
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        existingUserByEmail.username = username;
        existingUserByEmail.password = hashedPassword;

        const saveUpdatedUser = await existingUserByEmail.save();

        // NOTE Send verification email
        const emailResponse = await sendEmail({
          email,
          emailType: "VERIFY",
          username,
          userId: saveUpdatedUser._id,
        });

        // NOTE Response verification email with error
        if (!emailResponse.success) {
          return NextResponse.json(
            {
              success: false,
              message: emailResponse.message,
            },
            { status: 400 }
          );
        }

        // NOTE Response verification email with success message
        const { password: pass, ...rest } = saveUpdatedUser._doc; // removing password

        return NextResponse.json(
          {
            success: true,
            message: "User registered successfully. Please verify your email",
            userData: rest,
          },
          { status: 201 }
        );
      }
    } else {
      // NOTE Create a new user
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // NOTE Create new user
      const newUser = new UserModel({
        email,
        username,
        password: hashedPassword,
      });

      // NOTE Save the new user in DB
      const saveNewUser = await newUser.save();

      // NOTE Send verification email
      const emailResponse = await sendEmail({
        email,
        emailType: "VERIFY",
        username,
        userId: saveNewUser._id,
      });

      // NOTE Response verification email with error
      if (!emailResponse.success) {
        return NextResponse.json(
          {
            success: false,
            message: emailResponse.message,
          },
          { status: 400 }
        );
      }

      // NOTE Response verification email with success message
      const { password: pass, ...rest } = saveNewUser._doc; // removing password

      return NextResponse.json(
        {
          success: true,
          message: "User registered successfully. Please verify your email",
          userData: rest,
        },
        { status: 201 }
      );
    }
  } catch (error) {
    console.error(`Error registering user SERVER: ${error}`);

    return NextResponse.json(
      {
        success: false,
        message: `Error registering user: ${error.message}`,
      },
      { status: 500 }
    );
  }
}
