document.getElementById('chat-form').addEventListener('submit', async function(e) {
  e.preventDefault();

  const input = document.getElementById('chat-input');
  const message = input.value.trim();
  if (!message) return;

  const chatWindow = document.getElementById('chat-window');

  // Вывод сообщения пользователя
  chatWindow.innerHTML += `<div class="chat-message user-message"><strong>Вы:</strong> ${message}</div>`;
  chatWindow.scrollTop = chatWindow.scrollHeight;
  input.value = '';

  try {
    const response = await fetch('https://api.aimlapi.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + API_TOKEN  // Используем переменную из secret.js
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "Ты — виртуальный консультант магазина Infinity Life. Отвечай только на вопросы про чай, продукты и их свойства."
          },
          {
            role: "user",
            content: message
          }
        ],
        max_tokens: 150,
        temperature: 0.7,
        reasoning_effort: "low"
      })
    });

    const data = await response.json();

    if (data && data.choices && data.choices.length > 0) {
      const aiMessage = data.choices[0].message.content;
      chatWindow.innerHTML += `<div class="chat-message ai-message"><strong>ИИ:</strong> ${aiMessage}</div>`;
    } else {
      chatWindow.innerHTML += `<div class="chat-message error-message"><strong>ИИ:</strong> Ошибка получения ответа.</div>`;
    }

    chatWindow.scrollTop = chatWindow.scrollHeight;

  } catch (error) {
    console.error('Ошибка запроса:', error);
    chatWindow.innerHTML += `<div class="chat-message error-message"><strong>ИИ:</strong> Ошибка запроса.</div>`;
  }
});
