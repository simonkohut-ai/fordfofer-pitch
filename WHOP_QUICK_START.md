# 🚀 WHOP SETUP - QUICK START WITH YOUR API KEY

**Your Whop API Key (Owner Permissions):**
```
REMOVED_WHOP_KEY
```

---

## ✅ STEP 1: CREATE WHOP ACCOUNT (5 min)

1. **Go to:** https://whop.com
2. **Sign up** with: simonkohut21@gmail.com
3. **Complete profile**

---

## ✅ STEP 2: CONNECT STRIPE (3 min)

1. **Whop Dashboard:** Settings → Payments
2. **Click:** "Connect Stripe"
3. **Complete Stripe onboarding**

---

## ✅ STEP 3: CREATE PRODUCTS (10 min)

**Product 1: AI Influencer - $150**
- Name: "AI Influencer - Complete Profile"
- Price: $150
- Type: Digital Product
- Description: [Use template from WHOP_SETUP_COMPLETE.md]

**Product 2: 3-Pack - $400**
- Name: "3 AI Influencers - Agency Pack"
- Price: $400

**Product 3: Monthly Subscription - $750**
- Name: "AI Influencer Membership"
- Price: $750/month
- Type: Subscription

---

## ✅ STEP 4: SET UP WEBHOOK (5 min)

1. **Whop Dashboard:** Settings → Developers → Webhooks
2. **Click:** "Create Webhook"
3. **Enter:**
   ```
   Webhook URL: [Get from n8n after importing workflow]
   
   Events:
   ✅ payment.succeeded
   ✅ subscription.created
   ✅ subscription.renewed
   
   Authentication: API Key
   API Key: REMOVED_WHOP_KEY
   ```
4. **Save**

---

## ✅ STEP 5: IMPORT N8N WORKFLOW (5 min)

1. **Go to:** https://app.n8n.cloud
2. **Import:** `whop-integration/Whop_n8n_Workflow.json`
3. **Add credentials:**
   - Telegram: `REMOVED_TELEGRAM_TOKEN`
   - OpenAI: Your API key
   - Gmail: Get app password
4. **Activate workflow** (green toggle)
5. **Copy webhook URL** from "Whop Webhook" node
6. **Paste into Whop** (Step 4 above)

---

## ✅ STEP 6: TEST (5 min)

1. **Whop:** Enable test mode
2. **Buy your own product** (test card: 4242 4242 4242 4242)
3. **Verify:**
   - ✅ n8n workflow triggered
   - ✅ Influencer generated
   - ✅ Email sent
   - ✅ Telegram notification received

---

## ✅ STEP 7: GO LIVE! (2 min)

1. **Disable test mode** in Whop
2. **Publish products**
3. **Share store link!**

---

## 💰 WHAT HAPPENS:

```
Customer buys ($150)
    ↓
Whop webhook → n8n (authenticated with API key)
    ↓
AI generates influencer (3-5 min)
    ↓
Email sent to customer
    ↓
Telegram: "💰 You earned $141!"
    ↓
YOU DO NOTHING! ✅
```

---

## 📊 PROFIT PER SALE:

```
Revenue:        $150.00
Whop fee (3%):   -$4.50
Stripe fee:      -$4.35
OpenAI cost:     -$0.05
────────────────────────
NET PROFIT:      $141.10 (94% margin!)
```

---

## 🎯 FILES YOU NEED:

- ✅ `whop-integration/Whop_n8n_Workflow.json` - Import to n8n
- ✅ `whop-integration/WHOP_SETUP_COMPLETE.md` - Full guide
- ✅ `whop-integration/WHOP_API_KEY_SETUP.md` - API key details
- ✅ This file - Quick start

---

## 🚀 READY TO START?

**Follow steps 1-7 above. Takes ~30 minutes total!**

**Questions? Check `WHOP_SETUP_COMPLETE.md` for detailed instructions!**

---

**Your API key is ready. Let's automate!** 💪🚀

