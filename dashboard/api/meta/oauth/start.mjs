// Meta OAuth Start - Phase B.1
// Redirects to Meta authorization URL

import { setSecurityHeaders, validateRedirectUri } from '../utils/security.mjs';

export default async function handler(req, res) {
  // Security headers
  setSecurityHeaders(res);
  
  // CORS handled by redirect (no CORS headers needed for redirects)

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // Check if Meta integration is enabled
    const META_INTEGRATION_ENABLED = process.env.META_INTEGRATION_ENABLED === 'true';
    
    if (!META_INTEGRATION_ENABLED) {
      return res.status(501).json({
        success: false,
        enabled: false,
        message: 'Meta integration not enabled. Set META_INTEGRATION_ENABLED=true to enable Phase B.'
      });
    }

    // Check required env vars
    const META_APP_ID = process.env.META_APP_ID;
    const META_APP_SECRET = process.env.META_APP_SECRET;
    const META_REDIRECT_URI = process.env.META_REDIRECT_URI;

    const missingVars = [];
    if (!META_APP_ID) missingVars.push('META_APP_ID');
    if (!META_APP_SECRET) missingVars.push('META_APP_SECRET');
    if (!META_REDIRECT_URI) missingVars.push('META_REDIRECT_URI');

    if (missingVars.length > 0) {
      return res.status(500).json({
        success: false,
        enabled: true,
        configured: false,
        message: 'Meta integration enabled but missing required environment variables.',
        missingVars: missingVars
      });
    }

    // Build scopes based on enabled features
    const scopes = ['pages_show_list', 'pages_read_engagement'];
    
    if (process.env.META_POSTING_ENABLED === 'true') {
      scopes.push('pages_manage_posts');
    }
    
    if (process.env.META_IG_ENABLED === 'true') {
      scopes.push('instagram_basic', 'instagram_content_publish');
    }

    // Validate redirect URI (must be exact match and HTTPS)
    const redirectValidation = validateRedirectUri(META_REDIRECT_URI, [
      'https://golocapo.com/api/meta/oauth/callback',
      process.env.META_REDIRECT_URI, // Allow configured URI
    ].filter(Boolean));
    
    if (!redirectValidation.valid) {
      return res.status(400).json({
        success: false,
        error: 'Invalid redirect URI configuration'
      });
    }
    
    // Build OAuth URL
    const authUrl = `https://www.facebook.com/v18.0/dialog/oauth?` +
      `client_id=${META_APP_ID}&` +
      `redirect_uri=${encodeURIComponent(META_REDIRECT_URI)}&` +
      `scope=${scopes.join(',')}&` +
      `response_type=code&` +
      `state=${encodeURIComponent(req.query.state || 'default')}`;

    // Redirect to Meta
    return res.redirect(302, authUrl);
  } catch (error) {
    console.error('Meta OAuth start error:', error.message);
    return res.status(500).json({
      success: false,
      error: 'Unable to start OAuth flow. Please try again.'
    });
  }
}
