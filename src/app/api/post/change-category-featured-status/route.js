import dbConnect from "@/lib/db/dbConnect";
import {
  updateChildCategories,
  updateParentCategories,
} from "@/lib/middleware/updateCategoriesFeaturedStatus";
import { validateUserFromToken } from "@/lib/middleware/validateUser";
import AllBlogsCategoryModel from "@/model/blog/BlogsCategory";
import UserModel from "@/model/User";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function PUT(request) {
  await dbConnect();

  try {
    const body = await request.json();

    const { userId, categoryId, isFeatured } = body;
    if (!userId || !categoryId) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid request parameters.",
        },
        { status: 400 }
      );
    }
    // Check if IDs are valid MongoDB ObjectIDs
    if (
      !mongoose.Types.ObjectId.isValid(userId) ||
      !mongoose.Types.ObjectId.isValid(categoryId)
    ) {
      return NextResponse.json(
        { success: false, message: "Invalid request parameters." },
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
    const user = await UserModel.findById(userId);
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
    const category = await AllBlogsCategoryModel.findOne({
      _id: categoryId,
      userId: user._id,
    });
    if (!category) {
      return NextResponse.json(
        {
          success: false,
          message: "Category not found or does not belong to the user.",
        },
        { status: 404 }
      );
    }

    // NOTE Toggle isFeatured status
    const updatedCategory = await AllBlogsCategoryModel.findByIdAndUpdate(
      { _id: categoryId },
      { $set: { isFeatured: !category.isFeatured } },
      { new: true }
    );
    if (!updatedCategory) {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to update the category. Try again later.",
        },
        { status: 500 }
      );
    }

    // NOTE Update the isFeatured status of all child categories also (Top to Bottom)
    await updateChildCategories(categoryId, isFeatured);

    // NOTE Update the isFeatured status of parent categories also (Bottom to Top)
    await updateParentCategories(category.parentCategoryId, isFeatured);

    return NextResponse.json(
      {
        success: true,
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
