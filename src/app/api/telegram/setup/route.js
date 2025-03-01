import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    
    if (!botToken) {
      return NextResponse.json(
        { error: 'Токен бота не настроен в переменных окружения' },
        { status: 500 }
      );
    }
    
    // Получаем информацию о боте
    const botInfoResponse = await fetch(`https://api.telegram.org/bot${botToken}/getMe`);
    const botInfo = await botInfoResponse.json();
    
    if (!botInfoResponse.ok) {
      return NextResponse.json(
        { error: 'Ошибка при получении информации о боте', details: botInfo },
        { status: 500 }
      );
    }
    
    // Получаем обновления бота (последние сообщения)
    const updatesResponse = await fetch(`https://api.telegram.org/bot${botToken}/getUpdates`);
    const updates = await updatesResponse.json();
    
    // Извлекаем ID чатов из обновлений
    const chatIds = [];
    if (updates.ok && updates.result && updates.result.length > 0) {
      updates.result.forEach(update => {
        if (update.message && update.message.chat && update.message.chat.id) {
          const chatId = update.message.chat.id;
          const chatType = update.message.chat.type;
          const chatTitle = update.message.chat.title || 'Личный чат';
          const userName = update.message.from ? 
            (update.message.from.username || 
             `${update.message.from.first_name || ''} ${update.message.from.last_name || ''}`.trim()) : 
            'Неизвестный пользователь';
          
          // Добавляем информацию о чате, если её ещё нет в массиве
          if (!chatIds.some(chat => chat.id === chatId)) {
            chatIds.push({
              id: chatId,
              type: chatType,
              title: chatTitle,
              userName
            });
          }
        }
      });
    }
    
    // Отправляем тестовое сообщение, если есть ID чата
    let testMessageResult = null;
    if (process.env.TELEGRAM_CHAT_ID) {
      const testMessageResponse = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: process.env.TELEGRAM_CHAT_ID,
          text: '✅ Тестовое сообщение от FAXR TRAVEL. Бот настроен и работает корректно!'
        }),
      });
      
      testMessageResult = await testMessageResponse.json();
    }
    
    return NextResponse.json({
      bot: botInfo.result,
      chatIds,
      testMessage: testMessageResult,
      instructions: `
        1. Добавьте бота @${botInfo.result.username} в нужный чат или группу
        2. Отправьте сообщение в чат с ботом
        3. Обновите эту страницу, чтобы увидеть ID чата
        4. Добавьте ID чата в переменную окружения TELEGRAM_CHAT_ID
      `
    });
  } catch (error) {
    console.error('Ошибка при настройке телеграм-бота:', error);
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера', details: error.message },
      { status: 500 }
    );
  }
} 