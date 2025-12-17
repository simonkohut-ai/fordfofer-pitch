# MikoRK pohrebníctvo - Lead Flow

**Goal:** Handle leads respectfully and efficiently  
**Rule:** Privacy-first, GDPR respectful, minimal tracking  
**Last Updated:** 2025-12-17

---

## Lead Sources

### 1. Contact Form

**Location:** `/contact`

**Fields:**
- Name (required)
- Email (required)
- Phone (optional)
- Message (required)
- Consent checkbox (required)

**Process:**
1. Form submitted → API endpoint `/api/mikork/contact`
2. Email notification sent to business owner
3. No automated response to customer
4. Business owner responds personally

---

### 2. Phone Calls

**Tracking:**
- Click-to-call buttons tracked (minimal)
- No call recording
- No personal information stored

**Process:**
1. Customer clicks phone number
2. Call initiated
3. Business owner handles call personally

---

### 3. Email Inquiries

**Tracking:**
- Email clicks tracked (minimal)
- No personal information stored

**Process:**
1. Customer clicks email link
2. Email client opens
3. Business owner responds personally

---

## Lead Handling Process

### Step 1: Lead Capture

**Contact Form Submission:**
```javascript
POST /api/mikork/contact
{
  "name": "Customer Name",
  "email": "customer@email.sk",
  "phone": "+421 XXX XXX XXX",
  "message": "Customer message",
  "consent": true
}
```

**Validation:**
- All required fields present
- Email format valid
- Consent checkbox checked
- No spam patterns detected

---

### Step 2: Notification

**Email to Business Owner:**
```
Subject: Nový kontaktný formulár - MikoRK

Dobrý deň,

Máte nový kontaktný formulár na webe.

Meno: [name]
Email: [email]
Telefón: [phone]
Správa: [message]

Čas odoslania: [timestamp]

Prosím odpovedajte osobnou správou do 24 hodín.

---
MikoRK Automation System
```

**No Automated Response to Customer:**
- Customer receives confirmation on website
- No automated email sent
- Business owner responds personally

---

### Step 3: Response

**Business Owner:**
1. Receives email notification
2. Reviews inquiry
3. Responds personally via email or phone
4. Maintains human touch
5. Provides empathetic support

**Response Guidelines:**
- Respond within 24 hours
- Personal, not template
- Empathetic and understanding
- Professional but warm
- No sales pressure

---

## Data Storage

### Minimal Storage

**Stored:**
- Name
- Email
- Phone (if provided)
- Message
- Timestamp
- IP address (for spam prevention only)

**Not Stored:**
- Browsing history
- Personal preferences
- Grief-related searches
- Aggressive tracking data

---

## Privacy & GDPR

### Consent

**Required:**
- Explicit consent checkbox
- Clear privacy policy link
- Transparent data usage

**Privacy Policy Must Include:**
- What data is collected
- How data is used
- Data retention period
- Right to deletion
- Contact information

---

### Data Retention

**Retention Period:**
- Contact form submissions: 1 year
- Email notifications: 30 days
- Logs: 90 days

**Deletion:**
- Customer can request deletion
- Data deleted within 30 days
- Confirmation sent to customer

---

## Analytics

### Minimal Analytics

**Tracked:**
- Page views (anonymized)
- Contact form submissions (count only)
- Phone clicks (count only)
- Email clicks (count only)

**Not Tracked:**
- Personal information
- Browsing behavior
- Grief-related searches
- Aggressive user tracking

---

## API Endpoint

### Contact Form Endpoint

**Location:** `/api/mikork/contact`

**Method:** POST

**Request:**
```json
{
  "name": "Customer Name",
  "email": "customer@email.sk",
  "phone": "+421 XXX XXX XXX",
  "message": "Customer message",
  "consent": true
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Ďakujeme za vašu správu. Odpovieme vám čo najskôr."
}
```

**Response (Error):**
```json
{
  "success": false,
  "error": "Chyba pri odosielaní správy. Skúste to prosím znova."
}
```

---

## Implementation Checklist

- [ ] Contact form endpoint created
- [ ] Email notification system configured
- [ ] Privacy policy created
- [ ] Consent checkbox implemented
- [ ] GDPR compliance verified
- [ ] Data retention policy defined
- [ ] Analytics configured (minimal)
- [ ] Response guidelines documented

---

## Response Templates (Guidelines Only)

### Email Response Template

**Subject:** Re: Vaša správa - MikoRK pohrebníctvo

**Body:**
```
Vážený/Vážená [Name],

Ďakujeme za vašu správu. Sme tu pre vás.

[Personal response based on inquiry]

V prípade akýchkoľvek otázok nás neváhajte kontaktovať.

S úctou,
[MikoRK Team]
Telefón: +421 XXX XXX XXX
Email: info@mikork.sk
```

**Note:** This is a guideline only. All responses must be personal and tailored to the inquiry.

---

## Monitoring

### Key Metrics

**Track:**
- Contact form submissions (count)
- Response time (average)
- Customer satisfaction (if applicable)

**Review Monthly:**
- Lead quality
- Response times
- Customer feedback
- System effectiveness

---

**Remember:** Privacy-first, GDPR respectful, minimal tracking. All customer communication must be personal and human.

