// Meta Select Page - Phase B.1
// Stores selected Page and IG account

import { storeSelectedPage, logEvent, getMetaData } from '../utils/storage.mjs';
import { setSecurityHeaders, getAllowedOrigin, validateInput, validateUserId, sanitizeForLogging } from '../utils/security.mjs';

export default async function handler(req, res) {
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
    const META_INTEGRATION_ENABLED = process.env.META_INTEGRATION_ENABLED === 'true';
    
    if (!META_INTEGRATION_ENABLED) {
      return res.status(501).json({
        success: false,
        enabled: false,
        message: 'Meta integration not enabled.'
      });
    }

    const userId = req.body.userId || 'default';
    const { pageId, pageName, pageAccessToken, igBusinessAccountId } = req.body;

    // Validate userId
    const userIdValidation = validateUserId(userId);
    if (!userIdValidation.valid) {
      return res.status(400).json({
        success: false,
        error: userIdValidation.error
      });
    }

    // Validate inputs
    if (!pageId || !pageAccessToken) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: pageId, pageAccessToken'
      });
    }
    
    const pageIdValidation = validateInput(pageId, { minLength: 1, maxLength: 100 });
    if (!pageIdValidation.valid) {
      return res.status(400).json({
        success: false,
        error: 'Invalid pageId format'
      });
    }

    // Store selected page
    await storeSelectedPage(userId, pageId, pageName, pageAccessToken, igBusinessAccountId);
    await logEvent(userId, 'page_selected', sanitizeForLogging({
      page_id: pageId,
      page_name: pageName,
      has_ig: !!igBusinessAccountId,
    }));

    return res.status(200).json({
      success: true,
      message: 'Page selected successfully',
      selected_page_id: pageId,
      selected_page_name: pageName,
    });
  } catch (error) {
    console.error('Meta select page error:', sanitizeForLogging({ message: error.message }));
    return res.status(500).json({
      success: false,
      error: 'Unable to select page. Please try again.'
    });
  }
}

