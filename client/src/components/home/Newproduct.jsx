import React, { useState, useEffect } from "react";
import { ListProductBestSelling } from "../../api/product";
import ProductCard from "../Card/ProductCard";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const Newproduct = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    LoadBestSelling();
  }, []);

  const LoadBestSelling = () => {
    ListProductBestSelling("updatedAt", "desc", 10)
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-10 ">
      {/* Section Title */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          🆕 สินค้าใหม่ล่าสุด
        </h2>
        <p className="text-gray-500">เลือกชมสินค้าที่เพิ่งเพิ่มเข้ามาในร้านของเรา</p>
      </div>

      {/* Swiper Horizontal Carousel */}
      <Swiper
        modules={[Autoplay]}
        spaceBetween={20}
        slidesPerView={3}          // จำนวน card ที่เห็นต่อหน้า
        centeredSlides={false}
        loop={true}                // เลื่อนวนซ้ำ
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        breakpoints={{
          320: { slidesPerView: 1, spaceBetween: 10 },
          640: { slidesPerView: 2, spaceBetween: 15 },
          1024: { slidesPerView: 3, spaceBetween: 20 },
        }}
      >
        {products?.map((pro, idx) => (
          <SwiperSlide key={idx}>
            <div className="h-[480px] flex flex-col">
              <ProductCard item={pro} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};



export default Newproduct;
