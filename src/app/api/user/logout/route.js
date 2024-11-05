import dbConnect from "@/lib/dbConnect";
import { NextRequest } from "next/server";

export async function GET() {
  await dbConnect(); //INFO: Database connection

  try {
    const response = NextRequest.json(
      {
        success: true,
        message: `Logout successfully`,
      },
      { status: 200 }
    );

    response.cookies.set("token", "", {
      httpOnly: true,
      expiresIn: new Date(0), // delete cookies imediately
    });

    return response;
  } catch (error) {
    console.error(`Error logining out user: ${error}`);
    return Response.json(
      {
        success: false,
        message: `Error logining out user: ${error.message}`,
      },
      { status: 500 }
    );
  }
}
