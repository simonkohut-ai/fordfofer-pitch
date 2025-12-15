# ❌ OpenAI Quota Error - Fix Guide

**Error:** `429 You exceeded your current quota, please check your plan and billing details.`

---

## 🔍 What This Means

Your OpenAI API key doesn't have enough credits/quota to make API calls. This is a **billing issue**, not a code problem.

---

## ✅ Solution 1: Add Credits to OpenAI Account (Recommended)

### **Step 1: Check Your OpenAI Account**
1. Go to: https://platform.openai.com/account/billing
2. Sign in with your OpenAI account
3. Check your **Usage & Billing** section

### **Step 2: Add Payment Method**
1. Go to: https://platform.openai.com/account/billing/payment-methods
2. Add a credit card or payment method
3. Set up **auto-recharge** (optional but recommended)

### **Step 3: Add Credits**
1. Go to: https://platform.openai.com/account/billing/credits
2. Add credits (minimum usually $5-10)
3. Wait a few minutes for activation

### **Step 4: Verify**
- Check your account balance
- Try running the agent again

---

## ✅ Solution 2: Use a Different API Key

If you have another OpenAI account with credits:

1. Get the new API key from: https://platform.openai.com/api-keys
2. Update `.env` file:
   ```
   OPENAI_API_KEY=sk-your-new-key-here
   ```
3. Save and run the agent again

---

## ✅ Solution 3: Use Free Alternative (Temporary)

While you fix billing, you can use **local content generation** (no AI):

1. The agent will generate basic templates
2. You can manually edit them
3. Post manually to platforms

---

## 💰 OpenAI Pricing (GPT-4o-mini)

- **Input:** $0.15 per 1M tokens
- **Output:** $0.60 per 1M tokens
- **Typical campaign:** ~$0.01-0.05 per run

**Minimum to start:** $5-10 credit

---

## 🚀 Quick Fix Steps

1. **Add payment method** → https://platform.openai.com/account/billing/payment-methods
2. **Add $10 credits** → https://platform.openai.com/account/billing/credits
3. **Wait 2-3 minutes** for activation
4. **Run agent again** → `RUN_AGENT_NOW.bat`

---

## ⚠️ Important Notes

- **Service account keys** (like `sk-svcacct-...`) may have different billing
- Check if the service account has its own billing/quota
- You may need to add credits to the **service account**, not your personal account

---

## 🔧 Alternative: Use Personal API Key

If service account has issues:

1. Create personal API key: https://platform.openai.com/api-keys
2. Update `.env` with personal key
3. Add credits to personal account

---

**Once you add credits, the agent will work!** 🚀
