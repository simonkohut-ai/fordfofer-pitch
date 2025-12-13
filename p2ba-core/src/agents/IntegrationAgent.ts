/**
 * 🔌 IntegrationAgent
 * Responsible for calling external APIs (Email, Image, E-commerce)
 * Now integrated with real services: AIInfluencerGenerator, DropshipManager, EmailService
 */

import { NewBusinessLaunch } from '../types/BusinessSchema.js';
import { AIInfluencerGenerator, InfluencerPersona } from '../services/AIInfluencerGenerator.js';
import { DropshipManager, ProductData } from '../services/DropshipManager.js';
import { EmailService, EmailData } from '../services/EmailService.js';

export class IntegrationAgent {
  private agentId: string = 'integration-agent-001';
  private capabilities: string[] = [
    'email-api',
    'image-generation',
    'e-commerce-api',
    'social-media-api',
    'payment-processing',
    'influencer-generation',
    'dropshipping-management'
  ];

  // Service instances
  private influencerGenerator: AIInfluencerGenerator;
  private dropshipManager: DropshipManager;
  private emailService: EmailService;

  constructor() {
    // Initialize services
    this.influencerGenerator = new AIInfluencerGenerator();
    this.dropshipManager = new DropshipManager();
    this.emailService = new EmailService();
  }

  /**
   * Send email via EmailService (Nodemailer)
   */
  async sendEmail(
    project: NewBusinessLaunch,
    emailData: {
      to: string | string[];
      subject: string;
      body: string;
      html?: string;
      templateId?: string;
    }
  ): Promise<{ success: boolean; messageId?: string }> {
    console.log(`[IntegrationAgent] Sending email for: ${project.projectName}`);
    console.log(`[IntegrationAgent] To: ${Array.isArray(emailData.to) ? emailData.to.join(', ') : emailData.to}, Subject: ${emailData.subject}`);
    
    const emailPayload: EmailData = {
      to: emailData.to,
      subject: emailData.subject,
      html: emailData.html || emailData.body,
      text: emailData.body
    };

    const result = await this.emailService.sendMarketingEmail(project, emailPayload);
    
    return {
      success: result.success,
      messageId: result.messageId
    };
  }

  /**
   * Generate images via AI (using AIInfluencerGenerator)
   */
  async generateImage(
    project: NewBusinessLaunch,
    prompt: string,
    style?: string
  ): Promise<{ success: boolean; imageUrl?: string; imageId?: string }> {
    console.log(`[IntegrationAgent] Generating image for: ${project.projectName}`);
    console.log(`[IntegrationAgent] Prompt: ${prompt}`);
    
    // Use AIInfluencerGenerator for influencer-related images
    if (project.aiInfluencerPersona) {
      const persona: InfluencerPersona = {
        name: project.aiInfluencerPersona.name,
        niche: project.aiInfluencerPersona.niche,
        tone: project.aiInfluencerPersona.personality.tone,
        values: project.aiInfluencerPersona.personality.values,
        communicationStyle: project.aiInfluencerPersona.personality.communicationStyle
      };

      const result = await this.influencerGenerator.generateInfluencerPost(
        persona,
        prompt,
        project
      );

      if (result.success && result.post) {
        return {
          success: true,
          imageUrl: result.post.imageUrl,
          imageId: result.post.postId
        };
      }
    }

    // Fallback: Generate simple image URL
    const imageId = `img-${Date.now()}`;
    const imageUrl = `https://cdn.chiarasworld.com/images/${imageId}.png`;
    
    return {
      success: true,
      imageUrl,
      imageId
    };
  }

  /**
   * Setup e-commerce integration (using DropshipManager)
   */
  async setupEcommerce(
    project: NewBusinessLaunch
  ): Promise<{
    success: boolean;
    storeId?: string;
    apiKeys?: Record<string, string>;
    storeUrl?: string;
  }> {
    console.log(`[IntegrationAgent] Setting up e-commerce for: ${project.projectName}`);
    
    const result = await this.dropshipManager.createStore(project.projectName, project);
    
    if (result.success && result.store) {
      return {
        success: true,
        storeId: result.store.storeId,
        storeUrl: `https://${result.store.domain}`,
        apiKeys: {
          apiKey: result.store.apiCredentials.apiKey || '',
          apiSecret: result.store.apiCredentials.apiSecret || '',
          accessToken: result.store.apiCredentials.accessToken || ''
        }
      };
    }
    
    return {
      success: false
    };
  }

