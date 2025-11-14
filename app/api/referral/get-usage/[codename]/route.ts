import { NextRequest, NextResponse } from "next/server";
import connectdb from "@/lib/mongodb";
import { referral } from "@/models/referral";

export async function GET(
  request: NextRequest,
  { params }: { params: { codename: string } }
) {
  const { codename } = params;
  if (!codename) {
    return NextResponse.json(
      {
        success: false,
        message: "Bad request, please enter a referral code id",
      },
      { status: 400 }
    );
  }
  try {

    await connectdb();
    const referralCode = await referral
      .findOne({ codeName: codename })
      .select("codeName usageLimit usageCount expiryDate usageHistory");
    if (!referralCode) {
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
        referralCode: referralCode,
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
