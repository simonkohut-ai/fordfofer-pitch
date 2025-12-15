# 🔑 WHOP API KEY SETUP - Quick Guide

**Your Whop API Key (Owner Permissions):**
```
REMOVED_WHOP_KEY
```

---

## ✅ WHERE TO USE THIS API KEY:

### **1. In Whop Dashboard (Webhook Setup):**

**When creating webhook:**
1. Go to: Settings → Developers → Webhooks
2. Click "Create Webhook"
3. **Authentication:** Select "API Key"
4. **Paste your API key:** `REMOVED_WHOP_KEY`
5. Save webhook

**This ensures:**
- ✅ Only Whop can send webhooks to your n8n
- ✅ Webhook requests are authenticated
- ✅ Security for your automation

---

### **2. In n8n Workflow (Optional Verification):**

**If you want to verify webhook authenticity in n8n:**

1. **Open your Whop workflow in n8n**
2. **Click the "Whop Webhook" node**
3. **Add authentication:**
   - In "Options" → "Authentication"
   - Select "Header Auth" or "Custom Header"
   - Header Name: `Authorization` or `X-Whop-API-Key`
   - Header Value: `REMOVED_WHOP_KEY`

**OR use a Code node to verify:**

```javascript
// Add after "Whop Webhook" node
const apiKey = $input.item.json.headers['x-whop-api-key'] || 
               $input.item.json.headers['authorization']?.replace('Bearer ', '');

const expectedKey = 'REMOVED_WHOP_KEY';

if (apiKey !== expectedKey) {
  throw new Error('Invalid Whop API key');
}

return $input.item.json;
```

---

### **3. Making Whop API Calls (Advanced):**

**If you want to fetch order details or customer info:**

**In n8n, add HTTP Request node:**
```
Method: GET
URL: https://api.whop.com/api/v2/payments/{payment_id}
Headers:
  Authorization: Bearer REMOVED_WHOP_KEY
```

**Available endpoints:**
- `GET /api/v2/payments` - List payments
- `GET /api/v2/payments/{id}` - Get payment details
- `GET /api/v2/products` - List products
- `GET /api/v2/memberships` - List memberships

**Full API docs:** https://dev.whop.com

---

## 🔒 SECURITY NOTES:

**✅ DO:**
- ✅ Keep API key secret
- ✅ Use in webhook authentication
- ✅ Store in n8n credentials (not hardcoded)
- ✅ Rotate if compromised

**❌ DON'T:**
- ❌ Share in public repos
- ❌ Hardcode in client-side code
- ❌ Share with unauthorized users
- ❌ Commit to git

---

## 📋 QUICK CHECKLIST:

- [ ] API key saved securely
- [ ] Added to Whop webhook authentication
- [ ] (Optional) Added verification in n8n workflow
- [ ] Tested webhook with API key
- [ ] Verified webhook works correctly

---

## 🧪 TESTING:

**Test webhook with API key:**

1. **Create test purchase in Whop**
2. **Check n8n workflow execution**
3. **Verify webhook received:**
   - ✅ Check headers for API key
   - ✅ Verify authentication passed
   - ✅ Confirm workflow triggered

**If webhook fails:**
- ✅ Check API key is correct
- ✅ Verify key has owner permissions
- ✅ Check webhook URL is correct
- ✅ Ensure workflow is active

---

## 💡 TIPS:

**Owner Permissions = Full Access:**
- ✅ Can read all payments
- ✅ Can read all products
- ✅ Can read all memberships
- ✅ Can manage webhooks
- ✅ Can access analytics

**Perfect for automation!** 🚀

---

## 🚀 NEXT STEPS:

1. **Add API key to Whop webhook** (Step 4 in main setup)
2. **Test webhook** (Step 6 in main setup)
3. **Go live!** (Step 7 in main setup)

**Your automation is now secure and ready!** ✅

---

**Questions? Check `WHOP_SETUP_COMPLETE.md` for full setup guide!**

