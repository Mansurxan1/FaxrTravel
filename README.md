# FaxrTravel - Туристическое приложение

Веб-приложение для бронирования туров с интеграцией платежной системы Click.

## Особенности

- Каталог туров с подробным описанием
- Интеграция с платежной системой Click
- Многоязычный интерфейс (русский, узбекский, английский)
- Адаптивный дизайн для мобильных устройств
- Уведомления в Telegram о новых заказах

## Технологии

- Next.js 15
- React 19
- Tailwind CSS
- Zustand для управления состоянием
- Интеграция с Click Payment API
- Vercel KV Storage для хранения данных (в продакшене)
- Локальное хранение данных (в разработке)

## Локальная разработка

1. Клонируйте репозиторий:
```bash
git clone https://github.com/Mansurxan1/FaxrTravel.git
cd faxrtravel
```

2. Установите зависимости:
```bash
npm install
```

3. Создайте файл `.env.local` и добавьте необходимые переменные окружения:
```
# Click Payment Integration
CLICK_SECRET_KEY=your_secret_key
CLICK_SERVICE_ID=your_service_id
CLICK_MERCHANT_ID=your_merchant_id
CLICK_MERCHANT_USER_ID=your_merchant_user_id
CLICK_SPIC_CODE=your_spic_code
CLICK_PACKAGE_CODE=your_package_code

# Telegram Bot
TELEGRAM_BOT_TOKEN=your_bot_token
TELEGRAM_CHAT_ID=your_chat_id
```

4. Создайте директорию для хранения данных:
```bash
mkdir -p data/orders
```

5. Запустите приложение в режиме разработки:
```bash
npm run dev
```

### Локальное хранение данных

При локальной разработке данные о заказах сохраняются в директории `data/orders/` в формате JSON. Каждый заказ сохраняется в отдельном файле с именем `{orderId}.json`.

Структура директории:
```
data/
  └── orders/
      ├── .gitkeep
      └── {orderId}.json
```

## Деплой на Vercel

### Предварительные требования

1. Аккаунт на [Vercel](https://vercel.com)
2. Установленный [Vercel CLI](https://vercel.com/cli)
3. Настроенный проект на GitHub/GitLab/Bitbucket

### Шаги для деплоя

1. Залогиньтесь в Vercel CLI:
```bash
vercel login
```

2. Настройте Vercel KV Storage:
   - Перейдите в [Vercel Dashboard](https://vercel.com/dashboard)
   - Выберите ваш проект
   - Перейдите в раздел Storage
   - Создайте новую KV базу данных
   - Скопируйте переменные окружения KV_URL, KV_REST_API_URL, KV_REST_API_TOKEN, KV_REST_API_READ_ONLY_TOKEN

3. Добавьте переменные окружения в проект:
   - В Vercel Dashboard перейдите в Settings > Environment Variables
   - Добавьте все переменные из файла `.env.local`
   - Добавьте переменные KV Storage

4. Деплой проекта:
```bash
vercel
```

5. Для продакшен-деплоя:
```bash
vercel --prod
```

### Настройка домена

1. В Vercel Dashboard перейдите в Settings > Domains
2. Добавьте ваш домен: www.faxr-travel.uz
3. Следуйте инструкциям для настройки DNS-записей
4. Дождитесь подтверждения домена

### Возможные проблемы при деплое

#### Ошибка с useSearchParams()

Если вы получаете ошибку вида:
```
⨯ useSearchParams() should be wrapped in a suspense boundary at page "/payment/success"
```

Убедитесь, что все компоненты, использующие хук `useSearchParams()`, обернуты в компонент `Suspense`. Например:

```jsx
import { Suspense } from 'react';

// Компонент с fallback для Suspense
const Loading = () => <div>Загрузка...</div>;

// Компонент, использующий useSearchParams
const ComponentWithSearchParams = () => {
  const searchParams = useSearchParams();
  // ...
};

// Основной компонент страницы
const Page = () => {
  return (
    <Suspense fallback={<Loading />}>
      <ComponentWithSearchParams />
    </Suspense>
  );
};
```

#### Проблемы с Vercel KV Storage

Если у вас возникают проблемы с доступом к Vercel KV Storage, убедитесь, что:
1. Вы добавили все необходимые переменные окружения (KV_URL, KV_REST_API_URL, KV_REST_API_TOKEN, KV_REST_API_READ_ONLY_TOKEN)
2. Вы создали KV базу данных в том же проекте Vercel, где размещено приложение

## Тестирование Click Payment

### Настройка белого списка в Click

Для добавления IP-адресов в белый список Click необходимо предоставить следующую информацию:

1. IP-адреса серверов Vercel (где размещен сайт):
   - 76.76.21.21
   - 76.76.21.241
   - 66.33.60.130
   - 66.33.60.67
   - 66.33.60.66

2. Порт: 443 (стандартный порт HTTPS)

3. Домен: www.faxr-travel.uz

Эти IP-адреса принадлежат серверам Vercel, на которых размещено приложение. Поскольку Vercel использует распределенную инфраструктуру, рекомендуется добавить все указанные IP-адреса в белый список Click.

### Тестирование интеграции

Для тестирования интеграции с Click Payment:

1. Создайте тестовый заказ через API:
```bash
curl -X POST https://www.faxr-travel.uz/api/click \
  -H "Content-Type: application/json" \
  -d '{
    "tourId": "test-123",
    "tourName": "Тестовый тур",
    "price": "10000",
    "userName": "Тест Тестов",
    "userPhone": "+998901234567"
  }'
```

2. Используйте полученный `orderId` для тестирования уведомлений:
```bash
curl -X POST https://www.faxr-travel.uz/api/click/notify \
  -H "Content-Type: application/json" \
  -d '{
    "click_trans_id": "test-123456",
    "service_id": 68027,
    "merchant_trans_id": "YOUR_ORDER_ID",
    "amount": 10000,
    "action": 1,
    "sign_time": "1740827772",
    "sign_string": "YOUR_SIGN_STRING",
    "error": 0
  }'
```

## Лицензия

MIT
