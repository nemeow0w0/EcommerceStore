import React, { useEffect, useState } from "react";
import { listOrderAdmin, changeOrderStatus } from "../../api/admin";
import { Truck, CheckCircle2, Clock, XCircle } from "lucide-react";
import useEcomStore from "../../store/ecom-store";
import { toast } from "react-toastify";
import { FormatsNumber } from "../../utils/formatsnumber";
import { DateFormat } from "../../utils/FormatDate";

const TableOrders = () => {
  const token = useEcomStore((state) => state.token);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    handleListOrder(token);
  }, []);

  const handleListOrder = (token) => {
    listOrderAdmin(token)
      .then((res) => setOrders(res.data))
      .catch((err) => console.log(err));
  };

  const handleChangeOrderStatus = (token, orderId, orderStatus) => {
    changeOrderStatus(token, orderId, orderStatus)
      .then((res) => {
        //console.log("✅ Status updated:", res.data);
        handleListOrder(token);
        toast.success("update status success");
      })
      .catch((err) => {
        console.error("❌ Failed to change status:", err);
      });
  };

  const getStatusStyle = (orderStatus) => {
    switch (orderStatus?.toLowerCase()) {
      case "pending":
        return {
          label: "Pending",
          color: "bg-yellow-100 text-yellow-800",
          icon: <Clock size={14} />,
        };
      case "processing":
        return {
          label: "Processing",
          color: "bg-blue-100 text-blue-800",
          icon: <Truck size={14} />,
        };
      case "delivered":
        return {
          label: "Delivered",
          color: "bg-green-100 text-green-800",
          icon: <CheckCircle2 size={14} />,
        };
      case "canceled":
        return {
          label: "Canceled",
          color: "bg-red-100 text-red-800",
          icon: <XCircle size={14} />,
        };
      default:
        return {
          label: orderStatus || "Unknown",
          color: "bg-gray-100 text-gray-600",
          icon: <Clock size={14} />,
        };
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-8">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">
            📦 Orders Management
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Manage all customer orders in the system
          </p>
        </div>
        <button className="px-4 py-2 text-sm bg-black text-white rounded-lg hover:bg-gray-800 transition">
          + Add Order
        </button>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-100 shadow-sm rounded-xl overflow-hidden">
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-gray-200 text-gray-600 uppercase text-xs tracking-wide border-b">
            <tr>
              <th className="py-3 px-4 text-left font-medium">Order ID</th>
              <th className="py-3 px-4 text-left font-medium">Customer</th>
              <th className="py-3 px-4 text-left font-medium">Date</th>
              <th className="py-3 px-4 text-left font-medium">Products</th>
              <th className="py-3 px-4 text-left font-medium">Total</th>
              <th className="py-3 px-4 text-left font-medium">Status</th>
              <th className="py-3 px-4 text-center font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((o) => {
              const status = getStatusStyle(o.orderStatus);
              return (
                <tr
                  key={o.id}
                  className="hover:bg-gray-50 border-b last:border-none transition"
                >
                  <td className="py-4 px-4 font-medium text-gray-800">
                    {o.id}
                  </td>
                  <td className="py-4 px-4">
                    <p className="font-medium">
                      {o.orderedBy?.email || "No email"}
                    </p>
                    <p className="text-gray-500 text-sm">
                      {o.orderedBy?.address || "—"}
                    </p>
                  </td>
                  <td>
                    {DateFormat(o.createdAt)}
                  </td>

                  {/* Products */}
                  <td className="py-4 px-4">
                    <div className="flex flex-col gap-1">
                      {o.products?.map((p, indx) => (
                        <div
                          key={indx}
                          className="flex justify-between items-center px-2 py-1 rounded hover:bg-gray-100 transition"
                        >
                          <span className="font-medium text-gray-800">
                            {p.product.title}
                          </span>
                          <span className="text-gray-700 font-medium">
                            {p.count} × {FormatsNumber(p.price)} ฿
                          </span>
                        </div>
                      ))}
                    </div>
                  </td>

                  {/* Total */}
                  <td className="py-4 px-4 font-medium text-gray-800">
                    {FormatsNumber(o.cartTotal)} ฿
                  </td>

                  {/* Status */}
                  <td className="py-4 px-4">
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold ${status.color}`}
                    >
                      {status.icon} {status.label}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-4 text-center">
                    <div className="flex justify-center">
                      <select
                        value={o.orderStatus}
                        onChange={(e) =>
                          handleChangeOrderStatus(token, o.id, e.target.value)
                        }
                        className="
        border border-gray-300 bg-white text-gray-700
        rounded-md px-3 py-1.5 text-sm font-medium
        shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400/40 focus:border-blue-400
        hover:border-gray-400 transition-all duration-150
      "
                      >
                        <option value="pending">🕓 Pending</option>
                        <option value="processing">🚚 Processing</option>
                        <option value="delivered">✅ Delivered</option>
                        <option value="canceled">❌ Canceled</option>
                      </select>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableOrders;