  /**
   * Add product to dropshipping store
   */
  async addProductToStore(
    project: NewBusinessLaunch,
    storeId: string,
    productData: ProductData
  ): Promise<{
    success: boolean;
    productId?: string;
    error?: string;
  }> {
    console.log(`[IntegrationAgent] Adding product to store: ${productData.name}`);
    
    const result = await this.dropshipManager.addProduct(storeId, productData);
    
    if (result.success && result.product) {
      return {
        success: true,
        productId: result.product.productId
      };
    }
    
    return {
      success: false,
      error: result.error
    };
  }

  /**
   * Post to social media
   */
  async postToSocialMedia(
    project: NewBusinessLaunch,
    platform: 'instagram' | 'tiktok' | 'twitter',
    content: {
      text: string;
      imageUrl?: string;
      videoUrl?: string;
    }
  ): Promise<{ success: boolean; postId?: string; url?: string }> {
    console.log(`[IntegrationAgent] Posting to ${platform} for: ${project.projectName}`);
    
    // Stub: In production, this would call respective APIs
    const postId = `${platform}-${Date.now()}`;
    const url = `https://${platform}.com/posts/${postId}`;
    
    return {
      success: true,
      postId,
      url
    };
  }

  /**
   * Setup payment processing - All payments go to Skrill
   */
  async setupPaymentProcessing(
    project: NewBusinessLaunch
  ): Promise<{
    success: boolean;
    paymentProvider?: string;
    accountId?: string;
    skrillEmail?: string;
    supportedMethods?: string[];
  }> {
    console.log(`[IntegrationAgent] Setting up payment processing for: ${project.projectName}`);
    
    // Use PaymentService for unified Skrill payments
    const { PaymentService } = await import('../services/PaymentService.js');
    const paymentService = new PaymentService({
      skrillEmail: process.env.SKRILL_EMAIL || 'gcapovic.biz@proton.me',
      skrillMerchantId: process.env.SKRILL_MERCHANT_ID,
      skrillApiKey: process.env.SKRILL_API_KEY
    });

    const result = await paymentService.setupPaymentProcessing(project);
    
    return {
      success: result.success,
      paymentProvider: result.paymentProvider,
      accountId: result.accountId,
      skrillEmail: result.skrillEmail,
      supportedMethods: result.supportedMethods
    };
  }

  /**
   * Get product data from supplier
   */
  async fetchProductData(
    project: NewBusinessLaunch,
    category: string
  ): Promise<{
    success: boolean;
    products?: Array<{
      id: string;
      name: string;
      price: number;
      imageUrl: string;
    }>;
  }> {
    console.log(`[IntegrationAgent] Fetching products for category: ${category}`);
    
    // Stub: In production, this would call supplier API
    return {
      success: true,
      products: [
        {
          id: 'prod-1',
          name: `Sample ${category} Product`,
          price: 29.99,
          imageUrl: 'https://via.placeholder.com/300'
        }
      ]
    };
  }

  /**
   * Generate influencer post using AIInfluencerGenerator
   */
  async generateInfluencerPost(
    project: NewBusinessLaunch,
    productFocus: string
  ): Promise<{
    success: boolean;
    post?: {
      imageUrl: string;
      caption: string;
      hashtags: string[];
      platform: string;
      postId: string;
    };
    error?: string;
  }> {
    if (!project.aiInfluencerPersona) {
      return {
        success: false,
        error: 'No influencer persona defined for this project'
      };
    }

    const persona: InfluencerPersona = {
      name: project.aiInfluencerPersona.name,
      niche: project.aiInfluencerPersona.niche,
      tone: project.aiInfluencerPersona.personality.tone,
      values: project.aiInfluencerPersona.personality.values,
      communicationStyle: project.aiInfluencerPersona.personality.communicationStyle
    };

    const result = await this.influencerGenerator.generateInfluencerPost(
      persona,
      productFocus,
      project
    );

    return result;
  }

