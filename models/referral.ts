import mongoose, { Schema, Document, model, models, ObjectId } from "mongoose";

export interface IReferral extends Document {
  codeName: string;
  codeType: "referral" | "discount";
  discountType?: "fixed" | "percentage";
  discountValue?: number;
  referralPrice?: number;
  expiryDate: Date;
  usageLimit: number;
  description: string;
  usageCount: number;
  usageHistory: [{
    customerName: string;
    orderId: string;
    courses: [{
      courseId: ObjectId;
      courseTitle: string;
      quantity: number;
    }];
    usedAt: Date;
    totalQuantity: number;
  }];
}

export const referralSchema = new Schema(
  {
    codeName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
    codeType: {
      type: String,
      enum: ["referral", "discount"],
      required: true,
    },
    discountType: {
      type: String,
      enum: ["percentage", "fixed"],
      required: function (this: { codeType: string }) {
        return this.codeType === "discount";
      },
    },
    discountValue: {
      type: Number,
      required: function (this: { codeType: string }) {
        return this.codeType === "discount";
      },
      validate: {
        validator: function (
          this: { codeType: string; discountType: string },
          value: number
        ) {
          if (this.codeType === "discount") {
            if (this.discountType === "percentage") {
              return value > 0 && value <= 1;
            }
            return value > 0;
          }
          return true;
        },
        message: "Invalid discount value for the given discount type",
      },
    },
    referralPrice: {
      type: Number,
      required: function (this: { codeType: string }) {
        return this.codeType === "referral";
      },
      min: [0, "Referral price cannot be negative"],
    },
    expiryDate: {
      type: Date,
      required: true,
    },
    usageLimit: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
    },
    usageCount: {
      type: Number,
      default: 0,
    },
    usageHistory: [
      {
        customerName: {
          type: String,
          required: true,
        },
        orderId: {
          type: String,
          required: true,
        },
        courses: [
          {
            courseId: { 
              type: mongoose.Schema.Types.ObjectId, 
              ref: "Course",
              required: true 
            },
            courseTitle: { 
              type: String, 
              required: true 
            },
            quantity: { 
              type: Number, 
              required: true, 
              min: 1 
            }
          }
        ],
        usedAt: { 
          type: Date, 
          default: Date.now 
        },
        totalQuantity: { 
          type: Number, 
          required: true, 
          min: 1 
        }
      },
    ],
  },
  { timestamps: true }
);

// Add compound index for codeName and codeType
referralSchema.index({ codeName: 1, codeType: 1 }, { unique: true });

export const referral =
  models.Referral || model<IReferral>("Referral", referralSchema);
