import dbConnect from "@/lib/db/dbConnect";
import { updateParentCategories } from "@/lib/middleware/updateCategoriesFeaturedStatus";
import { validateUserFromToken } from "@/lib/middleware/validateUser";
import AllBlogsCategoryModel from "@/model/blog/BlogsCategory";
import UserModel from "@/model/User";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function PUT(request) {
  await dbConnect();

  try {
    const body = await request.json();

    const { userId, categoryId, defaultStatus } = body;
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

    // NOTE Make all other categories default status false
    await AllBlogsCategoryModel.updateMany(
      { isDefault: true },
      { $set: { isDefault: false } }
    );

    // NOTE Toggle activeStatus
    const updatedCategory = await AllBlogsCategoryModel.findByIdAndUpdate(
      category._id,
      {
        $set: {
          isDefault: !category.isDefault,
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
    if (updatedCategory.isDefault && updatedCategory.parentCategoryId) {
      await updateParentCategories(updatedCategory.parentCategoryId, false);
    }

    return NextResponse.json(
      {
        success: true,
        message: `${updatedCategory.name} is now the default category. Refreshing to apply changes...`,
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
