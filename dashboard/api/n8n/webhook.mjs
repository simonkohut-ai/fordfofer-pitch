// n8n webhook endpoint (optional forwarder)
// Allows n8n to receive waitlist signups directly or as a forwarder from Vercel API

import { setSecurityHeaders } from '../utils/security.mjs';

export default async function handler(req, res) {
  setSecurityHeaders(res);
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, source, consent, timestamp } = req.body;
    
    // Validate email
    if (!email || typeof email !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Email is required',
      });
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid email format',
      });
    }
    
    // Forward to n8n webhook (if configured)
    const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL;
    
    if (n8nWebhookUrl) {
      try {
        const response = await fetch(n8nWebhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email,
            source: source || 'prelaunch',
            consent: consent || false,
            timestamp: timestamp || new Date().toISOString(),
          }),
        });
        
        if (!response.ok) {
          console.error('n8n webhook error:', response.status, response.statusText);
        }
      } catch (err) {
        console.error('n8n webhook fetch error:', err.message);
        // Don't fail the request if n8n is down
      }
    }
    
    // Always return success (don't block if n8n fails)
    return res.status(200).json({
      success: true,
      message: 'Received',
      forwarded: !!n8nWebhookUrl,
    });
    
  } catch (error) {
    console.error('n8n webhook handler error:', error.message);
    return res.status(500).json({
      success: false,
      error: 'Unable to process request',
    });
  }
}

