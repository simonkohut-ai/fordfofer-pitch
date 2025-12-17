// Meta OAuth Callback - Phase B.1
// Exchanges code for access token and stores it

import { storeToken, logEvent } from '../utils/storage.mjs';
import { setSecurityHeaders, validateRedirectUri, sanitizeForLogging } from '../utils/security.mjs';

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
        message: 'Meta integration not enabled.'
      });
    }

    const { code, error, state } = req.query;
    const userId = state || 'default';

    if (error) {
      await logEvent(userId, 'oauth_error', { error });
      return res.redirect(302, `/?meta=error&reason=${encodeURIComponent(error)}`);
    }

    if (!code) {
      return res.redirect(302, '/?meta=error&reason=missing_code');
    }

    // Exchange code for access token
    const META_APP_ID = process.env.META_APP_ID;
    const META_APP_SECRET = process.env.META_APP_SECRET;
    const META_REDIRECT_URI = process.env.META_REDIRECT_URI;
    
    // Validate redirect URI (must be exact match and HTTPS)
    const redirectValidation = validateRedirectUri(META_REDIRECT_URI, [
      'https://golocapo.com/api/meta/oauth/callback',
      process.env.META_REDIRECT_URI, // Allow configured URI
    ].filter(Boolean));
    
    if (!redirectValidation.valid) {
      await logEvent(userId, 'oauth_redirect_validation_error', { error: redirectValidation.error });
      return res.redirect(302, '/?meta=error&reason=invalid_redirect');
    }

    const tokenUrl = `https://graph.facebook.com/v18.0/oauth/access_token?` +
      `client_id=${META_APP_ID}&` +
      `client_secret=${META_APP_SECRET}&` +
      `redirect_uri=${encodeURIComponent(META_REDIRECT_URI)}&` +
      `code=${code}`;

    const tokenResponse = await fetch(tokenUrl);
    const tokenData = await tokenResponse.json();

    if (tokenData.error) {
      await logEvent(userId, 'oauth_token_error', sanitizeForLogging({ error: tokenData.error.message }));
      return res.redirect(302, `/?meta=error&reason=${encodeURIComponent(tokenData.error.message)}`);
    }

    const accessToken = tokenData.access_token;
    const expiresIn = tokenData.expires_in || 5184000; // Default 60 days
    const expiresAt = new Date(Date.now() + expiresIn * 1000).toISOString();

    // Get user info
    const meUrl = `https://graph.facebook.com/v18.0/me?access_token=${accessToken}&fields=id,name`;
    const meResponse = await fetch(meUrl);
    const meData = await meResponse.json();

    // Store token securely (never log)
    await storeToken(userId, accessToken, expiresAt, {
      id: meData.id,
      name: meData.name,
    });

    await logEvent(userId, 'oauth_success', sanitizeForLogging({
      user_id: meData.id,
      user_name: meData.name,
    }));

    // Redirect back to Automation Hub
    return res.redirect(302, '/?meta=connected');
  } catch (error) {
    console.error('Meta OAuth callback error:', sanitizeForLogging({ message: error.message }));
    return res.redirect(302, '/?meta=error&reason=server_error');
  }
}
