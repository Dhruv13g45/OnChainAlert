import 'dotenv/config';
import express from 'express';
import { connectDB } from './Database/db.js';
import { startIndexer } from './Indexer/indexer.js';
import eventRoutes from './routes/eventRoutes.routes.js';
import { errorHandler, notFound } from './middleware/errorHandler.middleware.js';
import { startBot } from './Services/bot.js';


const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS headers (if needed for frontend)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

await startBot();
// Basic route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'OnChain Event Indexer API',
    version: '1.0.0',
    network: 'Polygon Mumbai Testnet',
    endpoints: {
      events: '/api/events',
      recent: '/api/events/recent',
      stats: '/api/events/stats',
      byAddress: '/api/events/address/:address'
    }
  });
});

// Health check
app.get('/health', (req, res) => {
  res.json({
    success: true,
    status: 'healthy',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api', eventRoutes);

// Error handling
app.use(notFound);
app.use(errorHandler);

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n\n🛑 Shutting down gracefully...');
  process.exit(0);
});

process.on('unhandledRejection', (error) => {
  console.error('Unhandled rejection:', error);
});

// Start application
async function start() {
  try {
    // 1. Connect to MongoDB
console.log('1️⃣  Connecting to database...');
await connectDB();

// 2. Start Telegram bot
console.log('\n2️⃣  Initializing Telegram bot...');
await startBot();
console.log('✅ Telegram bot initialized');

// 3. Start Express server
console.log('\n3️⃣  Starting API server...');
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});

// 4. Start blockchain indexer
console.log('\n4️⃣  Starting blockchain indexer...');
await startIndexer();
    
  } catch (error) {
    console.error('\n❌ Failed to start application:', error.message);
    process.exit(1);
  }
}

start();
