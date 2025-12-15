// ╔══════════════════════════════════════════════════════════════════╗
// ║  🦄 AI INFLUENCER & MARKETING AGENCY - CONFIG                    ║
// ╚══════════════════════════════════════════════════════════════════╝

module.exports = {
    // ═══════════════════════════════════════════════════════════════
    // API KEYS
    // ═══════════════════════════════════════════════════════════════
    
    OPENAI_API_KEY: 'REMOVED_OPENAI_KEY',
    
    // Replicate API (Stable Diffusion pre AI fotky)
    // Získaj na: https://replicate.com/account/api-tokens
    REPLICATE_API_TOKEN: 'VLOZ_SEM',
    
    // ═══════════════════════════════════════════════════════════════
    // AI INFLUENCER SETTINGS
    // ═══════════════════════════════════════════════════════════════
    
    AI_INFLUENCER: {
        // Počet fotiek na influencer
        PHOTOS_PER_INFLUENCER: 20,
        
        // Photo resolution
        PHOTO_WIDTH: 1024,
        PHOTO_HEIGHT: 1024,
        
        // Photo categories
        PHOTO_CATEGORIES: [
            { name: 'fitness', count: 5, prompts: ['gym workout', 'yoga pose', 'running', 'athletic wear'] },
            { name: 'lifestyle', count: 5, prompts: ['coffee shop', 'beach', 'city walk', 'restaurant'] },
            { name: 'fashion', count: 5, prompts: ['outfit', 'street style', 'elegant dress', 'casual wear'] },
            { name: 'portraits', count: 5, prompts: ['close-up', 'headshot', 'smile', 'professional'] }
        ],
        
        // Content generation
        POSTS_PER_MONTH: 30,
        STORIES_PER_WEEK: 7,
        
        // Niches (vyberie sa random ak nie je špecifikované)
        NICHES: [
            'fitness', 'fashion', 'travel', 'food', 'beauty',
            'tech', 'gaming', 'lifestyle', 'wellness', 'entrepreneur'
        ]
    },
    
    // ═══════════════════════════════════════════════════════════════
    // MARKETING AGENCY SETTINGS
    // ═══════════════════════════════════════════════════════════════
    
    MARKETING_AGENCY: {
        // Auto-posting schedule
        POST_TIMES: ['09:00', '13:00', '17:00', '21:00'], // Local time
        
        // Content types
        CONTENT_TYPES: ['educational', 'promotional', 'engagement', 'story', 'testimonial'],
        
        // Platforms
        PLATFORMS: ['instagram', 'tiktok', 'facebook', 'twitter'],
        
        // Campaign duration (days)
        CAMPAIGN_DURATION: 30
    },
    
    // ═══════════════════════════════════════════════════════════════
    // STABLE DIFFUSION SETTINGS
    // ═══════════════════════════════════════════════════════════════
    
    STABLE_DIFFUSION: {
        // Model (pre realistic photos)
        MODEL: 'stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b',
        
        // Quality settings
        NUM_INFERENCE_STEPS: 50,
        GUIDANCE_SCALE: 7.5,
        
        // Negative prompt (remove unwanted features)
        NEGATIVE_PROMPT: 'ugly, deformed, noisy, blurry, distorted, grainy, bad anatomy, extra limbs, poorly drawn face, mutation, disfigured, bad proportions, cropped, low quality, jpeg artifacts, watermark, signature, text',
        
        // Style presets
        STYLE_PRESETS: ['photographic', 'cinematic', 'natural']
    },
    
    // ═══════════════════════════════════════════════════════════════
    // OUTPUT SETTINGS
    // ═══════════════════════════════════════════════════════════════
    
    OUTPUT: {
        // Base directory
        BASE_DIR: './ai-influencers',
        
        // Auto-deploy to Vercel
        AUTO_DEPLOY: true,
        
        // Generate previews (screenshots)
        GENERATE_PREVIEWS: true,
        
        // Save metadata
        SAVE_METADATA: true
    },
    
    // ═══════════════════════════════════════════════════════════════
    // BUSINESS SETTINGS
    // ═══════════════════════════════════════════════════════════════
    
    BUSINESS: {
        BRAND: 'Chiara\'s World',
        OWNER: 'Goliáš Čapovič',
        EMAIL: 'gcapovic.biz@proton.me',
        WEBSITE: 'fordfofer.vercel.app',
        SKRILL_EMAIL: 'gcapovic.biz@proton.me'
    }
};

