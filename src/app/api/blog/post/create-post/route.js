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
          message: "You do not have the required permissions to create a blog.",
        },
        { status: 403 }
      );
    }

    // Check if slug is already exists or not
    let newTitle;
    let newSlug;
    const existsBlogSlug = await AllBlogsModel.findOne({
      $or: [{ slug }, { title }],
    });

    if (existsBlogSlug && existsBlogSlug.slug === slug) {
      const newCharacters = nanoid(4)
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "r") // Remove invalid characters
        .replace(/\s+/g, "-") // Replace spaces with hyphens
        .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
        .replace(/^-|-$/g, ""); // Remove leading or trailing hyphens
      newSlug = slug + "-" + newCharacters;
    }
    if (existsBlogSlug && existsBlogSlug.title === title) {
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
      newMetaTitle =
        createMetaTile + " || Velzon - NEXT.js Admin & Dashboard Template";
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
      bannerImage,
      shortDescription,
      description,
      metaTitle: newMetaTitle || metaTitle,
      metaImage,
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
