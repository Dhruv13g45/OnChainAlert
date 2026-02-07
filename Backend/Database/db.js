import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// Use your environment variable name
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/onchain';

export async function connectDB() {
  try {
    await mongoose.connect(MONGO_URI);
    
    console.log('✅ MongoDB Atlas connected successfully');
    console.log(`📊 Database: ${mongoose.connection.name}`);
    
    // Handle connection events
    mongoose.connection.on('error', (error) => {
      console.error('MongoDB error:', error.message);
    });
    
    mongoose.connection.on('disconnected', () => {
      console.log('⚠️  MongoDB disconnected');
    });
    
    return true;
    
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    console.log('\n💡 Troubleshooting steps:');
    console.log('   1. Check your MONGO_URI in .env file');
    console.log('   2. Make sure IP whitelist is set to 0.0.0.0/0 in MongoDB Atlas');
    console.log('   3. Verify your MongoDB Atlas credentials\n');
    
    throw error;
  }
}