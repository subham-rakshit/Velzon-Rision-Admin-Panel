import dbConnect from "@/lib/db/dbConnect";
import AllBlogsModel from "@/model/blog/AllBlogs";
import UserModel from "@/model/User";
import { AllBlogsSchema } from "@/schemas";
import mongoose from "mongoose";
import { nanoid } from "nanoid";
import { NextResponse } from "next/server";

export async function PUT(request) {
  await dbConnect();

  try {
    const body = await request.json();
    const {
      userId,
      postId,
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

    // NOTE Check validate requested IDs
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

    // NOTE VALIDATE the registration schema
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
          message:
            "Access denied. You do not have permission to update this post.",
        },
        { status: 403 }
      );
    }

    // NOTE Get the post details
    const existsPost = await AllBlogsModel.findById(postId).exec();
    if (!existsPost) {
      return NextResponse.json(
        {
          success: false,
          message: "Post not found.",
        },
        { status: 404 }
      );
    }

    // NOTE Only check for duplicates if name or slug are changed
    let newSlug;
    let newTitle;
    if (title !== existsPost.title || slug !== existsPost.slug) {
      const existingPostDetails = await AllBlogsModel.findOne({
        $or: [{ slug }, { title }],
      }).exec();
      // Handle Duplicate Post Title (Add Random Characters)
      if (existingPostDetails && existingPostDetails.title === title) {
        const newTitleCharacters = nanoid(4)
          .toUpperCase()
          .replace(/[^a-zA-Z0-9]/g, "0"); // Remove invalid characters

        newTitle = title + " " + newTitleCharacters;
      }
      // Handle Duplicate Post Slug (Add Random Characters)
      if (existingPostDetails && existingPostDetails.slug === slug) {
        const newCharacters = nanoid(4)
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, "r") // Remove invalid characters
          .replace(/\s+/g, "-") // Replace spaces with hyphens
          .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
          .replace(/^-|-$/g, ""); // Remove leading or trailing hyphens
        newSlug = slug + "-" + newCharacters;
      }
    }

    // NOTE Set the META title if not provided
    let newMetaTitle;
    if (!metaTitle) {
      const createMetaTile = title
        .split(" ")
        .map((word) => `${word[0].toUpperCase()}${word.slice(1)}`)
        .join(" ")
        .slice(0, 50);
      newMetaTitle = `${createMetaTile} ${process.env.NEXT_PUBLIC_META_APP_NAME}`;
    }

    // NOTE Set the META description if not provided
    let newMetaDescription;
    if (!metaDescription) {
      newMetaDescription = shortDescription;
    }

    // NOTE Set post updated values object
    const updatedPostObj = {
      title: newTitle || title,
      category,
      slug: newSlug || slug,
      bannerImage: bannerImage ? bannerImage : null,
      shortDescription,
      description,
      tags,
      source,
      metaTitle: newMetaTitle || metaTitle,
      metaImage: metaImage ? metaImage : null,
      metaDescription: newMetaDescription || metaDescription,
    };

    // NOTE Update the post
    const updatedPost = await AllBlogsModel.findOneAndUpdate(
      { _id: postId },
      { $set: updatedPostObj },
      { new: true }
    ).exec();
    if (!updatedPost) {
      return NextResponse.json(
        {
          success: false,
          message: "Unable to update the post. Please try again later.",
        },
        { status: 400 }
      );
    }

    // NOTE RESPONSE
    return NextResponse.json(
      {
        success: true,
        titleName: updatedPost.title,
        message: "Category updated successfully. Redirecting...",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(`Error in updating the post SERVER: ${error}`);
    return NextResponse.json(
      {
        success: false,
        message: "An unexpected error occurred. Please try again later.",
      },
      { status: 500 }
    );
  }
}
