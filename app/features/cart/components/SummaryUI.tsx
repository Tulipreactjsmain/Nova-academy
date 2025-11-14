import {
  removeFromCart,
  selectCartItems,
  updateQuantity,
  updateOwners,
} from "@/app/features/cart/slice/cartSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import Image from "next/image";
import Link from "next/link";
import { InputField, Button } from "@/app/components";
import { formatNigerianPrice } from "@/app/utils/formatPrice";
import { BsArrowUpRight, BsExclamationCircle } from "react-icons/bs";
import {
  verifyCode,
  selectVerifiedCode,
  selectVerifyStatus,
  selectVerifyError,
  clearVerifyState,
} from "@/app/features/referral/slice/userReferralSlice";
import { useState, useEffect } from "react";
import { fetchValidCohorts } from "@/app/features/cohorts/slice/cohortSlice";
import { showToast } from "@/app/utils/toasts";

export default function SummaryUI() {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);
  const [codeInput, setCodeInput] = useState("");
  const verifiedCode = useAppSelector(selectVerifiedCode);
  const verifyStatus = useAppSelector(selectVerifyStatus);
  const verifyError = useAppSelector(selectVerifyError);

  useEffect(() => {
    dispatch(fetchValidCohorts());
  }, []);

  const handleCodeInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCodeInput(e.target.value);
    dispatch(clearVerifyState());
  };

  const handleApplyCode = async () => {
    if (!codeInput.trim()) return;
    try {
      const result = await dispatch(verifyCode(codeInput)).unwrap();
      showToast("Referral code is valid", "success");
    } catch (error: any) {
      showToast(error.message || "Referral code is no longer valid", "error");
    }
  };

  const calculateDiscountedPrice = (price: number, quantity: number) => {
    if (
      !verifiedCode ||
      verifiedCode.codeType !== "discount" ||
      !verifiedCode.discountValue
    ) {
      return price;
    }

    if (verifiedCode.discountType === "percentage") {
      return price * (1 - verifiedCode.discountValue);
    } else {
      // For fixed discount, apply per item
      return Math.max(0, price - verifiedCode.discountValue);
    }
  };

  const handleRemoveItem = (_id: string) => {
    dispatch(removeFromCart(_id));
  };

  const handleUpdateQuantity = (
    _id: string,
    quantity: number,
    removedIndex?: number
  ) => {
    const payload = {
      itemId: _id,
      quantity,
      removedIndex: removedIndex,
    };
    dispatch(updateQuantity(payload));
  };

  const handleEmailChange = (
    courseId: string,
    index: number,
    email: string
  ) => {
    const item = cartItems.find((item) => item._id === courseId);
    if (item) {
      const owners = [...(item.owners || [])];
      owners[index] = email;
      dispatch(updateOwners({ courseId, owners }));
    }
  };

  return (
    <div className="max-w-[928px] ml-auto">
      <div className="flex flex-col mt-12">
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-8 border border-blue-100">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="flex-1 w-full">
              <label
                htmlFor="referral-code"
                className="block text-sm font-medium text-blue-80 mb-2"
              >
                Have a referral code?
              </label>
              <div className="relative">
                <InputField
                  id="referral-code"
                  type="text"
                  placeholder="Enter your code here"
                  required={false}
                  value={codeInput}
                  onChange={handleCodeInputChange}
                />
                {verifiedCode && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <span className="text-green-600 text-sm font-medium">
                      ✓ Applied
                    </span>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2 mt-2 bg-yellow-50 border border-yellow-200 rounded-lg px-3 py-2">
                <BsExclamationCircle className="w-4 h-4 text-yellow-600 flex-shrink-0" />
                <p className="text-sm text-yellow-800 font-medium">
                  Referral codes are case sensitive
                </p>
              </div>
            </div>
            <Button
              onClick={handleApplyCode}
              disabled={verifyStatus === "loading" || !codeInput.trim()}
              isInnerBgWhite={true}
            >
              {verifyStatus === "loading" ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Applying...
                </span>
              ) : (
                "Apply Code"
              )}
            </Button>
          </div>
          {verifiedCode &&
            verifiedCode.codeType === "discount" &&
            verifiedCode.discountValue && (
              <div className="mt-3 text-sm text-blue-600">
                {verifiedCode.discountType === "percentage"
                  ? `${Math.round(
                      verifiedCode.discountValue * 100
                    )}% discount applied`
                  : `${formatNigerianPrice(
                      verifiedCode.discountValue * cartItems.reduce((acc, item) => acc + item.quantity, 0)
                    )} discount applied`}
              </div>
            )}
        </div>

        {cartItems.map((item) => (
          <div key={item._id} className="mb-5">
            <div className="border-b-2 border-blue-80 pb-4 mb-8 flex flex-col w-full">
              <div className="flex justify-between items-center mb-5">
                <p className="text-blue-80 text-4xl">{item.title}</p>
                <Link
                  href={`/courses/${item.slug}`}
                  className="flex items-center gap-2 text-blue-80 hover:text-blue-600 transition-colors group"
                >
                  <span className="text-sm font-medium">View Course</span>
                  <BsArrowUpRight className="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </Link>
              </div>

              <div className="flex md:flex-row flex-col justify-between w-full gap-4">
                <ul className="flex flex-col gap-4 text-blue-80">
                  <li className="flex items-center gap-4">
                    <span className="font-semibold">Duration:</span>
                    <span>{item.duration}</span>
                  </li>
                  <li className="flex items-center gap-4">
                    <span className="font-semibold">Skill Level:</span>
                    <span>{item.skillLevel}</span>
                  </li>
                  <li className="flex items-center gap-4">
                    <span className="font-semibold">Mode of Learning:</span>
                    <span>{item.modeOfLearning}</span>
                  </li>
                  <li className="flex items-center gap-4">
                    <span className="font-semibold">Cohort:</span>
                    <span>{item.cohort.title}</span>
                  </li>
                </ul>
                <div className="flex flex-col w-full max-w-[428px] ml-auto">
                  <InputField
                    id={`owner-email-${item._id}-1`}
                    type="email"
                    placeholder="Owner email"
                    value={item.owners?.[0] || ""}
                    onChange={(e) =>
                      handleEmailChange(item._id, 0, e.target.value)
                    }
                  />
                  {item.quantity > 1 &&
                    Array.from({ length: item.quantity - 1 }).map(
                      (_, index) => (
                        <InputField
                          key={`${item._id}-${index + 2}`}
                          id={`owner-email-${item._id}-${index + 2}`}
                          type="email"
                          placeholder={`Owner ${index + 2} email`}
                          value={item.owners?.[index + 1] || ""}
                          onChange={(e) =>
                            handleEmailChange(
                              item._id,
                              index + 1,
                              e.target.value
                            )
                          }
                        />
                      )
                    )}
                  <p className="text-blue-80 my-4">Slots</p>
                  <div className="flex justify-between w-full">
                    <div className="flex items-center gap-4">
                      <button
                        className="rounded-md border border-blue-80 w-5 h-5 flex items-center justify-center"
                        onClick={() =>
                          handleUpdateQuantity(item._id, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        className="rounded-md border border-blue-80 w-5 h-5 flex items-center justify-center"
                        onClick={() => {
                          if (item.quantity > 1) {
                            handleUpdateQuantity(
                              item._id,
                              item.quantity - 1,
                              item.quantity - 1
                            );
                          }
                        }}
                      >
                        -
                      </button>
                    </div>
                    <button
                      onClick={() => handleRemoveItem(item._id)}
                      className="text-blue-80 flex items-center gap-4"
                    >
                      <span>Remove course</span>
                      <span>
                        <Image
                          src="/redBin.svg"
                          alt="trash"
                          width={18}
                          height={18}
                        />
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-blue-80 ml-auto w-fit text-5xl">
              {formatNigerianPrice(
                calculateDiscountedPrice(item.price.current, item.quantity) *
                  item.quantity
              )}
              {verifiedCode &&
                verifiedCode.codeType === "discount" &&
                verifiedCode.discountValue && (
                  <div className="text-sm text-green-600 mt-1">
                    {verifiedCode.discountType === "percentage"
                      ? `${Math.round(verifiedCode.discountValue * 100)}% off`
                      : `${formatNigerianPrice(
                          verifiedCode.discountValue * item.quantity
                        )} off`}
                  </div>
                )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
