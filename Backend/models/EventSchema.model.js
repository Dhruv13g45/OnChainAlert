// import mongoose from 'mongoose';

// const EventSchema = new mongoose.Schema({
//   transactionHash: { 
//     type: String, 
//     required: true, 
//     unique: true,
//     index: true 
//   },
//   from: { 
//     type: String, 
//     required: true,
//     index: true 
//   },
//   to: { 
//     type: String,
//     index: true 
//   },
//   value: String,
//   blockNumber: { 
//     type: Number,
//     index: true 
//   },
//   alertType: String,
//   ruleName: String,
//   ruleId: String,
//   timestamp: { 
//     type: Date, 
//     default: Date.now,
//     index: true 
//   }
// }, {
//   timestamps: true
// });

// // Index for querying by address
// EventSchema.index({ from: 1, to: 1 });
// EventSchema.index({ timestamp: -1 });

// export default mongoose.model('Event', EventSchema);



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
