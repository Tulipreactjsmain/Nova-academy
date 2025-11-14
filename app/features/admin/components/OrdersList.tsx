import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  fetchOrders,
  selectOrders,
  selectPagination,
  selectStatus,
  selectError,
} from "../slice/orderSlice";
import { formatNigerianPrice } from "@/app/utils/formatPrice";
import LoadingOrderList from "./LoadingList";
import { AdminView } from "@/app/features/admin/types";
import formatDate from "@/app/utils/formatDate";

interface OrdersListProps {
  setCurrentView: (view: AdminView) => void;
  setSelectedOrderId: (id: string) => void;
}

const OrdersList = ({
  setCurrentView,
  setSelectedOrderId,
}: OrdersListProps) => {
  const dispatch = useAppDispatch();
  const orders = useAppSelector(selectOrders);
  const pagination = useAppSelector(selectPagination);
  const status = useAppSelector(selectStatus);
  const error = useAppSelector(selectError);

  useEffect(() => {
    dispatch(fetchOrders({}));
  }, [dispatch]);

  if (status === "loading") {
    return <LoadingOrderList />;
  }

  if (status === "failed") {
    return (
      <div className="bg-red-50 text-red-500 p-4 rounded-lg">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="space-y-6 mb-8">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl shadow-sm">
          <h3 className="text-blue-80 text-sm font-medium">Total Orders</h3>
          <p className="text-2xl font-bold text-blue-80 mt-2">
            {pagination.total}
          </p>
        </div>
        <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-xl shadow-sm">
          <h3 className="text-green-800 text-sm font-medium">
            Completed Orders
          </h3>
          <p className="text-2xl font-bold text-green-800 mt-2">
            {orders.filter((order) => order.status === "success").length}
          </p>
        </div>
        <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-6 rounded-xl shadow-sm">
          <h3 className="text-yellow-800 text-sm font-medium">
            Pending Orders
          </h3>
          <p className="text-2xl font-bold text-yellow-800 mt-2">
            {orders.filter((order) => order.status === "pending").length}
          </p>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-blue-80">Recent Orders</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-blue-80">
                  Order ID
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-blue-80">
                  Customer
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-blue-80">
                  Date
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-blue-80">
                  Total
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-blue-80">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {orders.map((order) => (
                <tr
                  key={order._id}
                  className="hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => {
                    setSelectedOrderId(order._id);
                    setCurrentView("order-detail");
                  }}
                >
                  <td className="px-6 py-4 text-sm text-gray-600">
                    #{order.orderId}
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-blue-80">
                        {order.customerName}
                      </div>
                      <div className="text-sm text-gray-500">
                        {order.customerEmail}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    <span className="text-gray-500">
                      {formatDate(typeof order.createdAt === 'string' ? order.createdAt : order.createdAt.toISOString())}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {formatNigerianPrice(order.totalAmount)}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Showing page {pagination.page} of {pagination.pages}
          </p>
          <div className="space-x-2">
            <button
              onClick={() =>
                dispatch(fetchOrders({ page: pagination.page - 1 }))
              }
              disabled={pagination.page === 1}
              className="px-4 py-2 text-sm font-medium text-blue-80 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              onClick={() =>
                dispatch(fetchOrders({ page: pagination.page + 1 }))
              }
              disabled={pagination.page === pagination.pages}
              className="px-4 py-2 text-sm font-medium text-blue-80 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersList;
