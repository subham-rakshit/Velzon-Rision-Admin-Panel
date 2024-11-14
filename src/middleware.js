import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

//SECTION: Deifine Routes -->
const authRoutes = [
  "/login",
  "/register",
  "/forgot-password",
  "/auth-twostep",
  "/auth-pass-change",
  "/auth-otp-resend",
];
const publicRoutes = ["/landing", "/pages-comming-soon"];
const protectedRoutes = [
  "/profile",
  // Dashboard
  "/dashboard",
  "/dashboard-analytics",
  "/dashboard-blog",
  "/dashboard-crm",
  "/dashboard-crypto",
  "/dashboard-job",
  "/dashboard-nft",
  "/dashboard-projects",
  // Apps
  "/apps-calendar-month-grid",
  "/apps-calendar",
  "/apps-email-basic",
  "/apps-email-ecommerce",
  "/apps-mailbox",
  "/apps-chat",
  "/apps-ecommerce-add-product",
  "/apps-ecommerce-cart",
  "/apps-ecommerce-checkout",
  "/apps-ecommerce-customers",
  "/apps-ecommerce-order-details",
  "/apps-ecommerce-orders",
  "/apps-ecommerce-product-details",
  "/apps-ecommerce-products",
  "/apps-ecommerce-seller-details",
  "/apps-ecommerce-sellers",
  "/apps-projects-create",
  "/apps-projects-list",
  "/apps-projects-overview",
];

//SECTION: Web Crypto API Logic for verifying the JWT token
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

//SECTION: Main middleware function
export async function middleware(request) {
  const { pathname } = request.nextUrl;

  //INFO: NextAuth token
  const nextAuthToken = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  //INFO: JWT Token
  const accessTokenCookie = request.cookies.get("access-token");
  const accessToken = accessTokenCookie ? accessTokenCookie.value : null;

  let tokenUserJWT;
  if (accessToken) {
    tokenUserJWT = await verifyToken(accessToken, process.env.TOKEN_SECRET);
  }

  //INFO: Store token based on token availability
  let token;
  if (nextAuthToken) {
    token = nextAuthToken;
  } else if (tokenUserJWT) {
    token = tokenUserJWT;
  } else {
    token = null;
  }

  //TODO Remove thisthis
  console.log(
    `1. Middleware called. ${nextAuthToken ? "NEXTAUTH" : "JWT"} TOKEN -> `,
    token
  );

  //INFO: Handle Auth Routes
  if (authRoutes.some((route) => pathname.startsWith(route))) {
    console.log("Middleware called and AUTH ROUTE hits....."); //TODO REMOVE

    if (token) {
      return NextResponse.redirect(
        new URL(token.isAdmin ? "/dashboard" : "/landing", request.url)
      );
    }

    return NextResponse.next();
  }

  //INFO: Handle Public Routes
  if (publicRoutes.some((route) => pathname.startsWith(route))) {
    console.log("Middleware called and PUBLIC ROUTE hits....."); //TODO REMOVE

    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
  }

  //INFO: Handle Protected Routes
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    console.log("Middleware called and PROTECTED ROUTE hits....."); //TODO REMOVE

    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    if (
      (pathname.startsWith("/dashboard") || pathname.startsWith("/apps")) &&
      !token.isAdmin
    ) {
      return NextResponse.redirect(new URL("/landing", request.url));
    }

    return NextResponse.next();
  }

  //INFO: Redirect based on the root path
  if (pathname === "/") {
    console.log("Middleware called and [ / ] hits....."); //TODO REMOVE

    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.redirect(
      new URL(token.isAdmin ? "/dashboard" : "/landing", request.url)
    );
  }

  // Allow the request to proceed if no conditions matched
  console.log("PASS the request....."); //TODO REMOVE
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Auth
    "/login",
    "/register",
    "/forgot-password",
    "/auth-twostep",
    "/auth-pass-change/:path*",
    "/auth-otp-resend",
    // Public
    "/landing",
    "/pages-comming-soon",
    // Protected
    "/profile",
    "/dashboard",
    "/dashboard-analytics",
    "/dashboard-blog",
    "/dashboard-crm",
    "/dashboard-crypto",
    "/dashboard-job",
    "/dashboard-nft",
    "/dashboard-projects",
    "/apps-calendar-month-grid",
    "/apps-calendar",
    "/apps-email-basic",
    "/apps-email-ecommerce",
    "/apps-mailbox",
    "/apps-chat",
    "/apps-ecommerce-add-product",
    "/apps-ecommerce-cart",
    "/apps-ecommerce-checkout",
    "/apps-ecommerce-customers",
    "/apps-ecommerce-order-details",
    "/apps-ecommerce-orders",
    "/apps-ecommerce-product-details",
    "/apps-ecommerce-products",
    "/apps-ecommerce-seller-details",
    "/apps-ecommerce-sellers",
    "/apps-projects-create",
    "/apps-projects-list",
    "/apps-projects-overview",
    // Root
    "/",
  ],
};
