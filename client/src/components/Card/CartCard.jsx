import React from "react";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import useEcomStore from "../../store/ecom-store";
import { FormatsNumber } from "../../utils/formatsnumber";

const CartCard = () => {
  const carts = useEcomStore((state) => state.carts);
  const actionUpdateQuatity = useEcomStore((state) => state.actionUpdateQuatity);
  const actionRemoveCartProduct = useEcomStore((state) => state.actionRemoveCartProduct);
  const actionGetTotalPrice = useEcomStore((state) => state.actionGetTotalPrice);

  return (
    <div className="flex flex-col h-full max-w-full md:max-w-md mx-auto bg-white rounded-2xl shadow-lg border border-blue-100 overflow-hidden">
      {/* Header */}
      <div className="p-4 bg-gradient-to-r from-blue-50 to-white border-b border-blue-100">
        <h1 className="text-xl font-bold text-slate-700 flex items-center gap-2">
          <ShoppingBag className="text-blue-500" size={20} /> 
          Cart <span className="text-sm font-normal text-gray-400">({carts.length} items)</span>
        </h1>
      </div>

      {/* Cart Items List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[450px] md:max-h-[60vh]">
        {carts.length > 0 ? (
          carts.map((item, index) => (
            <div
              key={item.id || index}
              className="p-3 rounded-xl border border-gray-50 bg-white shadow-sm flex flex-col gap-3"
            >
              <div className="flex items-center gap-3">
                {/* Image */}
                <div className="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden border border-blue-50">
                  {item.images?.length > 0 ? (
                    <img
                      src={item.images[0].url}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-blue-50 flex items-center justify-center text-[10px] text-gray-400">
                      No Image
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h2 className="font-semibold text-slate-700 text-sm truncate uppercase">
                    {item.title}
                  </h2>
                  <p className="text-blue-600 font-bold text-sm">
                    ฿{FormatsNumber(item.price)}
                  </p>
                </div>

                {/* Remove */}
                <button
                  onClick={() => actionRemoveCartProduct(item.id)}
                  className="p-2 text-gray-300 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              {/* Quantity Control & Subtotal */}
              <div className="flex justify-between items-center bg-gray-50 p-2 rounded-lg">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => actionUpdateQuatity(item.id, item.count - 1)}
                    className="p-1 bg-white rounded shadow-sm hover:text-blue-500 disabled:opacity-50"
                    disabled={item.count <= 1}
                  >
                    <Minus size={14} />
                  </button>
                  <span className="text-sm font-bold w-6 text-center">{item.count}</span>
                  <button
                    onClick={() => actionUpdateQuatity(item.id, item.count + 1)}
                    className="p-1 bg-white rounded shadow-sm hover:text-blue-500"
                  >
                    <Plus size={14} />
                  </button>
                </div>
                <div className="text-xs font-semibold text-slate-600">
                  Total: ฿{FormatsNumber(item.price * item.count)}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-10 opacity-40">
            <ShoppingBag size={48} className="mb-2" />
            <p className="text-sm">Your cart is empty</p>
          </div>
        )}
      </div>

      {/* Footer: Total & Checkout */}
      {carts.length > 0 && (
        <div className="p-4 bg-gray-50 border-t border-blue-100">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-medium text-slate-500">Net Total</span>
            <span className="text-xl font-black text-blue-600">
              ฿{FormatsNumber(actionGetTotalPrice())}
            </span>
          </div>

          <Link to="/cart" className="block">
            <button className="w-full py-3 rounded-xl text-white font-bold
              bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700
              shadow-lg shadow-blue-200 transition-all duration-300 active:scale-[0.98]">
              Go to Checkout
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default CartCard;