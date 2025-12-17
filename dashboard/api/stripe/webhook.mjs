// Stripe webhook handler
// Verifies signatures and stores payment events securely

import crypto from 'crypto';
import { setSecurityHeaders } from '../utils/security.mjs';
import { sanitizeForLogging } from '../utils/security.mjs';
import { getStorage, setStorage } from '../utils/payment-storage.mjs';

function verifyStripeSignature(payload, signature, secret) {
  if (!secret || !signature) {
    return false;
  }
  
  try {
    // Stripe signature format: t=timestamp,v1=signature,v0=signature
    const elements = signature.split(',');
    const sigHeader = {};
    
    elements.forEach(element => {
      const [key, value] = element.split('=');
      sigHeader[key] = value;
    });
    
    // Get timestamp and signature
    const timestamp = sigHeader.t;
    const signatureHash = sigHeader.v1;
    
    if (!timestamp || !signatureHash) {
      return false;
    }
    
    // Create signed payload
    const signedPayload = `${timestamp}.${payload}`;
    
    // Compute expected signature
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(signedPayload, 'utf8')
      .digest('hex');
    
    // Compare signatures (constant-time comparison)
    return crypto.timingSafeEqual(
      Buffer.from(signatureHash),
      Buffer.from(expectedSignature)
    );
  } catch (error) {
    console.error('Signature verification error:', error.message);
    return false;
  }
}

export default async function handler(req, res) {
  setSecurityHeaders(res);
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    const signature = req.headers['stripe-signature'];
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    
    if (!webhookSecret) {
      console.error('STRIPE_WEBHOOK_SECRET not configured');
      return res.status(500).json({ error: 'Webhook secret not configured' });
    }
    
    // Get raw body for signature verification
    // Vercel provides req.body as parsed JSON, but Stripe signature verification
    // requires the raw body string. We reconstruct it from the parsed body.
    // Note: For production, if signature verification fails, consider using
    // Vercel's rawBody option or middleware to capture raw body.
    const rawBody = JSON.stringify(req.body);
    const event = req.body;
    
    // Verify signature using crypto (production-grade)
    if (!verifyStripeSignature(rawBody, signature, webhookSecret)) {
      console.error('Webhook signature verification failed');
      return res.status(401).json({ error: 'Invalid signature' });
    }
    const eventType = event.type;
    
    // Only process payment-related events
    if (!eventType.startsWith('checkout.session.')) {
      return res.status(200).json({ received: true });
    }
    
    // Extract payment data (sanitize for logging)
    const session = event.data?.object;
    if (!session) {
      return res.status(200).json({ received: true });
    }
    
    const email = session.customer_details?.email || session.customer_email;
    const amount = session.amount_total ? session.amount_total / 100 : 0; // Convert from cents
    const currency = session.currency?.toUpperCase() || 'EUR';
    const paymentLink = session.payment_link || null;
    const stripeCustomerId = session.customer || null;
    const createdAt = new Date(session.created * 1000).toISOString();
    const status = session.payment_status || 'unknown';
    
    // Sanitize for logging (never log full payload)
    const sanitizedEvent = sanitizeForLogging({
      type: eventType,
      email: email ? email.split('@')[0] + '@***' : null,
      amount,
      currency,
      status,
    });
    
    console.log('Stripe webhook received:', sanitizedEvent);
    
    // Store customer if payment succeeded
    if (eventType === 'checkout.session.completed' && status === 'paid') {
      // Import leads storage to upgrade lead to customer
      const { upgradeLeadToCustomer, getLeadByEmail } = await import('../utils/leads-storage.mjs');
      const { sendEmail } = await import('../utils/email.mjs');
      
      // Upgrade lead to customer (if lead exists)
      const lead = await getLeadByEmail(email);
      await upgradeLeadToCustomer(email, {
        createdAt,
        amount,
        currency,
        stripeCustomerId,
      });
      
      // Track revenue with source attribution
      const { trackRevenue } = await import('../revenue/track.mjs');
      await trackRevenue({
        email,
        amount,
        currency,
        source: lead?.source || session.metadata?.source || 'unknown',
        sourceMedium: session.metadata?.utm_medium || 'direct',
        sourceCampaign: session.metadata?.utm_campaign || 'founding-deal',
        sourceContent: session.metadata?.utm_content || null,
        customerId: stripeCustomerId,
        paymentId: session.id,
        timestamp: createdAt,
      });
        }
      } catch (revenueError) {
        console.error('Revenue tracking error:', sanitizeForLogging({ message: revenueError.message }));
        // Don't fail webhook if revenue tracking fails
      }
      
      // Also store in legacy payment storage (for compatibility)
      await setStorage('customers', email, {
        email,
        createdAt: createdAt,
        lastPaymentAt: createdAt,
        stripeCustomerId,
        status: 'active',
      });
      
      // Determine product from payment link or line items
      const productName = session.metadata?.product || 'Launch Pack';
      const productDeliveryUrl = process.env.LAUNCHPACK_DELIVERY_URL || process.env.PRODUCT_DELIVERY_URL;
      
      // Send product delivery email (async, don't wait)
      sendEmail({
        to: email,
        subject: `Your ${productName} is ready`,
        template: 'product-delivery',
        data: {
          email,
          productName,
          deliveryUrl: productDeliveryUrl,
        },
      }).catch(err => {
        console.error('Product delivery email error:', err.message);
      });
      
      // Also send Telegram notification if configured (via n8n webhook)
      const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL;
      if (n8nWebhookUrl) {
        fetch(n8nWebhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'payment_received',
            email: email.split('@')[0] + '@***', // Sanitized
            amount,
            currency,
            productName,
            timestamp: createdAt,
          }),
        }).catch(err => {
          console.error('n8n payment notification error:', err.message);
        });
      }
    }
    
    // Store event (sanitized)
    const events = await getStorage('events', 'all') || [];
    events.push({
      type: eventType,
      createdAt: new Date().toISOString(),
      payload: sanitizedEvent,
    });
    
    // Keep last 100 events
    const recentEvents = events.slice(-100);
    await setStorage('events', 'all', recentEvents);
    
    return res.status(200).json({ received: true });
    
  } catch (error) {
    console.error('Webhook error:', error.message);
    // Never log full error with secrets
    return res.status(500).json({ error: 'Webhook processing failed' });
  }
}

