const messagesDiv = document.getElementById("messages");
const messageForm = document.getElementById("messageForm");
const messageInput = document.getElementById("messageInput");

// Добавление нового сообщения в Firebase
messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const messageText = messageInput.value;

  const newMessageRef = db.ref("messages").push();
  newMessageRef.set({
    text: messageText,
    timestamp: Date.now(),
    reactions: {},
  });

  messageInput.value = "";
});

// Отображение сообщений в реальном времени
db.ref("messages").on("value", (snapshot) => {
  messagesDiv.innerHTML = ""; // Очищаем перед перерисовкой

  snapshot.forEach((childSnapshot) => {
    const message = childSnapshot.val();
    const messageId = childSnapshot.key;

    const messageDiv = document.createElement("div");
    messageDiv.className = "message";
    messageDiv.innerHTML = `
      <span>${message.text}</span>
    `;

    messagesDiv.appendChild(messageDiv);
  });
});
