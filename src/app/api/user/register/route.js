import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { sendEmail } from "@/helpers/mailer";
import { RegistrationSchema } from "@/schemas";

export async function POST(request) {
  await dbConnect(); //INFO: Database connection

  try {
    const { email, username, password, confirmPassword } = await request.json(); // return Promise

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

    //NOTE: Check if verified user already exists with username
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

    //NOTE: Check if user is already existing by email address but not verified
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
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        existingUserByEmail.username = username;
        existingUserByEmail.password = hashedPassword;

        const saveUpdatedUser = await existingUserByEmail.save();

        //INFO: Send verification email
        const emailResponse = await sendEmail({
          email,
          emailType: "VERIFY",
          username,
          userId: saveUpdatedUser._id,
        });

        //INFO: Response verification email with error
        if (!emailResponse.success) {
          return Response.json(
            {
              success: false,
              message: "Unable to send verification email",
            },
            { status: 400 }
          );
        }

        //INFO: Response verification email with success message
        const { password: pass, ...rest } = saveUpdatedUser._doc; // removing password
        return Response.json(
          {
            success: true,
            message: "User registered successfully. Please verify your email",
            userData: rest,
          },
          { status: 201 }
        );
      }
    } else {
      //NOTE: Create a new user
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      //INFO: Create new user
      const newUser = new UserModel({
        email,
        username,
        password: hashedPassword,
      });

      //INFO: Save the new user in DB
      const saveNewUser = await newUser.save();

      //INFO: Send verification email
      const emailResponse = await sendEmail({
        email,
        emailType: "VERIFY",
        username,
        userId: saveNewUser._id,
      });

      //INFO: Response verification email with error
      if (!emailResponse.success) {
        return Response.json(
          {
            success: false,
            message: "Unable to send verification email",
          },
          { status: 500 }
        );
      }

      //INFO: Response verification email with success message
      const { password: pass, ...rest } = saveNewUser._doc; // removing password
      return Response.json(
        {
          success: true,
          message: "User registered successfully. Please verify your email",
          userData: rest,
        },
        { status: 201 }
      );
    }
  } catch (error) {
    console.error(`Error registering user: ${error}`);
    return Response.json(
      {
        success: false,
        message: `Error registering user: ${error.message}`,
      },
      { status: 500 }
    );
  }
}
