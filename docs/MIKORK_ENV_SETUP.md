# MikoRK pohrebníctvo - Environment Variables Setup

**Purpose:** Configure environment variables for production deployment  
**Platform:** Vercel  
**Last Updated:** 2025-12-17

---

## Required Environment Variables

### 1. RESEND_API_KEY

**Purpose:** Send email notifications for contact form submissions

**How to Get:**
1. Go to https://resend.com
2. Sign up or log in
3. Go to "API Keys" section
4. Click "Create API Key"
5. Name it: "MikoRK Production"
6. Copy the key (starts with `re_`)

**Set in Vercel:**
- Variable name: `RESEND_API_KEY`
- Value: `re_xxxxxxxxxxxxxxxxxxxxx`
- Environment: Production, Preview, Development

---

### 2. CONTACT_EMAIL

**Purpose:** Email address where contact form notifications are sent

**Set in Vercel:**
- Variable name: `CONTACT_EMAIL`
- Value: `info@mikork.sk` (or your actual email)
- Environment: Production, Preview, Development

**Important:** This is where you'll receive contact form submissions.

---

### 3. RESEND_FROM_EMAIL

**Purpose:** Email address that sends notifications (must be verified in Resend)

**Set in Vercel:**
- Variable name: `RESEND_FROM_EMAIL`
- Value: `MikoRK pohrebníctvo <noreply@mikork.sk>`
- Environment: Production, Preview, Development

**Important:** 
- Domain must be verified in Resend
- Or use Resend's default domain: `onboarding@resend.dev` (for testing)

---

### 4. SITE_URL

**Purpose:** Your website URL (for email links, structured data)

**Set in Vercel:**
- Variable name: `SITE_URL`
- Value: `https://www.mikork.sk` (or your actual domain)
- Environment: Production, Preview, Development

---

## Optional Environment Variables

### 5. OPENAI_API_KEY (Optional)

**Purpose:** For content generator script (if using automation)

**Set in Vercel:**
- Variable name: `OPENAI_API_KEY`
- Value: `sk-xxxxxxxxxxxxxxxxxxxxx`
- Environment: Production, Preview, Development

**Note:** Only needed if using content generator. Not required for basic website.

---

### 6. OPENAI_MODEL (Optional)

**Purpose:** OpenAI model to use for content generation

**Set in Vercel:**
- Variable name: `OPENAI_MODEL`
- Value: `gpt-4o-mini` (default)
- Environment: Production, Preview, Development

---

### 7. OPENAI_TEMPERATURE (Optional)

**Purpose:** Creativity level for content generation (0.0-1.0)

**Set in Vercel:**
- Variable name: `OPENAI_TEMPERATURE`
- Value: `0.7` (default)
- Environment: Production, Preview, Development

---

## How to Set in Vercel

### Step 1: Go to Vercel Dashboard

1. Visit https://vercel.com
2. Log in
3. Select your project (MikoRK)

### Step 2: Go to Settings

1. Click "Settings" tab
2. Click "Environment Variables" in sidebar

### Step 3: Add Variables

For each variable:
1. Click "Add New"
2. Enter variable name (e.g., `RESEND_API_KEY`)
3. Enter value
4. Select environments (Production, Preview, Development)
5. Click "Save"

### Step 4: Redeploy

After adding variables:
1. Go to "Deployments" tab
2. Click "..." on latest deployment
3. Click "Redeploy"
4. Or push new commit to trigger redeploy

---

## Verification

### Check Variables Are Set

**In Vercel:**
1. Go to Settings → Environment Variables
2. Verify all required variables are present
3. Check they're enabled for correct environments

**In Logs:**
1. Go to Deployments → Latest deployment → Logs
2. Check for any "missing environment variable" errors
3. If missing, add and redeploy

---

## Testing

### Test Contact Form

1. Fill out contact form on website
2. Submit form
3. Check email inbox (CONTACT_EMAIL)
4. Verify email notification received

**If email doesn't arrive:**
- Check RESEND_API_KEY is set correctly
- Check RESEND_FROM_EMAIL is verified in Resend
- Check CONTACT_EMAIL is correct
- Check Vercel logs for errors

---

## Security Notes

### Keep Keys Secret

- ✅ Never commit API keys to Git
- ✅ Never share API keys publicly
- ✅ Rotate keys if compromised
- ✅ Use different keys for production/preview

### Resend Domain Verification

**To use custom domain:**
1. Go to Resend → Domains
2. Add your domain (e.g., `mikork.sk`)
3. Add DNS records (Resend provides instructions)
4. Wait for verification
5. Update RESEND_FROM_EMAIL to use your domain

**For testing:**
- Use `onboarding@resend.dev` (no verification needed)
- Switch to custom domain for production

---

## Troubleshooting

### "RESEND_API_KEY is missing"

**Solution:**
1. Add RESEND_API_KEY to Vercel environment variables
2. Redeploy

### "Email send failed"

**Possible causes:**
- Invalid API key
- Unverified sender email
- Rate limit exceeded
- Check Resend dashboard for errors

**Solution:**
1. Verify API key is correct
2. Verify sender email in Resend
3. Check Resend dashboard for error details
4. Wait if rate limited

### "CONTACT_EMAIL is missing"

**Solution:**
1. Add CONTACT_EMAIL to Vercel environment variables
2. Redeploy

---

## Checklist

- [ ] RESEND_API_KEY set in Vercel
- [ ] CONTACT_EMAIL set in Vercel
- [ ] RESEND_FROM_EMAIL set in Vercel
- [ ] SITE_URL set in Vercel
- [ ] Domain verified in Resend (if using custom domain)
- [ ] Contact form tested
- [ ] Email notification received
- [ ] All variables enabled for correct environments

---

## Quick Setup Commands

**For Vercel CLI (optional):**

```bash
vercel env add RESEND_API_KEY
vercel env add CONTACT_EMAIL
vercel env add RESEND_FROM_EMAIL
vercel env add SITE_URL
```

**Then redeploy:**
```bash
vercel --prod
```

---

**Remember:** Environment variables are required for contact form to work. Set them before going live.

