# 🚀 P2BA Core - Production Integration Guide

## Overview

This guide explains how to configure P2BA Core for production use with real API integrations.

## ✅ Completed Integrations

### 1. Email Service (Production Ready)

**Providers Supported:**
- ✅ Mailgun (Primary)
- ✅ SendGrid (Alternative)

**Configuration:**
```env
EMAIL_PROVIDER=mailgun
MAILGUN_API_KEY=your_key
MAILGUN_DOMAIN=your_domain
```

**Features:**
- Batch email sending
- HTML and text support
- CC/BCC support
- Attachment support (via Mailgun)
- Automatic fallback to test mode if no API key

### 2. Image Generation (Production Ready)

**Providers Supported:**
- ✅ OpenAI DALL-E 3 (Primary)
- ✅ Stability AI (Alternative)

**Configuration:**
```env
OPENAI_API_KEY=your_key
# OR
STABILITY_API_KEY=your_key
```

**Features:**
- Real AI-generated images
- Automatic provider fallback
- High-quality 1024x1024 images
- Placeholder fallback if no API key

### 3. Social Media Scheduling (Production Ready)

**Provider:**
- ✅ Buffer API

**Configuration:**
```env
BUFFER_ACCESS_TOKEN=your_token
BUFFER_INSTAGRAM_PROFILE_ID=profile_id
BUFFER_TWITTER_PROFILE_ID=profile_id
BUFFER_TIKTOK_PROFILE_ID=profile_id
BUFFER_FACEBOOK_PROFILE_ID=profile_id
BUFFER_LINKEDIN_PROFILE_ID=profile_id
```

**Features:**
- Real post scheduling
- Multi-platform support
- Image + caption support
- Auto-scheduling via Buffer

### 4. E-commerce Platform (Production Ready)

**Providers Supported:**
- ✅ Shopify (Primary)
- ✅ WooCommerce (Alternative)

**Configuration:**
```env
ECOMMERCE_PLATFORM=shopify
SHOPIFY_SHOP_NAME=your_shop
SHOPIFY_ACCESS_TOKEN=your_token
```

**Features:**
- Real store creation/verification
- Product management
- Inventory tracking
- Mock mode fallback

## 📋 Setup Instructions

### Step 1: Get API Keys

1. **Mailgun:**
   - Sign up at mailgun.com
   - Verify domain
   - Get API key from dashboard

2. **OpenAI DALL-E:**
   - Sign up at openai.com
   - Add payment method
   - Get API key from dashboard

3. **Buffer:**
   - Sign up at buffer.com
   - Connect social accounts
   - Get access token from API settings
   - Get profile IDs from API response

4. **Shopify:**
   - Create Shopify store
   - Create private app
   - Get access token

### Step 2: Configure Environment Variables

1. Copy `.env.example` to `.env`
2. Fill in all API keys
3. Test each service individually

### Step 3: Test Integrations

```bash
# Test email service
npm run test:email

# Test image generation
npm run test:images

# Test Buffer scheduling
npm run test:buffer

# Test Shopify
npm run test:shopify
```

## 🔒 Security Best Practices

1. **Never commit `.env` file**
   - Already in `.gitignore`
   - Use Vercel environment variables for deployment

2. **Use separate API keys for dev/prod**
   - Different keys for testing vs production
   - Rotate keys regularly

3. **Limit API key permissions**
   - Only grant necessary permissions
   - Use read-only keys where possible

4. **Monitor API usage**
   - Set up alerts for unusual activity
   - Track costs per service

## 🚀 Vercel Deployment

### Setting Environment Variables in Vercel

1. Go to Vercel Dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add each variable from `.env.example`

### Required Variables for Production

**Minimum Required:**
- `EMAIL_PROVIDER`
- `MAILGUN_API_KEY` or `SENDGRID_API_KEY`
- `MAILGUN_DOMAIN`
- `OPENAI_API_KEY` or `STABILITY_API_KEY`
- `BUFFER_ACCESS_TOKEN`
- `ANTHROPIC_API_KEY`

**Optional (for full functionality):**
- All Buffer profile IDs
- Shopify/WooCommerce credentials
- `EMAIL_FROM`, `EMAIL_FROM_NAME`

## 📊 API Rate Limits

### Mailgun
- Free tier: 5,000 emails/month
- Paid: Based on plan

### OpenAI DALL-E
- DALL-E 3: ~$0.04 per image
- Rate limits: Check OpenAI dashboard

### Buffer
- Free tier: 3 social accounts
- Paid: Unlimited accounts

### Shopify
- API rate limit: 2 requests/second
- Burst: 40 requests

## 🐛 Troubleshooting

### Email Not Sending

**Check:**
1. API key is correct
2. Domain is verified (Mailgun)
3. From address is authorized
4. Check Mailgun/SendGrid logs

### Images Not Generating

**Check:**
1. OpenAI API key has credits
2. DALL-E 3 is available in your region
3. Prompt is within 1000 character limit
4. Check OpenAI dashboard for errors

### Buffer Posts Not Scheduling

**Check:**
1. Access token is valid
2. Profile IDs are correct
3. Accounts are connected in Buffer
4. Check Buffer API logs

### Shopify Products Not Adding

**Check:**
1. Access token has write permissions
2. Store name is correct
3. API version is compatible
4. Check Shopify API logs

## 📚 API Documentation Links

- [Mailgun API Docs](https://documentation.mailgun.com/)
- [OpenAI DALL-E API](https://platform.openai.com/docs/guides/images)
- [Buffer API Docs](https://buffer.com/developers/api)
- [Shopify Admin API](https://shopify.dev/api/admin-rest)
- [WooCommerce REST API](https://woocommerce.github.io/woocommerce-rest-api-docs/)

## ✅ Production Checklist

- [ ] All API keys configured
- [ ] Environment variables set in Vercel
- [ ] Email service tested
- [ ] Image generation tested
- [ ] Buffer scheduling tested
- [ ] E-commerce platform tested
- [ ] Rate limits understood
- [ ] Monitoring set up
- [ ] Error handling verified
- [ ] Fallback modes tested

---

**Status:** ✅ Production Ready

All core functions are now configured to accept and use production API credentials.

