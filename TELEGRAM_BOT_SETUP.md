# 🤖 Telegram Bot Auto-Send Setup

**Use your Telegram bot to send sales messages automatically!**

---

## 🚀 QUICK SETUP (5 minutes):

### **Step 1: Install Node.js (if not installed)**

1. **Download:** https://nodejs.org/
2. **Install** (default settings)
3. **Verify:** Open terminal, type `node --version`

---

### **Step 2: Install Dependencies**

1. **Open terminal** in the `fordfofer-pitch` folder
2. **Run:**
   ```bash
   npm install axios
   ```

---

### **Step 3: Get Chat IDs**

**Option A: Via Script (Easiest)**
1. **Send a message to your bot** (any message)
2. **Run:**
   ```bash
   node telegram-auto-send.js --get-ids
   ```
3. **Copy the chat IDs** shown

**Option B: Via Browser**
1. **Visit:**
   ```
   https://api.telegram.org/botREMOVED_TELEGRAM_TOKEN/getUpdates
   ```
2. **Find "chat":{"id":** in the response
3. **Copy the numbers** (chat IDs)

**Option C: Manual (For Friends)**
1. **Ask each friend to message your bot**
2. **Then run:** `node telegram-auto-send.js --get-ids`
3. **Their chat ID will appear**

---

### **Step 4: Edit the Script**

1. **Open:** `telegram-auto-send.js`
2. **Find:** `const CHAT_IDS = [`
3. **Add chat IDs:**
   ```javascript
   const CHAT_IDS = [
       123456789,  // Friend 1
       987654321,  // Friend 2
       555555555,  // Friend 3
       // Add more...
   ];
   ```
4. **Find:** `const WHOP_LINK = '[YOUR_WHOP_STORE_LINK]';`
5. **Replace with your actual Whop link:**
   ```javascript
   const WHOP_LINK = 'https://your-whop-store-link.com';
   ```

---

### **Step 5: Run the Script**

```bash
node telegram-auto-send.js
```

**It will:**
- Send personalized messages to all chat IDs
- Wait 1 second between messages (to avoid rate limits)
- Show success/error for each message

---

## 🎯 ALTERNATIVE: Manual Method (Easier)

**If the script is too complicated, just:**

1. **Open Telegram**
2. **Message friends manually** (copy/paste from OPTIMIZED_SALES_MESSAGES.md)
3. **Faster setup, same results!**

---

## 📊 WHAT THE SCRIPT DOES:

- ✅ Sends personalized messages to multiple contacts
- ✅ Uses your Telegram bot (looks professional)
- ✅ Automates the process
- ✅ Tracks success/failures

---

## 🆘 TROUBLESHOOTING:

**Error: "Cannot find module 'axios'"**
- Run: `npm install axios`

**Error: "chat not found"**
- Make sure the person messaged your bot first
- Get their chat ID again

**Error: "rate limit"**
- Script already waits 1 second between messages
- If still errors, increase wait time in script

**No chat IDs found**
- Send a message to your bot first
- Then run `--get-ids` command

---

## 💡 PRO TIPS:

1. **Test with 1-2 friends first** before sending to all
2. **Personalize names** in the script for better results
3. **Check Whop dashboard** after sending to track sales
4. **Follow up manually** with people who respond

---

## 🚀 QUICK START (Simplest):

**Just use the manual method:**
1. Open Telegram
2. Copy message from OPTIMIZED_SALES_MESSAGES.md
3. Send to 20 friends manually
4. Get sales!

**The script is optional - manual works great too!**

---

**Your bot token is already set up in the script!** Just add chat IDs and your Whop link! 🚀

