import dbConnect from "@/lib/db/dbConnect";
import { validateUserFromToken } from "@/lib/middleware/validateUser";
import AllBlogsModel from "@/model/blog/AllBlogs";
import AllBlogsCategoryModel from "@/model/blog/BlogsCategory";
import UserModel from "@/model/User";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function DELETE(request) {
  await dbConnect();

  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const categoryId = searchParams.get("categoryId");

    // NOTE: Handle not getting request data
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
          message:
            "Access denied. You do not have permission to delete this category.",
        },
        { status: 403 }
      );
    }

    // NOTE Get the user details
    const user = await UserModel.findById(userId).exec();
    if (!user || !user.role.includes("Admin")) {
      return NextResponse.json(
        {
          success: false,
          message:
            "You do not have the required permissions to delete this category.",
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
          message:
            "The specified category does not exist or does not belong to the user.",
        },
        { status: 404 }
      );
    }

    // NOTE IF category is a default category, return an error message
    if (category.isDefault) {
      return NextResponse.json(
        {
          success: false,
          message:
            "You cannot delete a default category. Please choose a different category to delete.",
        },
        { status: 400 }
      );
    }

    // NOTE Check if there is a default category
    const defaultCategory = await AllBlogsCategoryModel.findOne({
      isDefault: true,
    }).exec();
    if (!defaultCategory) {
      return NextResponse.json(
        {
          success: false,
          message:
            "No default category found. Please ensure a default category exists before deleting categories.",
        },
        { status: 400 }
      );
    }

    // NOTE Delete the category
    const deletedCategory = await AllBlogsCategoryModel.findByIdAndDelete(
      category._id
    ).exec();
    if (!deletedCategory) {
      return NextResponse.json(
        {
          success: false,
          message: "Unable to delete the category. Please try again later.",
        },
        { status: 400 }
      );
    }

    // NOTE Check if the category has any parent category, and having any child category, then make those child category's parentCategoryId as the deleted category's parentCategoryId otherwise make the parentCategoryId as null
    await AllBlogsCategoryModel.updateMany(
      { parentCategoryId: category._id },
      { $set: { parentCategoryId: category.parentCategoryId || null } }
    );

    // NOTE Update all blog posts related to the deleted category to use the default category
    await AllBlogsModel.updateMany(
      { category: category._id },
      { $set: { category: defaultCategory ? defaultCategory._id : null } }
    );

    return NextResponse.json(
      {
        success: true,
        message: "Category deleted successfully. Refreshing...",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(`Error in deleting the category SERVER: ${error}`);

    return NextResponse.json(
      {
        success: false,
        message: "An unexpected error occurred. Please try again later.",
      },
      { status: 500 }
    );
  }
}
