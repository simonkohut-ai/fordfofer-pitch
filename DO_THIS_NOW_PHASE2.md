# 🚀 DO THIS NOW - PHASE 2

**Time:** 10 minutes  
**Goal:** Link Whop → n8n → Get Sales!

---

## ✅ STEP 1: IMPORT WORKFLOW (2 min)

### **In n8n:**

1. **Open:** https://app.n8n.cloud
2. **Click:** "Add workflow" (top right)
3. **Click:** "Import from File"
4. **Select:** `whop-integration/Whop_n8n_Workflow.json`
5. **Click:** "Import"

✅ **Done!** Workflow imported.

---

## ✅ STEP 2: ADD CREDENTIALS (3 min)

### **In the imported workflow:**

1. **Click each node that needs credentials:**

   **Telegram Node:**
   - Click "Notify You (Telegram)" node
   - Click "Credential to connect with"
   - Select: "Telegram Bot" (or create new)
   - Access Token: `REMOVED_TELEGRAM_TOKEN`
   - Save

   **OpenAI Nodes:**
   - Click any "OpenAI" node
   - Add your OpenAI API key
   - Save

   **Gmail Node:**
   - Click "Send Email" node
   - Add Gmail credentials
   - User: `simonkohut21@gmail.com`
   - App Password: [Your Gmail app password]
   - Save

✅ **Done!** All credentials added.

---

## ✅ STEP 3: ACTIVATE & GET WEBHOOK URL (1 min)

1. **Click:** "Active" toggle (top right) → **GREEN** ✅
2. **Click:** "Whop Webhook" node
3. **Copy:** The webhook URL
   - Looks like: `https://yourname.app.n8n.cloud/webhook/whop-payment`

✅ **Done!** Webhook URL copied.

---

## ✅ STEP 4: ADD WEBHOOK TO WHOP (2 min)

### **In Whop:**

1. **Open:** https://whop.com
2. **Go to:** Settings → Developers → Webhooks
3. **Click:** "Create Webhook"
4. **Fill in:**
   ```
   Webhook URL: [Paste from n8n - the URL you just copied]
   
   Events to Subscribe:
   ✅ payment.succeeded
   ✅ subscription.created
   ✅ subscription.renewed
   
   Authentication: API Key
   API Key: REMOVED_WHOP_KEY
   ```
5. **Click:** "Save"

✅ **Done!** Webhook connected!

---

## ✅ STEP 5: TEST (2 min)

### **Test 1: Telegram Bot**

1. **Open:** Telegram
2. **Send:** `/create test influencer, 25, fitness`
3. **Wait:** 3-5 minutes
4. **Check:** Email for influencer details
5. **✅ If works → Continue**

### **Test 2: Whop Purchase (Test Mode)**

1. **In Whop:** Enable test mode
2. **Buy your own product**
3. **Card:** `4242 4242 4242 4242`
4. **Should:** Trigger workflow, generate influencer, send email
5. **✅ If works → GO LIVE!**

---

## 🚀 STEP 6: GO LIVE (1 min)

1. **In Whop:**
   - Disable test mode
   - Make product public
   - Copy store URL

2. **Launch Marketing:**
   - Run: `EXECUTE_MARKETING.bat`
   - Or use: `QUICK_SALES_SCRIPT.md`

---

## 💰 EXPECTED RESULTS:

**Today:** 3-5 sales = $225-375  
**This Week:** 10-20 sales = $750-1,500

---

## 🆘 TROUBLESHOOTING:

**Webhook not working?**
- Check n8n workflow is ACTIVE (green toggle)
- Check webhook URL is correct in Whop
- Check API key is correct

**No email received?**
- Check Gmail credentials in n8n
- Check spam folder
- Check n8n execution logs

**Workflow not triggering?**
- Check Whop webhook is saved
- Check n8n workflow is active
- Test with test purchase first

---

## ✅ QUICK CHECKLIST:

- [ ] Workflow imported to n8n
- [ ] Credentials added (Telegram, OpenAI, Gmail)
- [ ] Workflow activated (green toggle)
- [ ] Webhook URL copied from n8n
- [ ] Webhook added to Whop
- [ ] Telegram bot tested
- [ ] Whop purchase tested
- [ ] Test mode disabled
- [ ] Product public
- [ ] Marketing launched

---

**YOU'RE READY! GO GET SALES!** 💰🚀

