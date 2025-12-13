# 🔑 JAK ZÍSKAT BUFFER ACCESS TOKEN - PRESNÝ NÁVOD

## ✅ ČO POTREBUJEŠ:
- Buffer účet (gcapovic.biz@proton.me) ✅
- 5 minút času

---

## 📋 KROK ZA KROKOM:

### KROK 1: Otvor Buffer Developers (30 sekúnd)

1. **Choď na:** https://buffer.com/developers/apps
2. **Prihlás sa** do Buffer účtu (gcapovic.biz@proton.me)
3. **Uvidíš:** Zoznam tvojich aplikácií (pravdepodobne prázdny)

**✅ Si na Buffer Developers stránke**

---

### KROK 2: Vytvor novú aplikáciu (2 minúty)

1. **Klikni na:** "Register Your App" alebo "Create App" (modré tlačidlo)
2. **Vyplň formulár:**
   - **App Name:** `FordFofer Auto Marketing`
   - **Description:** `Automated marketing posts for FordFofer AI trading system`
   - **Website:** `https://fordfofer.vercel.app`
   - **Callback URL:** `https://fordfofer.vercel.app` (môže byť aj iná URL)
3. **Klikni:** "Register App" alebo "Create"

**✅ Aplikácia je vytvorená!**

---

### KROK 3: Získaj Access Token (2 minúty)

1. **Po vytvorení aplikácie** uvidíš:
   - **Client ID**
   - **Client Secret**
   - **Access Token** ⬅️ **TO POTREBUJEŠ!**

2. **Ak nevidíš Access Token:**
   - Klikni na svoju aplikáciu
   - Klikni na "Generate Access Token" alebo "Get Token"
   - **Skopíruj token** (vyzerá: `1/xxxxx/xxxxxxxxxxxxxxx`)

**✅ Máš Access Token!**

---

### KROK 4: Vlož token do config.js (30 sekúnd)

1. **Otvor súbor:** `fordfofer-pitch/automation/config.js`
2. **Nájdi:** `BUFFER_ACCESS_TOKEN: 'VLOZ_SEM'`
3. **Zmeň na:** `BUFFER_ACCESS_TOKEN: 'TVOJ_TOKEN_TU'`
4. **Ulož súbor**

**✅ Token je nastavený!**

---

## ⚠️ AK MÁŠ PROBLÉMY:

### Problém 1: "Register Your App" tlačidlo nevidím
**Riešenie:**
- Skús: https://buffer.com/developers/apps/create
- Alebo choď na: https://buffer.com → Settings → Developers

### Problém 2: "Access Token" nie je viditeľný
**Riešenie:**
- Klikni na svoju aplikáciu v zozname
- Hľadaj tlačidlo "Generate Token" alebo "Get Access Token"
- Alebo choď na: https://buffer.com/developers/apps → Klikni na app → "Access Token"

### Problém 3: Token nefunguje
**Riešenie:**
- Skontroluj, či si skopíroval celý token (niekedy je dlhý)
- Skús vygenerovať nový token
- Skontroluj, či máš správne pripojené profily v Buffer

---

## 🔗 RÝCHLE ODKAZY:

- **Buffer Developers:** https://buffer.com/developers/apps
- **Vytvoriť App:** https://buffer.com/developers/apps/create
- **Buffer Dashboard:** https://buffer.com/app

---

## ✅ PO TOMTO:

**Keď máš token v `config.js`:**
1. ✅ Spusti: `START_BUFFER_EXTENSION.bat`
2. ✅ Alebo: `START_FULL_AUTO.bat`
3. ✅ Systém automaticky postuje na Buffer!

---

## 🎯 CHECKLIST:

- [ ] Buffer účet prihlásený
- [ ] Aplikácia vytvorená
- [ ] Access Token skopírovaný
- [ ] Token vložený do `config.js`
- [ ] Profily pripojené v Buffer (Instagram, TikTok, atď.)

---

## 🚀 PO TOMTO = 100% AUTO POSTING!

**Len získaj token a vlož ho do config.js - potom už všetko beží automaticky!**

---

**Máš otázky? Pýtaj sa!**

