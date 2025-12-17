// Meta Disconnect - Phase B.1
// Clears all Meta tokens and selections

import { deleteMetaData, logEvent } from '../utils/storage.mjs';
import { setSecurityHeaders, getAllowedOrigin, validateUserId, sanitizeForLogging } from '../utils/security.mjs';

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
    const userId = req.body.userId || 'default';
    
    // Validate userId
    const userIdValidation = validateUserId(userId);
    if (!userIdValidation.valid) {
      return res.status(400).json({
        success: false,
        error: userIdValidation.error
      });
    }
    
    await logEvent(userId, 'meta_disconnected', sanitizeForLogging({}));
    await deleteMetaData(userId);

    return res.status(200).json({
      success: true,
      message: 'Disconnected from Meta successfully'
    });
  } catch (error) {
    console.error('Meta disconnect error:', sanitizeForLogging({ message: error.message }));
    return res.status(500).json({
      success: false,
      error: 'Unable to disconnect. Please try again.'
    });
  }
}

