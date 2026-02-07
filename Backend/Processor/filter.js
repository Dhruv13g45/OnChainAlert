import { ethers } from 'ethers';
import { config } from '../Indexer/config.js';

export const filters = {
  // Filter 1: Large transactions
  isLargeTransaction: (tx) => {
    try {
      if (!tx.value) return false;
      
      const valueInMatic = ethers.formatEther(tx.value);
      const threshold = parseFloat(config.LARGE_TX_THRESHOLD);
      
      return parseFloat(valueInMatic) >= threshold;
    } catch (error) {
      return false;
    }
  },

  // Filter 2: Watched addresses
  isWatchedAddress: (tx) => {
    const watched = config.WATCHED_ADDRESSES.map(addr => addr.toLowerCase());
    const from = tx.from?.toLowerCase();
    const to = tx.to?.toLowerCase();
    
    return watched.includes(from) || watched.includes(to);
  },

  // Filter 3: Contract interactions
  isContractInteraction: (tx) => {
    return tx.to === null || (tx.data && tx.data !== '0x');
  },

  // Filter 4: Zero value transactions (might be contract calls)
  isZeroValueTx: (tx) => {
    return tx.value && tx.value.toString() === '0';
  },

  // Filter 5: High gas transactions (unusual activity)
  isHighGasTx: (tx) => {
    if (!tx.gasLimit) return false;
    const gasLimit = Number(tx.gasLimit);
    return gasLimit > 500000; // Unusually high gas
  }
};