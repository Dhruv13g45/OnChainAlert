// import rules from './rules.js';
// import Event from '../models/EventSchema.model.js';
// import User from '../models/User.model.js';

// let processedTxs = new Set();

// export async function processTransaction(tx, bot) {
//   try {
//     if (!tx) return;

//     const txHash = tx.hash || `demo-${Date.now()}`;

//     // prevent duplicate alerts
//     if (processedTxs.has(txHash)) return;
//     processedTxs.add(txHash);

//     for (const rule of rules) {
//       if (!rule.enabled) continue;

//       try {
//         if (rule.condition(tx)) {
//           console.log(`✨ Rule matched: ${rule.name}`);

//           const message = rule.message(tx);

//           // Save event safely
//           try {
//             await Event.create({
//               ruleId: rule.id,
//               transactionHash: txHash,
//               from: tx.from || 'Unknown',
//               to: tx.to || 'Contract Creation',
//               amount: tx.value ? tx.value.toString() : '0',
//               priority: rule.priority,
//               message
//             });
//           } catch (dbError) {
//             console.log("Database save skipped (demo tx)");
//           }

//           // Send to all users
//           const users = await User.find();

//           if (users.length === 0) {
//             console.log("⚠️ No subscribers found");
//             return;
//           }

//           for (const user of users) {
//             try {
//               await bot.sendMessage(user.chatId, message);
//             } catch (err) {
//               console.log(`❌ Failed to send to ${user.chatId}`);
//             }
//           }

//           console.log("📢 ALERT SENT");
//         }
//       } catch (ruleError) {
//         console.log(`Error in rule ${rule.name}`);
//       }
//     }

//   } catch (err) {
//     console.log("Error in processTransaction:", err.message);
//   }
// }


// import Event from '../models/EventSchema.model.js';
// import User from '../models/User.model.js';
// import { bot } from '../Services/bot.js';
// import { getActiveRules } from './rules.js';

// let processedTxs = new Set();
// let lastAlertTime = 0;

// function canSendAlert() {
//   const now = Date.now();
//   if (now - lastAlertTime < 5000) return false; // 5 sec gap
//   lastAlertTime = now;
//   return true;
// }

// // MAIN exported function
// export async function processTransaction(tx) {
//   try {
//     if (!tx || !tx.hash) return;

//     if (processedTxs.has(tx.hash)) return;
//     processedTxs.add(tx.hash);

//     const rules = getActiveRules();

//     for (const rule of rules) {
//       try {
//         if (!rule.condition(tx)) continue;

//         if (!canSendAlert()) return;

//         console.log(`✨ Rule matched: ${rule.name}`);

//         const message = rule.message(tx);

//         // Save event
//         try {
//           await Event.create({
//             ruleId: rule.id,
//             transactionHash: tx.hash || 'N/A',
//             from: tx.from || 'Unknown',
//             to: tx.to || 'Contract Creation',
//             blockNumber: tx.blockNumber || 0,
//             priority: rule.priority || 'LOW',
//             message
//           });

//           console.log('💾 Event saved');
//         } catch (dbError) {
//           console.log('⚠️ DB save skipped');
//         }

//         // Send Telegram alerts
//         const users = await User.find();

//         for (const user of users) {
//           try {
//             await bot.sendMessage(user.chatId, message);
//             console.log(`📢 Sent to ${user.chatId}`);
//           } catch (err) {
//             console.log(`❌ Failed to send to ${user.chatId}`);
//           }
//         }
//       } catch (ruleError) {
//         console.log(`⚠️ Rule error: ${rule.name}`);
//       }
//     }
//   } catch (error) {
//     console.error('Error in processTransaction:', error.message);
//   }
// }




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
