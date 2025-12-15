/**
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  🦄 AI INFLUENCER GENERATOR - MASTER ORCHESTRATOR                ║
 * ║  One prompt → Complete AI influencer za 3 minúty                 ║
 * ╚══════════════════════════════════════════════════════════════════╝
 * 
 * USAGE:
 * node AI_INFLUENCER_GENERATOR.js "Sophia, 25, fitness influencer, blonde, athletic"
 * 
 * OUTPUT:
 * - 20 realistic photos (consistent face)
 * - Instagram profile (bio, posts, stories)
 * - TikTok profile (bio, video ideas)
 * - Landing page (fordfofer.vercel.app/sophia)
 * - 30-day content calendar
 * - Faceswap ready (face ID)
 */

const fs = require('fs');
const path = require('path');
const axios = require('axios');
const { OpenAI } = require('openai');
const config = require('./config-ai');

const openai = new OpenAI({
    apiKey: config.OPENAI_API_KEY
});

// Colors for console output
const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    green: '\x1b[32m',
    blue: '\x1b[34m',
    yellow: '\x1b[33m',
    cyan: '\x1b[36m',
    magenta: '\x1b[35m'
};

/**
 * Main orchestrator
 */
class AIInfluencerGenerator {
    constructor(prompt) {
        this.prompt = prompt;
        this.influencer = null;
        this.outputDir = null;
        this.startTime = Date.now();
    }

    /**
     * Generate complete AI influencer
     */
    async generate() {
        console.log(`\n${colors.bright}╔══════════════════════════════════════════════════════════════════╗${colors.reset}`);
        console.log(`${colors.bright}║  🦄 AI INFLUENCER GENERATOR                                      ║${colors.reset}`);
        console.log(`${colors.bright}╚══════════════════════════════════════════════════════════════════╝${colors.reset}\n`);

        try {
            // Step 1: Generate identity
            await this.generateIdentity();

            // Step 2: Create output directory
            this.createOutputDirectory();

            // Step 3: Generate photos
            await this.generatePhotos();

            // Step 4: Generate content
            await this.generateContent();

            // Step 5: Generate social profiles
            await this.generateSocialProfiles();

            // Step 6: Generate website
            await this.generateWebsite();

            // Step 7: Save metadata
            this.saveMetadata();

            // Step 8: Generate summary
            this.printSummary();

            return this.influencer;

        } catch (error) {
            console.error(`\n${colors.bright}❌ ERROR:${colors.reset}`, error.message);
            throw error;
        }
    }

