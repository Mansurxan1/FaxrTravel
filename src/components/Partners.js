"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { useTranslation } from "react-i18next";
import { Autoplay } from "swiper/modules";
import { motion } from "framer-motion";

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

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const slideVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      className="my-10 px-4"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.3 }}
      variants={containerVariants}
    >
      <h2 className="text-4xl font-bold text-white text-center mb-10 drop-shadow-lg">
        {t("partner")}
      </h2>
      <Swiper
        modules={[Autoplay]}
        spaceBetween={25}
        loop={true}
        pagination={{
          clickable: true,
          dynamicBullets: true,
          renderBullet: (index, className) => {
            return `<span class="${className} bg-white"></span>`;
          },
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          0: { slidesPerView: 2.3 },
          470: { slidesPerView: 3.5 },
          641: { slidesPerView: 4.5 },
          1025: { slidesPerView: 5.5 },
          1281: { slidesPerView: 6.5 },
        }}
        className="mySwiper relative"
      >
        {partnerImages.map((image, index) => (
          <SwiperSlide key={index}>
            <motion.div
              className="flex justify-center items-center bg-white/10 backdrop-blur-md rounded-xl border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300"
              variants={slideVariants}
              whileHover={{ scale: 1.05, rotate: 2 }}
              whileTap={{ scale: 0.95 }}
            >
              <img
                src={image}
                alt={`Partner ${index + 1}`}
                className="w-full h-[100px] object-cover rounded-lg"
              />
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
      <style jsx>{`
        .swiper-pagination-bullet {
          background: white !important;
          opacity: 0.7;
          width: 10px;
          height: 10px;
          margin: 0 5px !important;
        }
        .swiper-pagination-bullet-active {
          opacity: 1;
          background: #22c55e !important;
        }
      `}</style>
    </motion.div>
  );
};

export default Partners;
