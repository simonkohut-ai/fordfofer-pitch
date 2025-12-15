# 🚀 RÝCHLE META BUSINESS SETUP - 15 MINÚT

## ČO PRESNE BUDEŠ ROBIŤ:

1. **Vytvor Facebook App** (5 min)
2. **Získaj Access Token** (5 min)
3. **Vlož do config.js** (1 min)
4. **Spusti automation** (1 min)

---

## KROK 1: Vytvor Facebook App

### A) Choď na Facebook Developers
👉 https://developers.facebook.com/apps/create/

### B) Vyplň formulár:
- **App name:** FordFofer Auto
- **App contact email:** gcapovic.biz@proton.me
- **App type:** Business

### C) Klikni "Create App"

✅ **Máš App ID** (napr. `123456789`) - ulož si ho

---

## KROK 2: Nastav Instagram Graph API

### A) V tvojej app klikni "Add Product"

### B) Nájdi "Instagram" → klikni "Set Up"

### C) V ľavom menu klikni "Basic Settings"
- **App Domains:** `fordfofer.vercel.app`
- **Privacy Policy URL:** `https://fordfofer.vercel.app/about`

### D) Klikni "Save Changes"

---

## KROK 3: Získaj Access Token

### A) Choď na Graph API Explorer
👉 https://developers.facebook.com/tools/explorer/

### B) Vyber svoju app (FordFofer Auto)

### C) Klikni "Generate Access Token"

### D) Zaškrtni tieto permissions:
- ✅ `instagram_basic`
- ✅ `instagram_content_publish`
- ✅ `pages_show_list`

### E) Klikni "Generate Access Token"

### F) **KOPÍRUJ TOKEN** (začína `IGQWRN...` alebo `EAA...`)

---

## KROK 4: Získaj Instagram Business Account ID

### A) V Graph API Explorer zadaj:
```
GET /me/accounts
```

### B) Klikni "Submit"

### C) Nájdi v odpovedi `"id"` - napr:
```json
{
  "data": [
    {
      "id": "123456789012345",  ← TOTO
      "name": "Ford Fofer"
    }
  ]
}
```

### D) **KOPÍRUJ ID**

---

## KROK 5: Vlož do config.js

### Otvor: `fordfofer-pitch/automation/config.js`

### Vlož:
```javascript
META_ACCESS_TOKEN: 'tvoj_token_sem',
INSTAGRAM_BUSINESS_ACCOUNT_ID: 'tvoj_id_sem',
```

---

## KROK 6: Spusti automation

### Windows:
```bash
cd fordfofer-pitch/automation
node META_AUTO_POST.js
```

### Výsledok:
```
✅ Post vygenerovaný
✅ Post publikovaný na Instagram
✅ HOTOVO!
```

---

## ❓ ČO AK TO NEFUNGUJE?

### Chyba: "Invalid access token"
- Token vypršal → Vygeneruj nový v Graph API Explorer
- Skontroluj permissions (musia byť zaškrtnuté)

### Chyba: "Instagram account not found"
- Instagram musí byť **Business účet**
- Prepoj Instagram s Facebook Page

### Ako prepnúť na Business účet:
1. Instagram → Settings → Account
2. Klikni "Switch to Professional Account"
3. Vyber "Business"
4. Prepoj s Facebook stránkou

---

## ✅ PO TOMTO MÁŠ:

- 🤖 AI generuje posty
- 📤 Automaticky ich postuje
- 💯 100% bez tvojej pomoci

---

## 🎯 QUICK CHECKLIST:

- [ ] Facebook App vytvorená
- [ ] Instagram Graph API pridaná
- [ ] Access Token získaný
- [ ] Instagram Business Account ID získaný
- [ ] config.js aktualizovaný
- [ ] `node META_AUTO_POST.js` spustený

---

**Keď máš všetko ✅ = pustíme to!**

