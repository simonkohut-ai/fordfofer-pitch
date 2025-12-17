# Client Microsites - Review & Deployment

**Status:** ✅ Review-Ready  
**Clients:** MikoRK (Pohrebníctvo), Komfortreality (Real Estate)

---

## Files Created/Modified

### Client Pages (6 files)

**MikoRK:**
1. `clients/mikork/index.html` - Homepage
2. `clients/mikork/sluzby.html` - Services page
3. `clients/mikork/kontakt.html` - Contact page with lead form

**Komfortreality:**
4. `clients/komfortreality/index.html` - Homepage
5. `clients/komfortreality/sluzby.html` - Services page
6. `clients/komfortreality/kontakt.html` - Contact page with lead form

### API Endpoints (1 file)

7. `api/leads/submit-client.mjs` - Client lead submission endpoint

### Modified Files (4 files)

8. `api/utils/email.mjs` - Added client confirmation email template
9. `api/utils/leads-storage.mjs` - Extended lead model (name, phone, message, brand)
10. `api/leads/status.mjs` - Added byBrand grouping
11. `dashboard.js` - Added client leads by brand display in Growth panel
12. `war-room.html` - Added client leads by brand display
13. `vercel.json` - Added routes for all client pages + API endpoint

**Total: 13 files created/modified**

---

## URLs

### Local Development

**MikoRK:**
- `http://localhost:3000/clients/mikork` - Homepage
- `http://localhost:3000/clients/mikork/sluzby` - Services
- `http://localhost:3000/clients/mikork/kontakt` - Contact

**Komfortreality:**
- `http://localhost:3000/clients/komfortreality` - Homepage
- `http://localhost:3000/clients/komfortreality/sluzby` - Services
- `http://localhost:3000/clients/komfortreality/kontakt` - Contact

### Production

**MikoRK:**
- `https://golocapo.com/clients/mikork`
- `https://golocapo.com/clients/mikork/sluzby`
- `https://golocapo.com/clients/mikork/kontakt`

**Komfortreality:**
- `https://golocapo.com/clients/komfortreality`
- `https://golocapo.com/clients/komfortreality/sluzby`
- `https://golocapo.com/clients/komfortreality/kontakt`

---

## Lead Capture

### Form Fields

- **Name** (required)
- **Email** (required)
- **Phone** (optional)
- **Message** (required)
- **GDPR Consent** (required checkbox)

### Submission

- **Endpoint:** `/api/leads/submit-client`
- **Method:** POST
- **Payload:**
  ```json
  {
    "brand": "mikork" | "komfortreality",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+421..." (optional),
    "message": "Interested in...",
    "consent": true
  }
  ```

### Storage

- Stored as lead with tags: `["client", "mikork"]` or `["client", "komfortreality"]`
- Source: `"client_site"`
- Additional fields: `name`, `phone`, `message`, `brand`

### Email Confirmation

- Sends confirmation email if `RESEND_API_KEY` is set
- Template: `client-confirmation`
- Subject: "Ďakujeme za správu"

---

## Admin Visibility

### Automation Hub

**Growth Panel** shows:
- Total Leads
- Total Customers
- Conversion Rate
- Prelaunch Leads
- **Client Leads by Brand** (new)
  - mikork: X leads
  - komfortreality: X leads

### War Room

**Growth Card** shows:
- All growth metrics
- **Client Leads by Brand** (new)
  - mikork: X leads
  - komfortreality: X leads

---

## Design

### Consistent Design System

- **Theme:** Dark (#0f172a background, #1e293b surface)
- **Primary Color:** #667eea
- **Typography:** System fonts (Inter, Roboto, Segoe UI)
- **Spacing:** Consistent 16px/24px/32px/48px/80px
- **Components:** Cards, buttons, forms, trust blocks

### Features

- ✅ Professional agency-grade layout
- ✅ Trust blocks (stats, testimonials)
- ✅ Clear CTAs
- ✅ Footer with Terms/Privacy links
- ✅ Mobile responsive
- ✅ Sticky navigation
- ✅ Form validation
- ✅ Success/error messages

---

## Testing

### Test Lead Submission

```bash
# Test MikoRK form
curl -X POST http://localhost:3000/api/leads/submit-client \
  -H "Content-Type: application/json" \
  -d '{
    "brand": "mikork",
    "name": "Test User",
    "email": "test@example.com",
    "phone": "+421123456789",
    "message": "Test message",
    "consent": true
  }'

# Test Komfortreality form
curl -X POST http://localhost:3000/api/leads/submit-client \
  -H "Content-Type: application/json" \
  -d '{
    "brand": "komfortreality",
    "name": "Test User",
    "email": "test2@example.com",
    "message": "Interested in property",
    "consent": true
  }'
```

### Verify in Admin

1. Open `/dashboard` → Automation Hub
2. Check Growth panel for "Client Leads by Brand"
3. Verify leads appear with correct tags

---

## Deployment

### Vercel

Routes are configured in `vercel.json`. Deploy:

```bash
git add .
git commit -m "Add client microsites: MikoRK + Komfortreality"
git push origin main
```

### Environment Variables

No new env vars required. Uses existing:
- `RESEND_API_KEY` (optional, for email confirmation)

---

## Brand Identity

- **MikoRK:** Pohrebníctvo Ružomberok (funeral services)
- **Komfortreality:** Realitná kancelária (real estate)
- **Agency:** Golo Čapo (only in footer if needed, not prominent)

---

## Status

✅ **Review-Ready**

All pages created, forms functional, admin visibility added, routes configured.

**Next:** Deploy and test lead capture end-to-end.

