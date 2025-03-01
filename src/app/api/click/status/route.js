import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function GET(request) {
  try {
    // Получаем данные из переменных окружения
    const serviceId = process.env.CLICK_SERVICE_ID;
    const merchantId = process.env.CLICK_MERCHANT_ID;
    const merchantUserId = process.env.CLICK_MERCHANT_USER_ID;
    const secretKey = process.env.CLICK_SECRET_KEY;
    const spicCode = process.env.CLICK_SPIC_CODE;
    const packageCode = process.env.CLICK_PACKAGE_CODE;
    
    // Проверяем наличие всех необходимых переменных окружения
    if (!serviceId || !merchantId || !merchantUserId || !secretKey) {
      return NextResponse.json({
        status: "error",
        message: "Отсутствуют необходимые переменные окружения",
        details: {
          serviceId: !serviceId,
          merchantId: !merchantId,
          merchantUserId: !merchantUserId,
          secretKey: !secretKey
        }
      }, { status: 500 });
    }
    
    // Проверяем наличие переменных для фискализации
    const fiscalizationConfigured = !!(spicCode && packageCode);
    
    // Проверяем доступность доменов Click
    const clickDomain = await checkDomainAvailability('my.click.uz');
    const apiDomain = await checkDomainAvailability('api.click.uz');
    
    // Формируем тестовую подпись
    const testOrderId = 'test-' + Date.now();
    const signTime = Date.now();
    const signString = `${serviceId}${testOrderId}${signTime}${secretKey}`;
    const sign = crypto.createHash('md5').update(signString).digest('hex');
    
    // Формируем тестовый URL для платежа
    const testPaymentUrl = `https://my.click.uz/services/pay?service_id=${serviceId}&merchant_id=${merchantId}&amount=1000&transaction_param=${testOrderId}&return_url=${encodeURIComponent('https://example.com')}&card_type=uzcard&sign_time=${signTime}&sign_string=${sign}`;
    
    // Проверяем статус фискализации, если настроены переменные
    let fiscalizationStatus = null;
    if (fiscalizationConfigured) {
      fiscalizationStatus = await checkFiscalizationStatus(serviceId, merchantId, merchantUserId, secretKey, spicCode, packageCode);
    }
    
    return NextResponse.json({
      status: "success",
      message: "Проверка подключения к Click выполнена",
      availability: {
        clickDomain,
        apiDomain
      },
      config: {
        serviceId,
        merchantId,
        merchantUserId,
        fiscalizationConfigured
      },
      testSignature: {
        testOrderId,
        signTime,
        sign
      },
      testPaymentUrl,
      fiscalizationStatus,
      troubleshooting: {
        message: "Если возникают проблемы с подключением к Click, проверьте:",
        steps: [
          "Правильность учетных данных в файле .env.local",
          "Доступность доменов Click (my.click.uz и api.click.uz)",
          "Правильность формирования подписи для запроса",
          "Для тестирования используйте кнопку 'Купить' на странице тура"
        ]
      }
    });
  } catch (error) {
    console.error('Ошибка при проверке статуса подключения к Click:', error);
    return NextResponse.json({
      status: "error",
      message: "Ошибка при проверке статуса подключения к Click",
      error: error.message
    }, { status: 500 });
  }
}

// Функция для проверки доступности домена
async function checkDomainAvailability(domain) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    
    const response = await fetch(`https://${domain}`, {
      method: 'HEAD',
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    return response.ok;
  } catch (error) {
    console.error(`Ошибка при проверке доступности домена ${domain}:`, error);
    return false;
  }
}

// Функция для проверки статуса фискализации
async function checkFiscalizationStatus(serviceId, merchantId, merchantUserId, secretKey, spicCode, packageCode) {
  try {
    // Формируем подпись для запроса
    const signTime = Date.now();
    const signString = `${merchantId}${signTime}${secretKey}`;
    const sign = crypto.createHash('md5').update(signString).digest('hex');
    
    // Проверяем доступность API фискализации
    const fiscalApiUrl = 'https://api.click.uz/v2/merchant/receipt/fiscal';
    const fiscalApiAvailable = await checkEndpointAvailability(fiscalApiUrl, merchantId, merchantUserId, sign, signTime);
    
    // Проверяем доступность API отправки данных о товарах и услугах
    const submitItemsUrl = 'https://api.click.uz/v2/merchant/payment/ofd_data/submit_items';
    const submitItemsAvailable = await checkEndpointAvailability(submitItemsUrl, merchantId, merchantUserId, sign, signTime);
    
    // Проверяем доступность API отправки QR-кода чека
    const submitQrCodeUrl = 'https://api.click.uz/v2/merchant/payment/ofd_data/submit_qrcode';
    const submitQrCodeAvailable = await checkEndpointAvailability(submitQrCodeUrl, merchantId, merchantUserId, sign, signTime);
    
    // Формируем тестовые данные для фискализации
    const testFiscalData = {
      spic_code: spicCode,
      package_code: packageCode,
      items: [
        {
          Name: "Тестовый товар",
          SPIC: spicCode,
          PackageCode: packageCode,
          Price: 100000, // 1000 сум в тийинах
          Amount: 1,
          VAT: 15000, // 15% НДС
          VATPercent: 15,
          CommissionInfo: {}
        }
      ]
    };
    
    return {
      fiscalApiAvailable,
      submitItemsAvailable,
      submitQrCodeAvailable,
      spicCode,
      packageCode,
      testFiscalData
    };
  } catch (error) {
    console.error('Ошибка при проверке статуса фискализации:', error);
    return {
      error: error.message
    };
  }
}

// Функция для проверки доступности эндпоинта API
async function checkEndpointAvailability(url, merchantId, merchantUserId, sign, signTime) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    
    const response = await fetch(url, {
      method: 'OPTIONS',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Auth': `${merchantId}:${merchantUserId}:${signTime}:${sign}`
      },
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    // Проверяем доступность API по коду ответа
    // Даже если API возвращает ошибку авторизации (401) или метода (405),
    // это означает, что API доступен, но требует правильных параметров
    return response.status !== 404 && response.status !== 503 && response.status !== 0;
  } catch (error) {
    console.error(`Ошибка при проверке доступности эндпоинта ${url}:`, error);
    return false;
  }
} 