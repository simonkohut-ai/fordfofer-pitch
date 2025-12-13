/**
 * 🎬 P2BA Core - Demonstration Script
 * Shows the complete workflow from prompt to business deployment
 */

import { BusinessAgentManager } from './src/core/BusinessAgentManager.js';

async function runDemo() {
  console.log('\n' + '═'.repeat(70));
  console.log('👑 CHIARA\'S WORLD - P2BA CORE DEMONSTRATION');
  console.log('═'.repeat(70) + '\n');

  const manager = new BusinessAgentManager();

  // Demo Command 1: Dropshipping Store
  console.log('📋 DEMO 1: Creating Dropshipping Store\n');
  const result1 = await manager.executeP2BA(
    "Create a dropshipping store for eco-friendly fitness gear targeting health-conscious millennials"
  );

  console.log('\n' + '-'.repeat(70));
  console.log('📊 RESULT SUMMARY:');
  console.log('-'.repeat(70));
  console.log(`✅ Success: ${result1.success}`);
  if (result1.projectId) {
    console.log(`📦 Project ID: ${result1.projectId}`);
    console.log(`🔗 Deployment URL: ${result1.results?.deployment?.url || 'N/A'}`);
    console.log(`📈 Workflow Steps: ${result1.workflow?.length || 0}`);
  }
  console.log('-'.repeat(70) + '\n');

  // Wait a bit before next demo
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Demo Command 2: Influencer Campaign
  console.log('\n📋 DEMO 2: Launching Influencer Campaign\n');
  const result2 = await manager.executeP2BA(
    "Launch an influencer marketing campaign for sustainable beauty products with AI persona 'EcoBeauty Emma'"
  );

  console.log('\n' + '-'.repeat(70));
  console.log('📊 RESULT SUMMARY:');
  console.log('-'.repeat(70));
  console.log(`✅ Success: ${result2.success}`);
  if (result2.projectId) {
    console.log(`📦 Project ID: ${result2.projectId}`);
    console.log(`📱 Social Media Posts Generated: ${result2.results?.marketingStrategy?.strategy?.socialMediaPosts?.length || 0}`);
  }
  console.log('-'.repeat(70) + '\n');

  // List all projects
  console.log('\n📋 ALL ACTIVE PROJECTS:');
  console.log('-'.repeat(70));
  const projects = manager.listProjects();
  projects.forEach((project, index) => {
    console.log(`${index + 1}. ${project.name} (${project.id}) - Status: ${project.status}`);
  });
  console.log('-'.repeat(70) + '\n');

  console.log('✅ Demonstration Complete!\n');
}

// Run demo
runDemo().catch(error => {
  console.error('❌ Demo Error:', error);
  process.exit(1);
});

