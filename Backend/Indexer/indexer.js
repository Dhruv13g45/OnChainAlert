import eventHandler from './eventHandler.js';

export async function startIndexer() {
  try {
    console.log('\n═══════════════════════════════════════');
    console.log('🔗 ONCHAIN EVENT INDEXER');
    console.log('═══════════════════════════════════════\n');
    
    // Initialize connection
    await eventHandler.initialize();
    
    // Start listening
    await eventHandler.start();
    
    console.log('\n✅ Indexer is now running!');
    console.log('💡 Watching for blockchain events...\n');
    
  } catch (error) {
    console.error('❌ Failed to start indexer:', error.message);
    throw error;
  }
}

export { eventHandler };