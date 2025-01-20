import dbConnect from "@/lib/db/dbConnect";
import { isDescendant } from "@/lib/middleware/updateTreeParentChild";
import AllBlogsCategoryModel from "@/model/blog/BlogsCategory";
import UserModel from "@/model/User";
import { CategorySchema } from "@/schemas";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function PUT(request) {
  await dbConnect();

  try {
    const body = await request.json();
    const {
      userId,
      categoryId,
      name,
      slug,
      description,
      parentCategoryId,
      metaTitle,
      metaImage,
      metaDescription,
    } = body;

    // NOTE Check validate requested IDs
    if (
      !userId ||
      !categoryId ||
      !mongoose.Types.ObjectId.isValid(userId) ||
      !mongoose.Types.ObjectId.isValid(categoryId)
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid request. Please try again later.",
        },
        { status: 400 }
      );
    }

    // NOTE Get the user and category details
    const user = await UserModel.findById(userId).exec();
    if (!user || !user.role.includes("Admin")) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Access denied. You do not have permission to update this category.",
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

    // NOTE Get the category details
    const existsCategory =
      await AllBlogsCategoryModel.findById(categoryId).exec();
    if (!existsCategory) {
      return NextResponse.json(
        {
          success: false,
          message: "Category not found.",
        },
        { status: 404 }
      );
    }

    // NOTE // Handle duplicate category name or slug. Only check for duplicates if name or slug are changed
    let newSlug;
    if (name !== existsCategory.name || slug !== existsCategory.slug) {
      const existingCategory = await AllBlogsCategoryModel.findOne({
        $or: [{ slug }, { name }],
      }).exec();

      if (existingCategory && existingCategory.name === name) {
        return NextResponse.json(
          {
            success: false,
            message:
              "This category already exists. Please choose a different name.",
          },
          { status: 400 }
        );
      }
      // Handle Duplicate Category Slug (Add Random Characters) // TODO Make it one .replace()
      if (existingCategory && existingCategory.slug === slug) {
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
      const createMetaTile = name
        .split(" ")
        .map((word) => `${word[0].toUpperCase()}${word.slice(1)}`)
        .join(" ")
        .slice(0, 50);
      newMetaTitle = `${createMetaTile} ${process.env.NEXT_PUBLIC_META_APP_NAME}`;
    }

    // Validate parentCategoryId
    if (parentCategoryId && parentCategoryId !== "none") {
      // Check if parentCategoryId is a valid ObjectId
      if (!mongoose.Types.ObjectId.isValid(parentCategoryId)) {
        return NextResponse.json(
          {
            success: false,
            message: "Invalid parent category ID.",
          },
          { status: 400 }
        );
      }

      // Prevent self-referencing
      if (parentCategoryId === categoryId) {
        return NextResponse.json(
          {
            success: false,
            message: "A category cannot be its own parent.",
          },
          { status: 400 }
        );
      }

      // Check if parentCategoryId exists
      const parentCategory =
        await AllBlogsCategoryModel.findById(parentCategoryId).exec();
      if (!parentCategory) {
        return NextResponse.json(
          {
            success: false,
            message: "Parent category does not exist.",
          },
          { status: 404 }
        );
      }

      // Prevent circular references for parent-child only (not sibling relationships)
      // const isDescendant = await AllBlogsCategoryModel.findOne({
      //   parentCategoryId: categoryId,
      // }).exec();
      // // Allow sibling category move
      // if (isDescendant) {
      //   return NextResponse.json(
      //     {
      //       success: false,
      //       message:
      //         "Invalid parent category. A category cannot be a child of itself or its descendants.",
      //     },
      //     { status: 400 }
      //   );
      // }
      const isCircularReference = await isDescendant(
        categoryId,
        parentCategoryId
      );
      console.log("IS_DESC", isCircularReference);
      if (isCircularReference) {
        return NextResponse.json(
          {
            success: false,
            message:
              "Invalid parent category. A category cannot be a child of itself or its descendants.",
          },
          { status: 400 }
        );
      }
    }

    // NOTE Set category updated values object
    const updatedCategoryObj = {
      name,
      slug: newSlug || slug,
      description,
      parentCategoryId: parentCategoryId === "none" ? null : parentCategoryId,
      // parentCategoryId: existsCategory.parentCategoryId,
      metaTitle: newMetaTitle || metaTitle,
      metaImage: metaImage ? metaImage : null,
      metaDescription: metaDescription,
    };

    // NOTE Update the category
    const updatedCategory = await AllBlogsCategoryModel.findOneAndUpdate(
      { _id: categoryId },
      { $set: updatedCategoryObj },
      { new: true }
    ).exec();
    if (!updatedCategory) {
      return NextResponse.json(
        {
          success: false,
          message: "Unable to update the category. Please try again later.",
        },
        { status: 400 }
      );
    }

    // NOTE RESPONSE
    return NextResponse.json(
      {
        success: true,
        message: "Category updated successfully. Redirecting...",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(`Error in updating the category SERVER: ${error}`);
    return NextResponse.json(
      {
        success: false,
        message: "An unexpected error occurred. Please try again later.",
      },
      { status: 500 }
    );
  }
}
