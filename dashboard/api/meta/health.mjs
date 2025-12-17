// Meta integration health check
import { getMetaData } from '../utils/storage.mjs';
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
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  try {
    const userId = req.query.userId || 'default';
    const data = await getMetaData(userId);
    
    const health = {
      status: 'ok',
      timestamp: new Date().toISOString(),
      integration_enabled: process.env.META_INTEGRATION_ENABLED === 'true',
      posting_enabled: process.env.META_POSTING_ENABLED === 'true',
      connected: !!data.access_token,
      has_page_selected: !!data.selected_page_id,
      last_post_at: data.last_post_at || null,
      events_count: (data.events || []).length,
    };
    
    return res.status(200).json(health);
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      error: error.message,
    });
  }
}

