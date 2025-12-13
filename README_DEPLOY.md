# 🚀 Deploy Instructions

**Pre:** Golo  
**Email:** gcapovic.biz@proton.me

---

## ✅ Čo Potrebuješ

1. **GitHub Private Repo URL** (alebo vytvor nový)
2. **Vercel Account** (alebo sa zaregistruješ cez CLI)

---

## 🎯 Rýchly Deploy

### Spusti Script:

```bash
DEPLOY_TO_VERCEL.bat
```

Script sa ťa spýta na:
- GitHub repo URL
- Vercel login (ak nemáš CLI)
- Environment Variables (alebo ich pridáš manuálne)

---

## 📋 Manuálny Deploy

### 1. GitHub Repo

```powershell
cd "C:\Users\simik\Desktop\the most wanted!!!\fordfofer-pitch"
git remote add origin https://github.com/USERNAME/p2ba-chiaras-world.git
git push -u origin main
```

### 2. Vercel Deploy

**Web UI:**
1. https://vercel.com/new
2. Import GitHub repo
3. Root Directory: `p2ba-console`
4. Pridaj Environment Variables (z `DEPLOY_ENV_VARS.txt`)
5. Deploy

**CLI:**
```bash
npm install -g vercel
vercel login
cd p2ba-console
vercel link
vercel --prod
```

---

## 🔐 Environment Variables

Pozri: `DEPLOY_ENV_VARS.txt`

**Minimálne:**
- `SKRILL_EMAIL=gcapovic.biz@proton.me` ✅
- `EMAIL_FROM=gcapovic.biz@proton.me` ✅

**Pre plnú funkcionalitu:**
- Mailgun, OpenAI, Buffer, Anthropic API kľúče

---

**Status:** ✅ Ready

