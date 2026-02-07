// import { ethers } from 'ethers';
// import { config } from './config.js';
// import { processTransaction } from '../Processor/index.js';

// class EventHandler {
//   constructor() {
//     this.provider = null;
//     this.isRunning = false;
//     this.blockCount = 0;
//   }

//   async initialize() {
//     try {
//       // Try main RPC
//       this.provider = new ethers.JsonRpcProvider(config.RPC_URL);
      
//       // Test connection
//       const network = await this.provider.getNetwork();
//       console.log(`✅ Connected to ${config.NETWORK}`);
//       console.log(`📡 Chain ID: ${network.chainId}`);
      
//       return true;
//     } catch (error) {
//       console.error('❌ Failed to connect to RPC:', error.message);
      
//       // Try backup RPCs
//       for (const rpc of config.BACKUP_RPC) {
//         try {
//           console.log(`🔄 Trying backup RPC: ${rpc}`);
//           this.provider = new ethers.JsonRpcProvider(rpc);
//           await this.provider.getNetwork();
//           console.log('✅ Connected to backup RPC');
//           return true;
//         } catch (e) {
//           continue;
//         }
//       }
      
//       throw new Error('Could not connect to any RPC endpoint');
//     }
//   }

//   async start() {
//     if (this.isRunning) {
//       console.log('⚠️  Event handler already running');
//       return;
//     }

//     this.isRunning = true;
//     console.log('🚀 Starting blockchain event listener...');
//     console.log(`⏱️  Polling interval: ${config.POLL_INTERVAL / 1000}s`);

//     this.provider.on('block', async (blockNumber) => {
//     this.blockCount++;
//     console.log(`\n📦 New block detected: ${blockNumber} (Total: ${this.blockCount})`);
//     await this.processBlock(blockNumber);
// });

// // setTimeout(() => {
// //   console.log('\n🧪 Triggering test transaction...');
// //   processTransaction(null);
// // }, 5000);

//   }

//   async startPolling() {
//     let lastBlock = await this.provider.getBlockNumber();
    
//     setInterval(async () => {
//       try {
//         const currentBlock = await this.provider.getBlockNumber();
        
//         if (currentBlock > lastBlock) {
//           // Process all missed blocks
//           for (let i = lastBlock + 1; i <= currentBlock; i++) {
//             await this.processBlock(i);
//           }
//           lastBlock = currentBlock;
//         }
//       } catch (error) {
//         console.error('Polling error:', error.message);
//       }
//     }, config.POLL_INTERVAL);
//   }

//   async processBlock(blockNumber) {
//     try {
//       // Get block with transactions
//       const block = await this.provider.getBlock(blockNumber, true);
      
//       if (!block || !block.transactions) {
//         console.log(`⚠️  Block ${blockNumber} has no transactions`);
//         return;
//       }

//       const txCount = block.transactions.length;
//       console.log(`📊 Processing ${txCount} transactions in block ${blockNumber}`);

//       // Process each transaction
//       for (const tx of block.transactions) {
//         await processTransaction(tx);
//       }

//     } catch (error) {
//       console.error(`Error processing block ${blockNumber}:`, error.message);
//     }
//   }

//   async getTransaction(txHash) {
//     try {
//       const tx = await this.provider.getTransaction(txHash);
//       return tx;
//     } catch (error) {
//       console.error('Error fetching transaction:', error.message);
//       return null;
//     }
//   }

//   stop() {
//     this.isRunning = false;
//     this.provider.removeAllListeners();
//     console.log('🛑 Event handler stopped');
//   }
// }

// export default new EventHandler();




import { ethers } from 'ethers';
import { config } from './config.js';
import { processTransaction } from '../Processor/index.js';

class EventHandler {
  constructor() {
    this.provider = null;
    this.isRunning = false;
    this.blockCount = 0;
  }

  async initialize() {
    try {
      this.provider = new ethers.JsonRpcProvider(config.RPC_URL);

      const network = await this.provider.getNetwork();
      console.log(`✅ Connected to ${config.NETWORK}`);
      console.log(`📡 Chain ID: ${network.chainId}`);

      return true;
    } catch (error) {
      console.error('❌ Failed to connect to RPC:', error.message);

      for (const rpc of config.BACKUP_RPC) {
        try {
          console.log(`🔄 Trying backup RPC: ${rpc}`);
          this.provider = new ethers.JsonRpcProvider(rpc);
          await this.provider.getNetwork();
          console.log('✅ Connected to backup RPC');
          return true;
        } catch (e) {
          continue;
        }
      }

      throw new Error('Could not connect to any RPC endpoint');
    }
  }

  async start() {
    if (this.isRunning) {
      console.log('⚠️  Event handler already running');
      return;
    }

    this.isRunning = true;
    console.log('🚀 Starting blockchain event listener...');
    console.log(`⏱️  Polling interval: ${config.POLL_INTERVAL / 1000}s`);

    this.provider.on('block', async (blockNumber) => {
      try {
        this.blockCount++;
        console.log(`\n📦 New block detected: ${blockNumber} (Total: ${this.blockCount})`);
        await this.processBlock(blockNumber);
      } catch (err) {
        console.error('Block listener error:', err.message);
      }
    });
  }

  async processBlock(blockNumber) {
  try {
    const block = await this.provider.getBlock(blockNumber);

    if (!block || !block.transactions) {
      console.log(`⚠️ Block ${blockNumber} has no transactions`);
      return;
    }

    const txCount = block.transactions.length;
    console.log(`📊 Processing ${txCount} transactions in block ${blockNumber}`);

    for (const txHash of block.transactions) {
      try {
        const tx = await this.provider.getTransaction(txHash);
        if (tx) {
          await processTransaction(tx);
        }
      } catch (err) {
        console.error("Failed to fetch tx:", txHash);
      }
    }

  } catch (error) {
    console.error(`Error processing block ${blockNumber}:`, error.message);
  }
}


  async getTransaction(txHash) {
    try {
      const tx = await this.provider.getTransaction(txHash);
      return tx;
    } catch (error) {
      console.error('Error fetching transaction:', error.message);
      return null;
    }
  }

  stop() {
    this.isRunning = false;
    this.provider.removeAllListeners();
    console.log('🛑 Event handler stopped');
  }
}

export default new EventHandler();
