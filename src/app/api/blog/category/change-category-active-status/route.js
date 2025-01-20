import dbConnect from "@/lib/db/dbConnect";
import {
  checkDefaultChildCategoryPresence,
  updateChildCategories,
  updateParentCategories,
} from "@/lib/middleware/updateTreeParentChild";
import AllBlogsCategoryModel from "@/model/blog/BlogsCategory";
import UserModel from "@/model/User";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function PUT(request) {
  await dbConnect();

  try {
    const body = await request.json();

    const { userId, categoryId, active } = body;
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

    // NOTE Check if there is a default category in the branch
    if (active) {
      const hasDefaultInBranch = await checkDefaultChildCategoryPresence(
        category._id
      );
      if (hasDefaultInBranch) {
        return NextResponse.json(
          {
            success: false,
            message: "Cannot inactive a category with a default child.",
          },
          { status: 400 }
        );
      }
    }

    // NOTE Toggle activeStatus
    const updatedCategory = await AllBlogsCategoryModel.findByIdAndUpdate(
      category._id,
      {
        $set: {
          activeStatus: !category.activeStatus,
          isFeatured: active === true ? false : category.isFeatured,
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

    // NOTE Update the activeStatus of all child categories also (Top to Bottom)
    await updateChildCategories(categoryId, active);

    // NOTE Update the isFeatured status of parent categories also (Bottom to Top)
    await updateParentCategories(category.parentCategoryId, active);

    return NextResponse.json(
      {
        success: true,
        message: active
          ? `You've disabled ${category.name}. Refreshing to apply changes...`
          : `You've enabled ${category.name}. Refreshing to apply changes...`,
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
