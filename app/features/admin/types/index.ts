export type AdminView =
  | "home"
  | "orders"
  | "courses"
  | "order-detail"
  | "cohort-members"
  | "cohort"
  | "referral";

export interface OrderDetailProps {
  orderId: string;
  onBack: () => void;
}

export interface CohortMembersProps {
  courseId: string;
  onBack: () => void;
}