import { xContentTypeOptions } from "helmet";
import { z } from "zod";

const baseSchema = {
  codeName: z
    .string({ required_error: "Code name is required" })
    .min(2, "Code name is too short")
    .max(50, "Code name is longer than expected"),
  codeType: z.enum(["referral", "discount"], {
    errorMap: () => ({
      message: 'Code type must be either "referral" or "discount".',
    }),
  }),
  expiryDate: z
    .string({ required_error: "Expiry date is required" })
    .date("Invalid date format"),
  usageLimit: z
    .number({ required_error: "Usage limit is required" })
    .int("Usage limit must be a whole number")
    .positive({ message: "Usage limit should be a positive integer" }),
  description: z
    .string({ required_error: "Description is required" })
    .min(10, "Description is too short")
    .max(250, "Description has exceeded the limit"),
};

const referralSchema = z.object({
  ...baseSchema,
  codeType: z.literal("referral"),
  referralPrice: z
    .number({ required_error: "Referral price is required for referral codes" })
    .positive({ message: "Referral price must be greater than 0" }),
  discountType: z.never().optional(),
  discountValue: z.never().optional(),
});

const discountSchema = z.object({
  ...baseSchema,
  codeType: z.literal("discount"),
  discountType: z.enum(["fixed", "percentage"], {
    errorMap: () => ({
      message: 'Discount type must be either "percentage" or "fixed".',
    }),
  }),
  discountValue: z
    .number({ required_error: "Discount value is required for discount codes" })
    .positive({ message: "Discount value must be greater than 0" }),
  referralPrice: z.never().optional(),
});

export const validatereferral = z.discriminatedUnion("codeType", [
  referralSchema,
  discountSchema,
]);

export const userValidation = z.object({
  codeName: z.string({ required_error: "Code name is required" }),
  customerName: z.string({ required_error: "Customer name is required" }),
});

export type referralInput = z.infer<typeof validatereferral>;
