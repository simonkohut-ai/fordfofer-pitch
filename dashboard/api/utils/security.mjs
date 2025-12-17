// Security utilities and middleware
// Ensures no secrets logged, validates inputs, enforces security headers

// Sanitize data before logging (removes tokens/secrets)
export function sanitizeForLogging(data) {
  if (!data || typeof data !== 'object') return data;
  
  const sanitized = { ...data };
  const sensitiveKeys = [
    'token', 'access_token', 'refresh_token', 'api_key', 'apikey',
    'secret', 'password', 'passwd', 'pwd', 'auth', 'authorization',
    'app_secret', 'client_secret', 'private_key', 'session',
    'page_access_token', 'meta_app_secret', 'openai_api_key',
  ];
  
  for (const key in sanitized) {
    const lowerKey = key.toLowerCase();
    if (sensitiveKeys.some(sk => lowerKey.includes(sk))) {
      sanitized[key] = '[REDACTED]';
    } else if (typeof sanitized[key] === 'object') {
      sanitized[key] = sanitizeForLogging(sanitized[key]);
    }
  }
  
  return sanitized;
}

// Validate input string
export function validateInput(input, options = {}) {
  const {
    minLength = 0,
    maxLength = 10000,
    allowEmpty = false,
    allowedChars = null, // regex pattern
  } = options;
  
  if (typeof input !== 'string') {
    return { valid: false, error: 'Input must be a string' };
  }
  
  if (!allowEmpty && input.trim().length === 0) {
    return { valid: false, error: 'Input cannot be empty' };
  }
  
  if (input.length < minLength) {
    return { valid: false, error: `Input too short. Minimum ${minLength} characters required.` };
  }
  
  if (input.length > maxLength) {
    return { valid: false, error: `Input too long. Maximum ${maxLength} characters allowed.` };
  }
  
  if (allowedChars && !new RegExp(allowedChars).test(input)) {
    return { valid: false, error: 'Input contains invalid characters' };
  }
  
  // Check for potential injection patterns
  const dangerousPatterns = [
    /<script/i,
    /javascript:/i,
    /on\w+\s*=/i,
    /data:text\/html/i,
  ];
  
  for (const pattern of dangerousPatterns) {
    if (pattern.test(input)) {
      return { valid: false, error: 'Input contains potentially dangerous content' };
    }
  }
  
  return { valid: true };
}

// Validate OAuth redirect URI (must be exact match and HTTPS)
export function validateRedirectUri(uri, allowedUris) {
  if (!uri || typeof uri !== 'string') {
    return { valid: false, error: 'Redirect URI is required' };
  }
  
  // Must be HTTPS
  if (!uri.startsWith('https://')) {
    return { valid: false, error: 'Redirect URI must use HTTPS' };
  }
  
  // Must match exactly (no wildcards for security)
  if (!allowedUris.includes(uri)) {
    return { valid: false, error: 'Redirect URI not allowed' };
  }
  
  return { valid: true };
}

// Set security headers
export function setSecurityHeaders(res) {
  try {
    if (!res || typeof res.setHeader !== 'function') {
      console.error('setSecurityHeaders: invalid response object');
      return;
    }
    
    res.setHeader('Content-Security-Policy', 
      "default-src 'self'; " +
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'; " + // unsafe-eval needed for some libs
      "style-src 'self' 'unsafe-inline'; " +
      "img-src 'self' data: https:; " +
      "font-src 'self' data:; " +
      "connect-src 'self' https://api.openai.com https://graph.facebook.com https://www.facebook.com; " +
      "frame-ancestors 'none';"
    );
    
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.setHeader('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
  } catch (error) {
    // Fail-safe: log error but don't crash
    console.error('setSecurityHeaders error:', error.message);
  }
}

// Get origin for CORS (same-origin only in production)
export function getAllowedOrigin(req) {
  try {
    const origin = req?.headers?.origin || req?.headers?.referer;
    const host = req?.headers?.host;
    
    // Safely check NODE_ENV (may be undefined)
    const nodeEnv = process.env?.NODE_ENV || '';
    
    // In production, only allow same origin
    if (nodeEnv === 'production') {
      if (origin && host && origin.includes(host)) {
        return origin;
      }
      return null; // Same-origin only
    }
    
    // In development, allow localhost
    if (origin && (origin.includes('localhost') || origin.includes('127.0.0.1'))) {
      return origin;
    }
    
    return null;
  } catch (error) {
    // Fail-safe: return null if any error occurs
    console.error('getAllowedOrigin error:', error.message);
    return null;
  }
}

// Validate userId (prevent injection)
export function validateUserId(userId) {
  if (!userId || typeof userId !== 'string') {
    return { valid: false, error: 'User ID is required' };
  }
  
  // Only allow alphanumeric, dash, underscore
  if (!/^[a-zA-Z0-9_-]+$/.test(userId)) {
    return { valid: false, error: 'Invalid user ID format' };
  }
  
  if (userId.length > 100) {
    return { valid: false, error: 'User ID too long' };
  }
  
  return { valid: true };
}

