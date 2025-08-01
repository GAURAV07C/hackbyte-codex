import authconfig from "@/lib/auth.config";
import NextAuth from "next-auth";

import {
  publicRouts,
  authRoutes,
  apiAuthPrefix,
  DEFAULT_LOGIN_REDIRECT,
} from "@/lib/routes";

const { auth } = NextAuth(authconfig);
console.log(auth.name);
export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

   const role = req.auth?.user?.role;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);

  const isPublicRoute =
    publicRouts.includes(nextUrl.pathname) ||
    /^\/[^\/]+$/.test(nextUrl.pathname);

  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  console.log(nextUrl.pathname);

  if (isApiAuthRoute) {
    return;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }

    return;
  }

  if (!isLoggedIn && (nextUrl.pathname === "/dashboard" || !isPublicRoute)) {
    return Response.redirect(new URL("/", nextUrl));
  }

  // 👇 Yeh condition add ki hai: Agar logged-in user "/" par jaye to /dashboard
  if (isLoggedIn && nextUrl.pathname === "/") {
    return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
  }

   if (nextUrl.pathname.startsWith("/admin") && role !== "ADMIN") {
     return Response.redirect(new URL("/dashboard", req.url));
   }

  return;
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ], // Apply only to auth routes
};
