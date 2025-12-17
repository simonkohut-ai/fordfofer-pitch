// Launch day email automation
// Sends "Access is live" email to all prelaunch leads on 21.12.2025

import { setSecurityHeaders } from '../utils/security.mjs';
import { getAllLeads } from '../utils/leads-storage.mjs';
import { sendEmail } from '../utils/email.mjs';

export default async function handler(req, res) {
  setSecurityHeaders(res);
  
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  // Check if launch day (21.12.2025) OR manual override
  const { force } = req.body || {};
  const now = new Date();
  const launchDate = new Date('2025-12-21T00:00:00+01:00'); // Europe/Bratislava
  const isLaunchDay = now >= launchDate && now < new Date('2025-12-22T00:00:00+01:00');
  
  // Allow manual override for testing (console-first)
  if (!isLaunchDay && force !== 'true') {
    return res.status(400).json({
      success: false,
      error: 'Not launch day yet. This endpoint is for 21.12.2025 only. Use ?force=true to override.',
    });
  }
  
  try {
    // Get all prelaunch leads
    const allLeads = await getAllLeads();
    const prelaunchLeads = allLeads.filter(lead => 
      lead.tags?.includes('prelaunch') && lead.consent === true
    );
    
    if (prelaunchLeads.length === 0) {
      return res.status(200).json({
        success: true,
        message: 'No prelaunch leads to email',
        count: 0,
      });
    }
    
    // Send emails (batch, don't wait for all)
    let sent = 0;
    let failed = 0;
    
    for (const lead of prelaunchLeads) {
      try {
        await sendEmail({
          to: lead.email,
          template: 'launch-day',
          data: { email: lead.email },
        });
        sent++;
      } catch (error) {
        console.error(`Failed to send launch email to ${lead.email.split('@')[0]}@***:`, error.message);
        failed++;
      }
    }
    
    return res.status(200).json({
      success: true,
      message: `Launch emails sent`,
      total: prelaunchLeads.length,
      sent,
      failed,
    });
    
  } catch (error) {
    console.error('Launch email error:', error.message);
    return res.status(500).json({
      success: false,
      error: 'Unable to send launch emails',
    });
  }
}

