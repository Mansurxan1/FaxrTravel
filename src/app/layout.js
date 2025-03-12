"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "../i18n/i18n";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});


const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const { t, i18n } = useTranslation();
  const [lang, setLang] = useState("uz");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedLang = localStorage.getItem("lang") || "uz";
      i18n.changeLanguage(storedLang);
      setLang(storedLang);
    }
  }, [i18n]);

  const titles = {
    uz: "Faxr Travel - Eng yaxshi sayohat agentligi | Xalqaro turlar va arzon narxlar",
    ru: "Faxr Travel - Туристическое агентство №1 | Международные туры по низким ценам",
    en: "Faxr Travel - Top Travel Agency | Best International Tours & Deals",
  };

  const descriptions = {
    uz: "Faxr Travel – Xalqaro sayohatlar va arzon turlar! Dubay, Turkiya, Misr, va boshqa mashhur yo‘nalishlar bo‘yicha eng yaxshi narxlarni toping.",
    ru: "Faxr Travel – Международные туры по лучшим ценам! Откройте для себя Турцию, Дубай, Египет и другие популярные направления.",
    en: "Faxr Travel – Discover the best international tours! Explore Dubai, Turkey, Egypt, and more at unbeatable prices.",
  };

  const keywords = {
    uz: "sayohat agentligi, xalqaro turlar, Turkiya sayohat, Dubayga tur, Misrga arzon sayohat, Faxr Travel",
    ru: "туристическое агентство, международные туры, отдых в Турции, туры в Дубай, Египет недорого, Faxr Travel",
    en: "travel agency, international tours, Turkey travel, Dubai tours, cheap Egypt trips, Faxr Travel",
  };

  return (
    <html lang={lang}>
      <head>
        <title>{titles[lang]}</title>
        <link rel="icon" href="/favicon.png" />

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={descriptions[lang]} />
        <meta name="keywords" content={keywords[lang]} />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Faxr Travel Team" />

        <meta property="og:title" content={titles[lang]} />
        <meta property="og:description" content={descriptions[lang]} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Faxr Travel" />
        <meta property="og:url" content="https://faxr-travel.uz" />
        <meta
          property="og:image"
          content="https://faxr-travel.uz/favicon.png"
        />
        <meta
          property="og:locale"
          content={lang === "uz" ? "uz_UZ" : lang === "ru" ? "ru_RU" : "en_US"}
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={titles[lang]} />
        <meta name="twitter:description" content={descriptions[lang]} />
        <meta name="twitter:image" content="/og-image.jpg" />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TravelAgency",
            name: "Faxr Travel",
            description: descriptions[lang],
            url: "https://faxr-travel.uz",
            image: "https://faxr-travel.uz/favicon.png",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Bog'ibo'ston ko'chasi, 147-uy",
              addressLocality: "Toshkent",
              addressRegion: "Toshkent",
              addressCountry: "UZ",
            },
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+998-95-312-02-02",
              contactType: "Customer Service",
            },
            openingHours: "Mo-Fr 09:00-18:00",
          })}
        </script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
