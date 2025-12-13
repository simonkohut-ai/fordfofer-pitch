/**
 * 📊 Business Launch Schema
 * Defines the structure for a new business project in the P2BA system
 */

export interface NewBusinessLaunch {
  // Core Project Information
  projectName: string;
  projectId: string;
  createdAt: string;
  status: 'draft' | 'planning' | 'executing' | 'deployed' | 'failed';
  
  // Target Audience
  targetAudience: {
    demographics: {
      ageRange: string;
      gender?: string;
      location?: string;
      incomeLevel?: string;
    };
    psychographics: {
      interests: string[];
      values: string[];
      painPoints: string[];
    };
    behavior: {
      preferredChannels: string[];
      buyingHabits: string[];
    };
  };
  
  // Dropshipping Configuration
  dropshipProductCategory?: {
    category: string;
    subcategories: string[];
    priceRange: {
      min: number;
      max: number;
    };
    supplierRequirements?: {
      shippingTime: string;
      minimumOrder?: number;
      returnPolicy?: string;
    };
  };
  
  // AI Influencer Persona
  aiInfluencerPersona?: {
    name: string;
    niche: string;
    personality: {
      tone: 'professional' | 'casual' | 'humorous' | 'authoritative' | 'friendly';
      values: string[];
      communicationStyle: string;
    };
    contentStrategy: {
      postFrequency: string;
      contentTypes: string[];
      platforms: string[];
    };
    audienceAlignment: {
      targetAudienceMatch: number; // 0-100
      engagementStrategy: string;
    };
  };
  
  // Email Campaign Configuration
  emailCampaignGoal?: {
    primaryGoal: 'awareness' | 'conversion' | 'retention' | 'upsell';
    targetMetrics: {
      openRate?: number;
      clickRate?: number;
      conversionRate?: number;
    };
    campaignType: 'welcome' | 'nurture' | 'promotional' | 'abandoned-cart';
    schedule: {
      frequency: string;
      startDate?: string;
      endDate?: string;
    };
  };
  
  // Marketing Strategy
  marketingStrategy?: {
    channels: string[];
    budget?: {
      total: number;
      allocation: Record<string, number>;
    };
    kpis: string[];
  };
  
  // Technical Configuration
  technicalConfig?: {
    platform: 'vercel' | 'shopify' | 'woocommerce' | 'custom';
    domain?: string;
    integrations: string[];
    deploymentTarget?: string;
  };
  
  // Metadata
  metadata: {
    createdBy: string;
    lastModified: string;
    version: number;
    tags: string[];
  };
}

/**
 * Example business launch schema
 */
export const exampleBusinessLaunch: NewBusinessLaunch = {
  projectName: "Eco-Friendly Fitness Gear Store",
  projectId: "p2ba-001",
  createdAt: new Date().toISOString(),
  status: "draft",
  targetAudience: {
    demographics: {
      ageRange: "25-45",
      gender: "all",
      location: "US, UK, CA",
      incomeLevel: "middle-to-high"
    },
    psychographics: {
      interests: ["fitness", "sustainability", "health", "outdoor activities"],
      values: ["environmental consciousness", "health", "quality"],
      painPoints: ["finding eco-friendly products", "high prices", "quality concerns"]
    },
    behavior: {
      preferredChannels: ["Instagram", "TikTok", "Email"],
      buyingHabits: ["online", "mobile-first", "research-heavy"]
    }
  },
  dropshipProductCategory: {
    category: "Fitness & Sports",
    subcategories: ["Yoga Mats", "Resistance Bands", "Water Bottles"],
    priceRange: {
      min: 15,
      max: 150
    },
    supplierRequirements: {
      shippingTime: "7-14 days",
      minimumOrder: 10,
      returnPolicy: "30-day return"
    }
  },
  aiInfluencerPersona: {
    name: "EcoFit Sarah",
    niche: "Sustainable Fitness",
    personality: {
      tone: "friendly",
      values: ["sustainability", "authenticity", "health"],
      communicationStyle: "Educational and inspiring"
    },
    contentStrategy: {
      postFrequency: "Daily",
      contentTypes: ["workout tips", "product reviews", "sustainability tips"],
      platforms: ["Instagram", "TikTok", "YouTube Shorts"]
    },
    audienceAlignment: {
      targetAudienceMatch: 95,
      engagementStrategy: "Value-first content with subtle product integration"
    }
  },
  emailCampaignGoal: {
    primaryGoal: "conversion",
    targetMetrics: {
      openRate: 25,
      clickRate: 5,
      conversionRate: 3
    },
    campaignType: "nurture",
    schedule: {
      frequency: "Weekly",
      startDate: new Date().toISOString()
    }
  },
  marketingStrategy: {
    channels: ["Instagram", "TikTok", "Email", "SEO"],
    budget: {
      total: 5000,
      allocation: {
        "Instagram Ads": 2000,
        "TikTok Ads": 1500,
        "Email Marketing": 500,
        "SEO": 1000
      }
    },
    kpis: ["ROAS", "Customer Acquisition Cost", "Lifetime Value"]
  },
  technicalConfig: {
    platform: "vercel",
    domain: "ecofitgear.com",
    integrations: ["Stripe", "Mailchimp", "Instagram API", "TikTok API"],
    deploymentTarget: "production"
  },
  metadata: {
    createdBy: "Chiara's World P2BA System",
    lastModified: new Date().toISOString(),
    version: 1,
    tags: ["dropshipping", "fitness", "eco-friendly", "e-commerce"]
  }
};

