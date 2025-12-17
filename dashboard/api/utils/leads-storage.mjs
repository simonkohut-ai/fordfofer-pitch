// Leads storage utilities
// Unified customer database: leads (pre-payment) + customers (post-payment)

import { getMetaData, setMetaData } from './storage.mjs';

const STORAGE_PREFIX = 'leads:';
const CUSTOMERS_PREFIX = 'payment:customers:';

// Generate unique ID
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Get all leads
export async function getAllLeads() {
  const userId = 'default';
  const data = await getMetaData(userId);
  
  const leads = [];
  for (const key in data) {
    if (key.startsWith(STORAGE_PREFIX)) {
      leads.push(data[key]);
    }
  }
  
  return leads.sort((a, b) => 
    new Date(b.createdAt) - new Date(a.createdAt)
  );
}

// Get lead by email
export async function getLeadByEmail(email) {
  const leads = await getAllLeads();
  return leads.find(l => l.email.toLowerCase() === email.toLowerCase()) || null;
}

// Create or update lead
export async function createLead(email, source, consent = false, tags = []) {
  const userId = 'default';
  const data = await getMetaData(userId);
  
  // Check if lead already exists
  const existingLead = await getLeadByEmail(email);
  
  if (existingLead) {
    // Update existing lead (merge tags, update source if new)
    const updatedTags = [...new Set([...existingLead.tags || [], ...tags])];
    const updatedLead = {
      ...existingLead,
      source: source || existingLead.source,
      consent: consent !== undefined ? consent : existingLead.consent,
      tags: updatedTags,
      updatedAt: new Date().toISOString(),
    };
    
    const storageKey = `${STORAGE_PREFIX}${existingLead.id}`;
    data[storageKey] = updatedLead;
    await setMetaData(userId, data);
    return updatedLead;
  }
  
  // Create new lead
  const lead = {
    id: generateId(),
    email: email.toLowerCase(),
    source: source || 'landing',
    createdAt: new Date().toISOString(),
    consent: consent,
    tags: tags || [],
    surveyCompleted: false,
    name: null,
    phone: null,
    message: null,
    brand: null,
  };
  
  const storageKey = `${STORAGE_PREFIX}${lead.id}`;
  data[storageKey] = lead;
  await setMetaData(userId, data);
  
  return lead;
}

// Update lead (survey completion, tags, etc.)
export async function updateLead(email, updates) {
  const lead = await getLeadByEmail(email);
  if (!lead) return null;
  
  const userId = 'default';
  const data = await getMetaData(userId);
  
  const updatedLead = {
    ...lead,
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  
  const storageKey = `${STORAGE_PREFIX}${lead.id}`;
  data[storageKey] = updatedLead;
  await setMetaData(userId, data);
  
  return updatedLead;
}

// Upgrade lead to customer (called from Stripe webhook)
export async function upgradeLeadToCustomer(email, paymentData) {
  const lead = await getLeadByEmail(email);
  
  const userId = 'default';
  const data = await getMetaData(userId);
  
  // Create customer record
  const customer = {
    id: generateId(),
    email: email.toLowerCase(),
    leadId: lead?.id || null,
    firstPaymentAt: paymentData.createdAt,
    amount: paymentData.amount,
    currency: paymentData.currency || 'EUR',
    status: 'active',
    stripeCustomerId: paymentData.stripeCustomerId || null,
  };
  
  const customerKey = `${CUSTOMERS_PREFIX}${email.toLowerCase()}`;
  data[customerKey] = customer;
  
  // Update lead with customer tag
  if (lead) {
    const updatedTags = [...new Set([...(lead.tags || []), 'customer'])];
    const leadKey = `${STORAGE_PREFIX}${lead.id}`;
    data[leadKey] = {
      ...lead,
      tags: updatedTags,
      customerId: customer.id,
      updatedAt: new Date().toISOString(),
    };
  }
  
  await setMetaData(userId, data);
  return customer;
}

// Get all customers
export async function getAllCustomers() {
  const userId = 'default';
  const data = await getMetaData(userId);
  
  const customers = [];
  for (const key in data) {
    if (key.startsWith(CUSTOMERS_PREFIX)) {
      customers.push(data[key]);
    }
  }
  
  return customers.sort((a, b) => 
    new Date(b.firstPaymentAt) - new Date(a.firstPaymentAt)
  );
}

// Get customer by email
export async function getCustomerByEmail(email) {
  const customers = await getAllCustomers();
  return customers.find(c => c.email.toLowerCase() === email.toLowerCase()) || null;
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

// Calculate conversion rate
export function calculateConversionRate(leads, customers) {
  if (leads.length === 0) return 0;
  return ((customers.length / leads.length) * 100).toFixed(1);
}

