/**
 * 🤖 TELEGRAM BOT - AUTO POST GENERATOR
 * 
 * Každé 4 hodiny ti Telegram bot pošle vygenerovaný post.
 * Otvoríš Telegram, skopíruješ, vložíš na Instagram (15 sekúnd).
 * 
 * SETUP:
 * 1. Otvor Telegram → vyhľadaj @BotFather
 * 2. Napíš: /newbot
 * 3. Zadaj meno bota (napr. FordFofer Post Bot)
 * 4. Zadaj username (napr. fordfofer_post_bot)
 * 5. Skopíruj TOKEN (začína napr. 123456:ABC-DEF...)
 * 6. Vlož TOKEN do config.js → TELEGRAM_BOT_TOKEN
 * 7. Napíš svojmu botovi /start (aby získal chat ID)
 * 8. Spusti tento skript: node TELEGRAM_AUTO_BOT.js
 * 
 * HOTOVO! Každé 4 hodiny dostaneš post na Telegram.
 */

const axios = require('axios');
const cron = require('node-cron');
const { OpenAI } = require('openai');
const config = require('./config');

const openai = new OpenAI({
    apiKey: config.OPENAI_API_KEY
});

// Telegram setup
const TELEGRAM_BOT_TOKEN = config.TELEGRAM_BOT_TOKEN || 'VLOZ_TOKEN_SEM';
const TELEGRAM_CHAT_ID = config.TELEGRAM_CHAT_ID || 'VLOZ_CHAT_ID_SEM';
const TELEGRAM_API = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}`;

/**
 * Získaj Telegram Chat ID
 */
async function getChatId() {
    try {
        const response = await axios.get(`${TELEGRAM_API}/getUpdates`);
        if (response.data.result.length > 0) {
            const chatId = response.data.result[0].message.chat.id;
            console.log('✅ Tvoje Chat ID:', chatId);
            console.log('📝 Vlož do config.js → TELEGRAM_CHAT_ID:', chatId);
            return chatId;
        } else {
            console.log('❌ Žiadne správy. Napíš svojmu botovi /start v Telegrame a spusti toto znova.');
            return null;
        }
    } catch (error) {
        console.error('❌ Chyba pri získavaní Chat ID:', error.message);
        return null;
    }
}

/**
 * Generuje Instagram post pomocou OpenAI
 */
async function generatePost() {
    const postTypes = [
        'brutálne sebavedomý hype post',
        'edukatívny post o AI trading',
        'urgency/FOMO post o early access',
        'story post o vzostupe FordFofer',
        'testimonial (ako keby hovoril user)'
    ];

    const randomType = postTypes[Math.floor(Math.random() * postTypes.length)];

    const prompt = `Vytvor ${randomType} o FordFofer - $1.2B AI trading systém.

FAKTY:
- Early investor prístup: €50 (lifetime)
- AI agenti pracujú 24/7, zero chyba
- Web: fordfofer.vercel.app
- Platby: Skrill (gcapovic.biz@proton.me)

