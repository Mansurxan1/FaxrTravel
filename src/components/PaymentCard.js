"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const PaymentCard = () => {
  const { t } = useTranslation();

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, delay: 0.2 },
    },
  };

  return (
    <section className="p-5">
      <motion.div
        className="bg-gradient-to-br bg-[#22C55E] mx-auto max-w-[1256px] p-8 md:p-12 rounded-3xl  mb-16 shadow-[0_15px_60px_rgba(34,197,94,0.4)] text-white font-sans border border-white/20 overflow-hidden relative"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.05),transparent_50%,rgba(255,255,255,0.05))] pointer-events-none"></div>

        <motion.div
          className="text-xl md:text-2xl mb-6 leading-relaxed relative z-10 text-left"
          variants={textVariants}
        >
          <span className="font-light text-white/90 tracking-wide">
            {t("payment_methods")}{" "}
          </span>
          <span className="font-semibold text-2xl md:text-3xl px-2 py-2 ">
            {t("click")}
          </span>
          <span className="text-lg md:text-xl text-white/70 "></span>
          <span className="font-semibold text-2xl md:text-3xl py-2">
            {t("cash")}
          </span>
        </motion.div>

        <motion.div
          className="text-base md:text-lg italic text-white/85 bg-gradient-to-r from-white/10 to-transparent px-8 py-4 rounded-full shadow-md relative z-10 border border-white/20 text-left"
          variants={textVariants}
        >
          {t("future_note")}
        </motion.div>

        <motion.div
          className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </motion.div>
    </section>
  );
};

export default PaymentCard;
