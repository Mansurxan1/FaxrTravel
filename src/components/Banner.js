"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import useHomeStore from "@s/store/homeStore";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";

const Banner = () => {
  const slides = useHomeStore((state) => state.slides);
  const { t, i18n } = useTranslation();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const getSlideText = (slide) => {
    const lang = isClient ? i18n.language : "uz";
    return {
      title:
        lang === "uz"
          ? slide.textUz
          : lang === "ru"
          ? slide.textRu
          : slide.textEng,
      desc:
        lang === "uz"
          ? slide.descUz
          : lang === "ru"
          ? slide.descRu
          : slide.descEng,
      hotelName: slide.hotels
        ? lang === "uz"
          ? slide.hotels[0].nameUz
          : lang === "ru"
          ? slide.hotels[0].nameRu
          : slide.hotels[0].nameEng
        : "",
      hotelPrice: slide.hotels ? slide.hotels[0].price : "",
    };
  };

  return (
    <div className="relative w-full h-[600px] md:h-[700px] lg:h-screen">
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{
          clickable: true,
          bulletActiveClass: "swiper-pagination-bullet-active",
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        className="w-full h-full"
      >
        {slides.map((slide) => {
          const { title, desc } = getSlideText(slide);
          return (
            <SwiperSlide
              key={slide.id}
              className="relative flex items-center justify-start text-white h-full"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-black/10 z-10" />
              <img
                src={slide.image}
                alt={title}
                className="absolute top-0 left-0 w-full h-full object-cover"
                loading="eager"
              />
              <div className="relative z-20 px-6 md:px-12 lg:px-24 flex flex-col justify-center h-full max-w-4xl">
                <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6">
                  {title}
                </h2>
                <p className="text-xl md:text-2xl font-light mb-8 opacity-90">
                  {desc}
                </p>
                {slide.price && slide.day && (
                  <div className="mb-2">
                    <span className="bg-green-600 py-3 px-8 rounded-full text-white">
                      {slide.price} {t("sum")}
                    </span>
                  </div>
                )}
                <div className="mt-4">
                  <button className="bg-green-600 px-6 py-3 rounded-full text-white hover:bg-green-700 transition">
                    {slide.day} {t("day")}
                  </button>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      <style jsx global>{`
        .swiper-pagination-bullet {
          background-color: white !important;
          width: 10px !important;
          height: 10px !important;
          transition: all 0.3s ease;
        }
        .swiper-pagination-bullet-active {
          background-color: #22c55e !important;
          width: 14px !important;
          height: 14px !important;
        }
      `}</style>
    </div>
  );
};

export default Banner;
