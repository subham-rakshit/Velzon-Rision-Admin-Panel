import dbConnect from "@/lib/db/dbConnect";
import { validateUserFromToken } from "@/lib/middleware/validateUser";
import AllBlogsCategoryModel from "@/model/blog/BlogsCategory";
import UserModel from "@/model/User";
import { CategorySchema } from "@/schemas";
import { NextResponse } from "next/server";

export async function PUT(request) {
  await dbConnect();

  try {
    const body = await request.json();
    const { userId, categoryId, newCategory } = body;

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

    // NOTE VALIDATE the registration schema
    const validatedFields = CategorySchema.safeParse({ newCategory });
    if (!validatedFields.success) {
      let zodErrors = {};
      validatedFields.error.issues.forEach((issue) => {
        zodErrors = {
          ...zodErrors,
          [issue.path[0]]: { message: issue.message },
        };
      });

      return NextResponse.json(
        { success: false, errors: zodErrors },
        { status: 400 }
      );
    }

    // NOTE Get the user and category details
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
    if (category.category === newCategory) {
      return NextResponse.json(
        {
          success: false,
          message:
            "The new category name matches the existing one. Please provide a different name.",
        },
        { status: 400 }
      );
    }

    // NOTE Update the category
    const updatedCategory = await AllBlogsCategoryModel.findOneAndUpdate(
      { _id: categoryId },
      { $set: { category: newCategory } },
      { new: true }
    );
    if (!updatedCategory) {
      return NextResponse.json(
        {
          success: false,
          message: "Unable to update the category. Please try again later.",
        },
        { status: 400 }
      );
    }

    // NOTE RESPONSE
    return NextResponse.json(
      {
        success: true,
        message: "Category updated successfully.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(`Error in updating the category SERVER: ${error}`);
    return NextResponse.json(
      {
        success: false,
        message: "An unexpected error occurred. Please try again later.",
      },
      { status: 500 }
    );
  }
}
