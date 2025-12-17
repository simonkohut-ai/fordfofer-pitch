# Automation Playbook – Traffic → Waitlist → Payment → Delivery

**Goal:** Fully automated system using Vercel + Stripe + n8n + PowerShell.

**First Product:** LaunchPack (templates, scripts, checklists)

---

## Phase 0: Fix the One Link (Non-Negotiable)

### Target Link
`https://www.golocapo.com/prelaunch`

### Fix Checklist
1. ✅ Verify `/prelaunch` route exists in `vercel.json`
2. ✅ Verify `dashboard/prelaunch.html` exists
3. ✅ Verify form submits to `/api/leads/submit`
4. ✅ Test: Run smoke test script (see below)

### Smoke Test (PowerShell)
```powershell
$urls = @(
  "https://www.golocapo.com/",
  "https://www.golocapo.com/prelaunch"
)

foreach ($u in $urls) {
  try {
    $r = Invoke-WebRequest -Uri $u -Method Head -TimeoutSec 15
    Write-Host "$($r.StatusCode)  $u" -ForegroundColor Green
  } catch {
    Write-Host "FAIL  $u" -ForegroundColor Red
  }
}
```

**Do not promote until `/prelaunch` returns 200.**

---

## Phase 1: First Digital Product – LaunchPack

### Product Details
- **Name:** Golo Čapo Launch Pack
- **Price:** €49 (one-time)
- **What's Included:**
  - Pre-launch checklist (markdown)
  - DM templates (3 variations)
  - PowerShell promo script
  - Waitlist form HTML template
  - Stripe Payment Link setup guide
  - n8n workflow templates (JSON exports)
  - Launch day email templates
  - Audience tracking CSV template

### Delivery Method
- Google Drive folder (shared link)
- OR ZIP file in repo (`/products/launchpack.zip`)
- OR Notion page export

### Stripe Setup
1. Stripe Dashboard → Products → Add product
2. **Name:** "Golo Čapo Launch Pack"
3. **Description:** "Pre-launch templates, scripts, and checklists for founders"
4. **Price:** €49 (one-time)
5. **Create Payment Link**
6. **Success URL:** `https://www.golocapo.com/thank-you?product=launchpack`
7. Copy Payment Link URL → Set as `STRIPE_CHECKOUT_URL` in Vercel

---

## Phase 2: n8n Workflow #1 – Waitlist Intake

### Goal
When someone signs up on `/prelaunch`:
- Save to `/data/audience.csv` (or Google Sheet/Airtable)
- Send immediate "you're in" email
- Tag with source + intent

### Option A: Direct n8n Webhook (Fastest)
1. Create n8n webhook: `https://YOUR_N8N_DOMAIN/webhook/prelaunch`
2. Update prelaunch form to submit to n8n webhook (or keep Vercel API and forward)

### Option B: Vercel API → n8n (Cleaner)
1. Keep form submitting to `/api/leads/submit`
2. Add n8n webhook call in `submit.mjs` (optional, non-blocking)

### n8n Workflow Nodes
1. **Webhook** (POST) – receives email, source, consent
2. **Set** – normalize fields: `email`, `source`, `timestamp`, `intent=low`
3. **Google Sheets** (Append row) OR Airtable OR Notion DB
   - Columns: `email, source, first_seen, intent, notes`
4. **Send Email** (Resend/Gmail SMTP)
   - Subject: `Golo Čapo — 21.12`
   - Body: Ultra-minimal confirmation

### Email Body Template
```
You're on the list.

Golo Čapo — 21.12

Reply with one word: Founder / Agency / Creator
```

---

## Phase 3: n8n Workflow #2 – Payment Delivery

### Goal
When Stripe payment succeeds:
- Email delivery automatically
- Tag as "customer" in audience database
- Send Telegram notification

### n8n Workflow Nodes
1. **Stripe Trigger:** `checkout.session.completed`
2. **Google Sheets** (Update row / upsert by email)
   - Set: `intent=High`, `notes=Paid: LaunchPack`, `customer=yes`
3. **Send Email** (delivery)
   - Subject: `Your Launch Pack is ready`
   - Body: Include Drive link / ZIP link / Notion link
4. **Telegram** (notify you): "PAYMENT RECEIVED: €49 from [email]"

