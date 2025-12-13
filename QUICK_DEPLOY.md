# 🚀 Quick Deploy Guide

**Pre:** Golo  
**Status:** ✅ Ready to Deploy

---

## 🎯 Rýchly Deploy (2 možnosti)

### Možnosť 1: Automatický Script (Odporúčané)

```bash
# Spusti:
DEPLOY_TO_VERCEL.bat
```

Script automaticky:
1. ✅ Pushne kód na GitHub
2. ✅ Nainštaluje Vercel CLI (ak treba)
3. ✅ Deployne na Vercel
4. ✅ Vytvorí production URL

**Čo potrebuješ:**
- GitHub repo URL (alebo vytvor nový)
- Vercel account (alebo sa zaregistruješ cez CLI)

---

### Možnosť 2: Manuálny Deploy

#### Krok 1: GitHub Repo

```powershell
cd "C:\Users\simik\Desktop\the most wanted!!!\fordfofer-pitch"

# Ak máš už repo:
git remote add origin https://github.com/USERNAME/p2ba-chiaras-world.git
git push -u origin main

# Alebo vytvor nový repo na: https://github.com/new
```

#### Krok 2: Vercel Deploy

**A. Cez Web UI:**
1. Otvor: https://vercel.com/new
2. Import: Vyber tvoj GitHub repo
3. Settings:
   - **Root Directory:** `p2ba-console`
   - **Build Command:** `cd ../p2ba-core && npm install && npm run build && cd ../p2ba-console && npm install && npm run build`
   - **Output Directory:** `.next`
4. Environment Variables: Pridaj z `DEPLOY_ENV_VARS.txt`
5. Deploy

**B. Cez CLI:**
```bash
# Inštalácia
npm install -g vercel

# Login
vercel login

# Link project
cd p2ba-console
vercel link

# Pridaj env vars (alebo cez web UI)
vercel env add EMAIL_FROM production
# (opakuj pre všetky)

# Deploy
vercel --prod
```

---

## 🔐 Environment Variables

Všetky premenné sú v: `DEPLOY_ENV_VARS.txt`

**Minimálne potrebné:**
- `SKRILL_EMAIL=gcapovic.biz@proton.me` ✅ (už máš)
- `EMAIL_FROM=gcapovic.biz@proton.me` ✅ (už máš)

**Pre plnú funkcionalitu pridaj:**
- Mailgun API (pre emaily)
- OpenAI API (pre obrázky)
- Buffer API (pre social media)
- Anthropic API (pre AI content)

**Poznámka:** Ak nemáš API kľúče, systém použije mock mode (funguje, ale bez reálnych API volaní).

---

## ✅ Po Deploy

1. **Otestuj P2BA Console:**
   - Otvor Vercel URL
   - Skús príkaz: `Create a test dropshipping store`

2. **Pridaj API kľúče:**
   - Vercel Dashboard → Settings → Environment Variables
   - Pridaj všetky z `DEPLOY_ENV_VARS.txt`

3. **Redeploy:**
   - Automaticky sa redeployne po push na GitHub
   - Alebo manuálne: `vercel --prod`

---

## 🆘 Troubleshooting

### "Build failed"
- Skontroluj, že `p2ba-core` je buildnutý
- Skontroluj environment variables

### "Module not found"
- Skontroluj, že `p2ba-core/dist` existuje
- Skontroluj import paths

### "API key invalid"
- Skontroluj environment variables v Vercel
- Skontroluj, že sú v správnom formáte

---

**Status:** ✅ Ready to Deploy

**Spusti:** `DEPLOY_TO_VERCEL.bat` 🚀

