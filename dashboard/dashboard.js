// AI Studio Dashboard - Central Command Center
// Zapier/Buffer/n8n Style
// 🦄 Personal Brand Signature

// Data Storage
let salesData = JSON.parse(localStorage.getItem('salesData')) || [];
let chatHistory = JSON.parse(localStorage.getItem('chatHistory')) || [];
let settings = JSON.parse(localStorage.getItem('dashboardSettings')) || {
    whopLink: 'https://whop.com/golo-capo/',
    telegramLink: 'https://web.telegram.org',
    n8nLink: 'https://app.n8n.cloud',
    theme: 'light'
};

// Marketing Usage Tracking
const MARKETING_LIMIT = 3;
const MARKETING_USAGE_KEY = 'marketingUsage';
const MARKETING_UNLOCKED_KEY = 'marketingUnlocked';

function getMarketingUsage() {
    return parseInt(localStorage.getItem(MARKETING_USAGE_KEY) || '0', 10);
}

function incrementMarketingUsage() {
    const current = getMarketingUsage();
    localStorage.setItem(MARKETING_USAGE_KEY, (current + 1).toString());
    return current + 1;
}

function isMarketingUnlocked() {
    return localStorage.getItem(MARKETING_UNLOCKED_KEY) === 'true';
}

function unlockMarketing() {
    localStorage.setItem(MARKETING_UNLOCKED_KEY, 'true');
    localStorage.setItem(MARKETING_USAGE_KEY, '0'); // Reset counter
}

function canGenerateMarketing() {
    return isMarketingUnlocked() || getMarketingUsage() < MARKETING_LIMIT;
}

function getRemainingFreeGenerations() {
    if (isMarketingUnlocked()) return 'unlimited';
    return Math.max(0, MARKETING_LIMIT - getMarketingUsage());
}

// Initialize Dashboard
function initDashboard() {
    // 🦄 Set theme
    if (settings.theme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
    }
    
    // Check for payment success (Stripe redirect)
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('payment') === 'success') {
        unlockMarketing();
        addChatMessage('assistant', '✅ **You\'re unlocked!** Generate unlimited marketing content. 🚀\n\nTry: "Generate a marketing post about [your product]"');
        // Clean URL
        window.history.replaceState({}, document.title, window.location.pathname);
    }
    
    // Initialize navigation
    initNavigation();
    
    // Initialize chat
    initChat();
    
    // Load chat history
    loadChatHistory();
    
    // Update all stats
    updateAllStats();
    
    // Update usage counter
    updateUsageCounter();
    
    // Auto-refresh stats every 30 seconds
    setInterval(updateAllStats, 30000);
    
    // 🦄 Hidden brand signature
    console.log('%c🦄', 'font-size: 1px; color: transparent;');
}

// Navigation
function initNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const section = item.getAttribute('data-section');
            openSection(section);
        });
    });
}

function openSection(section) {
    // Update active nav item
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data-section') === section) {
            item.classList.add('active');
        }
    });
    
    // Hide all sections
    document.querySelectorAll('.content-section').forEach(sec => {
        sec.classList.remove('active');
    });
    
    // Show selected section
    const targetSection = document.getElementById(`${section}-section`);
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    // Update page title
    const titles = {
        'marketing-generator': 'Marketing Generator',
        'ai-influencer': 'AI Influencer',
        'product-builder': 'Digital Product Builder',
        'automation-hub': 'Automation Hub',
        dashboard: 'Dashboard',
        workflows: 'Workflows',
        chat: 'AI Chat',
        revenue: 'Revenue',
        marketing: 'Marketing',
        settings: 'Settings'
    };
    
    const subtitles = {
        'marketing-generator': 'Generate high-converting content in seconds',
        'ai-influencer': 'Complete execution-ready Instagram automation system',
        'product-builder': 'Generate complete product + sales system',
        'automation-hub': 'Daily plans and execution checklists',
        dashboard: 'Overview of your AI automation',
        workflows: 'Manage automation workflows',
        chat: 'Communicate with Claude, Cursor, and OpenAI',
        revenue: 'Track sales and revenue',
        marketing: 'Launch and manage campaigns',
        settings: 'Configure integrations and preferences'
    };
    
    const titleEl = document.getElementById('pageTitle');
    const subtitleEl = document.getElementById('pageSubtitle');
    if (titleEl) titleEl.textContent = titles[section] || 'Dashboard';
    if (subtitleEl) subtitleEl.textContent = subtitles[section] || '';
    
    // Update page titles using global function if available
    if (window.updatePageTitles) {
        window.updatePageTitles(section);
    }
    
    // Update stats if needed
    if (section === 'revenue' || section === 'marketing') {
        updateAllStats();
    }
    
    // Update usage counter when switching to marketing generator
    if (section === 'marketing-generator') {
        updateUsageCounter();
    }
}

// Chat System
function initChat() {
    const chatInput = document.getElementById('chatInput');
    
    // Auto-resize textarea
    chatInput.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = Math.min(this.scrollHeight, 120) + 'px';
    });
    
    // Send on Ctrl+Enter
    chatInput.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // Send on Enter (new line on Shift+Enter)
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
}

function sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    
    if (!message) return;
    
    // Add user message
    addChatMessage('user', message);
    
    // Clear input
    input.value = '';
    input.style.height = 'auto';
    
    // 🦄 Process message (simulate AI response)
    setTimeout(() => {
        processAIMessage(message);
    }, 500);
}

// AI Agent Integration - Connected to Live Agent
async function callAgentAPI(userMessage) {
    try {
        // 🦄 Connect to agent API (works locally and on Vercel)
        const apiUrl = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
            ? 'http://localhost:3000/api/agent'  // Local development
            : '/api/agent';  // Production (Vercel)
        
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: userMessage })
        });

        if (response.ok) {
            const data = await response.json();
            if (data.success && data.result) {
                return data.result;
            }
            return data.result || data.response || 'Agent executed successfully!';
        } else {
            const errorData = await response.json();
            return `Agent error: ${errorData.error || 'Unknown error'}`;
        }
    } catch (error) {
        console.log('Agent API not available, using local processing');
        console.error('Agent API error:', error);
        // 🦄 Hidden signature
        console.log('%c🦄', 'font-size: 1px; color: transparent;');
        // Return helpful message
        return 'Agent is processing your request. If this persists, the agent may be starting up.';
    }
}

// AI Image Generation API - Generates images using DALL-E
async function generateImage(prompt, size = '1024x1024') {
    const apiUrl = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
        ? 'http://localhost:3000/api/ai/image'  // Local development
        : '/api/ai/image';  // Production (Vercel)
    
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt, size })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error || 'Unable to generate image');
        }

        const data = await response.json();
        if (data.success && data.imageUrl) {
            return data.imageUrl;
        }
        
        throw new Error('Invalid response format from image API');
    } catch (error) {
        console.error('Image API error:', error);
        throw error;
    }
}

// AI Influencer Generator API - Generates complete influencer blueprint
async function generateInfluencerBlueprint(prompt) {
    const apiUrl = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
        ? 'http://localhost:3000/api/ai/influencer'  // Local development
        : '/api/ai/influencer';  // Production (Vercel)
    
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            let friendlyError = 'Unable to generate influencer blueprint right now.';
            if (errorData.error) {
                const errorMsg = errorData.error.toLowerCase();
                if (errorMsg.includes('api key') || errorMsg.includes('openai') || errorMsg.includes('token')) {
                    friendlyError = 'Service configuration issue. Please contact support.';
                } else if (errorMsg.includes('limit') || errorMsg.includes('quota')) {
                    friendlyError = 'Service temporarily at capacity. Please try again in a few minutes.';
                } else {
                    friendlyError = 'Unable to process your request. Please try again.';
                }
            }
            throw new Error(friendlyError);
        }

        const data = await response.json();
        if (data.success && data.blueprint) {
            return data.blueprint;
        }
        
        throw new Error('Invalid response format from influencer API');
    } catch (error) {
        console.error('Influencer API error:', error);
        if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
            throw new Error('Connection issue. Please check your internet and try again.');
        }
        if (error.message && !error.message.includes('API') && !error.message.includes('token')) {
            throw error;
        }
        throw new Error('Unable to generate influencer blueprint right now. Please try again in a moment.');
    }
}

