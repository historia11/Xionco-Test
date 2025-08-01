require("dotenv").config(); // Load environment variables from .env file
const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const port = process.env.PORT || 3000;


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
app.use(express.static("public"));
app.use(express.json());
app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;

  if (!userMessage) {
    return res.status(400).json({ error: "Pesan tidak boleh kosong." });
  }

  try {
    const result = await model.generateContent(userMessage);
    const response = await result.response;
    const text = response.text();
    res.json({ reply: text });
  } catch (error) {
    console.error("Error saat berkomunikasi dengan Gemini API:", error);
    res
      .status(500)
      .json({ error: "Maaf, terjadi kesalahan. Silakan coba lagi nanti." });
  }
});

// Mulai server
app.listen(port, () => {
  console.log(`Server chatbot berjalan di http://localhost:${port}`);
});
