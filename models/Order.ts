import mongoose, { Schema, Types, CallbackError } from "mongoose";
import Cohort, { ICohort } from "@/models/Cohort"; // Ensure Cohort model is imported

const OrderSchema = new Schema(
  {
    orderId: { type: String, required: true, unique: true },
    customerName: { type: String, required: true },
    customerEmail: { type: String, required: true },
    totalAmount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "success", "failed"],
      default: "pending",
    },
    paymentReference: { type: String, required: true, unique: true },
    paymentProvider: {
      type: String,
      enum: ["paystack"],
      required: true,
    },
    referralCode: {
      id: { type: Types.ObjectId, ref: "Referral" },
      name: { type: String },
    },
    items: [
      {
        courseId: { type: Types.ObjectId, ref: "Course", required: true },
        courseTitle: { type: String, required: true },
        quantity: { type: Number, required: true },
        pricePerUnit: { type: Number, required: true },
        owners: [{ type: String, required: true }],
        cohortId: { type: Types.ObjectId, ref: "Cohort", required: true },
      },
    ],
  },
  { timestamps: true }
); // This replaces both createdAt and updatedAt fields and handling

// Middleware to check and update cohort's student count
OrderSchema.pre("save", async function (next) {
  try {
    if (!this.items?.length) {
      return next(new Error("Order must contain at least one item"));
    }

    for (const item of this.items) {
      const cohort: ICohort | null = await Cohort.findById(item.cohortId);
      if (!cohort) {
        return next(
          new Error(`Invalid cohort specified for ${item.courseTitle}`)
        );
      }

      const now = new Date();
      if (cohort.endDate < now) {
        return next(
          new Error(
            `Cohort for ${item.courseTitle} is no longer available for enrollment`
          )
        );
      }

      const cohortCourse = cohort.courses.find(
        (c) => c.courseId.toString() === item.courseId.toString()
      );

      if (!cohortCourse) {
        return next(
          new Error(
            `Course ${item.courseTitle} is not available in selected cohort`
          )
        );
      }

      // Check available slots
      if (cohortCourse.availableSlots < item.owners.length) {
        return next(
          new Error(`Not enough slots available for ${item.courseTitle}`)
        );
      }

      // Update enrolled students and available slots
      cohortCourse.enrolledStudents.push(...item.owners);
      cohortCourse.availableSlots -= item.owners.length;

      // Update total enrolled students for this cohort
      cohort.enrolledStudents = cohort.courses.reduce(
        (total: number, course) => total + course.enrolledStudents.length,
        0
      );

      await cohort.save();
    }

    return next();
  } catch (error) {
    return next(error as CallbackError);
  }
});

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