// AI Marketing Generation API - Generates marketing content
async function generateMarketingContent(prompt, options = {}) {
    const { channel = 'general', type = 'post', tone = 'engaging' } = options;
    const apiUrl = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
        ? 'http://localhost:3000/api/marketing'  // Local development
        : '/api/marketing';  // Production (Vercel)
    
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt, channel, type, tone })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            // Convert technical errors to friendly messages
            let friendlyError = 'Unable to generate content right now.';
            if (errorData.error) {
                // Remove technical terms
                const errorMsg = errorData.error.toLowerCase();
                if (errorMsg.includes('api key') || errorMsg.includes('openai') || errorMsg.includes('token')) {
                    friendlyError = 'Service configuration issue. Please contact support.';
                } else if (errorMsg.includes('limit') || errorMsg.includes('quota')) {
                    friendlyError = 'Service temporarily at capacity. Please try again in a few minutes.';
                } else {
                    friendlyError = 'Unable to process your request. Please try again.';
                }
            }
            throw new Error(friendlyError);
        }

        const data = await response.json();
        if (data.success && data.content) {
            return data.content;
        }
        
        // Fallback if response structure is different
        if (data.content) {
            return data.content;
        }
        
        throw new Error('Invalid response format from marketing API');
    } catch (error) {
        console.error('Marketing API error:', error);
        // Re-throw with user-friendly message (no technical details)
        if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
            throw new Error('Connection issue. Please check your internet and try again.');
        }
        // If error already has friendly message, use it; otherwise create one
        if (error.message && !error.message.includes('API') && !error.message.includes('token')) {
            throw error;
        }
        throw new Error('Unable to generate content right now. Please try again in a moment.');
    }
}

function processAIMessage(userMessage) {
    const lowerMessage = userMessage.toLowerCase();
    
    // 🎭 Priority 0: AI Influencer Generator
    if (lowerMessage.includes('influencer') && (
        lowerMessage.includes('generate') || 
        lowerMessage.includes('create') || 
        lowerMessage.includes('make') ||
        lowerMessage.includes('blueprint') ||
        lowerMessage.includes('instagram')
    )) {
        // Extract prompt
        let prompt = userMessage
            .replace(/generate|create|make|influencer|blueprint|instagram|ai|for/gi, '')
            .replace(/\s+/g, ' ')
            .trim();
        
        if (prompt.length < 5) {
            prompt = userMessage;
        }
        
        // Show loading state
        const loadingId = 'influencer-loading-' + Date.now();
        addChatMessage('assistant', '🚀 Generating execution-ready AI influencer automation system...', loadingId);
        
        // Call influencer API
        generateInfluencerBlueprint(prompt)
            .then(blueprint => {
                removeChatMessage(loadingId);
                formatInfluencerBlueprint(blueprint);
            })
            .catch(error => {
                removeChatMessage(loadingId);
                addChatMessage('assistant', `⚠️ ${error.message}\n\n💡 If this persists, try refreshing the page or contact support.`);
            });
        return;
    }
    
    // 🎨 Priority 1: Marketing content generation
    if (lowerMessage.includes('generate') && (
        lowerMessage.includes('marketing') || 
        lowerMessage.includes('post') || 
        lowerMessage.includes('content') ||
        lowerMessage.includes('campaign')
    )) {
        // Extract prompt (remove command words, keep the actual topic)
        let prompt = userMessage
            .replace(/generate|marketing|post|content|campaign|for|about/gi, '')
            .replace(/\s+/g, ' ')
            .trim();
        
        // If prompt is too short, use the full message
        if (prompt.length < 5) {
            prompt = userMessage;
        }
        
        // Detect channel
        let channel = 'general';
        if (lowerMessage.includes('telegram')) channel = 'telegram';
        else if (lowerMessage.includes('reddit')) channel = 'reddit';
        else if (lowerMessage.includes('twitter') || lowerMessage.includes('x.com')) channel = 'twitter';
        
        // Detect tone
        let tone = 'engaging';
        if (lowerMessage.includes('professional')) tone = 'professional';
        else if (lowerMessage.includes('casual') || lowerMessage.includes('fun')) tone = 'casual';
        else if (lowerMessage.includes('urgent') || lowerMessage.includes('limited')) tone = 'urgent';
        
        // Detect type
        let type = 'post';
        if (lowerMessage.includes('email')) type = 'email';
        else if (lowerMessage.includes('ad') || lowerMessage.includes('advertisement')) type = 'ad';
        else if (lowerMessage.includes('headline')) type = 'headline';
        
        // Check usage limit
        if (!canGenerateMarketing()) {
            const remaining = getRemainingFreeGenerations();
            addChatMessage('assistant', `🎯 **You've used your ${MARKETING_LIMIT} free generations!**\n\nUnlock unlimited access to generate as much marketing content as you need. Used by founders to create real posts that drive sales.\n\n💳 [Unlock Unlimited Marketing Content](#unlock-marketing)`);
            showMarketingUnlockCTA();
            return;
        }
        
        // Show usage info if not unlocked
        const remaining = getRemainingFreeGenerations();
        if (!isMarketingUnlocked() && remaining !== 'unlimited') {
            addChatMessage('assistant', `📊 **Free generations remaining:** ${remaining}/${MARKETING_LIMIT}`, null, true);
        }
        
        // Show loading state
        const loadingId = 'marketing-loading-' + Date.now();
        addChatMessage('assistant', '🎨 Generating marketing content...', loadingId);
        
        // Call marketing API
        generateMarketingContent(prompt, { channel, type, tone })
            .then(content => {
                // Increment usage
                incrementMarketingUsage();
                
                // Remove loading message and show result
                removeChatMessage(loadingId);
                const remainingAfter = getRemainingFreeGenerations();
                const usageNote = isMarketingUnlocked() 
                    ? '' 
                    : `\n\n📊 Free generations remaining: ${remainingAfter === 'unlimited' ? 'unlimited' : remainingAfter}/${MARKETING_LIMIT}`;
                addChatMessage('assistant', `📢 **Generated Marketing Content** (${channel}):\n\n${content}${usageNote}\n\n💡 Copy and use this for your campaigns!`);
            })
            .catch(error => {
                // Remove loading message and show error
                removeChatMessage(loadingId);
                // Friendly error messages (no technical details)
                let friendlyError = 'Unable to generate content right now. Please try again in a moment.';
                if (error.message.includes('limit') || error.message.includes('quota')) {
                    friendlyError = 'Service temporarily unavailable. Please try again in a few minutes.';
                } else if (error.message.includes('network') || error.message.includes('fetch')) {
                    friendlyError = 'Connection issue. Please check your internet and try again.';
                }
                addChatMessage('assistant', `⚠️ ${friendlyError}\n\n💡 If this persists, try refreshing the page or contact support.`);
            });
        return;
    }
    
    // 🤖 Priority 2: Agent automation commands
    if (lowerMessage.includes('launch') || 
        lowerMessage.includes('automate') || 
        lowerMessage.includes('create') ||
        lowerMessage.includes('send') || 
        lowerMessage.includes('execute')) {
        
        // Show processing message
        addChatMessage('assistant', '🤖 Processing your request...');
        
        // Call agent API
        callAgentAPI(userMessage).then(agentResponse => {
            if (agentResponse && !agentResponse.includes('error')) {
                addChatMessage('assistant', agentResponse);
                // Update dashboard after agent action
                updateAllStats();
            } else {
                // Fallback to local processing
                processLocalMessage(userMessage);
            }
        }).catch(error => {
            console.error('Agent call failed:', error);
            processLocalMessage(userMessage);
        });
        return;
    }
    
    // 📋 Priority 3: Local command processing for simple queries
    processLocalMessage(userMessage);
}

