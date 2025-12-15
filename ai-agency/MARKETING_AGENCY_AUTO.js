/**
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  🚀 MARKETING AGENCY AUTOMATION - FULL CLIENT MANAGEMENT         ║
 * ║  Auto-generate campaigns, content, posts for any client          ║
 * ╚══════════════════════════════════════════════════════════════════╝
 * 
 * USAGE:
 * node MARKETING_AGENCY_AUTO.js "Client: Fitness Gym, Goal: Get 100 members"
 * 
 * OUTPUT:
 * - Complete marketing strategy
 * - 30-day campaign
 * - 60+ pieces of content (posts, ads, emails)
 * - Landing pages
 * - Ad copy variants
 * - Email sequences
 */

const fs = require('fs');
const path = require('path');
const { OpenAI } = require('openai');
const config = require('./config-ai');

const openai = new OpenAI({
    apiKey: config.OPENAI_API_KEY
});

const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    green: '\x1b[32m',
    blue: '\x1b[34m',
    yellow: '\x1b[33m',
    cyan: '\x1b[36m',
    magenta: '\x1b[35m'
};

class MarketingAgencyAutomation {
    constructor(clientBrief) {
        this.clientBrief = clientBrief;
        this.client = null;
        this.strategy = null;
        this.campaign = null;
        this.outputDir = null;
        this.startTime = Date.now();
    }

    async generate() {
        console.log(`\n${colors.bright}╔══════════════════════════════════════════════════════════════════╗${colors.reset}`);
        console.log(`${colors.bright}║  🚀 MARKETING AGENCY AUTOMATION                                  ║${colors.reset}`);
        console.log(`${colors.bright}╚══════════════════════════════════════════════════════════════════╝${colors.reset}\n`);

        try {
            // Step 1: Analyze client
            await this.analyzeClient();

            // Step 2: Create output directory
            this.createOutputDirectory();

            // Step 3: Generate strategy
            await this.generateStrategy();

            // Step 4: Generate campaign
            await this.generateCampaign();

            // Step 5: Generate content
            await this.generateContent();

            // Step 6: Generate landing pages
            await this.generateLandingPages();

            // Step 7: Generate ad copy
            await this.generateAdCopy();

            // Step 8: Generate email sequence
            await this.generateEmailSequence();

            // Step 9: Save metadata
            this.saveMetadata();

            // Step 10: Print summary
            this.printSummary();

            return {
                client: this.client,
                strategy: this.strategy,
                campaign: this.campaign
            };

        } catch (error) {
            console.error(`\n${colors.bright}❌ ERROR:${colors.reset}`, error.message);
            throw error;
        }
    }

