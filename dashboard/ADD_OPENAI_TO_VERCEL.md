# 🔑 Add OpenAI Key to Vercel

**After deploying dashboard, add OpenAI key to Vercel environment variables**

---

## 🚀 QUICK SETUP

### **Step 1: Get Your OpenAI Key**
- You already have it in Cursor ✅
- Also check: `ai-agent/.env` file

### **Step 2: Add to Vercel**

1. **Go to Vercel Dashboard:**
   - https://vercel.com/dashboard
   - Find your project: `ai-studio-dashboard`

2. **Go to Settings:**
   - Click project → Settings
   - Click "Environment Variables"

3. **Add Variable:**
   - **Name:** `OPENAI_API_KEY`
   - **Value:** Your OpenAI API key
   - **Environment:** Production, Preview, Development (select all)
   - Click "Save"

4. **Redeploy:**
   - Go to "Deployments"
   - Click "..." on latest deployment
   - Click "Redeploy"

---

## ✅ VERIFICATION

After redeploy, test in dashboard:
1. Open your dashboard URL
2. Password: `moneymachine25`
3. Click "AI Chat"
4. Send: `"Test OpenAI connection"`
5. Should get response from AI agent

---

## 🔒 SECURITY

- ✅ Key stored securely in Vercel
- ✅ Not exposed in code
- ✅ Only used by serverless functions
- ✅ Environment-specific (production/preview)

---

**Your OpenAI key is now connected to the dashboard!** 🚀