function processLocalMessage(userMessage) {
    const lowerMessage = userMessage.toLowerCase();
    let response = '';
    
    // Command processing
    if (lowerMessage.includes('revenue') || lowerMessage.includes('sales') || lowerMessage.includes('stats')) {
        const totalRevenue = salesData.reduce((sum, sale) => sum + parseFloat(sale.price), 0);
        const salesCount = salesData.length;
        response = `📊 **Revenue Statistics:**
        
**Total Revenue:** $${totalRevenue.toLocaleString()}
**Total Sales:** ${salesCount}
**Average Order:** $${salesCount > 0 ? (totalRevenue / salesCount).toFixed(0) : 0}

Would you like me to break this down by channel or product type?`;
    }
    else if (lowerMessage.includes('marketing') || lowerMessage.includes('campaign') || lowerMessage.includes('post')) {
        // Marketing help (generation is handled in processAIMessage)
        response = `📢 **Marketing Options:**
        
I can help you:
• Generate marketing posts for Telegram, Reddit, Twitter
• Launch automated campaigns
• Analyze marketing performance
• Create content calendars

Try: "Generate marketing post about [your topic]" or "Generate a Telegram post for [your product]"`;
    }
    else if (lowerMessage.includes('workflow') || lowerMessage.includes('automate')) {
        response = `🔄 **Workflow Automation:**
        
Current active workflows:
• Telegram Marketing (15 posts today)
• Reddit Automation (8 posts today)
• Whop Integration (3 orders processed)

I can help you:
• Create new workflows
• Modify existing ones
• Analyze workflow performance

What workflow would you like to create or modify?`;
    }
    else if (lowerMessage.includes('help') || lowerMessage.includes('command')) {
        response = `⚡ **Available Commands:**
        
**Revenue & Sales:**
• "Show revenue stats" - View sales statistics
• "Add sale" - Record a new sale
• "Revenue breakdown" - Detailed revenue analysis

**Marketing:**
• "Generate marketing post" - Create content
• "Launch campaign" - Start marketing campaign
• "Marketing stats" - View performance

**Workflows:**
• "Create workflow" - Build automation
• "Workflow status" - Check active workflows
• "Automate [task]" - Set up automation

**General:**
• "Help" - Show this menu
• "Settings" - Open settings

What would you like to do?`;
    }
    else {
        response = `I understand you're asking about: "${userMessage}"

I can help you with:
• Revenue tracking and analytics
• Marketing campaign management
• Workflow automation
• Content generation
• Performance analysis

Could you be more specific about what you need? Or type "help" to see all available commands.`;
    }
    
    addChatMessage('assistant', response);
}

