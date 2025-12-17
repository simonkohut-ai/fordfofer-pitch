# MikoRK pohrebníctvo - Deployment Checklist

**Purpose:** Step-by-step deployment guide  
**Platform:** Vercel  
**Last Updated:** 2025-12-17

---

## Pre-Deployment Checklist

### 1. Update Client Configuration

**File:** `config/clients/mikork.config.mjs`

**Update:**
- [ ] Business name (if different)
- [ ] Legal name (if applicable)
- [ ] Phone number
- [ ] Email address
- [ ] Emergency phone (if different)
- [ ] Street address
- [ ] City
- [ ] Postal code
- [ ] Region
- [ ] Google Maps coordinates (get from Google Maps)
- [ ] Website URL
- [ ] Facebook page (if exists)

**How to Get Coordinates:**
1. Go to Google Maps
2. Search for your business address
3. Right-click on the location
4. Select coordinates
5. Copy latitude and longitude

---

### 2. Set Environment Variables in Vercel

**Required Variables:**

- [ ] `RESEND_API_KEY` - Get from https://resend.com
- [ ] `CONTACT_EMAIL` - Your email for notifications
- [ ] `RESEND_FROM_EMAIL` - Verified sender email
- [ ] `SITE_URL` - Your website URL

**Optional Variables:**

- [ ] `OPENAI_API_KEY` - For content generator (if using)
- [ ] `OPENAI_MODEL` - Default: `gpt-4o-mini`
- [ ] `OPENAI_TEMPERATURE` - Default: `0.7`

**How to Set:**
1. Go to Vercel Dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add each variable
5. Enable for Production, Preview, Development
6. Save

**See:** `docs/MIKORK_ENV_SETUP.md` for detailed instructions

---

### 3. Verify Resend Domain (If Using Custom Domain)

**If using custom domain for email:**

- [ ] Domain added to Resend
- [ ] DNS records added
- [ ] Domain verified
- [ ] `RESEND_FROM_EMAIL` updated to use custom domain

**If testing:**
- Use `onboarding@resend.dev` (no verification needed)

---

## Deployment Steps

### Step 1: Connect Repository to Vercel

1. Go to https://vercel.com
2. Click "Add New Project"
3. Import your Git repository
4. Select repository: `fordfofer-pitch`

---

### Step 2: Configure Project Settings

**Framework Preset:** Other (or Static)

**Root Directory:** `fordfofer-pitch` (or leave default)

**Build Command:** (leave empty for static)

**Output Directory:** (leave empty for static)

**Install Command:** (leave empty if no dependencies)

---

### Step 3: Set Environment Variables

**Add all required variables:**
- `RESEND_API_KEY`
- `CONTACT_EMAIL`
- `RESEND_FROM_EMAIL`
- `SITE_URL`

**See:** `docs/MIKORK_ENV_SETUP.md` for details

---

### Step 4: Update vercel.json (If Needed)

**Check:** `vercel.json` includes routes for:
- `/` → Homepage
- `/contact` → Contact page
- `/api/mikork/contact` → Contact API

**If missing, add:**
```json
{
  "rewrites": [
    { "source": "/", "destination": "/templates/local-business/index.html" },
    { "source": "/contact", "destination": "/templates/local-business/contact.html" },
    { "source": "/api/mikork/:path*", "destination": "/dashboard/api/mikork/:path*" }
  ]
}
```

---

### Step 5: Deploy

1. Click "Deploy"
2. Wait for deployment to complete
3. Check deployment logs for errors
4. Note deployment URL

---

### Step 6: Verify Deployment

**Run verification script:**
```powershell
.\scripts\VERIFY_MIKORK_PROD.ps1
```

**Or manually check:**
- [ ] Homepage loads (200 OK)
- [ ] Contact page loads (200 OK)
- [ ] Brand CSS loads
- [ ] Contact form API exists
- [ ] Mobile viewport works
- [ ] Phone links work
- [ ] Email links work

---

### Step 7: Test Contact Form

1. Fill out contact form on website
2. Submit form
3. Check email inbox (`CONTACT_EMAIL`)
4. Verify email notification received
5. Respond personally to test submission

**If email doesn't arrive:**
- Check `RESEND_API_KEY` is set correctly
- Check `RESEND_FROM_EMAIL` is verified
- Check `CONTACT_EMAIL` is correct
- Check Vercel logs for errors

---

### Step 8: Set Up Custom Domain (If Applicable)

1. Go to Vercel → Settings → Domains
2. Add your domain (e.g., `mikork.sk`)
3. Add DNS records (Vercel provides instructions)
4. Wait for DNS propagation
5. Update `SITE_URL` environment variable

---

### Step 9: Set Up Google Business Profile

**Follow:** `docs/MIKORK_GOOGLE_BUSINESS_SETUP.md`

**Steps:**
- [ ] Create Google Business Profile
- [ ] Verify business
- [ ] Complete profile information
- [ ] Add photos
- [ ] Write first post (optional)
- [ ] Enable reviews

---

## Post-Deployment Checklist

### Immediate (Day 1)

- [ ] Website is live and accessible
- [ ] Contact form works
- [ ] Email notifications received
- [ ] Phone links work
- [ ] Email links work
- [ ] Mobile viewport works
- [ ] Google Business Profile created

---

### Week 1

- [ ] Monitor contact form submissions
- [ ] Respond to all inquiries personally
- [ ] Check website analytics (if set up)
- [ ] Review Google Business Profile insights
- [ ] Test on multiple devices
- [ ] Test with real users (if possible)

---

### Month 1

- [ ] Review website performance
- [ ] Check local search rankings
- [ ] Review Google Business Profile performance
- [ ] Generate first social media posts
- [ ] Collect user feedback
- [ ] Make improvements based on feedback

---

## Troubleshooting

### Contact Form Not Working

**Check:**
1. Environment variables set correctly
2. Resend API key valid
3. Resend sender email verified
4. Contact email correct
5. API endpoint deployed correctly

**Fix:**
- Verify all environment variables
- Check Vercel logs for errors
- Test Resend API key separately
- Redeploy if needed

---

### Email Not Sending

**Check:**
1. `RESEND_API_KEY` is set
2. `RESEND_FROM_EMAIL` is verified in Resend
3. `CONTACT_EMAIL` is correct
4. Resend account is active

**Fix:**
- Verify Resend account
- Check Resend dashboard for errors
- Verify sender email domain
- Test with `onboarding@resend.dev` first

---

### Website Not Loading

**Check:**
1. Deployment succeeded
2. Domain configured correctly
3. DNS records correct
4. Vercel project settings correct

**Fix:**
- Check deployment logs
- Verify domain configuration
- Check DNS records
- Redeploy if needed

---

## Support

### Getting Help

**For Technical Issues:**
- Check Vercel logs
- Check deployment logs
- Review error messages
- Contact developer

**For Configuration:**
- Review `docs/MIKORK_ENV_SETUP.md`
- Review `docs/MIKORK_HANDOVER.md`
- Contact developer

---

## Final Verification

### Before Going Live

- [ ] All environment variables set
- [ ] Contact form tested and working
- [ ] Email notifications received
- [ ] All links working
- [ ] Mobile viewport tested
- [ ] Google Business Profile set up
- [ ] Client config updated with real data
- [ ] Production verification script passed

---

**Once all checks pass, your website is live and ready for customers!**

