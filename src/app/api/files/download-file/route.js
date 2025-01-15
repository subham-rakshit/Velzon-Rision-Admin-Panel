import dbConnect from "@/lib/db/dbConnect";
import { validateUserFromToken } from "@/lib/middleware/validateUser";
import { s3DownloadFile } from "@/lib/s3/core";
import ImageModel from "@/model/Files";
import UserModel from "@/model/User";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request) {
  await dbConnect();

  try {
    const { searchParams } = new URL(request.url);
    const fileKey = searchParams.get("fileKey");
    const contentType =
      searchParams.get("contentType") || "application/octet-stream";
    const userId = searchParams.get("userId");

    if (!userId || !mongoose.Types.ObjectId.isValid(userId) || !fileKey) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid request. Please try again later.",
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

    // NOTE Get the file details
    const fielRecord = await ImageModel.findOne({
      fileS3Key: fileKey,
    });
    if (!fielRecord) {
      return NextResponse.json(
        {
          success: false,
          message: "File not found.",
        },
        { status: 404 }
      );
    }

    // NOTE Image AWS key
    const key = fielRecord.fileS3Key;

    // NOTE Perfome download functionality in AWS S3
    const awsS3ClientResponse = await s3DownloadFile(key);
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
