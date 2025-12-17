# Final Checkup – Operator Checklist (Pre-Scale)

Use this as a quick dashboard before pushing harder on traffic.

---

## One URL to share

- **Primary URL:** `https://www.golocapo.com/prelaunch`
- Confirms:
  - [ ] Page loads without errors.
  - [ ] 21.12 + “early Christmas gift” message is visible.
  - [ ] Countdown runs.
  - [ ] Email form works (or clearly shows a TODO if not wired).

---

## One message

- “We’re launching something new on 21.12.  
  An early Christmas gift for founders & small teams who want AI-powered marketing without chaos.  
  Join the waitlist — first access goes out on launch day.”

Every post, DM, and page should echo this in some form.

---

## One waitlist

- `/prelaunch` is the **single** official waitlist entrypoint.
- Checks:
  - [ ] Email field + consent checkbox.  
  - [ ] Clear success state (“You’re in”, mention 21.12).  
  - [ ] Leads flow into storage and/or `/data/audience.csv` is updated regularly.

---

## One audience database

- File: `/data/audience.csv`
- Each row represents a real person with:
  - `email`, `source`, `first_seen`, `intent`, `notes`.
- Checks:
  - [ ] New signups or DMs are added at least once per day.  
  - [ ] No invented entries; every row maps to a real interaction.

---

## One revenue → growth loop

- Documented in `docs/MARKETING_BUDGET_SYSTEM.md`.
- Checks:
  - [ ] First revenue sources defined (early access, pilots, setup).  
  - [ ] Allocation rules agreed (e.g., 40/40/20).  
  - [ ] No paid ads until real revenue exists.  

---

## No distractions

**Hard rule:** If it doesn't drive people to `/prelaunch`, it's a distraction.

- Before adding new features, answer:
  1. Does this help more of the **right people** land on `/prelaunch`?  
  2. Does this help convert more of them into the audience file?  
  3. Does this make it easier to deliver value on or after 21.12?  

If the answer is “no” to all three, it can wait until after launch.

**Single source of truth:** `/prelaunch` is the only official entry point. No other page should claim early access, buying now, or alternative CTAs.


