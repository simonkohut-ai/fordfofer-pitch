# Deployment Troubleshooting Guide

**Why deployment says "success" but domain is not LIVE**

---

## 🚨 Common Issue: "Deployment Successful" But Domain Not Working

### The Problem

You see:
```
✅ Deployment successful!
🌐 Production URL: https://dashboard-xxx.vercel.app
```

But:
- `https://golocapo.com` doesn't work
- Domain shows error or times out
- Script says "NOT LIVE"

### Why This Happens

**Deployment ≠ Domain Working**

1. **Vercel deployment succeeds** → Code is deployed to `.vercel.app` URL
2. **Domain attachment is separate** → Must be configured in Vercel dashboard
3. **DNS configuration is separate** → Must be done at domain registrar
4. **DNS propagation takes time** → Can take up to 48 hours

**The script now prevents false positives:**
- ✅ Checks domain is attached (aborts if not)
- ✅ Tests domain responds with HTTP 200 (aborts if not)
- ✅ Never says "LIVE" unless domain actually works

---

## 🔍 Diagnosis Steps

### Step 1: Check Domain Attachment

```powershell
cd "fordfofer-pitch\dashboard"
vercel domains ls
```

**Expected:** Should show `golocapo.com` in the list

**If not shown:**
- Domain is not attached
- Go to Vercel dashboard → Settings → Domains → Add domain

### Step 2: Check DNS Records

Go to your domain registrar (where you bought `golocapo.com`):
- Check if DNS records match Vercel's instructions
- Verify A/CNAME records are correct
- Check if records have propagated (use `nslookup` or online DNS checker)

### Step 3: Test Domain Directly

```powershell
curl https://golocapo.com/api/health
```

**Expected:** HTTP 200 with JSON response

**If fails:**
- DNS not configured correctly
- DNS still propagating
- SSL certificate not issued yet

---

## ✅ What "LIVE" Actually Means

**The script says "LIVE" only when:**

1. ✅ Deployment succeeded
2. ✅ Domain is attached in Vercel
3. ✅ Domain responds with HTTP 200
4. ✅ All routes verified

**If any step fails, script aborts and shows error.**

---

## 🔧 Fixes

### Fix 1: Domain Not Attached

**Symptom:** Script aborts with "Domain golocapo.com is NOT attached"

**Fix:**
1. Go to: https://vercel.com/dashboard
2. Select project: `dashboard`
3. Settings → Domains
4. Add: `golocapo.com`
5. Follow DNS setup instructions
6. Run script again

### Fix 2: Domain Attached But Not Responding

**Symptom:** Script aborts with "Custom domain golocapo.com is NOT responding"

**Possible causes:**

**A) DNS Not Configured**
- Check domain registrar
- Add DNS records as shown in Vercel dashboard
- Wait for propagation

**B) DNS Still Propagating**
- Can take up to 48 hours
- Use DNS checker: https://dnschecker.org
- Wait and retry script later

**C) SSL Certificate Not Issued**
- Vercel auto-issues SSL certificates
- Can take a few minutes after domain attachment
- Wait 10-15 minutes and retry

**D) Wrong DNS Records**
- Verify A/CNAME records match Vercel instructions exactly
- Check for typos
- Remove old DNS records that conflict

### Fix 3: Wrong Project

**Symptom:** Script aborts with "Project name mismatch"

**Fix:**
```powershell
cd "fordfofer-pitch\dashboard"
vercel link
# Select "dashboard" when prompted
```

---

## 📋 Verification Checklist

Before considering deployment "LIVE":

- [ ] Deployment succeeded (`.vercel.app` URL works)
- [ ] Domain attached in Vercel dashboard
- [ ] DNS records configured at registrar
- [ ] DNS propagated (check with DNS checker)
- [ ] SSL certificate issued (HTTPS works)
- [ ] Domain responds: `curl https://golocapo.com/api/health` returns 200
- [ ] Script shows "✅ DEPLOYMENT IS LIVE"

**If any item is unchecked, deployment is NOT LIVE.**

---

## 🎯 Quick Test

Run this to test domain manually:

```powershell
# Test domain health endpoint
curl https://golocapo.com/api/health

# Expected output:
# {"status":"ok","timestamp":"...","version":"..."}
```

**If this fails, domain is not LIVE yet.**

---

## 📞 Still Not Working?

1. **Check Vercel Dashboard:**
   - Project → Settings → Domains
   - Verify domain shows as "Valid" or "Configured"
   - Check for any error messages

2. **Check DNS:**
   - Use DNS checker: https://dnschecker.org
   - Search for `golocapo.com`
   - Verify records match Vercel instructions

3. **Check Domain Registrar:**
   - Log into domain registrar
   - Verify DNS records are correct
   - Check if domain is locked or has issues

4. **Wait:**
   - DNS propagation can take 24-48 hours
   - SSL certificate can take 10-15 minutes
   - Be patient and retry script later

---

**Remember:** Scripts cannot fix DNS. Domain setup is manual and one-time.

