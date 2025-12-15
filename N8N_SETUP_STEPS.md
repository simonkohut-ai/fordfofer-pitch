# 🚀 N8N SETUP - STEP BY STEP

**Complete guide to set up your Telegram bot in n8n Cloud**

**Time:** 5-10 minutes  
**Result:** Fully automated AI influencer generator via Telegram!

---

## ✅ STEP 1: LOGIN TO N8N (30 sec)

1. **Go to:** https://app.n8n.cloud
2. **Login** with your account
3. **You should see your dashboard** with workflows

---

## ✅ STEP 2: IMPORT TELEGRAM WORKFLOW (1 min)

1. **Click:** "Add workflow" button (top right, or + icon)
2. **Click:** "Import from File" (or drag & drop)
3. **Navigate to:** 
   ```
   fordfofer-pitch/telegram-automation/Telegram_Instagram_Workflow.json
   ```
4. **Select the file** and click "Open" or "Import"
5. **✅ You should see:** A workflow with multiple nodes connected

**What you'll see:**
- Telegram Trigger node (left)
- If node (check for /create)
- Code nodes (parse data)
- OpenAI nodes (generate content)
- Send Email node
- Telegram nodes (send messages)

---

## ✅ STEP 3: ADD TELEGRAM CREDENTIAL (1 min)

1. **Click on any "Telegram" node** (there are 3 nodes - click any one)
   - Look for nodes named: "Telegram Trigger", "Send Confirmation", "Send Success"
2. **Click:** "Create New Credential" button
3. **Enter:**
   ```
   Access Token: REMOVED_TELEGRAM_TOKEN
   ```
4. **Click:** "Save" or "Test connection" (if available)
5. **✅ This credential automatically applies to ALL Telegram nodes!**

**Note:** If you see "Credential already exists", you can reuse it or create a new one.

---

## ✅ STEP 4: ADD OPENAI CREDENTIAL (1 min)

1. **Click on any "OpenAI" node** (there are 2 nodes - click any one)
   - Look for: "OpenAI - Generate Identity" or "OpenAI - Generate Content"
2. **Click:** "Create New Credential"
3. **Enter your OpenAI API key:**
   - Get it from: https://platform.openai.com/api-keys
   - Paste it in the "API Key" field
4. **Click:** "Save"
5. **✅ Both OpenAI nodes now have credentials!**

**Important:** Make sure you have credits in your OpenAI account!

---

## ✅ STEP 5: GET GMAIL APP PASSWORD (2 min)

**Do this FIRST before adding Gmail credential:**

1. **Go to:** https://myaccount.google.com/apppasswords
2. **Login:** simonkohut21@gmail.com
3. **If you see "App passwords aren't available":**
   - You need to enable 2-Step Verification first
   - Go to: https://myaccount.google.com/security
   - Enable 2-Step Verification
   - Then come back to app passwords
4. **Create app password:**
   - Select app: "Mail" or "Other (Custom name)" → type "n8n"
   - Select device: "Windows Computer"
   - Click "Generate"
5. **Copy the 16-character password** (looks like: `abcd efgh ijkl mnop`)
   - **IMPORTANT:** You'll need to remove spaces when using it!

---

## ✅ STEP 6: ADD GMAIL CREDENTIAL IN N8N (1 min)

1. **In n8n, click the "Send Email" node**
   - Look for the node that says "Send Email" or "Email"
2. **Click:** "Create New Credential"
3. **Enter these EXACT values:**
   ```
   User: simonkohut21@gmail.com
   Password: [paste the 16-char password - REMOVE SPACES!]
   Host: smtp.gmail.com
   Port: 587
   Secure: NO (make sure checkbox is UNCHECKED)
   ```
4. **Click:** "Save" or "Test connection"
5. **✅ Email is now configured!**

**Troubleshooting:**
- If it fails, make sure password has NO spaces
- Make sure "Secure" is unchecked (not SSL/TLS)
- Port should be 587 (not 465)

---

## ✅ STEP 7: VERIFY ALL NODES (1 min)

**Check each node has credentials:**

1. **Telegram nodes** (3 nodes):
   - Should show your credential name
   - If red/error, click and verify credential

2. **OpenAI nodes** (2 nodes):
   - Should show your credential name
   - If red/error, check API key is valid

3. **Send Email node:**
   - Should show your Gmail credential
   - If red/error, check Gmail settings

**All nodes should be GREEN or have no errors!**

---

## ✅ STEP 8: ACTIVATE WORKFLOW (30 sec)

1. **Look at the top right of n8n**
2. **Find the "Active" toggle** (switch/button)
   - It might say "Inactive" or show a gray toggle
3. **Click the toggle** → Should turn GREEN ✅
4. **You should see:** "Workflow activated" or similar message
5. **✅ Workflow is now LIVE and listening for Telegram messages!**

**Important:** The workflow must be ACTIVE (green) to receive messages!

---

## ✅ STEP 9: GET WEBHOOK URL (30 sec)

**For Telegram Trigger to work:**

