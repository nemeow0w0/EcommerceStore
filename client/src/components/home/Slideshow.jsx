import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import axios from 'axios';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/navigation';
// import required modules
import { Autoplay,Scrollbar,  Navigation } from 'swiper/modules';

const Slideshow = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    handleGetImages();
  }, []);

  const handleGetImages = () => {
    axios
      .get('https://picsum.photos/v2/list?page=1&limit=15')
      .then((res) => setImages(res.data))
      .catch((err) => console.log(err));
  };

  return (
    <div >
      <Swiper
        scrollbar={{ hide: true }}
        modules={[Autoplay, Scrollbar]}
        className="mySwiper"
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
      >
      {images?.map((item, inx) => (
          <SwiperSlide 
          key={inx}
          className='mb-3'
          >
            <div className="w-full h-64 md:h-96 overflow-hidden rounded-xl">
              <img
                src={`${item.download_url}?w=1200&h=500&fit=crop`}
                alt={item.author}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        scrollbar={{ hide: true }}
        modules={[Autoplay, Scrollbar,  Navigation]}
          slidesPerView={3}
        centeredSlides={true}
        spaceBetween={3}
        className="mySwiper"
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
         navigation={true}
      >
{images?.map((item, inx) => (
          <SwiperSlide key={inx}>
            <div className="overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              <img
                src={`${item.download_url}?w=300&h=200&fit=crop`}
                alt={item.author}
                className="w-full h-32 md:h-36 object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slideshow;
