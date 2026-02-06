import Chat from "../models/chat.model.js";

export const addSubscriber = async (msg, bot) => {
  const chatId = msg.chat.id.toString();

  try {
    // Check if user already exists
    let chat = await Chat.findOne({ chatId });

    if (!chat) {
      // Save new user
      chat = await Chat.create({
        chatId,
        username: msg.chat.username || "",
        firstName: msg.chat.first_name || ""
      });

      await bot.sendMessage(chatId, "✅ You're subscribed to alerts!");
    } else {
      await bot.sendMessage(chatId, "ℹ️ You are already subscribed.");
    }
  } catch (error) {
    console.error("Error in addSubscriber:", error.message);
    bot.sendMessage(chatId, "❌ Subscription failed.");
  }
};
