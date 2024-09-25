import React, { useEffect, useState } from "react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import "swiper/css/autoplay";
import "swiper/css";
import "swiper/css/pagination";
import { client } from "../utils/client"; // Adjust the path based on your structure

export default function Hero() {
  const [heroImages, setHeroImages] = useState([]); // State to hold hero images

  // Fetch hero images from Sanity
  const fetchHeroImages = async () => {
    try {
      const query = `*[_type == "heroBanners"]{
        _id, name, "image": asset->url
      }`;
      const result = await client.fetch(query);
      setHeroImages(result);
    } catch (error) {
      console.error("Error fetching hero images:", error);
    }
  };

  useEffect(() => {
    fetchHeroImages(); // Call the function to fetch images when the component mounts
  }, []);

  return (
    <div className="w-full flex">
      <div className="w-[100%]">
        <Swiper
          autoplay={{ delay: 3000 }}
          modules={[Autoplay, Pagination, A11y]}
          spaceBetween={0}
          slidesPerView={1}
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
        >
          {heroImages.map((item) => (
            <SwiperSlide key={item._id}>
              <div className="flex justify-center items-center w-full">
                <img
                  src={item.image}
                  alt={item.name}
                  className="rounded-lg object-cover w-full h-auto"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
