#!/bin/bash

# 🚀 P2BA Console - Deployment Script
# Automatizuje proces nasadenia na Vercel

set -e

echo "🚀 P2BA Console - Deployment Script"
echo "===================================="
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo -e "${YELLOW}⚠️  Vercel CLI not found. Installing...${NC}"
    npm install -g vercel
fi

# Check if logged in
if ! vercel whoami &> /dev/null; then
    echo -e "${YELLOW}⚠️  Not logged in to Vercel. Please login...${NC}"
    vercel login
fi

echo -e "${GREEN}✅ Vercel CLI ready${NC}"
echo ""

# Build p2ba-core first
echo "📦 Building p2ba-core..."
cd ../p2ba-core
npm install
npm run build
echo -e "${GREEN}✅ p2ba-core built${NC}"
echo ""

# Return to p2ba-console
cd ../p2ba-console

# Check if .env.example exists
if [ ! -f "../p2ba-core/.env.example" ]; then
    echo -e "${RED}❌ .env.example not found in p2ba-core${NC}"
    exit 1
fi

echo -e "${YELLOW}📋 Environment Variables Checklist:${NC}"
echo "Make sure you have set these in Vercel:"
echo "  - EMAIL_PROVIDER"
echo "  - MAILGUN_API_KEY"
echo "  - MAILGUN_DOMAIN"
echo "  - OPENAI_API_KEY"
echo "  - BUFFER_ACCESS_TOKEN"
echo "  - BUFFER_INSTAGRAM_PROFILE_ID"
echo "  - BUFFER_TWITTER_PROFILE_ID"
echo "  - SHOPIFY_SHOP_NAME"
echo "  - SHOPIFY_ACCESS_TOKEN"
echo "  - ANTHROPIC_API_KEY"
echo "  - EMAIL_FROM"
echo "  - EMAIL_FROM_NAME"
echo ""

read -p "Have you set all environment variables in Vercel? (y/n) " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${YELLOW}⚠️  Please set environment variables first:${NC}"
    echo "  1. Go to Vercel Dashboard"
    echo "  2. Select your project"
    echo "  3. Go to Settings → Environment Variables"
    echo "  4. Add all required variables"
    echo ""
    echo "Or use: vercel env add VARIABLE_NAME production"
    exit 1
fi

# Deploy to production
echo "🚀 Deploying to Vercel..."
vercel --prod

echo ""
echo -e "${GREEN}✅ Deployment complete!${NC}"
echo ""
echo "Next steps:"
echo "  1. Visit your Vercel URL"
echo "  2. Test the P2BA Console"
echo "  3. Run your first command!"
echo ""