1. **Click on the "Telegram Trigger" node** (first node on the left)
2. **Look for:** "Webhook URL" or "Production URL"
3. **Copy the URL** (looks like: `https://yourname.app.n8n.cloud/webhook/telegram-influencer`)
4. **This URL is automatically set up** - you don't need to configure Telegram separately!

**Note:** n8n Cloud automatically creates the webhook URL. Telegram will connect automatically when you activate the workflow.

---

## ✅ STEP 10: TEST IN TELEGRAM (1 min)

1. **Open Telegram app** (on phone or desktop)
2. **Search for your bot:**
   - Type the @username you created with BotFather
   - Or find it in your chats
3. **Click START** (if first time using the bot)
4. **Send this test command:**
   ```
   /create Sophia, 25, fitness influencer, blonde, athletic
   ```

---

## 🎉 WHAT SHOULD HAPPEN:

```
1. Bot immediately replies (within 1-2 seconds):
   "✅ Creating your AI influencer... This takes 2-3 minutes.
    💭 Prompt: Sophia, 25, fitness influencer, blonde, athletic"

2. Wait 2-3 minutes (n8n is working in background)

3. Check your email: simonkohut21@gmail.com
   → You'll receive detailed influencer profile with:
   - Complete identity
   - Instagram & TikTok profiles
   - Content calendar
   - First post captions
   - Hashtags

4. Bot sends final message:
   "✅ Done! Full details sent to email!"
```

**✅ If you see all of this → IT WORKS!**

---

## 🔧 TROUBLESHOOTING:

### **Workflow won't activate:**
- ✅ Check all nodes have credentials (no red errors)
- ✅ Check Telegram credential is correct
- ✅ Try saving the workflow first, then activate

### **Bot doesn't respond:**
- ✅ Check workflow is "Active" (green toggle)
- ✅ Check you clicked START in Telegram first
- ✅ Check Telegram credential token is correct
- ✅ Wait 10-20 seconds for first response

### **OpenAI error:**
- ✅ Check API key is valid at: https://platform.openai.com/api-keys
- ✅ Check you have credits: https://platform.openai.com/account/usage
- ✅ Try a simpler prompt
- ✅ Check node shows correct credential

### **No email received:**
- ✅ Check Gmail app password (no spaces!)
- ✅ Check spam folder
- ✅ Verify email: simonkohut21@gmail.com
- ✅ Check "Send Email" node has credential
- ✅ Check email address in node settings

### **Workflow shows error in n8n:**
- ✅ Click on the red/error node
- ✅ Check the error message
- ✅ Verify credentials are saved correctly
- ✅ Try "Execute Workflow" button to test manually

---

## 📊 QUICK CHECKLIST:

- [ ] Logged into n8n Cloud
- [ ] Workflow imported successfully
- [ ] Telegram credential added (token: 8559748978...)
- [ ] OpenAI credential added (your API key)
- [ ] Gmail app password created
- [ ] Gmail credential added in n8n
- [ ] All nodes show credentials (no red errors)
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
1. Test it a few times - Get comfortable
2. Generate real influencers - Build your portfolio
3. Then set up Whop - For automated online sales

**Or keep using Telegram for personal/manual clients!**

---

## 📱 N8N WORKFLOW OVERVIEW:

**What the workflow does:**

```
Telegram: /create [prompt]
    ↓
Telegram Trigger (receives message)
    ↓
If node (checks for /create command)
    ↓
Parse Command (extracts prompt)
    ↓
Send Confirmation (bot replies)
    ↓
OpenAI - Generate Identity (creates influencer)
    ↓
OpenAI - Generate Content (creates posts)
    ↓
Combine Data (packages everything)
    ↓
Send Email (sends to simonkohut21@gmail.com)
    ↓
Send Success (bot confirms completion)
    ↓
Done! ✅
```

---

## 🎯 PRO TIPS:

**1. Monitor Executions:**
- Click "Executions" tab in n8n to see workflow runs
- Check for errors or successful runs

**2. Edit Workflow:**
- Click any node to edit settings
- Change email address, prompts, etc.

**3. Test Manually:**
- Click "Execute Workflow" button
- Add test data to see how it works

**4. View Logs:**
- Click on any node to see input/output data
- Great for debugging!

---

## 💬 TELL ME WHEN DONE:

**After you test, say:**
- ✅ "It works!" → I'll help with next steps
- ❌ "Error: [describe]" → I'll help fix it
- ❓ "Question: [ask]" → I'll answer

**Or just say "done" when you've tested it!**

---

## ⏰ STATUS:

```
[████████░░] 80% - Setup in progress

✅ Workflow file ready
✅ All credentials collected
⏳ You're setting it up in n8n now...
⏳ Waiting for test results...
```

**Go ahead and set it up! I'm here if you need help!** 💪

---

## 📚 RELATED FILES:

- `TELEGRAM_SETUP_NOW.md` - Alternative quick guide
- `telegram-automation/COMPLETE_SETUP.md` - Detailed setup
- `COMMUNICATION.md` - Main communication hub

---

**Good luck! You got this!** 🚀

