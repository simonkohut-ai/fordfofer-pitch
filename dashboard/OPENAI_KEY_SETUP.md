# 🔑 OpenAI API Key Setup Guide

**Quick guide to set up and test your OpenAI API key**

---

## Step 1: Create API Key (You're Doing This Now)

1. Go to: https://platform.openai.com/api-keys
2. Click: **"+ Create new secret key"**
3. **Name it:** `golocapo-production` (or any name you prefer)
4. **Copy the key** immediately (you won't see it again!)
   - Format: `sk-proj-...` or `sk-...`

---

## Step 2: Set in Vercel (Recommended)

### Option A: Vercel Dashboard (Easiest)

1. Go to: [Vercel Dashboard](https://vercel.com/dashboard)
2. Select: Your `dashboard` project
3. Navigate to: **Settings** → **Environment Variables**
4. **Add Variable:**
   - **Name:** `OPENAI_API_KEY`
   - **Value:** Paste your API key (starts with `sk-`)
   - **Environment:** ✅ Production, ✅ Preview, ✅ Development (select all)
5. **Click:** "Save"
6. **Redeploy:** Go to Deployments → Latest → "..." → "Redeploy"

### Option B: Vercel CLI

```powershell
cd "C:\Users\simik\Desktop\the most wanted!!!\fordfofer-pitch\dashboard"
vercel env add OPENAI_API_KEY
# When prompted, paste your API key
# Select: Production, Preview, Development (all)
```

---

## Step 3: Test It Works

### Quick Test Script

Run this to verify your key works:

```powershell
cd "C:\Users\simik\Desktop\the most wanted!!!\fordfofer-pitch\dashboard"
.\TEST_OPENAI_KEY.ps1
```

Or test manually:

```powershell
$apiKey = "sk-your-key-here"
$body = @{
    model = "gpt-4"
    messages = @(
        @{
            role = "user"
            content = "Say 'Hello from OpenAI' in one sentence"
        }
    )
} | ConvertTo-Json -Depth 10

$response = Invoke-RestMethod -Uri "https://api.openai.com/v1/chat/completions" `
    -Method Post `
    -Headers @{
        Authorization = "Bearer $apiKey"
        "Content-Type" = "application/json"
    } `
    -Body $body

Write-Host $response.choices[0].message.content
```

**Expected:** "Hello from OpenAI" or similar response

---

## Step 4: What You Can Do Now

### 1. Generate Content Automatically

```powershell
.\GENERATE_CONTENT.ps1 -Prompt "Create a marketing headline for AI marketing studio"
```

### 2. Use in Your Code

Your API endpoints can now use OpenAI:

```javascript
// In your API files
const openaiKey = process.env.OPENAI_API_KEY;
// Use it to generate content, analyze data, etc.
```

### 3. Auto-Generate Marketing Copy

I can create scripts that:
- Generate blog posts
- Create social media captions
- Write product descriptions
- Analyze customer feedback

---

## 🔐 Security Best Practices

### ✅ DO:
- ✅ Store key in Vercel environment variables
- ✅ Use in server-side code only (API routes)
- ✅ Rotate keys periodically
- ✅ Monitor usage in OpenAI dashboard

### ❌ DON'T:
- ❌ Commit API key to git
- ❌ Expose in client-side JavaScript
- ❌ Share publicly
- ❌ Hardcode in files

---

## 📊 Monitor Usage

1. Go to: https://platform.openai.com/usage
2. Check: API usage, costs, rate limits
3. Set: Usage limits if needed

---

## 🚀 Next Steps

Once your key is set:

1. ✅ **Test it:** Run `.\TEST_OPENAI_KEY.ps1`
2. ✅ **Try content generation:** Run `.\GENERATE_CONTENT.ps1`
3. ✅ **Tell me what to automate:** I'll create custom scripts!

---

**Ready to automate content generation! 🎯**

