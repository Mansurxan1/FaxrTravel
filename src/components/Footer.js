"use client";

import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { FaInstagram, FaPhoneAlt, FaTelegram } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Footer() {
  const { t } = useTranslation();

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-green-600 border-t border-green-500 shadow-2xl text-white">
      <div className="pl-6 py-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 text-center sm:text-left sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
          <motion.div
            className="space-y-4 sm:space-y-6 flex flex-col items-center sm:items-start"
            {...fadeInUp}
          >
            <Link
              href="/"
              className="block transition-opacity flex items-center justify-center hover:opacity-80"
            >
              <Image
                src="/logo.png"
                alt="Faxr Travel"
                width={80}
                height={64}
                className="
                  w-auto h-12 sm:h-16 mx-auto 
                  filter brightness-150 contrast-110
                "
                priority
              />
            </Link>
            <div className="flex flex-col items-center sm:items-start space-y-2">
              <div className="flex items-center justify-center space-x-2">
                <p className="text-sm leading-relaxed">{t("address")}</p>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <FaPhoneAlt className="w-5 h-5 text-white" />
                <a
                  href="tel:+998953120202"
                  className="text-sm hover:underline transition-colors duration-300"
                >
                  {t("phone")}
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="space-y-4 items-center flex flex-col sm:space-y-6"
            {...fadeInUp}
          >
            <h3 className="font-semibold text-lg sm:text-xl text-white">
              {t("footer.navigation")}
            </h3>
            <nav className="flex flex-col items-center sm:items-start space-y-2 sm:space-y-3">
              <div
                onClick={() => handleScroll("about")}
                className="text-sm text-white cursor-pointer hover:text-green-200 transition-colors duration-300"
              >
                {t("about")}
              </div>
              <div
                onClick={() => handleScroll("services")}
                className="text-sm text-white cursor-pointer hover:text-green-200 transition-colors duration-300"
              >
                {t("services")}
              </div>
              <div
                onClick={() => handleScroll("trips")}
                className="text-sm text-white cursor-pointer hover:text-green-200 transition-colors duration-300"
              >
                {t("trips")}
              </div>
              <div
                onClick={() => handleScroll("contact")}
                className="text-sm text-white cursor-pointer hover:text-green-200 transition-colors duration-300"
              >
                {t("contact")}
              </div>
            </nav>
          </motion.div>

          <motion.div className="space-y-4 sm:space-y-6" {...fadeInUp}>
            <h3 className="font-semibold text-lg sm:text-xl text-white">
              {t("footer.legal")}
            </h3>
            <nav className="flex flex-col items-center sm:items-start space-y-2 sm:space-y-3">
              <a
                href="/Shartnoma.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm hover:text-green-200 transition-colors duration-300"
              >
                {t("footer.agreement")}
              </a>
            </nav>
          </motion.div>

          <motion.div
            className="space-y-4 sm:space-y-6 flex flex-col items-center"
            {...fadeInUp}
          >
            <h3 className="font-semibold text-lg sm:text-xl text-white">
              {t("social_media")}
            </h3>
            <div className="flex justify-center space-x-6">
              <a
                href="https://instagram.com/faxr.travel"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity duration-300"
              >
                <FaInstagram className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                <span className="sr-only">Instagram</span>
              </a>
              <a
                href="https://t.me/faxrtravel"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity duration-300"
              >
                <FaTelegram className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                <span className="sr-only">Telegram</span>
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="mt-8 sm:mt-12 pt-6 sm:pt-8 text-center text-sm border-t border-green-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <p className="text-white">
            © {new Date().getFullYear()} Faxr-Travel.uz {t("footer.copyright")}
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
