// Telegram Auto-Send Script
// Uses your Telegram Bot API to send messages automatically

const axios = require('axios');

// Your Telegram Bot Token
const BOT_TOKEN = 'REMOVED_TELEGRAM_TOKEN';
const API_URL = `https://api.telegram.org/bot${BOT_TOKEN}`;

// Sales message template
const SALES_MESSAGE = `Hey {NAME}! 👋

Quick question - do you know anyone who needs an influencer profile?

I just built an AI that creates complete influencer profiles in 3 minutes:
✅ Full identity & backstory
✅ Instagram profile with posts
✅ TikTok setup
✅ 7-day content calendar
✅ AI-generated profile image

Launch special: $75 (normally $150) - first 10 customers only!

Perfect for content creators, agencies, or testing ideas.

Want to try it? {WHOP_LINK}

Or know someone who might? Share it with them! 🚀`;

// List of chat IDs (you need to get these from your Telegram)
// To get chat ID: Send a message to your bot, then visit:
// https://api.telegram.org/botREMOVED_TELEGRAM_TOKEN/getUpdates
const CHAT_IDS = [
    // Add chat IDs here, example:
    // 123456789,
    // 987654321,
];

// Your Whop store link
const WHOP_LINK = '[YOUR_WHOP_STORE_LINK]';

// Function to send message
async function sendMessage(chatId, name) {
    try {
        const message = SALES_MESSAGE
            .replace('{NAME}', name)
            .replace('{WHOP_LINK}', WHOP_LINK);
        
        const response = await axios.post(`${API_URL}/sendMessage`, {
            chat_id: chatId,
            text: message,
            parse_mode: 'HTML'
        });
        
        console.log(`✅ Sent to ${name} (${chatId})`);
        return response.data;
    } catch (error) {
        console.error(`❌ Error sending to ${name} (${chatId}):`, error.response?.data || error.message);
        return null;
    }
}

// Function to get chat IDs from recent messages
async function getChatIds() {
    try {
        const response = await axios.get(`${API_URL}/getUpdates`);
        const updates = response.data.result;
        
        const chatIds = new Set();
        updates.forEach(update => {
            if (update.message && update.message.chat) {
                chatIds.add(update.message.chat.id);
            }
        });
        
        console.log('Recent chat IDs:');
        Array.from(chatIds).forEach(id => console.log(`  ${id}`));
        
        return Array.from(chatIds);
    } catch (error) {
        console.error('Error getting chat IDs:', error.response?.data || error.message);
        return [];
    }
}

// Main function
async function main() {
    console.log('🤖 Telegram Auto-Send Script');
    console.log('============================\n');
    
    // First, get chat IDs if not provided
    if (CHAT_IDS.length === 0) {
        console.log('No chat IDs provided. Getting recent chat IDs...\n');
        const recentChatIds = await getChatIds();
        
        if (recentChatIds.length === 0) {
            console.log('❌ No recent chats found.');
            console.log('💡 To get chat IDs:');
            console.log('   1. Send a message to your bot');
            console.log('   2. Run: node telegram-auto-send.js --get-ids');
            console.log('   3. Or visit: https://api.telegram.org/bot' + BOT_TOKEN + '/getUpdates');
            return;
        }
        
        console.log('\n📝 Add these chat IDs to CHAT_IDS array in the script\n');
        return;
    }
    
    // Check if Whop link is set
    if (WHOP_LINK === '[YOUR_WHOP_STORE_LINK]') {
        console.log('❌ Please set your WHOP_LINK in the script!');
        return;
    }
    
    // Send messages
    console.log(`📤 Sending messages to ${CHAT_IDS.length} contacts...\n`);
    
    for (let i = 0; i < CHAT_IDS.length; i++) {
        const chatId = CHAT_IDS[i];
        const name = `Friend ${i + 1}`; // You can customize names
        
        await sendMessage(chatId, name);
        
        // Wait 1 second between messages to avoid rate limits
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    console.log('\n✅ Done! Check your Telegram for sent messages.');
}

// Check command line arguments
const args = process.argv.slice(2);
if (args.includes('--get-ids')) {
    getChatIds().then(() => process.exit(0));
} else {
    main().catch(console.error);
}

