import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect(); //INFO: Database connection

  try {
    const response = NextResponse.json(
      {
        success: true,
        message: `Logout successfully`,
      },
      { status: 200 }
    );

    response.cookies.set("next-auth.session-token", "", {
      httpOnly: true,
      expiresIn: new Date(-1), // delete cookies imediately
      path: "/",
    });

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
