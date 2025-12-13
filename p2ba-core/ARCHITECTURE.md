# 🏗️ P2BA Core Architecture Documentation

## System Overview

P2BA Core is built on an **agentic architecture** where specialized AI agents collaborate to transform natural language prompts into fully functional businesses.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────┐
│           BusinessAgentManager (Orchestrator)           │
│  • Analyzes prompts                                      │
│  • Coordinates agents                                    │
│  • Manages project lifecycle                            │
└──────────────┬──────────────────────────────────────────┘
               │
       ┌───────┴───────┐
       │               │
       ▼               ▼
┌─────────────┐  ┌─────────────┐  ┌─────────────┐
│ CodeAgent   │  │MarketingAgent│  │Integration │
│             │  │             │  │   Agent    │
│ • Generate  │  │ • Content   │  │ • APIs     │
│ • Deploy    │  │ • SEO       │  │ • Email    │
│ • Refactor  │  │ • Strategy  │  │ • Images   │
└──────┬──────┘  └──────┬──────┘  └──────┬──────┘
       │                 │                │
       └─────────────────┴────────────────┘
                    │
                    ▼
         ┌──────────────────────┐
         │  Business Schema     │
         │  (JSON Structure)    │
         └──────────────────────┘
```

## Component Details

### 1. BusinessAgentManager

**Role:** Master orchestrator and command processor

**Responsibilities:**
- Parse natural language commands
- Determine business type (dropshipping, e-commerce, influencer, SaaS)
- Initialize project schema
- Coordinate agent workflow
- Track project state

**Key Methods:**
```typescript
executeP2BA(command: string): Promise<P2BAResult>
analyzeCommand(command: string): CommandAnalysis
initializeProject(analysis: CommandAnalysis): Promise<NewBusinessLaunch>
```

**Workflow Orchestration:**
1. Analyze prompt → Identify business type
2. Create project → Initialize schema
3. Delegate to MarketingAgent → Generate strategy
4. MarketingAgent → IntegrationAgent → Generate assets
5. IntegrationAgent → CodeAgent → Setup deployment
6. CodeAgent → Deploy to Vercel
7. IntegrationAgent → Setup e-commerce
8. IntegrationAgent → Launch campaigns

### 2. CodeAgent

**Role:** Code generation and deployment specialist

**Capabilities:**
- Generate HTML/CSS/JavaScript
- Create Vercel deployment configs
- Handle Git operations
- Refactor existing code
- Manage file structures

**Key Methods:**
```typescript
generateCode(project: NewBusinessLaunch): Promise<CodeResult>
deployToVercel(project, files): Promise<DeploymentResult>
refactorCode(filePath, instructions): Promise<RefactorResult>
commitAndPush(project, message): Promise<GitResult>
```

**Output:**
- Complete file structure
- Deployment configuration
- Production-ready code

### 3. MarketingAgent

**Role:** Content strategy and marketing automation

**Capabilities:**
- SEO optimization
- Content planning
- Social media strategy
- Email campaign templates
- Influencer persona development

**Key Methods:**
```typescript
generateMarketingStrategy(project): Promise<MarketingStrategy>
generateSEOContent(project, type): Promise<SEOContent>
generateInfluencerContent(project): Promise<InfluencerContent>
```

**Output:**
- Content calendar (30+ days)
- SEO keywords and meta tags
- Social media post templates
- Email campaign sequences

### 4. IntegrationAgent

**Role:** External API integration specialist

**Capabilities:**
- Email service integration (Mailchimp, SendGrid)
- Image generation (DALL-E, Midjourney)
- E-commerce platform setup (Shopify, WooCommerce)
- Social media API calls (Instagram, TikTok, Twitter)
- Payment processing (Stripe, PayPal)

**Key Methods:**
```typescript
sendEmail(project, emailData): Promise<EmailResult>
generateImage(project, prompt): Promise<ImageResult>
setupEcommerce(project): Promise<EcommerceResult>
postToSocialMedia(project, platform, content): Promise<SocialResult>
setupPaymentProcessing(project): Promise<PaymentResult>
```

**Output:**
- API credentials and configurations
- Generated assets (images, videos)
- Integrated service accounts

## Data Flow

### Command Processing Flow

```
User Prompt
    ↓
BusinessAgentManager.analyzeCommand()
    ↓
Command Analysis (type, keywords, intent)
    ↓
BusinessAgentManager.initializeProject()
    ↓
NewBusinessLaunch Schema
    ↓
┌─────────────────────────────────────┐
│  Parallel Agent Execution           │
├─────────────────────────────────────┤
│  MarketingAgent → Strategy          │
│  IntegrationAgent → Assets          │
│  CodeAgent → Website                │
└─────────────────────────────────────┘
    ↓
BusinessAgentManager.executeP2BA()
    ↓
Complete Business Deployment
```

### Agent Communication Pattern

```
BusinessAgentManager
    │
    ├─→ MarketingAgent.generateStrategy()
    │       │
    │       └─→ IntegrationAgent.generateImage()
    │               │
    │               └─→ CodeAgent.generateCode()
    │
    ├─→ IntegrationAgent.setupEcommerce()
    │       │
    │       └─→ CodeAgent.deployToVercel()
    │
    └─→ IntegrationAgent.sendEmail()
```

## Business Schema Structure

The `NewBusinessLaunch` schema is the central data structure:

```typescript
{
  // Core Identity
  projectName, projectId, status
  
  // Target Audience (3 levels)
  targetAudience: {
    demographics,    // Age, location, income
    psychographics,  // Interests, values, pain points
    behavior         // Channels, buying habits
  }
  
  // Business-Specific Configs
  dropshipProductCategory?    // For e-commerce
  aiInfluencerPersona?        // For influencer campaigns
  emailCampaignGoal?          // For email marketing
  
  // Strategy
  marketingStrategy
  technicalConfig
}
```

## Error Handling

Each agent implements try-catch blocks and returns structured error responses:

```typescript
{
  success: boolean
  error?: string
  workflow: string[]  // Tracks all steps attempted
}
```

## Scalability Considerations

### Current Architecture (Phase 1)
- Single-threaded execution
- Sequential agent calls
- In-memory project storage

### Future Enhancements (Phase 2+)
- Parallel agent execution
- Database persistence
- Queue-based task processing
- Real-time progress updates
- Multi-tenant support

## Security

- API keys stored in environment variables
- No sensitive data in code
- Secure deployment tokens
- Input validation on all commands

## Performance

- Agent methods are async/await
- Non-blocking operations
- Efficient data structures
- Minimal external dependencies

---

**Architecture Version:** 1.0.0  
**Last Updated:** 2024-12-12  
**Status:** Phase 1 Complete ✅

