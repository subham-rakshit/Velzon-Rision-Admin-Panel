import { NextResponse } from "next/server";

import dbConnect from "@/lib/db/dbConnect";
import { validateUserFromToken } from "@/lib/middleware/validateUser";
import AllBlogPostsModel from "@/model/BlogAllPosts";
import { AllPostsSchema } from "@/schemas/pagesSchema/blogSystem/allPostsSchema";

export async function POST(request) {
  await dbConnect();

  try {
    // Get the user details from the token
    const user = await validateUserFromToken({ request });

    // Check if the user is an admin
    if (user && !user.isAdmin) {
      return new NextResponse(
        JSON.stringify({
          success: false,
          message: "You are not authorized to create this Blog.",
        }),
        { status: 403 }
      );
    }

    const { blogFieldsObject } = await request.json();

    const {
      title,
      category,
      slug,
      shortDescription,
      description,
      metaTitle,
      metaDescription,
    } = blogFieldsObject || {};

    // NOTE: Validate the required fileds schema
    const validatedFields = AllPostsSchema.safeParse({
      title,
      category,
      slug,
      shortDescription,
    });
    if (!validatedFields.success) {
      return new NextResponse(
        JSON.stringify(
          {
            success: false,
            message: validatedFields.error.flatten().fieldErrors,
          },
          { status: 400 }
        )
      );
    }

    // Check if title is already exists or not
    const existsTitle = await AllBlogPostsModel.findOne({ title });
    if (existsTitle) {
      return new NextResponse(
        JSON.stringify({
          success: false,
          message: "Title is already exists.",
        }),
        { status: 400 }
      );
    }

    // Check if Slug is already exists or not
    const existsSlug = await AllBlogPostsModel.findOne({ slug });
    if (existsSlug) {
      return new NextResponse(
        JSON.stringify({
          success: false,
          message: "Slug is already exists.",
        }),
        { status: 400 }
      );
    }

    // Create a new blog post and save into DB
    const newBlogPost = new AllBlogPostsModel({
      userId: user._id,
      title,
      category,
      slug,
      shortDescription,
      description,
      metaTitle,
      metaDescription,
    });

    await newBlogPost.save();

    return new NextResponse(
      JSON.stringify({
        success: true,
        message: "Blog post created successfully.",
        blogData: newBlogPost,
      }),
      { status: 201 }
    );
  } catch (error) {
    console.log("Error in creating the blog post SERVER: ", error);
    return new NextResponse(
      JSON.stringify({
        success: false,
        message: "Internal Server Error. Please try again later.",
      }),
      { status: 500 }
    );
  }
}
