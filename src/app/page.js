"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Banner from "@/components/Banner";
import CompanyInfo from "@/components/ComponyInfo";
import Footer from "@/components/Footer";
import Image from "next/image";
import useHomeStore from "@s/store/homeStore";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [percentage, setPercentage] = useState(0);
  const { slides, setSlides } = useHomeStore();

  useEffect(() => {
    const fetchTours = async () => {
      try {
        if (!slides || slides.length === 0) {
          const mockTours = [
            {
              id: 1,
              textUz: "Samarqand Turi",
              textRu: "Тур в Самарканд",
              textEng: "Samarkand Tour",
              descUz: "Qadimiy shaharning tarixiy sayohati",
              descRu: "Исторический тур по древнему городу",
              descEng: "Historical tour of the ancient city",
              price: "1000000",
              day: "3",
              image: "/tours/samarkand.jpg",
              visaUz: "Viza talab qilinmaydi",
              visaRu: "Виза не требуется",
              visaEng: "No visa required",
              hotels: [
                {
                  nameUz: "Registan Hotel",
                  nameRu: "Регостан Отель",
                  nameEng: "Registan Hotel",
                  price: "50",
                },
              ],
              priceIncludes: {
                uz: ["Transfer", "Mehmonxona", "Nonushta"],
                ru: ["Трансфер", "Отель", "Завтрак"],
                en: ["Transfer", "Hotel", "Breakfast"],
              },
              additionalPayments: {
                uz: ["Kirish chiptalari"],
                ru: ["Входные билеты"],
                en: ["Entrance tickets"],
              },
            },
            {
              id: 2,
              textUz: "Buxoro Turi",
              textRu: "Тур в Бухару",
              textEng: "Bukhara Tour",
              descUz: "Ipak Yo‘lining yuragi",
              descRu: "Путешествие в сердце Шелкового пути",
              descEng: "Journey to the heart of the Silk Road",
              price: "1200000",
              day: "4",
              image: "/tours/bukhara.jpg",
              visaUz: "Viza talab qilinmaydi",
              visaRu: "Виза не требуется",
              visaEng: "No visa required",
              hotels: [
                {
                  nameUz: "Lyabi House",
                  nameRu: "Ляби Хаус",
                  nameEng: "Lyabi House",
                  price: "60",
                },
              ],
              priceIncludes: {
                uz: ["Transfer", "Mehmonxona", "Nonushta"],
                ru: ["Трансфер", "Отель", "Завтрак"],
                en: ["Transfer", "Hotel", "Breakfast"],
              },
              additionalPayments: {
                uz: ["Kirish chiptalari"],
                ru: ["Входные билеты"],
                en: ["Entrance tickets"],
              },
            },
            {
              id: 3,
              textUz: "Xiva Turi",
              textRu: "Тур в Хиву",
              textEng: "Khiva Tour",
              descUz: "Qadimiy shahar-muzeyni kashf etish",
              descRu: "Открытие древнего города-музея",
              descEng: "Discovery of the ancient museum city",
              price: "900000",
              day: "2",
              image: "/tours/khiva.jpg",
              visaUz: "Viza talab qilinmaydi",
              visaRu: "Виза не требуется",
              visaEng: "No visa required",
              hotels: [
                {
                  nameUz: "Orient Star",
                  nameRu: "Ориент Стар",
                  nameEng: "Orient Star",
                  price: "45",
                },
              ],
              priceIncludes: {
                uz: ["Transfer", "Mehmonxona", "Nonushta"],
                ru: ["Трансфер", "Отель", "Завтрак"],
                en: ["Transfer", "Hotel", "Breakfast"],
              },
              additionalPayments: {
                uz: ["Kirish chiptalari"],
                ru: ["Входные билеты"],
                en: ["Entrance tickets"],
              },
            },
          ];
          setSlides(mockTours);
        }
      } catch (error) {
        console.error("Error loading tours:", error);
      }
    };

    fetchTours();

    const interval = setInterval(() => {
      setPercentage((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsLoading(false);
          return 100;
        }
        return prev + 2; 
      });
    }, 20); 

    return () => clearInterval(interval);
  }, [slides, setSlides]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#22C55E] via-green-600 to-teal-800 flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-56 h-56 mx-auto mb-6">
            <Image
              src="/1.png"
              alt="Loading Logo"
              fill
              className="object-cover animate-pulse rounded-full"
            />
          </div>
          <div className="relative w-64 h-2 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-white transition-all duration-300 ease-out"
              style={{ width: `${percentage}%` }}
            />
          </div>
          <p className="mt-4 text-xl font-semibold text-white animate-bounce">
            {percentage}%
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <Banner tours={{ data: slides }} />
      <CompanyInfo />
      <Footer />
    </>
  );
}
