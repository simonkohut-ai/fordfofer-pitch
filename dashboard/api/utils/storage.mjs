// Storage adapter for Meta integration
// Supports Vercel KV (preferred) or Vercel Postgres
// Falls back to in-memory for local dev

const STORAGE_TYPE = process.env.STORAGE_TYPE || 'memory'; // 'kv', 'postgres', 'memory'

// In-memory fallback (single-tenant for now)
let memoryStore = {};

// Vercel KV client (if configured)
let kvClient = null;
if (STORAGE_TYPE === 'kv' && process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
  try {
    const { createClient } = await import('@vercel/kv');
    kvClient = createClient({
      url: process.env.KV_REST_API_URL,
      token: process.env.KV_REST_API_TOKEN,
    });
  } catch (error) {
    console.error('Failed to initialize KV client:', error.message);
  }
}

// Vercel Postgres client (if configured)
let postgresClient = null;
if (STORAGE_TYPE === 'postgres' && process.env.POSTGRES_URL) {
  try {
    // Dynamic import for Vercel Postgres
    const pgModule = await import('@vercel/postgres');
    postgresClient = pgModule.createClient();
  } catch (error) {
    console.error('Failed to initialize Postgres client:', error.message);
    console.error('Falling back to memory storage');
  }
}

// Storage operations
export async function getMetaData(userId = 'default') {
  const key = `meta:${userId}`;
  
  try {
    if (kvClient) {
      const data = await kvClient.get(key);
      return data || {};
    }
    
    if (postgresClient) {
      const { rows } = await postgresClient.sql`
        SELECT data FROM meta_storage WHERE user_id = ${userId}
      `;
      return rows[0]?.data || {};
    }
    
    // Memory fallback
    return memoryStore[key] || {};
  } catch (error) {
    console.error('Storage get error:', error.message);
    return {};
  }
}

export async function setMetaData(userId, data) {
  const key = `meta:${userId}`;
  
  try {
    if (kvClient) {
      await kvClient.set(key, data, { ex: 60 * 60 * 24 * 90 }); // 90 days TTL
      return true;
    }
    
    if (postgresClient) {
      await postgresClient.sql`
        INSERT INTO meta_storage (user_id, data, updated_at)
        VALUES (${userId}, ${JSON.stringify(data)}, NOW())
        ON CONFLICT (user_id) DO UPDATE SET data = ${JSON.stringify(data)}, updated_at = NOW()
      `;
      return true;
    }
    
    // Memory fallback
    memoryStore[key] = data;
    return true;
  } catch (error) {
    console.error('Storage set error:', error.message);
    return false;
  }
}

export async function deleteMetaData(userId) {
  const key = `meta:${userId}`;
  
  try {
    if (kvClient) {
      await kvClient.del(key);
      return true;
    }
    
    if (postgresClient) {
      await postgresClient.sql`
        DELETE FROM meta_storage WHERE user_id = ${userId}
      `;
      return true;
    }
    
    // Memory fallback
    delete memoryStore[key];
    return true;
  } catch (error) {
    console.error('Storage delete error:', error.message);
    return false;
  }
}

// Helper: Get access token (never log this)
export async function getAccessToken(userId = 'default') {
  const data = await getMetaData(userId);
  return data.access_token || null;
}

// Helper: Check if token is expired
export function isTokenExpired(expiresAt) {
  if (!expiresAt) return true;
  return new Date(expiresAt) < new Date();
}

// Helper: Store token securely (never log)
export async function storeToken(userId, token, expiresAt, userInfo = {}) {
  const data = await getMetaData(userId);
  const updated = {
    ...data,
    access_token: token,
    token_expires_at: expiresAt,
    user_id: userInfo.id || data.user_id,
    user_name: userInfo.name || data.user_name,
    connected_at: new Date().toISOString(),
  };
  return await setMetaData(userId, updated);
}

// Helper: Store selected page
export async function storeSelectedPage(userId, pageId, pageName, pageAccessToken, igBusinessAccountId = null) {
  const data = await getMetaData(userId);
  const updated = {
    ...data,
    selected_page_id: pageId,
    selected_page_name: pageName,
    selected_page_access_token: pageAccessToken,
    selected_ig_business_account_id: igBusinessAccountId,
    page_selected_at: new Date().toISOString(),
  };
  return await setMetaData(userId, updated);
}

// Helper: Log event (without tokens)
export async function logEvent(userId, eventType, eventData = {}) {
  const data = await getMetaData(userId);
  const events = data.events || [];
  
  // Never log tokens
  const sanitized = { ...eventData };
  delete sanitized.access_token;
  delete sanitized.token;
  delete sanitized.page_access_token;
  
  events.push({
    type: eventType,
    timestamp: new Date().toISOString(),
    ...sanitized,
  });
  
  // Keep last 50 events
  const updated = {
    ...data,
    events: events.slice(-50),
  };
  
  return await setMetaData(userId, updated);
}

