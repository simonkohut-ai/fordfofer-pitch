# 🚀 P2BA Console - Deployment Guide

## Prehľad

Tento návod vás prevedie cez kompletný proces nasadenia P2BA systému na Vercel.

## 📋 Predpoklady

- ✅ GitHub účet a repozitár
- ✅ Vercel účet (bezplatný)
- ✅ Všetky API kľúče pripravené
- ✅ Node.js nainštalovaný lokálne

---

## Krok A: Lokálna Príprava

### 1. Skontrolujte Git Status

```bash
cd fordfofer-pitch
git status
git add .
git commit -m "Production-ready P2BA system with real API integrations"
git push origin main
```

### 2. Lokálne Testovanie (Voliteľné)

```bash
# V p2ba-core
cd p2ba-core
npm install
npm run build

# V p2ba-console
cd ../p2ba-console
npm install
npm run dev
```

Otvorte http://localhost:3000 a otestujte základnú funkcionalitu.

---

## Krok B: Vercel Nastavenie

### Možnosť 1: Vercel Dashboard (Odporúčané)

1. **Prejdite na [vercel.com](https://vercel.com)**
2. **Kliknite na "Add New Project"**
3. **Importujte GitHub repozitár**
4. **Nastavte konfiguráciu:**
   - **Root Directory:** `p2ba-console`
   - **Framework Preset:** Next.js
   - **Build Command:** `cd ../p2ba-core && npm install && npm run build && cd ../p2ba-console && npm install && npm run build`
   - **Output Directory:** `.next`
   - **Install Command:** `npm install`

5. **Pridajte Environment Variables:**

   Kliknite na "Environment Variables" a pridajte všetky:

   ```
   # Email Service
   EMAIL_PROVIDER=mailgun
   MAILGUN_API_KEY=your_mailgun_api_key
   MAILGUN_DOMAIN=your_mailgun_domain
   
   # Image Generation
   OPENAI_API_KEY=your_openai_api_key
   
   # Social Media
   BUFFER_ACCESS_TOKEN=your_buffer_access_token
   BUFFER_INSTAGRAM_PROFILE_ID=your_instagram_profile_id
   BUFFER_TWITTER_PROFILE_ID=your_twitter_profile_id
   
   # E-commerce
   ECOMMERCE_PLATFORM=shopify
   SHOPIFY_SHOP_NAME=your_shop_name
   SHOPIFY_ACCESS_TOKEN=your_shopify_access_token
   
   # AI Content
   ANTHROPIC_API_KEY=your_anthropic_api_key
   
   # Email Settings
   EMAIL_FROM=noreply@chiarasworld.com
   EMAIL_FROM_NAME=Chiara's World
   ```

6. **Kliknite na "Deploy"**

### Možnosť 2: Vercel CLI

```bash
# 1. Inštalácia Vercel CLI
npm install -g vercel

# 2. Prihlásenie
vercel login

# 3. Prepojenie projektu
cd fordfofer-pitch/p2ba-console
vercel link

# 4. Pridanie environment premenných
vercel env add EMAIL_PROVIDER production
# Zadajte hodnotu: mailgun

vercel env add MAILGUN_API_KEY production
# Zadajte hodnotu: your_actual_api_key

vercel env add MAILGUN_DOMAIN production
# Zadajte hodnotu: your_domain

vercel env add OPENAI_API_KEY production
# Zadajte hodnotu: your_openai_key

vercel env add BUFFER_ACCESS_TOKEN production
# Zadajte hodnotu: your_buffer_token

vercel env add BUFFER_INSTAGRAM_PROFILE_ID production
# Zadajte hodnotu: your_profile_id

vercel env add BUFFER_TWITTER_PROFILE_ID production
# Zadajte hodnotu: your_profile_id

vercel env add SHOPIFY_SHOP_NAME production
# Zadajte hodnotu: your_shop_name

vercel env add SHOPIFY_ACCESS_TOKEN production
# Zadajte hodnotu: your_shopify_token

vercel env add ANTHROPIC_API_KEY production
# Zadajte hodnotu: your_anthropic_key

vercel env add EMAIL_FROM production
# Zadajte hodnotu: noreply@chiarasworld.com

vercel env add EMAIL_FROM_NAME production
# Zadajte hodnotu: Chiara's World

# 5. Nasadenie
vercel --prod
```

---

## Krok C: Overenie Nasadenia

### 1. Skontrolujte Build Logy

Po nasadení skontrolujte build logy v Vercel dashboard:
- ✅ Build úspešný
- ✅ Žiadne chyby
- ✅ Všetky environment premenné načítané

### 2. Testovanie API Endpointu

Otvorte: `https://your-project.vercel.app/api/p2ba-command`

Mali by ste vidieť 405 Method Not Allowed (normálne, endpoint očakáva POST).

### 3. Testovanie Front-endu

Otvorte: `https://your-project.vercel.app`

Mali by ste vidieť P2BA Console UI.

---

## Krok D: Prvý Reálny Test

### Testovací Príkaz

Vložte do P2BA Console:

```
Vytvor dropshipping obchod 'Eco-Style Home' pre udržateľné kuchynské doplnky. Spusť kampaň: vygeneruj 3 AI influencerov zameraných na ekologický životný štýl, ktorí propagujú tento nový obchod. Nasledujúci e-mail (s ponukou '20% zľava na prvý nákup') pošli 5000 kontaktom cez Mailgun. Všetky AI influencer posty automaticky naplánuj na Instagram a Twitter cez Buffer.
```

### Očakávané Výsledky

V real-time logoch by ste mali vidieť:

1. **📊 Analyzing prompt...**
2. **✅ Command type identified: dropshipping**
3. **📝 Creating/loading project...**
4. **✅ Project initialized: Eco-Style Home**
5. **📢 MarketingAgent: Generating 3 AI Influencer personas...**
6. **✅ 3 AI Influencer personas generated**
7. **🎨 MarketingAgent → AIInfluencerGenerator: Creating posts...**
8. **✅ 3 AI Influencer posts generated**
9. **📝 MarketingAgent: Generating email copy using Opus 4.5...**
10. **✅ Email copy generated with Opus 4.5**
11. **📧 IntegrationAgent: Dispatching email campaign to 5000 recipients...**
12. **✅ 5000 test emails sent successfully**
13. **📅 IntegrationAgent: Confirming social media scheduling...**
14. **✅ Social media scheduling confirmed: 3 posts scheduled**

### Finálny Súhrn

```
📊 Campaign Summary:
   • AI Influencers Generated: 3
   • Influencer Posts Created: 3
   • Emails Sent: 5000 / 5000
   • Social Media Posts Scheduled: 3
```

---

## 🔧 Troubleshooting

### Build Fails: "Cannot find module p2ba-core"

**Riešenie:**
- Skontrolujte, že build command obsahuje `cd ../p2ba-core && npm install && npm run build`
- Uistite sa, že p2ba-core je v správnom adresári

### API Route Returns 500 Error

**Riešenie:**
- Skontrolujte Vercel function logy
- Overte, že všetky environment premenné sú nastavené
- Skontrolujte, že API kľúče sú platné

### Real-time Updates Not Working

**Riešenie:**
- Skontrolujte, že Server-Sent Events sú podporované
- Overte network tab v browser dev tools
- Skontrolujte Vercel function timeout (nastavené na 60s)

### Emails Not Sending

**Riešenie:**
- Overte Mailgun API key a domain
- Skontrolujte Mailgun dashboard pre chyby
- Overte, že domain je verified v Mailgun

### Images Not Generating

**Riešenie:**
- Overte OpenAI API key a credits
- Skontrolujte OpenAI dashboard
- Overte rate limits

### Buffer Posts Not Scheduling

**Riešenie:**
- Overte Buffer access token
- Skontrolujte profile IDs
- Overte, že accounts sú connected v Buffer

---

## 📊 Monitoring

### Vercel Analytics

1. Prejdite na Vercel Dashboard
2. Vyberte projekt
3. Kliknite na "Analytics"
4. Sledujte:
   - Function invocations
   - Function duration
   - Errors

### API Usage Monitoring

- **Mailgun:** Dashboard → Analytics
- **OpenAI:** Dashboard → Usage
- **Buffer:** Dashboard → Analytics
- **Shopify:** Admin → Analytics

---

## ✅ Deployment Checklist

- [ ] Git repozitár je up-to-date
- [ ] Všetky environment premenné sú nastavené v Vercel
- [ ] Build je úspešný
- [ ] Front-end je dostupný
- [ ] API endpoint je funkčný
- [ ] Prvý test príkaz je úspešný
- [ ] Všetky služby fungujú (email, images, social, e-commerce)
- [ ] Monitoring je nastavený

---

## 🎉 Gratulujeme!

Váš P2BA systém je teraz plne nasadený a pripravený na produkciu!

**Next Steps:**
1. Spustite prvý reálny biznis
2. Monitorujte výkon
3. Optimalizujte podľa potreby
4. Škálujte podľa potreby

---

**Support:** Pre otázky skontrolujte `PRODUCTION_SETUP.md` alebo Vercel dokumentáciu.

