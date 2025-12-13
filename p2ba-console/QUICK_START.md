# ⚡ P2BA Console - Quick Start Deployment

## 🚀 3-Krokový Proces

### Krok 1: Git Push
```bash
cd fordfofer-pitch
git add .
git commit -m "Production-ready P2BA system"
git push origin main
```

### Krok 2: Vercel Setup

**A) Vercel Dashboard:**
1. Prejdite na [vercel.com](https://vercel.com)
2. "Add New Project" → Import GitHub repo
3. Root Directory: `p2ba-console`
4. Build Command: `cd ../p2ba-core && npm install && npm run build && cd ../p2ba-console && npm install && npm run build`
5. Pridajte Environment Variables (pozri nižšie)

**B) Alebo Vercel CLI:**
```bash
cd p2ba-console
vercel login
vercel link
vercel env add EMAIL_PROVIDER production
# ... (pridajte všetky env vars)
vercel --prod
```

### Krok 3: Test

Otvorte Vercel URL a vložte testovací príkaz!

---

## 📋 Environment Variables (Vercel Dashboard)

Pridajte tieto v Settings → Environment Variables:

```
EMAIL_PROVIDER=mailgun
MAILGUN_API_KEY=your_key
MAILGUN_DOMAIN=your_domain
OPENAI_API_KEY=your_key
BUFFER_ACCESS_TOKEN=your_token
BUFFER_INSTAGRAM_PROFILE_ID=your_id
BUFFER_TWITTER_PROFILE_ID=your_id
SHOPIFY_SHOP_NAME=your_shop
SHOPIFY_ACCESS_TOKEN=your_token
ANTHROPIC_API_KEY=your_key
EMAIL_FROM=noreply@chiarasworld.com
EMAIL_FROM_NAME=Chiara's World
```

---

## 🧪 Testovací Príkaz

```
Vytvor dropshipping obchod 'Eco-Style Home' pre udržateľné kuchynské doplnky. Spusť kampaň: vygeneruj 3 AI influencerov zameraných na ekologický životný štýl, ktorí propagujú tento nový obchod. Nasledujúci e-mail (s ponukou '20% zľava na prvý nákup') pošli 5000 kontaktom cez Mailgun. Všetky AI influencer posty automaticky naplánuj na Instagram a Twitter cez Buffer.
```

---

## ✅ Hotovo!

Váš P2BA systém je teraz nasadený a pripravený na prvý reálny biznis! 🎉

**Pre detailnejšie informácie:** Pozrite `DEPLOYMENT_GUIDE.md`

