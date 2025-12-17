// Meta Integration Status - Phase B.1
// Returns connection status and configuration

import { getMetaData, isTokenExpired } from '../utils/storage.mjs';
import { setSecurityHeaders, getAllowedOrigin } from '../utils/security.mjs';

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
    const userId = req.query.userId || 'default';
    const META_INTEGRATION_ENABLED = process.env.META_INTEGRATION_ENABLED === 'true';
    const META_POSTING_ENABLED = process.env.META_POSTING_ENABLED === 'true';
    const META_SCHEDULER_ENABLED = process.env.META_SCHEDULER_ENABLED === 'true';

    if (!META_INTEGRATION_ENABLED) {
      return res.status(200).json({
        enabled: false,
        connected: false,
        hasPageSelected: false,
        hasIgSelected: false,
        postingEnabled: false,
        schedulerEnabled: false,
        message: 'Meta integration not enabled'
      });
    }

    const data = await getMetaData(userId);
    const hasToken = !!data.access_token;
    const tokenExpired = hasToken && isTokenExpired(data.token_expires_at);
    const connected = hasToken && !tokenExpired;
    const hasPageSelected = !!data.selected_page_id;
    const hasIgSelected = !!data.selected_ig_business_account_id;

    return res.status(200).json({
      enabled: true,
      connected,
      tokenExpired,
      hasPageSelected,
      hasIgSelected,
      postingEnabled: META_POSTING_ENABLED,
      schedulerEnabled: META_SCHEDULER_ENABLED,
      user_name: data.user_name || null,
      selected_page_name: data.selected_page_name || null,
      connected_at: data.connected_at || null,
      page_selected_at: data.page_selected_at || null,
    });
  } catch (error) {
    console.error('Meta status error:', sanitizeForLogging({ message: error.message }));
    return res.status(500).json({
      success: false,
      error: 'Unable to fetch status. Please try again.'
    });
  }
}

