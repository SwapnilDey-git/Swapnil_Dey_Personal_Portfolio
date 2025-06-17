// server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

app.post("/api/ask", async (req, res) => {
  try {
    const { question } = req.body;

    const result = await model.generateContent(question);
    const response = await result.response;
    const text = response.text();

    res.json({ answer: text });

  } catch (error) {
    console.error("❌ Gemini error:", error);

    // Safe retry handling
    if (error.status === 429) {
      const retryDelay = error.response?.data?.find(e => e["@type"]?.includes("RetryInfo"))?.retryDelay || "60s";
      res.status(429).json({ error: `Rate limit hit. Retry after ${retryDelay}.` });
    } else {
      res.status(500).json({ error: "Failed to get AI response" });
    }
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`✅ Gemini server running at http://localhost:${PORT}`));
