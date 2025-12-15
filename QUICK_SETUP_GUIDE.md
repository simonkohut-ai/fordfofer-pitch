# ⚡ QUICK SETUP GUIDE - Easiest Way

**Goal:** Configure everything in 15 minutes

---

## 🎯 3 SIMPLE STEPS

### **STEP 1: Payment Methods (5 min)**

**Open:** `PAYMENT_CONFIG.js`

**Find and replace these 5 placeholders:**

```javascript
// 1. Bitcoin
bitcoin: {
    address: "YOUR_BTC_WALLET_ADDRESS",  // ← Replace this
    status: "pending"  // ← Change to "active"
}

// 2. Ethereum  
ethereum: {
    address: "YOUR_ETH_WALLET_ADDRESS",  // ← Replace this
    status: "pending"  // ← Change to "active"
}

// 3. USDT
usdt: {
    address: "YOUR_USDT_WALLET_ADDRESS",  // ← Replace this
    status: "pending"  // ← Change to "active"
}

// 4. Bank Transfer (if you want it)
bank_transfer: {
    iban: "YOUR_IBAN_HERE",  // ← Replace this
    status: "pending"  // ← Change to "active"
}

// 5. Others (Wise, Revolut, etc.) - Optional
```

**If you don't have addresses yet:**
- Skip for now (can add later)
- Or create wallets: MetaMask (ETH/USDT), Electrum (BTC)

---

### **STEP 2: Identity Replacement (10 min)**

**Option A: VS Code/Cursor (Easiest)**

1. Open VS Code/Cursor in this folder
2. Press `Ctrl+Shift+F` (Search in all files)
3. Click "Replace" tab
4. Find: `Šimon Kohút`
5. Replace: `Golo Čapo`
6. Click "Replace All" (or review each)
7. Repeat for:
   - `Simon Kohut` → `Golo Čapo`
   - `Goliáš Čapovič` → `Golo Čapo`
   - `simonkohut21@gmail.com` → `gcapovic.biz@proton.me`

**Option B: Manual (One by one)**

1. Run `REPLACE_IDENTITY.bat` to see all files
2. Open each file
3. Use `Ctrl+H` (Find & Replace)
4. Replace and save

---

### **STEP 3: Test (2 min)**

1. Run `START_MAKING_SALES.bat`
2. Check dashboard opens (password: `moneymachine25`)
3. Verify payment links work
4. Test AI agent: `ai-agent\RUN_AGENT_NOW.bat`

---

## 📋 MINIMUM SETUP (If You're in a Hurry)

**Just do these 3 things:**

1. ✅ **CONFIG.js** - Already updated with "Golo Čapo"
2. ✅ **Payment Methods** - Add at least Bitcoin (most popular)
3. ✅ **Identity** - Replace in main files (CONFIG.js, dashboard files)

**Everything else can wait!**

---

## 🚀 AUTOMATED OPTIONS

### **For Payment Methods:**
- If you have addresses: Fill `PAYMENT_CONFIG.js` (5 min)
- If you don't: Skip for now, add later

### **For Identity:**
- Use VS Code Find & Replace All (2 min)
- Or I can help you do it manually

---

## ✅ QUICK CHECKLIST

**Must Do:**
- [ ] Add at least 1 crypto address (BTC or ETH)
- [ ] Replace "Šimon Kohút" → "Golo Čapo" in main files
- [ ] Test dashboard works

**Can Wait:**
- [ ] Add all payment methods
- [ ] Replace in all 44 files
- [ ] Add bank transfer

---

## 💡 TIP: Start Small

**Do this first:**
1. Add Bitcoin address to `PAYMENT_CONFIG.js`
2. Replace identity in `CONFIG.js` (already done!)
3. Test dashboard

**Then add more later!**

---

**Ready? Open `PAYMENT_CONFIG.js` and start filling!** 🚀
