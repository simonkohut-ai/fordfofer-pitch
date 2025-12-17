# 🔍 Search Console Setup — Instant Indexing

## Google Search Console

### Step 1: Add Property
1. Go to: https://search.google.com/search-console
2. Click: "Add Property"
3. Select: "URL prefix"
4. Enter: `https://www.golocapo.com`
5. Click: "Continue"

### Step 2: Verify Ownership
**Option A: HTML Tag (Recommended)**
1. Copy the verification meta tag from Google
2. Add to `<head>` of `dashboard/index.html`:
   ```html
   <meta name="google-site-verification" content="YOUR_VERIFICATION_CODE" />
   ```
3. Commit + push
4. Click "Verify" in Google Search Console

**Option B: DNS Verification**
1. Add TXT record to DNS:
   - Name: `@` (or root domain)
   - Value: `google-site-verification=YOUR_CODE`
2. Wait 5-10 minutes
3. Click "Verify" in Google Search Console

### Step 3: Submit Sitemap
1. In Search Console → Sitemaps
2. Enter: `sitemap.xml`
3. Click: "Submit"
4. Wait for Google to crawl (usually 24-48 hours)

---

## Bing Webmaster Tools

### Step 1: Add Site
1. Go to: https://www.bing.com/webmasters
2. Click: "Add a site"
3. Enter: `https://www.golocapo.com`
4. Click: "Add"

### Step 2: Verify Ownership
**Option A: HTML Tag**
1. Copy verification meta tag from Bing
2. Add to `<head>` of `dashboard/index.html`
3. Commit + push
4. Click "Verify" in Bing

**Option B: XML File**
1. Download verification file from Bing
2. Upload to repo root as `BingSiteAuth.xml`
3. Commit + push
4. Click "Verify" in Bing

### Step 3: Submit Sitemap
1. In Bing → Sitemaps
2. Enter: `https://www.golocapo.com/sitemap.xml`
3. Click: "Submit"

---

## Expected Timeline

- **Verification:** Immediate (after DNS/HTML tag added)
- **Sitemap processing:** 24-48 hours
- **First indexing:** 1-7 days
- **Full indexing:** 1-2 weeks

---

## Monitoring

Check indexing status:
- Google: Search Console → Coverage
- Bing: Webmaster Tools → Sitemaps

