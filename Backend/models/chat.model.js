import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  chatId: {
    type: String,
    required: true,
    unique: true
  },
  username: String,
  firstName: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
    timestamps:true,
});

const Chat = mongoose.model("Chat", chatSchema);

export default Chat;
