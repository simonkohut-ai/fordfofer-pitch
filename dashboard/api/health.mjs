// Health check endpoint
import { setSecurityHeaders, getAllowedOrigin } from './utils/security.mjs';

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
    // Get revenue metrics (async, don't block)
    let revenue = { leads: 0, customers: 0, conversionRate: 0, revenue: 0 };
    try {
      const { getAllLeads, getAllCustomers, calculateConversionRate } = await import('./utils/leads-storage.mjs');
      const leads = await getAllLeads();
      const customers = await getAllCustomers();
      const conversionRate = calculateConversionRate(leads, customers);
      const totalRevenue = customers.reduce((sum, c) => sum + (c.amount || 0), 0);
      revenue = {
        leads: leads.length,
        customers: customers.length,
        conversionRate: parseFloat(conversionRate),
        revenue: totalRevenue,
      };
    } catch (err) {
      // Silently fail - don't block health check
    }
    
    const health = {
      status: 'ok',
      timestamp: new Date().toISOString(),
      version: '1.0.0-revenue',
      services: {
        openai: !!process.env.OPENAI_API_KEY,
        meta_integration: process.env.META_INTEGRATION_ENABLED === 'true',
        meta_posting: process.env.META_POSTING_ENABLED === 'true',
        stripe: !!process.env.STRIPE_CHECKOUT_URL,
        email: !!process.env.RESEND_API_KEY,
        storage: process.env.STORAGE_TYPE || 'memory',
      },
      revenue,
    };
    
    return res.status(200).json(health);
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      error: error.message,
    });
  }
}

