# 🤖 TELEGRAM BOT SETUP - 10 MINÚT

Telegram bot ti každé 4 hodiny pošle vygenerovaný Instagram post.  
Otvoríš Telegram, skopíruješ, vložíš na Instagram (15 sekúnd práce).

---

## 🚀 KROK ZA KROKOM:

### KROK 1: Vytvor Telegram bot (3 minúty)

1. **Otvor Telegram** (desktop alebo mobil)
2. **Vyhľadaj:** `@BotFather`
3. **Napíš:** `/newbot`
4. **Zadaj meno bota:**  
   Príklad: `FordFofer Post Bot`
5. **Zadaj username bota:**  
   Príklad: `fordfofer_post_bot` (musí končiť na `_bot`)
6. **Skopíruj TOKEN:**  
   Bude vyzerať: `REMOVED_TELEGRAM_TOKEN`

✅ **Bot vytvorený!**

---

### KROK 2: Vlož TOKEN do config.js (1 minúta)

1. **Otvor:** `fordfofer-pitch/automation/config.js`
2. **Nájdi riadok:**
   ```javascript
   TELEGRAM_BOT_TOKEN: 'VLOZ_TOKEN_SEM',
   ```
3. **Vlož svoj token:**
   ```javascript
   TELEGRAM_BOT_TOKEN: 'REMOVED_TELEGRAM_TOKEN',
   ```
4. **Ulož súbor**

---

### KROK 3: Získaj Chat ID (2 minúty)

1. **V Telegrame** vyhľadaj svojho bota (napr. `@fordfofer_post_bot`)
2. **Napíš botovi:** `/start`
3. **Otvor terminál** a spusti:
   ```bash
   cd fordfofer-pitch/automation
   node TELEGRAM_AUTO_BOT.js
   ```
4. **Skopíruj Chat ID** z outputu (napr. `123456789`)
5. **Vlož do config.js:**
   ```javascript
   TELEGRAM_CHAT_ID: '123456789',
   ```
6. **Ulož súbor**

---

### KROK 4: Spusti bota (1 minúta)

1. **Spusti znova:**
   ```bash
   node TELEGRAM_AUTO_BOT.js
   ```
2. **Výsledok:**
   ```
   ✅ Prvý post vygenerovaný
   ✅ Post odoslaný na Telegram
   ⏰ Plánovač nastavený: Každé 4 hodiny
   ```

✅ **HOTOVO! Bot beží!**

---

## 📱 AKO TO FUNGUJE:

### Každé 4 hodiny:
1. Bot vygeneruje Instagram post
2. Pošle ti ho na Telegram (push notifikácia)
3. Otvoríš Telegram, skopíruješ text
4. Vložíš na Instagram (15 sekúnd)

---

## 💡 TIPS:

### Bot beží len keď je skript spustený
- Nechaj terminál otvorený v pozadí
- Alebo: Spusti na serveri/VPS (24/7)

### Zmena frekvencie postov
V `TELEGRAM_AUTO_BOT.js` zmeň:
```javascript
cron.schedule('0 */4 * * *', ...) // Každé 4 hodiny
```

Na:
```javascript
cron.schedule('0 */6 * * *', ...) // Každých 6 hodín
cron.schedule('0 9,15,21 * * *', ...) // O 9:00, 15:00, 21:00
```

---

## 🎯 QUICK CHECKLIST:

- [ ] Telegram bot vytvorený (@BotFather)
- [ ] TOKEN skopírovaný
- [ ] TOKEN vložený do config.js
- [ ] Botovi napísané /start
- [ ] Chat ID získané
- [ ] Chat ID vložené do config.js
- [ ] `node TELEGRAM_AUTO_BOT.js` spustené
- [ ] Prvý post doručený na Telegram

---

## ❓ PROBLÉMY?

### "❌ TELEGRAM_BOT_TOKEN nie je nastavený"
- Skontroluj config.js (riadok s TELEGRAM_BOT_TOKEN)
- Token musí byť v úvodzovkách

### "❌ Žiadne správy"
- Napíš svojmu botovi /start v Telegrame
- Počkaj 10 sekúnd a spusti skript znova

### "❌ Chyba pri odosielaní na Telegram"
- Skontroluj Chat ID (musí byť číslo)
- Skontroluj TOKEN (nesmie mať medzery)

---

**Keď máš všetko ✅ = máš 100% automatizáciu!** 🚀

