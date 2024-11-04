import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/lib/nodeMailer";
import { generateOTP } from "@/lib/nodeMailer";

export async function POST(request) {
  await dbConnect(); //INFO: Database connection

  try {
    const { email, username, password } = await request.json();

    //NOTE: Generate OTP
    const otp = generateOTP();

    //NOTE: Check if verified user already exists
    const existingUserVerifiedByUsername = await UserModel.findOne({
      username,
      isVerified: true,
    });

    if (existingUserVerifiedByUsername) {
      //INFO: Send Response
      return Response.json(
        {
          success: false,
          message: "Username is already taken",
        },
        { status: 400 }
      );
    }

    //NOTE: Check if existing user is already existing by email address
    const existingUserByEmail = await UserModel.findOne({
      email,
    });

    if (existingUserByEmail) {
      //INFO: Check if existing user is verified
      if (existingUserByEmail.isVerified) {
        return Response.json(
          {
            success: false,
            message: "Username is already taken",
          },
          { status: 400 }
        );
      } else {
        //INFO: Check if existing user is not verified, then modify the user details
        const hashedPassword = await bcrypt.hash(password, 10);

        existingUserByEmail.username = username;
        existingUserByEmail.password = hashedPassword;
        existingUserByEmail.verifyCode = otp;
        existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000); //INFO: 1 hr

        await existingUserByEmail.save();
      }
    } else {
      //NOTE: Create a new user
      const hashedPassword = await bcrypt.hash(password, 10);

      //INFO: Expiry date of verification code
      const expiryDate = new Date(); //INFO: return an object which can be modified by const
      expiryDate.setHours(expiryDate.getHours() + 1); //INFO: 1 hr

      //INFO: Create new user
      const newUser = new UserModel({
        email,
        username,
        password: hashedPassword,
        verifyCode: otp,
        verifyCodeExpiry: expiryDate,
        isVerified: false,
        isAdmin: false,
      });

      //INFO: Save the new user in DB
      await newUser.save();
    }

    //NOTE: Send verification email
    const emailResponse = await sendVerificationEmail(email, username, otp);

    //NOTE: Response verification email with error
    if (!emailResponse.success) {
      return Response.json(
        {
          success: false,
          message: "Unable to send verification email",
        },
        { status: 500 }
      );
    }

    //NOTE: Response verification email with success message
    return Response.json(
      {
        success: true,
        message: "User registered successfully. Please verify your email",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(`Error registering user: ${error}`);
    return Response.json(
      {
        success: false,
        message: "Error registering user",
      },
      { status: 500 }
    );
  }
}
