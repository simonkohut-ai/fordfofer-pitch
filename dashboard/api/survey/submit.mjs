// Survey submission API
// Links responses to leads if email exists

import { setSecurityHeaders } from '../utils/security.mjs';
import { sanitizeForLogging } from '../utils/security.mjs';
import { getLeadByEmail, updateLead, createLead } from '../utils/leads-storage.mjs';
import { applyRateLimit } from '../utils/rateLimit.mjs';

export default async function handler(req, res) {
  setSecurityHeaders(res);
  
  // Rate limiting
  const rateLimitResult = await applyRateLimit(req, 'survey-submit', { maxRequests: 3, windowMs: 60000 });
  if (!rateLimitResult.allowed) {
    return res.status(429).json({
      success: false,
      error: 'Too many requests. Please try again later.',
    });
  }
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    const { email, automation, pain, type, feedback } = req.body;
    
    // Validate required fields
    if (!automation || !pain || !type) {
      return res.status(400).json({
        success: false,
        error: 'Please answer all required questions',
      });
    }
    
    // Store survey response
    const response = {
      automation,
      pain,
      type,
      feedback: feedback || null,
      submittedAt: new Date().toISOString(),
    };
    
    // If email provided, link to lead
    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          success: false,
          error: 'Invalid email format',
        });
      }
      
      // Check if lead exists
      let lead = await getLeadByEmail(email);
      
      if (lead) {
        // Update existing lead
        await updateLead(email, {
          surveyCompleted: true,
          surveyResponse: response,
          tags: [...new Set([...(lead.tags || []), 'survey'])],
        });
      } else {
        // Create new lead with survey tag
        lead = await createLead(email, 'survey', false, ['survey']);
        await updateLead(email, {
          surveyCompleted: true,
          surveyResponse: response,
        });
      }
    }
    
    // Store survey response (for aggregation)
    const { getStorage, setStorage } = await import('../utils/payment-storage.mjs');
    const surveys = await getStorage('surveys', 'all') || [];
    surveys.push(response);
    
    // Keep last 1000 surveys
    const recentSurveys = surveys.slice(-1000);
    await setStorage('surveys', 'all', recentSurveys);
    
    // Sanitize for logging
    const sanitized = sanitizeForLogging({
      email: email ? email.split('@')[0] + '@***' : 'anonymous',
      automation,
      pain,
      type,
    });
    console.log('Survey submitted:', sanitized);
    
    return res.status(200).json({
      success: true,
      message: 'Survey submitted successfully',
    });
    
  } catch (error) {
    console.error('Survey submission error:', error.message);
    return res.status(500).json({
      success: false,
      error: 'Unable to process survey. Please try again.',
    });
  }
}

