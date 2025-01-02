import dbConnect from "@/lib/db/dbConnect";
import { validateUserFromToken } from "@/lib/middleware/validateUser";
import AllBlogsCategoryModel from "@/model/BlogsCategory";
import UserModel from "@/model/User";
import { CategorySchema } from "@/schemas";
import { NextResponse } from "next/server";

export async function POST(request) {
  await dbConnect();

  try {
    const body = await request.json();
    const { newCategory, userId } = body;

    // NOTE Check invalid inputs
    if (!userId) {
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
          message: "Unauthorized access. Please log in and try again.",
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

    // NOTE Get the user details
    const user = await UserModel.findById(userId);
    if (!user || !user.role.includes("Admin")) {
      return NextResponse.json(
        {
          success: false,
          message:
            "You do not have the required permissions to create a new category.",
        },
        { status: 403 }
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
          message:
            "This category already exists. Please choose a different name.",
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
        message: "The category is successfully created.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(`Error in creating new category SERVER: `, error);
    return NextResponse.json(
      {
        success: false,
        message: "An unexpected error occurred. Please try again later.",
      },
      { status: 500 }
    );
  }
}
