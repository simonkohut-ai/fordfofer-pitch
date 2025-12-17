# Privacy Policy

**Last Updated:** December 2025  
**Service:** AI Marketing Studio by Golo Čapo

---

## 1. Information We Collect

### Data You Provide

- **Content:** Marketing content you generate through the Service
- **Meta Account Information:** When you connect your Meta account, we store:
  - Meta access tokens (encrypted)
  - Token expiration dates
  - Selected Facebook Page ID
  - Selected Instagram Business Account ID (if applicable)
  - User ID and name (from Meta)

### Automatically Collected Data

- **Usage Data:** Content generation events, posting attempts, errors
- **Technical Data:** IP address, browser type, device information
- **Event Logs:** Actions taken within the Service (without sensitive data)

---

## 2. How We Store Data

### Storage Location

- **Vercel KV (Redis)** or **Vercel Postgres** (encrypted at rest)
- **Server-side only** - No tokens or secrets stored client-side
- **HTTPS only** - All data transmission encrypted

### Data Retention

- **Meta Tokens:** Stored until you disconnect or tokens expire (60 days)
- **Event Logs:** Retained for 90 days, then automatically deleted
- **Generated Content:** Stored in your browser (localStorage), not on our servers

---

## 3. How We Use Data

We use your data to:

- Provide the Service (content generation, Meta posting)
- Improve the Service (error tracking, usage analytics)
- Ensure security (rate limiting, abuse prevention)
- Comply with legal obligations

**We do NOT:**

- Sell your data to third parties
- Use your data for advertising
- Share your Meta tokens with anyone
- Log tokens or secrets (security policy)

---

## 4. Data Security

### Security Measures

- **Encryption:** All data encrypted at rest (Vercel KV/Postgres)
- **HTTPS:** All data transmission encrypted
- **No Token Logging:** Tokens never logged or exposed
- **Rate Limiting:** Prevents abuse and protects your data
- **Input Validation:** Prevents injection attacks

### Security Headers

- Content-Security-Policy
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Referrer-Policy: strict-origin-when-cross-origin

---

## 5. Third-Party Services

### OpenAI

- We send your prompts to OpenAI API for content generation
- OpenAI's privacy policy applies: https://openai.com/privacy
- We do not store your prompts on OpenAI's servers beyond API calls

### Meta (Facebook/Instagram)

- We use Meta Graph API for posting and page management
- Meta's privacy policy applies: https://www.facebook.com/privacy
- We only access data you explicitly authorize

### Vercel

- Hosting and storage provided by Vercel
- Vercel's privacy policy applies: https://vercel.com/legal/privacy-policy

---

## 6. Your Rights

### Access

You can view your stored data by:
- Checking the Diagnostics panel in Automation Hub
- Reviewing event logs (last 50 events)

### Deletion

To request data deletion:

1. **Disconnect Meta Account:** Use "Disconnect" button in Automation Hub
2. **Clear Local Data:** Clear browser localStorage
3. **Contact Us:** Request complete account deletion

**Note:** Some data may be retained for legal compliance (e.g., transaction records).

---

## 7. Cookies & Local Storage

We use:

- **localStorage:** Stores your preferences and chat history (browser-only)
- **No tracking cookies:** We do not use third-party tracking cookies

---

## 8. Children's Privacy

This Service is not intended for users under 18 years of age. We do not knowingly collect data from children.

---

## 9. International Data Transfers

Data may be processed and stored in:

- **United States** (Vercel, OpenAI)
- **European Union** (if using EU-based Vercel regions)

By using the Service, you consent to these transfers.

---

## 10. Changes to Privacy Policy

We may update this Privacy Policy. Continued use after changes constitutes acceptance.

---

## 11. Contact

For privacy questions or data deletion requests, contact: [Contact information]

---

**By using this Service, you acknowledge that you have read and understood this Privacy Policy.**

