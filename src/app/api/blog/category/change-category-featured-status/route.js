import dbConnect from "@/lib/db/dbConnect";
import { updateParentCategories } from "@/lib/middleware/updateTreeParentChild";
import { validateUserFromToken } from "@/lib/middleware/validateUser";
import AllBlogsCategoryModel from "@/model/blog/BlogsCategory";
import UserModel from "@/model/User";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function PUT(request) {
  await dbConnect();

  try {
    const body = await request.json();

    const { userId, categoryId, featuredStatus } = body;
    if (
      !userId ||
      !categoryId ||
      !mongoose.Types.ObjectId.isValid(userId) ||
      !mongoose.Types.ObjectId.isValid(categoryId)
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
          message: "Unauthorized access. Permission denied.",
        },
        { status: 401 }
      );
    }

    // NOTE Get the user details
    const user = await UserModel.findById(userId).exec();
    if (!user || !user.role.includes("Admin")) {
      return NextResponse.json(
        {
          success: false,
          message:
            "You do not have the required permissions to update this category.",
        },
        { status: 403 }
      );
    }

    // NOTE Get the category details
    const category = await AllBlogsCategoryModel.findById(categoryId).exec();
    if (!category) {
      return NextResponse.json(
        {
          success: false,
          message: "Category not found or does not belong to the user.",
        },
        { status: 404 }
      );
    }

    // NOTE Toggle isFeatured
    const updatedCategory = await AllBlogsCategoryModel.findByIdAndUpdate(
      category._id,
      {
        $set: {
          isFeatured: !category.isFeatured,
          activeStatus: true,
        },
      },
      { new: true }
    ).exec();
    if (!updatedCategory) {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to update the category. Try again later.",
        },
        { status: 500 }
      );
    }

    // NOTE Check if the updated category has any parent category, if so then make that parent category's activeStatus as true
    if (updatedCategory.isFeatured && updatedCategory.parentCategoryId) {
      await updateParentCategories(updatedCategory.parentCategoryId, false);
    }

    return NextResponse.json(
      {
        success: true,
        message: `${updatedCategory.name} has been successfully updated ${
          updatedCategory.isFeatured
            ? "as a featured category"
            : "and is no longer featured"
        }. Refreshing to apply changes...`,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(`Error in changing category featured status SERVER: `, error);
    return NextResponse.json(
      {
        success: false,
        message: "An unexpected error occurred. Please try again later.",
      },
      { status: 500 }
    );
  }
}
