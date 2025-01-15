import { awsS3ClientUploadNewImage } from "@/lib/aws";
import dbConnect from "@/lib/db/dbConnect";
import { validateUserFromToken } from "@/lib/middleware/validateUser";
import ImageModel from "@/model/Files";
import UserModel from "@/model/User";
import { AllImageSchema } from "@/schemas";
import { NextResponse } from "next/server";

export async function POST(request) {
  await dbConnect();

  try {
    const body = await request.json();

    const { imageType, minWidth, minHeight, userId, image, imageFileName } =
      body;

    // NOTE Check image URI data
    if (!image) {
      return NextResponse.json(
        {
          success: false,
          message: "Image URI is required.",
        },
        { status: 400 }
      );
    }

    // NOTE Check request user is a valid user or not
    const requestedUserDetails = await validateUserFromToken({ request });
    if (!requestedUserDetails || requestedUserDetails._id !== userId) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized access. Please log in and try again.",
        },
        { status: 403 }
      );
    }

    // NOTE Validate the required fileds schema
    const validatedFields = AllImageSchema.safeParse({
      imageType,
      minWidth,
      minHeight,
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

    // NOTE Get user details
    const user = await UserModel.findById(userId);
    if (!user || !user.role.includes("Admin")) {
      return NextResponse.json(
        {
          success: false,
          message: "You do not have the required permissions to upload images.",
        },
        { status: 403 }
      );
    }

    // NOTE Image exists or not
    const imageExists = await ImageModel.findOne({
      imageFileName,
      userId: user._id,
    });
    if (imageExists) {
      return NextResponse.json(
        {
          success: false,
          message: "This image already exists. Please choose a different one.",
        },
        { status: 400 }
      );
    }

    // NOTE Perform AWS S3 upload
    const awsS3ClientResponse = await awsS3ClientUploadNewImage(image);
    if (!awsS3ClientResponse.success) {
      return NextResponse.json(
        {
          success: false,
          message: awsS3ClientResponse.message,
        },
        { status: 400 }
      );
    }

    // NOTE Create new image object
    const { imageUrl, imageParams } = awsS3ClientResponse;
    const imageValidationObj = {
      userId: user._id,
      uploaderInfo: {
        name: user.username,
        email: user.email,
        role: user.role,
      },
      imageS3Key: imageParams.Key,
      imageFileName,
      imageType,
      minWidth,
      minHeight,
      imageUrl,
    };

    // Create a new image and save it to the DB
    const newImage = new ImageModel(imageValidationObj);
    await newImage.save();

    return NextResponse.json(
      {
        success: true,
        message: "Image uploaded successfully.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(`Error in uploading image SERVER: ${error}`);
    return NextResponse.json(
      {
        success: false,
        message:
          "An unexpected error occurred during image uploading. Please try again later.",
      },
      { status: 500 }
    );
  }
}
