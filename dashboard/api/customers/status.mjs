// Customers admin API endpoint
// Returns customer statistics (read-only)

import { setSecurityHeaders } from '../utils/security.mjs';
import { getAllCustomers, maskEmail } from '../utils/leads-storage.mjs';

export default async function handler(req, res) {
  setSecurityHeaders(res);
  
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    const customers = await getAllCustomers();
    
    // Calculate stats
    const totalCustomers = customers.length;
    const activeCustomers = customers.filter(c => c.status === 'active').length;
    const totalRevenue = customers.reduce((sum, c) => sum + (c.amount || 0), 0);
    const lastPayment = customers.length > 0 
      ? customers[0].firstPaymentAt
      : null;
    
    // Get recent customers (last 10, masked)
    const recentCustomers = customers.slice(0, 10).map(customer => ({
      email: maskEmail(customer.email),
      firstPaymentAt: customer.firstPaymentAt,
      amount: customer.amount,
      currency: customer.currency || 'EUR',
      status: customer.status,
    }));
    
    return res.status(200).json({
      success: true,
      stats: {
        totalCustomers,
        activeCustomers,
        totalRevenue,
        lastPaymentTimestamp: lastPayment,
        recentCustomers,
      },
    });
    
  } catch (error) {
    console.error('Customers status error:', error.message);
    return res.status(500).json({
      success: false,
      error: 'Unable to fetch customer status',
    });
  }
}