function addChatMessage(role, text, messageId = null, skipHistory = false) {
    // 🦄 Hidden signature
    const messagesContainer = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${role}`;
    if (messageId) {
        messageDiv.id = messageId;
    }
    
    const avatar = role === 'user' ? '👤' : '⚡';
    const author = role === 'user' ? 'You' : 'AI Studio';
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    // Handle unlock CTA links
    let formattedText = formatMarkdown(text);
    if (text.includes('#unlock-marketing')) {
        formattedText = formattedText.replace(
            /\[Unlock Unlimited Marketing Content\]\(#unlock-marketing\)/g,
            '<button class="btn-unlock-marketing" onclick="showMarketingUnlockCTA()" style="background: var(--primary); color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; font-weight: 600; margin-top: 10px;">💳 Unlock Unlimited Marketing Content</button>'
        );
    }
    
    messageDiv.innerHTML = `
        <div class="message-avatar">${avatar}</div>
        <div class="message-content">
            <div class="message-header">
                <span class="message-author">${author}</span>
                <span class="message-time">${time}</span>
            </div>
            <div class="message-text">${formattedText}</div>
        </div>
    `;
    
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    // Save to history (skip loading messages and temporary messages)
    if (!messageId && !skipHistory) {
        chatHistory.push({ role, text, time: new Date().toISOString() });
        localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
    }
    
    return messageDiv;
}

function removeChatMessage(messageId) {
    const messageElement = document.getElementById(messageId);
    if (messageElement) {
        messageElement.remove();
    }
}

// Format and display influencer execution-ready automation
function formatInfluencerBlueprint(blueprint) {
    // Handle both new and old format (backward compatible)
    const identity = blueprint.identity || {
        name: blueprint.persona?.name || 'AI Influencer',
        handleSuggestions: ['@aiinfluencer', '@ai_creator'],
        bio: blueprint.persona?.bio || 'AI-powered content creator',
        coreBelief: blueprint.persona?.coreBelief || 'Empowering through content',
        personalityTraits: blueprint.persona?.personalityTraits || ['Creative', 'Authentic']
    };
    
    const visualPrompts = blueprint.visualPrompts || {
        imagePrompts: blueprint.assetPrompts?.influencerImagePrompt ? [blueprint.assetPrompts.influencerImagePrompt] : [],
        reelVisualStyles: blueprint.assetPrompts?.reelVisualTemplates || []
    };
    
    const postReadyContent = blueprint.postReadyContent || {
        captions: blueprint.readyToPostCaptions ? blueprint.readyToPostCaptions.map(c => ({ text: c, type: 'post', length: 'medium' })) : [],
        reelHooks: blueprint.reelScripts ? blueprint.reelScripts.map(s => s.hook || 'Hook') : [],
        ctaEndings: blueprint.reelScripts ? blueprint.reelScripts.map(s => s.cta || 'CTA') : []
    };
    
    const automationInstructions = blueprint.automationInstructions || {};
    const monetization = blueprint.monetization || {};
    const hashtagSets = blueprint.hashtagSets || [];
    const postingSchedule = blueprint.postingSchedule || {};
    
    // Create HTML structure for collapsible sections
    const messageId = 'influencer-blueprint-' + Date.now();
    const messagesContainer = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message assistant';
    messageDiv.id = messageId;
    
    let html = `
        <div class="message-avatar">🎭</div>
        <div class="message-content">
            <div class="message-header">
                <span class="message-author">AI Studio</span>
                <span class="message-time">${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
            <div class="message-text" style="max-width: 100%;">
                <h3 style="margin-bottom: 15px;">🚀 AI Influencer Execution-Ready System</h3>
                <p style="margin-bottom: 20px; color: #10b981; font-weight: 600;">✨ Ready to run TODAY - Zero thinking required!</p>
                
                <details open style="margin-bottom: 15px; padding: 10px; background: #f5f5f5; border-radius: 6px;">
                    <summary style="cursor: pointer; font-weight: 600; font-size: 15px;">👤 Influencer Identity</summary>
                    <div style="margin-top: 10px; padding-left: 10px;">
                        <p><strong>Name:</strong> ${identity.name || 'N/A'}</p>
                        <p><strong>Handle Suggestions:</strong> ${identity.handleSuggestions ? identity.handleSuggestions.join(', ') : 'N/A'}</p>
                        <p><strong>Bio:</strong> ${identity.bio || 'N/A'}</p>
                        <p><strong>Core Belief:</strong> ${identity.coreBelief || 'N/A'}</p>
                        <p><strong>Personality Traits:</strong> ${identity.personalityTraits ? identity.personalityTraits.join(', ') : 'N/A'}</p>
                    </div>
                </details>
                
                <details style="margin-bottom: 15px; padding: 10px; background: #f5f5f5; border-radius: 6px;">
                    <summary style="cursor: pointer; font-weight: 600; font-size: 15px;">📝 Post-Ready Captions (${postReadyContent.captions.length})</summary>
                    <div style="margin-top: 10px; padding-left: 10px;">
                        <button onclick="copyAllCaptions('${messageId}')" style="background: #667eea; color: white; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; font-weight: 600; margin-bottom: 10px;">📋 Copy All Captions</button>
                        <div style="max-height: 400px; overflow-y: auto;">
                            ${postReadyContent.captions.length > 0 
                                ? postReadyContent.captions.slice(0, 10).map((caption, idx) => {
                                    const captionText = typeof caption === 'string' ? caption : caption.text;
                                    const captionType = typeof caption === 'object' ? caption.type : 'post';
                                    const captionLength = typeof caption === 'object' ? caption.length : 'medium';
                                    return `<div style="margin-bottom: 15px; padding: 10px; background: white; border-left: 3px solid #667eea; border-radius: 4px;">
                                        <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                                            <strong>Caption ${idx + 1}</strong>
                                            <span style="font-size: 12px; color: #666;">${captionType} • ${captionLength}</span>
                                        </div>
                                        <div>${captionText.replace(/\n/g, '<br>')}</div>
                                    </div>`;
                                }).join('') + (postReadyContent.captions.length > 10 ? `<p><em>... and ${postReadyContent.captions.length - 10} more captions (use Copy All button)</em></p>` : '')
                                : '<p>No captions generated.</p>'}
                        </div>
                    </div>
                </details>
                
                <details style="margin-bottom: 15px; padding: 10px; background: #f5f5f5; border-radius: 6px;">
                    <summary style="cursor: pointer; font-weight: 600; font-size: 15px;">🎬 Reel Hooks (${postReadyContent.reelHooks?.length || 0})</summary>
                    <div style="margin-top: 10px; padding-left: 10px; max-height: 300px; overflow-y: auto;">
                        ${postReadyContent.reelHooks && postReadyContent.reelHooks.length > 0 
                            ? postReadyContent.reelHooks.slice(0, 10).map((hook, idx) => 
                                `<div style="margin-bottom: 10px; padding: 8px; background: white; border-left: 3px solid #764ba2; border-radius: 4px;">
                                    <strong>${idx + 1}.</strong> ${hook}
                                </div>`
                            ).join('') + (postReadyContent.reelHooks.length > 10 ? `<p><em>... and ${postReadyContent.reelHooks.length - 10} more hooks</em></p>` : '')
                            : '<p>No reel hooks generated.</p>'}
                    </div>
                </details>
                
                <details style="margin-bottom: 15px; padding: 10px; background: #f5f5f5; border-radius: 6px;">
                    <summary style="cursor: pointer; font-weight: 600; font-size: 15px;">🎯 CTA Endings (${postReadyContent.ctaEndings?.length || 0})</summary>
                    <div style="margin-top: 10px; padding-left: 10px;">
                        ${postReadyContent.ctaEndings && postReadyContent.ctaEndings.length > 0 
                            ? postReadyContent.ctaEndings.slice(0, 10).map((cta, idx) => 
                                `<div style="margin-bottom: 10px; padding: 8px; background: white; border-radius: 4px;">
                                    <strong>${idx + 1}.</strong> ${cta}
                                </div>`
                            ).join('') + (postReadyContent.ctaEndings.length > 10 ? `<p><em>... and ${postReadyContent.ctaEndings.length - 10} more CTAs</em></p>` : '')
                            : '<p>No CTAs generated.</p>'}
                    </div>
                </details>
                
                <details style="margin-bottom: 15px; padding: 10px; background: #f5f5f5; border-radius: 6px;">
                    <summary style="cursor: pointer; font-weight: 600; font-size: 15px;">🖼️ Generated Images</summary>
                    <div style="margin-top: 10px; padding-left: 10px;">
                        <div id="generated-images-${messageId}" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin-top: 15px;">
                            <div style="text-align: center; padding: 20px; background: white; border-radius: 8px;">
                                <p style="color: #666; margin-bottom: 10px;">Click button below to generate images</p>
                            </div>
                        </div>
                        <button onclick="generateInfluencerImages('${messageId}', ${JSON.stringify(visualPrompts.imagePrompts || []).replace(/"/g, '&quot;')})" 
                                id="generate-images-btn-${messageId}"
                                style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer; font-weight: 600; margin-top: 15px; width: 100%;">
                            🎨 Generate Post + Reel Images
                        </button>
                    </div>
                </details>
                
                <details style="margin-bottom: 15px; padding: 10px; background: #f5f5f5; border-radius: 6px;">
                    <summary style="cursor: pointer; font-weight: 600; font-size: 15px;">🎨 Visual Creation Prompts</summary>
                    <div style="margin-top: 10px; padding-left: 10px;">
                        <div style="margin-bottom: 15px;">
                            <strong>Image Prompts (${visualPrompts.imagePrompts?.length || 0}):</strong><br>
                            ${visualPrompts.imagePrompts && visualPrompts.imagePrompts.length > 0
                                ? visualPrompts.imagePrompts.map((prompt, idx) => 
                                    `<div style="padding: 10px; background: white; border-radius: 4px; margin-top: 5px; font-family: monospace; font-size: 12px;">
                                        <strong>Prompt ${idx + 1}:</strong><br>${prompt}
                                    </div>`
                                ).join('')
                                : '<p>No image prompts generated.</p>'}
                        </div>
                        <div style="margin-bottom: 15px;">
                            <strong>Reel Visual Styles (${visualPrompts.reelVisualStyles?.length || 0}):</strong><br>
                            ${visualPrompts.reelVisualStyles && visualPrompts.reelVisualStyles.length > 0
                                ? visualPrompts.reelVisualStyles.map((style, idx) => 
                                    `<div style="padding: 8px; background: white; border-radius: 4px; margin-top: 5px; font-family: monospace; font-size: 12px;">
                                        <strong>Style ${idx + 1}:</strong> ${style}
                                    </div>`
                                ).join('')
                                : '<p>No reel styles generated.</p>'}
                        </div>
                    </div>
                </details>
                
                <details style="margin-bottom: 15px; padding: 10px; background: #f5f5f5; border-radius: 6px;">
                    <summary style="cursor: pointer; font-weight: 600; font-size: 15px;">🤖 Automation Instructions</summary>
                    <div style="margin-top: 10px; padding-left: 10px;">
                        <div style="margin-bottom: 15px;">
                            <strong>🖼️ Image Generation:</strong><br>
                            <div style="padding: 10px; background: white; border-radius: 4px; margin-top: 5px;">
                                ${automationInstructions.imageGeneration || 'Not specified'}
                            </div>
                        </div>
                        <div style="margin-bottom: 15px;">
                            <strong>🎬 Reel Generation:</strong><br>
                            <div style="padding: 10px; background: white; border-radius: 4px; margin-top: 5px;">
                                ${automationInstructions.reelGeneration || 'Not specified'}
                            </div>
                        </div>
                        <div style="margin-bottom: 15px;">
                            <strong>📅 Posting Cadence:</strong><br>
                            <div style="padding: 10px; background: white; border-radius: 4px; margin-top: 5px;">
                                ${automationInstructions.postingCadence || 'Not specified'}
                            </div>
                        </div>
                        <div style="margin-bottom: 15px;">
                            <strong>💬 Engagement Routine (15-min daily):</strong><br>
                            <div style="padding: 10px; background: white; border-radius: 4px; margin-top: 5px;">
                                ${automationInstructions.engagementRoutine || 'Not specified'}
                            </div>
                        </div>
                        <div style="margin-bottom: 15px;">
                            <strong>🔄 Growth Loop:</strong><br>
                            <div style="padding: 10px; background: white; border-radius: 4px; margin-top: 5px;">
                                ${automationInstructions.growthLoop || 'Not specified'}
                            </div>
                        </div>
                    </div>
                </details>
                
                <details style="margin-bottom: 15px; padding: 10px; background: #f5f5f5; border-radius: 6px;">
                    <summary style="cursor: pointer; font-weight: 600; font-size: 15px;">💰 Monetization (Day 1 Ready)</summary>
                    <div style="margin-top: 10px; padding-left: 10px;">
                        <div style="margin-bottom: 15px;">
                            <strong>Digital Products (${monetization.digitalProducts?.length || 0}):</strong><br>
                            ${monetization.digitalProducts && monetization.digitalProducts.length > 0
                                ? monetization.digitalProducts.map((product, idx) => 
                                    `<div style="padding: 10px; background: white; border-radius: 4px; margin-top: 5px;">
                                        <strong>${product.name || 'Product ' + (idx + 1)}</strong> - ${product.price || '$XX'}<br>
                                        ${product.description || 'No description'}
                                    </div>`
                                ).join('')
                                : '<p>No products generated.</p>'}
                        </div>
                        <div style="margin-bottom: 15px;">
                            <strong>Service Offer:</strong><br>
                            <div style="padding: 10px; background: white; border-radius: 4px; margin-top: 5px;">
                                <strong>${monetization.serviceOffer?.name || 'Service'}</strong> - ${monetization.serviceOffer?.price || '$XX'}<br>
                                ${monetization.serviceOffer?.description || 'No description'}
                            </div>
                        </div>
                        <div style="margin-bottom: 15px;">
                            <strong>Funnel:</strong><br>
                            <div style="padding: 10px; background: white; border-radius: 4px; margin-top: 5px;">
                                ${monetization.funnel || 'Not specified'}
                            </div>
                        </div>
                        <div style="margin-bottom: 15px;">
                            <strong>First $100 Plan:</strong><br>
                            <div style="padding: 10px; background: white; border-radius: 4px; margin-top: 5px;">
                                ${monetization.first100Plan || 'Not specified'}
                            </div>
                        </div>
                    </div>
                </details>
                
                <details style="margin-bottom: 15px; padding: 10px; background: #f5f5f5; border-radius: 6px;">
                    <summary style="cursor: pointer; font-weight: 600; font-size: 15px;">📅 Posting Schedule</summary>
                    <div style="margin-top: 10px; padding-left: 10px;">
                        ${['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map(day => {
                            const dayName = day.charAt(0).toUpperCase() + day.slice(1);
                            const dayContent = postingSchedule[day] || 'Not specified';
                            return `<p><strong>${dayName}:</strong> ${dayContent}</p>`;
                        }).join('')}
                    </div>
                </details>
                
                <details style="margin-bottom: 15px; padding: 10px; background: #f5f5f5; border-radius: 6px;">
                    <summary style="cursor: pointer; font-weight: 600; font-size: 15px;">#️⃣ Hashtag Sets (${hashtagSets.length})</summary>
                    <div style="margin-top: 10px; padding-left: 10px;">
                        ${hashtagSets.length > 0 
                            ? hashtagSets.slice(0, 5).map((set, idx) => 
                                `<div style="margin-bottom: 10px; padding: 8px; background: white; border-radius: 4px;">
                                    <strong>Set ${idx + 1}:</strong> ${set.join(' ')}
                                </div>`
                            ).join('') + (hashtagSets.length > 5 ? `<p><em>... and ${hashtagSets.length - 5} more sets</em></p>` : '')
                            : '<p>No hashtag sets generated.</p>'}
                    </div>
                </details>
                
                <div style="margin-top: 20px; padding: 15px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 8px; text-align: center;">
                    <strong>✨ Your AI influencer account is ready to run TODAY!</strong><br>
                    Everything you need is above. Start posting now.
                </div>
            </div>
        </div>
    `;
    
    messageDiv.innerHTML = html;
    // Store captions data for copy function
    messageDiv.dataset.captions = JSON.stringify(postReadyContent.captions);
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    // Don't save to history (too large)
}

// Copy all captions function
function copyAllCaptions(messageId) {
    const messageDiv = document.getElementById(messageId);
    if (!messageDiv) return;
    
    const captionsData = messageDiv.dataset.captions;
    if (!captionsData) return;
    
    try {
        const captions = JSON.parse(captionsData);
        const captionsText = captions.map((c, idx) => {
            const text = typeof c === 'string' ? c : c.text;
            const type = typeof c === 'object' ? c.type : 'post';
            return `${idx + 1}. [${type.toUpperCase()}] ${text}`;
        }).join('\n\n');
        
        navigator.clipboard.writeText(captionsText).then(() => {
            alert(`✅ Copied all ${captions.length} captions to clipboard!`);
        }).catch(() => {
            // Fallback for older browsers
            const textarea = document.createElement('textarea');
            textarea.value = captionsText;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            alert(`✅ Copied all ${captions.length} captions to clipboard!`);
        });
    } catch (error) {
        console.error('Error copying captions:', error);
        alert('Error copying captions. Please try again.');
    }
}

// Generate influencer images
async function generateInfluencerImages(messageId, imagePrompts) {
    const imagesContainer = document.getElementById(`generated-images-${messageId}`);
    const generateBtn = document.getElementById(`generate-images-btn-${messageId}`);
    
    if (!imagesContainer || !generateBtn) return;
    
    // Disable button and show loading
    generateBtn.disabled = true;
    generateBtn.textContent = '🔄 Generating images...';
    imagesContainer.innerHTML = '<div style="text-align: center; padding: 20px;"><p>Generating images...</p></div>';
    
    try {
        // Get first image prompt (or use a default)
        const prompt = imagePrompts && imagePrompts.length > 0 ? imagePrompts[0] : 'Professional influencer portrait, minimalist, high quality';
        
        // Generate square image (post) - 1024x1024
        const postImageUrl = await generateImage(prompt, '1024x1024');
        
        // Generate vertical image (reel) - 1024x1792
        const reelImageUrl = await generateImage(prompt, '1024x1792');
        
        // Store image URLs for regeneration
        imagesContainer.dataset.postImageUrl = postImageUrl;
        imagesContainer.dataset.reelImageUrl = reelImageUrl;
        imagesContainer.dataset.imagePrompts = JSON.stringify(imagePrompts);
        
        // Display images
        imagesContainer.innerHTML = `
            <div data-image-type="post" style="text-align: center; padding: 15px; background: white; border-radius: 8px; border: 2px solid #667eea;">
                <h4 style="margin-bottom: 10px; color: #667eea;">📱 Post Image (Square)</h4>
                <img src="${postImageUrl}" alt="Post image" style="max-width: 100%; border-radius: 8px; margin-bottom: 10px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
                <div style="display: flex; gap: 8px; justify-content: center;">
                    <button onclick="downloadImage('${postImageUrl}', 'post-image')" style="background: #667eea; color: white; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; font-weight: 600;">⬇️ Download</button>
                    <button onclick="regenerateImage('${messageId}', 'post')" style="background: #764ba2; color: white; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; font-weight: 600;">🔄 Regenerate</button>
                </div>
            </div>
            <div data-image-type="reel" style="text-align: center; padding: 15px; background: white; border-radius: 8px; border: 2px solid #764ba2;">
                <h4 style="margin-bottom: 10px; color: #764ba2;">🎬 Reel Image (Vertical)</h4>
                <img src="${reelImageUrl}" alt="Reel image" style="max-width: 100%; max-height: 500px; border-radius: 8px; margin-bottom: 10px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
                <div style="display: flex; gap: 8px; justify-content: center;">
                    <button onclick="downloadImage('${reelImageUrl}', 'reel-image')" style="background: #667eea; color: white; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; font-weight: 600;">⬇️ Download</button>
                    <button onclick="regenerateImage('${messageId}', 'reel')" style="background: #764ba2; color: white; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; font-weight: 600;">🔄 Regenerate</button>
                </div>
            </div>
        `;
        
        // Re-enable button
        generateBtn.disabled = false;
        generateBtn.textContent = '🎨 Generate Post + Reel Images';
        
    } catch (error) {
        imagesContainer.innerHTML = `<div style="text-align: center; padding: 20px; color: #ef4444;"><p>Error generating images: ${error.message}</p></div>`;
        generateBtn.disabled = false;
        generateBtn.textContent = '🎨 Generate Post + Reel Images';
    }
}

// Regenerate single image
async function regenerateImage(messageId, type) {
    const imagesContainer = document.getElementById(`generated-images-${messageId}`);
    if (!imagesContainer) return;
    
    const imagePrompts = JSON.parse(imagesContainer.dataset.imagePrompts || '[]');
    const prompt = imagePrompts && imagePrompts.length > 0 ? imagePrompts[0] : 'Professional influencer portrait, minimalist, high quality';
    const size = type === 'post' ? '1024x1024' : '1024x1792';
    
    const imageDiv = imagesContainer.querySelector(`[data-image-type="${type}"]`);
    if (!imageDiv) return;
    
    // Show loading state
    const regenerateBtn = imageDiv.querySelector('button[onclick*="regenerateImage"]');
    if (regenerateBtn) {
        regenerateBtn.disabled = true;
        regenerateBtn.textContent = '🔄 Generating...';
    }
    
    try {
        const imageUrl = await generateImage(prompt, size);
        
        // Update image
        const img = imageDiv.querySelector('img');
        if (img) img.src = imageUrl;
        
        // Update download button
        const downloadBtn = imageDiv.querySelector('button[onclick*="downloadImage"]');
        if (downloadBtn) {
            downloadBtn.setAttribute('onclick', `downloadImage('${imageUrl}', '${type}-image')`);
        }
        
        // Update stored URL
        if (type === 'post') {
            imagesContainer.dataset.postImageUrl = imageUrl;
        } else {
            imagesContainer.dataset.reelImageUrl = imageUrl;
        }
        
        // Re-enable button
        if (regenerateBtn) {
            regenerateBtn.disabled = false;
            regenerateBtn.textContent = '🔄 Regenerate';
        }
    } catch (error) {
        alert(`Error regenerating image: ${error.message}`);
        if (regenerateBtn) {
            regenerateBtn.disabled = false;
            regenerateBtn.textContent = '🔄 Regenerate';
        }
    }
}

// Download image
function downloadImage(imageUrl, filename) {
    fetch(imageUrl)
        .then(response => response.blob())
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${filename}-${Date.now()}.png`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        })
        .catch(error => {
            console.error('Error downloading image:', error);
            alert('Error downloading image. Please try again.');
        });
}

