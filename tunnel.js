const fs = require('fs');
const path = require('path');
const localtunnel = require('localtunnel');

(async () => {
  const port = process.env.PORT || 4000;
  const tunnel = await localtunnel({ port });

  const url = `${tunnel.url}/mcp`;
  const filePath = path.join(__dirname, 'tunnel-url.txt');
  fs.writeFileSync(filePath, url, 'utf8');
  console.log('-------------------------------------');
  console.log('Chiara MCP tunnel je pripraveny:');
  console.log('URL:', url);
  console.log('Poznamka: nechaj tento proces bezat, kym to pouzivas v ChatGPT.');
  console.log('-------------------------------------');

  tunnel.on('close', () => {
    console.log('Tunnel zatvoreny');
  });

  // Udrz proces pri zivote
  setInterval(() => {}, 1 << 30);
})();

