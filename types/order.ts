interface OrdersResponse {
  success: boolean;
  data?: {
    orders: Array<Order>;
    pagination: {
      total: number;
      page: number;
      limit: number;
      pages: number;
    };
  };
  message?: string;
  error?: string;
}

interface Order {
  _id: string;
  orderId: string;
  customerName: string;
  customerEmail: string;
  totalAmount: number;
  status: "pending" | "success" | "failed";
  paymentReference: string;
  paymentProvider: "paystack";
  items: Array<{
    courseId: string;
    courseTitle: string;
    quantity: number;
    pricePerUnit: number;
    owners: string[];
    cohortId: string;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

interface Pagination {
  total: number;
  page: number;
  limit: number;
  pages: number;
}
