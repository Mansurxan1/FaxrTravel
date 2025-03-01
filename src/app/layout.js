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
  const { i18n } = useTranslation();
  const [lang, setLang] = useState("uz");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedLang = localStorage.getItem("lang") || "uz";
      i18n.changeLanguage(storedLang);
      setLang(storedLang);
    }
  }, [i18n]);

  return (
    <html lang={lang}>
      <head>
        <title>Faxr Travel</title>
        <link rel="icon" href="/2.jpg" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
