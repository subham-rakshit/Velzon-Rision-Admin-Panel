import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { SignInSchema } from "@/schemas";
import { NextResponse } from "next/server";

export async function POST(request) {
  await dbConnect(); //INFO: Database connection

  try {
    const { email, password } = await request.json(); // return Promise

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
          message: `Credentials invalid`,
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
      userId: userDetails._id,
      username: userDetails.username,
      email: userDetails.email,
    };
    const authToken = await jwt.sign(tokenData, process.env.TOKEN_SECRET, {
      expiresIn: "10d",
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
    response.cookies.set("token", authToken, {
      httpOnly: true,
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
