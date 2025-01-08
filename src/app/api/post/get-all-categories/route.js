import dbConnect from "@/lib/db/dbConnect";
import AllBlogsCategoryModel from "@/model/blog/BlogsCategory";
import UserModel from "@/model/User";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request) {
  await dbConnect();

  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const search = searchParams.get("search");

    // NOTE Validate Category and User IDs
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid request. Please try again later.",
        },
        { status: 404 }
      );
    }

    // NOTE Get User info
    const user = await UserModel.findById(userId);
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Access denied. You do not have permission to view categories.",
        },
        { status: 404 }
      );
    }

    // NOTE Get all categories
    const query = {
      $or: [
        { name: { $regex: search, $options: "i" } },
        { slug: { $regex: search, $options: "i" } },
      ],
    };
    const categoryList = await AllBlogsCategoryModel.find(query);

    return NextResponse.json(
      {
        success: true,
        categories: categoryList,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(`Error in getting all categories SERVER: ${error}`);
    return NextResponse.json(
      {
        success: false,
        message: "An unexpected error occurred. Please try again later.",
      },
      { status: 500 }
    );
  }
}
