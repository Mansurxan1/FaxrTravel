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
      value: "24/7",
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

  const [headerRef, headerInView, headerEntry] = useInView({
    threshold: 0.2,
    triggerOnce: false,
  });
  const [achievementsRef, achievementsInView, achievementsEntry] = useInView({
    threshold: 0.2,
    triggerOnce: false,
  });
  const [aboutRef, aboutInView, aboutEntry] = useInView({
    threshold: 0.2,
    triggerOnce: false,
  });
  const [servicesRef, servicesInView, servicesEntry] = useInView({
    threshold: 0.2,
    triggerOnce: false,
  });
  const [contactRef, contactInView, contactEntry] = useInView({
    threshold: 0.2,
    triggerOnce: false,
  });
  const [testimonialsRef, testimonialsInView, testimonialsEntry] = useInView({
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
    if (headerInView && scrollingDown) {
      controls.header.start("visible");
    }
  }, [headerInView, scrollingDown, controls.header]);

  useEffect(() => {
    if (achievementsInView && scrollingDown) {
      controls.achievements.start("visible");
    }
  }, [achievementsInView, scrollingDown, controls.achievements]);

  useEffect(() => {
    if (aboutInView && scrollingDown) {
      controls.about.start("visible");
    }
  }, [aboutInView, scrollingDown, controls.about]);

  useEffect(() => {
    if (servicesInView && scrollingDown) {
      controls.services.start("visible");
    }
  }, [servicesInView, scrollingDown, controls.services]);

  useEffect(() => {
    if (contactInView && scrollingDown) {
      controls.contact.start("visible");
    }
  }, [contactInView, scrollingDown, controls.contact]);

  useEffect(() => {
    if (testimonialsInView && scrollingDown) {
      controls.testimonials.start("visible");
    }
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
          >
            <motion.div
              className="flex justify-center items-center mb-8"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
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
          >
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-3 text-center text-white shadow-lg"
                variants={itemVariants}
              >
                <achievement.icon className="w-8 h-8 mx-auto mb-4 text-green-100" />
                <motion.h3 className="text-2xl font-bold mb-2">
                  {achievementsInView &&
                  scrollingDown &&
                  achievement.value !== "24/7" ? (
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
            className="backdrop-blur-lg rounded-3xl bg-[#22C55E] p-8 md:p-12 mb-16 border border-white/20 shadow-xl"
            variants={containerVariants}
            initial="hidden"
            animate={controls.about}
          >
            <h2 className="text-3xl font-bold text-white mb-6 text-center">
              {t("about")}
            </h2>
            <p className="text-green-100 text-lg leading-relaxed text-justify">
              <span className="font-bold">{t("leader")} </span>
              {t("about_text")}
            </p>
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
                  className="backdrop-blur-lg rounded-2xl p-6 text-center border border-white/20 text-red shadow-lg"
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

          <motion.div
            ref={contactRef}
            id="contact"
            className="bg-white/10 bg-[#22C55E] backdrop-blur-lg rounded-3xl p-8 md:p-12 mb-16 border border-white/20 shadow-xl"
            variants={containerVariants}
            initial="hidden"
            animate={controls.contact}
          >
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              {t("contact_title")}
            </h2>
            <div className="space-y-6">
              <div className="flex flex-col items-center gap-6">
                <motion.a
                  href="tel:+998953120202"
                  className="inline-flex items-center gap-3 bg-[#22C55E] text-white px-8 py-4 rounded-full text-base md:text-lg font-semibold shadow-lg transition duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaPhoneAlt className="animate-bounce" />
                  {t("phone")}
                </motion.a>
                <div className="text-center space-y-2">
                  <div className="flex items-center justify-center gap-2 text-green-100">
                    <FaMapMarkerAlt className="text-green-100 flex-shrink-0" />
                    <p>{t("address")}</p>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-6">
                  <h3 className="font-bold text-lg text-white">
                    {t("social_media")}
                  </h3>
                  <div className="flex gap-6 text-3xl">
                    <motion.a
                      href="https://instagram.com/faxr.travel"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-white transition"
                      whileHover={{ scale: 1.2, rotate: 15 }}
                    >
                      <FaInstagram />
                    </motion.a>
                    <motion.a
                      href="https://t.me/faxrtravel"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-white transition"
                      whileHover={{ scale: 1.2, rotate: -15 }}
                    >
                      <FaTelegram />
                    </motion.a>
                    <motion.a
                      href="mailto:abdulaziiizzz7@gmail.com"
                      className="flex items-center gap-2 text-white transition"
                      whileHover={{ scale: 1.2 }}
                    >
                      <FaEnvelope />
                    </motion.a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {testimonials.length > 0 && (
            <motion.div
              ref={testimonialsRef}
              variants={containerVariants}
              initial="hidden"
              animate={controls.testimonials}
            >
              <div className="bg-white/10 bg-[#22C55E] backdrop-blur-lg rounded-3xl p-8 md:p-12 text-center border border-white/20 shadow-xl">
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
