# 🚀 TELEGRAM BOT SETUP - DO THIS NOW

**Follow these steps in order. Takes 5 minutes total.**

---

## ✅ STEP 1: OPEN N8N & IMPORT (1 min)

1. **Go to:** https://app.n8n.cloud
2. **Login** to your account
3. **Click:** "Add workflow" button (top right)
4. **Click:** "Import from File"
5. **Navigate to:** `fordfofer-pitch/telegram-automation/Telegram_Instagram_Workflow.json`
6. **Click:** "Import"

**✅ You should see a workflow with nodes connected!**

---

## ✅ STEP 2: ADD TELEGRAM CREDENTIAL (1 min)

1. **Click on any "Telegram" node** (there are 3 - click any one)
2. **Click:** "Create New Credential" button
3. **Enter:**
   ```
   Access Token: REMOVED_TELEGRAM_TOKEN
   ```
4. **Click:** "Save"
5. **✅ This automatically applies to ALL Telegram nodes!**

---

## ✅ STEP 3: ADD OPENAI CREDENTIAL (1 min)

1. **Click on any "OpenAI" node** (there are 2 - click any one)
2. **Click:** "Create New Credential"
3. **Enter your OpenAI API key:**
   - Get it from: https://platform.openai.com/api-keys
   - Paste it in the field
4. **Click:** "Save"
5. **✅ Both OpenAI nodes now have credentials!**

---

## ✅ STEP 4: GET GMAIL APP PASSWORD (2 min)

**Do this FIRST:**

1. **Go to:** https://myaccount.google.com/apppasswords
2. **Login:** simonkohut21@gmail.com
3. **If asked, enable 2-Step Verification first** (if not already enabled)
4. **Select:**
   - App: "Mail" or "Other (Custom name)" → type "n8n"
   - Device: "Windows Computer"
5. **Click:** "Generate"
6. **Copy the 16-character password** (looks like: `abcd efgh ijkl mnop`)
   - **IMPORTANT:** Remove spaces when using it!

---

## ✅ STEP 5: ADD GMAIL CREDENTIAL IN N8N (1 min)

1. **In n8n, click the "Send Email" node**
2. **Click:** "Create New Credential"
3. **Enter these EXACT values:**
   ```
   User: simonkohut21@gmail.com
   Password: [paste the 16-char password - NO SPACES]
   Host: smtp.gmail.com
   Port: 587
   Secure: NO (make sure it's unchecked)
   ```
4. **Click:** "Save"
5. **✅ Email is now configured!**

---

## ✅ STEP 6: ACTIVATE WORKFLOW (30 sec)

1. **Look at the top right of n8n**
2. **Find the "Active" toggle** (switch)
3. **Click it** → Should turn GREEN ✅
4. **✅ Workflow is now LIVE and listening!**

---

## ✅ STEP 7: TEST IN TELEGRAM (30 sec)

1. **Open Telegram app** (on phone or desktop)
2. **Search for your bot:**
   - Type the @username you created with BotFather
   - Or find it in your chats
3. **Click START** (if first time)
4. **Send this command:**
   ```
   /create Sophia, 25, fitness influencer, blonde, athletic
   ```

---

## 🎉 WHAT SHOULD HAPPEN:

```
1. Bot immediately replies:
   "✅ Creating your AI influencer... This takes 2-3 minutes.
    💭 Prompt: Sophia, 25, fitness influencer, blonde, athletic"

2. Wait 2-3 minutes (n8n is working in background)

3. Check your email: simonkohut21@gmail.com
   → You'll receive detailed influencer profile

4. Bot sends final message:
   "✅ Done! Full details sent to email!"
```

**✅ If you see all of this → IT WORKS!**

---

## 🔧 IF SOMETHING GOES WRONG:

### **Bot doesn't respond:**
- ✅ Check workflow is "Active" (green toggle in n8n)
- ✅ Check you clicked START in Telegram first
- ✅ Check Telegram credential token is correct

### **OpenAI error:**
- ✅ Check API key is valid at: https://platform.openai.com/api-keys
- ✅ Check you have credits: https://platform.openai.com/account/usage
- ✅ Try a simpler prompt

### **No email received:**
- ✅ Check Gmail app password (no spaces!)
- ✅ Check spam folder
- ✅ Verify email: simonkohut21@gmail.com

### **Workflow shows error:**
- ✅ Click on the red node in n8n
- ✅ Check the error message
- ✅ Verify credentials are saved correctly

---

## 📊 QUICK CHECKLIST:

- [ ] Workflow imported to n8n
- [ ] Telegram credential added (token: 8559748978...)
- [ ] OpenAI credential added (your API key)
- [ ] Gmail app password created
- [ ] Gmail credential added in n8n
- [ ] Workflow activated (green toggle)
- [ ] Test command sent: `/create Sophia, 25, fitness influencer, blonde, athletic`
- [ ] Bot responded with confirmation
- [ ] Email received with influencer details
- [ ] Bot sent success message

---

## 💡 ONCE IT WORKS:

**You can now generate influencers anytime:**

```
/create Emma, 23, fashion blogger, brunette, elegant
/create Mia, 28, travel influencer, adventurous
/create Alex, 27, tech reviewer, professional
```

**Each generation:**
- ✅ Takes 2-3 minutes
- ✅ Costs ~$0.05
- ✅ Sends email with full details
- ✅ Fully automated!

---

## 🚀 NEXT STEPS:

**After Telegram works:**
1. Test it a few times
2. Generate real influencers
3. Then set up Whop for automated online sales

**Or keep using Telegram for personal/manual clients!**

---

## 💬 TELL ME WHEN DONE:

**After you test, say:**
- ✅ "It works!" → I'll help with next steps
- ❌ "Error: [describe]" → I'll help fix it
- ❓ "Question: [ask]" → I'll answer

**Good luck! You got this!** 💪🚀

