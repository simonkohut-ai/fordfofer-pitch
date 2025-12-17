// Meta Pages API - Phase B.1
// Fetches user's Facebook Pages and Instagram Business accounts

import { getAccessToken, isTokenExpired, getMetaData, logEvent } from '../utils/storage.mjs';
import { setSecurityHeaders, getAllowedOrigin, sanitizeForLogging } from '../utils/security.mjs';

export default async function handler(req, res) {
  // Security headers
  setSecurityHeaders(res);
  
  // CORS (same-origin only in production)
  const allowedOrigin = getAllowedOrigin(req);
  if (allowedOrigin) {
    res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

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

    const userId = req.query.userId || 'default';
    const accessToken = await getAccessToken(userId);

    if (!accessToken) {
      return res.status(401).json({
        success: false,
        connected: false,
        message: 'Not connected to Meta. Please connect your account first.'
      });
    }

    const data = await getMetaData(userId);
    if (isTokenExpired(data.token_expires_at)) {
      return res.status(401).json({
        success: false,
        connected: false,
        tokenExpired: true,
        message: 'Meta token expired. Please reconnect your account.'
      });
    }

    // Fetch user's Pages
    const pagesUrl = `https://graph.facebook.com/v18.0/me/accounts?` +
      `access_token=${accessToken}&` +
      `fields=id,name,access_token,instagram_business_account{id,username}`;

    const pagesResponse = await fetch(pagesUrl);
    const pagesData = await pagesResponse.json();

    if (pagesData.error) {
      await logEvent(userId, 'pages_fetch_error', sanitizeForLogging({ error: pagesData.error.message }));
      return res.status(400).json({
        success: false,
        error: pagesData.error.message || 'Unable to fetch Pages.'
      });
    }

    // Normalize Pages data
    const pages = (pagesData.data || []).map(page => ({
      page_id: page.id,
      page_name: page.name,
      page_access_token: page.access_token,
      has_ig: !!page.instagram_business_account,
      ig_business_account_id: page.instagram_business_account?.id || null,
      ig_username: page.instagram_business_account?.username || null,
    }));

    await logEvent(userId, 'pages_fetched', { count: pages.length });

    return res.status(200).json({
      success: true,
      pages,
      selected_page_id: data.selected_page_id || null,
      selected_page_name: data.selected_page_name || null,
    });
  } catch (error) {
    console.error('Meta pages API error:', sanitizeForLogging({ message: error.message }));
    return res.status(500).json({
      success: false,
      error: 'Unable to fetch pages. Please try again.'
    });
  }
}
