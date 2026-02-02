import React, { useEffect, useState } from "react";
import { listUserCart, saveAddress } from "../../api/user";
import useEcomStore from "../../store/ecom-store";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FormatsNumber } from "../../utils/formatsnumber";

const SummaryCard = () => {
  const token = useEcomStore((state) => state.token);
  const [products, setProducts] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [address, setAddress] = useState("");
  const [addressSaved, setAddSaved] = useState(false);

  const navigate = useNavigate();

  const handleGetUserCart = (token) => {
    listUserCart(token)
      .then((res) => {
        setProducts(res.data.products);
        setCartTotal(res.data.cartTotal);
      })
      .catch((err) => console.log(err));
  };

  const handleSaveAddress = () => {
    if (!address) return toast.warning("Please fill in your address");
    saveAddress(token, address)
      .then((res) => {
        toast.success(res.data.message);
        setAddSaved(true);
      })
      .catch((err) => console.log(err));
  };

  const handleConfirmPayment = () => {
    if (!addressSaved) return toast.warning("Please confirm your address");
    navigate("/user/payment");
  };

  useEffect(() => {
    if (token) handleGetUserCart(token);
  }, [token]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-100 flex justify-center items-start py-16 px-6">
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Address Section */}
        <div className="bg-white rounded-2xl p-8 shadow-md border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Shipping Address
          </h2>

          <textarea
            onChange={(e) => setAddress(e.target.value)}
            placeholder="1/12 Makhanakorn St, Bangkok, Thailand"
            className="w-full h-32 p-4 text-gray-700 placeholder-gray-400 rounded-xl border border-gray-200 
                       focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-transparent transition resize-none"
          />

          <button
            onClick={handleSaveAddress}
            className="mt-5 w-full py-3 rounded-xl font-semibold text-white 
                       bg-gradient-to-r from-sky-400 via-blue-400 to-sky-500 
                       hover:from-sky-500 hover:to-blue-600 
                       shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
          >
            Confirm Address
          </button>
        </div>

        {/* Summary Section */}
        <div className="bg-white rounded-2xl p-8 shadow-md border border-gray-100 flex flex-col justify-between">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Order Summary
          </h2>

          <div className="space-y-4 mb-6">
            {products?.length > 0 ? (
              products.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center border-b border-gray-100 pb-2"
                >
                  <div>
                    <p className="text-gray-800 font-medium">
                      {item.product.title}
                    </p>
                    <p className="text-gray-400 text-sm mt-1">
                      Qty: {item.count} × ฿{FormatsNumber(item.product.price)}
                    </p>
                  </div>
                  <p className="text-gray-900 font-semibold">
                    ฿{FormatsNumber(item.count * item.product.price)}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-400 text-center py-6">
                No items in your cart
              </p>
            )}
          </div>

          <div className="space-y-2 text-gray-600 text-sm">
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>฿0.00</span>
            </div>
            <div className="flex justify-between">
              <span>Discount</span>
              <span>฿0.00</span>
            </div>
            <hr className="my-3 border-gray-200" />
            <div className="flex justify-between font-semibold text-gray-800 text-base">
              <span>Total</span>
              <span className="text-blue-600">฿{FormatsNumber(cartTotal)}</span>
            </div>
          </div>

          <button
            onClick={handleConfirmPayment}
            className="mt-8 w-full py-3.5 rounded-xl font-semibold text-white 
                       bg-gradient-to-r from-teal-400 via-sky-400 to-blue-500 
                       hover:from-sky-500 hover:to-blue-600 
                       shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
          >
            Make a Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;
