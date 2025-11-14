import { NextRequest, NextResponse } from "next/server";
import connectdb from "@/lib/mongodb";
import { referral } from "@/models/referral";
import { validatereferral } from "@/app/validations/schemas/referral-validation";
import verifyToken from "@/middlewares/verifyToken";
import adminOnly from "@/middlewares/adminOnly";

export async function POST(request: NextRequest) {
  await connectdb();
  const data = await request.json();
  const codeName = data?.codeName?.trim();
  const codeType = data?.codeType?.trim();

  try {
    const tokenVerification = await verifyToken(request);
    if (!tokenVerification.ok) {
      return tokenVerification;
    }

    const adminCheck = await adminOnly(request);
    if (!adminCheck.ok) {
      return adminCheck;
    }

    // Check for existing code name
    const existingCode = await referral.findOne({ codeName });
    if (existingCode) {
      return NextResponse.json(
        {
          success: false,
          message: "A code with this name already exists",
        },
        { status: 400 }
      );
    }

    const result = validatereferral.safeParse(data);
    if (!result.success) {
      return NextResponse.json(
        {
          status: `Bad Request`,
          message: result.error.issues,
        },
        { status: 400 }
      );
    }

    // Create the code based on type
    const codeData = {
      ...data,
      codeName,
      codeType,
    };

    // Set irrelevant fields to null based on code type
    if (codeType === "referral") {
      codeData.discountType = null;
      codeData.discountValue = null;
    } else {
      codeData.referralPrice = null;
    }

    const referralCode = await referral.create(codeData);
    return NextResponse.json(
      {
        status: "success",
        code: referralCode,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: error,
      },
      { status: 500 }
    );
  }
}
