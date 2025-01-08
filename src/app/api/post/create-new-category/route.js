import dbConnect from "@/lib/db/dbConnect";
import { validateUserFromToken } from "@/lib/middleware/validateUser";
import AllBlogsCategoryModel from "@/model/blog/BlogsCategory";
import UserModel from "@/model/User";
import { CategorySchema } from "@/schemas";
import mongoose from "mongoose";
import { nanoid } from "nanoid";
import { NextResponse } from "next/server";

export async function POST(request) {
  await dbConnect();

  try {
    const body = await request.json();
    const {
      userId,
      name,
      slug,
      description,
      parentCategoryId,
      colorTheme,
      isDefault,
      tags,
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

    // NOTE Check request user is a valid user or not
    const requestedUserDetails = await validateUserFromToken({ request });
    if (!requestedUserDetails || requestedUserDetails._id !== userId) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Access denied. You do not have permission to create a category.",
        },
        { status: 403 }
      );
    }

    // NOTE VALIDATE the registration schema
    const validatedFields = CategorySchema.safeParse({
      name,
      slug,
      description,
      parentCategoryId,
      colorTheme,
      isDefault,
      tags,
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
            "Access denied. You do not have permission to create a category.",
        },
        { status: 403 }
      );
    }

    // NOTE Check if category already exists or not
    let newSlug;
    const existsCategory = await AllBlogsCategoryModel.findOne({
      userId: user._id,
      $or: [{ slug }, { name }],
    });

    // Handle Duplicate Category Name (Return an error message)
    if (existsCategory && existsCategory.name === name) {
      return NextResponse.json(
        {
          success: false,
          message:
            "This category already exists. Please choose a different name.",
        },
        { status: 400 }
      );
    }

    // Handle Duplicate Category Slug (Add Random Characters)
    if (existsCategory && existsCategory.slug === slug) {
      const newCharacters = nanoid(4)
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "r") // Remove invalid characters
        .replace(/\s+/g, "-") // Replace spaces with hyphens
        .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
        .replace(/^-|-$/g, ""); // Remove leading or trailing hyphens
      newSlug = slug + "-" + newCharacters;
    }

    // Handle Default Category
    if (isDefault) {
      // Update any existing default categories to set isDefault to false
      await AllBlogsCategoryModel.updateMany(
        { userId: user._id, isDefault: true },
        { $set: { isDefault: false } }
      );
    }

    // NOTE Set the META title if not provided
    let newMetaTitle;
    if (!metaTitle) {
      const createMetaTile = name
        .split(" ")
        .map((word) => `${word[0].toUpperCase()}${word.slice(1)}`)
        .join(" ")
        .slice(0, 50);
      newMetaTitle = createMetaTile + " || Velzon Category";
    }

    // NOTE Set the META description if not provided
    let newMetaDescription;
    if (!metaDescription) {
      newMetaDescription = description;
    }

    // NOTE Set new category object
    const newCategory = {
      userId: user._id.toString(),
      name,
      slug: newSlug || slug,
      description,
      parentCategoryId: parentCategoryId === "none" ? null : parentCategoryId,
      colorTheme,
      isDefault,
      tags,
      metaTitle: newMetaTitle || metaTitle,
      metaImage,
      metaDescription: newMetaDescription || metaDescription,
    };

    // NOTE Create new category
    const newCategoryItem = new AllBlogsCategoryModel(newCategory);
    await newCategoryItem.save();

    return NextResponse.json(
      {
        success: true,
        message: "The category is successfully created.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(`Error in creating new category SERVER: `, error);
    return NextResponse.json(
      {
        success: false,
        message: "An unexpected error occurred. Please try again later.",
      },
      { status: 500 }
    );
  }
}
