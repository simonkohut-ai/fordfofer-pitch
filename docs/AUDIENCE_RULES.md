# Audience Rules

Simple rules to make sure **traffic becomes people** and not just anonymous visits.

---

## 1. No anonymous traffic without capture

- Every share, post, or DM should point to a page with **some way to raise a hand**:  
  - `/prelaunch` (email waitlist) is the default.  
  - For DMs, a direct “reply yes” is enough to count as interest.\
- If you share a raw URL (e.g. repo link), follow up with a soft question or the prelaunch link.

---

## 2. Always ask “Where did you find this?”

- When someone signs up, replies, or DMs you, ask some version of:  
  - “Out of curiosity, where did you first see this?”  
- Use the answer to fill the `source` field in `/data/audience.csv` (e.g. `x`, `linkedin`, `friend`, `discord`, `github`).  
- This keeps the **traffic engines** honest and helps decide what to do more of.

---

## 3. Every DM ends with a soft waitlist CTA

- Default closing line in a relevant conversation:  
  - “If you want first access on 21.12, you can drop your email here: https://www.golocapo.com/prelaunch”  
- If they don’t want to share email yet, that’s fine – log them in `audience.csv` with `intent=low` and a note.

---

## 4. Update the audience file continuously

- After each small outreach block (posts + DMs), spend 5 minutes updating `/data/audience.csv`.  
- Keep entries lean but specific:
  - `intent=low` – liked a tweet or accepted a DM.  
  - `intent=medium` – asked a question or expressed curiosity.  
  - `intent=high` – explicitly asked for a demo, offer, or early access.  

---

## 5. No vanity numbers

- Do not add “followers”, “impressions”, or “views” unless they turned into **named contacts**.  
- The only numbers that matter here: how many people you can **email or DM** with context.


