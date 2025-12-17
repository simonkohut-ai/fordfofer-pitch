# Environment Variables

## Required Environment Variables

Copy these to your Vercel project settings or `.env` file:

```bash
# Email Configuration (Resend)
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxx
RESEND_FROM_EMAIL=Golo Čapo <noreply@golocapo.com>
LEADS_TO_EMAIL=your-email@example.com

# Stripe Configuration
STRIPE_CHECKOUT_URL=https://buy.stripe.com/test_xxxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxxxxxxxxxx
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxxxxxxxxxx

# Analytics (PostHog)
POSTHOG_KEY=phc_xxxxxxxxxxxxxxxxxxxxx

# OpenAI (for AI Marketing Engine)
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxx
OPENAI_MODEL=gpt-4o-mini                    # Default: gpt-4o-mini
OPENAI_TEMPERATURE=0.7                       # Default: 0.7 (sales-optimized)

# Domain
DOMAIN=https://www.golocapo.com

# Environment
NODE_ENV=production
```

---

## How to Set in Vercel

1. Go to Vercel Dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add each variable
5. Redeploy

---

## How to Get API Keys

### Resend API Key

1. Sign up at https://resend.com
2. Go to API Keys
3. Create new API key
4. Copy key

### Stripe Payment Link

1. Go to Stripe Dashboard
2. Products → Create Product
3. Create Payment Link
4. Copy Payment Link URL

### PostHog Key

1. Sign up at https://posthog.com
2. Create Project
3. Go to Project Settings
4. Copy API Key

### OpenAI API Key

1. Sign up at https://platform.openai.com
2. Go to API Keys
3. Create new API key
4. Copy key (starts with `sk-`)
5. (Optional) Set `OPENAI_MODEL` = `gpt-4o-mini` (default)
6. (Optional) Set `OPENAI_TEMPERATURE` = `0.7` (sales-optimized)

---

## Testing

After setting environment variables:

1. Redeploy on Vercel
2. Test email capture
3. Test Stripe checkout
4. Verify analytics tracking

---

## Security Notes

- Never commit `.env` files to Git
- Use Vercel Environment Variables for production
- Rotate API keys regularly
- Use test keys for development