    async analyzeClient() {
        console.log(`${colors.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
        console.log(`${colors.bright}📝 STEP 1: Analyzing Client${colors.reset}`);
        console.log(`${colors.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}\n`);

        const prompt = `Analyze this client brief and create a complete client profile: "${this.clientBrief}"

Generate JSON:
{
  "business_name": "Business name",
  "industry": "Industry/niche",
  "goal": "Primary goal",
  "target_audience": {
    "demographics": "Age, gender, location, etc",
    "psychographics": "Interests, values, pain points",
    "personas": ["Persona 1", "Persona 2"]
  },
  "unique_selling_proposition": "What makes them unique",
  "competitors": ["Competitor 1", "Competitor 2"],
  "budget_estimate": "Low/Medium/High",
  "timeline": "Weeks or months",
  "kpis": ["KPI 1", "KPI 2", "KPI 3"]
}

Return ONLY valid JSON.`;

        const response = await openai.chat.completions.create({
            model: 'gpt-4o',
            messages: [
                { role: 'system', content: 'You are an expert marketing strategist. Return only valid JSON.' },
                { role: 'user', content: prompt }
            ],
            temperature: 0.7
        });

        const content = response.choices[0].message.content.trim();
        const jsonMatch = content.match(/```json\n([\s\S]*?)\n```/) || content.match(/```\n([\s\S]*?)\n```/);
        const jsonString = jsonMatch ? jsonMatch[1] : content;
        
        this.client = JSON.parse(jsonString);

        console.log(`${colors.green}✅ Client analyzed:${colors.reset}`);
        console.log(`   Business: ${this.client.business_name}`);
        console.log(`   Industry: ${this.client.industry}`);
        console.log(`   Goal: ${this.client.goal}\n`);
    }

    createOutputDirectory() {
        const slug = this.client.business_name.toLowerCase().replace(/[^a-z0-9]/g, '-');
        this.outputDir = path.join(config.OUTPUT.BASE_DIR, 'clients', slug);

        const dirs = [
            this.outputDir,
            path.join(this.outputDir, 'content'),
            path.join(this.outputDir, 'landing-pages'),
            path.join(this.outputDir, 'ads'),
            path.join(this.outputDir, 'emails')
        ];

        dirs.forEach(dir => {
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
        });

        console.log(`${colors.green}✅ Output directory created:${colors.reset} ${this.outputDir}\n`);
    }

    async generateStrategy() {
        console.log(`${colors.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
        console.log(`${colors.bright}🎯 STEP 2: Generating Marketing Strategy${colors.reset}`);
        console.log(`${colors.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}\n`);

        const prompt = `Create a comprehensive marketing strategy for:

Business: ${this.client.business_name}
Industry: ${this.client.industry}
Goal: ${this.client.goal}
Target Audience: ${JSON.stringify(this.client.target_audience)}

Generate JSON:
{
  "strategy_overview": "High-level strategy description",
  "channels": [
    {
      "name": "Instagram/Facebook/TikTok/Email/etc",
      "priority": "High/Medium/Low",
      "tactics": ["Tactic 1", "Tactic 2"],
      "budget_allocation": "XX%"
    }
  ],
  "content_pillars": ["Pillar 1", "Pillar 2", "Pillar 3"],
  "messaging": {
    "primary_message": "Main message",
    "secondary_messages": ["Message 1", "Message 2"],
    "tone_of_voice": "Professional/Casual/Inspirational/etc"
  },
  "funnel_stages": {
    "awareness": "Strategy for awareness",
    "consideration": "Strategy for consideration",
    "conversion": "Strategy for conversion",
    "retention": "Strategy for retention"
  },
  "timeline": {
    "phase_1": "Week 1-2: ...",
    "phase_2": "Week 3-4: ...",
    "phase_3": "Week 5-8: ..."
  }
}

Return ONLY valid JSON.`;

        const response = await openai.chat.completions.create({
            model: 'gpt-4o',
            messages: [
                { role: 'system', content: 'You are an expert marketing strategist. Return only valid JSON.' },
                { role: 'user', content: prompt }
            ],
            temperature: 0.7
        });

        const content = response.choices[0].message.content.trim();
        const jsonMatch = content.match(/```json\n([\s\S]*?)\n```/) || content.match(/```\n([\s\S]*?)\n```/);
        const jsonString = jsonMatch ? jsonMatch[1] : content;
        
        this.strategy = JSON.parse(jsonString);

        fs.writeFileSync(
            path.join(this.outputDir, 'marketing-strategy.json'),
            JSON.stringify(this.strategy, null, 2)
        );

        console.log(`${colors.green}✅ Marketing strategy generated${colors.reset}`);
        console.log(`   Channels: ${this.strategy.channels.map(c => c.name).join(', ')}`);
        console.log(`   Content Pillars: ${this.strategy.content_pillars.length}\n`);
    }

    async generateCampaign() {
        console.log(`${colors.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
        console.log(`${colors.bright}📅 STEP 3: Generating 30-Day Campaign${colors.reset}`);
        console.log(`${colors.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}\n`);

        const prompt = `Create a 30-day social media campaign for:

Business: ${this.client.business_name}
Goal: ${this.client.goal}
Strategy: ${JSON.stringify(this.strategy)}

Generate 30 posts across platforms (Instagram, Facebook, TikTok):
[
  {
    "day": 1,
    "platform": "Instagram/Facebook/TikTok",
    "content_type": "Post/Story/Reel/Video",
    "caption": "Full caption with emojis",
    "visual_description": "What the image/video should show",
    "hashtags": ["#tag1", "#tag2"],
    "cta": "Call to action",
    "best_time": "09:00/13:00/17:00/21:00",
    "goal": "Awareness/Engagement/Conversion"
  },
  ...
]

Return ONLY valid JSON array with 30 posts.`;

        const response = await openai.chat.completions.create({
            model: 'gpt-4o',
            messages: [
                { role: 'system', content: 'You are an expert social media strategist. Return only valid JSON.' },
                { role: 'user', content: prompt }
            ],
            temperature: 0.8,
            max_tokens: 4000
        });

        const content = response.choices[0].message.content.trim();
        const jsonMatch = content.match(/```json\n([\s\S]*?)\n```/) || content.match(/```\n([\s\S]*?)\n```/);
        const jsonString = jsonMatch ? jsonMatch[1] : content;
        
        this.campaign = JSON.parse(jsonString);

        fs.writeFileSync(
            path.join(this.outputDir, 'content', '30-day-campaign.json'),
            JSON.stringify(this.campaign, null, 2)
        );

        console.log(`${colors.green}✅ 30-day campaign generated: ${this.campaign.length} posts${colors.reset}\n`);
    }

    async generateContent() {
        console.log(`${colors.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
        console.log(`${colors.bright}📝 STEP 4: Generating Additional Content${colors.reset}`);
        console.log(`${colors.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}\n`);

        // Generate blog post ideas
        const blogIdeas = await this.generateBlogIdeas();
        fs.writeFileSync(
            path.join(this.outputDir, 'content', 'blog-ideas.json'),
            JSON.stringify(blogIdeas, null, 2)
        );

        console.log(`${colors.green}✅ Blog ideas generated: ${blogIdeas.length}${colors.reset}`);

        // Generate video scripts
        const videoScripts = await this.generateVideoScripts();
        fs.writeFileSync(
            path.join(this.outputDir, 'content', 'video-scripts.json'),
            JSON.stringify(videoScripts, null, 2)
        );

        console.log(`${colors.green}✅ Video scripts generated: ${videoScripts.length}${colors.reset}\n`);
    }

    async generateBlogIdeas() {
        const response = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                { role: 'system', content: 'You are an expert content strategist. Return only valid JSON.' },
                { role: 'user', content: `Generate 10 SEO-optimized blog post ideas for ${this.client.business_name} (${this.client.industry}). Return JSON array with title, keyword, outline (3-5 points).` }
            ],
            temperature: 0.8
        });

        const content = response.choices[0].message.content.trim();
        const jsonMatch = content.match(/```json\n([\s\S]*?)\n```/) || content.match(/```\n([\s\S]*?)\n```/);
        const jsonString = jsonMatch ? jsonMatch[1] : content;
        return JSON.parse(jsonString);
    }

    async generateVideoScripts() {
        const response = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                { role: 'system', content: 'You are an expert video content creator. Return only valid JSON.' },
                { role: 'user', content: `Generate 5 viral video scripts (15-30s) for ${this.client.business_name}. Return JSON array with hook, body, cta, visual_notes.` }
            ],
            temperature: 0.9
        });

        const content = response.choices[0].message.content.trim();
        const jsonMatch = content.match(/```json\n([\s\S]*?)\n```/) || content.match(/```\n([\s\S]*?)\n```/);
        const jsonString = jsonMatch ? jsonMatch[1] : content;
        return JSON.parse(jsonString);
    }

    async generateLandingPages() {
        console.log(`${colors.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
        console.log(`${colors.bright}🌐 STEP 5: Generating Landing Pages${colors.reset}`);
        console.log(`${colors.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}\n`);

        const slug = this.client.business_name.toLowerCase().replace(/[^a-z0-9]/g, '-');
        
        const landingPageHTML = `<!DOCTYPE html>
<html lang="sk">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${this.client.business_name} | ${this.client.goal}</title>
    <meta name="description" content="${this.client.unique_selling_proposition}">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Segoe UI', system-ui, sans-serif;
            line-height: 1.6;
        }
        .hero {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 100px 20px;
            text-align: center;
        }
        .hero h1 {
            font-size: 48px;
            margin-bottom: 20px;
        }
        .hero p {
            font-size: 24px;
            margin-bottom: 30px;
        }
        .cta-button {
            display: inline-block;
            padding: 15px 40px;
            background: white;
            color: #667eea;
            text-decoration: none;
            border-radius: 50px;
            font-weight: 600;
            font-size: 18px;
            transition: all 0.3s;
        }
        .cta-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }
        .features {
            max-width: 1200px;
            margin: 80px auto;
            padding: 0 20px;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 40px;
        }
        .feature {
            text-align: center;
            padding: 30px;
        }
        .feature h3 {
            font-size: 24px;
            margin: 20px 0 10px;
            color: #333;
        }
        .footer {
            background: #f8f9fa;
            padding: 40px 20px;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="hero">
        <h1>${this.client.business_name}</h1>
        <p>${this.client.unique_selling_proposition}</p>
        <a href="mailto:${config.BUSINESS.EMAIL}" class="cta-button">${this.client.goal}</a>
    </div>
    
    <div class="features">
        ${this.strategy.content_pillars.map((pillar, i) => `
            <div class="feature">
                <div style="font-size: 48px;">✨</div>
                <h3>${pillar}</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
        `).join('')}
    </div>
    
    <div class="footer">
        <p>Powered by <strong>${config.BUSINESS.BRAND}</strong></p>
    </div>
</body>
</html>`;

        fs.writeFileSync(
            path.join(this.outputDir, 'landing-pages', 'index.html'),
            landingPageHTML
        );

        console.log(`${colors.green}✅ Landing page generated${colors.reset}`);
        console.log(`${colors.blue}   URL: ${config.BUSINESS.WEBSITE}/${slug}${colors.reset}\n`);
    }

    async generateAdCopy() {
        console.log(`${colors.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
        console.log(`${colors.bright}📢 STEP 6: Generating Ad Copy${colors.reset}`);
        console.log(`${colors.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}\n`);

        const response = await openai.chat.completions.create({
            model: 'gpt-4o',
            messages: [
                { role: 'system', content: 'You are an expert ad copywriter. Return only valid JSON.' },
                { role: 'user', content: `Generate 10 Facebook/Instagram ad variants for ${this.client.business_name}. Goal: ${this.client.goal}. Return JSON array with headline, primary_text, cta, ad_format.` }
            ],
            temperature: 0.9
        });

        const content = response.choices[0].message.content.trim();
        const jsonMatch = content.match(/```json\n([\s\S]*?)\n```/) || content.match(/```\n([\s\S]*?)\n```/);
        const jsonString = jsonMatch ? jsonMatch[1] : content;
        const adCopy = JSON.parse(jsonString);

        fs.writeFileSync(
            path.join(this.outputDir, 'ads', 'ad-copy-variants.json'),
            JSON.stringify(adCopy, null, 2)
        );

        console.log(`${colors.green}✅ Ad copy generated: ${adCopy.length} variants${colors.reset}\n`);
    }

    async generateEmailSequence() {
        console.log(`${colors.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
        console.log(`${colors.bright}📧 STEP 7: Generating Email Sequence${colors.reset}`);
        console.log(`${colors.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}\n`);

        const response = await openai.chat.completions.create({
            model: 'gpt-4o',
            messages: [
                { role: 'system', content: 'You are an expert email marketer. Return only valid JSON.' },
                { role: 'user', content: `Generate a 7-email welcome sequence for ${this.client.business_name}. Goal: ${this.client.goal}. Return JSON array with day, subject, preview_text, body (HTML), cta.` }
            ],
            temperature: 0.8,
            max_tokens: 3000
        });

        const content = response.choices[0].message.content.trim();
        const jsonMatch = content.match(/```json\n([\s\S]*?)\n```/) || content.match(/```\n([\s\S]*?)\n```/);
        const jsonString = jsonMatch ? jsonMatch[1] : content;
        const emailSequence = JSON.parse(jsonString);

        fs.writeFileSync(
            path.join(this.outputDir, 'emails', 'welcome-sequence.json'),
            JSON.stringify(emailSequence, null, 2)
        );

        console.log(`${colors.green}✅ Email sequence generated: ${emailSequence.length} emails${colors.reset}\n`);
    }

    saveMetadata() {
        const metadata = {
            generated_at: new Date().toISOString(),
            generation_time_seconds: Math.round((Date.now() - this.startTime) / 1000),
            client: this.client,
            strategy: this.strategy,
            output_directory: this.outputDir,
            deliverables: {
                strategy: true,
                campaign_30_days: this.campaign.length,
                blog_ideas: true,
                video_scripts: true,
                landing_pages: true,
                ad_copy_variants: true,
                email_sequence: true
            }
        };

        fs.writeFileSync(
            path.join(this.outputDir, 'metadata.json'),
            JSON.stringify(metadata, null, 2)
        );
    }

    printSummary() {
        const duration = Math.round((Date.now() - this.startTime) / 1000);

        console.log(`${colors.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
        console.log(`${colors.bright}${colors.green}✅ MARKETING CAMPAIGN GENERATED SUCCESSFULLY!${colors.reset}`);
        console.log(`${colors.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}\n`);

        console.log(`${colors.bright}📊 CLIENT:${colors.reset}`);
        console.log(`   Business: ${this.client.business_name}`);
        console.log(`   Industry: ${this.client.industry}`);
        console.log(`   Goal: ${this.client.goal}`);
        console.log(`   Generation time: ${duration} seconds\n`);

        console.log(`${colors.bright}📁 DELIVERABLES:${colors.reset}`);
        console.log(`   ✅ Marketing Strategy`);
        console.log(`   ✅ 30-Day Campaign (${this.campaign.length} posts)`);
        console.log(`   ✅ 10 Blog Ideas`);
        console.log(`   ✅ 5 Video Scripts`);
        console.log(`   ✅ Landing Pages`);
        console.log(`   ✅ 10 Ad Copy Variants`);
        console.log(`   ✅ 7-Email Welcome Sequence\n`);

        console.log(`${colors.bright}📋 OUTPUT DIRECTORY:${colors.reset}`);
        console.log(`   ${this.outputDir}\n`);

        console.log(`${colors.green}${colors.bright}🚀 READY TO LAUNCH CAMPAIGN!${colors.reset}\n`);
    }
}

async function main() {
    const brief = process.argv.slice(2).join(' ');

    if (!brief) {
        console.log(`\n${colors.bright}Usage:${colors.reset}`);
        console.log(`  node MARKETING_AGENCY_AUTO.js "Client: Fitness Gym, Goal: Get 100 members"\n`);
        console.log(`${colors.bright}Examples:${colors.reset}`);
        console.log(`  node MARKETING_AGENCY_AUTO.js "Client: Coffee Shop, Goal: Increase foot traffic"`);
        console.log(`  node MARKETING_AGENCY_AUTO.js "Client: Online Course, Goal: Sell 500 courses"`);
        console.log(`  node MARKETING_AGENCY_AUTO.js "Client: Real Estate, Goal: Generate leads"\n`);
        process.exit(1);
    }

    const agency = new MarketingAgencyAutomation(brief);
    await agency.generate();
}

if (require.main === module) {
    main().catch(error => {
        console.error(`\n${colors.bright}❌ FATAL ERROR:${colors.reset}`, error);
        process.exit(1);
    });
}

module.exports = MarketingAgencyAutomation;