POŽIADAVKY:
- Začni emoji (🚀, 💡, ⚡, 🦄, alebo ⭐)
- Max 120 slov
- Pridaj: "💰 Platba: gcapovic.biz@proton.me"
- Pridaj: "🔗 fordfofer.vercel.app"
- 5-6 hashtagov (#AI #Trading #FordFofer #Crypto #Investment #Tech)

ODPOVEDZ LEN TEXTOM POSTU (bez úvodzoviek).`;

    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                { role: 'system', content: 'Si expertný Instagram copywriter pre AI fintech startup.' },
                { role: 'user', content: prompt }
            ],
            max_tokens: 300,
            temperature: 0.9
        });

        return response.choices[0].message.content.trim();
    } catch (error) {
        console.error('❌ Chyba pri generovaní postu:', error.message);
        throw error;
    }
}

/**
 * Pošle správu na Telegram
 */
async function sendToTelegram(message) {
    try {
        await axios.post(`${TELEGRAM_API}/sendMessage`, {
            chat_id: TELEGRAM_CHAT_ID,
            text: message,
            parse_mode: 'Markdown'
        });
        console.log('✅ Post odoslaný na Telegram!');
    } catch (error) {
        console.error('❌ Chyba pri odosielaní na Telegram:', error.response?.data || error.message);
        throw error;
    }
}

/**
 * Hlavná funkcia - generuje a pošle post
 */
async function generateAndSend() {
    console.log('\n🚀 Generujem nový post...');

    try {
        const post = await generatePost();
        console.log('✅ Post vygenerovaný:\n');
        console.log(post);
        console.log('\n');

        const telegramMessage = `🦄 *NOVÝ FORDFOFER POST*\n\n${post}\n\n📋 _Skopíruj a vlož na Instagram!_`;
        await sendToTelegram(telegramMessage);

        console.log('✅ HOTOVO! Post odoslaný na Telegram.\n');
    } catch (error) {
        console.error('❌ CHYBA:', error.message);
    }
}

/**
 * Setup (prvé spustenie)
 */
async function setup() {
    console.log('🔧 TELEGRAM BOT SETUP\n');

    // Kontrola OpenAI API key
    if (!config.OPENAI_API_KEY || config.OPENAI_API_KEY === 'VLOZ_SEM') {
        console.error('❌ CHYBA: OPENAI_API_KEY nie je nastavený v config.js');
        process.exit(1);
    }

    // Kontrola Telegram Bot Token
    if (!config.TELEGRAM_BOT_TOKEN || config.TELEGRAM_BOT_TOKEN === 'VLOZ_TOKEN_SEM') {
        console.error('❌ CHYBA: TELEGRAM_BOT_TOKEN nie je nastavený v config.js');
        console.log('\n📋 POSTUPUJ TAKTO:');
        console.log('1. Otvor Telegram → vyhľadaj @BotFather');
        console.log('2. Napíš: /newbot');
        console.log('3. Zadaj meno bota (napr. FordFofer Post Bot)');
        console.log('4. Zadaj username (napr. fordfofer_post_bot)');
        console.log('5. Skopíruj TOKEN (začína napr. 123456:ABC-DEF...)');
        console.log('6. Vlož do config.js → TELEGRAM_BOT_TOKEN\n');
        process.exit(1);
    }

    // Kontrola Telegram Chat ID
    if (!config.TELEGRAM_CHAT_ID || config.TELEGRAM_CHAT_ID === 'VLOZ_CHAT_ID_SEM') {
        console.log('📋 Získavam tvoje Chat ID...\n');
        console.log('⚠️  Najprv napíš svojmu botovi /start v Telegrame!\n');
        
        const chatId = await getChatId();
        if (!chatId) {
            process.exit(1);
        }
        process.exit(0);
    }

    console.log('✅ Všetko je nastavené správne!\n');
}

/**
 * Spustenie
 */
async function main() {
    console.log('╔═══════════════════════════════════════════════════════════════╗');
    console.log('║  🤖 TELEGRAM AUTO POST BOT                                    ║');
    console.log('╚═══════════════════════════════════════════════════════════════╝\n');

    await setup();

    // Vygeneruj a pošli prvý post hneď
    console.log('🚀 Prvý post sa generuje...\n');
    await generateAndSend();

    // Nastav cron (každé 4 hodiny)
    console.log('⏰ Plánovač nastavený: Každé 4 hodiny\n');
    console.log('📅 Najbližšie posty:');
    const now = new Date();
    for (let i = 1; i <= 3; i++) {
        const nextTime = new Date(now.getTime() + i * 4 * 60 * 60 * 1000);
        console.log(`   ${i}. ${nextTime.toLocaleString('sk-SK')}`);
    }
    console.log('\n✅ Bot beží! Každé 4 hodiny dostaneš post na Telegram.\n');
    console.log('💡 TIP: Nechaj toto okno otvorené v pozadí.\n');

    // Cron: každé 4 hodiny (0 */4 * * *)
    cron.schedule('0 */4 * * *', async () => {
        await generateAndSend();
    });
}

// Spusti
if (require.main === module) {
    main();
}

module.exports = { generatePost, sendToTelegram };

