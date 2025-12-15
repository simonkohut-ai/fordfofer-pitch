# 🚀 Deploy Your Order Form (FREE)

## ✅ 3-Minute Deploy to Vercel (Recommended)

### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

### Step 2: Deploy
```bash
# Navigate to this folder
cd "c:\Users\simik\Desktop\the most wanted!!!\fordfofer-pitch\client-portal"

# Deploy (first time will ask for login)
vercel

# Follow prompts:
# - Login with GitHub/Email
# - Set up project: YES
# - Name: chiara-studio (or whatever you want)
# - Deploy: YES
```

### Step 3: Get Your URL
```
After deploy completes, you'll get a URL like:
https://chiara-studio.vercel.app

Copy this URL and share with clients!
```

---

## 🔧 Configure n8n Webhook

### Step 1: Get n8n Webhook URL

1. Open https://app.n8n.cloud
2. Open your workflow
3. Click the "Webhook" node
4. Click "Execute Workflow" to activate
5. Copy the "Production URL"

Example: `https://yourname.app.n8n.cloud/webhook/generate-influencer`

### Step 2: Update index.html

Open `index.html` and replace line 159:

```javascript
// BEFORE:
const N8N_WEBHOOK_URL = 'https://yourname.app.n8n.cloud/webhook/generate-influencer';

// AFTER (use your actual URL):
const N8N_WEBHOOK_URL = 'https://YOURNAME.app.n8n.cloud/webhook/generate-influencer';
```

### Step 3: Redeploy

```bash
vercel --prod
```

Done! Your site is live and connected to n8n!

---

## 🎯 Alternative: Netlify Drop (Even Easier)

1. Go to: https://app.netlify.com/drop
2. Drag the `client-portal` folder
3. Done! Instant URL

---

## 🎯 Alternative: GitHub Pages (Free Forever)

### Step 1: Create GitHub Repo

1. Go to: https://github.com/new
2. Name: `chiara-studio`
3. Public repo
4. Create

### Step 2: Upload Files

```bash
cd "c:\Users\simik\Desktop\the most wanted!!!\fordfofer-pitch\client-portal"

git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR-USERNAME/chiara-studio.git
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. Go to repo Settings
2. Pages section
3. Source: main branch
4. Save

Your site will be live at:
`https://YOUR-USERNAME.github.io/chiara-studio`

---

## ✅ Test Your Setup

1. Open your deployed URL
2. Fill in the form
3. Click "Generate"
4. Check if n8n workflow runs
5. Check email for results

---

## 🎯 Next Steps

Once deployed:

1. ✅ Share URL on social media
2. ✅ Add to email signature
3. ✅ Tell friends/network
4. ✅ Post on Reddit/Twitter
5. ✅ Start getting clients!

---

## 💰 Optional: Add Custom Domain

### Free Domain Options:

1. **Freenom** (free .tk/.ml domains)
   - Go to: https://freenom.com
   - Get free domain
   - Point to Vercel/Netlify

2. **Vercel Custom Domain**
   - Vercel Dashboard → Settings → Domains
   - Add your domain
   - Update DNS records

3. **Buy Cheap Domain**
   - Namecheap: $0.99/year .xyz
   - Google Domains: $12/year .com

---

**You're ready to launch! 🚀**

