// Checkout URL endpoint
// Returns Stripe checkout URL from environment variable

import { setSecurityHeaders, getAllowedOrigin } from './utils/security.mjs';

export default async function handler(req, res) {
  try {
    // Security headers (fail-safe)
    setSecurityHeaders(res);
    
    // CORS (same-origin only in production)
    const allowedOrigin = getAllowedOrigin(req);
    if (allowedOrigin) {
      res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
    }
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    
    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }
    
    // Fail-safe: return empty URL if env var missing (don't crash)
    const checkoutUrl = process.env?.STRIPE_CHECKOUT_URL || '';
    
    if (!checkoutUrl) {
      // Return 200 with empty URL instead of 500 (homepage can handle this)
      return res.status(200).json({
        success: false,
        url: null,
        error: 'Checkout URL not configured'
      });
    }
    
    return res.status(200).json({
      success: true,
      url: checkoutUrl
    });
  } catch (error) {
    // Fail-safe: log error but return 200 with empty response
    console.error('Checkout URL API error:', error.message);
    return res.status(200).json({
      success: false,
      url: null,
      error: 'Unable to retrieve checkout URL'
    });
  }
}

