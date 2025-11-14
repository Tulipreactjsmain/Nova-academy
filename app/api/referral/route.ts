import { NextRequest, NextResponse } from "next/server";
import connectdb from "@/lib/mongodb";
import { userValidation } from "@/app/validations/schemas/referral-validation";
import { referral } from "@/models/referral";
import Course from "@/models/Course";

export async function POST(request: NextRequest) {
  const referralCode = await request.json();
  const userDetails = {
    codeName: referralCode?.codeName.trim(),
    customerName: referralCode?.customerName.trim(),
    courseId: referralCode.courseId,
  };
  if (!userDetails.courseId) {
    return NextResponse.json(
      {
        success: false,
        message: "Bad request, please enter a valid course",
      },
      { status: 400 }
    );
  }
  const result = userValidation.safeParse(referralCode);
  if (!result.success) {
    return NextResponse.json({
      success: false,
      message: result.error.issues,
    });
  }
  try {
    // connectdb
    await connectdb();
    // Verify the referral code
    const checkReferralCode = await referral.findOne({
      codeName: userDetails.codeName,
    });
    if (!checkReferralCode) {
      return NextResponse.json(
        {
          success: false,
          message: "Bad request, invalid code name",
        },
        { status: 400 }
      );
    }
    // Verify if the course exists
    const checkCourse = await Course.findById({
      _id: userDetails.courseId,
    });
    if (!checkCourse) {
      return NextResponse.json(
        {
          success: false,
          message: "Bad request, invalid course Id",
        },
        { status: 400 }
      );
    }
    let userUsage = checkReferralCode.usageCount;

    // verify the limit for the referral code hasn't being exceeded
    if (userUsage >= checkReferralCode.usageLimit) {
      return NextResponse.json(
        {
          success: false,
          message: "Bad request, referral code has exceeded its limit",
        },
        { status: 400 }
      );
    }

    userUsage = (userUsage || 0) + 1;
    checkReferralCode.usageCount = userUsage;

    const referralExpiry = checkReferralCode.expiryDate;

    if (Date.now() > referralExpiry) {
      return NextResponse.json(
        {
          success: false,
          message: "Bad request, referral code has reached its expiry",
        },
        { status: 400 }
      );
    }

    const usageHistory = {
      customerName: userDetails.customerName,
      courseId: userDetails.courseId,
    };

    await checkReferralCode.usageHistory.push(usageHistory);
    await checkReferralCode.save();

    return NextResponse.json(
      {
        success: true,
        updatedHistory: {
          checkReferralCode,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Server error",
      },
      { status: 500 }
    );
  }
}