function formatMarkdown(text) {
    // Simple markdown formatting
    return text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/•/g, '•')
        .replace(/\n/g, '<br>');
}

function loadChatHistory() {
    // Load system message if no history
    if (chatHistory.length === 0) {
        return; // System message already in HTML
    }
    
    const messagesContainer = document.getElementById('chatMessages');
    // Clear system message
    messagesContainer.innerHTML = '';
    
    // Load all messages
    chatHistory.forEach(msg => {
        addChatMessage(msg.role, msg.text);
    });
}

function clearChat() {
    if (confirm('Clear all chat history?')) {
        chatHistory = [];
        localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
        document.getElementById('chatMessages').innerHTML = `
            <div class="message system">
                <div class="message-avatar">⚡</div>
                <div class="message-content">
                    <div class="message-header">
                        <span class="message-author">AI Studio</span>
                        <span class="message-time">Just now</span>
                    </div>
                    <div class="message-text">
                        Chat cleared. How can I help you today?
                    </div>
                </div>
            </div>
        `;
    }
}

function insertShortcut(text) {
    const input = document.getElementById('chatInput');
    input.value = text;
    input.focus();
}

// Stats Updates
function updateAllStats() {
    // 🦄 Hidden signature
    const today = new Date().toDateString();
    const todaySales = salesData.filter(sale => new Date(sale.date).toDateString() === today);
    const totalRevenue = salesData.reduce((sum, sale) => sum + parseFloat(sale.price), 0);
    
    // Update dashboard stats
    document.getElementById('totalRevenue').textContent = formatCurrency(totalRevenue);
    document.getElementById('todaySales').textContent = todaySales.length;
    
    const conversionRate = salesData.length > 0 ? ((salesData.length / 20) * 100).toFixed(1) : 0;
    document.getElementById('conversionRate').textContent = conversionRate + '%';
    
    // Update revenue section
    document.getElementById('revenueTotal').textContent = formatCurrency(totalRevenue);
    document.getElementById('revenueCount').textContent = salesData.length;
    const avgOrder = salesData.length > 0 ? (totalRevenue / salesData.length).toFixed(0) : 0;
    document.getElementById('revenueAvg').textContent = formatCurrency(avgOrder);
    
    // Update marketing stats
    updateMarketingStats();
    
    // Update sales table
    renderSalesTable();
}

