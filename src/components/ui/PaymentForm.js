import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const PaymentForm = ({ onSubmit, price, tourName, onCancel }) => {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!name.trim()) {
      setError(t('please_enter_name'));
      return;
    }
    
    if (!phone.trim()) {
      setError(t('please_enter_phone'));
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      await onSubmit({ name, phone });
    } catch (error) {
      setError(error.message || t('payment_error'));
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white/90 backdrop-blur-md p-6 rounded-xl shadow-lg border border-green-200 mb-6">
      <h3 className="text-xl font-semibold text-green-800 mb-4">
        {t('payment_details')}
      </h3>
      
      <div className="mb-4">
        <p className="text-gray-700 mb-2">
          {t('tour')}: <span className="font-medium">{tourName}</span>
        </p>
        <p className="text-gray-700">
          {t('price')}: <span className="font-medium text-green-600">{price} {t('sum')}</span>
        </p>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 mb-2">
            {t('your_name')} *
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder={t('name_placeholder')}
            required
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="phone" className="block text-gray-700 mb-2">
            {t('your_phone')} *
          </label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="+998 XX XXX XX XX"
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
            {t('cancel')}
          </button>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-600 to-green-800 text-white py-3 rounded-xl hover:from-green-700 hover:to-green-900 transition-all duration-300 font-medium"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {t('processing')}
              </span>
            ) : (
              t('proceed_to_payment')
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PaymentForm; 