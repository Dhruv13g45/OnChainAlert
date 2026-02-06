import filterEvent from "./filter.js";
import sendToDatabase from "./sender.js";

function processEvent(event) {
  const filtered = filterEvent(event);

  if (filtered) {
    sendToDatabase(filtered);
    console.log("Event forwarded");
  } else {
    console.log("Event ignored");
  }
}

// ---- test event ----
const testEvent = {
  from: "0xAAA111",
  to: "0xBBB222",
  amount: "500",
  token: "USDT",
  txHash: "0xTEST123"
};

processEvent(testEvent);
