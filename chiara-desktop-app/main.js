const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const axios = require('axios');
const { OpenAI } = require('openai');
const fs = require('fs');

let mainWindow;
let openai;

// Configuration
const config = {
    OPENAI_API_KEY: 'REMOVED_OPENAI_KEY',
    REPLICATE_API_TOKEN: 'VLOZ_SEM',
    OUTPUT_DIR: path.join(app.getPath('documents'), 'ChiarasAIStudio')
};

function createWindow() {
    const windowConfig = {
        width: 1400,
        height: 900,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js')
        },
        backgroundColor: '#f9fafb',
        autoHideMenuBar: true
    };
    
    // Add icon only if it exists (optional)
    const iconPath = path.join(__dirname, 'assets', 'icon.png');
    if (fs.existsSync(iconPath)) {
        windowConfig.icon = iconPath;
    }
    
    mainWindow = new BrowserWindow(windowConfig);

    mainWindow.loadFile('index.html');

    // Open DevTools in development
    // mainWindow.webContents.openDevTools();
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });

    // Create output directory
    if (!fs.existsSync(config.OUTPUT_DIR)) {
        fs.mkdirSync(config.OUTPUT_DIR, { recursive: true });
    }
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// IPC Handlers

// Set API Key
ipcMain.handle('set-api-key', async (event, apiKey) => {
    try {
        config.OPENAI_API_KEY = apiKey;
        openai = new OpenAI({ apiKey: apiKey });
        
        // Test API key
        await openai.models.list();
        
        return { success: true, message: 'API key set successfully' };
    } catch (error) {
        return { success: false, message: error.message };
    }
});

// Generate AI Influencer
ipcMain.handle('generate-influencer', async (event, prompt) => {
    try {
        if (!openai) {
            openai = new OpenAI({ apiKey: config.OPENAI_API_KEY });
        }

        // Send progress updates
        event.sender.send('generation-progress', { step: 'identity', progress: 10 });

        // Step 1: Generate Identity
        const identityPrompt = `You are an expert AI influencer creator. Based on this input: "${prompt}"

Generate a complete influencer identity in JSON format:
{
  "name": "First name only",
  "age": 25,
  "niche": "fitness/fashion/travel/etc",
  "appearance": {
    "ethnicity": "caucasian/asian/african/latina/etc",
    "hair_color": "blonde/brunette/black/etc",
    "hair_style": "long/short/curly/straight",
    "eye_color": "blue/brown/green/etc",
    "body_type": "athletic/slim/curvy/etc"
  },
  "personality": {
    "traits": ["confident", "friendly", "inspiring"],
    "tone": "motivational/casual/professional/etc"
  },
  "instagram": {
    "username": "@name_niche_ai",
    "bio": "Bio with emojis"
  },
  "tiktok": {
    "username": "@name.niche",
    "bio": "Bio with emojis"
  },
  "backstory": "Brief background (2-3 sentences)"
}

Return ONLY valid JSON.`;

        const identityResponse = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                { role: 'system', content: 'You are an expert AI influencer creator. Return only valid JSON.' },
                { role: 'user', content: identityPrompt }
            ],
            temperature: 0.8
        });

        const content = identityResponse.choices[0].message.content.trim();
        const jsonMatch = content.match(/```json\n([\s\S]*?)\n```/) || content.match(/```\n([\s\S]*?)\n```/);
        const jsonString = jsonMatch ? jsonMatch[1] : content;
        const influencer = JSON.parse(jsonString);

        event.sender.send('generation-progress', { step: 'content', progress: 40 });

        // Step 2: Generate Content Calendar
        const contentPrompt = `Create a 7-day Instagram content calendar for ${influencer.name}, a ${influencer.age} year old ${influencer.niche} influencer.

Generate 7 posts in JSON array:
[
  {
    "day": 1,
    "type": "educational/promotional/engagement",
    "caption": "Full caption with emojis",
    "hashtags": ["hashtag1", "hashtag2"],
    "best_time": "09:00"
  }
]

Return ONLY valid JSON array.`;

        const contentResponse = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                { role: 'system', content: 'You are an expert social media strategist. Return only valid JSON.' },
                { role: 'user', content: contentPrompt }
            ],
            temperature: 0.8
        });

        const contentText = contentResponse.choices[0].message.content.trim();
        const contentMatch = contentText.match(/```json\n([\s\S]*?)\n```/) || contentText.match(/```\n([\s\S]*?)\n```/);
        const contentString = contentMatch ? contentMatch[1] : contentText;
        const contentCalendar = JSON.parse(contentString);

        event.sender.send('generation-progress', { step: 'saving', progress: 80 });

        // Save to file
        const slug = influencer.name.toLowerCase().replace(/[^a-z0-9]/g, '-');
        const outputDir = path.join(config.OUTPUT_DIR, 'influencers', slug);
        
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        const output = {
            influencer,
            contentCalendar,
            generated_at: new Date().toISOString(),
            prompt
        };

        fs.writeFileSync(
            path.join(outputDir, 'influencer.json'),
            JSON.stringify(output, null, 2)
        );

        event.sender.send('generation-progress', { step: 'complete', progress: 100 });

        return {
            success: true,
            influencer,
            contentCalendar,
            outputPath: outputDir
        };

    } catch (error) {
        event.sender.send('generation-progress', { step: 'error', progress: 0 });
        return {
            success: false,
            message: error.message
        };
    }
});

