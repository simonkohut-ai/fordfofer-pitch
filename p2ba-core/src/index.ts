/**
 * 🚀 P2BA Core - Entry Point
 * Chiara's World - Prompt-to-Business Automation Platform
 */

import { BusinessAgentManager } from './core/BusinessAgentManager.js';

// Initialize the system
const manager = new BusinessAgentManager();

/**
 * Example usage and demonstration
 */
async function demonstrateP2BA() {
  console.log('\n' + '='.repeat(60));
  console.log('👑 Chiara\'s World - P2BA Core Platform');
  console.log('Prompt-to-Business Automation System');
  console.log('='.repeat(60) + '\n');

  // Example commands
  const exampleCommands = [
    "Create a dropshipping store for eco-friendly fitness gear",
    "Launch an influencer marketing campaign for sustainable products",
    "Build an e-commerce store selling tech accessories"
  ];

  // Execute first example
  console.log('📋 Example Command:');
  console.log(`"${exampleCommands[0]}"\n`);
  
  const result = await manager.executeP2BA(exampleCommands[0]);
  
  if (result.success) {
    console.log('\n✅ P2BA Execution Summary:');
    console.log(`   Project ID: ${result.projectId}`);
    console.log(`   Workflow Steps: ${result.workflow?.length || 0}`);
    console.log('\n📊 Workflow:');
    result.workflow?.forEach((step, index) => {
      console.log(`   ${index + 1}. ${step}`);
    });
  } else {
    console.log('\n❌ P2BA Execution Failed');
  }
}

// Run demonstration if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  demonstrateP2BA().catch(console.error);
}

// Export for use in other modules
export { BusinessAgentManager };
export * from './types/BusinessSchema.js';
export * from './agents/CodeAgent.js';
export * from './agents/MarketingAgent.js';
export * from './agents/IntegrationAgent.js';

