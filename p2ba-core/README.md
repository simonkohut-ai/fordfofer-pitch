# 👑 P2BA Core - Prompt-to-Business Automation Platform

**Chiara's World** - Autonomous AI Platform for Business Creation

## 🎯 Overview

P2BA Core is an autonomous AI platform that transforms natural language prompts into fully functional businesses. Simply describe what you want, and the system handles code generation, marketing strategy, integrations, and deployment.

## 🏗️ Architecture

### Core Components

1. **BusinessAgentManager** - Master orchestrator
   - Analyzes natural language commands
   - Coordinates all agents
   - Manages project lifecycle

2. **CodeAgent** - Code generation & deployment
   - Generates HTML, CSS, JavaScript
   - Creates Vercel deployment configs
   - Handles Git operations

3. **MarketingAgent** - Content & strategy
   - SEO optimization
   - Social media content planning
   - Email campaign templates
   - Influencer persona development

4. **IntegrationAgent** - External APIs
   - Email services (Mailchimp, SendGrid)
   - Image generation (DALL-E, Midjourney)
   - E-commerce platforms (Shopify, WooCommerce)
   - Social media APIs (Instagram, TikTok)

## 📊 Business Schema

Every business project follows the `NewBusinessLaunch` schema:

```typescript
{
  projectName: string;
  targetAudience: { demographics, psychographics, behavior };
  dropshipProductCategory?: { category, priceRange, supplierRequirements };
  aiInfluencerPersona?: { name, niche, personality, contentStrategy };
  emailCampaignGoal?: { primaryGoal, targetMetrics, campaignType };
  marketingStrategy?: { channels, budget, kpis };
  technicalConfig?: { platform, domain, integrations };
}
```

## 🚀 Quick Start

### Installation

```bash
cd p2ba-core
npm install
npm run build
```

### Usage

```typescript
import { BusinessAgentManager } from './src/core/BusinessAgentManager.js';

const manager = new BusinessAgentManager();

// Execute P2BA command
const result = await manager.executeP2BA(
  "Create a dropshipping store for eco-friendly fitness gear"
);

console.log(result);
```

### Example Commands

- `"Create a dropshipping store for eco-friendly fitness gear"`
- `"Launch an influencer marketing campaign for sustainable products"`
- `"Build an e-commerce store selling tech accessories"`
- `"Start a SaaS platform for project management"`

## 🔄 Workflow

When you execute a P2BA command, the system follows this workflow:

1. **Analyze Prompt** - Understands business type and requirements
2. **Create Project** - Initializes business schema
3. **Marketing Strategy** - MarketingAgent generates content plan
4. **Asset Generation** - IntegrationAgent creates images/content
5. **Code Generation** - CodeAgent builds website/store
6. **Deployment** - CodeAgent deploys to Vercel
7. **Integration Setup** - IntegrationAgent configures APIs
8. **Campaign Launch** - Email and social media campaigns activated

## 📁 Project Structure

```
p2ba-core/
├── src/
│   ├── core/
│   │   └── BusinessAgentManager.ts    # Master orchestrator
│   ├── agents/
│   │   ├── CodeAgent.ts              # Code generation
│   │   ├── MarketingAgent.ts         # Marketing strategy
│   │   └── IntegrationAgent.ts      # External APIs
│   ├── types/
│   │   └── BusinessSchema.ts        # Business data schema
│   └── index.ts                     # Entry point
├── package.json
├── tsconfig.json
└── README.md
```

## 🎨 Features

- ✅ **Natural Language Processing** - Understands business requirements from text
- ✅ **Autonomous Code Generation** - Creates production-ready code
- ✅ **Marketing Automation** - Generates SEO, content, and campaigns
- ✅ **Multi-Agent Coordination** - Agents work together seamlessly
- ✅ **Deployment Automation** - One-click Vercel deployment
- ✅ **E-commerce Integration** - Ready-to-use store setup

## 🔧 Configuration

### Environment Variables

Create `.env` file:

```env
ANTHROPIC_API_KEY=your_key_here
OPENAI_API_KEY=your_key_here
VERCEL_TOKEN=your_token_here
```

## 📝 Development

### Build

```bash
npm run build
```

### Run

```bash
npm start
```

### Development Mode

```bash
npm run dev
```

## 🚧 Current Status

**Phase 1: Architecture Complete** ✅
- BusinessAgentManager implemented
- Three specialized agents created
- Business schema defined
- Workflow orchestration working

**Next Phases:**
- Phase 2: AI Model Integration (Opus 4.5)
- Phase 3: Real API Connections
- Phase 4: Advanced Business Logic
- Phase 5: Production Deployment

## 📚 Documentation

- [Business Schema](./docs/BusinessSchema.md)
- [Agent API Reference](./docs/Agents.md)
- [Workflow Guide](./docs/Workflow.md)

## 🤝 Contributing

This is a Chiara's World internal project. For questions, contact the development team.

## 📄 License

MIT License - Chiara's World

---

**Built with ❤️ by Chiara's World P2BA Team**

