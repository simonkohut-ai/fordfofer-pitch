# Quick UI Fix - Vercel Static Deployment

## SETTINGS TO CHANGE

**Path:** Dashboard → dashboard → Settings → Build and Deployment

| Setting | Action | Value |
|---------|--------|-------|
| Framework Preset | Change dropdown | **Other** |
| Build Command | Enable Override | **(empty)** |
| Output Directory | Enable Override | **`.`** |
| Install Command | Enable Override | **(empty)** |
| Root Directory | Check/Set | **`.`** or blank |

**After changing:** Click **Save** (or auto-saves)

---

## TRIGGER DEPLOYMENT

**Path:** Dashboard → dashboard → Deployments

1. Click **⋯** on latest deployment
2. Click **Redeploy**
3. Wait for "Ready" + "Production" badge

---

## VERIFY

**Browser:** https://www.golocapo.com → Should load (no 500)

**CLI:**
```powershell
curl.exe -I https://www.golocapo.com/
# Expected: HTTP/2 200
```

---

## IF STILL 500

1. **Disable Protection:** Settings → Deployment Protection → Disable password
2. **Check Logs:** Deployments → Latest → Runtime Logs → Look for `server.js` errors
3. **Verify Settings:** Framework Preset should be "Other" (not Express)

---

**Full guide:** See `VERCEL_UI_STATIC_FIX.md`

