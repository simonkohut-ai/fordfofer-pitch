# 🧪 Quick Test - Dashboard & Console

**Test your deployed projects right now:**

---

## 🌐 **Step 1: Get Your URLs**

**In Vercel Dashboard:**
1. Go to: https://vercel.com/dashboard
2. Find your project(s)
3. Click on each project
4. Click **"Visit"** button
5. Copy the URL

**Your projects might be named:**
- `ai-studio` (if you deployed whole folder)
- `ai-studio-dashboard` (if separate dashboard project)
- `p2ba-console` (if separate console project)

---

## ✅ **Step 2: Test Dashboard**

### **If you have a Dashboard URL:**

1. **Open the URL** in your browser
2. **Check if password prompt appears**
   - Password: `moneymachine25`
3. **After login, test:**
   - [ ] Dashboard loads
   - [ ] AI Chat section works
   - [ ] Type: `Hello` and send
   - [ ] Check if response appears

### **If Dashboard doesn't load:**
- Check Root Directory in Vercel Settings
- Should be: `dashboard` (if separate project)
- Or check `/dashboard` route if deployed from root

---

## ✅ **Step 3: Test Console**

### **If you have a Console URL:**

1. **Open the URL** in your browser
2. **Check interface:**
   - [ ] Chat interface appears
   - [ ] Input field is visible
   - [ ] Can type commands
3. **Test command:**
   - Type: `Create a simple test business`
   - Click Execute/Submit
   - Check if it processes

### **If Console doesn't load:**
- Check Root Directory in Vercel Settings
- Should be: `p2ba-console`
- Framework should be: Next.js

---

## 🔍 **Step 4: Browser Console Check**

**Press F12** in your browser:

### **Check for Errors:**
- [ ] No red errors
- [ ] No 404/500 errors
- [ ] API calls return 200 status

### **Network Tab:**
- [ ] `/api/agent` works (Dashboard)
- [ ] `/api/p2ba-command` works (Console)
- [ ] No CORS errors

---

## ⚠️ **Common Issues**

### **404 Errors:**
- **Fix**: Check Root Directory in Vercel Settings
- Dashboard: Set to `dashboard`
- Console: Set to `p2ba-console`

### **API Errors:**
- **Fix**: Check `OPENAI_API_KEY` is set in Vercel
- Go to Settings → Environment Variables
- Verify key is added and correct

### **Build Errors:**
- **Fix**: Check Vercel build logs
- Look for missing dependencies
- Verify `package.json` exists

---

## 🎯 **Quick Test Commands**

**Dashboard:**
```
Hello
What can you do?
Show me stats
```

**Console:**
```
Create a test business
Generate a simple website
Help with marketing
```

---

## 📋 **Success Checklist**

- [ ] Dashboard URL loads
- [ ] Can log in (password works)
- [ ] AI chat responds
- [ ] Console URL loads (if separate)
- [ ] Can submit commands
- [ ] No errors in browser console

---

**Open your Vercel dashboard, get the URLs, and test!** 🚀
