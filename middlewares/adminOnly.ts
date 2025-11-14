import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import TokenBlacklist from "@/lib/tokenBlacklist";

export default async function adminOnly(
  req: NextRequest
): Promise<NextResponse> {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json(
      { success: false, message: "Authorization token missing" },
      { status: 403 }
    );
  }

  try {
    // Check blacklist
    if (TokenBlacklist.isTokenBlacklisted(token)) {
      return NextResponse.json(
        { success: false, message: "Bad request, unauthorized access" },
        { status: 401 }
      );
    }

    const encoder = new TextEncoder();
    const { payload } = await jwtVerify(
      token,
      encoder.encode(process.env.JWT_SECRET as string)
    );

    if (
      typeof payload === "object" &&
      "role" in payload &&
      payload.role !== "admin"
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "You are not authorized to access this resource",
        },
        { status: 403 }
      );
    }

    return NextResponse.next();
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Invalid token" },
      { status: 401 }
    );
  }
}
