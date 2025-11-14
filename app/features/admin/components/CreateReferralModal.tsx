"use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createReferralCode, getReferralCodes } from "../slice/referralSlice";
import { Button } from "@/app/components";
import { selectCreateStatus, selectCreateError } from "../slice/referralSlice";

interface CreateReferralModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  codeName: string;
  codeType: "referral" | "discount";
  discountType: "fixed" | "percentage" | "";
  discountValue: string;
  referralPrice: string;
  description: string;
  expiryDate: string;
  usageLimit: string;
}

export default function CreateReferralModal({
  isOpen,
  onClose,
}: CreateReferralModalProps) {
  const dispatch = useDispatch();
  const status = useSelector(selectCreateStatus);
  const error = useSelector(selectCreateError);
  const [isRendered, setIsRendered] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    codeName: "",
    codeType: "discount",
    discountType: "",
    discountValue: "",
    referralPrice: "",
    description: "",
    expiryDate: "",
    usageLimit: "",
  });
  const [descriptionTouched, setDescriptionTouched] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsRendered(true);
    } else {
      const timer = setTimeout(() => setIsRendered(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    if (status === "succeeded") {
      resetForm();
      onClose();
      dispatch(getReferralCodes() as any);
    }
  }, [status, dispatch]);

  const resetForm = () => {
    setFormData({
      codeName: "",
      codeType: "discount",
      discountType: "",
      discountValue: "",
      referralPrice: "",
      description: "",
      expiryDate: "",
      usageLimit: "",
    });
    setDescriptionTouched(false);
  };

  const minDescriptionLength = 10;
  const descriptionTooShort =
    formData.description.length < minDescriptionLength;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Base data that's common to both types
    const baseData = {
      codeName: formData.codeName,
      codeType: formData.codeType,
      description: formData.description,
      expiryDate: formData.expiryDate,
      usageLimit: Number(formData.usageLimit),
    };

    // Prepare data based on code type
    const dataToSend =
      formData.codeType === "referral"
        ? {
            ...baseData,
            referralPrice: Number(formData.referralPrice),
          }
        : {
            ...baseData,
            discountType: formData.discountType as "fixed" | "percentage",
            discountValue:
              formData.discountType === "percentage"
                ? Number(formData.discountValue) / 100
                : Number(formData.discountValue),
          };

    await dispatch(createReferralCode(dataToSend) as any);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (!isRendered) return null;

  return (
    <div
      data-lenis-prevent
      className={`fixed inset-0 bg-black bg-opacity-50 flex justify-end items-stretch z-[5000] transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0"
      }`}
      onClick={onClose}
    >
      <div
        className={`bg-white p-8 w-full max-w-md h-full overflow-y-auto transition-all duration-300 transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-4">Create Referral Code</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="codeName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Code Name
            </label>
            <input
              id="codeName"
              type="text"
              name="codeName"
              value={formData.codeName}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
              placeholder="Enter code name"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="codeType"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Code Type
            </label>
            <select
              id="codeType"
              name="codeType"
              value={formData.codeType}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            >
              <option value="discount">Discount Code</option>
              <option value="referral">Referral Code</option>
            </select>
          </div>

          {formData.codeType === "discount" && (
            <>
              <div className="mb-4">
                <label
                  htmlFor="discountType"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Discount Type
                </label>
                <select
                  id="discountType"
                  name="discountType"
                  value={formData.discountType}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                >
                  <option value="">Select discount type</option>
                  <option value="fixed">Fixed Amount</option>
                  <option value="percentage">Percentage</option>
                </select>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="discountValue"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Discount Value
                </label>
                {formData.discountType === "percentage" ? (
                  <input
                    id="discountValue"
                    type="number"
                    name="discountValue"
                    value={formData.discountValue}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    min={1}
                    max={100}
                    required
                    placeholder="Enter percentage (e.g., 10 for 10%)"
                  />
                ) : (
                  <input
                    id="discountValue"
                    type="number"
                    name="discountValue"
                    value={formData.discountValue}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                    placeholder="Enter discount value"
                  />
                )}
              </div>
            </>
          )}

          {formData.codeType === "referral" && (
            <div className="mb-4">
              <label
                htmlFor="referralPrice"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Referral Price
              </label>
              <input
                id="referralPrice"
                type="number"
                name="referralPrice"
                value={formData.referralPrice}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required={formData.codeType === "referral"}
                min="0"
                step="0.01"
                placeholder="Enter referral price"
              />
            </div>
          )}

          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              onBlur={() => setDescriptionTouched(true)}
              className="w-full p-2 border rounded"
              required
            />
            <div className="text-xs text-gray-500 mt-1 flex justify-between">
              <span>{formData.description.length} characters</span>
              {descriptionTouched && descriptionTooShort && (
                <span className="text-red-500">Description is too short</span>
              )}
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="expiryDate"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Expiry Date
            </label>
            <input
              id="expiryDate"
              type="date"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="usageLimit"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Usage Limit
            </label>
            <input
              id="usageLimit"
              type="number"
              name="usageLimit"
              value={formData.usageLimit}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
              placeholder="Enter usage limit"
            />
          </div>

          <div className="flex justify-end gap-4">
            <Button
              onClick={onClose}
              type="button"
              disabled={status === "loading"}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={
                status === "loading" ||
                (descriptionTouched && descriptionTooShort)
              }
            >
              {status === "loading" ? "Creating..." : "Create Code"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
