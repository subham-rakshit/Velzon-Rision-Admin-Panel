import { NextResponse } from "next/server";

import dbConnect from "@/lib/db/dbConnect";

export async function GET(request) {
  await dbConnect(); // INFO: Database connection

  try {
    const response = NextResponse.json(
      {
        success: true,
        message: `Logout successfully`,
      },
      { status: 200 }
    );

    // NOTE Handle diffrent type of cookies
    const nextAuthCookie = "next-auth.session-token"; // Handle NextAuth token
    const apiAuthCookie = "access-token"; // Handle Api Access Token

    if (request.cookies.has(nextAuthCookie)) {
      response.cookies.set(nextAuthCookie, "", {
        httpOnly: true,
        expiresIn: new Date(0), // delete cookies imediately
        maxAge: 0,
        path: "/",
      });
    } else if (request.cookies.has(apiAuthCookie)) {
      response.cookies.set(apiAuthCookie, "", {
        httpOnly: true,
        expiresIn: new Date(0), // delete cookies imediately
        maxAge: 0,
        path: "/",
      });
    }

    return response;
  } catch (error) {
    console.error(`Error logining out user: ${error}`);

    return NextResponse.json(
      {
        success: false,
        message: `Error logining out user: ${error.message}`,
      },
      { status: 500 }
    );
  }
}
