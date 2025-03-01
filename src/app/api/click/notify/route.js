import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { fiscalizeReceipt, getOrderInfo } from '../route';

// Коды ошибок Click
const CLICK_ERROR_CODES = {
  0: 'Успешно',
  1: 'Ошибка в запросе от CLICK',
  2: 'Ошибка авторизации',
  3: 'Транзакция не найдена',
  4: 'Транзакция уже подтверждена',
  5: 'Транзакция уже отменена',
  6: 'Ошибка при выполнении операции',
  7: 'Системная ошибка',
  8: 'Неверная сумма',
  9: 'Неверный статус транзакции'
};

export async function POST(request) {
  try {
    const body = await request.json();
    console.log('Получено уведомление от Click:', body);
    
    // Проверяем наличие всех необходимых параметров
    const {
      click_trans_id,
      service_id,
      merchant_trans_id,
      merchant_prepare_id,
      amount,
      action,
      error,
      error_note,
      sign_time,
      sign_string
    } = body;
    
    if (!click_trans_id || !service_id || !merchant_trans_id || !amount || !action || !sign_time || !sign_string) {
      console.error('Отсутствуют обязательные параметры в уведомлении от Click:', body);
      return NextResponse.json({
        error: -1,
        error_note: 'Отсутствуют обязательные параметры'
      }, { status: 400 });
    }
    
    // Получаем секретный ключ из переменных окружения
    const secretKey = process.env.CLICK_SECRET_KEY;
    
    if (!secretKey) {
      console.error('Отсутствует секретный ключ в переменных окружения');
      return NextResponse.json({
        error: -1,
        error_note: 'Ошибка конфигурации сервера'
      }, { status: 500 });
    }
    
    // Проверяем подпись запроса
    const signString = `${click_trans_id}${service_id}${merchant_trans_id}${merchant_prepare_id || ''}${amount}${action}${sign_time}${secretKey}`;
    const expectedSign = crypto.createHash('md5').update(signString).digest('hex');
    
    if (sign_string !== expectedSign) {
      console.error('Неверная подпись запроса:', {
        received: sign_string,
        expected: expectedSign
      });
      return NextResponse.json({
        error: -1,
        error_note: 'Неверная подпись запроса'
      }, { status: 400 });
    }
    
    // Обрабатываем уведомление в зависимости от типа действия
    // 0 - Проверка заказа (Prepare)
    // 1 - Подтверждение платежа (Complete)
    if (action === 0) {
      // Проверка заказа
      // Получаем информацию о заказе из сохраненных данных
      const orderInfo = await getOrderInfo(merchant_trans_id);
      
      if (!orderInfo) {
        console.error('Заказ не найден:', merchant_trans_id);
        return NextResponse.json({
          error: -1,
          error_note: 'Заказ не найден'
        }, { status: 404 });
      }
      
      console.log('Проверка заказа:', merchant_trans_id, orderInfo);
      
      return NextResponse.json({
        click_trans_id,
        merchant_trans_id,
        merchant_prepare_id: merchant_trans_id, // В данном случае используем тот же ID
        error: 0,
        error_note: 'Success'
      });
    } else if (action === 1) {
      // Подтверждение платежа
      console.log('Подтверждение платежа:', merchant_trans_id);
      
      // Получаем информацию о заказе из сохраненных данных
      const orderInfo = await getOrderInfo(merchant_trans_id);
      
      if (!orderInfo) {
        console.error('Заказ не найден:', merchant_trans_id);
        return NextResponse.json({
          error: -1,
          error_note: 'Заказ не найден'
        }, { status: 404 });
      }
      
      // Обновляем статус заказа
      orderInfo.status = 'Оплачен';
      orderInfo.paidAt = new Date().toISOString();
      orderInfo.clickTransId = click_trans_id;
      
      // Сохраняем обновленную информацию о заказе
      // В реальном приложении здесь должно быть обновление статуса заказа в базе данных
      
      // Отправляем уведомление в Telegram
      await sendTelegramNotification({
        orderId: merchant_trans_id,
        clickTransId: click_trans_id,
        amount,
        tourName: orderInfo.tourName,
        userName: orderInfo.userName,
        userPhone: orderInfo.userPhone,
        status: 'Оплачен'
      });
      
      // Фискализация чека с использованием данных из сохраненного заказа
      const fiscalResult = await fiscalizeReceipt({
        orderId: merchant_trans_id,
        tourName: orderInfo.tourName,
        price: amount,
        userName: orderInfo.userName,
        userPhone: orderInfo.userPhone
      });
      
      if (!fiscalResult.success) {
        console.error('Ошибка при фискализации чека:', fiscalResult.error);
        // Отправляем уведомление об ошибке фискализации
        await sendTelegramNotification({
          orderId: merchant_trans_id,
          clickTransId: click_trans_id,
          amount,
          tourName: orderInfo.tourName,
          userName: orderInfo.userName,
          userPhone: orderInfo.userPhone,
          status: 'Ошибка фискализации',
          error: fiscalResult.error
        });
      } else {
        console.log('Чек успешно фискализирован:', fiscalResult.fiscalData);
        // Отправляем уведомление об успешной фискализации
        await sendTelegramNotification({
          orderId: merchant_trans_id,
          clickTransId: click_trans_id,
          amount,
          tourName: orderInfo.tourName,
          userName: orderInfo.userName,
          userPhone: orderInfo.userPhone,
          status: 'Фискализирован',
          fiscalData: fiscalResult.fiscalData
        });
      }
      
      return NextResponse.json({
        click_trans_id,
        merchant_trans_id,
        merchant_confirm_id: merchant_trans_id, // В данном случае используем тот же ID
        error: 0,
        error_note: 'Success'
      });
    } else {
      console.error('Неизвестный тип действия:', action);
      return NextResponse.json({
        error: -1,
        error_note: 'Неизвестный тип действия'
      }, { status: 400 });
    }
  } catch (error) {
    console.error('Ошибка при обработке уведомления от Click:', error);
    return NextResponse.json({
      error: -1,
      error_note: 'Внутренняя ошибка сервера'
    }, { status: 500 });
  }
}

// Функция для отправки уведомления в Telegram
async function sendTelegramNotification(paymentData) {
  try {
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID || '5283151626';
    
    let message = `
💰 Платеж #${paymentData.orderId}
🔢 Click ID: ${paymentData.clickTransId}
💵 Сумма: ${paymentData.amount} сум
`;

    // Добавляем информацию о туре и клиенте, если она есть
    if (paymentData.tourName) {
      message += `🏙️ Тур: ${paymentData.tourName}\n`;
    }
    
    if (paymentData.userName) {
      message += `👤 Клиент: ${paymentData.userName}\n`;
    }
    
    if (paymentData.userPhone) {
      message += `📱 Телефон: ${paymentData.userPhone}\n`;
    }
    
    message += `🔄 Статус: ${paymentData.status}
⏱️ Дата: ${new Date().toLocaleString('ru-RU')}
    `;
    
    if (paymentData.error) {
      message += `\n❌ Ошибка: ${paymentData.error}`;
    }
    
    if (paymentData.fiscalData) {
      message += `\n✅ Фискальный чек: ${paymentData.fiscalData.receipt_id || 'Создан'}`;
    }
    
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'HTML'
      }),
    });
    
    const data = await response.json();
    if (!data.ok) {
      console.error('Ошибка отправки в Telegram:', data);
    }
  } catch (error) {
    console.error('Ошибка при отправке уведомления в Telegram:', error);
  }
} 