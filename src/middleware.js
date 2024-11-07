import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

//NOTE: default means run the middleware in every route
export { default } from "next-auth/middleware";

//NOTE: This function can be marked `async` if using `await` inside
export async function middleware(request) {
  const token = await getToken({ req: request });

  const url = request.nextUrl;

  console.log("Middleware token: ", token); //IDEA: LOG

  //INFO: Checks for redirections
  if (
    token &&
    (url.pathname.startsWith("/login") ||
      url.pathname.startsWith("/register") ||
      url.pathname.startsWith("/reset-password") ||
      url.pathname.startsWith("/verify-account") ||
      url.pathname.startsWith("/"))
  ) {
    return NextResponse.redirect(new URL("/user/profile-details", request.url));
  }

  if (!token && url.pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

//NOTE: See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/",
    "/login",
    "/register",
    "/reset-password/:path*", // further all routes of /reset-password
    "/verify-account/:path*", // further all routes of /verify-account
    "/admin/:path*", // further all routes of /verify-account
  ],
};
