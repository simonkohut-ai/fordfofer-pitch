// Launch status API
// Returns server time, countdown to launch, and feature flags

import { setSecurityHeaders } from '../utils/security.mjs';

export default async function handler(req, res) {
  setSecurityHeaders(res);
  
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    const now = new Date();
    const launchDate = new Date('2025-12-21T20:00:00+01:00'); // Europe/Bratislava
    
    const diffMs = launchDate - now;
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    return res.status(200).json({
      success: true,
      serverTime: now.toISOString(),
      launchDate: launchDate.toISOString(),
      countdown: {
        days: Math.max(0, days),
        hours: Math.max(0, hours),
        minutes: Math.max(0, minutes),
        totalMs: Math.max(0, diffMs),
      },
      flags: {
        metaIntegrationEnabled: process.env.META_INTEGRATION_ENABLED === 'true',
        metaPostingEnabled: process.env.META_POSTING_ENABLED === 'true',
        metaSchedulerEnabled: process.env.META_SCHEDULER_ENABLED === 'true',
      },
    });
    
  } catch (error) {
    console.error('Launch status error:', error.message);
    return res.status(500).json({
      success: false,
      error: 'Unable to fetch launch status',
    });
  }
}

