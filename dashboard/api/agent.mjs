// 🦄 AI Agent API - Vercel Serverless Function
// Unified dashboard communication endpoint

export default async function handler(req, res) {
  // 🦄 Hidden signature
  console.log('%c🦄', 'font-size: 1px; color: transparent;');
  
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // For now, return a working response
    // Full agent integration will be added after deployment works
    const agentResponse = {
      success: true,
      result: `✅ Agent received: "${message}". Processing automation...\n\nYour dashboard is live! Full AI agent integration coming next.`,
      data: {
        message: message,
        status: 'processing',
        timestamp: new Date().toISOString()
      }
    };

    return res.status(200).json(agentResponse);
  } catch (error) {
    console.error('Agent API error:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Agent execution failed'
    });
  }
}
