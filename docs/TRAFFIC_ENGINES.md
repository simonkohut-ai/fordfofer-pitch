# Traffic Engines (No Ads)

Zero‑budget, repeatable ways to turn attention into audience entries in `/data/audience.csv`.

---

## Engine 1 – Personal Authority

**Input**  
- 1 short idea or observation per day about building GoLoCapo (system design, launch lessons, failures, etc.).  

**Action**  
- Post once per day on **X** or **LinkedIn** using copy from `assets/LAUNCH_COPY.md` or a variant.  
- Mention the 21.12 launch and link to `/prelaunch`.  
- Reply to any comments with genuine answers, not pitches.  

**Output**  
- People who like, comment, or DM you about the posts.  

**How it feeds the audience database**  
- Add anyone who replies or DMs to `/data/audience.csv` with:  
  - `source = x` or `linkedin`  
  - `first_seen = <today>`  
  - `intent = low/medium/high` based on the conversation.  

---

## Engine 2 – Product-as-Content

**Input**  
- The live `/prelaunch` page, screenshots, and honest updates from the repo.  

**Action**  
- Share **screenshots** of the live landing, countdown, or War Room (when ready) on social + in DMs.  
- Occasionally post small “build in public” notes: what changed in the repo today, what broke, what was fixed.  
- Always pair screenshots/updates with the `/prelaunch` link and the 21.12 message.  

**Output**  
- Curious onlookers who click through, sign up, or reply with questions.  

**How it feeds the audience database**  
- Waitlist signups flow into the leads system; periodically export or mirror them into `/data/audience.csv`.  
- People who comment “following this” or similar get added as audience entries with `notes` explaining context.\

---

## Engine 3 – Direct Outreach

**Input**  
- A small, curated list of founders, indie hackers, and small agencies you genuinely think could benefit.  

**Action**  
- Send **5–10 DMs per day** using the personal template in `assets/LAUNCH_COPY.md`.  
- Keep it short and respectful; no follow‑up pressure beyond one gentle nudge.\

**Output**  
- High‑signal replies: “yes, curious”, “send it on 21.12”, specific questions.  

**How it feeds the audience database**  
- Every DM thread with a real response becomes a row in `/data/audience.csv`.  
- Use `source = dm-x`, `dm-linkedin`, `dm-telegram`, etc.  
- Mark `intent` based on their tone and whether they explicitly ask to see more.  

---

## Looping the Engines

- Each engine drives **people** into the audience file, not just views.  
- Daily routine: run Engines 1–3 lightly, then spend a few minutes updating `/data/audience.csv`.  
- Over time, this creates a compounding list of people who know what GoLoCapo is before 21.12.


