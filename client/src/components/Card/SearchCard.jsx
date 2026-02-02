import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import useEcomStore from "../../store/ecom-store";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { FormatsNumber } from "../../utils/formatsnumber";
import { motion } from "motion/react";

const SearchCard = () => {
  const getProduct = useEcomStore((state) => state.getProduct);
  const actionsearchFilters = useEcomStore((state) => state.actionsearchFilters);
  const getCategory = useEcomStore((state) => state.getCategory);
  const categories = useEcomStore((state) => state.categories);

  const [text, setText] = useState("");
  const [categorySelected, setCategorySelected] = useState([]);
  const [price, setPrice] = useState([10, 3500]);
  const [ok, setOk] = useState(false);

  useEffect(() => {
    getCategory();
  }, []);

  // Search by text
  useEffect(() => {
    if (text.trim() === "") {
      getProduct();
      return;
    }
    const delay = setTimeout(() => {
      actionsearchFilters({ query: text });
    }, 300);
    return () => clearTimeout(delay);
  }, [text]);

  // Search by category
  const handleCheck = (e) => {
    const inCheck = Number(e.target.value);
    setCategorySelected((prev) => {
      let updated;
      if (prev.includes(inCheck)) {
        updated = prev.filter((id) => id !== inCheck);
      } else {
        updated = [...prev, inCheck];
      }

      if (updated.length > 0) actionsearchFilters({ category: updated });
      else getProduct();
      return updated;
    });
  };

  // Search by price
  useEffect(() => {
    actionsearchFilters({ price });
  }, [ok]);

  const handlePrice = (value) => {
    setPrice(value);
    setTimeout(() => {
      setOk(!ok);
    }, 300);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/60 backdrop-blur-md rounded-2xl shadow-lg border border-blue-100
                 p-6 max-w-sm mx-auto h-full flex flex-col hover:shadow-2xl transition-all duration-500"
    >
      {/* Search Header */}
      <div className="flex items-center space-x-2 mb-5">
        <div className="p-2 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-xl text-white shadow-sm">
          <Search size={18} />
        </div>
        <h2 className="text-lg font-semibold text-gray-800">Search Products</h2>
      </div>

      {/* Input */}
      <div className="relative mb-6">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="🔍 ค้นหาสินค้า..."
          className="w-full px-4 py-3 pr-10 text-sm rounded-xl border border-gray-200 shadow-sm 
                     focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 
                     placeholder-gray-400 bg-white/80 transition-all duration-300"
        />
        <Search
          className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-400"
          size={18}
        />
      </div>

      {/* Category Filter */}
      <div className="mt-2">
        <h3 className="text-gray-700 font-semibold mb-3 text-sm">
          📂 หมวดหมู่สินค้า
        </h3>
        <div className="space-y-2 max-h-56 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-200">
          {categories.map((item) => (
            <motion.label
              whileHover={{ scale: 1.02 }}
              key={item.id}
              className={`flex items-center space-x-2 cursor-pointer p-2 rounded-lg text-sm
                transition-all duration-300 ${
                  categorySelected.includes(item.id)
                    ? "bg-gradient-to-r from-blue-100 to-cyan-50 border border-blue-200 shadow-sm"
                    : "hover:bg-gray-50 border border-transparent"
                }`}
            >
              <input
                type="checkbox"
                value={item.id}
                checked={categorySelected.includes(item.id)}
                onChange={handleCheck}
                className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-300"
              />
              <span className="text-gray-700">{item.name}</span>
            </motion.label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="mt-6 bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-2xl shadow-inner">
        <h1 className="text-sm font-semibold text-gray-700 mb-3">💰 ช่วงราคา</h1>

        {/* Min/Max */}
        <div className="flex justify-between text-xs text-gray-600 mb-3">
          <span className="px-3 py-1 bg-white/70 border rounded-lg shadow-sm">
            Min: {FormatsNumber(price[0])} ฿
          </span>
          <span className="px-3 py-1 bg-white/70 border rounded-lg shadow-sm">
            Max: {FormatsNumber(price[1])} ฿
          </span>
        </div>

        {/* Slider */}
        <Slider
          onChange={handlePrice}
          range
          min={0}
          max={4000}
          defaultValue={[10, 1500]}
          trackStyle={[{ backgroundColor: "#38bdf8" }]}
          handleStyle={[
            { borderColor: "#38bdf8", backgroundColor: "#fff" },
            { borderColor: "#38bdf8", backgroundColor: "#fff" },
          ]}
          railStyle={{ backgroundColor: "#dbeafe" }}
        />
      </div>
    </motion.div>
  );
};

export default SearchCard;
