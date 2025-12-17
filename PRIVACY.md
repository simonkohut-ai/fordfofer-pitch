# Privacy Policy (Repo‑Level Summary)

**Last Updated:** December 2025  
**Project:** GoLoCapo / Fordfofer – AI Marketing Studio

This file summarizes how the system is intended to handle data.  
For full details, see `dashboard/PRIVACY.md` (implementation‑level policy).

---

## 1. What This Project Stores

- **Leads & customers:** email addresses and basic metadata for people who opt in or pay.  
- **Usage data:** aggregate counters (leads, customers, revenue) and recent events for the War Room view.  
- **Integration tokens:** Meta access tokens, Stripe webhook secrets, and email provider keys – stored server‑side only.  

No attempt is made to infer sensitive attributes (e.g., health, religion, politics).

---

## 2. Where Data Lives

- Hosting and storage are provided by **Vercel** (KV/Postgres/memory fallback).  
- All network traffic is expected to go over **HTTPS** only.  
- Tokens and secrets are kept in **environment variables** and not committed to this repo.

---

## 3. Third‑Party Services

This project integrates with:

- **Stripe** – for payments and webhooks.  
- **OpenAI** – for AI‑generated content.  
- **Meta Graph API** – for optional Facebook/Instagram posting.  
- **Resend (or similar)** – for transactional emails.  

Each service has its own privacy policy; use of this project should comply with those terms.

---

## 4. Developer Responsibilities

If you deploy or modify this project, you are responsible for:

- Configuring environment variables safely (no keys in source control).  
- Adding your own legal pages (Terms, Privacy, Refund) that match how you actually use data.  
- Auditing any changes to API routes that touch personal data.

---

## 5. Contact

For questions about privacy when this system is used as a product, refer to the contact information in `dashboard/PRIVACY.md` or your own deployment’s legal pages.


