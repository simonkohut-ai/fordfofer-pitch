/**
 * 👑 BusinessAgentManager
 * Master orchestrator for Prompt-to-Business Automation (P2BA)
 * Coordinates CodeAgent, MarketingAgent, and IntegrationAgent
 */

import { CodeAgent } from '../agents/CodeAgent.js';
import { MarketingAgent } from '../agents/MarketingAgent.js';
import { IntegrationAgent } from '../agents/IntegrationAgent.js';
import { NewBusinessLaunch, exampleBusinessLaunch } from '../types/BusinessSchema.js';

export class BusinessAgentManager {
  private codeAgent: CodeAgent;
  private marketingAgent: MarketingAgent;
  private integrationAgent: IntegrationAgent;
  private activeProjects: Map<string, NewBusinessLaunch> = new Map();

  constructor() {
    this.codeAgent = new CodeAgent();
    this.marketingAgent = new MarketingAgent();
    this.integrationAgent = new IntegrationAgent();
  }

  /**
   * 🎯 Main P2BA Execution Function
   * Processes natural language commands and orchestrates agent workflow
   */
  async executeP2BA(command: string): Promise<{
    success: boolean;
    projectId?: string;
    results?: any;
    workflow?: string[];
  }> {
    const workflow: string[] = [];
    let result: any = {};
    
    try {
      // Step 1: Analyze prompt
      workflow.push('📊 Analyzing prompt...');
      console.log(`\n${'='.repeat(60)}`);
      console.log(`[BusinessAgentManager] 🎯 P2BA Command: "${command}"`);
      console.log(`${'='.repeat(60)}\n`);
      
      const analysis = this.analyzeCommand(command);
      workflow.push(`✅ Command type identified: ${analysis.type}`);
      if (analysis.parameters) {
        console.log(`[BusinessAgentManager] 📋 Parameters:`, analysis.parameters);
      }
      
      // Step 2: Create or load project
      workflow.push('📝 Creating/loading project...');
      const project = await this.initializeProject(analysis);
      workflow.push(`✅ Project initialized: ${project.projectName} (${project.projectId})`);
      
      // Step 3: Delegate to MarketingAgent for strategy
      workflow.push('📢 Delegating to MarketingAgent...');
      console.log(`[BusinessAgentManager] → MarketingAgent: Generating marketing strategy`);
      const marketingStrategy = await this.marketingAgent.generateMarketingStrategy(project);
      workflow.push('✅ Marketing strategy generated');
      
      // Step 4: MarketingAgent calls IntegrationAgent for content assets
      workflow.push('🔌 MarketingAgent → IntegrationAgent: Requesting image generation...');
      console.log(`[MarketingAgent] → IntegrationAgent: Generate images for campaign`);
      const images = await this.integrationAgent.generateImage(
        project,
        `Professional product images for ${project.projectName}`,
        'modern-ecommerce'
      );
      workflow.push(`✅ Images generated: ${images.imageUrl}`);
      
      // Step 5: IntegrationAgent calls CodeAgent for deployment setup
      workflow.push('💻 IntegrationAgent → CodeAgent: Requesting deployment configuration...');
      console.log(`[IntegrationAgent] → CodeAgent: Setup deployment for ${project.projectName}`);
      const deploymentConfig = await this.codeAgent.generateCode(project);
      workflow.push('✅ Deployment configuration generated');
      
      // Step 6: CodeAgent generates and deploys
      workflow.push('🚀 CodeAgent: Deploying to Vercel...');
      console.log(`[CodeAgent] → Deploying ${project.projectName}...`);
      const deployment = await this.codeAgent.deployToVercel(project, deploymentConfig.files);
      workflow.push(`✅ Deployment successful: ${deployment.url}`);
      
      // Step 7: IntegrationAgent sets up e-commerce
      if (analysis.type === 'dropshipping' || analysis.type === 'ecommerce') {
        workflow.push('🛒 IntegrationAgent: Setting up e-commerce...');
        const ecommerce = await this.integrationAgent.setupEcommerce(project);
        workflow.push(`✅ E-commerce setup complete: ${ecommerce.storeId}`);
      }
      
      // Step 8: Special handling for influencer campaign with email
      let campaignResults: any = null;
      
      if (analysis.type === 'influencer-campaign') {
        const influencerCount = analysis.parameters?.influencerCount || 5;
        const emailRecipients = analysis.parameters?.emailRecipients || 1000;
        const offerAmount = analysis.parameters?.offerAmount || 50;
        
        workflow.push(`🎭 Starting influencer campaign: ${influencerCount} influencers, ${emailRecipients} emails`);
        console.log(`[BusinessAgentManager] 🎭 Influencer Campaign Mode: ${influencerCount} influencers, ${emailRecipients} emails`);
        
        // Step 8a: Generate AI Influencer Personas
        workflow.push(`📢 MarketingAgent: Generating ${influencerCount} AI Influencer personas...`);
        console.log(`[BusinessAgentManager] → MarketingAgent: Generate ${influencerCount} AI influencer personas`);
        
        const influencerPersonas = await this.generateInfluencerPersonas(
          project,
          influencerCount,
          'Chiara\'s World'
        );
        workflow.push(`✅ ${influencerPersonas.length} AI Influencer personas generated`);
        console.log(`[MarketingAgent] ✅ Generated ${influencerPersonas.length} influencer personas`);
        
        // Step 8b: Generate influencer posts
        workflow.push(`🎨 MarketingAgent → AIInfluencerGenerator: Creating posts for ${influencerPersonas.length} influencers...`);
        console.log(`[MarketingAgent] → AIInfluencerGenerator: Generate posts for all influencers`);
        
        const influencerPosts = [];
        for (let i = 0; i < influencerPersonas.length; i++) {
          const persona = influencerPersonas[i];
          
          // Temporarily set persona for this iteration
          project.aiInfluencerPersona = {
            name: persona.name,
            niche: persona.niche,
            personality: {
              tone: persona.tone,
              values: persona.values,
              communicationStyle: persona.communicationStyle
            },
            contentStrategy: {
              postFrequency: 'Daily',
              contentTypes: ['product-review', 'lifestyle'],
              platforms: ['Instagram', 'TikTok']
            },
            audienceAlignment: {
              targetAudienceMatch: 95,
              engagementStrategy: 'Value-first content'
            }
          };
          
          const postResult = await this.integrationAgent.generateInfluencerPost(
            project,
            `Chiara's World - Limited €${offerAmount} Offer`
          );
          
          if (postResult.success && postResult.post) {
            influencerPosts.push(postResult.post);
            workflow.push(`✅ Post ${i + 1}/${influencerPersonas.length} generated for ${persona.name}`);
            console.log(`[AIInfluencerGenerator] ✅ Post generated for ${persona.name}: ${postResult.post.postId}`);
          }
        }
        
        workflow.push(`✅ ${influencerPosts.length} AI Influencer posts generated`);
        console.log(`[MarketingAgent] ✅ Total posts generated: ${influencerPosts.length}`);
        
        // Step 8c: Generate email copy using Opus 4.5
        workflow.push('📝 MarketingAgent: Generating email copy using Opus 4.5...');
        console.log(`[MarketingAgent] → Generating email copy for ${emailRecipients} recipients`);
        
        const emailCopy = await this.marketingAgent.generateEmailCopy(
          project,
          offerAmount,
          emailRecipients
        );
        workflow.push('✅ Email copy generated with Opus 4.5');
        console.log(`[MarketingAgent] ✅ Email copy generated: ${emailCopy.subject}`);
        
        // Step 8d: Dispatch email campaign
        workflow.push(`📧 IntegrationAgent: Dispatching email campaign to ${emailRecipients} recipients...`);
        console.log(`[BusinessAgentManager] → IntegrationAgent: Send ${emailRecipients} emails`);
        
        const emailCampaign = await this.integrationAgent.sendEmailCampaign(
          project,
          emailCopy,
          emailRecipients
        );
        
        if (emailCampaign.success) {
          workflow.push(`✅ ${emailCampaign.sent || emailRecipients} test emails sent successfully`);
          console.log(`[IntegrationAgent] ✅ Email campaign dispatched: ${emailCampaign.sent} emails sent`);
        } else {
          workflow.push(`⚠️ Email campaign partially completed: ${emailCampaign.sent || 0} sent`);
        }
        
        // Step 8e: Confirm social media scheduling
        workflow.push('📅 IntegrationAgent: Confirming social media scheduling...');
        console.log(`[IntegrationAgent] → Confirming social media posts scheduled`);
        
        const scheduleConfirmation = await this.integrationAgent.confirmSocialMediaSchedule(
          project,
          influencerPosts
        );
        workflow.push(`✅ Social media scheduling confirmed: ${scheduleConfirmation.scheduled || influencerPosts.length} posts scheduled`);
        console.log(`[IntegrationAgent] ✅ Social media scheduling complete`);
        
        // Store campaign results
        campaignResults = {
          personas: influencerPersonas,
          posts: influencerPosts,
          emailCampaign: {
            sent: emailCampaign.sent,
            total: emailRecipients,
            subject: emailCopy.subject
          },
          scheduleConfirmation
        };
      } else if (project.emailCampaignGoal) {
        // Standard email campaign setup
        workflow.push('📧 IntegrationAgent: Setting up email campaigns...');
        const emailSetup = await this.integrationAgent.sendEmail(project, {
          to: 'gcapovic.biz@proton.me',
          subject: `New Business Launch: ${project.projectName}`,
          body: `Project ${project.projectName} has been successfully launched!`
        });
        workflow.push(`✅ Email campaign setup: ${emailSetup.messageId}`);
      }
      
      // Store project
      this.activeProjects.set(project.projectId, project);
      
      // Final summary logging
      if (analysis.type === 'influencer-campaign' && campaignResults) {
        console.log(`\n${'='.repeat(60)}`);
        console.log(`[BusinessAgentManager] ✅ P2BA Execution Complete!`);
        console.log(`${'='.repeat(60)}`);
        console.log(`📊 Campaign Summary:`);
        console.log(`   • AI Influencers Generated: ${campaignResults.personas?.length || 0}`);
        console.log(`   • Influencer Posts Created: ${campaignResults.posts?.length || 0}`);
        console.log(`   • Emails Sent: ${campaignResults.emailCampaign?.sent || 0} / ${campaignResults.emailCampaign?.total || 0}`);
        console.log(`   • Social Media Posts Scheduled: ${campaignResults.scheduleConfirmation?.scheduled || 0}`);
        console.log(`${'='.repeat(60)}\n`);
      } else {
        console.log(`\n${'='.repeat(60)}`);
        console.log(`[BusinessAgentManager] ✅ P2BA Execution Complete!`);
        console.log(`${'='.repeat(60)}\n`);
      }
      
      return {
        success: true,
        projectId: project.projectId,
        results: {
          project,
          marketingStrategy,
          images,
          deployment,
          workflow,
          ...(campaignResults ? { influencerCampaign: campaignResults } : {})
        },
        workflow
      };
      
    } catch (error) {
      workflow.push(`❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      console.error(`[BusinessAgentManager] ❌ Error:`, error);
      
      return {
        success: false,
        workflow
      };
    }
  }

  /**
   * Analyze natural language command to determine business type
   */
  private analyzeCommand(command: string): {
    type: 'dropshipping' | 'ecommerce' | 'influencer' | 'influencer-campaign' | 'saas' | 'generic';
    keywords: string[];
    intent: string;
    parameters?: {
      influencerCount?: number;
      emailRecipients?: number;
      offerAmount?: number;
    };
  } {
    const lowerCommand = command.toLowerCase();
    const keywords: string[] = [];
    const parameters: {
      influencerCount?: number;
      emailRecipients?: number;
      offerAmount?: number;
    } = {};
    
    // Detect business type
    let type: 'dropshipping' | 'ecommerce' | 'influencer' | 'influencer-campaign' | 'saas' | 'generic' = 'generic';
    
    // Special case: Influencer campaign with email
    if ((lowerCommand.includes('influencer') && lowerCommand.includes('kampaň')) ||
        (lowerCommand.includes('influencer') && lowerCommand.includes('campaign')) ||
        (lowerCommand.includes('influencer') && lowerCommand.includes('email')) ||
        (lowerCommand.includes('vygeneruj') && lowerCommand.includes('influencer'))) {
      type = 'influencer-campaign';
      keywords.push('influencer', 'campaign', 'email', 'marketing');
      
      // Extract influencer count
      const influencerMatch = lowerCommand.match(/(\d+)\s*(nových|new|ai|influencer)/i);
      if (influencerMatch) {
        parameters.influencerCount = parseInt(influencerMatch[1]);
      } else if (lowerCommand.includes('3')) {
        parameters.influencerCount = 3;
      } else if (lowerCommand.includes('5')) {
        parameters.influencerCount = 5;
      }
      
      // Extract email recipient count
      const emailMatch = lowerCommand.match(/(\d+)\s*(kontaktom|contact|imaginárnym|potential|investor|recipient)/i);
      if (emailMatch) {
        parameters.emailRecipients = parseInt(emailMatch[1]);
      } else if (lowerCommand.includes('5000')) {
        parameters.emailRecipients = 5000;
      } else if (lowerCommand.includes('1000')) {
        parameters.emailRecipients = 1000;
      }
      
      // Extract offer amount (percentage or euro)
      const offerPercentMatch = lowerCommand.match(/(\d+)%\s*(zľava|discount|off)/i);
      if (offerPercentMatch) {
        parameters.offerAmount = parseInt(offerPercentMatch[1]);
      } else {
        const offerMatch = lowerCommand.match(/€(\d+)|(\d+)\s*eur/i);
        if (offerMatch) {
          parameters.offerAmount = parseInt(offerMatch[1] || offerMatch[2]);
        } else if (lowerCommand.includes('50')) {
          parameters.offerAmount = 50;
        }
      }
    } else if (lowerCommand.includes('dropship') || lowerCommand.includes('dropshipping')) {
      type = 'dropshipping';
      keywords.push('dropshipping', 'e-commerce', 'products');
    } else if (lowerCommand.includes('store') || lowerCommand.includes('shop')) {
      type = 'ecommerce';
      keywords.push('e-commerce', 'store', 'products');
    } else if (lowerCommand.includes('influencer') || lowerCommand.includes('content creator')) {
      type = 'influencer';
      keywords.push('influencer', 'content', 'social media');
    } else if (lowerCommand.includes('saas') || lowerCommand.includes('software')) {
      type = 'saas';
      keywords.push('saas', 'software', 'subscription');
    }
    
    // Extract additional keywords
    const commonKeywords = ['marketing', 'email', 'campaign', 'seo', 'social media'];
    commonKeywords.forEach(keyword => {
      if (lowerCommand.includes(keyword)) {
        keywords.push(keyword);
      }
    });
    
    return {
      type,
      keywords: [...new Set(keywords)],
      intent: command,
      parameters: Object.keys(parameters).length > 0 ? parameters : undefined
    };
  }

  /**
   * Initialize project from command analysis
   */
  private async initializeProject(analysis: {
    type: string;
    keywords: string[];
    intent: string;
  }): Promise<NewBusinessLaunch> {
    // Create project based on analysis
    const project: NewBusinessLaunch = {
      ...exampleBusinessLaunch,
      projectName: this.extractProjectName(analysis.intent) || `New ${analysis.type} Business`,
      projectId: `p2ba-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'executing',
      metadata: {
        ...exampleBusinessLaunch.metadata,
        tags: analysis.keywords,
        lastModified: new Date().toISOString()
      }
    };
    
    // Customize based on type
    if (analysis.type === 'dropshipping') {
      project.dropshipProductCategory = {
        category: 'General',
        subcategories: ['Electronics', 'Home & Garden'],
        priceRange: { min: 10, max: 200 }
      };
    }
    
    return project;
  }

  /**
   * Extract project name from command
   */
  private extractProjectName(command: string): string | null {
    // Simple extraction - look for quoted strings or capitalized phrases
    const quoted = command.match(/"([^"]+)"/);
    if (quoted) return quoted[1];
    
    const capitalized = command.match(/\b([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)\b/);
    if (capitalized) return capitalized[1];
    
    return null;
  }

  /**
   * Get active project
   */
  getProject(projectId: string): NewBusinessLaunch | undefined {
    return this.activeProjects.get(projectId);
  }

  /**
   * List all active projects
   */
  listProjects(): Array<{ id: string; name: string; status: string }> {
    return Array.from(this.activeProjects.values()).map(p => ({
      id: p.projectId,
      name: p.projectName,
      status: p.status
    }));
  }

  /**
   * Generate multiple AI influencer personas
   */
  private async generateInfluencerPersonas(
    project: NewBusinessLaunch,
    count: number,
    brandName: string
  ): Promise<Array<{
    name: string;
    niche: string;
    tone: 'professional' | 'casual' | 'humorous' | 'authoritative' | 'friendly';
    values: string[];
    communicationStyle: string;
  }>> {
    const niches = [
      'Tech Innovation',
      'Sustainable Living',
      'Financial Freedom',
      'AI & Automation',
      'Entrepreneurship'
    ];
    
    const tones: Array<'professional' | 'casual' | 'humorous' | 'authoritative' | 'friendly'> = [
      'professional',
      'friendly',
      'authoritative',
      'casual',
      'humorous'
    ];
    
    const names = [
      'TechSavvy Sarah',
      'EcoEmma',
      'FinanceFelix',
      'AIAlex',
      'StartupSam'
    ];
    
    const personas = [];
    for (let i = 0; i < count; i++) {
      personas.push({
        name: names[i] || `Influencer${i + 1}`,
        niche: niches[i % niches.length],
        tone: tones[i % tones.length],
        values: ['innovation', 'transparency', 'growth'],
        communicationStyle: `Engaging ${tones[i % tones.length]} content focused on ${niches[i % niches.length]}`
      });
    }
    
    return personas;
  }
}

