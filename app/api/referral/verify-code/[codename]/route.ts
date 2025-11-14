import { NextRequest, NextResponse } from "next/server";
import connectdb from "@/lib/mongodb";
import { referral } from "@/models/referral";

export async function GET(
  request: NextRequest,
  { params }: { params: { codename: string } }
) {
  try {
    await connectdb();
    const { codename } = params;

    // Find and verify referral code
    const referralCode = await referral.findOne({ codeName: codename });
    if (!referralCode) {
      return NextResponse.json(
        { success: false, message: "Invalid referral code" },
        { status: 404 }
      );
    }

    // Check if code has expired
    if (new Date(referralCode.expiryDate) < new Date()) {
      return NextResponse.json(
        { success: false, message: "Referral code has expired" },
        { status: 400 }
      );
    }

    // Check usage limit
    if (referralCode.usageCount >= referralCode.usageLimit) {
      return NextResponse.json(
        { success: false, message: "Referral code usage limit exceeded" },
        { status: 400 }
      );
    }

    // Return success with code details
    return NextResponse.json({
      success: true,
      data: {
        code: {
          id: referralCode._id,
          codeName: referralCode.codeName,
          codeType: referralCode.codeType,
          discountType: referralCode.discountType,
          discountValue: referralCode.discountValue,
          referralPrice: referralCode.referralPrice,
          description: referralCode.description,
          expiryDate: referralCode.expiryDate,
          usageLimit: referralCode.usageLimit,
          usageCount: referralCode.usageCount,
        },
        message: "Referral code is valid and can be used",
      },
    });
  } catch (err) {
    console.error("Error verifying referral code:", err);
    return NextResponse.json(
      { success: false, message: "Failed to verify referral code" },
      { status: 500 }
    );
  }
} 