# 🚀 Deploy Dashboard to Vercel - Password Protected

**Deploy your AI Studio Dashboard to Vercel with password protection**

---

## ⚡ Quick Deploy (5 Minutes)

### **Step 1: Install Vercel CLI**

```bash
npm install -g vercel
```

Or download from: https://vercel.com/download

---

### **Step 2: Set Password**

1. Open `dashboard/auth.js`
2. Change `YOUR_SECRET_PASSWORD_HERE` to your password:
   ```javascript
   const PASSWORD = 'MySecretPassword123!';
   ```
3. Save the file

---

### **Step 3: Deploy**

```bash
cd dashboard
vercel
```

**Follow the prompts:**
- Set up and deploy? **Yes**
- Which scope? **Your account**
- Link to existing project? **No**
- Project name? **ai-studio-dashboard** (or your choice)
- Directory? **./** (current directory)
- Override settings? **No**

---

### **Step 4: Access Your Dashboard**

After deployment, Vercel will give you a URL like:
```
https://ai-studio-dashboard.vercel.app
```

**Bookmark it!** 🔖

---

## 🔒 Password Protection

The dashboard is protected with a password prompt:
- Enter your password when you visit
- Password is stored in browser (localStorage)
- Only you can access it

**To change password:**
1. Edit `auth.js`
2. Change the `PASSWORD` constant
3. Redeploy: `vercel --prod`

---

## 📋 Manual Deploy Steps

### **Option 1: Vercel CLI (Recommended)**

```bash
# Install Vercel CLI
npm install -g vercel

# Navigate to dashboard folder
cd dashboard

# Deploy
vercel

# Deploy to production
vercel --prod
```

---

### **Option 2: Vercel Dashboard (Web)**

1. Go to: https://vercel.com
2. Sign up/Login
3. Click **"New Project"**
4. Import your Git repository OR drag & drop the `dashboard` folder
5. Configure:
   - **Framework Preset:** Other
   - **Root Directory:** `dashboard`
   - **Build Command:** (leave empty)
   - **Output Directory:** `.`
6. Click **"Deploy"**

---

## 🔧 Environment Variables (Optional)

If you want to use environment variables for password:

1. **In Vercel Dashboard:**
   - Go to your project
   - Settings → Environment Variables
   - Add: `DASHBOARD_PASSWORD` = `YourPassword`

2. **Update `auth.js`:**
   ```javascript
   const PASSWORD = process.env.DASHBOARD_PASSWORD || 'YOUR_SECRET_PASSWORD_HERE';
   ```

---

## 🛑 Update Deployment

After making changes:

```bash
cd dashboard
vercel --prod
```

Or push to Git (if connected) - Vercel auto-deploys!

---

## 📱 Access Your Dashboard

Once deployed, you'll get a URL like:
```
https://ai-studio-dashboard.vercel.app
```

**Features:**
- ✅ Password protected
- ✅ HTTPS (secure)
- ✅ Fast global CDN
- ✅ Auto-deploys on Git push
- ✅ Free hosting

---

## 🔐 Security Notes

1. **Change the password** in `auth.js` before deploying
2. **Use a strong password** (mix of letters, numbers, symbols)
3. **Don't commit password** to public Git repos
4. **Use environment variables** for production

---

## 💡 Tips

- **Custom Domain:** Add your domain in Vercel settings
- **Auto-Deploy:** Connect Git repo for automatic deployments
- **Analytics:** Enable Vercel Analytics in dashboard
- **Preview:** Every push creates a preview URL

---

**Ready to deploy!** 🚀

Run: `vercel` in the dashboard folder!
