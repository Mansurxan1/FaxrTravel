import { NextResponse } from 'next/server';
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { kv } from '@vercel/kv';

// Функция для сохранения информации о заказе
async function saveOrderInfo(orderData) {
  try {
    // Создаем директорию для хранения данных заказов, если она не существует
    const dataDir = path.join(process.cwd(), 'data');
    const ordersDir = path.join(dataDir, 'orders');
    
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir);
    }
    
    if (!fs.existsSync(ordersDir)) {
      fs.mkdirSync(ordersDir);
    }
    
    // Путь к файлу с данными заказа
    const orderFilePath = path.join(ordersDir, `${orderData.orderId}.json`);
    
    // Сохраняем данные заказа в файл
    fs.writeFileSync(orderFilePath, JSON.stringify(orderData, null, 2));
    
    console.log('Информация о заказе сохранена:', orderFilePath);
    return true;
  } catch (error) {
    console.error('Ошибка при сохранении информации о заказе:', error);
    return false;
  }
}

// Функция для получения информации о заказе
export async function getOrderInfo(orderId) {
  try {
    // Создаем директорию для хранения данных заказов, если она не существует
    const dataDir = path.join(process.cwd(), 'data');
    const ordersDir = path.join(dataDir, 'orders');
    
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir);
    }
    
    if (!fs.existsSync(ordersDir)) {
      fs.mkdirSync(ordersDir);
    }
    
    // Путь к файлу с данными заказа
    const orderFilePath = path.join(ordersDir, `${orderId}.json`);
    
    // Проверяем существование файла
    if (!fs.existsSync(orderFilePath)) {
      console.error('Файл с данными заказа не найден:', orderFilePath);
      return null;
    }
    
    // Читаем данные заказа из файла
    const orderData = JSON.parse(fs.readFileSync(orderFilePath, 'utf8'));
    
    return orderData;
  } catch (error) {
    console.error('Ошибка при получении информации о заказе:', error);
    return null;
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { tourId, tourName, price, userId, userName, userPhone } = body;

    console.log('Получен запрос на создание платежа:', body);

    if (!tourId || !tourName || !price) {
      console.error('Отсутствуют обязательные параметры:', { tourId, tourName, price });
      return NextResponse.json(
        { error: 'Отсутствуют обязательные параметры' },
        { status: 400 }
      );
    }

    // Генерируем уникальный ID заказа
    const orderId = Date.now().toString();
    
    // Получаем данные из переменных окружения
    const serviceId = process.env.CLICK_SERVICE_ID;
    const merchantId = process.env.CLICK_MERCHANT_ID;
    const merchantUserId = process.env.CLICK_MERCHANT_USER_ID;
    const secretKey = process.env.CLICK_SECRET_KEY;
    const spicCode = process.env.CLICK_SPIC_CODE;
    const packageCode = process.env.CLICK_PACKAGE_CODE;
    
    // Проверяем наличие всех необходимых переменных окружения
    if (!serviceId || !merchantId || !merchantUserId || !secretKey) {
      console.error('Отсутствуют необходимые переменные окружения:', {
        serviceId: !serviceId,
        merchantId: !merchantId,
        merchantUserId: !merchantUserId,
        secretKey: !secretKey
      });
      return NextResponse.json(
        { error: 'Отсутствуют необходимые переменные окружения' },
        { status: 500 }
      );
    }
    
    // Проверяем наличие переменных для фискализации
    if (!spicCode || !packageCode) {
      console.warn('Отсутствуют переменные для фискализации чеков:', {
        spicCode: !spicCode,
        packageCode: !packageCode
      });
    }
    
    // Текущее время в миллисекундах
    const signTime = Date.now();
    
    // Форматируем сумму (убираем пробелы и другие символы)
    const formattedPrice = price.toString().replace(/\s+/g, '');
    
    // Формируем подпись для запроса
    const signString = `${serviceId}${orderId}${signTime}${secretKey}`;
    const sign = crypto.createHash('md5').update(signString).digest('hex');
    
    console.log('Данные для формирования подписи:', {
      serviceId,
      orderId,
      signTime,
      formattedPrice,
      // Не логируем секретный ключ
      signString: `${serviceId}${orderId}${signTime}[SECRET_KEY]`,
      sign
    });
    
    // Используем относительный URL для возврата
    const returnUrl = `/payment/success`;
    
    // Получаем хост из заголовков запроса для формирования абсолютного URL
    const host = request.headers.get('host') || 'localhost:5174';
    const protocol = host.includes('localhost') ? 'http' : 'https';
    const absoluteReturnUrl = `${protocol}://${host}${returnUrl}`;
    
    // Сохраняем информацию о заказе
    const orderData = {
      orderId,
      tourId,
      tourName,
      price: formattedPrice,
      userId: userId || 'Гость',
      userName: userName || 'Не указано',
      userPhone: userPhone || 'Не указано',
      status: 'Создан',
      createdAt: new Date().toISOString()
    };
    
    await saveOrderInfo(orderData);
    
    // Отправляем уведомление в Telegram
    await sendTelegramNotification(orderData);
    
    // Формируем URL для перенаправления на страницу оплаты Click
    const clickUrl = `https://my.click.uz/services/pay?service_id=${serviceId}&merchant_id=${merchantId}&amount=${formattedPrice}&transaction_param=${orderId}&return_url=${encodeURIComponent(absoluteReturnUrl)}&card_type=uzcard&sign_time=${signTime}&sign_string=${sign}`;
    
    // Логируем URL для отладки
    console.log('Click payment URL:', clickUrl);
    
    return NextResponse.json({ 
      success: true, 
      redirectUrl: clickUrl,
      orderId
    });
  } catch (error) {
    console.error('Ошибка при создании платежа:', error);
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    );
  }
}