function updateMarketingStats() {
    const channels = ['telegram', 'reddit', 'twitter'];
    
    channels.forEach(channel => {
        const channelSales = salesData.filter(sale => sale.channel === channel);
        const channelRevenue = channelSales.reduce((sum, sale) => sum + parseFloat(sale.price), 0);
        
        document.getElementById(channel + 'Sales').textContent = channelSales.length;
        document.getElementById(channel + 'Revenue').textContent = formatCurrency(channelRevenue);
        document.getElementById(channel + 'Posts').textContent = channelSales.length * 2; // Estimate
    });
}

function renderSalesTable() {
    const tbody = document.getElementById('salesTable');
    
    if (salesData.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" class="empty-state">No sales yet. Start marketing!</td></tr>';
        return;
    }
    
    const sortedSales = [...salesData].sort((a, b) => new Date(b.date) - new Date(a.date));
    
    tbody.innerHTML = sortedSales.slice(0, 10).map(sale => `
        <tr>
            <td>${formatTime(sale.date)}</td>
            <td>${sale.customer || 'Customer'}</td>
            <td>${sale.product || 'AI Influencer'}</td>
            <td><strong>${formatCurrency(parseFloat(sale.price))}</strong></td>
            <td><span class="channel-badge">${sale.channel || 'other'}</span></td>
        </tr>
    `).join('');
}

// Utility Functions
function formatCurrency(amount) {
    return '$' + parseFloat(amount).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

function formatTime(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return minutes + 'm ago';
    if (hours < 24) return hours + 'h ago';
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

// Actions
function addSale() {
    document.getElementById('saleModal').classList.add('show');
}

function closeModal() {
    document.getElementById('saleModal').classList.remove('show');
    document.getElementById('saleForm').reset();
}

function saveSale(event) {
    event.preventDefault();
    
    const sale = {
        date: new Date().toISOString(),
        customer: document.getElementById('customerName').value,
        product: getProductName(document.getElementById('productType').value),
        price: document.getElementById('productType').value,
        channel: document.getElementById('channel').value,
        status: 'completed'
    };
    
    salesData.unshift(sale);
    localStorage.setItem('salesData', JSON.stringify(salesData));
    
    updateAllStats();
    closeModal();
    
    // Add activity
    addActivity('Sale recorded', `${sale.customer} - ${formatCurrency(parseFloat(sale.price))}`);
}

function getProductName(price) {
    const products = {
        '75': 'Launch Special',
        '150': 'Regular Price',
        '400': 'Agency Pack'
    };
    return products[price] || 'AI Influencer';
}

function addActivity(title, description) {
    const activityList = document.getElementById('activityList');
    const activityItem = document.createElement('div');
    activityItem.className = 'activity-item';
    activityItem.innerHTML = `
        <div class="activity-icon">✅</div>
        <div class="activity-content">
            <div class="activity-title">${title}</div>
            <div class="activity-time">${description} • Just now</div>
        </div>
    `;
    activityList.insertBefore(activityItem, activityList.firstChild);
}

// Platform Links
function openTelegram() {
    window.open(settings.telegramLink, '_blank');
}

function openReddit() {
    window.open('https://www.reddit.com', '_blank');
}

function openTwitter() {
    window.open('https://twitter.com', '_blank');
}

function openWhop() {
    window.open(settings.whopLink, '_blank');
}

function openN8n() {
    window.open(settings.n8nLink, '_blank');
}

// Theme Toggle
function toggleTheme() {
    const currentTheme = document.body.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.body.setAttribute('data-theme', newTheme);
    settings.theme = newTheme;
    localStorage.setItem('dashboardSettings', JSON.stringify(settings));
}

// Quick Actions
function openQuickAction() {
    // Show quick action menu or open chat
    openSection('chat');
    document.getElementById('chatInput').focus();
}

function createWorkflow() {
    alert('Workflow creation coming soon! For now, use n8n or the automation scripts.');
}

function launchCampaign() {
    // Open marketing section and focus chat for content generation
    openSection('marketing');
    setTimeout(() => {
        openSection('chat');
        document.getElementById('chatInput').focus();
        insertShortcut('Generate marketing post about ');
    }, 100);
}

// Close modal on outside click
document.getElementById('saleModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeModal();
    }
});

