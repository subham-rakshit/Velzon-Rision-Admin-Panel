import { NextResponse } from "next/server";

import dbConnect from "@/lib/db/dbConnect";
import { validateUserFromToken } from "@/lib/middleware/validateUser";
import AllBlogsModel from "@/model/blog/AllBlogs";
import UserModel from "@/model/User";
import { AllBlogsSchema } from "@/schemas";
import mongoose from "mongoose";
import { nanoid } from "nanoid";

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
      tags,
      source,
      metaTitle,
      metaImage,
      metaDescription,
    } = body;

    // NOTE Check invalid inputs
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid request. Please try again later.",
        },
        { status: 400 }
      );
    }

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
    const validatedFields = AllBlogsSchema.safeParse({
      title,
      category,
      slug,
      bannerImage,
      shortDescription,
      description,
      tags,
      source,
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
    const user = await UserModel.findById(userId).exec();
    if (!user || !user.role.includes("Admin")) {
      return NextResponse.json(
        {
          success: false,
          message: "You do not have the required permissions to create a blog.",
        },
        { status: 403 }
      );
    }

    // Check if slug is already exists or not
    let newTitle;
    let newSlug;
    const existingBlogDetails = await AllBlogsModel.findOne({
      $or: [{ slug }, { title }],
    }).exec();

    if (existingBlogDetails && existingBlogDetails.slug === slug) {
      const newCharacters = nanoid(4)
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "r") // Remove invalid characters
        .replace(/\s+/g, "-") // Replace spaces with hyphens
        .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
        .replace(/^-|-$/g, ""); // Remove leading or trailing hyphens
      newSlug = slug + "-" + newCharacters;
    }
    if (existingBlogDetails && existingBlogDetails.title === title) {
      const newTitleCharacters = nanoid(4)
        .toUpperCase()
        .replace(/[^a-zA-Z0-9]/g, "0"); // Remove invalid characters

      newTitle = title + " " + newTitleCharacters;
    }

    // NOTE Set the META title and description if not provided
    let newMetaTitle;
    let newMetaDescription;
    if (!metaTitle) {
      const createMetaTile = title
        .split(" ")
        .map((word) => `${word[0].toUpperCase()}${word.slice(1)}`)
        .join(" ")
        .slice(0, 50);
      newMetaTitle = `${createMetaTile} ${process.env.NEXT_PUBLIC_META_APP_NAME}`;
    }
    if (!metaDescription) {
      newMetaDescription = shortDescription;
    }

    // Create a new blog post and save into DB
    const newBlogPost = new AllBlogsModel({
      userId: user._id.toString(),
      title: newTitle || title,
      category,
      slug: newSlug || slug,
      bannerImage: bannerImage || null,
      shortDescription,
      description,
      tags,
      source,
      metaTitle: newMetaTitle || metaTitle,
      metaImage: metaImage || null,
      metaDescription: newMetaDescription || metaDescription,
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
