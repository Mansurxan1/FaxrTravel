"use client";

import React, { useState } from "react";
import useHomeStore from "@s/store/homeStore";
import { useTranslation } from "react-i18next";
import PaymentForm from "./PaymentForm";

const TourDetails = ({ id, onClose }) => {
  const { slides } = useHomeStore();
  const { t, i18n } = useTranslation();
  const lang = i18n.language || "uz";
  const slide = slides.find((s) => s.id === id);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  if (!slide) {
    return (
      <div className="container mx-auto py-12 px-6 bg-gray-100">
        <p className="text-center text-gray-800">{t("not_found")}</p>
      </div>
    );
  }

  const getSlideText = () => {
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
      travel:
        lang === "uz"
          ? slide.travelUz
          : lang === "ru"
          ? slide.travelRu || slide.travelUz
          : slide.travelEng || slide.travelUz,
      visa:
        lang === "uz"
          ? slide.visaUz
          : lang === "ru"
          ? slide.visaRu
          : slide.visaEng,
      hotels: slide.hotels.map((hotel) => ({
        name:
          lang === "uz"
            ? hotel.nameUz
            : lang === "ru"
            ? hotel.nameRu
            : hotel.nameEng,
        price: hotel.price,
      })),
      priceIncludes: slide.priceIncludes[lang] || slide.priceIncludes.uz,
      additionalPayments:
        slide.additionalPayments[lang] || slide.additionalPayments.uz,
    };
  };

  const {
    title,
    desc,
    visa,
    travel,
    hotels,
    priceIncludes,
    additionalPayments,
  } = getSlideText();

  const handleBuyClick = () => {
    setShowPaymentForm(true);
  };

  const handleCancelPayment = () => {
    setShowPaymentForm(false);
  };

  const handleSubmitPayment = async (userData) => {
    try {
      setLoading(true);
      setError(null);

      const paymentData = {
        tourId: id,
        tourName: title,
        price: slide.price,
        userId: null,
        userName: userData.name,
        userPhone: userData.phone,
      };

      console.log("Отправка запроса на оплату:", paymentData);

      const response = await fetch("/api/click", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentData),
      });

      const data = await response.json();
      console.log("Ответ от сервера:", data);

      if (!response.ok) {
        throw new Error(data.error || "Ошибка при создании платежа");
      }

      if (!data.redirectUrl) {
        throw new Error(
          "Не получен URL для перенаправления на страницу оплаты"
        );
      }

      window.location.href = data.redirectUrl;
    } catch (error) {
      console.error("Ошибка при оплате:", error);

      let errorMessage =
        "Произошла ошибка при обработке платежа. Пожалуйста, попробуйте позже.";

      if (error.message.includes("Сессия заблокирована")) {
        errorMessage =
          "Сессия оплаты заблокирована. Пожалуйста, обновите страницу и попробуйте снова.";
      } else if (error.message.includes("авторизоваться")) {
        errorMessage =
          "Требуется авторизация в системе оплаты. Пожалуйста, попробуйте снова.";
      }

      setError(errorMessage);
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen  pt-[100px] px-5 pb-7 bg-gradient-to-br from-green-100 via-white to-green-50 ">
      <div className="max-w-[1920px] mx-auto">
        <div className="relative w-full h-[30vh] md:h-[70vh] rounded-2xl overflow-hidden shadow-2xl transform transition-all hover:shadow-3xl">
          <img
            src={slide.image}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-green-900/70 to-transparent flex items-end p-6">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg">
              {title}
            </h2>
          </div>
        </div>

        <p className="text-gray-700 text-lg md:text-xl mt-8 mb-10 leading-relaxed max-w-3xl mx-auto text-center">
          {desc}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-lg border border-green-200">
            <p className="text-2xl font-semibold text-green-800 mb-2">
              {t("price")}:{" "}
              <span className="text-green-600">
                {slide.price} {t("sum")}
              </span>
            </p>
            <p className="text-lg flex flex-col text-gray-600">
              {t("duration")}: {slide.day} {t("day")}
              <span>{travel}</span>
            </p>
          </div>
          <div className="bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-lg border border-green-200">
            <h3 className="text-xl font-semibold text-green-800 mb-2">
              {t("visa")}
            </h3>
            <p className="text-gray-600">{visa}</p>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-lg border border-green-200 mb-10">
          <h3 className="text-xl font-semibold text-green-800 mb-4">
            {t("hotels")}
          </h3>
          <ul className="list-none pl-0 text-gray-600">
            {hotels.map((hotel, index) => (
              <li key={index} className="mb-3 flex items-center">
                <span className="w-2 h-2 bg-green-600 rounded-full mr-3"></span>
                {hotel.name} -{" "}
                <span className="text-green-600 font-medium">
                  {hotel.price} {t("sum")}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-lg border border-green-200 mb-10">
          <h3 className="text-xl font-semibold text-green-800 mb-4">
            {t("price_includes")}
          </h3>
          <ul className="list-none pl-0 text-gray-600">
            {priceIncludes.map((item, index) => (
              <li key={index} className="mb-3 flex items-center">
                <span className="w-2 h-2 bg-green-600 rounded-full mr-3"></span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-lg border border-green-200 mb-10">
          <h3 className="text-xl font-semibold text-green-800 mb-4">
            {t("additional_payments")}
          </h3>
          <ul className="list-none pl-0 text-gray-600">
            {additionalPayments.map((item, index) => (
              <li key={index} className="mb-3 flex items-center">
                <span className="w-2 h-2 bg-green-600 rounded-full mr-3"></span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {showPaymentForm ? (
          <PaymentForm
            onSubmit={handleSubmitPayment}
            onCancel={handleCancelPayment}
            price={slide.price}
            tourName={title}
          />
        ) : (
          <>
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl mb-6">
                <p>{error}</p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-6 mt-12 max-w-2xl mx-auto">
              <button
                onClick={onClose}
                className="w-full bg-white text-green-700 border-2 border-green-700 py-4 rounded-xl hover:bg-green-50 hover:shadow-lg transition-all duration-300 font-semibold text-lg shadow-md"
                disabled={loading}
              >
                {t("back")}
              </button>
              <button
                onClick={handleBuyClick}
                className={`w-full bg-gradient-to-r from-green-600 to-green-800 text-white py-4 rounded-xl hover:from-green-700 hover:to-green-900 hover:shadow-lg transition-all duration-300 font-semibold text-lg shadow-md ${
                  loading ? "opacity-70 cursor-not-allowed" : ""
                }`}
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    {t("processing")}
                  </span>
                ) : (
                  t("purchase")
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default TourDetails;
