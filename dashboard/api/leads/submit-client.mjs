// Client lead submission API
// Handles leads from client microsites (MikoRK, Komfortreality)

import { setSecurityHeaders } from '../utils/security.mjs';
import { sanitizeForLogging } from '../utils/security.mjs';
import { createLead, getLeadByEmail } from '../utils/leads-storage.mjs';
import { applyRateLimit } from '../utils/rateLimit.mjs';
import { sendEmail } from '../utils/email.mjs';

export default async function handler(req, res) {
  setSecurityHeaders(res);
  
  // Rate limiting
  const rateLimitResult = await applyRateLimit(req, 'client-lead-submit', { maxRequests: 5, windowMs: 60000 });
  if (!rateLimitResult.allowed) {
    return res.status(429).json({
      success: false,
      error: 'Príliš veľa požiadaviek. Skúste to znova neskôr.',
    });
  }
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    const { brand, name, email, phone, message, consent } = req.body;
    
    // Validate brand
    if (!brand || !['mikork', 'komfortreality', 'hamilton-merch'].includes(brand.toLowerCase())) {
      return res.status(400).json({
        success: false,
        error: 'Invalid client brand',
      });
    }
    
    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: 'Meno, email a správa sú povinné',
      });
    }
    
    // Validate name length
    if (name.trim().length < 2 || name.trim().length > 100) {
      return res.status(400).json({
        success: false,
        error: 'Meno musí mať 2-100 znakov',
      });
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Neplatný formát emailu',
      });
    }
    
    // Validate message length
    if (message.trim().length < 10 || message.trim().length > 1000) {
      return res.status(400).json({
        success: false,
        error: 'Správa musí mať 10-1000 znakov',
      });
    }
    
    // Validate consent (GDPR requirement)
    if (consent !== true) {
      return res.status(400).json({
        success: false,
        error: 'Súhlas so spracovaním osobných údajov je povinný',
      });
    }
    
    // Check if lead already exists
    const existingLead = await getLeadByEmail(email);
    
    // Create or update lead
    const lead = await createLead(
      email,
      'client_site',
      consent,
      ['client', brand.toLowerCase()]
    );
    
    // Update lead with additional info if new
    if (!existingLead) {
      const { updateLead } = await import('../utils/leads-storage.mjs');
      await updateLead(email, {
        name,
        phone: phone || null,
        message,
        brand: brand.toLowerCase(),
      });
    }
    
    // Sanitize for logging
    const sanitized = sanitizeForLogging({
      brand: brand.toLowerCase(),
      name: name.substring(0, 3) + '***',
      email: email.split('@')[0] + '@***',
      hasPhone: !!phone,
      hasMessage: !!message,
      consent,
    });
    console.log('Client lead submitted:', sanitized);
    
    // Send confirmation email (async, don't wait)
    sendEmail({
      to: email,
      subject: 'Ďakujeme za správu',
      template: 'client-confirmation',
      data: {
        name,
        brand: brand.toLowerCase(),
      },
    }).catch(err => {
      console.error('Client confirmation email error:', err.message);
      // Don't fail the request if email fails
    });
    
    return res.status(200).json({
      success: true,
      message: 'Ďakujeme za správu. Čoskoro vás budeme kontaktovať.',
      leadId: lead.id,
    });
    
  } catch (error) {
    console.error('Client lead submission error:', error.message);
    return res.status(500).json({
      success: false,
      error: 'Nepodarilo sa spracovať požiadavku. Skúste to znova.',
    });
  }
}

