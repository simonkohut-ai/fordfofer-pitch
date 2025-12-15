// Simple solution: Use public HTTPS endpoint via Vercel Edge Function
// This will be deployed to Vercel and forward to your local MCP
export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  // Simple MCP mock response
  return res.status(200).json({
    success: true,
    message: 'Chiara MCP endpoint active',
    timestamp: new Date().toISOString(),
    echo: req.body || {}
  });
}


