// // import TelegramBot from 'node-telegram-bot-api';
// // import dotenv from 'dotenv';
// // import User from '../models/User.model.js';


// // dotenv.config();

// // // Use your environment variable names
// // const BOT_TOKEN = process.env.TELEGRAM_HTTP_API_TOKEN;
// // const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

// // let bot = null;

// // export function initTelegramBot() {
// //   try {
// //     if (!BOT_TOKEN) {
// //       console.log('⚠️  Telegram bot token not found in .env');
// //       console.log('   Add TELEGRAM_HTTP_API_TOKEN to your .env file');
// //       return false;
// //     }

// //     bot = new TelegramBot(BOT_TOKEN, { polling: true });
    
// //     console.log('✅ Telegram bot initialized');
// //     console.log(`🤖 Bot token: ${BOT_TOKEN.slice(0, 20)}...`);
    
// //     // Handle /start command
// //     bot.onText(/\/start/, async (msg) => {
// //   const chatId = msg.chat.id.toString();
// //   const username = msg.from.username || msg.from.first_name;

// //   // Save user to database
// //   await User.updateOne(
// //     { chatId },
// //     { chatId },
// //     { upsert: true }
// //   );

// //   bot.sendMessage(
// //     chatId,
// //     `🚀 Welcome to OnChain Alert Bot!\n\n` +
// //     `👤 User: ${username}\n` +
// //     `✅ You are now subscribed to blockchain alerts!`
// //   );

// //   console.log(`📥 New subscriber: ${chatId}`);
// // });

    
// //     // Handle /status command
// //     bot.onText(/\/status/, (msg) => {
// //       const isConfigured = CHAT_ID ? '✅ Configured' : '⚠️ Not configured';
      
// //       bot.sendMessage(msg.chat.id, 
// //         `🤖 Bot Status Report\n\n` +
// //         `📡 Connection: ✅ Active\n` +
// //         `🔗 Network: Polygon Mumbai Testnet\n` +
// //         `📢 Notifications: ${isConfigured}\n` +
// //         `⏰ Last check: ${new Date().toLocaleString()}\n\n` +
// //         `${CHAT_ID ? '✅ You will receive alerts!' : '⚠️ Add your chat ID to .env to receive alerts'}`
// //       );
// //     });
    
// //     // Handle /help command
// //     bot.onText(/\/help/, (msg) => {
// //       bot.sendMessage(msg.chat.id,
// //         `📚 OnChain Alert Bot - Help\n\n` +
// //         `🎯 Available Commands:\n` +
// //         `/start - Get your Chat ID\n` +
// //         `/status - Check bot status\n` +
// //         `/help - Show this message\n` +
// //         `/test - Send test alert\n` +
// //         `/chatid - Get your Chat ID\n\n` +
// //         `🔔 You'll receive alerts for:\n` +
// //         `• Large transactions (>0.1 MATIC)\n` +
// //         `• Watched address activity\n` +
// //         `• Smart contract interactions\n` +
// //         `• Medicine tracking events\n` +
// //         `• AutoPay monitoring\n\n` +
// //         `💡 Tip: Use /start to get your Chat ID!`
// //       );
// //     });
    
// //     // Handle /test command - send test alert
// //     bot.onText(/\/test/, (msg) => {
// //       const testMessage = 
// //         `🧪 TEST ALERT\n\n` +
// //         `✅ Bot is working correctly!\n` +
// //         `📡 Connected to blockchain\n` +
// //         `🔔 Notifications are active\n\n` +
// //         `You will receive real alerts when:\n` +
// //         `• Large transactions occur\n` +
// //         `• Watched addresses have activity\n` +
// //         `• Smart contracts are called`;
      
// //       bot.sendMessage(msg.chat.id, testMessage);
// //     });
    
// //     // Handle /chatid command - alternative way to get chat ID
// //     bot.onText(/\/chatid/, (msg) => {
// //       bot.sendMessage(msg.chat.id, 
// //         `🆔 Your Chat ID is:\n\n` +
// //         `${msg.chat.id}\n\n` +
// //         `Add this to your .env file:\n` +
// //         `TELEGRAM_CHAT_ID=${msg.chat.id}`
// //       );
// //     });
    
// //     bot.on('polling_error', (error) => {
// //       console.error('⚠️  Telegram polling error:', error.message);
// //     });
    
// //     return true;
    
// //   } catch (error) {
// //     console.error('❌ Failed to initialize Telegram bot:', error.message);
// //     return false;
// //   }
// // }

// // export async function sendTelegramMessage(message) {
// //   try {
// //     if (!bot) {
// //       console.log('⚠️ Telegram bot not initialized');
// //       return false;
// //     }

// //     // Get all subscribed users
// //     const users = await User.find();

// //     if (users.length === 0) {
// //       console.log('⚠️ No subscribers found');
// //       return false;
// //     }

// //     for (const user of users) {
// //       try {
// //         await bot.sendMessage(user.chatId, message, {
// //           parse_mode: 'HTML',
// //           disable_web_page_preview: true
// //         });
// //       } catch (err) {
// //         console.error(`Failed to send to ${user.chatId}:`, err.message);
// //       }
// //     }

// //     return true;
// //   } catch (error) {
// //     console.error('❌ Telegram send error:', error.message);
// //     return false;
// //   }
// // }


// // export { bot };



// import TelegramBot from 'node-telegram-bot-api';
// import dotenv from 'dotenv';
// import User from '../models/User.model.js';

// dotenv.config();

// const token = process.env.TELEGRAM_BOT_TOKEN;
// console.log("ENV TOKEN:", process.env.TELEGRAM_BOT_TOKEN);


// const bot = new TelegramBot(token, {
//   polling: {
//     autoStart: false
//   }
// });

// async function startBot() {
//   try {
//     await bot.stopPolling(); // clear old sessions
//   } catch (e) {}

//   bot.startPolling();

//   bot.onText(/\/start/, async (msg) => {
//     const chatId = msg.chat.id;

//     await User.updateOne(
//       { chatId },
//       { chatId },
//       { upsert: true }
//     );

//     console.log(`📥 New subscriber: ${chatId}`);

//     bot.sendMessage(chatId, "✅ You are subscribed to blockchain alerts!");
//   });
// }

// export { bot, startBot };





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
