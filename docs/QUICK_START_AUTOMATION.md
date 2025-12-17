# Quick Start – Automation System (3 Hours)

**Goal:** Get from traffic → waitlist → payment → delivery fully automated.

---

## Hour 1: Link + Funnel ✅

### Verify `/prelaunch` Works
```powershell
$urls = @("https://www.golocapo.com/", "https://www.golocapo.com/prelaunch")
foreach ($u in $urls) {
  try {
    $r = Invoke-WebRequest -Uri $u -Method Head -TimeoutSec 15
    Write-Host "$($r.StatusCode)  $u" -ForegroundColor Green
  } catch {
    Write-Host "FAIL  $u" -ForegroundColor Red
  }
}
```

**Expected:** Both return `200`. If not, redeploy in Vercel.

### Test Form Submission
1. Visit: `https://www.golocapo.com/prelaunch`
2. Enter test email
3. Submit
4. **Expected:** Success message appears

---

## Hour 2: Stripe Money Path ✅

### Create Product + Payment Link
1. **Stripe Dashboard** → Products → Add product
2. **Name:** `Golo Čapo Launch Pack`
3. **Price:** €49 (one-time)
4. **Create Payment Link**
5. **Success URL:** `https://www.golocapo.com/thank-you?product=LaunchPack`
6. **Copy Payment Link URL**

### Set in Vercel
1. **Vercel Dashboard** → Project → Settings → Environment Variables
2. Add: `STRIPE_CHECKOUT_URL` = Your Payment Link URL
3. **Save** and **Redeploy**

### Test
```powershell
curl.exe -i https://www.golocapo.com/api/checkout-url
```

**Expected:** Returns Payment Link URL.

---

## Hour 3: n8n Automation ✅

### Option A: Quick Setup (n8n Cloud)
1. Sign up at [cloud.n8n.io](https://cloud.n8n.io)
2. Create Workflow #1 (Waitlist Intake) - see `docs/N8N_WORKFLOWS.md`
3. Create Workflow #2 (Payment Delivery) - see `docs/N8N_WORKFLOWS.md`
4. Get webhook URLs
5. Set `N8N_WEBHOOK_URL` in Vercel (optional)

### Option B: Skip n8n (Use Vercel Only)
- Form already submits to `/api/leads/submit`
- Stripe webhook already handles payment → delivery
- Just set `LAUNCHPACK_DELIVERY_URL` in Vercel for delivery email

---

## Test Complete Flow

1. **Sign up on `/prelaunch`**
   - ✅ Email captured
   - ✅ Confirmation email sent (if Resend configured)

2. **Buy Launch Pack**
   - ✅ Visit `/pricing`
   - ✅ Click "Get Early Access — €49"
   - ✅ Complete test payment (`4242 4242 4242 4242`)
   - ✅ Redirects to `/thank-you`
   - ✅ Delivery email sent (if configured)

3. **Check Results**
   - ✅ Stripe Dashboard shows payment
   - ✅ `/data/audience.csv` updated (if n8n configured)
   - ✅ Delivery email received (if configured)

---

## Daily Routine

1. **Run `PROMO_DAILY.ps1`**
   ```powershell
   .\PROMO_DAILY.ps1
   ```

2. **Post + DM**
   - Paste message in X, LinkedIn, Instagram
   - Send 5–10 DMs using `docs/DAILY_OUTREACH_PLAYBOOK.md`

3. **Update Audience**
   - Add new signups to `/data/audience.csv`
   - Tag with source + intent

---

## Success Checklist

- [ ] `/prelaunch` returns 200
- [ ] Form submits successfully
- [ ] Stripe Payment Link created
- [ ] `STRIPE_CHECKOUT_URL` set in Vercel
- [ ] Test payment completes
- [ ] Delivery email sent (if configured)
- [ ] `PROMO_DAILY.ps1` works

---

**You're ready to accept payments!** 🚀

Next: Start promoting `/prelaunch` and sending DMs.

