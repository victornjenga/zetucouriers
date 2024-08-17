import React from "react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import "swiper/css/autoplay";
import "swiper/css";
import "swiper/css/pagination";
export default function Hero() {
  const hero = [
    {
      name: "1",
      image: "/hero.png",
    },
    {
      name: "2",
      image: "/hero2.png",
    },
    // {
    //   name: "3",
    //   image: "/hero.png",
    // },
  ];
  return (
    <div className="w-full flex  ">
      {/* <div className="hidden md:flex flex-col w-[30%] justify-center items-center">
        <img src="/banner1.png" alt="decor" className="w-[150px] " />
      </div> */}

      <div className="w-[100%] ">
        <Swiper
          // install Swiper modules
          autoplay={{ delay: 3000 }}
          modules={[Autoplay, Pagination, A11y]}
          spaceBetween={0}
          slidesPerView={1}
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          // onSwiper={(swiper) => console.log(swiper)}
          // onSlideChange={() => console.log("slide change")}
        >
          {hero.map((item, index) => (
            <SwiperSlide key={item.index}>
              <div className="flex justify-center items-center w-full ] ">
                <div className="flex  ">
                  {/* <Image className="rounded-lg " src={selin} alt="Website" /> */}
                  <img src={item.image} alt="about" className=" rounded-lg" />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {/* <div className="hidden md:flex flex-col w-[30%] justify-center items-center">
        <img src="/banner.png" alt="decor" className="w-[150px] " />
      </div> */}
    </div>
  );
}
