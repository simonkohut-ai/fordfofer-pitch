# ⚙️ SETUP - Nahraď Placeholdery

## KROK 1: Otvor CONFIG.js a vyplň svoje údaje

```javascript
// ═══ PLATBY - SKRILL ═══
skrill_email: "tvoj_skrill@email.com",  // ← ZMEŇ TOTO

// ═══ PLATBY - CRYPTO ═══
btc_address: "tvoja_btc_adresa",
eth_address: "tvoja_eth_adresa",
```

---

## KROK 2: Aktualizuj Landing Page

Otvor `landing-page/index.html` a nájdi + nahraď:

| Nájdi | Nahraď |
|-------|--------|
| `YOUR_SKRILL_EMAIL@email.com` | Tvoj Skrill email |
| `YOUR_BTC_ADDRESS` | Tvoja BTC adresa |
| `YOUR_ETH_ADDRESS` | Tvoja ETH adresa |
| `YOUR_USDT_ADDRESS` | Tvoja USDT adresa |
| `paypal.me/fordfofer` | Tvoj PayPal.me link |

---

## KROK 3: Re-deploy

```bash
cd fordfofer-pitch
git add -A
git commit -m "config: Added payment details"
git push
npx vercel --prod --yes
```

---

## 🔒 BEZPEČNOSŤ

⚠️ **NIKDY** nezdieľaj:
- API kľúče
- Privátne krypto kľúče
- Heslá

✅ **Môžeš zdieľať:**
- Skrill email (na prijímanie platieb)
- PayPal.me link
- Krypto wallet adresy (verejné)



