import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/lib/nodeMailer";
import { generateOTP } from "@/lib/nodeMailer";
import { RegistrationSchema } from "@/schemas/authSchemas/registrationSchema";

export async function POST(request) {
  await dbConnect(); //INFO: Database connection

  try {
    const { email, username, password, confirmPassword } = await request.json();

    //NOTE: Validate the registration schema
    const validatedFields = RegistrationSchema.safeParse({
      email,
      username,
      password,
      confirmPassword,
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

    //NOTE: Check the password and cofirmPassword
    if (password !== confirmPassword) {
      return Response.json(
        {
          success: false,
          message: "Password and confirm password fields must match",
        },
        { status: 400 }
      );
    }

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
        const hashedOTP = await bcrypt.hash(otp, 10);

        existingUserByEmail.username = username;
        existingUserByEmail.password = hashedPassword;
        existingUserByEmail.verifyCode = hashedOTP;
        existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000); //INFO: 1 hr

        await existingUserByEmail.save();

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
            userId: existingUserByEmail._id,
          },
          { status: 201 }
        );
      }
    } else {
      //NOTE: Create a new user
      const hashedPassword = await bcrypt.hash(password, 10);
      const hashedOTP = await bcrypt.hash(otp, 10);

      //INFO: Expiry date of verification code
      const expiryDate = new Date(); //INFO: return an object which can be modified by const
      expiryDate.setHours(expiryDate.getHours() + 1); //INFO: 1 hr

      //INFO: Create new user
      const newUser = new UserModel({
        email,
        username,
        password: hashedPassword,
        verifyCode: hashedOTP,
        verifyCodeExpiry: expiryDate,
        isVerified: false,
        isAdmin: false,
      });

      //INFO: Save the new user in DB
      await newUser.save();

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
          userId: newUser._id,
        },
        { status: 201 }
      );
    }
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
