"use client";

import { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useTranslation } from "react-i18next";
import useUserStore from "@s/store/userStore";
import Cookies from "js-cookie";

const LoginModal = ({ isOpen, onClose, onLoginSuccess }) => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isRegisterMode, setIsRegisterMode] = useState(false);

  const setUser = useUserStore((state) => state.setUser);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const user = { id: 1, email };
      const token = "dummy_token_for_local_auth";
      
      Cookies.set("token", token, { expires: 7, secure: true });
      setUser(user, token);
      console.log("User logged in:", { user, token });
      onLoginSuccess(user);
      onClose();
    } catch (error) {
      setError("Произошла ошибка при входе в систему.");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const user = { id: 1, email };
      const token = "dummy_token_for_local_auth";
      
      Cookies.set("token", token, { expires: 7, secure: true });
      setUser(user, token);
      console.log("User registered:", { user, token });
      alert("Регистрация успешна!");
      onLoginSuccess(user);
      onClose();
    } catch (error) {
      setError("Произошла ошибка при регистрации.");
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          className="bg-white rounded-xl p-6 w-full max-w-md shadow-2xl relative"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
          >
            <X className="w-6 h-6" />
          </button>

          <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            {isRegisterMode ? t("register") : t("login")}
          </h3>

          <form
            onSubmit={isRegisterMode ? handleRegister : handleLogin}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
                placeholder="example@email.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
                placeholder="Password"
                required
              />
            </div>
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}
            <button
              type="submit"
              className="w-full bg-[#22C55E] text-white font-medium py-2 rounded-md hover:bg-green-600 transition duration-200"
            >
              {isRegisterMode ? t("register") : t("login")}
            </button>
            <p className="text-center text-sm text-gray-600">
              {isRegisterMode ? "Already registered?" : "Not registered yet?"}{" "}
              <button
                type="button"
                onClick={() => setIsRegisterMode(!isRegisterMode)}
                className="text-green-500 hover:underline"
              >
                {isRegisterMode ? t("login") : t("register")}
              </button>
            </p>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoginModal;