// Generate Marketing Campaign
ipcMain.handle('generate-campaign', async (event, clientBrief) => {
    try {
        if (!openai) {
            openai = new OpenAI({ apiKey: config.OPENAI_API_KEY });
        }

        event.sender.send('generation-progress', { step: 'analyzing', progress: 10 });

        // Step 1: Analyze Client
        const analysisPrompt = `Analyze this client brief: "${clientBrief}"

Generate JSON:
{
  "business_name": "Business name",
  "industry": "Industry",
  "goal": "Primary goal",
  "target_audience": "Description"
}

Return ONLY valid JSON.`;

        const analysisResponse = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                { role: 'system', content: 'You are an expert marketing strategist. Return only valid JSON.' },
                { role: 'user', content: analysisPrompt }
            ],
            temperature: 0.7
        });

        const analysisContent = analysisResponse.choices[0].message.content.trim();
        const analysisMatch = analysisContent.match(/```json\n([\s\S]*?)\n```/) || analysisContent.match(/```\n([\s\S]*?)\n```/);
        const analysisString = analysisMatch ? analysisMatch[1] : analysisContent;
        const client = JSON.parse(analysisString);

        event.sender.send('generation-progress', { step: 'campaign', progress: 50 });

        // Step 2: Generate Campaign
        const campaignPrompt = `Create a 7-day social media campaign for ${client.business_name}.

Generate 7 posts:
[
  {
    "day": 1,
    "platform": "Instagram",
    "caption": "Full caption",
    "cta": "Call to action",
    "best_time": "09:00"
  }
]

Return ONLY valid JSON array.`;

        const campaignResponse = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                { role: 'system', content: 'You are an expert social media strategist. Return only valid JSON.' },
                { role: 'user', content: campaignPrompt }
            ],
            temperature: 0.8
        });

        const campaignContent = campaignResponse.choices[0].message.content.trim();
        const campaignMatch = campaignContent.match(/```json\n([\s\S]*?)\n```/) || campaignContent.match(/```\n([\s\S]*?)\n```/);
        const campaignString = campaignMatch ? campaignMatch[1] : campaignContent;
        const campaign = JSON.parse(campaignString);

        event.sender.send('generation-progress', { step: 'saving', progress: 80 });

        // Save to file
        const slug = client.business_name.toLowerCase().replace(/[^a-z0-9]/g, '-');
        const outputDir = path.join(config.OUTPUT_DIR, 'campaigns', slug);
        
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        const output = {
            client,
            campaign,
            generated_at: new Date().toISOString(),
            clientBrief
        };

        fs.writeFileSync(
            path.join(outputDir, 'campaign.json'),
            JSON.stringify(output, null, 2)
        );

        event.sender.send('generation-progress', { step: 'complete', progress: 100 });

        return {
            success: true,
            client,
            campaign,
            outputPath: outputDir
        };

    } catch (error) {
        event.sender.send('generation-progress', { step: 'error', progress: 0 });
        return {
            success: false,
            message: error.message
        };
    }
});

// Open output folder
ipcMain.handle('open-output-folder', async (event, folderPath) => {
    const { shell } = require('electron');
    
    // If 'default' is passed, use the default output directory
    const pathToOpen = folderPath === 'default' ? config.OUTPUT_DIR : folderPath;
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(pathToOpen)) {
        fs.mkdirSync(pathToOpen, { recursive: true });
    }
    
    shell.openPath(pathToOpen);
});

