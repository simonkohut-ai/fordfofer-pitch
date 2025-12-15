# 💬 TELEGRAM BOT SETUP - STEP BY STEP

**You chose: A - Telegram Bot First!** ✅  
**Time:** 5 minutes  
**Result:** Working bot that generates influencers!

---

## 🎯 WHAT WE'RE DOING:

Set up your Telegram bot so you can type:
```
/create Sophia, 25, fitness influencer, blonde
```

And get a complete AI influencer in 3 minutes! 🚀

---

## ✅ STEP 1: IMPORT WORKFLOW (1 min)

**Do this now:**

1. **Open n8n Cloud:**
   - Go to: https://app.n8n.cloud
   - Login to your account

2. **Import Workflow:**
   - Click "Add workflow" (or ⋮ menu → Import)
   - Select "Import from File"
   - Navigate to: `telegram-automation/Telegram_Instagram_Workflow.json`
   - Click "Import"

**✅ Done!** You should see the workflow with nodes.

---

## ✅ STEP 2: ADD TELEGRAM CREDENTIAL (1 min)

**In n8n:**

1. **Click any "Telegram" node** (there are 3 of them)
2. **Click "Create New Credential"**
3. **Enter:**
   ```
   Access Token: REMOVED_TELEGRAM_TOKEN
   ```
4. **Click "Save"**
5. **This applies to ALL Telegram nodes automatically!** ✅

---

## ✅ STEP 3: ADD OPENAI CREDENTIAL (1 min)

**In n8n:**

1. **Click any "OpenAI" node** (there are 2 of them)
2. **Click "Create New Credential"**
3. **Enter your OpenAI API key:**
   ```
   [Paste your OpenAI API key here]
   ```
4. **Click "Save"**

**✅ Done!** Both OpenAI nodes now have credentials.

---

## ✅ STEP 4: ADD GMAIL CREDENTIAL (2 min)

**First, get Gmail App Password:**

1. **Go to:** https://myaccount.google.com/apppasswords
2. **Login:** simonkohut21@gmail.com
3. **Create app password:**
   - App: "n8n" (or "Mail")
   - Device: "Windows Computer"
   - Click "Generate"
4. **Copy the 16-character password** (looks like: `abcd efgh ijkl mnop`)

**Then in n8n:**

1. **Click "Send Email" node**
2. **Click "Create New Credential"**
3. **Enter:**
   ```
   User: simonkohut21@gmail.com
   Password: [paste 16-char app password - no spaces]
   Host: smtp.gmail.com
   Port: 587
   Secure: NO (uncheck if checked)
   ```
4. **Click "Save"**

**✅ Done!** Email will now work.

---

## ✅ STEP 5: ACTIVATE WORKFLOW (30 sec)

**In n8n:**

1. **Click "Active" toggle** (top right)
2. **Should turn GREEN** ✅
3. **Workflow is now LIVE and listening!** 🎉

---

## ✅ STEP 6: TEST IT! (30 sec)

**In Telegram:**

1. **Open Telegram app**
2. **Search for your bot** (the @username you created with BotFather)
3. **Click START**
4. **Send command:**
   ```
   /create Sophia, 25, fitness influencer, blonde, athletic
   ```

**What Should Happen:**

```
Bot replies: "✅ Creating your AI influencer... This takes 2-3 minutes."
[Wait 2-3 minutes]
Bot replies: "✅ Done! Full details sent to email!"
[Check your email: simonkohut21@gmail.com]
```

**✅ If you see this → IT WORKS!**

---

## 🎉 SUCCESS CHECKLIST:

- [ ] Workflow imported to n8n
- [ ] Telegram credential added
- [ ] OpenAI credential added
- [ ] Gmail credential added
- [ ] Workflow activated (green toggle)
- [ ] Test command sent in Telegram
- [ ] Bot responded
- [ ] Email received with influencer details

---

## 🔧 TROUBLESHOOTING:

### **Bot doesn't respond:**
- ✅ Check workflow is "Active" (green)
- ✅ Check Telegram credential is correct
- ✅ Make sure you clicked START in Telegram first

### **OpenAI error:**
- ✅ Check API key is valid
- ✅ Check you have credits: https://platform.openai.com/account/usage
- ✅ Try simpler prompt

### **No email received:**
- ✅ Check Gmail app password is correct (no spaces)
- ✅ Check spam folder
- ✅ Verify email in workflow: simonkohut21@gmail.com

---

## 💡 ONCE IT WORKS:

**You can now:**
- ✅ Generate influencers from Telegram anytime
- ✅ Get email with full details
- ✅ Use for your own projects
- ✅ Test before setting up Whop

**Example commands:**
```
/create Emma, 23, fashion blogger, brunette, elegant
/create Mia, 28, travel influencer, adventurous
/create Alex, 27, tech reviewer, professional
```

---

## 🚀 NEXT STEPS (After Telegram Works):

**Once Telegram bot is working, you can:**

1. **Test it a few times** - Get comfortable
2. **Generate real influencers** - Build your portfolio
3. **Then add Whop** - For automated online sales

**Or keep using Telegram for personal/manual clients!**

---

## 📊 WHAT YOU GET PER GENERATION:

**Email includes:**
- ✅ Complete influencer identity
- ✅ Instagram username & bio
- ✅ TikTok username & bio
- ✅ 7-day content calendar
- ✅ First post captions
- ✅ Hashtags
- ✅ Image description

**Cost:** ~$0.05 per influencer  
**Time:** 3-5 minutes  
**Your time:** 0 minutes (automated!)

---

## 💬 TELL ME:

**After you test it, let me know:**
- ✅ "It works!" → I'll help with next steps
- ❌ "Error: [describe]" → I'll help fix it
- ❓ "Question: [ask]" → I'll answer

**Or just say "done" when you've tested it!**

---

## ⏰ STATUS:

```
[████████░░] 80% - Setup in progress

✅ Workflow file ready
✅ Credentials collected:
   - Telegram Bot: ✅
   - OpenAI: ✅
   - Gmail: ✅
   - Whop API Key: ✅ (Owner permissions!)
     REMOVED_WHOP_KEY
⏳ You're setting up Telegram now...
✅ Whop ready to set up next!
```

**Go ahead and set it up! I'm here if you need help!** 💪

---

## 🎁 BONUS: WHOP API KEY READY!

**Your Whop API key is saved and ready!**

**After Telegram works, you can:**
1. Set up Whop store (30 min)
2. Use your API key for webhook authentication
3. Start automated sales!

**Quick start:** Check `WHOP_QUICK_START.md` for step-by-step!

---

**Reload this file after each step to see updates!** 🔄

