import dbConnect from "@/lib/db/dbConnect";
import { validateUserFromToken } from "@/lib/middleware/validateUser";
import { NextResponse } from "next/server";

export async function POST(request) {
  await dbConnect();

  try {
    const body = await request.json();
    console.log(body);

    const requestedUserDetails = await validateUserFromToken({ request });

    console.log(requestedUserDetails);

    return NextResponse.json(
      {
        success: true,
        message: "New category created successfully.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(`Error in creating new category SERVER: `, error);
    return NextResponse.json(
      {
        success: false,
        message:
          error.message || "Internal Server Error. Please try again later.",
      },
      { status: 500 }
    );
  }
}
