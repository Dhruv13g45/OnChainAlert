import rules from "./rules.js";
function filterEvent(event) {
  const amount = Number(event.amount);

  if (amount < rules.MIN_AMOUNT) return null;
  if (!rules.ALLOWED_TOKENS.includes(event.token)) return null;
  if (event.from === event.to) return null;

  return {
    ...event,
    alertType: "HIGH_VALUE_TRANSFER"
  };
}

export default filterEvent