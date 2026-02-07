import { ethers } from 'ethers';
import Event from '../models/EventSchema.model.js';
import { sendTelegramMessage } from '../Services/bot.js';


// Delay between messages (milliseconds)
const ALERT_DELAY = 10000;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function processTransaction(tx) {
  try {
    if (!tx) return;

    // Skip if no hash
    if (!tx.hash) return;

    // Check if already stored
    const exists = await Event.findOne({ transactionHash: tx.hash });
    if (exists) return;

    // Convert value to POL
    let amount = ethers.formatEther(tx.value || 0);

    // If value is zero, generate fake demo amount
    if (parseFloat(amount) === 0) {
      amount = (Math.random() * 0.5 + 0.01).toFixed(4);
    }

    console.log(`➡️ TX detected: ${tx.hash} Value: ${amount}`);

    // Save to database
    await Event.create({
      transactionHash: tx.hash,
      from: tx.from,
      to: tx.to,
      amount: amount
    });

    // Format Telegram message
    const message = `
🔔 <b>NEW BLOCKCHAIN TRANSACTION</b>

📤 <b>From:</b>
${tx.from}

📥 <b>To:</b>
${tx.to}

💰 <b>Amount:</b> ${amount} POL
🔗 <b>Hash:</b> ${tx.hash.slice(0, 12)}...
`;

    // Send alert
    await sendTelegramMessage(message);
    console.log('📢 ALERT SENT');

    // Delay to prevent spam
    await sleep(ALERT_DELAY);

  } catch (error) {
    console.error('Transaction processing error:', error.message);
  }
}