// Функция для отправки уведомления в Telegram
async function sendTelegramNotification(orderData) {
  try {
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID || '5283151626';
    
    const message = `
🆕 Новый заказ #${orderData.orderId}
🏙️ Тур: ${orderData.tourName} (ID: ${orderData.tourId})
💰 Сумма: ${orderData.price} сум
👤 Клиент: ${orderData.userName}
📱 Телефон: ${orderData.userPhone}
🔄 Статус: ${orderData.status}
⏱️ Дата: ${new Date().toLocaleString('ru-RU')}
    `;
    
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

// Функция для фискализации чека
export async function fiscalizeReceipt(paymentData) {
  try {
    const { 
      orderId, 
      tourName, 
      price, 
      userName, 
      userPhone 
    } = paymentData;
    
    // Получаем данные из переменных окружения
    const merchantId = process.env.CLICK_MERCHANT_ID;
    const merchantUserId = process.env.CLICK_MERCHANT_USER_ID;
    const serviceId = process.env.CLICK_SERVICE_ID;
    const secretKey = process.env.CLICK_SECRET_KEY;
    const spicCode = process.env.CLICK_SPIC_CODE;
    const packageCode = process.env.CLICK_PACKAGE_CODE;
    
    // Проверяем наличие всех необходимых переменных окружения для фискализации
    if (!merchantId || !merchantUserId || !serviceId || !secretKey || !spicCode || !packageCode) {
      console.error('Отсутствуют необходимые переменные окружения для фискализации:', {
        merchantId: !merchantId,
        merchantUserId: !merchantUserId,
        serviceId: !serviceId,
        secretKey: !secretKey,
        spicCode: !spicCode,
        packageCode: !packageCode
      });
      return { success: false, error: 'Отсутствуют необходимые переменные окружения для фискализации' };
    }
    
    // Текущее время в формате ISO
    const currentTime = new Date().toISOString();
    
    // Формируем данные для запроса фискализации
    const fiscalData = {
      merchant_id: merchantId,
      merchant_user_id: merchantUserId,
      service_id: serviceId,
      transaction_id: orderId,
      receipt_type: 0, // 0 - продажа, 1 - возврат
      receipt_time: currentTime,
      spic_code: spicCode,
      package_code: packageCode,
      items: [
        {
          title: tourName,
          price: parseFloat(price),
          count: 1,
          code: `TOUR-${orderId}`,
          package_code: packageCode,
          vat_percent: 15 // НДС в процентах (может отличаться в зависимости от типа товара)
        }
      ],
      client_info: {
        name: userName || 'Не указано',
        phone: userPhone || 'Не указано'
      }
    };
    
    // Формируем подпись для запроса
    const signTime = Date.now();
    const signString = `${serviceId}${orderId}${signTime}${secretKey}`;
    const sign = crypto.createHash('md5').update(signString).digest('hex');
    
    console.log('Отправка запроса на фискализацию чека:', {
      ...fiscalData,
      sign_time: signTime,
      sign_string: sign
    });
    
    // Отправляем запрос на фискализацию
    const response = await fetch('https://api.click.uz/v2/merchant/receipt/fiscal', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Auth': `${merchantId}:${merchantUserId}:${signTime}:${sign}`
      },
      body: JSON.stringify(fiscalData)
    });
    
    const responseData = await response.json();
    
    console.log('Ответ от API фискализации:', responseData);
    
    if (response.ok && responseData.error === 0) {
      // Если фискализация прошла успешно, отправляем данные о товарах и услугах
      const submitItemsResult = await submitFiscalItems({
        serviceId,
        paymentId: responseData.payment_id || orderId,
        tourName,
        price,
        spicCode,
        packageCode
      });
      
      if (submitItemsResult.success) {
        // Получаем фискальные данные (ссылку на чек)
        const fiscalDataResult = await getFiscalData({
          serviceId,
          paymentId: responseData.payment_id || orderId,
          merchantId,
          merchantUserId,
          secretKey
        });
        
        if (fiscalDataResult.success && fiscalDataResult.qrCodeURL) {
          // Отправляем фискализированный чек
          await submitFiscalQRCode({
            serviceId,
            paymentId: responseData.payment_id || orderId,
            qrcode: fiscalDataResult.qrCodeURL,
            merchantId,
            merchantUserId,
            secretKey
          });
        }
      }
      
      return { 
        success: true, 
        fiscalData: responseData 
      };
    } else {
      console.error('Ошибка при фискализации чека:', responseData);
      return { 
        success: false, 
        error: responseData.error_note || 'Ошибка при фискализации чека' 
      };
    }
  } catch (error) {
    console.error('Ошибка при фискализации чека:', error);
    return { 
      success: false, 
      error: error.message 
    };
  }
}

