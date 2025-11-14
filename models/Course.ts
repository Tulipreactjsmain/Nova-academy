import mongoose, { Document, Schema, model, models } from "mongoose";

export interface ICourse extends Document {
  title: string;
  description: string;
  learningOutcomes: string[];
  duration: string;
  modeOfLearning: string;
  skillLevel: string;
  requirements: string;
  instructors?: string;
  price: {
    current: number;
    original?: number;
  };
  image: string;
  slug: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Create the Course schema using the interface
const courseSchema: Schema<ICourse> = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    learningOutcomes: [
      {
        type: String,
        required: true,
      },
    ],
    duration: {
      type: String,
      required: true,
    },
    modeOfLearning: {
      type: String,
      required: true,
    },
    skillLevel: {
      type: String,
      required: true,
    },
    requirements: {
      type: String,
      required: true,
    },
    instructors: {
      type: String,
      default: "To be announced",
    },
    price: {
      current: {
        type: Number,
        required: true,
      },
      original: {
        type: Number,
      },
    },
    image: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

// Export the Course model with TypeScript types
const Course = models.Course || model<ICourse>("Course", courseSchema);

export default Course;
