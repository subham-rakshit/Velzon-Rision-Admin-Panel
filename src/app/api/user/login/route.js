import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

import dbConnect from "@/lib/db/dbConnect";
import UserModel from "@/model/User";
import { SignInSchema } from "@/schemas";

export async function POST(request) {
  await dbConnect(); // INFO: Database connection

  try {
    const { email, password, rememberMe } = await request.json();

    // NOTE: Validate the registration schema
    const validatedFields = SignInSchema.safeParse({
      email,
      password,
      rememberMe,
    });
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

    // NOTE Find user details
    const userDetails = await UserModel.findOne({ email }).exec();
    if (!userDetails) {
      return NextResponse.json(
        {
          success: false,
          message:
            "User not found. Please register if you don't have an account.",
        },
        { status: 400 }
      );
    }

    // NOTE Compare both passwords
    const validPasswordCheck = await bcrypt.compare(
      password,
      userDetails.password
    );

    if (!validPasswordCheck) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid credentials. Please check your email and password.",
        },
        { status: 400 }
      );
    }

    // NOTE Generate JWT token
    const tokenData = {
      _id: userDetails._id,
      username: userDetails.username,
      email: userDetails.email,
      picture: userDetails.picture,
      role: userDetails.role,
      isVerified: userDetails.isVerified,
    };

    // NOTE Set token expiration according to rememberMe checkbox [days * hr * min * sec * milliseconds]
    const expireToken = rememberMe
      ? parseInt(process.env.TOKEN_EXPIRATION_REMEMBERED, 10) *
        24 *
        60 *
        60 *
        1000
      : parseInt(process.env.TOKEN_EXPIRATION_NOT_REMEMBERED, 10) *
        24 *
        60 *
        60 *
        1000;

    const authToken = await jwt.sign(tokenData, process.env.TOKEN_SECRET, {
      expiresIn: expireToken / 1000, // JWT requires seconds
    });

    // NOTE Response
    const response = NextResponse.json(
      {
        success: true,
        message: "Login successful. Redirecting...",
      },
      { status: 200 }
    );

    // NOTE Set token in cookies
    response.cookies.set("access-token", authToken, {
      httpOnly: true,
      expires: new Date(Date.now() + expireToken),
    });

    return response;
  } catch (error) {
    console.error(`Error login user SERVER: ${error}`);

    return NextResponse.json(
      {
        success: false,
        message: `An unexpected error occurred. Please try again later.`,
      },
      { status: 500 }
    );
  }
}
