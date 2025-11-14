import { Course } from "@/app/features/courses/slice/courseSlice";

export interface CohortCourse {
  courseId: string;
  availableSlots: number;
}
interface CartCohort {
  _id: string;
  title: string;
  description: string;
  courses?: CohortCourse[];
}
export interface CartItem extends Course {
  quantity: number;
  owners: string[];
  cohort: CartCohort;
}

export interface OrderRequest {
  customerName: string;
  customerEmail: string;
  totalAmount: number;
  items: CartItem[];
  referralCode?: string | null;
}

export interface OrderResponse {
  success: boolean;
  data?: {
    orderId: string;
    customerName: string;
    customerEmail: string;
    totalAmount: number;
    status: "pending" | "completed" | "failed";
    items: Array<{
      courseId: string;
      courseTitle: string;
      quantity: number;
      pricePerUnit: number;
      owners: string[];
    }>;
    createdAt: string;
  };
  message?: string;
}

export interface PaystackResponse {
  reference: string;
  trans: string;
  status: string;
  message: string;
  transaction: string;
  trxref: string;
}
