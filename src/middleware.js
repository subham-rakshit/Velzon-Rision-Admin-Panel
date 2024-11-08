import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

//NOTE: default means run the middleware in every route
// export { default } from "next-auth/middleware";

//NOTE: This function can be marked `async` if using `await` inside
export async function middleware(request) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  console.log("Middleware called. Token -> ", token); //TODO

  const { pathname } = request.nextUrl;

  // Redirect logged-in users away from auth pages
  if (
    pathname.startsWith("/forgot-password") ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/register") ||
    pathname.startsWith("/reset-password") ||
    pathname.startsWith("/verify-account")
  ) {
    if (token && token.isAdmin) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    } else if (token && !token.isAdmin) {
      return NextResponse.redirect(new URL("/profile", request.url));
    }
  }

  // Redirect unauthenticated users trying to access admin pages
  if (pathname.startsWith("/dashboard")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    } else if (token && !token.isAdmin) {
      return NextResponse.redirect(new URL("/profile", request.url));
    }
  }

  // Allow the request to proceed if no conditions matched
  return NextResponse.next();
}

//NOTE: See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/forgot-password/:path*",
    "/login",
    "/register",
    "/reset-password/:path*",
    "/verify-account/:path*",
    "/dashboard/:path*",
  ],
};
