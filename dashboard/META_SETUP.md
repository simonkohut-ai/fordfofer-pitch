# Meta Business Integration Setup Guide

**Version:** 1.0.0-prelaunch  
**Launch Date:** 21.12.2025

---

## Overview

This guide walks you through setting up Meta (Facebook) Business integration for AI Studio. The integration allows users to:

- **Phase B.1:** Connect Meta account and select Facebook Pages
- **Phase B.2:** Post generated content directly to Facebook Pages (manual approval)
- **Phase B.3:** Schedule automatic posts (coming after launch)

---

## Prerequisites

- Meta Developer Account
- Facebook Page (for posting)
- Instagram Business Account (optional, for future IG posting)
- Vercel Pro account (for KV/Postgres storage)

---

## Step 1: Create Meta App

1. Go to [Meta for Developers](https://developers.facebook.com/)
2. Click **"My Apps"** → **"Create App"**
3. Select **"Business"** as app type
4. Fill in:
   - **App Name:** AI Studio (or your preferred name)
   - **App Contact Email:** Your email
   - **Business Account:** Select or create one
5. Click **"Create App"**

---

## Step 2: Configure App Settings

### Basic Settings

1. Go to **Settings** → **Basic**
2. Add **App Domains:**
   - `golocapo.com`
   - `*.vercel.app` (for staging)
3. Add **Privacy Policy URL:** `https://golocapo.com/privacy`
4. Add **Terms of Service URL:** `https://golocapo.com/terms`
5. Click **"Save Changes"**

### OAuth Settings

1. Go to **Settings** → **Basic** → **Add Platform**
2. Select **"Website"**
3. Add **Site URL:** `https://golocapo.com`
4. Add **Valid OAuth Redirect URIs:**
   - `https://golocapo.com/api/meta/oauth/callback`
   - `https://your-staging.vercel.app/api/meta/oauth/callback`
5. Click **"Save Changes"**

---

## Step 3: Request Permissions

### Required Permissions

1. Go to **App Review** → **Permissions and Features**
2. Request the following permissions:

#### For Phase B.1 (Connect + Pages):
- `pages_show_list` (No review needed)
- `pages_read_engagement` (No review needed)

#### For Phase B.2 (Posting):
- `pages_manage_posts` (Requires App Review)

#### For Phase B.3 (Instagram):
- `instagram_basic` (Requires App Review)
- `instagram_content_publish` (Requires App Review)

### App Review Process

**Note:** `pages_manage_posts` requires Meta App Review, which can take 7-14 days.

**For launch (21.12.2025):**
- Ship Phase B.1 (Connect + Pages) first
- Add Phase B.2 (Posting) after review approval
- Phase B.3 (Scheduling) can wait until after launch

---

## Step 4: Get App Credentials

1. Go to **Settings** → **Basic**
2. Copy:
   - **App ID** → `META_APP_ID`
   - **App Secret** → `META_APP_SECRET` (click "Show" to reveal)
3. Set **Redirect URI:** `https://golocapo.com/api/meta/oauth/callback`

---

## Step 5: Configure Vercel Environment Variables

### Required Variables

Go to Vercel Dashboard → Your Project → Settings → Environment Variables

Add:

```bash
# Meta Integration Flags
META_INTEGRATION_ENABLED=true
META_POSTING_ENABLED=false  # Set to true after App Review approval
META_SCHEDULER_ENABLED=false  # Set to true after launch
META_IG_ENABLED=false  # Set to true after App Review approval

# Meta App Credentials
META_APP_ID=your_app_id_here
META_APP_SECRET=your_app_secret_here
META_REDIRECT_URI=https://golocapo.com/api/meta/oauth/callback

# Storage (choose one)
STORAGE_TYPE=kv  # or 'postgres' or 'memory' (for local dev)

# If using Vercel KV
KV_REST_API_URL=https://your-kv-instance.kv.vercel-storage.com
KV_REST_API_TOKEN=your_kv_token_here

# If using Vercel Postgres
POSTGRES_URL=postgresql://...
```

### Environment-Specific Settings

**Production:**
- `META_INTEGRATION_ENABLED=true`
- `META_POSTING_ENABLED=false` (until App Review approved)
- `META_REDIRECT_URI=https://golocapo.com/api/meta/oauth/callback`

**Staging:**
- `META_INTEGRATION_ENABLED=true`
- `META_POSTING_ENABLED=true` (for testing)
- `META_REDIRECT_URI=https://your-staging.vercel.app/api/meta/oauth/callback`

**Local Dev:**
- `META_INTEGRATION_ENABLED=false` (or use test app)
- `STORAGE_TYPE=memory`

---

## Step 6: Set Up Storage

### Option A: Vercel KV (Recommended)

1. Go to Vercel Dashboard → Storage → Create Database
2. Select **KV** (Redis)
3. Choose region (closest to your users)
4. Copy `KV_REST_API_URL` and `KV_REST_API_TOKEN`
5. Add to environment variables

### Option B: Vercel Postgres

1. Go to Vercel Dashboard → Storage → Create Database
2. Select **Postgres**
3. Create table (if needed):
   ```sql
   CREATE TABLE IF NOT EXISTS meta_storage (
     user_id TEXT PRIMARY KEY,
     data JSONB,
     updated_at TIMESTAMP DEFAULT NOW()
   );
   ```
4. Copy `POSTGRES_URL`
5. Add to environment variables

### Option C: Memory (Local Dev Only)

- Set `STORAGE_TYPE=memory`
- Data is lost on server restart
- **Do not use in production**

---

## Step 7: Test Integration

### Test Phase B.1 (Connect + Pages)

1. Deploy to staging with `META_INTEGRATION_ENABLED=true`
2. Go to Automation Hub
3. Click **"Connect Meta Account"**
4. Authorize the app
5. Verify Pages list appears
6. Select a Page
7. Verify "Connected" status shows

### Test Phase B.2 (Posting)

**Only after App Review approval:**

1. Set `META_POSTING_ENABLED=true`
2. Generate content in Marketing Generator
3. Go to Automation Hub
4. Click **"Post Latest Content to Facebook"**
5. Confirm posting
6. Verify post appears on Facebook Page

---

## Troubleshooting

### "Meta integration not enabled"
- Check `META_INTEGRATION_ENABLED=true` in Vercel env vars
- Redeploy after adding env vars

### "Not connected to Meta"
- Click "Connect Meta Account" button
- Verify OAuth redirect URI matches exactly
- Check Meta App settings → Valid OAuth Redirect URIs

### "No Pages found"
- User must be admin/editor of at least one Facebook Page
- Check Page permissions in Facebook

### "Unable to post"
- Verify `pages_manage_posts` permission is approved
- Check `META_POSTING_ENABLED=true`
- Verify Page access token is valid

### Token expired
- Tokens expire after 60 days
- User must reconnect via OAuth

---

## Security Notes

- **Never log tokens** - All token handling is server-side only
- **Encrypt at rest** - Use Vercel KV/Postgres (encrypted by default)
- **HTTPS only** - OAuth requires HTTPS
- **Rate limiting** - Posting is rate-limited per minute
- **User confirmation** - All posts require explicit confirmation

---

## Launch Checklist

- [ ] Meta App created and configured
- [ ] OAuth redirect URIs set correctly
- [ ] `pages_show_list` permission working (no review needed)
- [ ] `pages_manage_posts` permission requested (if posting needed)
- [ ] Environment variables set in Vercel
- [ ] Storage configured (KV or Postgres)
- [ ] Tested Phase B.1 (Connect + Pages) in staging
- [ ] Tested Phase B.2 (Posting) in staging (if approved)
- [ ] Production env vars match staging (except redirect URI)
- [ ] Monitoring/logging configured

---

## Post-Launch

After 21.12.2025 launch:

1. Monitor Meta API usage
2. Request `pages_manage_posts` App Review if not already approved
3. Enable `META_POSTING_ENABLED=true` in production
4. Add Phase B.3 (Scheduling) with Vercel Cron
5. Request Instagram permissions if needed

---

**Last Updated:** Pre-Launch  
**Support:** Check `LAUNCH_RUNBOOK.md` for war room procedures

