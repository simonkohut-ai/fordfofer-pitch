// Simple logging endpoint (server-side console only)
// No external services, no database - just console.log for debugging

import { withRateLimit } from './utils/rateLimit.mjs';
import { setSecurityHeaders, getAllowedOrigin, sanitizeForLogging } from './utils/security.mjs';

async function logHandler(req, res) {
  // Security headers
  setSecurityHeaders(res);
  
  // CORS (same-origin only in production)
  const allowedOrigin = getAllowedOrigin(req);
  if (allowedOrigin) {
    res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const event = req.body;
    
    // Sanitize before logging (never log tokens/secrets)
    const sanitized = sanitizeForLogging({
      timestamp: new Date().toISOString(),
      ...event
    });
    
    // Log to server console (Vercel logs)
    console.log('[Client Event]', JSON.stringify(sanitized));
    
    // Return success (non-blocking)
    return res.status(200).json({ success: true });
  } catch (error) {
    // Silently fail - logging should never break the app
    console.error('Log endpoint error:', sanitizeForLogging({ message: error.message }));
    return res.status(200).json({ success: false });
  }
}

export default withRateLimit(logHandler);

