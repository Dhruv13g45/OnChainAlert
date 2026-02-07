import dotenv from 'dotenv';
dotenv.config();

export const config = {
  // Polygon Mumbai Testnet (FREE - no API key needed)
  RPC_URL: process.env.RPC_URL || 'https://rpc-mumbai.maticvigil.com',
  
  // Alternative free RPC endpoints (backups)
  BACKUP_RPC: [
  'https://rpc-amoy.polygon.technology',
  'https://polygon-amoy-bor.publicnode.com',
  'https://rpc.ankr.com/polygon_amoy'
],


  
NETWORK: 'Polygon Amoy Testnet',
CHAIN_ID: 80002,
  START_BLOCK: 'latest',
  POLL_INTERVAL: 10000, // Check every 10 seconds (free tier friendly)
  
  // Alert thresholds
  LARGE_TX_THRESHOLD: '0.1', // 0.1 MATIC (test tokens)
  
  // Watched addresses for demo (add your test addresses here)
  WATCHED_ADDRESSES: [
    '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb', // Example faucet
  ]
};