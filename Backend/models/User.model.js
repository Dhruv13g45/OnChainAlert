import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  chatId: {
    type: String,
    required: true,
    unique: true
  }
});

export default mongoose.model('User', UserSchema);