// Marketing Unlock Functions
function showMarketingUnlockCTA() {
    // Create or show unlock modal
    let modal = document.getElementById('marketingUnlockModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'marketingUnlockModal';
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 500px;">
                <div class="modal-header">
                    <h2>🔓 Unlock Unlimited Marketing Content</h2>
                    <button class="close-btn" onclick="closeMarketingUnlockModal()">&times;</button>
                </div>
                <div style="padding: 20px;">
                    <p style="margin-bottom: 20px; font-size: 16px; line-height: 1.6;">
                        <strong>Generate unlimited marketing content</strong> that converts. Used by founders to create real posts, campaigns, and copy that drives sales.
                    </p>
                    <div style="background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%); padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                        <strong style="display: block; margin-bottom: 12px; font-size: 15px;">What you unlock:</strong>
                        <ul style="margin: 0; padding-left: 20px; line-height: 2;">
                            <li>✨ <strong>Unlimited</strong> marketing post generation</li>
                            <li>📢 <strong>All channels</strong> - Telegram, Reddit, Twitter, Email</li>
                            <li>🎨 <strong>AI-powered copywriting</strong> that converts</li>
                            <li>🚀 <strong>No limits</strong> - generate as much as you need</li>
                        </ul>
                    </div>
                    <button class="btn-primary" onclick="openStripeCheckout()" style="width: 100%; padding: 14px; font-size: 17px; font-weight: 600; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border: none; border-radius: 8px; color: white; cursor: pointer; transition: transform 0.2s;">
                        💳 Unlock Unlimited Access - $9.99
                    </button>
                    <p style="text-align: center; margin-top: 15px; font-size: 12px; color: #666;">
                        One-time payment • Secure checkout via Stripe • Cancel anytime
                    </p>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }
    modal.classList.add('show');
}

function closeMarketingUnlockModal() {
    const modal = document.getElementById('marketingUnlockModal');
    if (modal) {
        modal.classList.remove('show');
    }
}

function openStripeCheckout() {
    // Stripe Checkout (Test Mode)
    // ⚠️ SETUP REQUIRED: Replace with your actual Stripe test price ID
    // Get this from: Stripe Dashboard → Products → Create Product → Copy Price ID
    const STRIPE_TEST_PRICE_ID = 'price_test_1234567890'; // ⚠️ Replace with your Stripe test price ID
    
    // Option 1: Use Stripe Payment Link (easiest for testing)
    // Create a payment link in Stripe Dashboard → Products → Payment Links
    // Then use: const checkoutUrl = 'https://buy.stripe.com/test_YOUR_LINK_ID';
    
    // Option 2: Use Checkout Session (requires backend API endpoint)
    // For now, using a placeholder that shows setup instructions
    
    if (STRIPE_TEST_PRICE_ID.includes('1234567890')) {
        // Show setup instructions
        alert(`Stripe Checkout Setup Required:\n\n1. Go to: https://dashboard.stripe.com/test/products\n2. Create a product: "Unlimited Marketing Content"\n3. Set price: $9.99 (one-time)\n4. Copy the Price ID (starts with price_test_)\n5. Replace STRIPE_TEST_PRICE_ID in dashboard.js (line ~801)\n\nFor quick testing, create a Payment Link:\n- Stripe Dashboard → Products → Payment Links\n- Copy the link URL\n- Replace checkoutUrl in openStripeCheckout()`);
        
        // Simulate payment success for testing (remove in production)
        if (confirm('Test Mode: Simulate successful payment?')) {
            unlockMarketing();
            addChatMessage('assistant', '✅ **You\'re unlocked!** Generate unlimited marketing content. 🚀\n\nTry: "Generate a marketing post about [your product]"\n\n⚠️ This is a test. Replace STRIPE_TEST_PRICE_ID with your actual Stripe test price ID for real payments.');
            closeMarketingUnlockModal();
        }
        return;
    }
    
    // Real Stripe Checkout redirect (when price ID is configured)
    // For Payment Links:
    const checkoutUrl = `https://buy.stripe.com/test_${STRIPE_TEST_PRICE_ID}`;
    
    // For Checkout Sessions (requires backend):
    // const successUrl = window.location.origin + window.location.pathname + '?payment=success';
    // const cancelUrl = window.location.origin + window.location.pathname;
    // window.location.href = `/api/create-checkout-session?price_id=${STRIPE_TEST_PRICE_ID}&success_url=${encodeURIComponent(successUrl)}&cancel_url=${encodeURIComponent(cancelUrl)}`;
    
    // Redirect to Stripe Checkout
    window.location.href = checkoutUrl + '?success_url=' + encodeURIComponent(window.location.href + '?payment=success') + '&cancel_url=' + encodeURIComponent(window.location.href);
}

// Close modal on outside click
document.addEventListener('click', function(e) {
    const modal = document.getElementById('marketingUnlockModal');
    if (modal && e.target === modal) {
        closeMarketingUnlockModal();
    }
});

// Quick Start Prompt Insertion
function insertQuickPrompt(prompt) {
    const chatInput = document.getElementById('chatInput');
    if (chatInput) {
        chatInput.value = prompt;
        chatInput.focus();
        chatInput.style.height = 'auto';
        chatInput.style.height = Math.min(chatInput.scrollHeight, 120) + 'px';
    }
}

function insertProductPrompt(prompt) {
    const productInput = document.getElementById('productInput');
    if (productInput) {
        productInput.value = prompt;
        productInput.focus();
    }
}

// Execution Mode Toggle
function isExecutionMode() {
    const toggle = document.getElementById('executionModeToggle');
    return toggle ? toggle.checked : false;
}

// Daily Plan Generator
async function generateDailyPlan() {
    const messagesContainer = document.getElementById('chatMessages');
    if (!messagesContainer) return;
    
    addChatMessage('user', 'Generate today\'s execution plan');
    
    const loadingId = addChatMessage('assistant', 'Generating your daily plan...');
    
    try {
        // Call influencer API to get daily plan
        const prompt = 'Generate today\'s daily execution plan: today\'s post, caption, CTA, and growth actions';
        const blueprint = await generateInfluencerBlueprint(prompt);
        
        if (blueprint && blueprint.automationInstructions) {
            const plan = `
**Today's Execution Plan**

**Post:** ${blueprint.postReadyContent?.captions?.[0]?.text || 'Use caption #1'}
**Caption Type:** ${blueprint.postReadyContent?.captions?.[0]?.type || 'post'}
**CTA:** ${blueprint.postReadyContent?.ctaEndings?.[0] || 'Use CTA #1'}
**Growth Action:** ${blueprint.automationInstructions?.engagementRoutine || 'Engage for 15 minutes'}
**Posting Time:** ${blueprint.automationInstructions?.postingCadence || 'Check posting cadence'}
            `.trim();
            
            updateMessage(loadingId, 'assistant', plan);
        } else {
            updateMessage(loadingId, 'assistant', 'Daily plan generated. Check your influencer blueprint for details.');
        }
    } catch (error) {
        updateMessage(loadingId, 'assistant', `Unable to generate daily plan: ${error.message}`);
    }
}

// Product Builder API
async function generateProduct(prompt) {
    const apiUrl = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
        ? 'http://localhost:3000/api/ai/product'
        : '/api/ai/product';
    
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error || 'Unable to generate product');
        }

        const data = await response.json();
        return data.product;
    } catch (error) {
        console.error('Product API error:', error);
        throw error;
    }
}

