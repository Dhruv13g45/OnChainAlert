import { provider, TOKEN_ADDRESS, ABI } from "./config.js";
import { ethers } from "ethers";
import { handleTransfer } from "./eventHandler.js";

async function startIndexer() {
  console.log("⚡ Starting indexer...");

  try {
    const contract = new ethers.Contract(
      TOKEN_ADDRESS,
      ABI,
      provider
    );

    const block = await provider.getBlockNumber();

    console.log("---------------------------------------");
    console.log("✅ INDEXER LIVE");
    console.log(`📡 Connected to Amoy Block: #${block}`);
    console.log("👀 Listening for transfers...");
    console.log("---------------------------------------");

    
    contract.on("Transfer", (from, to, value) => {
      console.log("💎 Transfer detected");
      handleTransfer(from, to, value);
    });

  } catch (err) {
    console.log("❌ Connection failed. Retrying...");
    setTimeout(startIndexer, 2000);
  }
}

startIndexer();

export default startIndexer;
