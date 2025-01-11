import dbConnect from "@/lib/db/dbConnect";
import AllBlogsModel from "@/model/blog/AllBlogs";
import UserModel from "@/model/User";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request) {
  await dbConnect();

  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const postId = searchParams.get("postId");

    // NOTE Validate Category and User IDs
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
        { status: 404 }
      );
    }

    // NOTE Get User info
    const user = await UserModel.findById(userId).exec();
    if (!user || !user.role.includes("Admin")) {
      return NextResponse.json(
        {
          success: false,
          message: "Access denied. You do not have permission to update post.",
        },
        { status: 400 }
      );
    }

    // NOTE Get category details
    const post = await AllBlogsModel.findOne({
      _id: postId,
      userId,
    }).exec();
    if (!post) {
      return NextResponse.json(
        {
          success: false,
          message: "Post not found or does not belong to the user.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      postDetails: post,
    });
  } catch (error) {
    console.log(`Error in getting post details SERVER: ${error}`);
    return NextResponse.json(
      {
        success: false,
        message: "An unexpected error occurred. Please try again later.",
      },
      { status: 500 }
    );
  }
}
