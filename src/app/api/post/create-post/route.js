import { NextResponse } from "next/server";

import dbConnect from "@/lib/db/dbConnect";
import { validateUserFromToken } from "@/lib/middleware/validateUser";
import AllBlogPostsModel from "@/model/blog/BlogAllPosts";
import UserModel from "@/model/User";
import { AllPostsSchema } from "@/schemas";

export async function POST(request) {
  await dbConnect();

  try {
    const body = await request.json();
    const {
      userId,
      title,
      category,
      slug,
      bannerImage,
      shortDescription,
      description,
      metaTitle,
      metaImage,
      metaDescription,
    } = body;

    // Get the user details from the token
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

    // NOTE: Validate the required fileds schema
    const validatedFields = AllPostsSchema.safeParse({
      title,
      category,
      slug,
      bannerImage,
      shortDescription,
      description,
      metaTitle,
      metaImage,
      metaDescription,
    });
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
            "You do not have the required permissions to create a new post.",
        },
        { status: 403 }
      );
    }

    // Check if title is already exists or not
    const duplicateCheck = await AllBlogPostsModel.findOne({
      $or: [{ title }, { slug }],
    });

    if (duplicateCheck) {
      return NextResponse.json(
        {
          success: false,
          message:
            duplicateCheck.title === title
              ? "A post with this title already exists. Please choose a different title."
              : "This slug is already in use. Please choose a different slug.",
        },
        { status: 400 }
      );
    }

    // Create a new blog post and save into DB
    const newBlogPost = new AllBlogPostsModel({
      userId: user._id,
      title,
      category,
      slug,
      bannerImage,
      shortDescription,
      description,
      metaTitle,
      metaImage,
      metaDescription,
    });

    await newBlogPost.save();

    return NextResponse.json(
      {
        success: true,
        message: "Blog post created successfully.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.log("Error in creating the blog post SERVER: ", error);
    return NextResponse.json(
      {
        success: false,
        message: "An unexpected error occurred. Please try again later.",
      },
      { status: 500 }
    );
  }
}