// Функция для отправки данных о товарах и услугах
async function submitFiscalItems(data) {
  try {
    const { 
      serviceId, 
      paymentId, 
      tourName, 
      price, 
      spicCode, 
      packageCode 
    } = data;
    
    // Получаем данные из переменных окружения
    const merchantId = process.env.CLICK_MERCHANT_ID;
    const merchantUserId = process.env.CLICK_MERCHANT_USER_ID;
    const secretKey = process.env.CLICK_SECRET_KEY;
    
    // Формируем подпись для запроса
    const signTime = Date.now();
    const signString = `${merchantId}${signTime}${secretKey}`;
    const sign = crypto.createHash('md5').update(signString).digest('hex');
    
    // Преобразуем цену в тийины (1 сум = 100 тийин)
    const priceInTiyin = Math.round(parseFloat(price) * 100);
    
    // Рассчитываем НДС (15%)
    const vatPercent = 15;
    const vatAmount = Math.round(priceInTiyin * vatPercent / 100);
    
    // Формируем данные для запроса
    const requestData = {
      service_id: parseInt(serviceId),
      payment_id: paymentId,
      items: [
        {
          Name: tourName,
          SPIC: spicCode,
          PackageCode: packageCode,
          Price: priceInTiyin,
          Amount: 1,
          VAT: vatAmount,
          VATPercent: vatPercent,
          CommissionInfo: {}
        }
      ],
      received_ecash: 0,
      received_cash: 0,
      received_card: priceInTiyin // Оплата картой
    };
    
    console.log('Отправка данных о товарах и услугах:', requestData);
    
    // Отправляем запрос
    const response = await fetch('https://api.click.uz/v2/merchant/payment/ofd_data/submit_items', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Auth': `${merchantId}:${sign}:${signTime}`
      },
      body: JSON.stringify(requestData)
    });
    
    const responseData = await response.json();
    
    console.log('Ответ от API отправки данных о товарах и услугах:', responseData);
    
    if (response.ok && responseData.error_code === 0) {
      return { 
        success: true, 
        data: responseData 
      };
    } else {
      console.error('Ошибка при отправке данных о товарах и услугах:', responseData);
      return { 
        success: false, 
        error: responseData.error_note || 'Ошибка при отправке данных о товарах и услугах' 
      };
    }
  } catch (error) {
    console.error('Ошибка при отправке данных о товарах и услугах:', error);
    return { 
      success: false, 
      error: error.message 
    };
  }
}

