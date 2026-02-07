import { sendTelegramMessage } from '../Services/bot.js';

export async function sendAlert(alert) {
  try {
    console.log(`\n📢 ALERT TRIGGERED: ${alert.ruleName}`);
    console.log(`🎯 Priority: ${alert.priority}`);
    
    // Send to Telegram
    const sent = await sendTelegramMessage(alert.message);
    
    if (sent) {
      console.log('✅ Telegram notification sent');
    } else {
      console.log('⚠️  Failed to send Telegram notification');
    }
    
    return sent;
    
  } catch (error) {
    console.error('❌ Error sending alert:', error.message);
    return false;
  }
}