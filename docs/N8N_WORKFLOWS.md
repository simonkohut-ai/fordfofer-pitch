# n8n Workflow Templates

**Purpose:** Fully automated waitlist intake, payment delivery, and daily traffic generation.

---

## Workflow #1: Waitlist Intake

### Trigger
- **Webhook** (POST) at: `https://YOUR_N8N_DOMAIN/webhook/prelaunch`

### Nodes

1. **Webhook** (POST)
   - Path: `/webhook/prelaunch`
   - Method: POST
   - Response: JSON

2. **Set** (normalize fields)
   ```json
   {
     "email": "{{ $json.body.email }}",
     "source": "{{ $json.body.source || 'prelaunch' }}",
     "consent": "{{ $json.body.consent }}",
     "first_seen": "{{ $now.toISO() }}",
     "intent": "low",
     "notes": "Waitlist signup"
   }
   ```

3. **Google Sheets** (Append row)
   - Spreadsheet: `audience.csv` (or create new)
   - Sheet: `Sheet1`
   - Columns: `email, source, first_seen, intent, notes`
   - Mode: Append

4. **Send Email** (Resend)
   - To: `{{ $json.email }}`
   - Subject: `Golo Čapo — 21.12`
   - Body (HTML):
   ```html
   <p>You're on the list.</p>
   <p><strong>Golo Čapo — 21.12</strong></p>
   <p>Reply with one word: Founder / Agency / Creator</p>
   ```

### Export
- Save as: `n8n-workflows/waitlist-intake.json`
- Import in n8n: Workflows → Import from File

---

## Workflow #2: Payment Delivery

### Trigger
- **Stripe** (webhook)
   - Event: `checkout.session.completed`
   - Webhook URL: Configure in Stripe Dashboard

### Nodes

1. **Stripe Trigger**
   - Event: `checkout.session.completed`
   - Credentials: Stripe API key

2. **Set** (extract data)
   ```json
   {
     "email": "{{ $json.data.object.customer_details.email }}",
     "amount": "{{ $json.data.object.amount_total / 100 }}",
     "currency": "{{ $json.data.object.currency }}",
     "product": "{{ $json.data.object.metadata.product || 'Launch Pack' }}",
     "timestamp": "{{ $now.toISO() }}"
   }
   ```

3. **Google Sheets** (Update row / upsert)
   - Spreadsheet: `audience.csv`
   - Sheet: `Sheet1`
   - Lookup column: `email`
   - Update columns:
     - `intent`: `High`
     - `notes`: `Paid: {{ $json.product }}`
     - `customer`: `yes`
     - `first_payment_at`: `{{ $json.timestamp }}`

4. **Send Email** (Resend)
   - To: `{{ $json.email }}`
   - Subject: `Your Launch Pack is ready`
   - Body (HTML):
   ```html
   <p>Hi,</p>
   <p>Thanks for your purchase. Here's your Launch Pack:</p>
   <p><a href="{{ $env.LAUNCHPACK_DELIVERY_URL }}">Download Launch Pack</a></p>
   <p><strong>What's inside:</strong></p>
   <ul>
     <li>Pre-launch checklist</li>
     <li>DM templates</li>
     <li>PowerShell promo script</li>
     <li>Waitlist form template</li>
     <li>Stripe setup guide</li>
     <li>n8n workflow templates</li>
     <li>Launch day email templates</li>
     <li>Audience tracking template</li>
   </ul>
   <p>Questions? Reply to this email.</p>
   <p>— Golo Čapo</p>
   ```

5. **Telegram** (notify you)
   - Chat ID: Your Telegram chat ID
   - Message: `PAYMENT RECEIVED: €{{ $json.amount }} from {{ $json.email.split('@')[0] }}`

### Export
- Save as: `n8n-workflows/payment-delivery.json`

---

## Workflow #3: Daily Traffic Loop

### Trigger
- **Cron** (daily at 9:00 AM)

### Nodes

1. **Cron**
   - Schedule: `0 9 * * *` (9 AM daily)

2. **Read File** (or hardcode)
   - File: `assets/LAUNCH_COPY.md`
   - OR hardcode template in Set node

3. **Set** (template)
   ```json
   {
     "baseMessage": "Golo Čapo\n21.12\n\nEarly Christmas gift.\n\nhttps://www.golocapo.com/prelaunch"
   }
   ```

4. **OpenAI** (generate variations)
   - Model: `gpt-3.5-turbo`
   - Prompt: `Generate 3 variations of this post (under 280 chars for X, longer for LinkedIn): {{ $json.baseMessage }}`
   - Max tokens: 200

5. **Set** (format output)
   ```json
   {
     "xPost1": "{{ $json.choices[0].message.content }}",
     "xPost2": "{{ $json.choices[1].message.content }}",
     "linkedinPost": "{{ $json.choices[2].message.content }}"
   }
   ```

6. **Telegram** (send to you)
   - Message: `Today's posts:\n\nX:\n{{ $json.xPost1 }}\n\nLinkedIn:\n{{ $json.linkedinPost }}`

7. **Google Docs** (append)
   - Document: `Daily Promo Copy`
   - Content: `{{ $now.toFormat('yyyy-MM-dd') }}\n{{ $json.xPost1 }}\n{{ $json.linkedinPost }}\n---\n`

### Export
- Save as: `n8n-workflows/daily-traffic.json`

---

## Setup Instructions

1. **Create n8n account** (cloud.n8n.io or self-hosted)
2. **Import workflows** from `n8n-workflows/` folder
3. **Configure credentials:**
   - Stripe API key
   - Resend API key (or Gmail SMTP)
   - Telegram bot token
   - Google Sheets API (if using)
   - OpenAI API key (for Workflow #3)
4. **Set environment variables:**
   - `LAUNCHPACK_DELIVERY_URL` (Google Drive link or ZIP URL)
   - `N8N_WEBHOOK_URL` (for Vercel → n8n forwarding)
5. **Activate workflows**
6. **Test** each workflow manually

---

## Integration with Vercel

### Option A: Direct n8n Webhook
- Update prelaunch form to submit directly to n8n webhook
- Skip Vercel API (simpler, but less control)

### Option B: Vercel API → n8n
- Keep form submitting to `/api/leads/submit`
- Add optional forward to n8n in `submit.mjs`:
  ```javascript
  const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL;
  if (n8nWebhookUrl) {
    fetch(n8nWebhookUrl, {
      method: 'POST',
      body: JSON.stringify({ email, source, consent }),
    }).catch(() => {}); // Don't block if n8n fails
  }
  ```

---

## Testing Checklist

- [ ] Workflow #1: Submit test email → Check Google Sheet → Check email received
- [ ] Workflow #2: Complete test Stripe payment → Check Sheet updated → Check delivery email → Check Telegram notification
- [ ] Workflow #3: Trigger cron manually → Check Telegram message → Check Google Doc updated

---

**Note:** These workflows are templates. Customize for your specific setup (Airtable instead of Sheets, different email provider, etc.).

