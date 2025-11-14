import axios from "axios";

interface PaystackVerificationResponse {
  success: boolean;
  data: {
    amount: number;
    status: string;
    reference: string;
    details: any;
  };
}

export async function verifyPaystackTransaction(
  reference: string
): Promise<PaystackVerificationResponse> {
  try {
    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    return {
      success:
        response.data.status === true &&
        response.data.data.status === "success",
      data: response.data.data,
    };
  } catch (error: any) {
    console.error("Paystack verification error:", error.response.data);
    return {
      success: false,
      data: {
        amount: 0,
        status: "failed",
        reference: reference,
        details: error.response.data,
      },
    };
  }
}
