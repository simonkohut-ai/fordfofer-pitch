# 🚀 GitHub Private Repo Setup & Vercel Deploy

**Pre:** Golo  
**Email:** gcapovic.biz@proton.me

---

## 📋 Krok 1: Vytvorenie Private GitHub Repo

### Možnosť A: Cez GitHub Web UI (Najjednoduchšie)

1. **Otvor:** https://github.com/new
2. **Repository name:** `p2ba-chiaras-world` (alebo akýkoľvek názov)
3. **Description:** `Chiara's World - P2BA Autonomous AI Platform`
4. **Visibility:** ✅ **Private** (DÔLEŽITÉ!)
5. **NEPRIDÁVAJ:**
   - ❌ README
   - ❌ .gitignore
   - ❌ license
6. **Klikni:** "Create repository"

### Možnosť B: Cez GitHub CLI (Ak máš nainštalované)

```bash
gh repo create p2ba-chiaras-world --private --source=. --remote=origin-new
```

---

## 📋 Krok 2: Push Kódu na GitHub

Po vytvorení repo, spusti tieto príkazy:

```bash
cd fordfofer-pitch

# Pridaj nový remote (nahraď USERNAME a REPO_NAME)
git remote add origin-new https://github.com/USERNAME/p2ba-chiaras-world.git

# Alebo ak už máš origin, zmeň ho:
git remote set-url origin https://github.com/USERNAME/p2ba-chiaras-world.git

# Pushni všetko
git push -u origin main
```

**Ak GitHub vyžaduje autentifikáciu:**
- Použi **Personal Access Token** (nie heslo)
- Vytvor token: https://github.com/settings/tokens
- Scope: `repo` (full control)

---

## 📋 Krok 3: Vercel Deploy

### A. Cez Vercel Web UI

1. **Otvor:** https://vercel.com/new
2. **Import Git Repository:**
   - Vyber tvoj nový private repo
   - Klikni "Import"

3. **Project Settings:**
   - **Framework Preset:** Next.js
   - **Root Directory:** `p2ba-console`
   - **Build Command:** `cd p2ba-console && npm install && npm run build`
   - **Output Directory:** `.next`

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

### B. Cez Vercel CLI

```bash
# Inštalácia Vercel CLI
npm i -g vercel

# Login
vercel login

# Link project
cd p2ba-console
vercel link

# Pridaj environment variables
vercel env add EMAIL_FROM production
# (opakuj pre všetky premenné)

# Deploy
vercel --prod
```

---

## ✅ Checklist

- [ ] Private GitHub repo vytvorený
- [ ] Kód pushnutý na GitHub
- [ ] Vercel projekt vytvorený
- [ ] Environment variables pridané
- [ ] Deploy úspešný
- [ ] P2BA Console funguje na Vercel URL

---

## 🔒 Bezpečnosť

✅ **Private repo** - len ty máš prístup  
✅ **Environment variables** - v Vercel, nie v kóde  
✅ **.gitignore** - všetky citlivé súbory ignorované

---

## 🆘 Troubleshooting

### "Repository not found"
- Skontroluj, že repo je **private** a máš prístup
- Skontroluj remote URL: `git remote -v`

### "Build failed"
- Skontroluj, že `p2ba-core` je buildnutý: `cd p2ba-core && npm run build`
- Skontroluj environment variables v Vercel

### "Module not found"
- Skontroluj, že `p2ba-core/dist` existuje
- Skontroluj import paths v `p2ba-console`

---

**Status:** ✅ Ready for GitHub & Vercel

