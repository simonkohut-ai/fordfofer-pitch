# 🔒 Security Setup Guide

**P2BA Console - Password Protection**

---

## ✅ Čo Je Implementované

### 1. Password Protection Middleware
- ✅ **Next.js Middleware** - Chráni všetky routes
- ✅ **Login Page** - `/login` pre autentifikáciu
- ✅ **Cookie-based Auth** - Secure HTTP-only cookies
- ✅ **API Route Protection** - Všetky API routes chránené

### 2. Security Features
- ✅ **Private GitHub Repo** - Prístup len pre autorizovaných
- ✅ **Environment Variables** - API kľúče v env vars
- ✅ **Proprietary License** - Legálna ochrana
- ✅ **No Secrets in Code** - Všetko v .gitignore

---

## 🔐 Password Configuration

### Default Password
```
chiaras-world-2025
```

### Zmena Hesla

**V Environment Variables (Vercel):**
```
P2BA_PASSWORD=tvoje-nove-heslo
```

**V Lokálnom .env:**
```env
P2BA_PASSWORD=tvoje-nove-heslo
```

---

## 🚀 Ako to Funguje

### 1. Prvý Prístup
- Užívateľ otvorí P2BA Console
- Middleware presmeruje na `/login`
- Užívateľ zadá heslo
- Cookie sa uloží (7 dní)

### 2. Ďalšie Prístupy
- Cookie je platný → prístup povolený
- Cookie expiroval → presmerovanie na login

### 3. API Routes
- Skontroluje cookie alebo Authorization header
- Neplatná autentifikácia → 401 Unauthorized

---

## 📋 Deployment Checklist

- [ ] **Zmeň Default Password:**
  - Vercel: Settings → Environment Variables
  - Pridaj: `P2BA_PASSWORD=tvoje-heslo`
  
- [ ] **Vercel Password Protection (Optional):**
  - Settings → Deployment Protection
  - Enable "Password Protection"
  - Dvojitá ochrana

- [ ] **Environment Variables:**
  - Pridaj všetky z `DEPLOY_ENV_VARS.txt`
  - Skontroluj `P2BA_PASSWORD`

- [ ] **Test Login:**
  - Otvor production URL
  - Skontroluj, že login funguje
  - Test API routes

---

## 🔒 Best Practices

1. **Silné Heslo:**
   - Minimálne 16 znakov
   - Kombinácia písmen, číslic, symbolov
   - Nepoužívaj default heslo!

2. **Pravidelná Rotácia:**
   - Zmeň heslo každé 3 mesiace
   - Aktualizuj v environment variables

3. **Cookie Security:**
   - HTTP-only (nemôže JavaScript pristúpiť)
   - Secure (len HTTPS v produkcii)
   - SameSite: strict

4. **API Access:**
   - Použi Authorization header pre API calls
   - `Authorization: Bearer tvoje-heslo`

---

## 🆘 Troubleshooting

### "Unauthorized" Error
- Skontroluj, že `P2BA_PASSWORD` je nastavený
- Skontroluj cookie v browser DevTools
- Skús sa odhlásiť a prihlásiť znova

### Login Page Nezobrazuje
- Skontroluj, že `middleware.ts` existuje
- Skontroluj Next.js konfiguráciu
- Skontroluj build errors

### API Routes Nefungujú
- Skontroluj Authorization header
- Skontroluj cookie
- Skontroluj environment variables

---

## 📞 Support

**Email:** gcapovic.biz@proton.me

---

**Status:** ✅ Password Protection Active

