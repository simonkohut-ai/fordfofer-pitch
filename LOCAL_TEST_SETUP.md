# 🧪 Lokálny Test Setup - P2BA System

**Pre:** Golo  
**Email:** gcapovic.biz@proton.me  
**Status:** Ready for Local Testing

---

## ✅ ČO JE NASTAVENÉ

### Všetky Email Adresy
- ✅ Skrill: `gcapovic.biz@proton.me`
- ✅ PayPal: `gcapovic.biz@proton.me`
- ✅ Kontakt: `gcapovic.biz@proton.me`
- ✅ Email Service From: `gcapovic.biz@proton.me`
- ✅ Payment Service: `gcapovic.biz@proton.me`

---

## 🚀 Lokálny Test - Krok za Krokom

### Krok 1: Build P2BA Core

```bash
cd fordfofer-pitch/p2ba-core
npm install
npm run build
```

**Očakávaný výstup:**
```
✅ p2ba-core built successfully
✅ dist/ folder created
```

---

### Krok 2: Setup Environment Variables

Vytvor súbor `p2ba-core/.env`:

```env
# Email Service
EMAIL_PROVIDER=mailgun
MAILGUN_API_KEY=your_mailgun_key
MAILGUN_DOMAIN=your_domain
EMAIL_FROM=gcapovic.biz@proton.me
EMAIL_FROM_NAME=Chiara's World

# Payment
SKRILL_EMAIL=gcapovic.biz@proton.me

# Image Generation
OPENAI_API_KEY=your_openai_key

# Social Media
BUFFER_ACCESS_TOKEN=your_buffer_token

# E-commerce
ECOMMERCE_PLATFORM=shopify
SHOPIFY_SHOP_NAME=your_shop
SHOPIFY_ACCESS_TOKEN=your_token

# AI Content
ANTHROPIC_API_KEY=your_anthropic_key
```

**Poznámka:** Pre lokálny test môžeš nechať prázdne - systém použije mock mode.

---

### Krok 3: Start P2BA Console

```bash
cd fordfofer-pitch/p2ba-console
npm install
npm run dev
```

**Očakávaný výstup:**
```
✅ Ready on http://localhost:3000
```

---

### Krok 4: Otvor P2BA Console

1. Otvor prehliadač: http://localhost:3000
2. Mala by sa zobraziť P2BA Console UI
3. Skús jednoduchý príkaz:

```
Create a test dropshipping store for eco-friendly products
```

---

### Krok 5: Sleduj Real-time Logy

V konzole by si mal vidieť:
- 📊 Analyzing prompt...
- ✅ Command type identified
- 📝 Creating/loading project...
- 📢 MarketingAgent working...
- 🔌 IntegrationAgent working...
- 💻 CodeAgent working...

---

## 🧪 Test Scenáre

### Test 1: Jednoduchý Dropshipping Store

**Príkaz:**
```
Create a dropshipping store for eco-friendly products
```

**Očakávané:**
- ✅ Store vytvorený
- ✅ Projekt inicializovaný
- ✅ Marketing strategy vygenerovaná

---

### Test 2: Influencer Campaign (Bez Emailov)

**Príkaz:**
```
Create 3 AI influencers for sustainable products
```

**Očakávané:**
- ✅ 3 influencer personas
- ✅ 3 influencer posts
- ✅ Obrázky vygenerované (mock alebo DALL-E)

---

### Test 3: Full Campaign (S Emailami)

**Príkaz:**
```
Vytvor dropshipping obchod 'Eco-Style Home' pre udržateľné kuchynské doplnky. Spusť kampaň: vygeneruj 3 AI influencerov zameraných na ekologický životný štýl, ktorí propagujú tento nový obchod. Nasledujúci e-mail (s ponukou '20% zľava na prvý nákup') pošli 10 kontaktom cez Mailgun. Všetky AI influencer posty automaticky naplánuj na Instagram a Twitter cez Buffer.
```

**Poznámka:** Zmenil som 5000 → 10 pre lokálny test (rýchlejšie).

**Očakávané:**
- ✅ Store vytvorený
- ✅ 3 influencer personas
- ✅ 3 influencer posts
- ✅ Email copy vygenerovaný
- ✅ 10 emailov odoslaných (ak máš Mailgun API)
- ✅ Social media scheduling

---

## 🔍 Troubleshooting

### "Cannot find module p2ba-core"

**Riešenie:**
```bash
cd p2ba-core
npm run build
```

### "P2BA Core not found" v API route

**Riešenie:**
- Skontroluj, že `p2ba-core/dist` existuje
- Skontroluj, že build bol úspešný

### Real-time updates nefungujú

**Riešenie:**
- Skontroluj browser console (F12)
- Skontroluj network tab
- Skontroluj server logs

### Emaily sa neodosielajú

**Riešenie:**
- Ak nemáš Mailgun API key, systém použije mock mode
- V logoch uvidíš: "EmailService initialized in TEST/SANDBOX mode"

---

## 📊 Čo Sledovať

### V Browser Console (F12)
- SSE connection status
- Real-time log messages
- Errors

### V Terminal (p2ba-console)
- Next.js dev server logs
- API route logs

### V Terminal (p2ba-core - ak spúšťaš samostatne)
- BusinessAgentManager logs
- Agent workflow logs
- Service logs

---

## ✅ Lokálny Test Checklist

- [ ] p2ba-core built (`npm run build`)
- [ ] p2ba-console dependencies installed
- [ ] Environment variables set (alebo mock mode)
- [ ] Dev server running (localhost:3000)
- [ ] P2BA Console UI zobrazuje sa
- [ ] Test príkaz funguje
- [ ] Real-time logy sa zobrazujú
- [ ] Všetky služby používajú `gcapovic.biz@proton.me`

---

## 🎯 Po Úspešnom Lokálnom Teste

1. **Commit changes:**
   ```bash
   git add .
   git commit -m "config: Updated all emails to gcapovic.biz@proton.me"
   git push
   ```

2. **Deploy na Vercel:**
   - Postupuj podľa `DEPLOYMENT_GUIDE.md`
   - Pridaj environment variables do Vercel

3. **Test na produkcii:**
   - Otvor Vercel URL
   - Spusti rovnaký test príkaz

---

**Status:** ✅ **Ready for Local Testing**

**Všetky emaily:** `gcapovic.biz@proton.me`

**Daj mi vedieť ako to ide!** 🚀

