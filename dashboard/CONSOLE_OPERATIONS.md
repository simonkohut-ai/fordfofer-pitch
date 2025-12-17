# Console Operations - Revenue System

**Purpose:** Operate the entire revenue system from console alone.

---

## Start System

```powershell
# Windows
cd fordfofer-pitch\dashboard
.\SHIP.ps1

# Or manually
npm run dev
```

**Expected:** Server starts on `http://localhost:3000`

---

## Health Check

```bash
# Basic health
curl http://localhost:3000/api/health

# Production
curl https://golocapo.com/api/health
```

**Returns:**
- System status
- Service availability (Stripe, Email, Meta)
- Revenue metrics (leads, customers, conversion rate, revenue)

---

## Revenue Metrics

```bash
# Leads status
curl http://localhost:3000/api/leads/status

# Customers status
curl http://localhost:3000/api/customers/status

# Launch status (countdown)
curl http://localhost:3000/api/launch/status
```

**Returns:**
- Total leads
- Total customers
- Conversion rate
- Revenue (€)
- Recent leads/customers (masked)

---

## Trigger Launch Email

```bash
# On launch day (21.12.2025)
curl -X POST https://golocapo.com/api/launch/send-launch-email \
  -H "Content-Type: application/json"

# Manual override (testing)
curl -X POST http://localhost:3000/api/launch/send-launch-email \
  -H "Content-Type: application/json" \
  -d '{"force":"true"}'
```

**Returns:**
- Total leads
- Emails sent
- Emails failed

---

## Test Payment Flow

```bash
# 1. Start Stripe CLI (separate terminal)
stripe listen --forward-to localhost:3000/api/stripe/webhook

# 2. Trigger test payment
stripe trigger checkout.session.completed

# 3. Verify in system
curl http://localhost:3000/api/customers/status
```

---

## Deploy to Production

```bash
# 1. Commit changes
git add .
git commit -m "Production ready: Revenue system"

# 2. Push to trigger Vercel deployment
git push origin main

# 3. Verify deployment
curl https://golocapo.com/api/health
```

---

## Monitor Revenue

```bash
# Watch revenue in real-time (every 10 seconds)
while true; do
  echo "=== $(date) ==="
  curl -s http://localhost:3000/api/leads/status | jq '.stats | {leads: .totalLeads, customers: .totalCustomers, conversion: .conversionRate}'
  curl -s http://localhost:3000/api/customers/status | jq '.stats | {revenue: .totalRevenue}'
  sleep 10
done
```

---

## Quick Status Check

```bash
# One-liner: Full system status
curl -s http://localhost:3000/api/health | jq '{status, revenue, services}'
```

---

## Emergency Actions

### Reset Test Data (Local Only)

```bash
# Clear leads (local storage only)
# Note: Production uses Vercel KV/Postgres - manual deletion required
```

### Force Launch Email (Testing)

```bash
curl -X POST http://localhost:3000/api/launch/send-launch-email \
  -H "Content-Type: application/json" \
  -d '{"force":"true"}'
```

---

## Production URLs

```bash
# Health
https://golocapo.com/api/health

# Revenue
https://golocapo.com/api/leads/status
https://golocapo.com/api/customers/status

# Launch
https://golocapo.com/api/launch/status
https://golocapo.com/api/launch/send-launch-email (POST)

# Pages
https://golocapo.com/prelaunch
https://golocapo.com/pricing
https://golocapo.com/war-room
```

---

**Rule:** Everything must be triggerable from console. No UI required for operations.

