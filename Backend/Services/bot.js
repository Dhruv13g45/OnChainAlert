


import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';
import User from '../models/User.model.js';

dotenv.config();

const token = process.env.TELEGRAM_BOT_TOKEN;

if (!token) {
  console.error('❌ TELEGRAM_BOT_TOKEN missing in .env');
}

const bot = new TelegramBot(token, {
  polling: {
    autoStart: false
  }
});

// Start the bot
export async function startBot() {
  try {
    await bot.stopPolling();
  } catch (e) {}

  bot.startPolling();

  bot.onText(/\/start/, async (msg) => {
    const chatId = msg.chat.id;

    await User.updateOne(
      { chatId },
      { chatId },
      { upsert: true }
    );

    console.log(`📥 New subscriber: ${chatId}`);

    bot.sendMessage(chatId, "✅ You are subscribed to blockchain alerts!");
  });
}

// 🔔 FUNCTION USED BY PROCESSOR

export async function sendTelegramMessage(message) {
  try {
    const users = await User.find();

    if (!users.length) return;

    for (const user of users) {
      await bot.sendMessage(user.chatId, message, {
        parse_mode: 'HTML',
        disable_web_page_preview: true
      });
    }
  } catch (error) {
    console.error('Telegram send error:', error.message);
  }
}


export { bot };
