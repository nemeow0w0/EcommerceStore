import React from "react";
import { ShoppingCart } from "lucide-react";
import useEcomStore from "../../store/ecom-store";
import { FormatsNumber } from "../../utils/formatsnumber";
import { motion } from "motion/react";

const ProductCard = ({ item }) => {
  const actionAddtoCart = useEcomStore((state) => state.actionAddtoCart);

  return (
<motion.div
  className="bg-white/90 rounded-2xl shadow-sm hover:shadow-xl
             transition-all duration-500 overflow-hidden flex flex-col
             backdrop-blur-sm border border-sky-100
             h-[320px] min-w-[180px] flex-shrink-0"
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  whileHover={{ y: -5 }}
  transition={{ duration: 0.6, ease: [0.25, 0.8, 0.25, 1] }}
>

      {/* Image */}
      <div className="relative w-full h-48 overflow-hidden">
        {item.images && item.images.length > 0 ? (
          <>
            <motion.img
              src={item.images[0].url}
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,0.8,0.25,1)]"
              whileHover={{ scale: 1.05 }}
            />
            {/* Elegant Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-sky-200/50 via-transparent to-transparent" />
          </>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-sky-100 to-blue-50 flex items-center justify-center text-gray-400 text-sm">
            No Image
          </div>
        )}
      </div>

      {/* Content */}
      <div className="px-5 py-4 flex flex-col flex-grow">
        <p className="text-lg font-semibold text-gray-800 line-clamp-2 truncate">
          {item.title}
        </p>
        <p className="text-sm text-gray-500 line-clamp-2 mt-1 truncate">
          {item.description}
        </p>

        {/* Price & Button */}
        <div className="mt-auto flex justify-between items-center pt-5">
          <span className="text-lg font-bold text-sky-600">
            ฿{FormatsNumber(item.price)}
          </span>

          <motion.button
            whileTap={{ scale: 0.9 }}
            whileHover={{
              scale: 1.07,
              boxShadow: "0 5px 12px rgba(56, 189, 248, 0.25)",
            }}
            transition={{ type: "spring", stiffness: 220, damping: 14 }}
            onClick={() => actionAddtoCart(item)}
            className="bg-gradient-to-r from-sky-300 via-blue-300 to-cyan-200 text-gray-800
                       px-3.5 py-2 rounded-xl font-medium shadow-sm
                       hover:from-sky-400 hover:to-blue-300
                       transition-all duration-300 flex items-center gap-2"
          >
            <ShoppingCart size={18} />
            <span>Add</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