### Stripe Webhook Setup
1. Stripe Dashboard → Webhooks → Add endpoint
2. **URL:** `https://www.golocapo.com/api/stripe/webhook`
3. **Events:** `checkout.session.completed`
4. Copy signing secret → Set as `STRIPE_WEBHOOK_SECRET` in Vercel

### Delivery Email Template
```
Subject: Your Launch Pack is ready

Hi,

Thanks for your purchase. Here's your Launch Pack:

[Google Drive Link] OR [ZIP Download Link]

What's inside:
- Pre-launch checklist
- DM templates
- PowerShell promo script
- Waitlist form template
- Stripe setup guide
- n8n workflow templates
- Launch day email templates
- Audience tracking template

Questions? Reply to this email.

— Golo Čapo
```

---

## Phase 4: n8n Workflow #3 – Daily Traffic Loop (Semi-Automated)

### Goal
Each morning:
- Generate 3 post variants
- Send to Telegram
- Put in Google Doc
- Open promo tabs via PowerShell

### n8n Workflow Nodes
1. **Cron** (daily 9:00)
2. **Read File** (`assets/LAUNCH_COPY.md`) OR hardcode template
3. **OpenAI** node (generate 3 variations, keep under 280 chars + LinkedIn version)
4. **Telegram** (send to you)
5. **Google Docs** (append "today's copy")

### Then You Post Manually
- Run `PROMO_DAILY.ps1` (opens tabs + copies to clipboard)
- Post in 5 minutes

---

## Phase 5: PowerShell Promo Script

### File: `PROMO_DAILY.ps1`
```powershell
$promo = @"
Golo Čapo
21.12

Early Christmas gift.

https://www.golocapo.com/prelaunch
"@

Set-Clipboard $promo

Start-Process "https://www.golocapo.com/prelaunch"
Start-Process "https://x.com/compose/post"
Start-Process "https://www.linkedin.com/feed/"
Start-Process "https://www.instagram.com/"
Start-Process "https://web.telegram.org/"
Write-Host "Clipboard loaded. Tabs opened. Post + DM now." -ForegroundColor Green
```

---

## Phase 6: ASAP Results Plan (3 Hours)

### Hour 1: Link + Funnel
- ✅ Fix `/prelaunch` to 200 (verify)
- ✅ Confirm form submits (test)

### Hour 2: Stripe Money Path
- Create 1 product + Payment Link (€49)
- Set `STRIPE_CHECKOUT_URL` in Vercel
- Create delivery page or email delivery

### Hour 3: n8n Automation
- Build Workflow #1 (waitlist intake)
- Build Workflow #2 (payment delivery + Telegram ping)

Then DM/post the one-liner everywhere.

---

## Phase 7: API Endpoint for n8n Integration

### Create: `dashboard/api/n8n/webhook.mjs`
```javascript
// n8n webhook endpoint (optional forwarder)
// Allows n8n to receive waitlist signups directly

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, source, consent } = req.body;
  
  // Forward to n8n webhook (if configured)
  const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL;
  
  if (n8nWebhookUrl) {
    try {
      await fetch(n8nWebhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source, consent, timestamp: new Date().toISOString() }),
      });
    } catch (err) {
      console.error('n8n webhook error:', err.message);
    }
  }
  
  // Always return success (don't block if n8n fails)
  return res.status(200).json({ success: true });
}
```

---

## Security Notes

- ✅ Use environment variables (Vercel + n8n credentials manager)
- ✅ Never paste passwords in code
- ✅ Webhook signature verification (already in Stripe webhook handler)
- ✅ Rate limiting (already in `/api/leads/submit`)

---

## Success Checklist

- [ ] `/prelaunch` returns 200
- [ ] Form submits successfully
- [ ] Stripe Payment Link created
- [ ] `STRIPE_CHECKOUT_URL` set in Vercel
- [ ] n8n Workflow #1 (waitlist) built
- [ ] n8n Workflow #2 (payment delivery) built
- [ ] `PROMO_DAILY.ps1` created
- [ ] Test payment completes
- [ ] Delivery email sent automatically
- [ ] Telegram notification received

---

## Next Steps After Setup

1. **DM 5–10 people** using `DAILY_OUTREACH_PLAYBOOK.md`
2. **Post once** using `PROMO_DAILY.ps1`
3. **Monitor** `/data/audience.csv` for new signups
4. **Track** payments in Stripe Dashboard
5. **Iterate** based on what works

---

**Remember:** System first, then traffic. Once automated, you can scale without manual work.

