import { NextResponse } from "next/server";

import dbConnect from "@/lib/db/dbConnect";
import handleResponse from "@/lib/middleware/responseMiddleware";
import { validateUserFromToken } from "@/lib/middleware/validateUser";
import AllBlogPostsModel from "@/model/BlogAllPosts";

export async function POST(request) {
  await dbConnect();

  try {
    const requestedUser = await validateUserFromToken();

    if (requestedUser && !requestedUser.isAdmin) {
      return handleResponse({
        res: NextResponse,
        status: 403,
        success: false,
        message: "You are not authorized to create this Blog.",
      });
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
    console.log(
      title,
      category,
      slug,
      shortDescription,
      description,
      metaTitle,
      metaDescription
    );

    // Check the required filed is having value or not
    if (!title || !category || !slug || !shortDescription) {
      return handleResponse({
        res: NextResponse,
        status: 400,
        success: false,
        message: "Please fill all the required fields.",
      });
    }

    // Check if title is already exists or not
    const existsTitle = await AllBlogPostsModel.findOne({ title });
    if (existsTitle) {
      return handleResponse({
        res: NextResponse,
        status: 400,
        success: false,
        message: "Title already exists.",
      });
    }

    // Create a new blog post and save into DB
    const newBlogPost = new AllBlogPostsModel({
      userId: requestedUser._id,
      title,
      category,
      slug,
      shortDescription,
      description,
      metaTitle,
      metaDescription,
    });

    await newBlogPost.save();

    // Success Response
    return handleResponse({
      res: NextResponse,
      status: 201,
      success: true,
      message: "Blog post created successfully.",
    });
  } catch (error) {
    console.log("Error in creating the blog post SERVER: ", error);

    return handleResponse({
      res: NextResponse,
      status: 500,
      success: false,
      message: "Internal Server Error. Please try again later.",
    });
  }
}
