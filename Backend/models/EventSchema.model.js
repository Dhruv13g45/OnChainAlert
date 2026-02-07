
import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema(
  {
    transactionHash: {
      type: String,
      unique: true
    },
    from: String,
    to: String,
    amount: String
  },
  {
    timestamps: true
  }
);

export default mongoose.model('Event', eventSchema);
