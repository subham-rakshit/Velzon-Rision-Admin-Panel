import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dbConnect from "@/lib/db/dbConnect";
import UserModel from "@/model/User";
import { SignInSchema } from "@/schemas";
import { NextResponse } from "next/server";

export async function POST(request) {
  await dbConnect(); //INFO: Database connection

  try {
    const { email, password, rememberMe } = await request.json(); // return Promise

    console.log("API Login data ---", rememberMe);

    //NOTE: Validate the registration schema
    const validatedFields = SignInSchema.safeParse({
      email,
      password,
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

    //INFO: Find user details
    const userDetails = await UserModel.findOne({ email });

    if (!userDetails) {
      return Response.json(
        {
          success: false,
          message: `User not found! Please register your account`,
        },
        { status: 400 }
      );
    }

    //INFO: Compare both passwords
    const validPasswordCheck = await bcrypt.compare(
      password,
      userDetails.password
    );

    if (!validPasswordCheck) {
      return Response.json(
        {
          success: false,
          message: `Credentials doesn't match`,
        },
        { status: 400 }
      );
    }

    //INFO: Generate JWT token
    const tokenData = {
      _id: userDetails._id,
      username: userDetails.username,
      email: userDetails.email,
      isVerified: userDetails.isVerified,
      isAdmin: userDetails.isAdmin,
    };

    // Set token expiration according to rememberMe checkbox [days * hr * min * sec * milliseconds]
    const expireToken = rememberMe
      ? parseInt(process.env.TOKEN_EXPIRATION_REMEMBERED, 10) *
        24 *
        60 *
        60 *
        1000 // e.g., "10" days
      : parseInt(process.env.TOKEN_EXPIRATION_NOT_REMEMBERED, 10) *
        24 *
        60 *
        60 *
        1000; // e.g., "1" day

    const authToken = await jwt.sign(tokenData, process.env.TOKEN_SECRET, {
      expiresIn: expireToken / 1000, // JWT requires seconds
    });

    //INFO: Response
    const { password: pass, ...rest } = userDetails._doc;
    const response = NextResponse.json(
      {
        success: true,
        message: "Login Successfull",
        userData: rest,
      },
      { status: 200 }
    );

    // Set the cookies
    response.cookies.set("access-token", authToken, {
      httpOnly: true,
      expires: new Date(Date.now() + expireToken), // Date.now() + expireToken(millisec)
    });

    return response; // return the response
  } catch (error) {
    console.error(`Error login user: ${error}`);
    return Response.json(
      {
        success: false,
        message: `Error login user: ${error.message}`,
      },
      { status: 500 }
    );
  }
}
