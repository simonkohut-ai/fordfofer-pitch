// Payment storage utilities
// Uses same storage adapter as Meta integration

import { getMetaData, setMetaData } from './storage.mjs';

const STORAGE_PREFIX = 'payment:';

// Get payment data
export async function getStorage(category, key) {
  const storageKey = `${STORAGE_PREFIX}${category}:${key}`;
  const userId = 'default'; // Single-tenant for now
  
  try {
    const data = await getMetaData(userId);
    return data[storageKey] || null;
  } catch (error) {
    console.error('Payment storage get error:', error.message);
    return null;
  }
}

// Set payment data
export async function setStorage(category, key, value, merge = false) {
  const storageKey = `${STORAGE_PREFIX}${category}:${key}`;
  const userId = 'default';
  
  try {
    const data = await getMetaData(userId);
    
    if (merge && data[storageKey]) {
      // Merge with existing
      data[storageKey] = { ...data[storageKey], ...value };
    } else {
      data[storageKey] = value;
    }
    
    await setMetaData(userId, data);
    return true;
  } catch (error) {
    console.error('Payment storage set error:', error.message);
    return false;
  }
}

// Get all customers
export async function getAllCustomers() {
  const userId = 'default';
  const data = await getMetaData(userId);
  
  const customers = [];
  for (const key in data) {
    if (key.startsWith(`${STORAGE_PREFIX}customers:`)) {
      customers.push(data[key]);
    }
  }
  
  return customers.sort((a, b) => 
    new Date(b.lastPaymentAt || b.createdAt) - new Date(a.lastPaymentAt || a.createdAt)
  );
}

// Get all events
export async function getAllEvents() {
  const events = await getStorage('events', 'all') || [];
  return events.sort((a, b) => 
    new Date(b.createdAt) - new Date(a.createdAt)
  );
}

// Mask email for display
export function maskEmail(email) {
  if (!email) return 'unknown';
  const [local, domain] = email.split('@');
  if (local.length <= 3) {
    return `${local[0]}***@${domain}`;
  }
  return `${local.substring(0, 3)}***@${domain}`;
}

