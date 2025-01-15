import dbConnect from "@/lib/db/dbConnect";
import FilesModel from "@/model/Files";
import UserModel from "@/model/User";
import escapeStringRegexp from "escape-string-regexp";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request) {
  await dbConnect();

  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const search = searchParams.get("search");
    const page = parseInt(searchParams.get("page") || "1", 10);
    const pageSize = parseInt(searchParams.get("pageSize") || "20", 10);
    const selectedFileType = searchParams.get("selectedFileType");

    // NOTE Validate Category and User IDs
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid request. Please try again later.",
        },
        { status: 400 }
      );
    }

    // NOTE Get User info
    const user = await UserModel.findById(userId).exec();
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found.",
        },
        { status: 404 }
      );
    }
    if (!Array.isArray(user.role) || !user.role.includes("Admin")) {
      return NextResponse.json(
        {
          success: false,
          message: "Access denied. You do not have permission to view files.",
        },
        { status: 403 }
      );
    }

    // NOTE Map selected file types
    let actualFileType;

    switch (selectedFileType) {
      case "images":
        actualFileType = { fileType: { $regex: "^image/" } }; // Match FILE type starting with "image/"
        break;
      case "videos":
        actualFileType = { fileType: { $regex: "^video/" } };
        break;
      case "pdf":
        actualFileType = { fileType: "application/pdf" };
      case "other":
        actualFileType = {
          $and: [
            { fileType: { $not: { $regex: "^image/" } } },
            { fileType: { $not: { $regex: "^video/" } } },
            { fileType: { $ne: "application/pdf" } },
          ],
        };
        break;
      default:
        actualFileType = null; // Ignore unsupported types
        break;
    }

    // NOTE Escape special characters - (), ., *, +, ?, [, ], ^, $, \ -> Prevents regex injection attacks. More info: https://www.freeformatter.com/regexp-escape.html [Ex - hello(world) = hello\(world\)]. Ensures your search strings behave as intended in a regular expression. Reduces runtime errors caused by invalid regex patterns.
    const query = {};
    if (search) {
      const searchQuery = escapeStringRegexp(search);
      query.$or = [
        { fileName: { $regex: searchQuery, $options: "i" } },
        { fileType: { $regex: searchQuery, $options: "i" } },
      ];
    }
    if (actualFileType) {
      query.$or = [...(query.$or || []), actualFileType];
    }

    // Fetch files with pagination
    const [filesList, totalFiles] = await Promise.all([
      FilesModel.find(query)
        .sort({ createdAt: -1 })
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .exec(),
      FilesModel.countDocuments(query).exec(),
    ]);

    // Prepare pagination data
    const paginationData = {
      currentPage: page,
      currentLimit: pageSize,
      totalPages: Math.ceil(totalFiles / pageSize),
      totalFiles,
    };

    return NextResponse.json(
      {
        success: true,
        files: filesList,
        paginationData,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(`Error in getting all files SERVER: ${error.stack || error}`);
    return NextResponse.json(
      {
        success: false,
        message: "An unexpected error occurred. Please try again later.",
      },
      { status: 500 }
    );
  }
}
