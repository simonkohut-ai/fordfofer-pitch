# ⚡ AI Studio Dashboard

**Professional AI automation command center - Zapier/Buffer/n8n style**

**Status:** Production-ready and live. Revenue systems operational ahead of planned public release on 21.12.2025.

---

## 🚀 Features

- 📊 **Dashboard** - Revenue tracking and analytics
- 🔄 **Workflows** - Automation management
- 💬 **AI Chat** - Central communication hub (Claude, Cursor, OpenAI)
- 💰 **Revenue** - Sales tracking and breakdown
- 📢 **Marketing** - Campaign management
- ⚙️ **Settings** - Integrations and preferences

---

## 🔒 Password Protected

Password: `moneymachine25`

---

## 🚀 Deployment

### Quick Deploy

Run the production deployment script:

```powershell
.\REDEPLOY_LIVE.ps1
```

This script:
- Deploys to Vercel production
- Verifies project is "dashboard"
- Checks domain `golocapo.com` is attached
- Tests domain responds with HTTP 200
- **Fails loudly if domain not working** (prevents false positives)

### Why Deployment Says "Success" But Domain Is Not LIVE

**Common confusion:** Deployment success ≠ Domain working

**What happens:**
1. ✅ Code deploys to `.vercel.app` URL (this succeeds)
2. ⚠️ Domain attachment is separate (must be done in Vercel dashboard)
3. ⚠️ DNS configuration is separate (must be done at domain registrar)
4. ⚠️ DNS propagation takes time (can take up to 48 hours)

**The script now prevents false positives:**
- Aborts if domain not attached
- Aborts if domain doesn't respond
- Never says "LIVE" unless domain actually works

**See:** `DEPLOYMENT_TROUBLESHOOTING.md` for full diagnosis guide.

---

## 📋 Deploy to Vercel

### **Option 1: From GitHub (Recommended)**

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Deploy on Vercel:**
   - Go to: https://vercel.com
   - Sign up/Login
   - Click **"New Project"**
   - Import from GitHub
   - Select this repository
   - Click **"Deploy"**

**Done!** Your dashboard will be live! 🎉

---

### **Option 2: Direct Upload**

1. Go to: https://vercel.com
2. Sign up/Login
3. Click **"New Project"**
4. Drag & drop the `dashboard` folder
5. Click **"Deploy"**

---

## 🛠️ Local Development

**See [RUN_LOCAL.md](./RUN_LOCAL.md) for detailed setup guide.**

```powershell
# Install dependencies
npm install

# Install Vercel CLI (if not installed)
npm install -g vercel

# Set environment variables (PowerShell)
$env:STRIPE_CHECKOUT_URL="https://buy.stripe.com/YOUR_LINK"

# Run development server
npm run dev

# Open: http://localhost:3000
```

**Note:** Uses `vercel dev` for full API route support. See `RUN_LOCAL.md` for troubleshooting.

---

## 📁 Project Structure

```
dashboard/
├── index.html          # Main dashboard
├── styles.css          # Styling
├── dashboard.js        # Functionality
├── auth.js            # Password protection
├── vercel.json        # Vercel config
└── package.json       # Dependencies
```

---

## 🔐 Security

- Password protected access
- HTTPS enabled on Vercel
- Secure localStorage authentication

---

## 💡 Usage

1. Deploy to Vercel
2. Visit your dashboard URL
3. Enter password: `moneymachine25`
4. Start using your command center!

---

**Built with ❤️ for AI automation**
