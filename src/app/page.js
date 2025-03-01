"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "@/components/Navbar";
import Banner from "@/components/Banner";
import CompanyInfo from "@/components/ComponyInfo";
import Footer from "@/components/Footer";
import Image from "next/image";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [percentage, setPercentage] = useState(0);
  const [tours, setTours] = useState(null);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        // Используем локальные данные вместо запроса к API
        const mockTours = [
          {
            id: 1,
            title: "Тур в Самарканд",
            description: "Исторический тур по древнему городу",
            price: "1000000",
            image: "/tours/samarkand.jpg"
          },
          {
            id: 2,
            title: "Тур в Бухару",
            description: "Путешествие в сердце Шелкового пути",
            price: "1200000",
            image: "/tours/bukhara.jpg"
          },
          {
            id: 3,
            title: "Тур в Хиву",
            description: "Открытие древнего города-музея",
            price: "900000",
            image: "/tours/khiva.jpg"
          }
        ];
        
        setTours({ data: mockTours });
        setPercentage(100);
        setTimeout(() => setIsLoading(false), 500);
      } catch (error) {
        console.error("Error loading tours:", error);
        setPercentage(99);
      }
    };

    fetchTours();

    const interval = setInterval(() => {
      setPercentage((prev) => {
        if (prev >= 99) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#22C55E] via-green-600 to-teal-800 flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-56 h-56 mx-auto mb-6">
            <Image
              src="/1.png"
              alt="Loading Logo"
              fill
              className="object-cover animate-pulse"
            />
          </div>

          <div className="relative w-64 h-2 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-white transition-all duration-300 ease-out"
              style={{ width: `${percentage}%` }}
            />
          </div>
          <p className="mt-4 text-xl font-semibold text-white">{percentage}%</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <Banner tours={tours} />
      <CompanyInfo />
      <Footer />
    </>
  );
}
