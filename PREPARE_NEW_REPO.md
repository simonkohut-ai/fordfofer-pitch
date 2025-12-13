# 🚀 Príprava na Nový Private GitHub Repo

**Status:** ✅ Kód pripravený  
**Problém:** GitHub push protection detekoval API kľúče v histórii

---

## 📋 Riešenie: Nový Private Repo

Keďže starý repo má API kľúče v histórii, vytvoríme **nový čistý private repo**.

---

## ✅ Krok 1: Vytvor Nový Private GitHub Repo

1. **Otvor:** https://github.com/new
2. **Repository name:** `p2ba-chiaras-world` (alebo akýkoľvek názov)
3. **Description:** `Chiara's World - P2BA Autonomous AI Platform`
4. **Visibility:** ✅ **Private** (DÔLEŽITÉ!)
5. **NEPRIDÁVAJ:**
   - ❌ README
   - ❌ .gitignore
   - ❌ license
6. **Klikni:** "Create repository"

---

## ✅ Krok 2: Push do Nového Repo

Po vytvorení repo, spusti tieto príkazy v PowerShell:

```powershell
cd "C:\Users\simik\Desktop\the most wanted!!!\fordfofer-pitch"

# Pridaj nový remote (nahraď USERNAME a REPO_NAME)
git remote add origin-new https://github.com/USERNAME/p2ba-chiaras-world.git

# Alebo ak chceš nahradiť starý origin:
git remote set-url origin https://github.com/USERNAME/p2ba-chiaras-world.git

# Pushni všetko
git push -u origin main
```

**Ak GitHub vyžaduje autentifikáciu:**
- Použi **Personal Access Token** (nie heslo)
- Vytvor token: https://github.com/settings/tokens
- Scope: `repo` (full control)

---

## ✅ Krok 3: Vercel Deploy

### A. Cez Vercel Web UI

1. **Otvor:** https://vercel.com/new
2. **Import Git Repository:**
   - Vyber tvoj nový private repo `p2ba-chiaras-world`
   - Klikni "Import"

3. **Project Settings:**
   - **Framework Preset:** Next.js
   - **Root Directory:** `p2ba-console`
   - **Build Command:** `cd ../p2ba-core && npm install && npm run build && cd ../p2ba-console && npm install && npm run build`
   - **Output Directory:** `.next`
   - **Install Command:** `cd p2ba-console && npm install`

4. **Environment Variables:**
   Pridaj tieto premenné (Settings → Environment Variables):

   ```
   # Email
   EMAIL_PROVIDER=mailgun
   MAILGUN_API_KEY=your_key
   MAILGUN_DOMAIN=your_domain
   EMAIL_FROM=gcapovic.biz@proton.me
   EMAIL_FROM_NAME=Chiara's World

   # Payment
   SKRILL_EMAIL=gcapovic.biz@proton.me

   # Image Generation
   OPENAI_API_KEY=your_key

   # Social Media
   BUFFER_ACCESS_TOKEN=your_token

   # E-commerce
   ECOMMERCE_PLATFORM=shopify
   SHOPIFY_SHOP_NAME=your_shop
   SHOPIFY_ACCESS_TOKEN=your_token

   # AI Content
   ANTHROPIC_API_KEY=your_key
   ```

5. **Deploy:**
   - Klikni "Deploy"
   - Počkaj na build
   - Získaj URL (napr. `p2ba-console.vercel.app`)

---

## 🔒 Bezpečnosť

✅ **Private repo** - len ty máš prístup  
✅ **Environment variables** - v Vercel, nie v kóde  
✅ **.gitignore** - všetky citlivé súbory ignorované  
✅ **API kľúče** - odstránené z kódu, len v env vars

---

## 📝 Poznámka

Starý repo (`themostwanted`) má API kľúče v histórii, preto vytvárame nový čistý repo.

---

**Status:** ✅ Ready for New Private Repo

