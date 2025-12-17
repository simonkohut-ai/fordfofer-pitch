// Revenue Tracking API
// Tracks revenue, conversions, and source attribution

import { setSecurityHeaders } from '../utils/security.mjs';
import { sanitizeForLogging } from '../utils/security.mjs';
import { applyRateLimit } from '../utils/rateLimit.mjs';
import { getStorage, setStorage } from '../utils/storage.mjs';

/**
 * Track revenue event
 * Exported for use in other modules
 */
export async function trackRevenue({
  email,
  amount,
  currency = 'EUR',
  source,
  sourceMedium,
  sourceCampaign,
  sourceContent,
  customerId,
  paymentId,
  timestamp = new Date().toISOString(),
}) {
  // Sanitize for logging
  const sanitized = sanitizeForLogging({
    email: email ? email.split('@')[0] + '@***' : null,
    amount,
    currency,
    source,
  });
  console.log('[Revenue Tracking]', sanitized);
  
  // Store revenue record
  const revenueId = `rev_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  const revenueRecord = {
    id: revenueId,
    email,
    amount,
    currency,
    source,
    sourceMedium,
    sourceCampaign,
    sourceContent,
    customerId,
    paymentId,
    timestamp,
    createdAt: timestamp,
  };
  
  await setStorage('revenue', revenueId, revenueRecord);
  
  // Also store in daily summary
  const date = new Date(timestamp).toISOString().split('T')[0];
  const dailyKey = `daily_${date}`;
  const dailyData = await getStorage('revenue', dailyKey) || {
    date,
    revenue: 0,
    customers: 0,
    sources: {},
  };
  
  dailyData.revenue += amount;
  dailyData.customers += 1;
  dailyData.sources[source] = (dailyData.sources[source] || 0) + amount;
  
  await setStorage('revenue', dailyKey, dailyData);
  
  return revenueRecord;
}

/**
 * Get revenue summary
 */
export async function getRevenueSummary(startDate, endDate) {
  // Get all revenue records in date range
  const allRevenue = await getAllRevenueRecords();
  
  const filtered = allRevenue.filter(record => {
    const recordDate = new Date(record.timestamp);
    return recordDate >= new Date(startDate) && recordDate <= new Date(endDate);
  });
  
  // Calculate summary
  const summary = {
    totalRevenue: 0,
    totalCustomers: 0,
    averageRevenue: 0,
    sources: {},
    daily: {},
  };
  
  filtered.forEach(record => {
    summary.totalRevenue += record.amount;
    summary.totalCustomers += 1;
    
    // Source breakdown
    const source = record.source || 'unknown';
    summary.sources[source] = (summary.sources[source] || 0) + record.amount;
    
    // Daily breakdown
    const date = new Date(record.timestamp).toISOString().split('T')[0];
    if (!summary.daily[date]) {
      summary.daily[date] = { revenue: 0, customers: 0 };
    }
    summary.daily[date].revenue += record.amount;
    summary.daily[date].customers += 1;
  });
  
  summary.averageRevenue = summary.totalCustomers > 0 
    ? summary.totalRevenue / summary.totalCustomers 
    : 0;
  
  return summary;
}

/**
 * Get all revenue records
 */
async function getAllRevenueRecords() {
  // This would typically query a database
  // For now, return empty array (to be implemented)
  return [];
}

/**
 * API Handler
 */
export default async function handler(req, res) {
  setSecurityHeaders(res);
  
  // Rate limiting
  const rateLimitResult = await applyRateLimit(req, 'revenue-track', { maxRequests: 100, windowMs: 60000 });
  if (!rateLimitResult.allowed) {
    return res.status(429).json({
      success: false,
      error: 'Too many requests. Please try again later.',
    });
  }
  
  if (req.method === 'POST') {
    // Track revenue event
    try {
      const {
        email,
        amount,
        currency = 'EUR',
        source,
        sourceMedium,
        sourceCampaign,
        sourceContent,
        customerId,
        paymentId,
      } = req.body;
      
      if (!email || !amount) {
        return res.status(400).json({
          success: false,
          error: 'Email and amount are required',
        });
      }
      
      const revenueRecord = await trackRevenue({
        email,
        amount,
        currency,
        source,
        sourceMedium,
        sourceCampaign,
        sourceContent,
        customerId,
        paymentId,
      });
      
      return res.status(200).json({
        success: true,
        revenue: revenueRecord,
      });
      
    } catch (error) {
      console.error('Revenue tracking error:', sanitizeForLogging({ message: error.message }));
      return res.status(500).json({
        success: false,
        error: 'Unable to track revenue. Please try again.',
      });
    }
  }
  
  if (req.method === 'GET') {
    // Get revenue summary
    try {
      const { startDate, endDate } = req.query;
      
      const start = startDate || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
      const end = endDate || new Date().toISOString();
      
      const summary = await getRevenueSummary(start, end);
      
      return res.status(200).json({
        success: true,
        summary,
      });
      
    } catch (error) {
      console.error('Revenue summary error:', sanitizeForLogging({ message: error.message }));
      return res.status(500).json({
        success: false,
        error: 'Unable to get revenue summary. Please try again.',
      });
    }
  }
  
  return res.status(405).json({ error: 'Method not allowed' });
}

