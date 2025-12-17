// Lead Qualification API
// Automated qualification scoring and routing

import { setSecurityHeaders } from '../utils/security.mjs';
import { sanitizeForLogging } from '../utils/security.mjs';
import { applyRateLimit } from '../utils/rateLimit.mjs';
import { getLeadByEmail, updateLead } from '../utils/leads-storage.mjs';

/**
 * Calculate qualification score
 */
export function calculateQualificationScore(lead) {
  let score = 0;
  
  // High intent signals (+3 each)
  if (lead.tags?.includes('demo-requested')) score += 3;
  if (lead.tags?.includes('specific-questions')) score += 3;
  if (lead.tags?.includes('budget-mentioned')) score += 3;
  if (lead.tags?.includes('timeline-mentioned')) score += 3;
  
  // Medium intent signals (+2 each)
  if (lead.tags?.includes('waitlist')) score += 2;
  if (lead.tags?.includes('email-opened')) score += 2;
  if (lead.tags?.includes('link-clicked')) score += 2;
  if (lead.tags?.includes('responded')) score += 2;
  
  // Low intent signals (+1 each)
  if (lead.tags?.includes('prelaunch')) score += 1;
  if (lead.tags?.includes('generic-questions')) score += 1;
  
  // Response time bonus
  if (lead.responseTime && lead.responseTime < 24 * 60 * 60 * 1000) {
    score += 1; // Responded within 24 hours
  }
  
  // Engagement bonus
  if (lead.engagementCount && lead.engagementCount > 2) {
    score += 1; // Multiple engagements
  }
  
  return Math.min(score, 10); // Cap at 10
}

/**
 * Determine intent level
 */
export function getIntentLevel(score) {
  if (score >= 8) return 'high';
  if (score >= 5) return 'medium';
  return 'low';
}

/**
 * Get recommended action
 */
export function getRecommendedAction(intentLevel) {
  switch (intentLevel) {
    case 'high':
      return {
        action: 'demo',
        sequence: 'high-intent',
        priority: 'high',
      };
    case 'medium':
      return {
        action: 'nurture',
        sequence: 'medium-intent',
        priority: 'medium',
      };
    case 'low':
      return {
        action: 'nurture',
        sequence: 'low-intent',
        priority: 'low',
      };
    default:
      return {
        action: 'nurture',
        sequence: 'low-intent',
        priority: 'low',
      };
  }
}

export default async function handler(req, res) {
  setSecurityHeaders(res);
  
  // Rate limiting
  const rateLimitResult = await applyRateLimit(req, 'sales-qualify', { maxRequests: 100, windowMs: 60000 });
  if (!rateLimitResult.allowed) {
    return res.status(429).json({
      success: false,
      error: 'Too many requests. Please try again later.',
    });
  }
  
  if (req.method === 'POST') {
    try {
      const { email, updates } = req.body;
      
      if (!email) {
        return res.status(400).json({
          success: false,
          error: 'Email is required',
        });
      }
      
      // Get lead
      const lead = await getLeadByEmail(email);
      if (!lead) {
        return res.status(404).json({
          success: false,
          error: 'Lead not found',
        });
      }
      
      // Update lead with new data
      if (updates) {
        await updateLead(email, updates);
        const updatedLead = await getLeadByEmail(email);
        
        // Calculate score
        const score = calculateQualificationScore(updatedLead);
        const intentLevel = getIntentLevel(score);
        const recommendation = getRecommendedAction(intentLevel);
        
        // Update lead with qualification data
        await updateLead(email, {
          qualificationScore: score,
          intentLevel,
          recommendedAction: recommendation.action,
          recommendedSequence: recommendation.sequence,
        });
        
        return res.status(200).json({
          success: true,
          lead: {
            email: updatedLead.email,
            score,
            intentLevel,
            recommendation,
          },
        });
      }
      
      // Just calculate score for existing lead
      const score = calculateQualificationScore(lead);
      const intentLevel = getIntentLevel(score);
      const recommendation = getRecommendedAction(intentLevel);
      
      return res.status(200).json({
        success: true,
        lead: {
          email: lead.email,
          score,
          intentLevel,
          recommendation,
        },
      });
      
    } catch (error) {
      console.error('Qualification error:', sanitizeForLogging({ message: error.message }));
      return res.status(500).json({
        success: false,
        error: 'Unable to qualify lead. Please try again.',
      });
    }
  }
  
  if (req.method === 'GET') {
    try {
      const { email } = req.query;
      
      if (!email) {
        return res.status(400).json({
          success: false,
          error: 'Email is required',
        });
      }
      
      const lead = await getLeadByEmail(email);
      if (!lead) {
        return res.status(404).json({
          success: false,
          error: 'Lead not found',
        });
      }
      
      const score = calculateQualificationScore(lead);
      const intentLevel = getIntentLevel(score);
      const recommendation = getRecommendedAction(intentLevel);
      
      return res.status(200).json({
        success: true,
        lead: {
          email: lead.email,
          score,
          intentLevel,
          recommendation,
          tags: lead.tags || [],
        },
      });
      
    } catch (error) {
      console.error('Qualification error:', sanitizeForLogging({ message: error.message }));
      return res.status(500).json({
        success: false,
        error: 'Unable to get qualification. Please try again.',
      });
    }
  }
  
  return res.status(405).json({ error: 'Method not allowed' });
}