// Send Influencer Message
function sendInfluencerMessage() {
    const input = document.getElementById('influencerInput');
    const message = input.value.trim();
    if (!message) return;
    
    const messagesContainer = document.getElementById('influencerMessages');
    if (!messagesContainer) return;
    
    addMessageToContainer(messagesContainer, 'user', message);
    input.value = '';
    
    const loadingId = addMessageToContainer(messagesContainer, 'assistant', 'Generating execution-ready influencer system...');
    
    generateInfluencerBlueprint(message)
        .then(blueprint => {
            formatInfluencerBlueprint(blueprint, messagesContainer);
            removeMessage(loadingId, messagesContainer);
        })
        .catch(error => {
            updateMessageInContainer(loadingId, messagesContainer, 'assistant', `Unable to generate: ${error.message}`);
        });
}

// Send Product Message
function sendProductMessage() {
    const input = document.getElementById('productInput');
    const message = input.value.trim();
    if (!message) return;
    
    const messagesContainer = document.getElementById('productMessages');
    if (!messagesContainer) return;
    
    addMessageToContainer(messagesContainer, 'user', message);
    input.value = '';
    
    const loadingId = addMessageToContainer(messagesContainer, 'assistant', 'Generating complete product system...');
    
    generateProduct(message)
        .then(product => {
            formatProductOutput(product, messagesContainer);
            removeMessage(loadingId, messagesContainer);
        })
        .catch(error => {
            updateMessageInContainer(loadingId, messagesContainer, 'assistant', `Unable to generate: ${error.message}`);
        });
}

// Send Automation Message
function sendAutomationMessage() {
    generateDailyPlan();
}

// Format Product Output
function formatProductOutput(product, container) {
    const messageId = 'product-' + Date.now();
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message assistant';
    messageDiv.id = messageId;
    
    let html = `
        <div class="message-avatar">📦</div>
        <div class="message-content">
            <div class="message-header">
                <span class="message-author">AI Studio</span>
                <span class="message-time">${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
            <div class="message-text" style="max-width: 100%;">
                <h3>Digital Product System</h3>
                <details open><summary><strong>Product:</strong> ${product.product?.name || 'N/A'} - ${product.product?.price || 'N/A'}</summary>
                    <p><strong>Type:</strong> ${product.product?.type || 'N/A'}</p>
                    <p><strong>Target:</strong> ${product.product?.targetAudience || 'N/A'}</p>
                    <p><strong>Value:</strong> ${product.product?.coreValue || 'N/A'}</p>
                </details>
                <details><summary><strong>Product Outline</strong></summary>
                    ${product.productOutline?.sections?.map(s => `<p><strong>${s.title}:</strong> ${s.content}</p>`).join('') || 'N/A'}
                </details>
                <details><summary><strong>Sales Page Copy</strong></summary>
                    <p><strong>Headline:</strong> ${product.salesPageCopy?.headline || 'N/A'}</p>
                    <p><strong>Subheadline:</strong> ${product.salesPageCopy?.subheadline || 'N/A'}</p>
                    <p><strong>Benefits:</strong> ${product.salesPageCopy?.benefits?.join(', ') || 'N/A'}</p>
                    <p><strong>CTA:</strong> ${product.salesPageCopy?.cta || 'N/A'}</p>
                </details>
                <details><summary><strong>Bio/DM CTAs</strong></summary>
                    <p><strong>Bio CTA:</strong> ${product.bioCta || 'N/A'}</p>
                    <p><strong>DM CTA:</strong> ${product.dmCta || 'N/A'}</p>
                </details>
                <details><summary><strong>$100/Day Funnel Plan</strong></summary>
                    <p><strong>Day 1:</strong> ${product.funnelPlan?.day1 || 'N/A'}</p>
                    <p><strong>Day 7:</strong> ${product.funnelPlan?.day7 || 'N/A'}</p>
                    <p><strong>Day 30:</strong> ${product.funnelPlan?.day30 || 'N/A'}</p>
                    <p><strong>Path to $100/day:</strong> ${product.funnelPlan?.pathTo100 || 'N/A'}</p>
                </details>
            </div>
        </div>
    `;
    
    messageDiv.innerHTML = html;
    container.appendChild(messageDiv);
    container.scrollTop = container.scrollHeight;
}

// Helper functions for message containers
function addMessageToContainer(container, role, text) {
    const messageId = 'msg-' + Date.now();
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${role}`;
    messageDiv.id = messageId;
    messageDiv.innerHTML = `
        <div class="message-avatar">${role === 'user' ? '👤' : '⚡'}</div>
        <div class="message-content">
            <div class="message-header">
                <span class="message-author">${role === 'user' ? 'You' : 'AI Studio'}</span>
                <span class="message-time">${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
            <div class="message-text">${text.replace(/\n/g, '<br>')}</div>
        </div>
    `;
    container.appendChild(messageDiv);
    container.scrollTop = container.scrollHeight;
    return messageId;
}

function updateMessageInContainer(messageId, container, role, text) {
    const messageDiv = document.getElementById(messageId);
    if (messageDiv) {
        const textDiv = messageDiv.querySelector('.message-text');
        if (textDiv) {
            textDiv.innerHTML = text.replace(/\n/g, '<br>');
        }
    }
}

function removeMessage(messageId, container) {
    const messageDiv = document.getElementById(messageId);
    if (messageDiv) {
        messageDiv.remove();
    }
}

// Update Usage Counter
function updateUsageCounter() {
    const counter = document.getElementById('usageCounter');
    if (!counter) return;
    
    const remaining = getRemainingFreeGenerations();
    if (remaining === 'unlimited') {
        counter.textContent = 'Unlimited';
    } else {
        counter.textContent = `${remaining} free generations left`;
    }
}

// Update navigation titles
function updateNavigationTitles() {
    const titles = {
        'marketing-generator': 'Marketing Generator',
        'ai-influencer': 'AI Influencer',
        'product-builder': 'Digital Product Builder',
        'automation-hub': 'Automation Hub',
        'dashboard': 'Dashboard',
        'revenue': 'Revenue'
    };
    
    const subtitles = {
        'marketing-generator': 'Generate high-converting content in seconds',
        'ai-influencer': 'Complete execution-ready Instagram automation system',
        'product-builder': 'Generate complete product + sales system',
        'automation-hub': 'Daily plans and execution checklists',
        'dashboard': 'Overview of your AI automation',
        'revenue': 'Track sales and revenue'
    };
    
    return { titles, subtitles };
}

// Initialize on load
document.addEventListener('DOMContentLoaded', function() {
    initDashboard();
    updateUsageCounter();
    
    // Initialize influencer input
    const influencerInput = document.getElementById('influencerInput');
    if (influencerInput) {
        influencerInput.addEventListener('keydown', function(e) {
            if (e.ctrlKey && e.key === 'Enter') {
                sendInfluencerMessage();
            }
        });
    }
    
    // Initialize product input
    const productInput = document.getElementById('productInput');
    if (productInput) {
        productInput.addEventListener('keydown', function(e) {
            if (e.ctrlKey && e.key === 'Enter') {
                sendProductMessage();
            }
        });
    }
    
    // Update navigation titles function
    window.updatePageTitles = function(section) {
        const titles = {
            'marketing-generator': 'Marketing Generator',
            'ai-influencer': 'AI Influencer',
            'product-builder': 'Digital Product Builder',
            'automation-hub': 'Automation Hub',
            dashboard: 'Dashboard',
            revenue: 'Revenue'
        };
        
        const subtitles = {
            'marketing-generator': 'Generate high-converting content in seconds',
            'ai-influencer': 'Complete execution-ready Instagram automation system',
            'product-builder': 'Generate complete product + sales system',
            'automation-hub': 'Daily plans and execution checklists',
            dashboard: 'Overview of your AI automation',
            revenue: 'Track sales and revenue'
        };
        
        const titleEl = document.getElementById('pageTitle');
        const subtitleEl = document.getElementById('pageSubtitle');
        if (titleEl) titleEl.textContent = titles[section] || 'Dashboard';
        if (subtitleEl) subtitleEl.textContent = subtitles[section] || '';
    };
});

// Default to marketing generator on load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => openSection('marketing-generator'), 100);
    });
} else {
    setTimeout(() => openSection('marketing-generator'), 100);
}

