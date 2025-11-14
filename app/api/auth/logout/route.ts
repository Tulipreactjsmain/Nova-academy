import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import TokenBlacklist from "@/lib/tokenBlacklist";

export async function POST(req: NextRequest) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token");

    if (token) {
      // Add to blacklist instead of database
      TokenBlacklist.addToken(token.value);
      cookieStore.delete("token");
    }

    return NextResponse.json(
      { message: "Logged out successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Internal server error", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
