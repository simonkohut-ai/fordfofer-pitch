// 🦄 Rate Limiting & Anti-Abuse Utility
// Lightweight in-memory rate limiting for Vercel serverless functions

// In-memory stores (reset per invocation, but provides basic protection)
const requestStore = new Map();
const dailyCapStore = new Map();

// Configuration
const RATE_LIMIT_CONFIG = {
  // Requests per window per IP
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 10, // 10 requests per minute per IP
  
  // Daily generation cap
  dailyCap: 50, // 50 generations per day per IP
  dailyWindowMs: 24 * 60 * 60 * 1000, // 24 hours
};

// Cleanup old entries (runs on each invocation)
function cleanupStores() {
  const now = Date.now();
  
  // Clean rate limit store
  for (const [key, data] of requestStore.entries()) {
    if (now - data.firstRequest > RATE_LIMIT_CONFIG.windowMs) {
      requestStore.delete(key);
    }
  }
  
  // Clean daily cap store
  for (const [key, data] of dailyCapStore.entries()) {
    if (now - data.firstRequest > RATE_LIMIT_CONFIG.dailyWindowMs) {
      dailyCapStore.delete(key);
    }
  }
}

// Get client identifier from request
function getClientId(req) {
  // Try to get IP from various headers (Vercel, Cloudflare, etc.)
  const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
             req.headers['x-real-ip'] ||
             req.headers['cf-connecting-ip'] ||
             req.connection?.remoteAddress ||
             'unknown';
  
  // Combine IP with user agent for better identification
  const userAgent = req.headers['user-agent'] || 'unknown';
  return `${ip}-${userAgent.substring(0, 50)}`;
}

// Check rate limit
export function checkRateLimit(req) {
  cleanupStores();
  
  const clientId = getClientId(req);
  const now = Date.now();
  const key = `rate-${clientId}`;
  
  const existing = requestStore.get(key);
  
  if (!existing) {
    requestStore.set(key, {
      count: 1,
      firstRequest: now,
      lastRequest: now
    });
    return { allowed: true, remaining: RATE_LIMIT_CONFIG.maxRequests - 1 };
  }
  
  // Check if window expired
  if (now - existing.firstRequest > RATE_LIMIT_CONFIG.windowMs) {
    requestStore.set(key, {
      count: 1,
      firstRequest: now,
      lastRequest: now
    });
    return { allowed: true, remaining: RATE_LIMIT_CONFIG.maxRequests - 1 };
  }
  
  // Check if limit exceeded
  if (existing.count >= RATE_LIMIT_CONFIG.maxRequests) {
    const retryAfter = Math.ceil((RATE_LIMIT_CONFIG.windowMs - (now - existing.firstRequest)) / 1000);
    return {
      allowed: false,
      remaining: 0,
      retryAfter,
      error: `Too many requests. Please try again in ${retryAfter} second${retryAfter !== 1 ? 's' : ''}.`
    };
  }
  
  // Increment count
  existing.count++;
  existing.lastRequest = now;
  requestStore.set(key, existing);
  
  return {
    allowed: true,
    remaining: RATE_LIMIT_CONFIG.maxRequests - existing.count
  };
}

// Check daily generation cap
export function checkDailyCap(req) {
  cleanupStores();
  
  const clientId = getClientId(req);
  const now = Date.now();
  const key = `daily-${clientId}`;
  
  const existing = dailyCapStore.get(key);
  
  if (!existing) {
    dailyCapStore.set(key, {
      count: 1,
      firstRequest: now
    });
    return { allowed: true, remaining: RATE_LIMIT_CONFIG.dailyCap - 1 };
  }
  
  // Check if daily window expired
  if (now - existing.firstRequest > RATE_LIMIT_CONFIG.dailyWindowMs) {
    dailyCapStore.set(key, {
      count: 1,
      firstRequest: now
    });
    return { allowed: true, remaining: RATE_LIMIT_CONFIG.dailyCap - 1 };
  }
  
  // Check if cap exceeded
  if (existing.count >= RATE_LIMIT_CONFIG.dailyCap) {
    const hoursUntilReset = Math.ceil((RATE_LIMIT_CONFIG.dailyWindowMs - (now - existing.firstRequest)) / (60 * 60 * 1000));
    return {
      allowed: false,
      remaining: 0,
      hoursUntilReset,
      error: `Daily generation limit reached. Please try again in ${hoursUntilReset} hour${hoursUntilReset !== 1 ? 's' : ''}.`
    };
  }
  
  // Increment count
  existing.count++;
  dailyCapStore.set(key, existing);
  
  return {
    allowed: true,
    remaining: RATE_LIMIT_CONFIG.dailyCap - existing.count
  };
}

// Request logging
export function logRequest(req, route, success, latency, error = null) {
  const timestamp = new Date().toISOString();
  const clientId = getClientId(req);
  const status = success ? 'SUCCESS' : 'FAILED';
  
  const logEntry = {
    timestamp,
    route,
    status,
    latency: `${latency}ms`,
    clientId: clientId.substring(0, 50), // Truncate for privacy
    error: error ? error.substring(0, 100) : null
  };
  
  // Log to console (Vercel will capture this)
  console.log(`[API] ${timestamp} | ${route} | ${status} | ${latency}ms | ${clientId.substring(0, 30)}`);
  
  if (error) {
    console.error(`[API ERROR] ${route}:`, error);
  }
  
  return logEntry;
}

// Middleware wrapper for API endpoints
export function withRateLimit(handler) {
  return async (req, res) => {
    const startTime = Date.now();
    const route = req.url || 'unknown';
    
    try {
      // Check rate limit
      const rateLimitCheck = checkRateLimit(req);
      if (!rateLimitCheck.allowed) {
        const latency = Date.now() - startTime;
        logRequest(req, route, false, latency, rateLimitCheck.error);
        
        res.setHeader('X-RateLimit-Remaining', '0');
        res.setHeader('Retry-After', rateLimitCheck.retryAfter.toString());
        
        return res.status(429).json({
          success: false,
          error: rateLimitCheck.error || 'Too many requests. Please slow down.'
        });
      }
      
      // Check daily cap
      const dailyCapCheck = checkDailyCap(req);
      if (!dailyCapCheck.allowed) {
        const latency = Date.now() - startTime;
        logRequest(req, route, false, latency, dailyCapCheck.error);
        
        res.setHeader('X-DailyLimit-Remaining', '0');
        
        return res.status(429).json({
          success: false,
          error: dailyCapCheck.error || 'Daily limit reached. Please try again tomorrow.'
        });
      }
      
      // Set rate limit headers
      res.setHeader('X-RateLimit-Remaining', rateLimitCheck.remaining.toString());
      res.setHeader('X-DailyLimit-Remaining', dailyCapCheck.remaining.toString());
      
      // Call original handler
      try {
        const result = await handler(req, res);
        const latency = Date.now() - startTime;
        logRequest(req, route, true, latency);
        return result;
      } catch (handlerError) {
        const latency = Date.now() - startTime;
        logRequest(req, route, false, latency, handlerError.message);
        // Handler should have already sent response, but ensure error is logged
        throw handlerError;
      }
    } catch (error) {
      const latency = Date.now() - startTime;
      logRequest(req, route, false, latency, error.message);
      
      // Return friendly error (never expose technical details)
      return res.status(500).json({
        success: false,
        error: 'An error occurred. Please try again.'
      });
    }
  };
}

