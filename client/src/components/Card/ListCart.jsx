import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useEcomStore from "../../store/ecom-store";
import { createUserCart } from "../../api/user";
import { toast } from "react-toastify";
import { FormatsNumber } from "../../utils/formatsnumber";
import { ShoppingBag } from "lucide-react";

const ListCart = () => {
  const cart = useEcomStore((state) => state.carts);
  const user = useEcomStore((state) => state.user);
  const token = useEcomStore((state) => state.token);
  const getTotalPrice = useEcomStore((state) => state.actionGetTotalPrice);
  const navigate = useNavigate();

  const handleSaveCart = async () => {
    await createUserCart(token, { cart })
      .then((res) => {
        toast.success("🛒 Items saved to cart successfully!", {
          position: "top-center",
        });
        navigate("/checkout");
      })
      .catch((err) => {
        toast.warning(err.response?.data?.message || "Something went wrong");
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-white py-10">
      <div className="max-w-3xl mx-auto bg-white/70 backdrop-blur-md rounded-2xl shadow-lg border border-blue-100 p-6 space-y-6 transition-all duration-500 hover:shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-4">
          <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-2">
            <ShoppingBag className="text-blue-500" size={26} />
            Your Cart
          </h1>
          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium shadow-sm">
            {cart.length} items
          </span>
        </div>

        {/* Empty Cart */}
        {cart.length === 0 ? (
          <div className="text-center text-gray-400 py-16">
            🛍️ Your cart is empty. <br />
            <Link to="/shop" className="text-blue-600 hover:underline text-sm">
              All products
            </Link>
          </div>
        ) : (
          cart.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 bg-white rounded-xl border border-blue-100 p-4 hover:shadow-md transition-all duration-300 hover:scale-[1.01]"
            >
              {/* Product Image */}
              <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 border border-blue-100 shadow-sm relative group">
                {item.images && item.images.length > 0 ? (
                  <>
                    <img
                      src={item.images[0].url}
                      alt={item.title}
                      className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-200/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 bg-blue-50 text-xs">
                    No Image
                  </div>
                )}
              </div>

              {/* Product Details */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h2 className="text-lg font-medium text-gray-800 truncate">
                    {item.title}
                  </h2>
                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                    {item.description}
                  </p>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-lg font-semibold text-blue-700">
                    ฿ {FormatsNumber(item.price)}
                  </span>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-gray-500">Qty:</span>
                    <span className="px-2 py-1 border border-blue-100 rounded-lg bg-blue-50 text-gray-700">
                      {item.count}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}

        {/* Cart Summary */}
        {cart.length > 0 && (
          <div className="pt-6 border-t border-blue-100 space-y-4">
            <div className="flex justify-between text-lg font-semibold text-slate-800">
              <span>Total</span>
              <span className="text-blue-600">
                ฿ {FormatsNumber(getTotalPrice())}
              </span>
            </div>

            {/* Action Buttons */}
<div className="flex flex-col gap-4 mt-6">
  {user ? (
    <button
      onClick={handleSaveCart}
      className="w-full py-3.5 rounded-xl text-white font-semibold bg-gradient-to-r from-sky-400 to-blue-500 hover:from-blue-500 hover:to-sky-600 shadow-md hover:shadow-lg transition-all duration-300"
    >
      Proceed to Checkout
    </button>
  ) : (
    <Link to="/login">
      <button className="w-full py-3.5 rounded-xl text-white font-semibold bg-gradient-to-r from-sky-400 to-blue-500 hover:from-blue-500 hover:to-sky-600 shadow-md hover:shadow-lg transition-all duration-300">
        Login to Continue
      </button>
    </Link>
  )}

  <Link to="/shop">
    <button className="w-full py-3.5 rounded-xl border border-blue-300 text-blue-700 hover:bg-blue-50 transition-all duration-300 shadow-sm">
      Edit Cart
    </button>
  </Link>
</div>

          </div>
        )}
      </div>
    </div>
  );
};

export default ListCart;
