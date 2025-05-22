let messages = [
    {
      role: "system",
      content:
        "You're a flavor assistant. Ask one question at a time to figure out the user's ideal Coca-Cola flavor. After a few questions, give your best custom flavor suggestion.",
    },
  ];
  
  const chat = document.getElementById("chat");
  
  async function sendMessage() {
    const input = document.getElementById("userInput");
    const userMessage = input.value;
    if (!userMessage) return;
  
    messages.push({ role: "user", content: userMessage });
    chat.innerHTML += `<p><strong>You:</strong> ${userMessage}</p>`;
    input.value = "";
  
    const response = await fetch("/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages }),
    });
  
    const data = await response.json();
    const reply = data.reply;
  
    messages.push({ role: "assistant", content: reply });
    chat.innerHTML += `<p><strong>FlavorBot:</strong> ${reply}</p>`;
  }
  