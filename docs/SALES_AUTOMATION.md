# Sales Automation System

**Goal:** Automate follow-ups, demo reminders, and post-purchase onboarding  
**Rule:** Every lead converts, disqualifies, or gets nurtured automatically  
**Status:** Production Ready

---

## Overview

The Sales Automation System automates:
1. **Follow-ups** → Automated email sequences
2. **Demo Reminders** → Calendar-based triggers
3. **Post-Purchase Onboarding** → Welcome sequences
4. **Qualification** → Automated scoring and routing
5. **Disqualification** → Auto-remove non-fits

---

## Follow-Up Automation

### Sequence 1: High-Intent Leads

**Trigger:** Lead requests demo or asks specific questions

**Sequence:**
- **Day 0:** Immediate response (manual or auto)
- **Day 1:** Demo reminder (if booked)
- **Day 2:** Follow-up after demo
- **Day 3:** Value-add content
- **Day 5:** Final close attempt

**Status:** ⚠️ To be implemented

---

### Sequence 2: Medium-Intent Leads

**Trigger:** Lead signs up but doesn't engage

**Sequence:**
- **Day 1:** Welcome + value proposition
- **Day 3:** Case study / testimonial
- **Day 5:** Special offer / urgency
- **Day 7:** Final follow-up

**Status:** ⚠️ To be implemented

---

### Sequence 3: Low-Intent Leads

**Trigger:** Lead signs up but shows low engagement

**Sequence:**
- **Day 1:** Welcome email
- **Day 7:** Value-add content
- **Day 14:** Launch reminder
- **Day 30:** Long-term nurture

**Status:** ⚠️ To be implemented

---

## Demo Reminders

### Pre-Demo Reminder

**Trigger:** 24 hours before scheduled demo

**Email:**
```
Subject: Reminder: Demo Tomorrow at [Time]

Hey [Name]!

Quick reminder: We have a demo scheduled for tomorrow at [Time].

Here's what we'll cover:
• How the tool works
• How it solves your specific challenge
• Q&A

See you then!

[Calendly link to reschedule if needed]
```

**Status:** ⚠️ To be implemented

---

### Post-Demo Follow-Up

**Trigger:** Immediately after demo ends

**Email:**
```
Subject: Thanks for the demo!

Hey [Name]!

Thanks for taking the time to chat!

As discussed:
• [Key points from demo]
• [Next steps]

Ready to claim your founding spot?

https://www.golocapo.com/prelaunch

Questions? Just reply!
```

**Status:** ⚠️ To be implemented

---

### No-Show Follow-Up

**Trigger:** If demo is missed

**Email:**
```
Subject: We missed you!

Hey [Name]!

We had a demo scheduled but didn't see you. No worries!

Want to reschedule? [Calendly link]

Or, if you're ready to move forward, claim your founding spot:

https://www.golocapo.com/prelaunch

Let me know what works!
```

**Status:** ⚠️ To be implemented

---

## Post-Purchase Onboarding

### Welcome Email (Immediate)

**Trigger:** Payment successful

**Email:**
```
Subject: Welcome to Golo Čapo! 🎉

Hey [Name]!

Thanks for claiming your founding spot!

You're all set. Here's what happens next:

1. Launch day: 21.12
2. You'll get instant access
3. First month is free
4. We'll send you everything you need

Questions? Just reply to this email.

Welcome aboard!
```

**Status:** ✅ Already implemented (payment confirmation email)

---

### Onboarding Day 1

**Trigger:** Day 1 after purchase

**Email:**
```
Subject: Getting Started with Golo Čapo

Hey [Name]!

Welcome! Here's how to get started:

1. [Step 1: Access your dashboard]
2. [Step 2: Set up your first campaign]
3. [Step 3: Generate your first posts]

Need help? Just reply to this email.

Let's make your marketing effortless!
```

**Status:** ⚠️ To be implemented

---

### Check-in Day 7

**Trigger:** Day 7 after purchase

**Email:**
```
Subject: How's it going?

Hey [Name]!

Quick check-in — how's it going?

Are you:
✅ Getting value from the tool?
❌ Running into any issues?
🤔 Not sure where to start?

Reply and let me know! I'm here to help.
```

**Status:** ⚠️ To be implemented

---

### Success Check Day 30

**Trigger:** Day 30 after purchase

**Email:**
```
Subject: 30 Days In — How's It Going?

Hey [Name]!

You've been using Golo Čapo for 30 days. How's it going?

Quick questions:
1. Are you getting value?
2. What's working well?
3. What could be better?

Your feedback helps us improve. Plus, if you know anyone who might benefit, we'd love a referral!

Thanks for being a founding customer!
```

