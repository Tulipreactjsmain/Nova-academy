import { NextRequest, NextResponse } from "next/server";
import connectdb from "@/lib/mongodb";
import { referral } from "@/models/referral";
import verifyToken from "@/middlewares/verifyToken";
import adminOnly from "@/middlewares/adminOnly";

export async function GET(request: NextRequest) {
  try {
    const tokenVerification = await verifyToken(request);
    if (!tokenVerification.ok) {
      return tokenVerification;
    }

    const adminCheck = await adminOnly(request);
    if (!adminCheck.ok) {
      return adminCheck;
    }

    await connectdb();
    const referralCodes = await referral.find();
    if (!referralCodes) {
      return NextResponse.json(
        {
          success: false,
          message: "Bad request, invalid referral code",
        },
        { status: 400 }
      );
    }
    return NextResponse.json(
      {
        success: true,
        message: "Referral code fetched successfully",
        referralCode: referralCodes,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Server error",
      },
      { status: 500 }
    );
  }
}
