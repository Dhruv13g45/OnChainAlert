import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { processTransaction } from '../Processor/index.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

// Fake addresses
const addresses = [
  '0x1111111111111111111111111111111111111111',
  '0x2222222222222222222222222222222222222222',
  '0x3333333333333333333333333333333333333333',
  '0x4444444444444444444444444444444444444444'
];

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function generateFakeTx() {
  const from = addresses[Math.floor(Math.random() * addresses.length)];
  const to = addresses[Math.floor(Math.random() * addresses.length)];

  return {
    hash: '0x' + Math.random().toString(16).substring(2, 18),
    from,
    to,
    value: BigInt(Math.floor(randomBetween(1, 5) * 1e18)),
    blockNumber: Math.floor(randomBetween(1000000, 9999999))
  };
}

async function start() {
  await mongoose.connect(MONGO_URI);
  console.log('✅ Connected to MongoDB');

  console.log('🚀 Fake transaction generator started...\n');

  setInterval(async () => {
    const tx = generateFakeTx();
    console.log('🧪 Fake tx:', tx.hash);

    await processTransaction(tx);
  }, 4000); // every 4 seconds
}

start();