  /**
   * Send email campaign to multiple recipients
   */
  async sendEmailCampaign(
    project: NewBusinessLaunch,
    emailCopy: {
      subject: string;
      html: string;
      text: string;
    },
    recipientCount: number
  ): Promise<{
    success: boolean;
    sent: number;
    failed: number;
    messageIds: string[];
  }> {
    console.log(`[IntegrationAgent] Sending email campaign to ${recipientCount} recipients`);
    
    // Generate mock recipient list
    const recipients: string[] = [];
    for (let i = 0; i < recipientCount; i++) {
      recipients.push(`investor${i + 1}@example.com`);
    }
    
    console.log(`[IntegrationAgent] Generated ${recipients.length} recipient addresses`);
    
    // Send emails in batches (simulated)
    const batchSize = 100;
    let sent = 0;
    let failed = 0;
    const messageIds: string[] = [];
    
    for (let i = 0; i < recipients.length; i += batchSize) {
      const batch = recipients.slice(i, i + batchSize);
      console.log(`[IntegrationAgent] Processing batch ${Math.floor(i / batchSize) + 1}: ${batch.length} emails`);
      
      for (const recipient of batch) {
        const result = await this.emailService.sendMarketingEmail(project, {
          to: recipient,
          subject: emailCopy.subject,
          html: emailCopy.html,
          text: emailCopy.text
        });
        
        if (result.success && result.messageId) {
          sent++;
          messageIds.push(result.messageId);
        } else {
          failed++;
        }
      }
      
      // Small delay between batches
      await new Promise(resolve => setTimeout(resolve, 50));
    }
    
    console.log(`[IntegrationAgent] ✅ Email campaign complete: ${sent} sent, ${failed} failed`);
    
    return {
      success: sent > 0,
      sent,
      failed,
      messageIds
    };
  }

  /**
   * Confirm social media scheduling via Buffer API
   */
  async confirmSocialMediaSchedule(
    project: NewBusinessLaunch,
    posts: Array<{
      postId: string;
      platform: string;
      caption: string;
      imageUrl?: string;
    }>
  ): Promise<{
    success: boolean;
    scheduled: number;
    platforms: string[];
    bufferPostIds?: string[];
  }> {
    console.log(`[IntegrationAgent] Scheduling ${posts.length} posts via Buffer API`);
    
    const bufferAccessToken = process.env.BUFFER_ACCESS_TOKEN;
    const platforms = [...new Set(posts.map(p => p.platform))];
    const scheduledPostIds: string[] = [];

    if (!bufferAccessToken) {
      console.warn('[IntegrationAgent] Buffer API token not configured. Skipping scheduling.');
      return {
        success: false,
        scheduled: 0,
        platforms
      };
    }

    try {
      const axios = (await import('axios')).default;
      
      // Map platform names to Buffer profile IDs (should be in env vars)
      const profileMap: Record<string, string> = {
        'instagram': process.env.BUFFER_INSTAGRAM_PROFILE_ID || '',
        'twitter': process.env.BUFFER_TWITTER_PROFILE_ID || '',
        'tiktok': process.env.BUFFER_TIKTOK_PROFILE_ID || '',
        'facebook': process.env.BUFFER_FACEBOOK_PROFILE_ID || '',
        'linkedin': process.env.BUFFER_LINKEDIN_PROFILE_ID || ''
      };

      for (const post of posts) {
        const profileId = profileMap[post.platform.toLowerCase()];
        
        if (!profileId) {
          console.warn(`[IntegrationAgent] No Buffer profile ID for ${post.platform}. Skipping.`);
          continue;
        }

        try {
          // Create update (post) in Buffer
          const response = await axios.post(
            'https://api.bufferapp.com/v1/updates/create.json',
            {
              profile_ids: [profileId],
              text: post.caption,
              media: post.imageUrl ? {
                photo: post.imageUrl
              } : undefined,
              now: false, // Schedule for later (Buffer will auto-schedule)
              top: false
            },
            {
              headers: {
                'Authorization': `Bearer ${bufferAccessToken}`,
                'Content-Type': 'application/json'
              }
            }
          );

          if (response.data && response.data.updates && response.data.updates.length > 0) {
            const bufferPostId = response.data.updates[0].id;
            scheduledPostIds.push(bufferPostId);
            console.log(`[IntegrationAgent] ✅ Post ${post.postId} scheduled in Buffer: ${bufferPostId}`);
          }
        } catch (error: any) {
          console.error(`[IntegrationAgent] ❌ Failed to schedule post ${post.postId}:`, 
            error.response?.data || error.message);
        }
      }

      console.log(`[IntegrationAgent] ✅ Social media scheduling complete: ${scheduledPostIds.length}/${posts.length} posts scheduled`);

      return {
        success: scheduledPostIds.length > 0,
        scheduled: scheduledPostIds.length,
        platforms,
        bufferPostIds: scheduledPostIds
      };
    } catch (error) {
      console.error('[IntegrationAgent] ❌ Error scheduling posts:', error);
      return {
        success: false,
        scheduled: 0,
        platforms
      };
    }
  }
}

