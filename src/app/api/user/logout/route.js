import dbConnect from "@/lib/db/dbConnect";
import handleResponse from "@/lib/middleware/responseMiddleware";
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
    return handleResponse({
      res: Response,
      status: 500,
      success: false,
      message: `Error logining out user: ${error.message}`,
    });
  }
}
