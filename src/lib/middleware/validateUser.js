import jwt from "jsonwebtoken";
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export const validateUserFromToken = async ({ request }) => {
  try {
    // Token value for normal JWT token
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access-token");
    const nextAuthToken = cookieStore.get("next-auth.session-token");

    // If NextAuth and JWT Token are not available, means user is not authenticated
    if (!nextAuthToken && !accessToken) return {};

    // If NextAuth is available, return the user details
    if (nextAuthToken) {
      const decodedOAuth = await decode({
        token: nextAuthToken.value,
        secret: process.env.NEXTAUTH_SECRET,
      });

      return decodedOAuth;
    }

    // If JWT Token is available, verify the token and return the user details
    if (accessToken) {
      try {
        const user = jwt.verify(accessToken.value, process.env.TOKEN_SECRET);
        return user;
      } catch (err) {
        console.error("JWT Verification Error:", err.message);
        return {};
      }
    }
  } catch (error) {
    console.error("Error handling the request:", error.message);
    return {};
  }
};
