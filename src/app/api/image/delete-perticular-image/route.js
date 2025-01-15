import { awsS3ClientDeleteImage } from "@/lib/aws";
import dbConnect from "@/lib/db/dbConnect";
import { validateUserFromToken } from "@/lib/middleware/validateUser";
import ImageModel from "@/model/Files";
import UserModel from "@/model/User";
import { NextResponse } from "next/server";

export async function DELETE(request) {
  await dbConnect();

  try {
    const { searchParams } = new URL(request.url);
    const imageId = searchParams.get("imageId");
    const userId = searchParams.get("userId");

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

    // NOTE User details
    const user = await UserModel.findById(userId);
    if (!user || !user.role.includes("Admin")) {
      return NextResponse.json(
        {
          success: false,
          message:
            "You do not have the required permissions to delete this image.",
        },
        { status: 403 }
      );
    }

    // NOTE Get the image details
    const imageRecord = await ImageModel.findOne({
      _id: imageId,
      userId: user._id,
    });
    if (!imageRecord) {
      return NextResponse.json(
        {
          success: false,
          message:
            "You are not permitted to delete this image OR This image not belongs to you.",
        },
        { status: 403 }
      );
    }

    // NOTE Perfome delete functionality in AWS S3
    const awsS3ClientResponse = await awsS3ClientDeleteImage(
      imageRecord.imageS3Key
    );
    if (!awsS3ClientResponse.success) {
      return NextResponse.json(
        {
          success: false,
          message: awsS3ClientResponse.message,
        },
        { status: 400 }
      );
    }

    // NOTE Delete the image from the DB
    const deletedImage = await ImageModel.findByIdAndDelete(imageId);
    if (!deletedImage) {
      return NextResponse.json(
        {
          success: false,
          message: "Image not found.",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Image deleted successfully.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(`Error in deleting perticular image SERVER: ${error}`);
    return NextResponse.json(
      {
        success: false,
        message: "An unexpected error occurred. Please try again later.",
      },
      { status: 500 }
    );
  }
}
