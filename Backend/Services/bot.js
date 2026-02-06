import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { addSubscriber } from "../middleware/addSubscriber.middleware.js";

dotenv.config({ path: "../.env" });

// Connect to MongoDB
await mongoose.connect(process.env.MONGO_URI);
console.log("MongoDB connected for Telegram bot");

const token = process.env.TELEGRAM_HTTP_API_TOKEN;

if (!token) {
  console.error("Telegram token missing");
  process.exit(1);
}

console.log("Token loaded:", Boolean(token), token.length);

const bot = new TelegramBot(token, { polling: true });

console.log("🤖 Telegram bot started");

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const messageText = msg.text;

  if (messageText === "/start") {
    // Call middleware
    await addSubscriber(msg, bot);
  }

  if (messageText === "hii") {
    bot.sendMessage(chatId, "Hello, how are you");
  }

  if (messageText === "ping") {
    bot.sendMessage(chatId, "pong");
  }
});
