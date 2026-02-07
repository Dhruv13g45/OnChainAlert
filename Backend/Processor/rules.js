export const rules = [
  {
    id: 'demo_rule',
    name: 'Demo Activity Alert',
    description: 'Triggers for demo purposes',
    enabled: true,
    priority: 'LOW',

    // ALWAYS TRUE → sends alert for every tx
    condition: () => true,

    message: (tx) => {
      const from = tx.from || 'Unknown';
      const to = tx.to || 'Contract Creation';
      const hash = tx.hash
        ? tx.hash.slice(0, 12) + '...'
        : 'N/A';

      return (
        `🔔 DEMO BLOCKCHAIN ACTIVITY\n\n` +
        `📤 From: ${from}\n` +
        `📥 To: ${to}\n` +
        `🔗 Hash: ${hash}`
      );
    }
  }
];

export function getActiveRules() {
  return rules.filter(rule => rule.enabled);
}
