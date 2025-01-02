import dbConnect from "@/lib/db/dbConnect";
import ImageModel from "@/model/Image";
import UserModel from "@/model/User";
import { NextResponse } from "next/server";

export async function GET(request) {
  await dbConnect();

  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const search = searchParams.get("search");

    // Check if the userId present in the request body
    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid request.",
        },
        { status: 400 }
      );
    }

    const user = await UserModel.findById(userId);
    if (!user || !user.role.includes("Admin")) {
      return NextResponse.json(
        {
          success: false,
          message: "UnAuthorized access. You are not permitted to view images.",
        },
        { status: 400 }
      );
    }

    // Get all images from the DB
    const allImages = await ImageModel.find({
      userId: user._id,
      $or: [
        { imageFileName: { $regex: search, $options: "i" } },
        { imageType: { $regex: search, $options: "i" } },
        { imageUrl: { $regex: search, $options: "i" } },
      ],
    });

    return NextResponse.json(
      {
        success: true,
        images: allImages,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(`Error in getting all images SERVER: ${error}`);
    return NextResponse.json(
      {
        success: false,
        message: "An unexpected error occurred. Please try again later.",
      },
      { status: 500 }
    );
  }
}
