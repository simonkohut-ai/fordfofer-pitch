// Leads admin API endpoint
// Returns lead statistics (read-only)

import { setSecurityHeaders } from '../utils/security.mjs';
import { getAllLeads, getAllCustomers, maskEmail, calculateConversionRate } from '../utils/leads-storage.mjs';

export default async function handler(req, res) {
  setSecurityHeaders(res);
  
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    const leads = await getAllLeads();
    const customers = await getAllCustomers();
    
    // Calculate stats
    const totalLeads = leads.length;
    const totalCustomers = customers.length;
    const conversionRate = calculateConversionRate(leads, customers);
    
    // Group by source
    const bySource = {};
    leads.forEach(lead => {
      const source = lead.source || 'unknown';
      bySource[source] = (bySource[source] || 0) + 1;
    });
    
    // Group by brand (client leads)
    const byBrand = {};
    leads.forEach(lead => {
      if (lead.tags?.includes('client')) {
        const brandTag = lead.tags.find(t => t === 'mikork' || t === 'komfortreality');
        if (brandTag) {
          byBrand[brandTag] = (byBrand[brandTag] || 0) + 1;
        }
      }
    });
    
    // Get recent leads (last 10, masked)
    const recentLeads = leads.slice(0, 10).map(lead => ({
      email: maskEmail(lead.email),
      source: lead.source,
      createdAt: lead.createdAt,
      tags: lead.tags || [],
      surveyCompleted: lead.surveyCompleted || false,
    }));
    
    // Get prelaunch leads count
    const prelaunchLeads = leads.filter(l => l.tags?.includes('prelaunch')).length;
    
    return res.status(200).json({
      success: true,
      stats: {
        totalLeads,
        totalCustomers,
        conversionRate: parseFloat(conversionRate),
        prelaunchLeads,
        bySource,
        byBrand,
        recentLeads,
      },
    });
    
  } catch (error) {
    console.error('Leads status error:', error.message);
    return res.status(500).json({
      success: false,
      error: 'Unable to fetch lead status',
    });
  }
}

