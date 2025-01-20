import dbConnect from "@/lib/db/dbConnect";
import { s3DeleteFile } from "@/lib/s3/core";
import { default as FilesModel } from "@/model/Files";
import UserModel from "@/model/User";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function DELETE(request) {
  await dbConnect();

  try {
    const { searchParams } = new URL(request.url);
    const fileKey = searchParams.get("fileKey");
    const userId = searchParams.get("userId");

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid request. Please try again later.",
        },
        { status: 400 }
      );
    }

    // NOTE User details
    const user = await UserModel.findById(userId);
    if (!user || !user.role.includes("Admin")) {
      return NextResponse.json(
        {
          success: false,
          message:
            "You do not have the required permissions to delete this file.",
        },
        { status: 403 }
      );
    }

    // NOTE Get the file details
    const fileRecord = await FilesModel.findOne({
      fileS3Key: fileKey,
    });
    if (!fileRecord) {
      return NextResponse.json(
        {
          success: false,
          message: "File not found",
        },
        { status: 404 }
      );
    }

    // NOTE Perfome delete functionality in AWS S3
    const awsS3ClientResponse = await s3DeleteFile(fileRecord.fileS3Key);
    if (!awsS3ClientResponse.success) {
      return NextResponse.json(
        {
          success: false,
          message: awsS3ClientResponse.error,
        },
        { status: 500 }
      );
    }

    // NOTE Delete the file from the DB
    const deletedFile = await FilesModel.findOneAndDelete({
      fileS3Key: fileRecord.fileS3Key,
    });
    if (!deletedFile) {
      return NextResponse.json(
        {
          success: false,
          message:
            "An error occurred while deleting the file. No file found in the database.",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: `${deletedFile.fileName} has been deleted successfully.`,
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
