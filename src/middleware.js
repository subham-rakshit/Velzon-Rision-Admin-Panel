import { getToken } from "next-auth/jwt";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import setLanguageAction from "./lib/db/api/i18n/setLanguageAction";

// NOTE: Deifine Routes -->
const authRoutes = [
  "/login",
  "/register",
  "/forgot-password",
  "/auth-twostep",
  "/auth-pass-change",
  "/auth-otp-resend",
];

const protectedRoutes = ["/profile", "/admin"];

// NOTE: Web Crypto API Logic for verifying the JWT token
const verifyToken = async (token, secret) => {
  const encoder = new TextEncoder();

  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    {
      name: "HMAC",
      hash: "SHA-256",
    },
    false,
    ["verify"]
  );

  const [header, payload, signature] = token.split(".");

  const data = `${header}.${payload}`;
  const signatureBytes = Uint8Array.from(
    atob(signature.replace(/-/g, "+").replace(/_/g, "/")),
    (c) => c.charCodeAt(0)
  );
  const isValid = await crypto.subtle.verify(
    "HMAC",
    key,
    signatureBytes,
    new TextEncoder().encode(data)
  );

  if (isValid) {
    const user = JSON.parse(atob(payload));

    return user;
  }

  return null;
};

// NOTE: Main middleware function
export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // NextAuth token
  const nextAuthToken = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const cookie = await cookies();
  const language = cookie.get("language");
  if (!language) {
    setLanguageAction("en");
  }

  // JWT Token
  const accessTokenCookie = request.cookies.get("access-token");

  const accessToken = accessTokenCookie ? accessTokenCookie.value : null;
  const tokenUserJWT = accessToken
    ? await verifyToken(accessToken, process.env.TOKEN_SECRET)
    : null;

  // Store token user details based on token availability
  const token = nextAuthToken || tokenUserJWT || null;
  const redirect = (path) => NextResponse.redirect(new URL(path, request.url));

  // Handle Auth Routes
  if (authRoutes.some((route) => pathname.startsWith(route))) {
    return token
      ? redirect(token.role.includes("Admin") ? "/dashboard" : "/landing")
      : NextResponse.next();
  }

  // Handle Protected Routes
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    if (!token) return redirect("/login");

    if (!token.role.includes("Admin")) {
      return redirect("/landing");
    }

    return NextResponse.next();
  }

  // Redirect based on the root path
  if (pathname === "/") {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.redirect(
      new URL(
        token.role.includes("Admin") ? "/admin/dashboard" : "/landing",
        request.url
      )
    );
  }

  // Allow the request to proceed if no conditions matched
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Root
    "/",
    // Auth
    "/login",
    "/register",
    "/forgot-password",
    "/auth-twostep",
    "/auth-pass-change/:path*",
    "/auth-otp-resend",
    // IDEA Protected ----------------
    "/profile",
    "/admin/:path*",
  ],
};
