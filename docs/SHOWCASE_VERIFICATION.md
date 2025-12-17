# MikoRK Showcase - Production Verification

**Deployed:** 2025-12-17  
**Status:** ✅ Ready for Production

---

## Files Changed

### Created/Updated
1. `showcase/mikork.html` - Slovak version (main, canonical)
2. `showcase/mikork/en.html` - English version
3. `docs/showcases/MIKORK_SHOWCASE_README.md` - Slovak README with long-term collaboration
4. `vercel.json` - Routes for SK and EN
5. `sitemap.xml` - Both URLs included
6. `dashboard/index.html` - Footer link "Showcase: MikoRK"

### Assets
- `assets/og/mikork-og.png` - OG image (1200x630)
- `assets/og/mikork-og.svg` - SVG source

---

## Final URLs

- **Slovak (canonical):** `https://www.golocapo.com/showcase/mikork`
- **English:** `https://www.golocapo.com/showcase/mikork/en`
- **OG Image:** `https://www.golocapo.com/assets/og/mikork-og.png`

---

## Verification Commands

```powershell
# 1. Check Slovak page (should return 200 OK)
curl.exe -I https://www.golocapo.com/showcase/mikork

# 2. Check English page (should return 200 OK)
curl.exe -I https://www.golocapo.com/showcase/mikork/en

# 3. Check OG image (should return 200 OK, Content-Type: image/png)
curl.exe -I https://www.golocapo.com/assets/og/mikork-og.png

# 4. Verify brand.css referenced
curl.exe https://www.golocapo.com/showcase/mikork | findstr /i "brand.css"

# 5. Verify OG tags present
curl.exe https://www.golocapo.com/showcase/mikork | findstr /i "og:image"
```

---

## Implementation Checklist

- ✅ Slovak page created with exact content (H1, hero text)
- ✅ English page created
- ✅ Language switcher on both pages (SK/EN buttons)
- ✅ OG image uses PNG (absolute URL: https://www.golocapo.com/assets/og/mikork-og.png)
- ✅ Canonical URL: Slovak page is canonical
- ✅ Hreflang alternates (sk, en, x-default)
- ✅ Brand CSS loaded (/assets/brand/brand.css)
- ✅ Routes configured in vercel.json
- ✅ Sitemap updated with both URLs
- ✅ Footer link added ("Showcase: MikoRK")
- ✅ README updated with long-term collaboration section (exact Slovak text)

---

## Next Steps

1. Wait for Vercel deployment (auto-deploys from main branch)
2. Run verification commands above
3. Test OG previews:
   - https://www.opengraph.xyz/url/https://www.golocapo.com/showcase/mikork
   - https://www.opengraph.xyz/url/https://www.golocapo.com/showcase/mikork/en
4. Confirm deployment belongs to golocapo.com project in Vercel dashboard

---

**Status:** ✅ Deployed to main branch, ready for production

