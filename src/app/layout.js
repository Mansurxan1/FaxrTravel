"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "../i18n/i18n";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
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
    uz: "Faxr Travel - Sayohat Agentligi | Xalqaro Turlar",
    ru: "Faxr Travel - Туристическое агентство | Международные туры",
    en: "Faxr Travel - Travel Agency | International Tours",
  };

  const descriptions = {
    uz: "Faxr Travel - O‘zbekistondagi eng yaxshi sayohat agentligi. Turkiya, Dubay, Misr va boshqa xalqaro turlarni arzon narxlarda kashf eting.",
    ru: "Faxr Travel - Лучшее туристическое агентство в Узбекистане. Туры в Турцию, Дубай, Египет и другие страны по доступным ценам.",
    en: "Faxr Travel - The best travel agency in Uzbekistan. Discover affordable international tours to Turkey, Dubai, Egypt, and more.",
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
        <link rel="icon" href="/favicon.ico" />

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={descriptions[lang]} />
        <meta name="keywords" content={keywords[lang]} />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Faxr Travel Team" />

        <meta property="og:title" content={titles[lang]} />
        <meta property="og:description" content={descriptions[lang]} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://faxr-travel.uz" />
        <meta property="og:image" content="/2.jpg" />
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
            address: {
              "@type":
                "Toshkent shahri, Yakkasaroy tumani Yakkasaroy MFY, Bog'ibo'ston ko'chasi, 147-uy",
              addressCountry: "UZ",
              addressRegion: "Toshkent",
            },
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+998-95-312-02-02",
              contactType: "Customer Service",
            },
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
