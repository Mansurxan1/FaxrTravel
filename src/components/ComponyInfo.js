"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useInView } from "react-intersection-observer";
import {
  FaPhoneAlt,
  FaInstagram,
  FaTelegram,
  FaPlane,
  FaHotel,
  FaCoffee,
  FaCar,
  FaMapMarkerAlt,
  FaStar,
  FaGlobeAsia,
  FaQuoteLeft,
  FaUsers,
  FaClock,
  FaEnvelope,
  FaPassport,
} from "react-icons/fa";
import { FaBuildingColumns } from "react-icons/fa6";
import { motion, useAnimation } from "framer-motion";
import CountUp from "react-countup";
import Tour from "./ui/Tour";
import Partners from "./Partners";

const CompanyInfo = () => {
  const { t } = useTranslation();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollingDown, setScrollingDown] = useState(false);

  const testimonials = t("testimonials", { returnObjects: true }) || [];
  if (!Array.isArray(testimonials)) {
    console.error("Testimonials is not an array:", testimonials);
  }

  useEffect(() => {
    if (testimonials.length > 0) {
      const interval = setInterval(() => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [testimonials.length]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollingDown(currentScrollY > lastScrollY);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const achievements = [
    {
      icon: FaBuildingColumns,
      text: t("achievements.official"),
      value: 100,
      suffix: "%",
    },
    {
      icon: FaUsers,
      text: t("achievements.clients"),
      value: 1000,
      suffix: "+",
    },
    {
      icon: FaGlobeAsia,
      text: t("achievements.destinations"),
      value: 50,
      suffix: "+",
    },
    {
      icon: FaClock,
      text: t("achievements.service"),
      value: "9:00 - 21:00",
      suffix: "",
    },
  ];

  const tourPackageIncludes = [
    { icon: FaPlane, text: t("tour_package.flight") },
    { icon: FaHotel, text: t("tour_package.hotel") },
    { icon: FaCoffee, text: t("tour_package.food") },
    { icon: FaCar, text: t("tour_package.transfer") },
    { icon: FaStar, text: t("tour_package.guides") },
    { icon: FaPassport, text: t("tour_package.support") },
  ];

  const [headerRef, headerInView] = useInView({
    threshold: 0.2,
    triggerOnce: false,
  });
  const [achievementsRef, achievementsInView] = useInView({
    threshold: 0.2,
    triggerOnce: false,
  });
  const [aboutRef, aboutInView] = useInView({
    threshold: 0.2,
    triggerOnce: false,
  });
  const [servicesRef, servicesInView] = useInView({
    threshold: 0.2,
    triggerOnce: false,
  });
  const [contactRef, contactInView] = useInView({
    threshold: 0.2,
    triggerOnce: false,
  });
  const [testimonialsRef, testimonialsInView] = useInView({
    threshold: 0.2,
    triggerOnce: false,
  });

  const controls = {
    header: useAnimation(),
    achievements: useAnimation(),
    about: useAnimation(),
    services: useAnimation(),
    contact: useAnimation(),
    testimonials: useAnimation(),
  };

  useEffect(() => {
    if (headerInView && scrollingDown) controls.header.start("visible");
  }, [headerInView, scrollingDown, controls.header]);

  useEffect(() => {
    if (achievementsInView && scrollingDown)
      controls.achievements.start("visible");
  }, [achievementsInView, scrollingDown, controls.achievements]);

  useEffect(() => {
    if (aboutInView && scrollingDown) controls.about.start("visible");
  }, [aboutInView, scrollingDown, controls.about]);

  useEffect(() => {
    if (servicesInView && scrollingDown) controls.services.start("visible");
  }, [servicesInView, scrollingDown, controls.services]);

  useEffect(() => {
    if (contactInView && scrollingDown) controls.contact.start("visible");
  }, [contactInView, scrollingDown, controls.contact]);

  useEffect(() => {
    if (testimonialsInView && scrollingDown)
      controls.testimonials.start("visible");
  }, [testimonialsInView, scrollingDown, controls.testimonials]);

  return (
    <main className="min-h-screen bg-gradient-to-br bg-[#22C55E]">
      <section className="relative py-10 px-4 overflow-hidden">
        <div className="max-w-[1256px] mx-auto relative z-10">
          <motion.div
            ref={headerRef}
            className="text-center mb-16"
            variants={containerVariants}
            initial="hidden"
            animate={controls.header}
            viewport={{ once: true, amount: 0.1 }}
          >
            <motion.div
              className="flex justify-center items-center mb-8"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 100 }}
            >
              <div className="w-32 h-32 p-1 bg-gradient-to-r bg-[#22C55E] rounded-full">
                <div className="border-4 border-white rounded-full overflow-hidden">
                  <img
                    src="/2.jpg"
                    alt={t("company_name")}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <h2 className="text-4xl ml-5 md:text-5xl font-bold text-white mb-4">
                {t("company_name")}
              </h2>
            </motion.div>
            <p className="text-white text-xl font-semibold mb-2">
              {t("company_type")}
            </p>
          </motion.div>

          <motion.div
            ref={achievementsRef}
            className="grid grid-cols-2 bg-[#22C55E] md:grid-cols-4 gap-6 mb-16"
            variants={containerVariants}
            initial="hidden"
            animate={controls.achievements}
            viewport={{ once: true, amount: 0.1 }}
          >
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-3 text-center text-white shadow-lg"
                variants={itemVariants}
              >
                <achievement.icon className="w-8 h-8 mx-auto mb-4 text-green-100" />
                <motion.h3 className="text-sm sm:text-xl font-bold mb-2">
                  {achievementsInView &&
                  scrollingDown &&
                  typeof achievement.value === "number" ? (
                    <CountUp
                      start={0}
                      end={achievement.value}
                      duration={5}
                      separator=","
                    />
                  ) : (
                    achievement.value
                  )}
                  {achievement.suffix}
                </motion.h3>
                <p className="text-green-100 text-sm">{achievement.text}</p>
              </motion.div>
            ))}
          </motion.div>

          <Partners />
          <Tour />

          <motion.div
            ref={aboutRef}
            id="about"
            className="backdrop-blur-lg rounded-3xl bg-[#22C55E] p-6 mb-10 border border-white/20 shadow-xl"
            variants={containerVariants}
            initial="hidden"
            animate={controls.about}
          >
            <h2 className="text-3xl font-bold text-white mb-6 text-center">
              {t("about")}
            </h2>
            <p className="text-green-100 text-lg leading-relaxed text-justify">
              {t("about_text")}
            </p>
          </motion.div>
          <motion.div
            ref={contactRef}
            id="contact"
            className="relative rounded-3xl mx-2 mb-5 p-4 md:p-6 shadow-2xl overflow-hidden"
            variants={containerVariants}
            initial="hidden"
            animate={controls.contact}
          >
            <div className="absolute inset-0 bg-white/10 backdrop-blur-md rounded-3xl z-0" />

            <h2 className="relative text-2xl md:text-3xl font-extrabold text-white text-center mb-8 md:mb-12 z-10 drop-shadow-lg">
              {t("contact_title")}
            </h2>

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <motion.div
                className="p-4 rounded-xl shadow-lg border border-white/20 flex flex-col items-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                whileHover={{ scale: 1.03 }}
              >
                <h3 className="text-xl md:text-2xl font-bold text-white text-center mb-2">
                  {t("leader_name")}
                </h3>
                <p className="text-green-100 text-base md:text-lg font-semibold text-center">
                  {t("leader")}
                </p>
                <span className="text-sm md:text-base text-white text-justify mt-2">
                  {t("leaderinfo") || "Leading with passion and expertise."}
                </span>
              </motion.div>

              <motion.div
                className="p-4 bg-white/10 rounded-xl shadow-lg border border-white/20 flex flex-col items-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                whileHover={{ scale: 1.03 }}
              >
                <FaMapMarkerAlt className="text-white text-3xl md:text-4xl mb-3 md:mb-4" />
                <p className="text-white text-sm md:text-lg text-center mb-2 md:mb-3">
                  {t("address")}
                </p>
                <div className="flex items-center gap-2 text-white">
                  <FaClock className="text-white h-4 w-4 md:h-5 md:w-5" />
                  <p className="text-sm md:text-base">
                    {t("everyday")}: 9:00 - 21:00
                  </p>
                </div>
              </motion.div>
            </div>

            <motion.div
              className="relative z-10 mt-6 md:mt-8 flex justify-center"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <motion.a
                href="tel:+998953120202"
                className="inline-flex items-center gap-2 bg-white/20 text-white text-sm md:text-lg font-semibold px-4 py-2 md:px-6 md:py-3 rounded-full border border-white/30 shadow-md transition duration-300"
                whileHover={{
                  scale: 1.1,
                  backgroundColor: "rgba(255,255,255,0.3)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                <FaPhoneAlt className="h-4 w-4 md:h-5 md:w-5 animate-bounce" />
                {t("phone")}
              </motion.a>
            </motion.div>

            <div className="relative z-10 mt-6 md:mt-8 flex justify-center gap-6 md:gap-8 text-2xl md:text-4xl">
              <motion.a
                href="https://instagram.com/faxr.travel"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white transition"
                whileHover={{ scale: 1.2, rotate: 10, color: "#fff" }}
                aria-label="Visit our Instagram page"
              >
                <FaInstagram />
              </motion.a>
              <motion.a
                href="https://t.me/faxrtravel"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white transition"
                whileHover={{ scale: 1.2, rotate: -10, color: "#fff" }}
                aria-label="Visit our Telegram channel"
              >
                <FaTelegram />
              </motion.a>
              <motion.a
                href="mailto:abdulaziiizzz7@gmail.com"
                className="text-white transition"
                whileHover={{ scale: 1.2, color: "#fff" }}
                aria-label="Send us an email"
              >
                <FaEnvelope />
              </motion.a>
            </div>
          </motion.div>

          <motion.div
            ref={servicesRef}
            id="services"
            className="mb-16 bg-[#22C55E]"
            variants={containerVariants}
            initial="hidden"
            animate={controls.services}
          >
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              {t("tour_package_title")}
            </h2>
            <div className="grid grid-cols-1 custom:grid-cols-2 services:grid-cols-3 gap-6">
              {tourPackageIncludes.map((service, index) => (
                <motion.div
                  key={index}
                  className="backdrop-blur-lg rounded-2xl p-4 text-center border border-white/20 text-red shadow-lg"
                  variants={itemVariants}
                  whileHover={{
                    scale: 1.1,
                    backgroundColor: "rgba(255,255,255,0.2)",
                  }}
                >
                  <service.icon className="w-10 h-10 mx-auto mb-4 text-white" />
                  <p className="text-white font-medium text-justify">
                    {service.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {testimonials.length > 0 && (
            <motion.div
              ref={testimonialsRef}
              variants={containerVariants}
              initial="hidden"
              animate={controls.testimonials}
            >
              <div className="bg-white/10 bg-[#22C55E] backdrop-blur-lg rounded-3xl p-4 md:p-12 text-center border border-white/20 shadow-xl">
                <FaQuoteLeft className="w-8 h-8 mx-auto mb-6 text-green-200" />
                <motion.div
                  key={currentTestimonial}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-4"
                >
                  <p className="text-white text-lg md:text-xl italic">
                    {testimonials[currentTestimonial].text}
                  </p>
                  <div>
                    <p className="text-green-50 font-semibold">
                      {testimonials[currentTestimonial].author}
                    </p>
                    <p className="text-green-100 text-sm">
                      {testimonials[currentTestimonial].role}
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </main>
  );
};

export default CompanyInfo;
