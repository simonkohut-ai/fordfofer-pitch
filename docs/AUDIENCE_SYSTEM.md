# Audience System – Core Asset

The **audience** is the main asset of this project. Everything we do should turn traffic into identifiable people we can help on or after 21.12.

---

## What counts as an audience member

- **Waitlist email** – someone who left an email on `/prelaunch` (or future forms).  
- **DM conversation** – anyone you’ve had a meaningful back‑and‑forth with about the product.  
- **Engaged follower** – people who like/reply to posts about GoLoCapo (X, LinkedIn, Discord, etc.).  
- **Repo visitor/contact** – anyone who reaches out after seeing the repo or live site.  

If there is a **name, email, handle, or DM thread**, they can and should be recorded as part of the audience.

---

## What data we track

For each audience member we care about:

- `email` – preferred email if known (or placeholder if only handle is known).  
- `source` – where they came from (e.g. `x`, `linkedin`, `dm`, `github`, `referral`, `discord`).  
- `first_seen` – ISO date when you first noticed/recorded them (e.g. `2025-12-17`).  
- `intent` – rough interest level: `low`, `medium`, or `high`.  
- `notes` – free‑text context (who they are, what they said, what they want).  

This is stored in `/data/audience.csv` (see below).

---

## Rule: every contact becomes data

- Any time someone joins the waitlist, replies to a DM, or meaningfully engages with a post, **they should be added or updated** in the audience file.  
- If you’re not sure what to write in `intent`, default to `low` and update later.  
- A tiny but accurate list is more valuable than inflated numbers with no context.  

Over time this file becomes the **single source of truth** for who is actually paying attention.