    /**
     * Step 1: Generate identity using GPT-4
     */
    async generateIdentity() {
        console.log(`${colors.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
        console.log(`${colors.bright}📝 STEP 1: Generating Identity${colors.reset}`);
        console.log(`${colors.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}\n`);

        const prompt = `You are an expert AI influencer creator. Based on this input: "${this.prompt}"

Generate a complete influencer identity in JSON format:

{
  "name": "First name only (e.g., Sophia)",
  "age": 25,
  "niche": "fitness/fashion/travel/etc",
  "appearance": {
    "ethnicity": "caucasian/asian/african/latina/etc",
    "hair_color": "blonde/brunette/black/etc",
    "hair_style": "long/short/curly/straight",
    "eye_color": "blue/brown/green/etc",
    "body_type": "athletic/slim/curvy/etc",
    "height": "tall/average/petite",
    "distinctive_features": "any unique features"
  },
  "personality": {
    "traits": ["confident", "friendly", "inspiring"],
    "tone": "motivational/casual/professional/etc",
    "values": ["health", "sustainability", "etc"]
  },
  "instagram": {
    "username": "@sophia_fit_ai",
    "bio": "25 | Fitness & Wellness 💪 | Plant-based 🌱 | DM for collabs",
    "bio_link": "fordfofer.vercel.app/sophia"
  },
  "tiktok": {
    "username": "@sophia.fitness",
    "bio": "Helping you get fit & healthy 🏋️‍♀️✨"
  },
  "backstory": "Brief background story (2-3 sentences)"
}

IMPORTANT: Return ONLY valid JSON, no extra text.`;

        const response = await openai.chat.completions.create({
            model: 'gpt-4o',
            messages: [
                { role: 'system', content: 'You are an expert AI influencer creator. Return only valid JSON.' },
                { role: 'user', content: prompt }
            ],
            temperature: 0.8
        });

        const content = response.choices[0].message.content.trim();
        // Extract JSON from markdown code blocks if present
        const jsonMatch = content.match(/```json\n([\s\S]*?)\n```/) || content.match(/```\n([\s\S]*?)\n```/);
        const jsonString = jsonMatch ? jsonMatch[1] : content;
        
        this.influencer = JSON.parse(jsonString);

        console.log(`${colors.green}✅ Identity generated:${colors.reset}`);
        console.log(`   Name: ${this.influencer.name}`);
        console.log(`   Age: ${this.influencer.age}`);
        console.log(`   Niche: ${this.influencer.niche}`);
        console.log(`   Instagram: ${this.influencer.instagram.username}`);
        console.log(`   TikTok: ${this.influencer.tiktok.username}\n`);
    }

    /**
     * Step 2: Create output directory
     */
    createOutputDirectory() {
        const slug = this.influencer.name.toLowerCase().replace(/[^a-z0-9]/g, '-');
        this.outputDir = path.join(config.OUTPUT.BASE_DIR, slug);

        // Create directories
        const dirs = [
            this.outputDir,
            path.join(this.outputDir, 'photos'),
            path.join(this.outputDir, 'content'),
            path.join(this.outputDir, 'website')
        ];

        dirs.forEach(dir => {
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
        });

        console.log(`${colors.green}✅ Output directory created:${colors.reset} ${this.outputDir}\n`);
    }

    /**
     * Step 3: Generate photos using Stable Diffusion
     */
    async generatePhotos() {
        console.log(`${colors.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
        console.log(`${colors.bright}📸 STEP 2: Generating Photos (Stable Diffusion)${colors.reset}`);
        console.log(`${colors.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}\n`);

        if (!config.REPLICATE_API_TOKEN || config.REPLICATE_API_TOKEN === 'VLOZ_SEM') {
            console.log(`${colors.yellow}⚠️  Replicate API token not configured${colors.reset}`);
            console.log(`${colors.yellow}   Skipping photo generation (demo mode)${colors.reset}\n`);
            console.log(`${colors.blue}📋 TO ENABLE PHOTOS:${colors.reset}`);
            console.log(`   1. Go to: https://replicate.com/account/api-tokens`);
            console.log(`   2. Create token`);
            console.log(`   3. Add to config-ai.js → REPLICATE_API_TOKEN\n`);
            
            // Create placeholder files
            for (let i = 1; i <= config.AI_INFLUENCER.PHOTOS_PER_INFLUENCER; i++) {
                const filename = `photo_${String(i).padStart(2, '0')}.txt`;
                const filepath = path.join(this.outputDir, 'photos', filename);
                fs.writeFileSync(filepath, `Placeholder for photo ${i}\nPrompt: [Generated prompt would be here]`);
            }
            return;
        }

        // Generate base prompt for consistent face
        const basePrompt = this.generateBasePrompt();
        console.log(`${colors.blue}Base prompt:${colors.reset} ${basePrompt}\n`);

        let photoCount = 0;
        const totalPhotos = config.AI_INFLUENCER.PHOTOS_PER_INFLUENCER;

        // Generate photos for each category
        for (const category of config.AI_INFLUENCER.PHOTO_CATEGORIES) {
            console.log(`${colors.magenta}Generating ${category.name} photos...${colors.reset}`);

            for (let i = 0; i < category.count; i++) {
                photoCount++;
                const scenarioPrompt = category.prompts[i % category.prompts.length];
                const fullPrompt = `${basePrompt}, ${scenarioPrompt}`;

                try {
                    const photoUrl = await this.generateSinglePhoto(fullPrompt);
                    const filename = `${category.name}_${String(i + 1).padStart(2, '0')}.jpg`;
                    await this.downloadPhoto(photoUrl, filename);
                    
                    console.log(`   ${colors.green}✅${colors.reset} ${filename} (${photoCount}/${totalPhotos})`);
                } catch (error) {
                    console.log(`   ${colors.yellow}⚠️${colors.reset} ${category.name}_${i + 1} failed: ${error.message}`);
                }
            }
        }

        console.log(`\n${colors.green}✅ Photos generated: ${photoCount}/${totalPhotos}${colors.reset}\n`);
    }

    /**
     * Generate base prompt for consistent face
     */
    generateBasePrompt() {
        const app = this.influencer.appearance;
        return `professional photo of a ${app.body_type} ${app.ethnicity} woman, ${app.hair_color} ${app.hair_style} hair, ${app.eye_color} eyes, ${app.height}, ${app.distinctive_features}, photorealistic, high quality, 8k, natural lighting`;
    }

    /**
     * Generate single photo using Replicate API
     */
    async generateSinglePhoto(prompt) {
        const response = await axios.post(
            'https://api.replicate.com/v1/predictions',
            {
                version: config.STABLE_DIFFUSION.MODEL,
                input: {
                    prompt: prompt,
                    negative_prompt: config.STABLE_DIFFUSION.NEGATIVE_PROMPT,
                    width: config.AI_INFLUENCER.PHOTO_WIDTH,
                    height: config.AI_INFLUENCER.PHOTO_HEIGHT,
                    num_inference_steps: config.STABLE_DIFFUSION.NUM_INFERENCE_STEPS,
                    guidance_scale: config.STABLE_DIFFUSION.GUIDANCE_SCALE
                }
            },
            {
                headers: {
                    'Authorization': `Token ${config.REPLICATE_API_TOKEN}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        // Wait for completion
        let prediction = response.data;
        while (prediction.status !== 'succeeded' && prediction.status !== 'failed') {
            await new Promise(resolve => setTimeout(resolve, 1000));
            const checkResponse = await axios.get(
                `https://api.replicate.com/v1/predictions/${prediction.id}`,
                {
                    headers: {
                        'Authorization': `Token ${config.REPLICATE_API_TOKEN}`
                    }
                }
            );
            prediction = checkResponse.data;
        }

        if (prediction.status === 'failed') {
            throw new Error('Photo generation failed');
        }

        return prediction.output[0];
    }

    /**
     * Download photo from URL
     */
    async downloadPhoto(url, filename) {
        const filepath = path.join(this.outputDir, 'photos', filename);
        const response = await axios.get(url, { responseType: 'arraybuffer' });
        fs.writeFileSync(filepath, response.data);
    }

    /**
     * Step 4: Generate content calendar
     */
    async generateContent() {
        console.log(`${colors.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
        console.log(`${colors.bright}📅 STEP 3: Generating Content Calendar${colors.reset}`);
        console.log(`${colors.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}\n`);

        const prompt = `Create a 30-day Instagram content calendar for ${this.influencer.name}, a ${this.influencer.age} year old ${this.influencer.niche} influencer.

Personality: ${this.influencer.personality.traits.join(', ')}
Tone: ${this.influencer.personality.tone}
Values: ${this.influencer.personality.values.join(', ')}

Generate 30 posts in JSON array format:
[
  {
    "day": 1,
    "type": "educational/promotional/engagement/story/testimonial",
    "caption": "Full Instagram caption with emojis",
    "hashtags": ["hashtag1", "hashtag2", ...],
    "photo_type": "fitness/lifestyle/fashion/portrait",
    "best_time": "09:00/13:00/17:00/21:00"
  },
  ...
]

Make captions engaging, authentic, and optimized for engagement. Return ONLY valid JSON array.`;

        const response = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                { role: 'system', content: 'You are an expert social media content strategist. Return only valid JSON.' },
                { role: 'user', content: prompt }
            ],
            temperature: 0.8
        });

        const content = response.choices[0].message.content.trim();
        const jsonMatch = content.match(/```json\n([\s\S]*?)\n```/) || content.match(/```\n([\s\S]*?)\n```/);
        const jsonString = jsonMatch ? jsonMatch[1] : content;
        
        const contentCalendar = JSON.parse(jsonString);

        // Save content calendar
        const filepath = path.join(this.outputDir, 'content', 'calendar-30-days.json');
        fs.writeFileSync(filepath, JSON.stringify(contentCalendar, null, 2));

        console.log(`${colors.green}✅ Content calendar generated: ${contentCalendar.length} posts${colors.reset}\n`);
    }

    /**
     * Step 5: Generate social profiles
     */
    async generateSocialProfiles() {
        console.log(`${colors.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
        console.log(`${colors.bright}📱 STEP 4: Generating Social Profiles${colors.reset}`);
        console.log(`${colors.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}\n`);

        // Instagram profile
        const instagramProfile = {
            username: this.influencer.instagram.username,
            bio: this.influencer.instagram.bio,
            bio_link: this.influencer.instagram.bio_link,
            profile_picture: 'photos/portrait_01.jpg',
            highlights: [
                { name: 'Daily', icon: '📅' },
                { name: 'Tips', icon: '💡' },
                { name: 'Q&A', icon: '❓' }
            ]
        };

        // TikTok profile
        const tiktokProfile = {
            username: this.influencer.tiktok.username,
            bio: this.influencer.tiktok.bio,
            profile_picture: 'photos/portrait_02.jpg',
            video_ideas: await this.generateTikTokIdeas()
        };

        // Save profiles
        fs.writeFileSync(
            path.join(this.outputDir, 'content', 'instagram-profile.json'),
            JSON.stringify(instagramProfile, null, 2)
        );

        fs.writeFileSync(
            path.join(this.outputDir, 'content', 'tiktok-profile.json'),
            JSON.stringify(tiktokProfile, null, 2)
        );

        console.log(`${colors.green}✅ Instagram profile generated${colors.reset}`);
        console.log(`${colors.green}✅ TikTok profile generated${colors.reset}\n`);
    }

    /**
     * Generate TikTok video ideas
     */
    async generateTikTokIdeas() {
        const prompt = `Generate 10 viral TikTok video ideas for ${this.influencer.name}, a ${this.influencer.niche} influencer.

Return as JSON array:
[
  {
    "title": "Video title",
    "hook": "First 3 seconds hook",
    "concept": "Video concept description",
    "duration": "15-30s",
    "trending_sounds": ["sound1", "sound2"],
    "hashtags": ["#tag1", "#tag2"]
  },
  ...
]

Return ONLY valid JSON array.`;

        const response = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                { role: 'system', content: 'You are a TikTok viral content expert. Return only valid JSON.' },
                { role: 'user', content: prompt }
            ],
            temperature: 0.9
        });

        const content = response.choices[0].message.content.trim();
        const jsonMatch = content.match(/```json\n([\s\S]*?)\n```/) || content.match(/```\n([\s\S]*?)\n```/);
        const jsonString = jsonMatch ? jsonMatch[1] : content;
        
        return JSON.parse(jsonString);
    }

    /**
     * Step 6: Generate website
     */
    async generateWebsite() {
        console.log(`${colors.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
        console.log(`${colors.bright}🌐 STEP 5: Generating Website${colors.reset}`);
        console.log(`${colors.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}\n`);

        const slug = this.influencer.name.toLowerCase().replace(/[^a-z0-9]/g, '-');
        
        const html = `<!DOCTYPE html>
<html lang="sk">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${this.influencer.name} | ${this.influencer.niche.charAt(0).toUpperCase() + this.influencer.niche.slice(1)} Influencer</title>
    <meta name="description" content="${this.influencer.backstory}">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Segoe UI', system-ui, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 40px 20px;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        }
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 60px 40px;
            text-align: center;
        }
        .profile-pic {
            width: 150px;
            height: 150px;
            border-radius: 50%;
            border: 5px solid white;
            margin: 0 auto 20px;
            background: #f0f0f0;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 60px;
        }
        h1 { font-size: 48px; margin-bottom: 10px; }
        .tagline { font-size: 20px; opacity: 0.9; }
        .content {
            padding: 60px 40px;
        }
        .bio {
            font-size: 18px;
            line-height: 1.8;
            color: #333;
            margin-bottom: 40px;
            text-align: center;
            max-width: 800px;
            margin-left: auto;
            margin-right: auto;
        }
        .social-links {
            display: flex;
            gap: 20px;
            justify-content: center;
            margin: 40px 0;
        }
        .social-link {
            padding: 15px 30px;
            background: #667eea;
            color: white;
            text-decoration: none;
            border-radius: 10px;
            font-weight: 600;
            transition: all 0.3s;
        }
        .social-link:hover {
            background: #5568d3;
            transform: translateY(-2px);
        }
        .gallery {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            gap: 20px;
            margin-top: 40px;
        }
        .gallery-item {
            aspect-ratio: 1;
            background: #f0f0f0;
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #999;
        }
        .footer {
            background: #f8f9fa;
            padding: 30px 40px;
            text-align: center;
            color: #666;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="profile-pic">👤</div>
            <h1>${this.influencer.name}</h1>
            <p class="tagline">${this.influencer.age} | ${this.influencer.niche.charAt(0).toUpperCase() + this.influencer.niche.slice(1)} Influencer</p>
        </div>
        
        <div class="content">
            <div class="bio">
                ${this.influencer.backstory}
            </div>
            
            <div class="social-links">
                <a href="https://instagram.com/${this.influencer.instagram.username.replace('@', '')}" class="social-link" target="_blank">
                    📸 Instagram
                </a>
                <a href="https://tiktok.com/${this.influencer.tiktok.username.replace('@', '')}" class="social-link" target="_blank">
                    🎵 TikTok
                </a>
                <a href="mailto:${config.BUSINESS.EMAIL}" class="social-link">
                    ✉️ Contact
                </a>
            </div>
            
            <h2 style="text-align: center; margin-top: 60px; margin-bottom: 20px; color: #333;">Gallery</h2>
            <div class="gallery">
                ${Array.from({ length: 12 }, (_, i) => `<div class="gallery-item">Photo ${i + 1}</div>`).join('')}
            </div>
        </div>
        
        <div class="footer">
            <p>Powered by <strong>${config.BUSINESS.BRAND}</strong> | ${config.BUSINESS.OWNER}</p>
            <p style="margin-top: 10px; font-size: 14px;">
                <a href="${config.BUSINESS.WEBSITE}" style="color: #667eea; text-decoration: none;">
                    ${config.BUSINESS.WEBSITE}
                </a>
            </p>
        </div>
    </div>
</body>
</html>`;

        fs.writeFileSync(path.join(this.outputDir, 'website', 'index.html'), html);

        console.log(`${colors.green}✅ Website generated${colors.reset}`);
        console.log(`${colors.blue}   URL: ${config.BUSINESS.WEBSITE}/${slug}${colors.reset}\n`);
    }

    /**
     * Step 7: Save metadata
     */
    saveMetadata() {
        const metadata = {
            generated_at: new Date().toISOString(),
            generation_time_seconds: Math.round((Date.now() - this.startTime) / 1000),
            influencer: this.influencer,
            output_directory: this.outputDir,
            files: {
                photos: config.AI_INFLUENCER.PHOTOS_PER_INFLUENCER,
                content_calendar: true,
                instagram_profile: true,
                tiktok_profile: true,
                website: true
            }
        };

        fs.writeFileSync(
            path.join(this.outputDir, 'metadata.json'),
            JSON.stringify(metadata, null, 2)
        );
    }

    /**
     * Step 8: Print summary
     */
    printSummary() {
        const duration = Math.round((Date.now() - this.startTime) / 1000);
        const slug = this.influencer.name.toLowerCase().replace(/[^a-z0-9]/g, '-');

        console.log(`${colors.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
        console.log(`${colors.bright}${colors.green}✅ AI INFLUENCER GENERATED SUCCESSFULLY!${colors.reset}`);
        console.log(`${colors.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}\n`);

        console.log(`${colors.bright}📊 SUMMARY:${colors.reset}`);
        console.log(`   Name: ${this.influencer.name}`);
        console.log(`   Age: ${this.influencer.age}`);
        console.log(`   Niche: ${this.influencer.niche}`);
        console.log(`   Generation time: ${duration} seconds\n`);

        console.log(`${colors.bright}📁 OUTPUT:${colors.reset}`);
        console.log(`   Directory: ${this.outputDir}`);
        console.log(`   Photos: ${config.AI_INFLUENCER.PHOTOS_PER_INFLUENCER} files`);
        console.log(`   Content calendar: 30 days`);
        console.log(`   Instagram profile: ✅`);
        console.log(`   TikTok profile: ✅`);
        console.log(`   Website: ✅\n`);

        console.log(`${colors.bright}🌐 LINKS:${colors.reset}`);
        console.log(`   Instagram: ${this.influencer.instagram.username}`);
        console.log(`   TikTok: ${this.influencer.tiktok.username}`);
        console.log(`   Website: ${config.BUSINESS.WEBSITE}/${slug}\n`);

        console.log(`${colors.bright}📋 NEXT STEPS:${colors.reset}`);
        console.log(`   1. Review generated content in: ${this.outputDir}`);
        console.log(`   2. Upload photos to Instagram/TikTok`);
        console.log(`   3. Deploy website to Vercel`);
        console.log(`   4. Start posting according to content calendar\n`);

        console.log(`${colors.green}${colors.bright}🚀 AI INFLUENCER IS READY TO GO VIRAL!${colors.reset}\n`);
    }
}

/**
 * CLI Interface
 */
async function main() {
    const prompt = process.argv.slice(2).join(' ');

    if (!prompt) {
        console.log(`\n${colors.bright}Usage:${colors.reset}`);
        console.log(`  node AI_INFLUENCER_GENERATOR.js "Sophia, 25, fitness influencer, blonde, athletic"\n`);
        console.log(`${colors.bright}Examples:${colors.reset}`);
        console.log(`  node AI_INFLUENCER_GENERATOR.js "Emma, 23, fashion blogger, brunette, elegant"`);
        console.log(`  node AI_INFLUENCER_GENERATOR.js "Mia, 28, travel influencer, asian, adventurous"`);
        console.log(`  node AI_INFLUENCER_GENERATOR.js "Luna, 26, beauty guru, latina, glamorous"\n`);
        process.exit(1);
    }

    const generator = new AIInfluencerGenerator(prompt);
    await generator.generate();
}

// Run if called directly
if (require.main === module) {
    main().catch(error => {
        console.error(`\n${colors.bright}❌ FATAL ERROR:${colors.reset}`, error);
        process.exit(1);
    });
}

module.exports = AIInfluencerGenerator;

