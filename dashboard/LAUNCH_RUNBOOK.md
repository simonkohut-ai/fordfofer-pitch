# Launch Runbook - 21.12.2025

**Version:** 1.0.0-prelaunch  
**Launch Date:** 21.12.2025  
**Status:** War Room Procedures

---

## Pre-Launch Checklist (T-24 hours)

### Infrastructure
- [ ] Vercel Pro account active
- [ ] OpenAI Pro API key configured
- [ ] Vercel KV/Postgres storage configured
- [ ] All environment variables set:
  - `STRIPE_CHECKOUT_URL` (Payment Link)
  - `STRIPE_WEBHOOK_SECRET` (Webhook signing secret)
  - `META_INTEGRATION_ENABLED` (true/false)
  - `META_POSTING_ENABLED` (true/false)
- [ ] Domain DNS configured (`golocapo.com`)
- [ ] SSL certificate valid
- [ ] Stripe webhook endpoint configured (`/api/stripe/webhook`)

### Meta Integration
- [ ] Meta App created and configured
- [ ] OAuth redirect URIs set correctly
- [ ] `pages_show_list` permission working
- [ ] `pages_manage_posts` App Review status checked
- [ ] Phase B.1 (Connect + Pages) tested in staging
- [ ] Phase B.2 (Posting) tested IF approved

### Code
- [ ] All code committed to `main` branch
- [ ] No console errors in production build
- [ ] All API routes tested
- [ ] Rate limiting configured
- [ ] Error handling verified
- [ ] No token logging (security audit)

### Monitoring
- [ ] Vercel logs accessible
- [ ] Error tracking configured (optional)
- [ ] Health endpoints tested (`/api/health`, `/api/meta/health`)

---

## Launch Day Procedures (21.12.2025)

### T-1 Hour: Final Checks

1. **Deploy to Production**
   ```bash
   git push origin main
   # Verify Vercel deployment succeeds
   ```

2. **Verify Environment Variables**
   - Check Vercel Dashboard → Settings → Environment Variables
   - Ensure production values are correct
   - Verify `META_INTEGRATION_ENABLED=true` (if ready)
   - Verify `META_POSTING_ENABLED=false` (unless approved)

3. **Health Check**
   ```bash
   curl https://golocapo.com/api/health
   curl https://golocapo.com/api/meta/health
   ```

4. **Smoke Test**
   - Open dashboard
   - Generate marketing content
   - Test copy/share flow
   - Test Meta connect (if enabled)
   - Test `/promo-kit` generator
   - Test `/war-room` page loads
   - Verify Payments admin panel shows data
   - Test Stripe checkout flow end-to-end

### T-0: Launch

1. **Announce Launch**
   - Post on social media
   - Share `/share/ai-studio` link
   - Monitor initial traffic

2. **Monitor Dashboard**
   - Watch Vercel logs for errors
   - Check API response times
   - Monitor OpenAI API usage
   - Watch Meta API calls (if enabled)

3. **User Support**
   - Monitor for user issues
   - Check error logs
   - Respond to feedback

---

## Post-Launch Monitoring (First 24 Hours)

### Key Metrics

**Performance:**
- API response times < 2s
- Error rate < 1%
- Uptime > 99.9%

**Usage:**
- Content generations per hour
- Copy/share button clicks
- Meta connections (if enabled)
- Meta posts (if enabled)

**Errors to Watch:**
- OpenAI API errors (rate limits, timeouts)
- Meta API errors (token expiry, permissions)
- Storage errors (KV/Postgres failures)
- Frontend errors (console errors)

### Common Issues & Fixes

#### Issue: "OpenAI API error"
**Check:**
- OpenAI API key valid
- Rate limits not exceeded
- Account has credits

**Fix:**
- Verify API key in Vercel env vars
- Check OpenAI dashboard for usage
- Add credits if needed

#### Issue: "Meta connection fails"
**Check:**
- OAuth redirect URI matches exactly
- Meta App settings correct
- User has Facebook Page

**Fix:**
- Verify redirect URI in Meta App settings
- Check Vercel env vars
- Test OAuth flow manually

#### Issue: "Storage errors"
**Check:**
- KV/Postgres connection valid
- Storage credentials correct
- Storage not full

**Fix:**
- Verify storage credentials
- Check Vercel Storage dashboard
- Scale storage if needed

#### Issue: "Rate limit errors"
**Check:**
- Rate limit config in `rateLimit.mjs`
- Daily cap not exceeded
- Per-minute limit not exceeded

**Fix:**
- Adjust rate limits if needed
- Check for abuse patterns
- Consider increasing limits

---

## War Room Commands

### Check System Health
```bash
# General health
curl https://golocapo.com/api/health | jq

# Meta health
curl https://golocapo.com/api/meta/health | jq

# Check logs (Vercel Dashboard)
# Go to: Project → Deployments → View Function Logs
```

### Emergency Procedures

#### If OpenAI API Fails
1. Check OpenAI status page
2. Verify API key
3. Check account credits
4. If persistent, disable generation temporarily:
   ```bash
   # Set in Vercel env vars
   OPENAI_API_KEY=disabled_temp
   ```

#### If Meta Integration Fails
1. Check Meta App status
2. Verify OAuth redirect URI
3. Check token expiry
4. If persistent, disable temporarily:
   ```bash
   # Set in Vercel env vars
   META_INTEGRATION_ENABLED=false
   ```

#### If Storage Fails
1. Check Vercel Storage dashboard
2. Verify credentials
3. Check storage limits
4. Switch to memory fallback (temporary):
   ```bash
   # Set in Vercel env vars
   STORAGE_TYPE=memory
   ```

#### If Site Goes Down
1. Check Vercel deployment status
2. Check domain DNS
3. Check SSL certificate
4. Rollback to previous deployment if needed:
   ```bash
   # In Vercel Dashboard
   # Go to: Deployments → Previous → Promote to Production
   ```

---

## Post-Launch Tasks (First Week)

### Day 1-2: Monitor & Fix
- [ ] Monitor error logs daily
- [ ] Fix any critical bugs
- [ ] Respond to user feedback
- [ ] Update documentation if needed

### Day 3-5: Optimize
- [ ] Review API usage patterns
- [ ] Optimize rate limits if needed
- [ ] Improve error messages
- [ ] Add missing features based on feedback

### Day 6-7: Plan Next Phase
- [ ] Review Meta App Review status
- [ ] Plan Phase B.2 enablement (if approved)
- [ ] Plan Phase B.3 (Scheduling) implementation
- [ ] Update roadmap

---

## Escalation Contacts

**Technical Issues:**
- Vercel Support: support@vercel.com
- OpenAI Support: help.openai.com
- Meta Developer Support: developers.facebook.com/support

**Emergency:**
- Check Vercel Status: vercel-status.com
- Check OpenAI Status: status.openai.com
- Check Meta Status: developers.facebook.com/status

---

## Success Criteria

**Launch is successful if:**
- ✅ Site loads without errors
- ✅ Content generation works
- ✅ Copy/share flow works
- ✅ Meta connect works (if enabled)
- ✅ Error rate < 1%
- ✅ No critical security issues
- ✅ User feedback positive

---

**Last Updated:** Pre-Launch  
**Next Review:** Post-Launch (22.12.2025)

