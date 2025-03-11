"use client";

import React, { useState, useEffect } from "react";
import useHomeStore from "@s/store/homeStore";
import { useTranslation } from "react-i18next";
import TourDetails from "./TourDetails";
import { X } from "lucide-react";

const Tour = () => {
  const { slides } = useHomeStore();
  const { t, i18n } = useTranslation();
  const [selectedTourId, setSelectedTourId] = useState(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (selectedTourId) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [selectedTourId]);

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
    };
  };

  const openModal = (id) => setSelectedTourId(id);
  const closeModal = () => setSelectedTourId(null);

  return (
    <div id="trips" className="mx-auto mb-6 px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white font-extrabold text-center mb-8 sm:mb-10 md:mb-12 drop-shadow-md">
        {t("trips")}
      </h2>

      <div className="grid grid-cols-1 custom:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
        {slides.map((slide) => {
          const { title, desc } = getSlideText(slide);
          return (
            <div
              key={slide.id}
              className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden flex flex-col transform transition-all hover:scale-105 hover:shadow-2xl"
            >
              <div className="relative w-full h-48 sm:h-60 md:h-72">
                <img
                  src={slide.image}
                  alt={title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="p-3 sm:p-4 flex flex-col items-center flex-grow group">
                <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-green-800 mb-2 sm:mb-3 text-center transition-colors duration-300">
                  {title}
                </h3>
                <div className="mb-3 sm:mb-4 flex flex-col items-center text-gray-600 transition-colors duration-300">
                  <p className="text-sm sm:text-base md:text-lg font-medium">
                    {t("price")}:{" "}
                    <span className="text-green-600 transition-colors duration-300">
                      {slide.price} {t("sum")}
                    </span>
                  </p>
                  <p className="text-sm sm:text-base md:text-lg font-medium">
                    {t("duration")}: {slide.day} {t("day")}
                  </p>
                </div>
                <p className="text-gray-600 text-xs sm:text-sm md:text-base mb-4 sm:mb-6 text-center line-clamp-3 transition-colors duration-300">
                  {desc}
                </p>
                <button
                  onClick={() => openModal(slide.id)}
                  className="mt-auto w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-2 sm:py-3 rounded-lg transition-all duration-300 font-semibold text-sm sm:text-base md:text-lg shadow-md"
                >
                  {t("read_more")}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {selectedTourId && (
        <div className="fixed inset-0 max-w-[1250px] mx-auto w-full from-green-900/70 via-black/60 to-green-900/70 h-screen flex items-center z-50 transition-opacity duration-500">
          <div className="bg-white/95 backdrop-blur-md h-full overflow-y-auto relative shadow-3xl animate-slide-up rounded-t-2xl sm:rounded-2xl">
            <TourDetails
              id={selectedTourId}
              onClose={closeModal}
              lang={isClient ? i18n.language : "uz"}
            />
            <button
              onClick={closeModal}
              className="absolute top-4 sm:top-6 right-4 sm:right-6 bg-green-700 text-white p-2 sm:p-3 rounded-full hover:bg-green-800 transition-all duration-300 shadow-lg"
            >
              <X size={20} sm={{ size: 24 }} md={{ size: 28 }} />
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slideUp 0.5s ease-out;
        }
        @media (max-width: 640px) {
          .line-clamp-3 {
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
        }
      `}</style>
    </div>
  );
};

export default Tour;
