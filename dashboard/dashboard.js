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

// Initialize Dashboard
function initDashboard() {
    // 🦄 Set theme
    if (settings.theme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
    }
    
    // Initialize navigation
    initNavigation();
    
    // Initialize chat
    initChat();
    
    // Load chat history
    loadChatHistory();
    
    // Update all stats
    updateAllStats();
    
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
        dashboard: 'Dashboard',
        workflows: 'Workflows',
        chat: 'AI Chat',
        revenue: 'Revenue',
        marketing: 'Marketing',
        settings: 'Settings'
    };
    
    const subtitles = {
        dashboard: 'Overview of your AI automation',
        workflows: 'Manage automation workflows',
        chat: 'Communicate with Claude, Cursor, and OpenAI',
        revenue: 'Track sales and revenue',
        marketing: 'Launch and manage campaigns',
        settings: 'Configure integrations and preferences'
    };
    
    document.getElementById('pageTitle').textContent = titles[section] || 'Dashboard';
    document.getElementById('pageSubtitle').textContent = subtitles[section] || '';
    
    // Update stats if needed
    if (section === 'revenue' || section === 'marketing') {
        updateAllStats();
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

function processAIMessage(userMessage) {
    const lowerMessage = userMessage.toLowerCase();
    
    // 🦄 Always try agent first for automation commands
    if (lowerMessage.includes('launch') || lowerMessage.includes('campaign') || 
        lowerMessage.includes('generate') || lowerMessage.includes('post') ||
        lowerMessage.includes('automate') || lowerMessage.includes('create') ||
        lowerMessage.includes('send') || lowerMessage.includes('execute')) {
        
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
    
    // Local command processing for simple queries
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
        response = `📢 **Marketing Options:**
        
I can help you:
• Generate marketing posts for Telegram, Reddit, Twitter
• Launch automated campaigns
• Analyze marketing performance
• Create content calendars

What would you like to do?`;
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

function addChatMessage(role, text) {
    // 🦄 Hidden signature
    const messagesContainer = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${role}`;
    
    const avatar = role === 'user' ? '👤' : '⚡';
    const author = role === 'user' ? 'You' : 'AI Studio';
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    messageDiv.innerHTML = `
        <div class="message-avatar">${avatar}</div>
        <div class="message-content">
            <div class="message-header">
                <span class="message-author">${author}</span>
                <span class="message-time">${time}</span>
            </div>
            <div class="message-text">${formatMarkdown(text)}</div>
        </div>
    `;
    
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    // Save to history
    chatHistory.push({ role, text, time: new Date().toISOString() });
    localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
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
    openSection('marketing');
}

// Close modal on outside click
document.getElementById('saleModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeModal();
    }
});

// Initialize on load
document.addEventListener('DOMContentLoaded', initDashboard);

// Default to dashboard
openSection('dashboard');

