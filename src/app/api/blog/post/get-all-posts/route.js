import dbConnect from "@/lib/db/dbConnect";
import AllBlogsModel from "@/model/blog/AllBlogs";
import AllBlogsCategoryModel from "@/model/blog/BlogsCategory";
import FilesModel from "@/model/Files";
import UserModel from "@/model/User";
import escapeStringRegexp from "escape-string-regexp";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request) {
  await dbConnect();

  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const search = searchParams.get("search");
    const page = parseInt(searchParams.get("page") || 1);
    const pageSize = parseInt(searchParams.get("pageSize") || 9);
    const category = searchParams.get("category");
    const status = searchParams.get("status");
    const featured = searchParams.get("featured");

    // NOTE Validate Category and User IDs
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid request. Please try again later.",
        },
        { status: 400 }
      );
    }

    // NOTE Get User info
    const user = await UserModel.findById(userId).exec();
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found.",
        },
        { status: 404 }
      );
    }
    if (!Array.isArray(user.role) || !user.role.includes("Admin")) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Access denied. You do not have permission to view blog posts.",
        },
        { status: 403 }
      );
    }

    // NOTE Escape special characters - (), ., *, +, ?, [, ], ^, $, \ -> Prevents regex injection attacks. More info: https://www.freeformatter.com/regexp-escape.html [Ex - hello(world) = hello\(world\)]. Ensures your search strings behave as intended in a regular expression. Reduces runtime errors caused by invalid regex patterns.
    const searchQuery = escapeStringRegexp(search || "");
    const query = {
      ...(searchQuery && {
        $or: [
          { title: { $regex: searchQuery, $options: "i" } },
          { slug: { $regex: searchQuery, $options: "i" } },
          { shortDescription: { $regex: searchQuery, $options: "i" } },
          { description: { $regex: searchQuery, $options: "i" } },
        ],
      }),
      ...(category &&
        mongoose.Types.ObjectId.isValid(category) && { category }), // Category filter (direct match)
      ...(status && {
        isActive: status === "true", // Convert to boolean
      }),
      ...(featured && {
        isFeatured: featured === "true", // Convert to boolean
      }),
    };

    const postsList = await AllBlogsModel.find(query)
      .populate({
        path: "category",
        model: AllBlogsCategoryModel,
        select: "name",
      })
      .populate({
        path: "bannerImage",
        model: FilesModel,
        select: "fileUrl fileName fileType",
      })
      .sort({ createdAt: -1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .exec();

    const paginationTotalPosts =
      await AllBlogsModel.countDocuments(query).exec();
    const totalPostsCount = await AllBlogsModel.countDocuments().exec();

    // Pagination
    const paginationData = {
      currentPage: page,
      currentLimit: pageSize,
      totalPages: Math.ceil(paginationTotalPosts / pageSize),
      totalPosts: paginationTotalPosts,
      totalPostsCount,
    };

    return NextResponse.json(
      {
        success: true,
        posts: postsList,
        paginationData,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(
      `Error in getting all categories SERVER: ${error.stack || error}`
    );
    return NextResponse.json(
      {
        success: false,
        message: "An unexpected error occurred. Please try again later.",
      },
      { status: 500 }
    );
  }
}