**Status:** ⚠️ To be implemented

---

## Qualification Logic

### Automated Scoring

**High Intent (Score: 8-10):**
- Requests demo: +3
- Asks specific questions: +2
- Mentions budget: +2
- Responds quickly: +1
- Engages with content: +1

**Medium Intent (Score: 5-7):**
- Signs up for waitlist: +2
- Opens emails: +1
- Clicks links: +1
- Responds to follow-up: +1

**Low Intent (Score: 1-4):**
- Signs up but no engagement: +1
- Generic questions: +1
- No response: +0

**Auto-Routing:**
- **High Intent:** Move to demo/closing sequence
- **Medium Intent:** Nurture sequence
- **Low Intent:** Long-term nurture or disqualify

**Status:** ⚠️ To be implemented

---

## Disqualification Automation

### Auto-Disqualify Rules

**Disqualify If:**
- Explicitly says "not interested"
- Unsubscribes from emails
- No engagement after 30 days
- Not a fit (based on qualification)

**Action:**
- Remove from active pipeline
- Move to "disqualified" list
- Stop automated follow-ups
- Keep in database for future reference

**Status:** ⚠️ To be implemented

---

## Implementation

### Email Templates

**Location:** `dashboard/api/utils/email.mjs`

**Templates Needed:**
- `demo-reminder` - Pre-demo reminder
- `post-demo-followup` - After demo
- `no-show-followup` - Missed demo
- `onboarding-day1` - Day 1 onboarding
- `checkin-day7` - Day 7 check-in
- `success-check-day30` - Day 30 success check

**Status:** ⚠️ To be implemented

---

### Automation Workflow

**Option 1: n8n Workflow**
- Set up n8n workflows for each sequence
- Trigger based on lead status/date
- Send emails via Resend API

**Option 2: Vercel Cron Jobs**
- Set up Vercel cron jobs
- Check lead status daily
- Send emails via Resend API

**Option 3: Manual + Scripts**
- Use PowerShell scripts
- Run daily to check and send
- Track in spreadsheet

**Status:** ⚠️ To be implemented

---

## Tracking

### Lead Status

**Statuses:**
- `new` - Just signed up
- `qualified` - High intent
- `demo-scheduled` - Demo booked
- `demo-completed` - Demo done
- `nurturing` - In nurture sequence
- `customer` - Converted
- `disqualified` - Not a fit

**Tracking:**
- Store in lead database
- Update via API
- Query for automation

**Status:** ✅ Partially implemented

---

### Conversion Tracking

**Metrics:**
- Lead → Demo conversion rate
- Demo → Customer conversion rate
- Follow-up → Customer conversion rate
- Time to conversion

**Tracking:**
- Store in revenue tracking system
- Calculate conversion rates
- Optimize sequences

**Status:** ✅ Partially implemented

---

## Next Steps

### Immediate (Week 1)

1. **Create email templates** (2 hours)
   - Demo reminders
   - Post-demo follow-ups
   - Onboarding sequences

2. **Set up automation** (4 hours)
   - n8n workflows OR
   - Vercel cron jobs OR
   - PowerShell scripts

3. **Test sequences** (1 hour)
   - Test each email
   - Verify triggers
   - Check tracking

---

### Short-term (Week 2-4)

1. **Implement qualification logic** (4 hours)
   - Automated scoring
   - Auto-routing
   - Status updates

2. **Add more sequences** (2 hours)
   - Value-add content
   - Case studies
   - Testimonials

3. **Optimize based on data** (ongoing)
   - Track conversion rates
   - A/B test sequences
   - Improve messaging

---

## Best Practices

### Do's

✅ **Automate Everything:** Don't manually send follow-ups
✅ **Track Everything:** Know what's working
✅ **Personalize:** Use their name and context
✅ **Test:** A/B test sequences
✅ **Optimize:** Improve based on data

### Don'ts

❌ **Don't Spam:** Respect their time
❌ **Don't Over-Automate:** Keep it human
❌ **Don't Ignore Signals:** If they say no, stop
❌ **Don't Skip Tracking:** Data is everything

---

## Resources

- **Closing Scripts:** `docs/CLOSING_SCRIPTS.md`
- **Email Templates:** `dashboard/api/utils/email.mjs`
- **Lead Storage:** `dashboard/api/utils/leads-storage.mjs`
- **Revenue Tracking:** `dashboard/api/revenue/track.mjs`

---

**Remember:** Every lead should convert, disqualify, or be nurtured automatically. No lead falls through cracks.

