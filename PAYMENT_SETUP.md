# 💳 Payment Setup - CTO Checklist

Hey Golo! 👋

Ako CTO, tu je **kompletný prehľad** všetkých placeholders a čo treba nastaviť, aby **všetky platby išli na tvoj účet**.

---

## ✅ ČO JE UŽ NASTAVENÉ

### Landing Page (`landing-page/index.html`)
- ✅ Skrill email: `gcapovic.biz@proton.me` (už je tam)
- ✅ Všetky payment metódy zobrazujú Skrill email
- ✅ Copy button funguje

---

## ⚠️ PLACEHOLDERY KTORÉ TREBA VYPLNIŤ

### 1. **CONFIG.js** (Kritické!)

**Súbor:** `fordfofer-pitch/CONFIG.js`

**Čo zmeniť:**
```javascript
// ═══ PLATBY - SKRILL ═══
skrill_email: "gcapovic.biz@proton.me",  // ✅ Už máš správne

// ═══ PLATBY - PAYPAL ═══
paypal_me: "tvoj_paypal_me",  // ⚠️ ZMEŇ - napr. "paypal.me/golo"
paypal_email: "tvoj_paypal@email.com",  // ⚠️ ZMEŇ

// ═══ PLATBY - CRYPTO ═══
btc_address: "tvoja_btc_adresa",  // ⚠️ ZMEŇ
eth_address: "tvoja_eth_adresa",  // ⚠️ ZMEŇ
usdt_address: "tvoja_usdt_adresa",  // ⚠️ ZMEŇ
```

**Prečo:** Tento CONFIG.js sa používa v automation skriptoch, takže ak tam nie je správny Skrill email, automatizácia bude generovať zlé platby.

---

### 2. **P2BA Core - Payment Processing** (Nové!)

**Súbor:** `p2ba-core/src/agents/IntegrationAgent.ts`

**Problém:** Momentálne je tam placeholder `'stripe'` - treba to zmeniť na Skrill.

**Čo treba:**
- Vytvoriť `PaymentService` ktorý podporuje:
  - Skrill (primárne)
  - Stripe (pre karty - ale peniaze idú na Skrill)
  - PayPal (pre PayPal - ale peniaze idú na Skrill)
  - Crypto (BTC, ETH, USDT - ale peniaze idú na Skrill)
  - Bank Transfer (SEPA - ale peniaze idú na Skrill)

**Riešenie:** Vytvorím ti `PaymentService` ktorý bude:
1. Zobrazovať všetky payment metódy zákazníkom
2. Všetky platby smerovať na tvoj Skrill
3. Automaticky generovať payment links

---

### 3. **DropshipManager - Shopify Payment Setup**

**Súbor:** `p2ba-core/src/services/DropshipManager.ts`

**Problém:** Keď P2BA vytvorí Shopify store, treba nastaviť payment gateway na Skrill.

**Čo treba:**
- Pri vytváraní Shopify store nastaviť:
  - Payment provider: Skrill
  - Skrill email: `gcapovic.biz@proton.me`
  - Fallback: Stripe/PayPal (ale redirect na Skrill)

---

## 🎯 MOJE ODPORÚČANIE (Ako CTO)

### Riešenie 1: Skrill Merchant Account (Najlepšie)

**Čo to je:**
- Skrill ponúka merchant account kde môžeš prijímať platby cez API
- Zákazníci môžu platiť kartou, PayPal, crypto - všetko ide na tvoj Skrill
- Automatické notifikácie keď príde platba

**Ako to nastaviť:**
1. Zaregistruj sa na [Skrill Merchant](https://www.skrill.com/en/business/)
2. Získaj API credentials
3. Ja to integrujem do PaymentService

**Výhody:**
- ✅ Všetky platby automaticky na tvoj Skrill
- ✅ API notifikácie
- ✅ Automatické tracking
- ✅ Profesionálne riešenie

---

### Riešenie 2: Hybrid (Rýchle, ale manuálne)

**Čo to je:**
- Zobrazujeme všetky payment metódy
- Každá metóda má inštrukcie ako platiť na Skrill
- Ty manuálne kontroluješ Skrill a potvrdzuješ platby

**Ako to funguje:**
1. Zákazník klikne "Pay with Card"
2. Zobrazí sa: "Send €50 to gcapovic.biz@proton.me via Skrill"
3. Zákazník pošle peniaze
4. Ty kontroluješ Skrill a aktivuješ prístup

**Výhody:**
- ✅ Funguje hneď (žiadna registrácia)
- ✅ Žiadne poplatky
- ✅ Jednoduché

**Nevýhody:**
- ❌ Manuálna kontrola
- ❌ Žiadne automatické notifikácie

---

## 🚀 ČO UROBÍM TERAZ

1. **Aktualizujem CONFIG.js** - nastavím tvoj Skrill email všade
2. **Vytvorím PaymentService** - pre P2BA systém
3. **Aktualizujem IntegrationAgent** - aby používal Skrill namiesto Stripe
4. **Vytvorím payment integration** - pre Shopify stores

**Otázka pre teba:**
- Chceš **Skrill Merchant Account** (automatické, ale treba registráciu)?
- Alebo **Hybrid riešenie** (funguje hneď, ale manuálne)?

---

## 📋 CHECKLIST PRE TEBU

- [ ] Vyplň CONFIG.js (ak ešte nie je)
- [ ] Rozhodni sa: Skrill Merchant alebo Hybrid?
- [ ] Ak Skrill Merchant: Zaregistruj sa a pošli mi API credentials
- [ ] Ak Hybrid: Hotovo! (už to funguje)

---

**Daj mi vedieť čo preferuješ a ja to implementujem!** 🚀

