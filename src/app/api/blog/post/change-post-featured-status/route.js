import dbConnect from "@/lib/db/dbConnect";
import { validateUserFromToken } from "@/lib/middleware/validateUser";
import AllBlogsModel from "@/model/blog/AllBlogs";
import UserModel from "@/model/User";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function PUT(request) {
  await dbConnect();

  try {
    const body = await request.json();

    const { userId, postId } = body;
    if (
      !userId ||
      !postId ||
      !mongoose.Types.ObjectId.isValid(userId) ||
      !mongoose.Types.ObjectId.isValid(postId)
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

    // NOTE Get the post details
    const existingBlogPostDetails = await AllBlogsModel.findById(postId).exec();
    if (!existingBlogPostDetails) {
      return NextResponse.json(
        {
          success: false,
          message: "Post not found or does not belong to the user.",
        },
        { status: 404 }
      );
    }

    // NOTE Toggle activeStatus
    const updatedBlogPost = await AllBlogsModel.findByIdAndUpdate(
      postId,
      {
        $set: {
          isFeatured: !existingBlogPostDetails.isFeatured,
        },
      },
      { new: true }
    ).exec();
    if (!updatedBlogPost) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Failed to update the post featured status. Try again later.",
        },
        { status: 500 }
      );
    }

    // NOTE Check if the updated post's featured status is true and active status is false, then make updated post's isActive as true
    if (updatedBlogPost.isFeatured && !updatedBlogPost.isActive) {
      await AllBlogsModel.findByIdAndUpdate(updatedBlogPost._id, {
        $set: {
          isActive: true,
        },
      });
    }

    return NextResponse.json(
      {
        success: true,
        message: updatedBlogPost.isFeatured
          ? `You've enabled the blog post as a featured post. Refreshing to apply changes...`
          : `You've disabled the blog post as a featured post. Refreshing to apply changes...`,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(`Error in changing post featured status SERVER: `, error);
    return NextResponse.json(
      {
        success: false,
        message: "An unexpected error occurred. Please try again later.",
      },
      { status: 500 }
    );
  }
}
