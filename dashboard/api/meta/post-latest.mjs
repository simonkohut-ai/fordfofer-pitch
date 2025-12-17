// Meta post-latest endpoint
// Posts latest generated content to selected Facebook Page
// Requires explicit confirmation token

import { setSecurityHeaders } from '../utils/security.mjs';
import { sanitizeForLogging } from '../utils/security.mjs';
import { getAccessToken, storeSelectedPage, logEvent } from '../utils/storage.mjs';
import { getMetaData } from '../utils/storage.mjs';
import { applyRateLimit } from '../utils/rateLimit.mjs';

export default async function handler(req, res) {
  setSecurityHeaders(res);
  
  // Rate limiting
  const rateLimitResult = await applyRateLimit(req, 'meta-post', { maxRequests: 5, windowMs: 60000 });
  if (!rateLimitResult.allowed) {
    return res.status(429).json({
      success: false,
      error: 'Rate limit exceeded. Please try again later.',
    });
  }
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  // Check if posting is enabled
  if (process.env.META_POSTING_ENABLED !== 'true') {
    return res.status(501).json({
      success: false,
      error: 'Meta posting is not enabled. Set META_POSTING_ENABLED=true to enable.',
    });
  }
  
  try {
    const { confirmationToken, content } = req.body;
    const userId = 'default';
    
    // Verify confirmation token (CSRF protection)
    // Token format: "confirm-post-{timestamp}" where timestamp is within last 60 seconds
    if (!confirmationToken || !confirmationToken.startsWith('confirm-post-')) {
      return res.status(400).json({
        success: false,
        error: 'Invalid or missing confirmation token. Please confirm again.',
      });
    }
    
    // Extract timestamp from token
    const tokenTimestamp = parseInt(confirmationToken.replace('confirm-post-', ''));
    const now = Math.floor(Date.now() / 1000); // Current time in seconds
    const tokenAge = now - tokenTimestamp;
    
    // Token must be within last 60 seconds
    if (isNaN(tokenTimestamp) || tokenAge < 0 || tokenAge > 60) {
      return res.status(400).json({
        success: false,
        error: 'Confirmation token expired. Please confirm again.',
      });
    }
    
    // Get Meta connection data
    const metaData = await getMetaData(userId);
    if (!metaData.selected_page_id || !metaData.selected_page_access_token) {
      return res.status(400).json({
        success: false,
        error: 'No Facebook Page selected. Please select a page first.',
      });
    }
    
    const pageId = metaData.selected_page_id;
    const pageAccessToken = metaData.selected_page_access_token;
    const pageName = metaData.selected_page_name || 'Facebook Page';
    
    // Get content to post (use provided content or latest generated)
    const postContent = content || metaData.latest_generated_content || 'Check out AI Marketing Studio!';
    
    // Validate content
    if (!postContent || postContent.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: 'No content to post. Generate content first.',
      });
    }
    
    if (postContent.length > 5000) {
      return res.status(400).json({
        success: false,
        error: 'Content too long. Maximum 5000 characters.',
      });
    }
    
    // Post to Facebook Page via Graph API
    const graphUrl = `https://graph.facebook.com/v18.0/${pageId}/feed`;
    const postData = {
      message: postContent,
      access_token: pageAccessToken,
    };
    
    const fbResponse = await fetch(graphUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    });
    
    const fbResult = await fbResponse.json();
    
    if (!fbResponse.ok) {
      console.error('Facebook API error:', sanitizeForLogging(fbResult));
      return res.status(500).json({
        success: false,
        error: `Facebook API error: ${fbResult.error?.message || 'Unknown error'}`,
      });
    }
    
    // Log event (sanitized)
    await logEvent(userId, 'meta_post_success', {
      page_id: pageId,
      page_name: pageName,
      post_id: fbResult.id,
      content_length: postContent.length,
    });
    
    return res.status(200).json({
      success: true,
      postId: fbResult.id,
      pageName,
      message: `Posted successfully to ${pageName}`,
    });
    
  } catch (error) {
    console.error('Post-latest error:', error.message);
    return res.status(500).json({
      success: false,
      error: 'Failed to post. Please try again.',
    });
  }
}

