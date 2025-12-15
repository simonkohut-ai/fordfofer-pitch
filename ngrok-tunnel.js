import ngrok from 'ngrok';
import fs from 'fs';

(async function() {
  try {
    console.log('🚀 Starting ngrok tunnel...');
    const url = await ngrok.connect({
      addr: 4000,
      proto: 'http'
    });
    
    const mcpUrl = `${url}/mcp`;
    console.log('✅ Ngrok tunnel active!');
    console.log('📋 MCP URL:', mcpUrl);
    
    fs.writeFileSync('ngrok-url.txt', mcpUrl);
    console.log('💾 URL saved to ngrok-url.txt');
    
    // Keep running
    console.log('⏳ Tunnel is running... Press Ctrl+C to stop.');
  } catch (err) {
    console.error('❌ Ngrok error:', err);
    process.exit(1);
  }
})();


