'use client';

import React, { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslation } from 'react-i18next';

const PaymentSuccessPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t } = useTranslation();
  
  useEffect(() => {
    // Получаем параметры из URL
    const transactionId = searchParams.get('transaction_id');
    const orderId = searchParams.get('merchant_trans_id');
    
    // Здесь можно выполнить дополнительные действия, например, проверить статус платежа
    
    // Отправляем уведомление в Telegram (опционально)
    const sendNotification = async () => {
      try {
        if (transactionId && orderId) {
          await fetch('/api/telegram/notify', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              message: `✅ Клиент вернулся на страницу успешной оплаты\n🆔 ID заказа: ${orderId}\n🆔 ID транзакции Click: ${transactionId}`,
            }),
          });
        }
      } catch (error) {
        console.error('Ошибка при отправке уведомления:', error);
      }
    };
    
    sendNotification();
  }, [searchParams]);
  
  const handleGoHome = () => {
    router.push('/');
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-white to-green-50 p-6">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        <h2 className="text-3xl font-bold text-gray-800 mb-4">{t('payment_success')}</h2>
        
        <p className="text-gray-600 mb-8">
          {t('payment_success_message')}
        </p>
        
        <button
          onClick={handleGoHome}
          className="w-full bg-gradient-to-r from-green-600 to-green-800 text-white py-4 rounded-xl hover:from-green-700 hover:to-green-900 hover:shadow-lg transition-all duration-300 font-semibold text-lg shadow-md"
        >
          {t('back_to_home')}
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccessPage; 