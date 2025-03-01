"use client";

import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [lang, setLang] = useState("uz");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedLang = localStorage.getItem("lang") || "uz";
      i18n.changeLanguage(storedLang);
      setLang(storedLang);
    }
  }, [i18n]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen && typeof window !== "undefined") {
      document.body.classList.add("overflow-hidden");
    } else if (typeof window !== "undefined") {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      if (typeof window !== "undefined") {
        document.body.classList.remove("overflow-hidden");
      }
    };
  }, [isMenuOpen]);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("lang", lng);
    setLang(lng);
    if (isMenuOpen) setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[999] shadow-md border-b-2 rounded-b-2xl border-black/20 transition-all duration-300 ${
        isScrolled ? "bg-[#22C55E]" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto p-2 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          <Link href="/" className="flex-shrink-0 flex items-center">
            <Image
              src="/1.png"
              alt="FAXR TRAVEL Logo"
              width={180}
              height={100}
              className="
                rounded-full 
                transition-all duration-300 
                md:w-[200px] md:h-[220px] 
                object-contain 
                filter brightness-200 contrast-150 saturate-125
              "
            />
          </Link>
          <div className="hidden lg:block">
            <ul className="flex space-x-8">
              {["about", "services", "trips", "contact"].map((item) => (
                <li key={item}>
                  <button
                    onClick={() =>
                      document
                        .getElementById(item)
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                    className={`relative px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ease-in-out ${
                      isScrolled
                        ? "text-white hover:text-black hover:bg-white/20"
                        : "text-white hover:text-black hover:bg-white/10"
                    }`}
                  >
                    {t(item)}
                    <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-white transition-all duration-300 ease-in-out group-hover:w-full group-hover:left-0" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center space-x-2 md:space-x-4">
            <div className="relative group">
              <button
                onClick={() => {
                  if (isMenuOpen) setIsMenuOpen(false);
                }}
                className="flex items-center bg-white text-green-500 text-sm rounded-md border border-green-500 px-2 md:px-4 py-1 md:py-2 transition duration-150 ease-in-out hover:bg-green-50"
              >
                {lang.toUpperCase()}
                <ChevronDown className="w-3 h-3 md:w-4 md:h-4 ml-1 md:ml-2" />
              </button>
              <ul className="absolute left-0 w-20 bg-white border border-green-500 rounded-lg shadow-md z-10 opacity-0 group-hover:opacity-100 group-hover:visible invisible transition-opacity duration-200">
                {["uz", "ru", "en"].map((lng) => (
                  <li
                    key={lng}
                    onClick={() => changeLanguage(lng)}
                    onMouseEnter={() => changeLanguage(lng)} // Added hover functionality
                    className="p-2 text-green-600 rounded-lg hover:bg-green-500 hover:text-white cursor-pointer text-center"
                  >
                    {lng.toUpperCase()}
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:hidden">
              <button
                onClick={toggleMenu}
                className="px-2 rounded-md text-white hover:bg-white/20 transition duration-150 ease-in-out"
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>

              {isMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 bg-black/50 z-40"
                    onClick={toggleMenu}
                  />
                  <ul className="absolute right-4 top-16 w-48 bg-white border border-green-500 rounded-lg shadow-md z-50 transition-all">
                    {["about", "services", "trips", "contact"].map((item) => (
                      <li
                        key={item}
                        onClick={() => {
                          document
                            .getElementById(item)
                            ?.scrollIntoView({ behavior: "smooth" });
                          setIsMenuOpen(false);
                        }}
                        className="p-3 text-green-600 hover:bg-green-500 hover:text-white cursor-pointer transition-all duration-150 ease-in-out flex items-center space-x-2"
                      >
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                        <span>{t(item)}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
