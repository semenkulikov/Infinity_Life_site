/**
 * Файл для работы с чат-помощником на основе AI
 * Обеспечивает взаимодействие с API для получения ответов от ИИ
 */

// Обработчик отправки формы чата
document.getElementById('chat-form').addEventListener('submit', async function(e) {
  e.preventDefault();

  // Получаем и проверяем введенное сообщение
  const input = document.getElementById('chat-input');
  const message = input.value.trim();
  if (!message) return;

  const chatWindow = document.getElementById('chat-window');

  // Вывод сообщения пользователя в чат
  chatWindow.innerHTML += `<div class="chat-message user-message"><strong>Вы:</strong> ${message}</div>`;
  chatWindow.scrollTop = chatWindow.scrollHeight;
  input.value = '';

  try {
    // Отправка запроса к API
    const response = await fetch('https://api.aimlapi.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + API_TOKEN  // Используем токен из secret.js
      },
      body: JSON.stringify({
        model: "gpt-4o", // Модель для генерации ответов
        messages: [
          {
            role: "system",
            // Системный промпт для ИИ, определяющий его поведение
            content: "Ты — виртуальный консультант магазина Infinity Life. Твоя задача — помогать пользователю выбрать оптимальный продукт из ассортимента, основываясь на его предпочтениях. В магазине представлены следующие товары:\n" +
                "• Чай пуэр с коллоидным золотом\n" +
                "• Ганпаудер с наночастицами серебра\n" +
                "• Трава бессмертия с наночастицами платины\n" +
                "• Суп том ям\n" +
                "• Салат Цезарь\n" +
                "• Паэлья\n" +
                "\n" +
                "При общении ты должен:\n" +
                "\n" +
                "Задавать уточняющие вопросы о вкусах, предпочтениях, диетических требованиях и прочих особенностях, чтобы лучше понять, какой продукт будет наиболее подходящим для пользователя.\n" +
                "\n" +
                "Давать рекомендации исключительно из представленного ассортимента.\n" +
                "\n" +
                "Отвечать в исключительно позитивном и рекламном тоне, не допуская критики ни в адрес товаров, ни в адрес магазина.\n" +
                "\n" +
                "Если пользователь уходит от темы выбора продуктов, мягко возвращай его к обсуждению ассортимента магазина.\n" +
                "\n" +
                "Поддерживать дружелюбный, профессиональный и информативный стиль общения, помогая пользователю принять решение на основе его предпочтений."
          },
          {
            role: "user",
            content: message
          }
        ],
        max_tokens: 150,      // Максимальное количество токенов в ответе
        temperature: 0.7,     // Параметр креативности ответов
        reasoning_effort: "low" // Уровень усилий для генерации ответа
      })
    });

    // Обработка ответа от API
    const data = await response.json();

    if (data && data.choices && data.choices.length > 0) {
      const aiMessage = data.choices[0].message.content;
      // Вывод ответа ИИ в чат
      chatWindow.innerHTML += `<div class="chat-message ai-message"><strong>ИИ:</strong> ${aiMessage}</div>`;
    } else {
      // Вывод сообщения об ошибке, если ответ не получен
      chatWindow.innerHTML += `<div class="chat-message error-message"><strong>ИИ:</strong> Ошибка получения ответа.</div>`;
    }

    // Прокрутка чата к последнему сообщению
    chatWindow.scrollTop = chatWindow.scrollHeight;

  } catch (error) {
    // Обработка ошибок при запросе
    console.error('Ошибка запроса:', error);
    chatWindow.innerHTML += `<div class="chat-message error-message"><strong>ИИ:</strong> Ошибка запроса.</div>`;
  }
});
