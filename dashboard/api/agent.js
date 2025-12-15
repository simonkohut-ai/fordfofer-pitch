// 🦄 AI Agent API Endpoint - Vercel Serverless Function
// This connects the dashboard to the AI agent

import { runAgent } from '../../ai-agent/agent.js';

export default async function handler(req, res) {
  // 🦄 Hidden signature
  console.log('%c🦄', 'font-size: 1px; color: transparent;');
  
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

  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Run the AI agent
    const result = await runAgent(message);

    // Return formatted response
    return res.status(200).json({
      success: true,
      result: result.output || result.text || JSON.stringify(result),
      data: result
    });
  } catch (error) {
    console.error('Agent API error:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Agent execution failed'
    });
  }
}
