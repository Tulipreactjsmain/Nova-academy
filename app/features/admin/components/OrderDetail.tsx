import React from "react";
import { useAppSelector } from "@/lib/hooks";
import { selectOrders } from "../slice/orderSlice";
import { formatNigerianPrice } from "@/app/utils/formatPrice";
import { Button } from "@/app/components";
import { OrderDetailProps } from "@/app/features/admin/types";

export default function OrderDetail({ orderId, onBack }: OrderDetailProps) {
  const orders = useAppSelector(selectOrders);
  const order = orders.find((o) => o._id === orderId);

  if (!order) {
    return (
      <div className="text-center">
        <p className="text-red-500">Order not found</p>
        <Button onClick={onBack} isInnerBgWhite={true} innerBtnClassName="mt-4">
          Back to Orders
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-blue-80">
          Order #{order.orderId}
        </h2>
        <Button onClick={onBack} isInnerBgWhite={true}>
          Back to Orders
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Order Info */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-medium text-blue-80 mb-4">
            Order Information
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Status</span>
              <span
                className={`px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                ${
                  order.status === "success"
                    ? "bg-green-100 text-green-800"
                    : order.status === "failed"
                    ? "bg-red-100 text-red-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {order.status}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Order ID</span>
              <span>{order.orderId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Payment Reference</span>
              <span>{order.paymentReference}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Payment Provider</span>
              <span>{order.paymentProvider}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Date</span>
              <span>{new Date(order.createdAt).toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total Amount</span>
              <span className="font-medium">
                {formatNigerianPrice(order.totalAmount)}
              </span>
            </div>
          </div>
        </div>

        {/* Customer Info */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-medium text-blue-80 mb-4">
            Customer Information
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Name</span>
              <span>{order.customerName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Email</span>
              <span>{order.customerEmail}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Order Items */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-medium text-blue-80">Order Items</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-blue-80">
                  Course
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-blue-80">
                  Quantity
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-blue-80">
                  Price
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-blue-80">
                  Cohort ID
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-blue-80">
                  Owners
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {order.items.map((item) => (
                <tr key={item.courseId}>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {item.courseTitle}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {item.quantity}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {formatNigerianPrice(item.pricePerUnit)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {item.cohortId.toString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {item.owners.join(", ")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
