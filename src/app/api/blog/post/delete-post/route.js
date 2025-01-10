import dbConnect from "@/lib/db/dbConnect";
import { validateUserFromToken } from "@/lib/middleware/validateUser";
import AllBlogsModel from "@/model/blog/AllBlogs";
import UserModel from "@/model/User";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function DELETE(request) {
  await dbConnect();

  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const postId = searchParams.get("postId");

    // NOTE: Handle not getting request data
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
          message:
            "Access denied. You do not have permission to delete this post.",
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
            "You do not have the required permissions to delete this post.",
        },
        { status: 403 }
      );
    }

    // NOTE Get the post details
    const post = await AllBlogsModel.findOne({
      _id: postId,
      userId,
    });
    if (!post) {
      return NextResponse.json(
        {
          success: false,
          message:
            "The specified post does not exist or does not belong to the user.",
        },
        { status: 404 }
      );
    }

    // NOTE Delete the post
    const deletedPost = await AllBlogsModel.findOneAndDelete({
      _id: postId,
    });
    if (!deletedPost) {
      return NextResponse.json(
        {
          success: false,
          message: "Unable to delete the post. Please try again later.",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Post deleted successfully. Refreshing...",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(`Error in deleting the post SERVER: ${error}`);

    return NextResponse.json(
      {
        success: false,
        message: "An unexpected error occurred. Please try again later.",
      },
      { status: 500 }
    );
  }
}
