import dbConnect from "@/lib/db/dbConnect";
import { validateUserFromToken } from "@/lib/middleware/validateUser";
import AllBlogsCategoryModel from "@/model/BlogsCategory";
import UserModel from "@/model/User";
import { NextResponse } from "next/server";

export async function POST(request) {
  await dbConnect();

  try {
    const body = await request.json();
    const { newCategory, userId } = body;

    // NOTE Check invalid inputs
    if (!newCategory || !userId) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid inputs.",
        },
        { status: 400 }
      );
    }

    // NOTE Check request user is a valid user or not
    const requestedUserDetails = await validateUserFromToken({ request });
    if (requestedUserDetails._id !== userId) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized access. Permission denied.",
        },
        { status: 403 }
      );
    }

    // NOTE Get the user details
    const user = await UserModel.findById(userId);
    if (!user || !user.role.includes("Admin")) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Unauthorized access. You are not authorized to create new category.",
        },
        { status: 400 }
      );
    }

    // NOTE Check if category already exists or not
    const existsCategory = await AllBlogsCategoryModel.findOne({
      category: newCategory,
      userId,
    });
    if (existsCategory) {
      return NextResponse.json(
        {
          success: false,
          message: "Category already exists. Please try another one.",
        },
        { status: 400 }
      );
    }

    // NOTE Create new category
    const newCategoryItem = new AllBlogsCategoryModel({
      userId,
      category: newCategory,
    });
    await newCategoryItem.save();

    return NextResponse.json(
      {
        success: true,
        message: "New category created successfully.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(`Error in creating new category SERVER: `, error);
    return NextResponse.json(
      {
        success: false,
        message:
          error.message || "Internal Server Error. Please try again later.",
      },
      { status: 500 }
    );
  }
}
