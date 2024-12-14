import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export const validateUserFromToken = async ({ request }) => {
  try {
    // User details from NextAuth Token
    const nextAuthToken = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });

    // Token value for normal JWT token
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access-token");

    // If NextAuth and JWT Token are not available, means user is not authenticated
    if (!nextAuthToken && !accessToken) {
      return new NextResponse(
        JSON.stringify({ success: false, message: "User not authenticated" }),
        { status: 401 }
      );
    }

    // If NextAuth is available, return the user details
    if (nextAuthToken) {
      return nextAuthToken;
    }

    // If JWT Token is available, verify the token and return the user details
    if (accessToken) {
      try {
        const user = jwt.verify(accessToken.value, process.env.TOKEN_SECRET);
        return user;
      } catch (err) {
        console.error("JWT Verification Error:", err.message);
        return new NextResponse(
          JSON.stringify({
            success: false,
            message: "Invalid token",
          }),
          { status: 401 }
        );
      }
    }
  } catch (error) {
    console.error("Error handling the request:", error.message);
    return new NextResponse(
      JSON.stringify({ success: false, message: "Internal Server Error" }),
      { status: 500 }
    );
  }
};
