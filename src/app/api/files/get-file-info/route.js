import dbConnect from "@/lib/db/dbConnect";
import FilesModel from "@/model/Files";
import UserModel from "@/model/User";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request) {
  await dbConnect();

  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const name = searchParams.get("name");
    const type = searchParams.get("type");
    const size = searchParams.get("size");

    // NOTE Validate Category and User IDs
    if (
      !userId ||
      !name ||
      !type ||
      !size ||
      !mongoose.Types.ObjectId.isValid(userId) ||
      !Number.isInteger(parseInt(size))
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid request. Please try again later.",
        },
        { status: 404 }
      );
    }

    // NOTE Get User info
    const user = await UserModel.findById(userId).exec();
    if (!user || !user.role.includes("Admin")) {
      return NextResponse.json(
        {
          success: false,
          message: "Access denied. You do not have permission to upload file.",
        },
        { status: 400 }
      );
    }

    // NOTE Get file details
    const fileDetails = await FilesModel.find({
      fileName: name,
      fileType: type,
      fileSize: parseInt(size),
    }).exec();

    return NextResponse.json(
      {
        success: true,
        file: fileDetails,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(`Error from get file info SERVER: ${error}`);
    return NextResponse.json(
      {
        success: false,
        message: "An unexpected error occurred. Please try again later.",
      },
      { status: 500 }
    );
  }
}
