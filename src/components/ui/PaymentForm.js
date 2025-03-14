import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const PaymentForm = ({ onSubmit, price, tourName, onCancel }) => {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("+998");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const formatPhoneNumber = (value) => {
    // Remove all non-digits except the initial +998
    const digits = value.replace(/[^\d]/g, "");
    const afterPlus998 = digits.slice(3); // Get digits after +998

    // Limit to 9 digits after +998
    const limitedDigits = afterPlus998.slice(0, 9);

    // Format: +998 99 999 99 99
    let formatted = "+998";
    if (limitedDigits.length > 0) {
      formatted += " " + limitedDigits.slice(0, 2);
    }
    if (limitedDigits.length > 2) {
      formatted += " " + limitedDigits.slice(2, 5);
    }
    if (limitedDigits.length > 5) {
      formatted += " " + limitedDigits.slice(5, 7);
    }
    if (limitedDigits.length > 7) {
      formatted += " " + limitedDigits.slice(7, 9);
    }

    return formatted;
  };

  const handleNameChange = (e) => {
    const value = e.target.value;
    // Allow only letters and spaces
    if (/^[a-zA-Z\s]*$/.test(value)) {
      setName(value);
    }
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    // If user tries to modify +998, prevent it
    if (!value.startsWith("+998")) {
      setPhone(formatPhoneNumber("+998"));
      return;
    }

    const digits = value.replace(/[^\d]/g, "").slice(3); // Get digits after +998
    if (digits.length <= 9) {
      setPhone(formatPhoneNumber(value));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setError(t("please_enter_name"));
      return;
    }

    // Check if name contains only letters
    if (!/^[a-zA-Z\s]+$/.test(name)) {
      setError(t("name_letters_only"));
      return;
    }

    const phoneDigits = phone.replace(/[^\d]/g, "");
    if (phoneDigits.length !== 12) {
      // +998 + 9 digits = 12 total
      setError(t("phone_must_be_9_digits"));
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await onSubmit({ name, phone: phoneDigits }); // Send only digits to backend
    } catch (error) {
      setError(error.message || t("payment_error"));
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white/90 backdrop-blur-md p-6 rounded-xl shadow-lg border border-green-200 mb-6">
      <h3 className="text-xl font-semibold text-green-800 mb-4">
        {t("payment_details")}
      </h3>

      <div className="mb-4">
        <p className="text-gray-700 mb-2">
          {t("tour")}: <span className="font-medium">{tourName}</span>
        </p>
        <p className="text-gray-700">
          {t("price")}:{" "}
          <span className="font-medium text-green-600">
            {price} {t("sum")}
          </span>
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 mb-2">
            {t("your_name")} *
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={handleNameChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder={t("name_placeholder")}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="phone" className="block text-gray-700 mb-2">
            {t("your_phone")} *
          </label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={handlePhoneChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="+998 99 999 99 99"
            required
          />
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            type="button"
            onClick={onCancel}
            className="w-full bg-white text-green-700 border-2 border-green-700 py-3 rounded-xl hover:bg-green-50 transition-all duration-300 font-medium"
            disabled={isSubmitting}
          >
            {t("cancel")}
          </button>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-600 to-green-800 text-white py-3 rounded-xl hover:from-green-700 hover:to-green-900 transition-all duration-300 font-medium"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                {t("processing")}
              </span>
            ) : (
              t("proceed_to_payment")
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PaymentForm;
