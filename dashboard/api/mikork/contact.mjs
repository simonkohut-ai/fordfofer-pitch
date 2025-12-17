/**
 * MikoRK pohrebníctvo - Contact Form API
 * 
 * Handles contact form submissions.
 * Sends email notification to business owner.
 * Never auto-replies to customers.
 * 
 * Endpoint: /api/mikork/contact
 * Method: POST
 */

import { setSecurityHeaders } from '../utils/security.mjs';
import { sanitizeForLogging } from '../utils/security.mjs';
import { applyRateLimit } from '../utils/rateLimit.mjs';
import { sendEmail } from '../utils/email.mjs';
import clientConfig from '../../../config/clients/mikork.config.mjs';

export default async function handler(req, res) {
  setSecurityHeaders(res);
  
  // Rate limiting
  const rateLimitResult = await applyRateLimit(req, 'mikork-contact', { 
    maxRequests: 5, 
    windowMs: 60000 // 1 minute
  });
  
  if (!rateLimitResult.allowed) {
    return res.status(429).json({
      success: false,
      error: 'Príliš veľa požiadaviek. Skúste to prosím neskôr.',
    });
  }
  
  // Only POST allowed
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false,
      error: 'Metóda nie je povolená.' 
    });
  }
  
  try {
    const { name, email, phone, message, consent } = req.body;
    
    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: 'Prosím vyplňte všetky povinné polia.',
      });
    }
    
    if (!consent) {
      return res.status(400).json({
        success: false,
        error: 'Musíte súhlasiť so spracovaním osobných údajov.',
      });
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Neplatná emailová adresa.',
      });
    }
    
    // Sanitize for logging (privacy-first)
    const sanitized = sanitizeForLogging({
      name: name ? name.substring(0, 3) + '***' : null,
      email: email ? email.split('@')[0] + '@***' : null,
      hasPhone: !!phone,
      messageLength: message ? message.length : 0,
    });
    
    console.log('[MikoRK Contact]', sanitized);
    
    // Send email notification to business owner
    if (process.env.RESEND_API_KEY && process.env.CONTACT_EMAIL) {
      try {
        await sendEmail({
          to: process.env.CONTACT_EMAIL,
          subject: 'Nová správa z webu – MikoRK pohrebníctvo',
          template: 'mikork-contact-notification',
          data: {
            name,
            email,
            phone: phone || 'Neuvedené',
            message,
            timestamp: new Date().toLocaleString('sk-SK', {
              timeZone: 'Europe/Bratislava',
              dateStyle: 'long',
              timeStyle: 'short',
            }),
          },
        });
        
        console.log('[MikoRK Contact] Email notification sent');
      } catch (emailError) {
        console.error('[MikoRK Contact] Email send error:', emailError.message);
        // Don't fail the request if email fails - log it
      }
    } else {
      console.warn('[MikoRK Contact] Email not configured. RESEND_API_KEY or CONTACT_EMAIL missing.');
      console.warn('[MikoRK Contact] Setup instructions:');
      console.warn('  1. Get Resend API key from https://resend.com');
      console.warn('  2. Set RESEND_API_KEY in Vercel environment variables');
      console.warn('  3. Set CONTACT_EMAIL in Vercel environment variables');
      console.warn('  4. Redeploy');
    }
    
    // Success response
    // NOTE: We do NOT send automated email to customer
    // Business owner responds personally
    return res.status(200).json({
      success: true,
      message: 'Ďakujeme za vašu správu. Odpovieme vám čo najskôr.',
    });
    
  } catch (error) {
    console.error('[MikoRK Contact] Error:', error.message);
    
    return res.status(500).json({
      success: false,
      error: 'Nastala chyba pri odosielaní správy. Skúste to prosím znova alebo nás kontaktujte telefónom.',
    });
  }
}

