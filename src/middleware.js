// import { NextResponse } from "next/server";
// import { getToken } from "next-auth/jwt";

// //NOTE: Deifine Routes -->
// const authRoutes = [
//   "/login",
//   "/register",
//   "/forgot-password",
//   "/auth-twostep",
//   "/auth-pass-change",
//   "/auth-otp-resend",
// ];

// const protectedRoutes = [
//   "/profile",
//   "/dashboard",
//   "/apps",
//   "/pages",
//   "/base-ui",
//   "/advance",
//   "/widgets",
//   "/forms",
//   "/tables",
//   "/charts",
//   "/icons",
// ];

// //NOTE: Web Crypto API Logic for verifying the JWT token
// const verifyToken = async (token, secret) => {
//   const encoder = new TextEncoder();

//   const key = await crypto.subtle.importKey(
//     "raw",
//     encoder.encode(secret),
//     {
//       name: "HMAC",
//       hash: "SHA-256",
//     },
//     false,
//     ["verify"]
//   );

//   const [header, payload, signature] = token.split(".");

//   const data = `${header}.${payload}`;
//   const signatureBytes = Uint8Array.from(
//     atob(signature.replace(/-/g, "+").replace(/_/g, "/")),
//     (c) => c.charCodeAt(0)
//   );
//   const isValid = await crypto.subtle.verify(
//     "HMAC",
//     key,
//     signatureBytes,
//     new TextEncoder().encode(data)
//   );

//   if (isValid) {
//     const user = JSON.parse(atob(payload));

//     return user;
//   }

//   return null;
// };

// //NOTE: Main middleware function
// export async function middleware(request) {
//   const { pathname } = request.nextUrl;

//   // NextAuth token
//   const nextAuthToken = await getToken({
//     req: request,
//     secret: process.env.NEXTAUTH_SECRET,
//   });

//   // JWT Token
//   const accessTokenCookie = request.cookies.get("access-token");
//   const accessToken = accessTokenCookie ? accessTokenCookie.value : null;
//   const tokenUserJWT = accessToken
//     ? await verifyToken(accessToken, process.env.TOKEN_SECRET)
//     : null;

//   // Store token based on token availability
//   const token = nextAuthToken || tokenUserJWT || null;

//   const redirect = (path) => NextResponse.redirect(new URL(path, request.url));

//   //TODO Remove thisthis
//   console.log(
//     `1. Middleware called. ${nextAuthToken ? "NEXTAUTH" : "JWT"} TOKEN -> `,
//     token
//   );

//   // Handle Auth Routes
//   if (authRoutes.some((route) => pathname.startsWith(route))) {
//     console.log("Middleware called and AUTH ROUTE hits....."); //TODO REMOVE

//     return token
//       ? redirect(token.isAdmin ? "/dashboard" : "/landing")
//       : NextResponse.next();
//   }

//   // Handle Protected Routes
//   if (protectedRoutes.some((route) => pathname.startsWith(route))) {
//     console.log("Middleware called and PROTECTED ROUTE hits....."); //TODO REMOVE

//     if (!token) return redirect("/login");

//     if (!token.isAdmin) {
//       return redirect("/landing");
//     }

//     return NextResponse.next();
//   }

//   // Redirect based on the root path
//   if (pathname === "/") {
//     console.log("Middleware called and [ / ] hits....."); //TODO REMOVE

//     if (!token) {
//       return NextResponse.redirect(new URL("/login", request.url));
//     }
//     return NextResponse.redirect(
//       new URL(token.isAdmin ? "/dashboard" : "/landing", request.url)
//     );

//     return token
//       ? redirect(token.isAdmin ? "/dashboard" : "/landing")
//       : redirect("/login");
//   }

//   // Allow the request to proceed if no conditions matched
//   console.log("PASS the request....."); //TODO REMOVE
//   return NextResponse.next();
// }

// export const config = {
//   matcher: [
//     // Root
//     "/",

//     // Auth

//     "/login",
//     "/register",
//     "/forgot-password",
//     "/auth-twostep",
//     "/auth-pass-change/:path*",
//     "/auth-otp-resend",

//     //IDEA Protected ----------------

