import React, { useState, useEffect } from "react";
import { listOrder } from "../../api/user";
import useEcomStore from "../../store/ecom-store";
import { DateFormat } from "../../utils/FormatDate";
import { FormatsNumber } from "../../utils/formatsnumber";
import { motion } from "motion/react";

const HistoryCard = () => {
  const token = useEcomStore((state) => state.token);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (token) fetchOrders(token);
  }, [token]);

  const fetchOrders = async (token) => {
    try {
      const res = await listOrder(token);
      setOrders(res.data.orders);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-blue-100 py-20 px-6 flex flex-col items-center">
      
      {/* Page Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-500 to-blue-600 drop-shadow-sm tracking-tight">
          Your Orders
        </h1>
        <p className="mt-3 text-gray-500 text-lg font-light">
          View your recent purchases and their delivery status
        </p>
        <div className="mt-4 h-1 w-20 mx-auto bg-gradient-to-r from-blue-300 to-blue-500 rounded-full shadow-sm"></div>
      </motion.div>

      <div className="w-full max-w-5xl space-y-10">
        {orders.length === 0 ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-gray-500 text-center text-lg font-medium mt-20"
          >
            No orders found yet.
          </motion.p>
        ) : (
          orders.map((order, index) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative rounded-3xl overflow-hidden border border-blue-100 shadow-lg hover:shadow-2xl 
                         backdrop-blur-xl bg-white/70 transition-all duration-500"
            >
              {/* Header */}
              <div className="relative z-10 p-6 flex flex-col md:flex-row md:justify-between md:items-center bg-gradient-to-r from-blue-50 to-sky-100 border-b border-blue-100">
                <div>
                  <h3 className="text-xl font-semibold text-blue-700">
                    Order #{order.id}
                  </h3>
                  <p className="text-gray-500 text-sm mt-1">
                    {DateFormat(order.updatedAt)}
                  </p>
                </div>

                <div className="mt-3 md:mt-0">
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-semibold shadow-sm ${
                      order.orderStatus === "delivered"
                        ? "bg-green-100 text-green-700"
                        : order.orderStatus === "processing"
                        ? "bg-blue-100 text-blue-700"
                        : order.orderStatus === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {order.orderStatus.charAt(0).toUpperCase() +
                      order.orderStatus.slice(1)}
                  </span>
                </div>
              </div>

              {/* Product Table */}
              <div className="relative z-10 p-6">
                <div className="grid grid-cols-4 font-semibold text-gray-600 border-b pb-2 mb-3">
                  <span>Product</span>
                  <span className="text-center">Price</span>
                  <span className="text-center">Qty</span>
                  <span className="text-right">Total</span>
                </div>

                {order.products.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    className="grid grid-cols-4 items-center py-3 border-b last:border-none hover:bg-blue-50/40 rounded-lg transition-all"
                  >
                    <span className="font-medium text-gray-700 truncate">
                      {item.product.title}
                    </span>
                    <span className="text-center text-gray-600">
                      {FormatsNumber(item.price)} ฿
                    </span>
                    <span className="text-center text-gray-600">
                      {item.count}
                    </span>
                    <span className="text-right font-semibold text-blue-700">
                      {FormatsNumber(item.price * item.count)} ฿
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Footer */}
              <div className="relative z-10 flex justify-end p-6 bg-gradient-to-r from-sky-50 to-blue-100 border-t border-blue-100">
                <div className="text-right">
                  <p className="text-sm text-gray-500 font-medium">
                    Total Amount
                  </p>
                  <p className="text-2xl font-bold text-blue-800">
                    {FormatsNumber(order.cartTotal)} ฿
                  </p>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default HistoryCard;
