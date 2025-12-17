// Payments admin API endpoint
// Returns payment statistics (read-only)

import { setSecurityHeaders } from '../utils/security.mjs';
import { getAllCustomers, getAllEvents, maskEmail } from '../utils/payment-storage.mjs';

export default async function handler(req, res) {
  setSecurityHeaders(res);
  
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    const customers = await getAllCustomers();
    const events = await getAllEvents();
    
    // Calculate stats
    const totalPayments = customers.filter(c => c.status === 'active').length;
    const lastPayment = customers.length > 0 
      ? customers[0].lastPaymentAt || customers[0].createdAt
      : null;
    
    // Get last 5 emails (masked)
    const lastEmails = customers.slice(0, 5).map(c => ({
      email: maskEmail(c.email),
      lastPaymentAt: c.lastPaymentAt || c.createdAt,
    }));
    
    // Get last 20 events (sanitized)
    const recentEvents = events.slice(0, 20).map(e => ({
      type: e.type,
      createdAt: e.createdAt,
      payload: e.payload, // Already sanitized
    }));
    
    return res.status(200).json({
      success: true,
      stats: {
        totalPayments,
        lastPaymentTimestamp: lastPayment,
        lastEmails,
        recentEvents,
      },
    });
    
  } catch (error) {
    console.error('Payments status error:', error.message);
    return res.status(500).json({
      success: false,
      error: 'Unable to fetch payment status',
    });
  }
}

