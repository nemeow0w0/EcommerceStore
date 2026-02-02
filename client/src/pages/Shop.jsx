import React, { useEffect } from "react";
import ProductCard from "../components/Card/ProductCard";
import useEcomStore from "../store/ecom-store";
import SearchCard from "../components/Card/SearchCard";
import CartCard from "../components/Card/CartCard";

const Shop = () => {
  const getProduct = useEcomStore((state) => state.getProduct);
  const products = useEcomStore((state) => state.products);

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-b from-sky-50 via-sky-100 to-blue-200">
      
      {/* 1. SearchBar: บนมือถืออยู่บนสุด, บนคอมอยู่ซ้าย */}
      <div className="w-full md:w-1/4 p-4 md:h-screen md:overflow-y-auto border-b md:border-b-0 md:border-r border-sky-200 shadow-sm md:shadow-none">
        <div className="sticky top-4"> {/* ให้ SearchCard เกาะขอบเวลาเลื่อนบน Desktop */}
            <SearchCard />
        </div>
      </div>

      {/* 2. Product Grid: ส่วนกลางที่เป็นเนื้อหาหลัก */}
      <div className="w-full md:w-1/2 p-4 md:p-6 md:h-screen md:overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl md:text-3xl font-extrabold text-blue-900 tracking-tight">
                All Products
            </h1>
            <span className="text-sm text-blue-600 bg-white px-3 py-1 rounded-full shadow-sm md:hidden">
                {products.length} Items
            </span>
        </div>

        {/* Responsive Grid: 
            - 1 คอลัมน์ (มือถือเล็ก) 
            - 2 คอลัมน์ (มือถือใหญ่/แท็บเล็ต) 
            - 2 คอลัมน์ (Desktop เนื่องจากมี Sidebar ขนาบข้าง) 
        */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
          {products.length > 0 ? (
            products.map((item, index) => (
              <ProductCard key={index} item={item} />
            ))
          ) : (
            <div className="col-span-full text-center py-20 text-gray-500 italic">
              No products found...
            </div>
          )}
        </div>
      </div>

      {/* 3. Cart: บนมือถือจะอยู่ล่างสุด, บนคอมอยู่ขวา */}
      <div className="w-full md:w-1/4 p-4 bg-white/50 backdrop-blur-sm md:bg-gradient-to-b md:from-indigo-50 md:via-cyan-50 md:to-blue-100 md:h-screen md:overflow-y-auto border-t md:border-t-0 md:border-l border-sky-200">
        <div className="sticky top-4">
            <CartCard />
        </div>
      </div>

    </div>
  );
};

export default Shop;