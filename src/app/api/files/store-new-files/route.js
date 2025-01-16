import dbConnect from "@/lib/db/dbConnect";
import { validateUserFromToken } from "@/lib/middleware/validateUser";
import { s3DeleteFile } from "@/lib/s3/core";
import FilesModel from "@/model/Files";
import UserModel from "@/model/User";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(request) {
  await dbConnect();

  try {
    const body = await request.json();

    const { userId, name, key, type, size, url } = body;

    if (
      !userId ||
      !mongoose.Types.ObjectId.isValid(userId) ||
      !name ||
      !key ||
      !type ||
      !size ||
      !Number.isInteger(parseInt(size)) ||
      !url
    ) {
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

    // NOTE File exists or not. If exists, delete it from AWS S3
    const fileExists = await FilesModel.findOne({
      fileName: name,
      fileType: type,
      fileSize: parseInt(size),
    });
    if (fileExists) {
      const { success, error } = await s3DeleteFile(key);
      if (success) {
        return NextResponse.json(
          {
            success: false,
            message: `${name} already exists.`,
          },
          { status: 400 }
        );
      } else {
        return NextResponse.json(
          {
            success: false,
            message: error,
          },
          { status: 400 }
        );
      }
    } else {
      // NOTE Create new file object
      const newFileDetials = {
        userId: userId.toString(),
        fileS3Key: key,
        fileName: name,
        fileType: type,
        fileSize: parseInt(size),
        fileUrl: url,
      };

      const newFile = new FilesModel(newFileDetials);
      await newFile.save();

      return NextResponse.json(
        {
          success: true,
          message: `${newFile.fileName} has been uploaded successfully.`,
        },
        { status: 201 }
      );
    }
  } catch (error) {
    console.log(`Error in storing file SERVER: ${error}`);
    return NextResponse.json(
      {
        success: false,
        message: "An unexpected error occurred. Please try again later.",
      },
      { status: 500 }
    );
  }
}
