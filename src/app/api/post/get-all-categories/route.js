import dbConnect from "@/lib/db/dbConnect";
import AllBlogsCategoryModel from "@/model/blog/BlogsCategory";
import UserModel from "@/model/User";
import { NextResponse } from "next/server";

export async function GET(request) {
  await dbConnect();

  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const search = searchParams.get("search");

    // NOTE: Handle not getting request data
    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid inputs.",
        },
        { status: 404 }
      );
    }

    // NOTE Get User info
    const user = await UserModel.findById(userId);
    if (!user || !user.role.includes("Admin")) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Access denied. You do not have permission to view categories.",
        },
        { status: 400 }
      );
    }

    // NOTE Get all categories
    const query = {
      userId,
      ...(search ? { category: { $regex: search, $options: "i" } } : {}),
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
