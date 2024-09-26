import React, { useState, useEffect } from "react";
import { client } from "../utils/client"; // Assuming the Sanity client is available here
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, A11y } from "swiper";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";

// Skeleton Loader Component
const SkeletonBanner = () => (
  <div className="animate-pulse w-full h-[400px] bg-gray-300 rounded-lg"></div>
);

export default function Hero() {
  const [banners, setBanners] = useState([]); // State to store banners
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(""); // Handle errors if any

  // Fetch hero banners from Sanity
  const fetchHeroBanners = async () => {
    try {
      const query = `*[_type == "settings"]{
        heroBanners[]{_key, asset->{url}}
      }[0]`; // Query to get hero banners
      const result = await client.fetch(query);
      setBanners(result?.heroBanners || []); // Update banners state
    } catch (error) {
      console.error("Error fetching hero banners:", error);
      setError("Failed to load hero banners.");
    } finally {
      setLoading(false); // Set loading to false after fetch
    }
  };

  useEffect(() => {
    fetchHeroBanners(); // Fetch banners on component mount
  }, []);

  return (
    <div className="w-full flex">
      <div className="w-[100%]">
        {error && <p className="text-red-500">{error}</p>}{" "}
        {/* Display error if any */}
        <Swiper
          autoplay={{ delay: 3000 }}
          loop={true} // Enable looping
          modules={[Autoplay, Pagination, A11y]}
          spaceBetween={0}
          slidesPerView={1}
          pagination={{ clickable: true }} // Enables clickable dots
          scrollbar={{ draggable: true }}
        >
          {loading ? (
            // Render skeleton loaders while banners are loading
            <>
              <SwiperSlide>
                <SkeletonBanner />
              </SwiperSlide>
              <SwiperSlide>
                <SkeletonBanner />
              </SwiperSlide>
            </>
          ) : banners.length > 0 ? (
            // Render actual banners when loaded
            banners.map((banner) => (
              <SwiperSlide key={banner._key}>
                <div className="flex justify-center items-center w-full">
                  <div className="flex">
                    <img
                      src={banner.asset.url}
                      alt={`Hero Banner ${banner._key}`}
                      className="rounded-lg w-full"
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))
          ) : (
            <SwiperSlide>
              <div className="flex justify-center items-center w-full">
                <p>No banners available</p>
              </div>
            </SwiperSlide>
          )}
        </Swiper>
      </div>
    </div>
  );
}