// Функция для получения фискальных данных (ссылки на чек)
async function getFiscalData(data) {
  try {
    const { 
      serviceId, 
      paymentId, 
      merchantId, 
      merchantUserId, 
      secretKey 
    } = data;
    
    // Формируем подпись для запроса
    const signTime = Date.now();
    const signString = `${merchantId}${signTime}${secretKey}`;
    const sign = crypto.createHash('md5').update(signString).digest('hex');
    
    console.log('Получение фискальных данных для платежа:', paymentId);
    
    // Отправляем запрос
    const response = await fetch(`https://api.click.uz/v2/merchant/payment/ofd_data/${serviceId}/${paymentId}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Auth': `${merchantId}:${sign}:${signTime}`
      }
    });
    
    const responseData = await response.json();
    
    console.log('Ответ от API получения фискальных данных:', responseData);
    
    if (response.ok && responseData.paymentId) {
      return { 
        success: true, 
        paymentId: responseData.paymentId,
        qrCodeURL: responseData.qrCodeURL
      };
    } else {
      console.error('Ошибка при получении фискальных данных:', responseData);
      return { 
        success: false, 
        error: responseData.error_note || 'Ошибка при получении фискальных данных' 
      };
    }
  } catch (error) {
    console.error('Ошибка при получении фискальных данных:', error);
    return { 
      success: false, 
      error: error.message 
    };
  }
}

// Функция для отправки фискализированного чека
async function submitFiscalQRCode(data) {
  try {
    const { 
      serviceId, 
      paymentId, 
      qrcode, 
      merchantId, 
      merchantUserId, 
      secretKey 
    } = data;
    
    // Формируем подпись для запроса
    const signTime = Date.now();
    const signString = `${merchantId}${signTime}${secretKey}`;
    const sign = crypto.createHash('md5').update(signString).digest('hex');
    
    // Формируем данные для запроса
    const requestData = {
      service_id: parseInt(serviceId),
      payment_id: paymentId,
      qrcode: qrcode
    };
    
    console.log('Отправка фискализированного чека:', requestData);
    
    // Отправляем запрос
    const response = await fetch('https://api.click.uz/v2/merchant/payment/ofd_data/submit_qrcode', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Auth': `${merchantId}:${sign}:${signTime}`
      },
      body: JSON.stringify(requestData)
    });
    
    const responseData = await response.json();
    
    console.log('Ответ от API отправки фискализированного чека:', responseData);
    
    if (response.ok && responseData.error_code === 0) {
      return { 
        success: true, 
        data: responseData 
      };
    } else {
      console.error('Ошибка при отправке фискализированного чека:', responseData);
      return { 
        success: false, 
        error: responseData.error_note || 'Ошибка при отправке фискализированного чека' 
      };
    }
  } catch (error) {
    console.error('Ошибка при отправке фискализированного чека:', error);
    return { 
      success: false, 
      error: error.message 
    };
  }
} 