# 📝 Placeholder Filling Tutorial

**Quick guide to fill in any placeholders in your codebase**

---

## ✅ YES/NO QUESTIONS - Answer These First:

### **1. Configuration & Setup:**
- [ ] Do you want to add PayPal payment option? (Yes/No)
- [ ] Do you want to add crypto payment options (BTC/ETH/USDT)? (Yes/No)
- [ ] Do you want to customize your business name in messages? (Yes/No)
- [ ] Do you want to add your personal email for customer support? (Yes/No)

### **2. Marketing & Branding:**
- [ ] Do you want to add your social media links? (Yes/No)
- [ ] Do you want to customize the dashboard logo/name? (Yes/No)
- [ ] Do you want to add a custom domain name? (Yes/No)

### **3. Automation:**
- [ ] Do you want to set up automated email responses? (Yes/No)
- [ ] Do you want to connect more Telegram groups? (Yes/No)
- [ ] Do you want to add more marketing platforms? (Yes/No)

---

## 🎯 HOW TO FILL PLACEHOLDERS - Step by Step

### **Step 1: Find Placeholders**

**Method A: Search in Files**
1. Open any file in your code editor
2. Press `Ctrl+F` (or `Cmd+F` on Mac)
3. Search for: `YOUR_`, `PLACEHOLDER`, `TODO`, `REPLACE`, `CHANGE`

**Method B: Common Placeholder Patterns**
- `YOUR_NAME` → Your name
- `YOUR_EMAIL` → Your email
- `YOUR_API_KEY` → Your API key
- `YOUR_URL` → Your website/store URL
- `tvoj_` → Slovak placeholders (your)
- `sk-` → API keys (usually OpenAI)

---

### **Step 2: Edit the File**

**For Text Files (.md, .txt, .bat):**
1. Open file in Notepad or any text editor
2. Find the placeholder (use Ctrl+F)
3. Replace with your actual value
4. Save the file

**For Code Files (.js, .html, .css):**
1. Open file in code editor (VS Code, Cursor, etc.)
2. Find the placeholder
3. Replace with your actual value
4. Make sure syntax is correct (quotes, commas, etc.)
5. Save the file

**For Config Files (.env, .config):**
1. Open file in text editor
2. Find the line with placeholder
3. Replace after the `=` sign
4. Don't add spaces around `=`
5. Save the file

---

### **Step 3: Common Placeholder Examples**

#### **Example 1: Email Placeholder**
```javascript
// BEFORE:
email: "YOUR_EMAIL_HERE"

// AFTER:
email: "yourname@email.com"
```

#### **Example 2: URL Placeholder**
```javascript
// BEFORE:
storeUrl: "https://whop.com/YOUR_STORE"

// AFTER:
storeUrl: "https://whop.com/golo-capo"
```

#### **Example 3: API Key Placeholder**
```javascript
// BEFORE:
apiKey: "sk-YOUR_KEY_HERE"

// AFTER:
apiKey: "REMOVED_OPENAI_KEY"
```

#### **Example 4: Name Placeholder**
```javascript
// BEFORE:
name: "YOUR_NAME"

// AFTER:
name: "Your Business Name"
```

---

### **Step 4: Verify Your Changes**

**After filling placeholders:**
1. **Check syntax** - Make sure quotes match, commas are correct
2. **Test the file** - Run it if it's a script, open it if it's HTML
3. **Check for errors** - Look for red underlines or error messages

---

## 🔍 WHERE TO FIND PLACEHOLDERS

### **Most Common Files:**

1. **`ai-agent/.env`** - API keys and configuration
2. **`dashboard/dashboard.js`** - Dashboard settings
3. **`CONFIG.js`** - Payment and business configuration
4. **`QUICK_SALES_SCRIPT.md`** - Marketing messages
5. **Batch files (.bat)** - Paths and URLs

---

## ⚠️ IMPORTANT RULES

### **DO:**
✅ Keep quotes around text values: `"your value"`
✅ Keep quotes around URLs: `"https://example.com"`
✅ Don't add spaces around `=` in config files
✅ Save files after editing
✅ Test after making changes

### **DON'T:**
❌ Remove quotes from strings
❌ Add extra spaces in API keys
❌ Change file structure/formatting
❌ Delete important code

---

## 🚀 QUICK FILL CHECKLIST

**Before you start:**
- [ ] Open file in editor
- [ ] Use Ctrl+F to search
- [ ] Find all placeholders
- [ ] Have your values ready
- [ ] Replace one by one
- [ ] Save file
- [ ] Test if needed

---

## 💡 TIPS

1. **Search globally:** Use `Ctrl+Shift+F` in VS Code/Cursor to search all files
2. **Backup first:** Copy file before editing (just in case)
3. **One at a time:** Replace placeholders one by one to avoid mistakes
4. **Check examples:** Look at already-filled values for format reference

---

**Ready to fill placeholders? Answer the yes/no questions first!** 🚀
