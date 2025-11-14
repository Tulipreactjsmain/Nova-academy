import mongoose, { Schema, Document } from "mongoose";
import Course from "./Course";

export interface ICohort extends Document {
  name: string; // Shared cohort name (e.g., "Spring Cohort 2025")
  description?: string;
  startDate: Date;
  endDate: Date;
  nextStartDate?: Date;
  status: "active" | "completed" | "upcoming";
  instructors?: string[];
  enrolledStudents: number; // Total enrolled students across all courses
  courses: {
    courseId: mongoose.Schema.Types.ObjectId;
    // Store essential course info directly in cohort
    courseTitle: string;
    courseDescription: string;
    courseDuration: string;
    courseSkillLevel: string;
    coursePrice: {
      current: number;
      original?: number;
    };
    // Cohort-specific info
    enrolledStudents: string[];
    maxSlots: number;
    availableSlots: number;
  }[];
}

const cohortSchema = new Schema<ICohort>(
  {
    name: {
      type: String,
      required: [true, "Cohort name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters long"],
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [1000, "Description cannot exceed 1000 characters"],
    },
    startDate: {
      type: Date,
      required: [true, "Start date is required"],
      validate: {
        validator: function (value: Date) {
          return value >= new Date();
        },
        message: "Start date must be in the future",
      },
    },
    endDate: {
      type: Date,
      validate: {
        validator: function (this: ICohort, value: Date) {
          return !value || value > this.startDate;
        },
        message: "End date must be after start date",
      },
    },
    nextStartDate: {
      type: Date,
      validate: {
        validator: function (this: ICohort, value: Date) {
          return !value || value > this.startDate;
        },
        message: "Next start date must be after current start date",
      },
    },
    status: {
      type: String,
      enum: ["active", "completed", "upcoming"],
      default: "upcoming",
    },
    instructors: {
      type: [String],
      default: ["TBA"],
      validate: {
        validator: function (v: string[]) {
          return v.length > 0;
        },
        message: "At least one instructor is required",
      },
    },
    enrolledStudents: {
      type: Number,
      default: 0,
      min: 0,
    },
    courses: {
      type: [
        {
          courseId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
            required: true,
          },
          courseTitle: {
            type: String,
            required: true,
          },
          courseDescription: {
            type: String,
            required: true,
          },
          courseDuration: {
            type: String,
            required: true,
          },
          courseSkillLevel: {
            type: String,
            required: true,
          },
          coursePrice: {
            current: {
              type: Number,
              required: true,
            },
            original: Number,
          },
          maxSlots: {
            type: Number,
            required: [true, "Maximum slots is required"],
            min: [1, "Minimum slots must be at least 1"],
          },
          availableSlots: {
            type: Number,
            min: 0,
          },
          enrolledStudents: [
            {
              type: String,
              validate: {
                validator: function (email: string) {
                  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
                },
                message: "Invalid email format",
              },
            },
          ],
        },
      ],
      required: true,
      validate: {
        validator: function (courses: any[]) {
          return courses.length > 0;
        },
        message: "At least one course is required",
      },
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes for efficient querying
cohortSchema.index({ name: 1, status: 1 });
cohortSchema.index({ startDate: 1 });

// middleware to automatically update status based on dates
cohortSchema.pre("save", async function (next) {
  const now = new Date();
  const startOfToday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  );
  const startOfCohort = new Date(
    this.startDate.getFullYear(),
    this.startDate.getMonth(),
    this.startDate.getDate()
  );

  if (startOfCohort > startOfToday) {
    this.status = "upcoming";
  } else if (startOfCohort <= startOfToday && this.endDate >= now) {
    this.status = "active";
  } else if (this.endDate < now) {
    this.status = "completed";
  }

  if (this.isNew || this.isModified("courses")) {
    for (const course of this.courses) {
      if (!course.courseTitle) {
        // Only fetch if info not already stored
        try {
          const courseDoc = await Course.findById(course.courseId);
          if (courseDoc) {
            course.courseTitle = courseDoc.title;
            course.courseDescription = courseDoc.description;
            course.courseDuration = courseDoc.duration;
            course.courseSkillLevel = courseDoc.skillLevel;
            course.coursePrice = courseDoc.price;
          }
        } catch (error) {
          console.error(
            `Failed to fetch course info for ${course.courseId}:`,
            error
          );
        }
      }
    }
  }

  if (this.isNew) {
    this.courses.forEach((course) => {
      if (!course.availableSlots) {
        course.availableSlots = course.maxSlots;
      }
    });
  }

  next();
});

const Cohort =
  mongoose.models.Cohort || mongoose.model<ICohort>("Cohort", cohortSchema);

export default Cohort;
