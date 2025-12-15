# COMPLETE TESTING CHECKLIST

## URL STATUS TESTS

### Dashboard:
URL: https://ai-studio-sandy-five.vercel.app
- [ ] URL loads (HTTP 200)
- [ ] Page renders correctly
- [ ] Shows password prompt OR dashboard
- [ ] No console errors (F12)
- [ ] No 404/500 errors

### Console:
URL: https://p2ba-navy.vercel.app
- [ ] URL loads (HTTP 200)
- [ ] Page renders correctly
- [ ] Shows chat interface
- [ ] No console errors (F12)
- [ ] No 404/500 errors

---

## FUNCTIONALITY TESTS

### Dashboard:
1. Open: https://ai-studio-sandy-five.vercel.app
2. Enter password: moneymachine25
3. Check: Dashboard loads after login
4. Test AI Chat:
   - Click AI Chat section
   - Type: Hello
   - Press Enter
   - Check: Response appears
5. Check: No errors in browser console (F12)

### Console:
1. Open: https://p2ba-navy.vercel.app
2. Check: Chat interface visible
3. Test Command:
   - Type: Create a test business
   - Press Enter or click Execute
   - Check: Command processes
   - Check: Response appears
4. Check: No errors in browser console (F12)

---

## VERCEL DASHBOARD CHECKS

### Dashboard Project (ai-studio):
- [ ] Project exists
- [ ] Latest deployment: Ready (green checkmark)
- [ ] Root Directory = dashboard (in Settings)
- [ ] OPENAI_API_KEY set in Environment Variables
- [ ] No build errors in logs

### Console Project (p2ba):
- [ ] Project exists
- [ ] Latest deployment: Ready (green checkmark)
- [ ] Root Directory = p2ba-console (if separate project)
- [ ] OPENAI_API_KEY set in Environment Variables
- [ ] No build errors in logs

---

## BROWSER CONSOLE CHECKS

Open browser console (F12) and check:
- [ ] No red errors
- [ ] No 404 errors
- [ ] No 500 errors
- [ ] API calls return 200 status
- [ ] No CORS errors
- [ ] No timeout errors

---

## NETWORK TAB CHECKS

Open Network tab (F12) and check:

### Dashboard:
- [ ] /api/agent returns 200 (when testing AI Chat)
- [ ] All resources load successfully
- [ ] No failed requests

### Console:
- [ ] /api/p2ba-command returns 200 (when testing commands)
- [ ] All resources load successfully
- [ ] No failed requests

---

## SUCCESS CRITERIA

All tests pass if:
- âœ… Dashboard URL loads
- âœ… Can log in with password
- âœ… AI Chat responds
- âœ… Console URL loads
- âœ… Commands execute
- âœ… No errors in console
- âœ… No errors in Vercel logs

---

## IF TESTS FAIL

### Dashboard Issues:
- Check Root Directory = dashboard
- Check OPENAI_API_KEY is set
- Check Vercel build logs
- Redeploy if needed

### Console Issues:
- Check OPENAI_API_KEY is set
- Check Vercel build logs
- Redeploy if needed

---

**Test Date:** 2025-12-15 13:28:05

**Test both URLs manually and check all items above!**
