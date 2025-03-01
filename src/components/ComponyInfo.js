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
} from "react-icons/fa";
import { FaBuildingColumns } from "react-icons/fa6";
import { motion, useAnimation } from "framer-motion";
import CountUp from "react-countup";
import Tour from "./ui/Tour";
import Partners from "./Partners";

const CompanyInfo = () => {
  const { t } = useTranslation();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

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

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, staggerChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
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
    { icon: FaPhoneAlt, text: t("tour_package.support") },
  ];

  const achievementRefs = achievements.map(() => useRef(null));
  const achievementInView = achievements.map((_, index) => {
    const [ref, inView] = useInView({
      triggerOnce: true,
      threshold: 0.1,
    });
    achievementRefs[index].current = ref;
    return inView;
  });

  return (
    <main className="min-h-screen bg-gradient-to-br bg-[#22C55E]">
      <section className="relative py-10 px-4 overflow-hidden">
        <motion.div
          className="max-w-6xl mx-auto relative z-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="text-center mb-16" variants={itemVariants}>
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
            className="grid grid-cols-2 bg-[#22C55E]  md:grid-cols-4 gap-6 mb-16"
            variants={itemVariants}
          >
            {achievements.map((achievement, index) => {
              const controls = useAnimation();

              useEffect(() => {
                if (achievementInView[index]) {
                  controls.start({ opacity: 1, y: 0 });
                }
              }, [controls, achievementInView, index]);

              return (
                <motion.div
                  key={index}
                  ref={achievementRefs[index].current}
                  className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-6 text-center text-white shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={controls}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <achievement.icon className="w-8 h-8 mx-auto mb-4 text-green-100" />
                  <motion.h3
                    className="text-2xl font-bold mb-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  >
                    {achievementInView[index] &&
                    achievement.value !== "24/7" ? (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                      >
                        <CountUp
                          start={0}
                          end={achievement.value}
                          duration={5}
                          separator=","
                        />
                        {achievement.suffix}
                      </motion.span>
                    ) : (
                      achievement.value
                    )}
                  </motion.h3>
                  <p className="text-green-100 text-sm">{achievement.text}</p>
                </motion.div>
              );
            })}
          </motion.div>
          <Partners />
          <Tour />
          <motion.div
            id="about"
            className=" backdrop-blur-lg rounded-3xl bg-[#22C55E]  p-8 md:p-12 mb-16 border border-white/20 shadow-xl"
            variants={itemVariants}
          >
            <h2 className="text-3xl font-bold text-white mb-6 text-center">
              {t("about")}
            </h2>
            <p className="text-green-100 text-lg leading-relaxed text-justify">
              {t("about_text")}
            </p>
          </motion.div>

          <motion.div
            id="services"
            className="mb-16 bg-[#22C55E] "
            variants={itemVariants}
          >
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              {t("tour_package_title")}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {tourPackageIncludes.map((service, index) => (
                <motion.div
                  key={index}
                  className="backdrop-blur-lg rounded-2xl p-6 text-center border border-white/20 text-red shadow-lg"
                  whileHover={{
                    scale: 1.1,
                    backgroundColor: "rgba(255,255,255,0.2)",
                  }}
                >
                  <service.icon className="w-10 h-10 mx-auto mb-4 text-white" />
                  <p className="text-white font-medium">{service.text}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            id="contact"
            className="bg-white/10 bg-[#22C55E]  backdrop-blur-lg rounded-3xl p-8 md:p-12 mb-16 border border-white/20 shadow-xl"
            variants={itemVariants}
          >
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              {t("contact_title")}
            </h2>
            <div className="space-y-6 ">
              <div className="flex flex-col items-center gap-6">
                <motion.a
                  href="tel:+998953120202"
                  className="inline-flex items-center gap-3 bg-[#22C55E] text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg transition duration-300"
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
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {testimonials.length > 0 && (
            <motion.div variants={itemVariants}>
              <div className="bg-white/10 bg-[#22C55E]  backdrop-blur-lg rounded-3xl p-8 md:p-12 text-center border border-white/20 shadow-xl">
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
        </motion.div>
      </section>
    </main>
  );
};

export default CompanyInfo;
