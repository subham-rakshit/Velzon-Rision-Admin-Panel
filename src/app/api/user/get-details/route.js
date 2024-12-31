import { validateUserFromToken } from "@/lib/middleware/validateUser";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    // Get the user details from the token
    const userData = await validateUserFromToken({ request });

    if (!userData) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthenticated user.",
        },
        { status: 400 }
      );
    } else {
      return NextResponse.json(
        {
          success: true,
          user: userData,
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.log(`Error getting user details SERVER: ${error}`);

    return NextResponse.json(
      {
        success: false,
        message: `An unexpected error occurred while processing your request. Please try again later.`,
      },
      { status: 500 }
    );
  }
}
