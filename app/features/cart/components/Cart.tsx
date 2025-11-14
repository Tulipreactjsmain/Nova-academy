"use client";
import { Button, InputField } from "@/app/components";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  selectCartItems,
  selectCartTotal,
  removeFromCart,
} from "@/app/features/cart/slice/cartSlice";
import EmptyCartUI from "./EmptyCartUI";
import SummaryUI from "./SummaryUI";
import { usePaystackPayment } from "react-paystack";
import { useState, useEffect, useCallback } from "react";
import { showToast } from "@/app/utils/toasts";
import { formatNigerianPrice } from "@/app/utils/formatPrice";
import {
  OrderRequest,
  OrderResponse,
  PaystackResponse,
} from "@/app/features/cart/types";
import {
  selectVerifiedCode,
  verifyCode,
  selectVerifyStatus,
  selectVerifyError,
} from "@/app/features/referral/slice/userReferralSlice";
import FullPageLoader from "@/app/components/FullPageLoader";

import axios from "axios";

export const Cart = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const cartItems = useAppSelector(selectCartItems);
  const cartTotal = useAppSelector(selectCartTotal);
  const verifiedCode = useAppSelector(selectVerifiedCode);
  const verifyStatus = useAppSelector(selectVerifyStatus);
  const verifyError = useAppSelector(selectVerifyError);
  const dispatch = useAppDispatch();

  const calculateDiscountedTotal = () => {
    if (
      !verifiedCode ||
      verifiedCode.codeType !== "discount" ||
      !verifiedCode.discountValue
    ) {
      return cartTotal;
    }

    if (verifiedCode.discountType === "percentage") {
      return cartTotal * (1 - verifiedCode.discountValue);
    } else {
      // For fixed discount, apply to each course's total price
      return cartItems.reduce((total, item) => {
        const itemTotal = item.price.current * item.quantity;
        const discountedItemTotal = Math.max(
          0,
          itemTotal - verifiedCode.discountValue! * item.quantity
        );
        return total + discountedItemTotal;
      }, 0);
    }
  };

  // Validate all owner emails are filled
  const validateOwnerEmails = useCallback(() => {
    return cartItems.every(
      (item) =>
        item.owners?.length === item.quantity &&
        item.owners.every(
          (email) => email?.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
        )
    );
  }, [cartItems]);

  useEffect(() => {
    const isValid =
      Boolean(email) &&
      Boolean(name) &&
      cartItems.length > 0 &&
      validateOwnerEmails() &&
      !cartItems.some((item) => !item.cohort._id);

    setIsFormValid(isValid);
  }, [email, name, cartItems, validateOwnerEmails]);

  const onSuccess = async (response: PaystackResponse) => {
    try {
      cartItems.forEach((item) => {
        dispatch(removeFromCart(item._id));
      });
      showToast("Payment successful", "success");
      const orderData: OrderRequest = {
        customerName: name,
        customerEmail: email,
        totalAmount: calculateDiscountedTotal(),
        items: cartItems,
        referralCode: verifiedCode?.codeName || null,
      };

      const baseUrl =
        process.env.NODE_ENV === "production"
          ? process.env.NEXT_PUBLIC_API_URL
          : process.env.NEXT_PUBLIC_LOCAL_API_URL;

      const timestamp = Date.now().toString();
      const orderResponse = await axios.post(
        `${baseUrl}/api/orders`,
        orderData,
        {
          headers: {
            "Content-Type": "application/json",
            "X-Timestamp": timestamp,
            "X-Paystack-Reference": response.reference,
          },
        }
      );

      const data: OrderResponse = orderResponse.data;
      if (!data.success) {
        throw new Error(data.message || "Failed to create order");
      }
    } catch (error) {
      showToast("Error processing order", "error");
      console.error("Order processing error:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const onValidate = async () => {
    try {
      const orderData: OrderRequest = {
        customerName: name,
        customerEmail: email,
        totalAmount: calculateDiscountedTotal(),
        items: cartItems,
        referralCode: verifiedCode?.codeName || null,
      };

      const baseUrl =
        process.env.NODE_ENV === "production"
          ? process.env.NEXT_PUBLIC_API_URL
          : process.env.NEXT_PUBLIC_LOCAL_API_URL;

      const timestamp = Date.now().toString();
      const orderResponse = await axios.post(
        `${baseUrl}/api/orders/validate`,
        orderData,
        {
          headers: {
            "Content-Type": "application/json",
            "X-Timestamp": timestamp,
          },
        }
      );

      const data: any = orderResponse.data;
      if (!data.success) {
        showToast(data.message || "Failed to validate order", "error");
        return;
      }
    } catch (error: any) {
      showToast(error.message || "Error validating order", "error");
      console.error("Order validation error:", error);
      return;
    }
  };

  const onClose = () => {
    showToast("Payment cancelled", "error");
  };

  const initializePayment = usePaystackPayment({
    reference: `PAY-${Date.now()}-${Math.floor(Math.random() * 1000000)}`,
    email,
    amount: calculateDiscountedTotal() * 100,
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY as string,
    firstname: name.split(" ")[0],
    lastname: name.split(" ").slice(1).join(" "),
    currency: "NGN",
    metadata: {
      custom_fields: [
        {
          display_name: "Full Name",
          variable_name: "full_name",
          value: name,
        },
        {
          display_name: "Order Items",
          variable_name: "items_count",
          value: cartItems.length,
        },
      ],
      cartItems: cartItems.map((item) => ({
        courseTitle: item.title,
        quantity: item.quantity,
      })),
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsProcessing(true);

    const formData = new FormData(e.currentTarget);
    const formDataObj = Object.fromEntries(formData.entries());

    if (!formDataObj.name || !formDataObj.email) {
      showToast("Please fill in all required fields", "error");
      return;
    }
    if (verifiedCode?.codeName) {
      await dispatch(verifyCode(verifiedCode.codeName));
      if (verifyStatus === "failed") {
        showToast(verifyError || "Referral code is no longer valid", "error");
        setIsProcessing(false);
        return;
      }
    }
    await onValidate();

    setIsProcessing(false);
    initializePayment({ onSuccess, onClose });
  };

  return (
    <div>
      {cartItems.length === 0 ? (
        <EmptyCartUI />
      ) : (
        <form onSubmit={handleSubmit}>
          {isProcessing && <FullPageLoader />}
          <div className="">
            <h1 className="text-blue-80 text-5xl pb-[1.25rem] border-b-4 border-yellow-base">
              Summary
            </h1>
            <SummaryUI />
          </div>
          <div className="w-full mt-12">
            <h1 className="text-blue-80 text-5xl pb-[1.25rem] border-b-4 border-yellow-base">
              Checkout
            </h1>
            <div className="backdrop-blur-md rounded-2xl shadow-md p-8 max-w-[928px] ml-auto w-full mt-12 transition-all duration-300 hover:shadow-md">
              <div className="flex items-center gap-4 mb-8">
                <div className="bg-yellow-base/10 p-3 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-yellow-base"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                    />
                  </svg>
                </div>
                <h2 className="text-blue-80 text-3xl font-semibold">
                  Billing Details
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6 w-full">
                <div className="space-y-4">
                  <InputField
                    id="name"
                    type="text"
                    placeholder="Full Name"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="space-y-4">
                  <InputField
                    id="email"
                    type="email"
                    placeholder="Email Address"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="w-fit ml-auto mt-8">
              <Button
                type="submit"
                outerBtnClassName="w-fit transform transition-transform duration-300 hover:scale-105 ml-auto"
                isInnerBorderWhite={false}
                innerBtnClassName="font-bold text-2xl"
                textColor="text-blue-80"
                disabled={!isFormValid || isProcessing}
              >
                {`Pay ${formatNigerianPrice(calculateDiscountedTotal())}`}
              </Button>
              {!isFormValid && (
                <p className="text-red-500 text-md mt-2">
                  Please fill in all required fields including owner emails
                </p>
              )}
            </div>
          </div>
        </form>
      )}
    </div>
  );
};
