import mongoose from 'mongoose';

const ChatSchema = new mongoose.Schema({
  chatId: { 
    type: String, 
    required: true, 
    unique: true 
  },
  username: String,
  firstName: String,
  subscribedAlerts: {
    type: [String],
    default: ['all']
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  lastActivity: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Chat', ChatSchema);