//     "/profile",
//     // Dashboard --
//     "/dashboard",
//     "/dashboard-analytics",
//     "/dashboard-blog",
//     "/dashboard-crm",
//     "/dashboard-crypto",
//     "/dashboard-job",
//     "/dashboard-nft",
//     "/dashboard-projects",
//     // Apps --
//     "/apps-calendar-month-grid",
//     "/apps-main-calendar",
//     "/apps-email-basic",
//     "/apps-email-ecommerce",
//     "/apps-mailbox-email",
//     "/apps-chat",
//     "/apps-ecommerce-add-product",
//     "/apps-ecommerce-cart",
//     "/apps-ecommerce-checkout",
//     "/apps-ecommerce-customers",
//     "/apps-ecommerce-order-details",
//     "/apps-ecommerce-orders",
//     "/apps-ecommerce-product-details",
//     "/apps-ecommerce-products",
//     "/apps-ecommerce-seller-details",
//     "/apps-ecommerce-sellers",
//     "/apps-projects-create",
//     "/apps-projects-list",
//     "/apps-projects-overview",
//     "/apps-tasks-details",
//     "/apps-tasks-kanban",
//     "/apps-tasks-list-view",
//     "/apps-crm-companies",
//     "/apps-crm-contacts",
//     "/apps-crm-deals",
//     "/apps-crm-leads",
//     "/apps-crypto-buy-sell",
//     "/apps-crypto-ico",
//     "/apps-crypto-kyc",
//     "/apps-crypto-orders",
//     "/apps-crypto-transactions",
//     "/apps-crypto-wallet",
//     "/apps-invoices-create",
//     "/apps-invoices-details",
//     "/apps-invoices-list",
//     "/apps-tickets-details",
//     "/apps-tickets-list",
//     "/apps-nft-auction",
//     "/apps-nft-collections",
//     "/apps-nft-create",
//     "/apps-nft-creators",
//     "/apps-nft-explore",
//     "/apps-nft-item-details",
//     "/apps-nft-marketplace",
//     "/apps-nft-ranking",
//     "/apps-nft-wallet",
//     "/apps-file-manager",
//     "/apps-todo",
//     "/apps-job-candidate-grid",
//     "/apps-job-candidate-lists",
//     "/apps-job-lists-details-view",
//     "/apps-job-lists-grid-view",
//     "/apps-job-lists-view",
//     "/apps-job-application",
//     "/apps-job-categories",
//     "/apps-job-companies-lists",
//     "/apps-job-new",
//     "/apps-job-statistics",
//     "/apps-api-key",
//     // Pages --
//     "/pages-blog-grid",
//     "/pages-blog-list",
//     "/pages-blog-overview",
//     "/pages-profile",
//     "/pages-user-profile-settings",
//     // "/pages-coming-soon", // Public
//     "/pages-faqs",
//     "/pages-gallery",
//     // "/pages-maintenance", // Public
//     "/pages-pricing",
//     "/pages-privacy-policy",
//     "/pages-search-results",
//     "/pages-sitemap",
//     "/pages-starter",
//     "/pages-team",
//     "/pages-terms-condition",
//     "/pages-timeline",
//     // Base UI
//     "/base-ui-accordions",
//     "/base-ui-alerts",
//     "/base-ui-badges",
//     "/base-ui-buttons",
//     "/base-ui-cards",
//     "/base-ui-carousel",
//     "/base-ui-colors",
//     "/base-ui-dropdowns",
//     "/base-ui-embed-video",
//     "/base-ui-general",
//     "/base-ui-grid",
//     "/base-ui-images",
//     "/base-ui-links",
//     "/base-ui-lists",
//     "/base-ui-media",
//     "/base-ui-modals",
//     "/base-ui-notifications",
//     "/base-ui-offcanvas",
//     "/base-ui-placeholders",
//     "/base-ui-progress",
//     "/base-ui-ribbons",
//     "/base-ui-tabs",
//     "/base-ui-typography",
//     "/base-ui-utilities",
//     // Advance UI
//     "/advance-ui-animation",
//     "/advance-ui-highlight",
//     "/advance-ui-nestable",
//     "/advance-ui-ratings",
//     "/advance-ui-scrollbar",
//     "/advance-ui-swiper",
//     // Widgets
//     "/widgets",
//     // Forms
//     "/forms-elements",
//     "/forms-select",
//     "/forms-checkboxes-radios",
//     "/forms-pickers",
//     "/forms-masks",
//     "/forms-advanced",
//     "/forms-range-sliders",
//     "/forms-validation",
//     "/forms-wizard",
//     "/forms-editors",
//     "/forms-file-uploads",
//     "/forms-layouts",
//     "/forms-select2",
//     // Tables
//     "/tables-basic",
//     "/tables-listjs",
//     "/tables-react",
//     // Charts
//     "/charts-apex-line",
//     "/charts-apex-area",
//     "/charts-apex-column",
//     "/charts-apex-bar",
//     "/charts-apex-mixed",
//     "/charts-apex-timeline",
//     "/charts-apex-range-area",
//     "/charts-apex-funnel",
//     "/charts-apex-candlestick",
//     "/charts-apex-boxplot",
//     "/charts-apex-bubble",
//     "/charts-apex-scatter",
//     "/charts-apex-heatmap",
//     "/charts-apex-treemap",
//     "/charts-apex-pie",
//     "/charts-apex-radialbar",
//     "/charts-apex-radar",
//     "/charts-apex-polar",
//     "/charts-apex-slope",
//     "/charts-chartjs",
//     "/charts-echarts",
//     // Icons
//     "/icons-remix",
//     "/icons-boxicons",
//     "/icons-materialdesign",
//     "/icons-lineawesome",
//     "/icons-feather",
//     "/icons-crypto",
//   ],
// };

export { auth as middleware } from "@/auth";
