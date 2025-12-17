// Lead submission API
// Captures email from pre-launch landing page

import { setSecurityHeaders } from '../utils/security.mjs';
import { sanitizeForLogging } from '../utils/security.mjs';
import { createLead, getLeadByEmail } from '../utils/leads-storage.mjs';
import { applyRateLimit } from '../utils/rateLimit.mjs';
import { sendEmail } from '../utils/email.mjs';

export default async function handler(req, res) {
  setSecurityHeaders(res);
  
  // Rate limiting
  const rateLimitResult = await applyRateLimit(req, 'lead-submit', { maxRequests: 5, windowMs: 60000 });
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
    const { email, consent, source = 'landing' } = req.body;
    
    // Validate email
    if (!email || typeof email !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Email is required',
      });
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid email format',
      });
    }
    
    // Validate consent (GDPR requirement)
    if (consent !== true) {
      return res.status(400).json({
        success: false,
        error: 'Consent is required to join the waitlist',
      });
    }
    
    // Check if already exists
    const existingLead = await getLeadByEmail(email);
    if (existingLead) {
      // Return success even if exists (don't reveal if email exists)
      return res.status(200).json({
        success: true,
        message: 'You\'re already on the list. Check your email for updates.',
        alreadyExists: true,
      });
    }
    
    // Create lead
    const lead = await createLead(email, source, consent, ['prelaunch']);
    
    // Sanitize for logging
    const sanitized = sanitizeForLogging({
      email: email.split('@')[0] + '@***',
      source,
      consent,
    });
    console.log('Lead submitted:', sanitized);
    
    // Send confirmation email (async, don't wait)
    sendEmail({
      to: email,
      subject: 'You\'re in. 21.12.',
      template: 'prelaunch-confirmation',
      data: {
        email,
        launchDate: '21.12.2025',
      },
    }).catch(err => {
      console.error('Email send error:', err.message);
      // Don't fail the request if email fails
    });
    
    return res.status(200).json({
      success: true,
      message: 'You\'re in. Check your email for confirmation.',
      leadId: lead.id,
    });
    
  } catch (error) {
    console.error('Lead submission error:', error.message);
    return res.status(500).json({
      success: false,
      error: 'Unable to process request. Please try again.',
    });
  }
}

