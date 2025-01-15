import { awsS3ClientDownloadImage } from "@/lib/aws";
import dbConnect from "@/lib/db/dbConnect";
import { validateUserFromToken } from "@/lib/middleware/validateUser";
import ImageModel from "@/model/Files";
import UserModel from "@/model/User";
import { NextResponse } from "next/server";

export async function GET(request) {
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
            "You do not have the required permissions to download this image.",
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
            "You are not permitted to download this image OR This image not belongs to you.",
        },
        { status: 403 }
      );
    }

    // NOTE Image AWS key
    const imageKey = imageRecord.imageS3Key;

    // NOTE Perfome download functionality in AWS S3
    const awsS3ClientResponse = await awsS3ClientDownloadImage(imageKey);
    if (!awsS3ClientResponse.success) {
      return NextResponse.json(
        {
          success: false,
          message: awsS3ClientResponse.message,
        },
        { status: 400 }
      );
    }

    return new NextResponse(awsS3ClientResponse.responseData.Body, {
      status: 200,
      headers: {
        "Content-Type": awsS3ClientResponse.responseData.ContentType,
        "Content-Length": awsS3ClientResponse.responseData.ContentLength,
        "Content-Disposition": `attachment; filename="${imageRecord.imageFileName}"`,
      },
    });
  } catch (error) {
    console.log(`Error in downloading perticular image SERVER: ${error}`);
    return NextResponse.json(
      {
        success: false,
        message:
          "An unexpected error occurred while downloading image. Please try again.",
      },
      { status: 500 }
    );
  }
}
