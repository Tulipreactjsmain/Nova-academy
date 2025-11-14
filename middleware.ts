import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import verifyToken from "@/middlewares/verifyToken";
import adminOnly from "@/middlewares/adminOnly";
import axios from "axios";

const ADMIN_SECRET_KEY = process.env.NEXT_PUBLIC_ADMIN_SECRET_KEY;
const ADMIN_PATH = process.env.NEXT_PUBLIC_ADMIN_PATH;
const authenticatedPaths = [`/${ADMIN_PATH}`, `/${ADMIN_PATH}/orders`];

export async function middleware(request: NextRequest) {
  const currentPath = request.nextUrl.pathname;

  // Only process requests for the admin path
  if (currentPath.startsWith(`/${ADMIN_PATH}`)) {
    // console.log("Processing admin path:", currentPath);

    const secretKey = request.nextUrl.searchParams.get("key");
    // console.log("Key:", secretKey);

    // Check if the secret key is present and valid, if not redirect to home
    if (secretKey === null || secretKey !== ADMIN_SECRET_KEY) {
      console.log("Invalid key, redirecting to home");
      return NextResponse.redirect(new URL("/", request.url));
    }

    // Check if the current path exactly matches any authenticated path
    if (authenticatedPaths.includes(currentPath)) {
      // Verify token if the path needs authentication
      const tokenVerification = await verifyToken(request);

      if (!tokenVerification.ok) {
        console.log("Token verification failed");
        return NextResponse.redirect(
          new URL(`/${ADMIN_PATH}/login?key=${ADMIN_SECRET_KEY}`, request.url)
        );
      }

      // Check admin status
      const adminCheck = await adminOnly(request);
      if (!adminCheck.ok) {
        console.log("Admin check failed");
        return NextResponse.redirect(
          new URL(`/${ADMIN_PATH}/login?key=${ADMIN_SECRET_KEY}`, request.url)
        );
      }

      // If both checks pass, allow the request to proceed
      return NextResponse.next();
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all admin paths
    `/:path*`,
  ],
};
