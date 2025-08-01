document.addEventListener("DOMContentLoaded", () => {
  const chatBox = document.getElementById("chat-box");
  const userInput = document.getElementById("user-input");
  const sendButton = document.getElementById("send-button");

  function addMessage(message, type) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", `${type}-message`);
    messageDiv.textContent = message;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
  }
  async function sendMessage() {
    const message = userInput.value.trim();
    if (message === "") return;

    addMessage(message, "user"); 
    userInput.value = ""; 

    try {
      const response = await fetch("/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: message }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || "Terjadi kesalahan saat mengambil respons."
        );
      }

      const data = await response.json();
      addMessage(data.reply, "bot"); 
    } catch (error) {
      console.error("Error:", error);
      addMessage(`Maaf, ada masalah: ${error.message}`, "bot");
    }
  }

 
  sendButton.addEventListener("click", sendMessage);


  userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  });
});
