# 🚀 Quick Deploy to Vercel

## 3 Steps to Deploy:

### **Step 1: Set Password**
Open `auth.js` and change:
```javascript
const PASSWORD = 'YOUR_SECRET_PASSWORD_HERE';
```
To your password, for example:
```javascript
const PASSWORD = 'MySecret123!';
```

### **Step 2: Install Vercel CLI**
```bash
npm install -g vercel
```

### **Step 3: Deploy**
```bash
cd dashboard
vercel
```

Follow prompts → Done! 🎉

---

## Your Dashboard URL:
After deployment, you'll get:
```
https://your-project-name.vercel.app
```

**Password protected - only you can access!**

---

## Update After Changes:
```bash
vercel --prod
```
