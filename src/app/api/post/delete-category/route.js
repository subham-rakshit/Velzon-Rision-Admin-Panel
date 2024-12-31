import dbConnect from "@/lib/db/dbConnect";
import { validateUserFromToken } from "@/lib/middleware/validateUser";
import AllBlogsCategoryModel from "@/model/BlogsCategory";
import UserModel from "@/model/User";
import { NextResponse } from "next/server";

export async function DELETE(request) {
  await dbConnect();

  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const categoryId = searchParams.get("categoryId");

    // NOTE: Handle not getting request data
    if (!userId || !categoryId) {
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
    if (!requestedUserDetails || requestedUserDetails._id !== userId) {
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
            "You do not have the required permissions to delete this category.",
        },
        { status: 403 }
      );
    }

    // NOTE Get the category details
    const category = await AllBlogsCategoryModel.findOne({
      _id: categoryId,
      userId,
    });
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

    // NOTE Delete the category
    const deletedCategory = await AllBlogsCategoryModel.findOneAndDelete({
      _id: categoryId,
    });
    if (!deletedCategory) {
      return NextResponse.json(
        {
          success: false,
          message: "Unable to delete the category. Please try again later.",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Category deleted successfully.",
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
