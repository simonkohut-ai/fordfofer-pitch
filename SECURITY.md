# Security Overview (Repo‑Level)

**Last Updated:** December 2025  
**Project:** GoLoCapo / Fordfofer – AI Marketing Studio

This is a high‑level security note for the repository.  
For implementation‑level details, see `dashboard/SECURITY.md`.

---

## Principles

- **Server‑side secrets:** All API keys, tokens, and webhook secrets are expected to be stored in environment variables (Vercel, local `.env`), never committed to git.  
- **HTTPS‑only:** The production deployment is expected to be served via HTTPS (Vercel default).  
- **Least privilege:** Only the minimal scopes needed for Stripe, Meta, and email providers should be granted.

---

## Data Protection

- Meta tokens, Stripe secrets, and email API keys are never logged intentionally.  
- Sensitive values should not appear in console logs, error messages, or client‑side JavaScript.  
- Serverless functions under `dashboard/api/` use helper utilities to apply security headers and rate limiting.

---

## Reporting Issues

If you discover a security issue in this repo:

1. Do **not** open a public GitHub issue with sensitive details.  
2. Contact the maintainer privately (placeholder: `security@golocapo.com`).  
3. Provide enough detail to reproduce the issue safely.  

The maintainer should aim to acknowledge reports within 48 hours and fix valid issues as soon as practical.

---

## References

- Detailed integration notes: `dashboard/SECURITY.md`.  
- Privacy considerations: `PRIVACY.md` and `dashboard/PRIVACY.md`.  


