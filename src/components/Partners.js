"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useTranslation } from "react-i18next";
import { Navigation, Autoplay } from "swiper/modules";

const partnerImages = [
  "https://static.tildacdn.com/tild3065-3431-4465-b165-326430373066/air-kazakhstan-25048.svg",
  "https://static.tildacdn.com/tild3061-3839-4035-b135-313262643832/turkish-airlines-1.svg",
  "https://static.tildacdn.com/tild3735-6330-4662-b366-643563633232/aeroflot-russian-air.svg",
  "https://static.tildacdn.com/tild3064-3262-4766-b462-313264386332/qanot-sharq.svg",
  "https://static.tildacdn.com/tild3362-6230-4262-a265-346536633036/saudia.svg",
  "https://static.tildacdn.com/tild6433-3665-4561-b736-613739636462/airarabia.svg",
  "https://static.tildacdn.com/tild3737-6432-4161-b936-663634643737/flynas.svg",
  "https://static.tildacdn.com/tild6265-3430-4231-b166-636635353362/jazeera.svg",
  "https://static.tildacdn.com/tild3333-3435-4037-a565-346531643732/apex.svg",
  "https://static.tildacdn.com/tild3330-3935-4265-b238-393931653134/ahm-insurance-1.svg",
];

const Partners = () => {
  const { t } = useTranslation();
  return (
    <div className="my-5">
      <div className="px-4">
        <h2 className="text-3xl font-bold text-white text-center mb-8">
          {t("partner")}
        </h2>
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={20}
          navigation
          loop={true}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            0: { slidesPerView: 2 },
            470: { slidesPerView: 3 },
            641: { slidesPerView: 4 },
            1025: { slidesPerView: 4 },
            1281: { slidesPerView: 5 },
          }}
          className="mySwiper"
        >
          {partnerImages.map((image, index) => (
            <SwiperSlide key={index}>
              <div className="flex justify-center rounded-lg items-center">
                <img
                  src={image}
                  alt={`Partner ${index + 1}`}
                  className="w-full h-[130px] object-cover rounded-lg"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Partners;
