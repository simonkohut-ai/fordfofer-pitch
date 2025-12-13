# 🚀 P2BA - Prompt-to-Business Automation Platform

**Chiara's World - Autonomous AI Platform for Business Automation**

[![License: Proprietary](https://img.shields.io/badge/License-Proprietary-red.svg)](LICENSE)
[![Status: Production](https://img.shields.io/badge/Status-Production-green.svg)](https://github.com/simonkohut-ai/p2ba)
[![Private Repository](https://img.shields.io/badge/Repository-Private-orange.svg)](https://github.com/simonkohut-ai/p2ba)

---

## 🔒 Security Notice

**This is a private, proprietary repository.**
- ⚠️ **Access is restricted to authorized personnel only**
- 🔐 **All API keys and sensitive data are stored in environment variables**
- 🛡️ **Production deployments require authentication**

---

## 📋 Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Features](#features)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [Deployment](#deployment)
- [Security](#security)
- [License](#license)
- [Contact](#contact)

---

## 🎯 Overview

**P2BA (Prompt-to-Business Automation)** is an autonomous AI platform that transforms natural language commands into fully functional business operations. Built for **Chiara's World**, this system enables complete automation of:

- 🛒 **Dropshipping Store Creation**
- 📢 **AI Influencer Marketing Campaigns**
- 📧 **Email Marketing Automation**
- 🎨 **Content Generation (Images, Posts, Stories)**
- 💳 **Payment Processing (Unified Skrill Integration)**
- 📱 **Social Media Scheduling**

### Key Technologies

- **Backend:** Node.js, TypeScript
- **Frontend:** Next.js, React, Tailwind CSS
- **AI:** Anthropic Claude (Opus 4.5), OpenAI (DALL-E)
- **Deployment:** Vercel Serverless Functions
- **APIs:** Mailgun, SendGrid, Buffer, Shopify, WooCommerce

---

## 🏗️ Architecture

### Core Components

```
p2ba/
├── p2ba-core/          # Backend logic & agents
│   ├── src/
│   │   ├── core/      # BusinessAgentManager
│   │   ├── agents/     # CodeAgent, MarketingAgent, IntegrationAgent
│   │   ├── services/  # EmailService, PaymentService, DropshipManager
│   │   └── types/      # Business schemas
│   └── dist/          # Compiled TypeScript
│
├── p2ba-console/      # Frontend Next.js app
│   ├── app/           # Next.js App Router
│   ├── components/     # React components
│   └── api/           # Serverless API routes
│
└── landing-page/      # Marketing landing pages
```

### Agent System

1. **BusinessAgentManager** - Master orchestrator
   - Analyzes natural language commands
   - Delegates tasks to specialized agents
   - Manages project lifecycle

2. **CodeAgent** - Code generation & deployment
   - Generates storefront code
   - Handles Vercel deployments
   - Manages technical infrastructure

3. **MarketingAgent** - Content & strategy
   - Generates marketing copy
   - Creates AI influencer personas
   - Develops SEO strategies

4. **IntegrationAgent** - External API integration
   - Email campaigns (Mailgun/SendGrid)
   - Social media scheduling (Buffer)
   - E-commerce setup (Shopify/WooCommerce)
   - Image generation (DALL-E/Stability AI)

---

## ✨ Features

### 🎨 AI Content Generation
- **Influencer Personas:** Generate unique AI influencer profiles
- **Social Media Posts:** Auto-generate Instagram, TikTok, Twitter content
- **Email Campaigns:** Create personalized email copy
- **Image Generation:** DALL-E integration for visual content

### 🛒 E-commerce Automation
- **Store Creation:** Automated Shopify/WooCommerce setup
- **Product Management:** Bulk product import
- **Payment Processing:** Unified Skrill payment gateway
- **Inventory Sync:** Real-time supplier integration

### 📧 Marketing Automation
- **Email Campaigns:** Batch email sending via Mailgun/SendGrid
- **Social Scheduling:** Buffer API integration
- **Multi-platform:** Instagram, TikTok, Twitter, LinkedIn, Facebook

### 💳 Payment Processing
- **Unified Gateway:** All payments route to Skrill
- **Multiple Methods:** Cards, Crypto, Bank Transfer, PayPal
- **Merchant API:** Automated payment processing
- **Hybrid Mode:** Manual confirmation fallback

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git
- GitHub account (for repository access)
- Vercel account (for deployment)

### Local Development

```bash
# Clone repository
git clone https://github.com/simonkohut-ai/p2ba.git
cd p2ba

# Install dependencies
cd p2ba-core
npm install
npm run build

cd ../p2ba-console
npm install

# Start development server
npm run dev
```

Open: http://localhost:3000

### Environment Variables

Create `.env` files in both `p2ba-core/` and `p2ba-console/`:

```env
# Email Service
EMAIL_PROVIDER=mailgun
MAILGUN_API_KEY=your_key
MAILGUN_DOMAIN=your_domain
EMAIL_FROM=gcapovic.biz@proton.me

# Payment
SKRILL_EMAIL=gcapovic.biz@proton.me

# AI Services
OPENAI_API_KEY=your_key
ANTHROPIC_API_KEY=your_key

# Social Media
BUFFER_ACCESS_TOKEN=your_token

# E-commerce
ECOMMERCE_PLATFORM=shopify
SHOPIFY_ACCESS_TOKEN=your_token
```

**Note:** See `DEPLOY_ENV_VARS.txt` for complete list.

---

## 📁 Project Structure

```
p2ba/
├── p2ba-core/                 # Backend core system
│   ├── src/
│   │   ├── core/
│   │   │   └── BusinessAgentManager.ts
│   │   ├── agents/
│   │   │   ├── CodeAgent.ts
│   │   │   ├── MarketingAgent.ts
│   │   │   └── IntegrationAgent.ts
│   │   ├── services/
│   │   │   ├── EmailService.ts
│   │   │   ├── PaymentService.ts
│   │   │   ├── DropshipManager.ts
│   │   │   └── AIInfluencerGenerator.ts
│   │   └── types/
│   │       └── BusinessSchema.ts
│   └── package.json
│
├── p2ba-console/              # Frontend application
│   ├── app/
│   │   ├── api/
│   │   │   └── p2ba-command/
│   │   │       └── route.ts
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── ChatInterface.tsx
│   │   ├── CommandInput.tsx
│   │   └── ChatMessage.tsx
│   └── package.json
│
├── landing-page/              # Marketing pages
│   ├── index.html
│   ├── links.html
│   └── about.html
│
├── automation/                # Automation scripts
├── design-pack/               # Brand assets
└── README.md
```

---

## ⚙️ Configuration

### Payment Configuration

All payments are processed through **Skrill**:

- **Email:** `gcapovic.biz@proton.me`
- **Methods:** Cards, Crypto, Bank Transfer, PayPal
- **Unified Gateway:** All methods redirect to Skrill

### Email Configuration

- **From Address:** `gcapovic.biz@proton.me`
- **Provider:** Mailgun (primary) / SendGrid (fallback)
- **Templates:** Custom HTML email templates

### Brand Configuration

- **Name:** Chiara's World
- **Email:** gcapovic.biz@proton.me
- **Design:** Soft Brutalism (Soft Blue, Warm Yellow)

---

## 🚀 Deployment

### Vercel Deployment

#### Automatic (Recommended)

```bash
# Run deployment script
DEPLOY_TO_VERCEL.bat
```

#### Manual

1. **Import to Vercel:**
   - Go to: https://vercel.com/new
   - Import: https://github.com/simonkohut-ai/p2ba

2. **Configure:**
   - **Root Directory:** `p2ba-console`
   - **Build Command:** `cd ../p2ba-core && npm install && npm run build && cd ../p2ba-console && npm install && npm run build`
   - **Output Directory:** `.next`

3. **Environment Variables:**
   - Add all variables from `DEPLOY_ENV_VARS.txt`
   - Set in Vercel Dashboard → Settings → Environment Variables

4. **Deploy:**
   - Click "Deploy"
   - Wait for build completion
   - Get production URL

### Security Setup

1. **Vercel Password Protection:**
   - Settings → Deployment Protection
   - Enable "Password Protection"
   - Set secure password

2. **Environment Variables:**
   - Never commit API keys
   - Use Vercel environment variables
   - Rotate keys regularly

---

## 🔒 Security

### Repository Security

- ✅ **Private Repository** - Access restricted
- ✅ **No API Keys in Code** - All in environment variables
- ✅ **GitHub Secret Scanning** - Enabled
- ✅ **.gitignore** - Comprehensive ignore rules

### Application Security

- 🔐 **Password Protection** - Vercel deployment protection
- 🔑 **Environment Variables** - Secure key management
- 🛡️ **API Rate Limiting** - Built-in protection
- 🔒 **HTTPS Only** - SSL/TLS encryption

### Best Practices

1. **Never commit:**
   - API keys
   - Passwords
   - `.env` files
   - Personal access tokens

2. **Always use:**
   - Environment variables
   - Secure password protection
   - Private repositories
   - Regular key rotation

---

## 📄 License

**PROPRIETARY LICENSE**

Copyright (c) 2025 Chiara's World / Goliáš Čapovič

All rights reserved.

This software and associated documentation files (the "Software") are proprietary and confidential. Unauthorized copying, modification, distribution, or use of this Software, via any medium, is strictly prohibited.

**Terms:**
- This Software is private and confidential
- Access is restricted to authorized personnel only
- Redistribution is prohibited
- Commercial use requires explicit permission
- No warranty or support provided

For licensing inquiries, contact: **gcapovic.biz@proton.me**

---

## 📞 Contact

**Chiara's World**
- **Email:** gcapovic.biz@proton.me
- **GitHub:** [simonkohut-ai/p2ba](https://github.com/simonkohut-ai/p2ba)
- **Repository:** Private (Access Restricted)

---

## 📚 Documentation

- [Quick Deploy Guide](QUICK_DEPLOY.md)
- [Local Testing Setup](LOCAL_TEST_SETUP.md)
- [Environment Variables](DEPLOY_ENV_VARS.txt)
- [Architecture Documentation](p2ba-core/ARCHITECTURE.md)
- [API Documentation](p2ba-core/README.md)

---

## 🎯 Status

- ✅ **Core System:** Complete
- ✅ **Frontend Console:** Complete
- ✅ **API Integration:** Complete
- ✅ **Payment Processing:** Complete
- ✅ **Email Automation:** Complete
- ✅ **Deployment:** Ready

**Version:** 1.0.0  
**Last Updated:** 2025-01-13  
**Status:** Production Ready

---

**⚠️ This is a private, proprietary system. Unauthorized access is prohibited.**
