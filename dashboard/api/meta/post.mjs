// Meta Post - Phase B.2 Human-approved Posting
// Posts latest generated content to selected Facebook Page

import { getMetaData, logEvent, getAccessToken, setMetaData } from '../utils/storage.mjs';
import { withRateLimit } from '../utils/rateLimit.mjs';
import { setSecurityHeaders, getAllowedOrigin, validateInput, validateUserId, sanitizeForLogging } from '../utils/security.mjs';

async function postHandler(req, res) {
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
    // Check if posting is enabled
    const META_POSTING_ENABLED = process.env.META_POSTING_ENABLED === 'true';
    
    if (!META_POSTING_ENABLED) {
      return res.status(501).json({
        success: false,
        enabled: false,
        message: 'Meta posting not enabled. Set META_POSTING_ENABLED=true to enable.'
      });
    }

    const userId = req.body.userId || 'default';
    const { message, confirm } = req.body;

    // Validate userId
    const userIdValidation = validateUserId(userId);
    if (!userIdValidation.valid) {
      return res.status(400).json({
        success: false,
        error: userIdValidation.error
      });
    }

    // Safety checks
    if (!confirm) {
      return res.status(400).json({
        success: false,
        error: 'Posting requires explicit confirmation. Set confirm=true.'
      });
    }

    // Validate message input
    const messageValidation = validateInput(message, {
      minLength: 10,
      maxLength: 5000,
      allowEmpty: false,
    });
    
    if (!messageValidation.valid) {
      return res.status(400).json({
        success: false,
        error: messageValidation.error
      });
    }

    // Get selected page
    const data = await getMetaData(userId);
    const pageId = data.selected_page_id;
    const pageAccessToken = data.selected_page_access_token;

    if (!pageId || !pageAccessToken) {
      return res.status(400).json({
        success: false,
        error: 'No page selected. Please select a page first.'
      });
    }

    // Post to Facebook Page
    const postUrl = `https://graph.facebook.com/v18.0/${pageId}/feed`;
    const postData = new URLSearchParams({
      message: message.trim(),
      access_token: pageAccessToken,
    });

    const postResponse = await fetch(postUrl, {
      method: 'POST',
      body: postData,
    });

    const postResult = await postResponse.json();

    if (postResult.error) {
      await logEvent(userId, 'meta_post_error', sanitizeForLogging({
        page_id: pageId,
        error: postResult.error.message,
        error_code: postResult.error.code,
      }));

      return res.status(400).json({
        success: false,
        error: postResult.error.message || 'Unable to post to Facebook.',
        error_code: postResult.error.code,
      });
    }

    // Get post permalink
    let permalink = null;
    if (postResult.id) {
      try {
        const permalinkUrl = `https://graph.facebook.com/v18.0/${postResult.id}?` +
          `access_token=${pageAccessToken}&` +
          `fields=permalink_url`;
        const permalinkResponse = await fetch(permalinkUrl);
        const permalinkData = await permalinkResponse.json();
        permalink = permalinkData.permalink_url || null;
      } catch (error) {
        // Permalink fetch failed, but post succeeded
        console.error('Permalink fetch error:', error.message);
      }
    }

    await logEvent(userId, 'meta_post_success', sanitizeForLogging({
      page_id: pageId,
      post_id: postResult.id,
      message_length: message.length,
      has_permalink: !!permalink,
    }));

    // Update last post info
    const updated = {
      ...data,
      last_post_id: postResult.id,
      last_post_permalink: permalink,
      last_post_at: new Date().toISOString(),
    };
    await setMetaData(userId, updated);

    return res.status(200).json({
      success: true,
      post_id: postResult.id,
      permalink,
      message: 'Posted to Facebook successfully',
    });
  } catch (error) {
    // Never log tokens or secrets
    console.error('Meta post error:', sanitizeForLogging({ message: error.message }));
    return res.status(500).json({
      success: false,
      error: 'Unable to post. Please try again.'
    });
  }
}

export default withRateLimit(postHandler);

