/**
 * 🤖 FORDFOFER AUTO-MARKETING SYSTEM v2.0
 * 
 * Automaticky generuje a postuje obsah 24/7
 * 
 * SPUSTENIE: npm start
 */

const cron = require('node-cron');
const fetch = require('node-fetch');
const CONFIG = require('./config.js');

// ═══════════════════════════════════════════════════════════════
// 📝 CONTENT TEMPLATES
// ═══════════════════════════════════════════════════════════════

const TOPICS = [
    'AI pracuje 24/7 zatiaľ čo ty spíš - pasívny príjem',
    '€50 early access - limitované miesta pre investorov',
    'Zero ľudská chyba - prečo AI vyhráva nad tradermi',
    '$1.2B kapacita - škálovateľný systém',
    'Urgencia - cena čoskoro stúpne na €200',
    'Posledná šanca pre early investors',
    'Prečo 95% traderov zlyháva (emócie vs AI)',
    'Lifetime prístup za jednorazový poplatok'
];

const PROMPT = `Si marketingový expert pre FordFofer - $1.2B AI trading systém.

FAKTY:
- FordFofer = AI autonómny kapitálový systém
- Early investor prístup: €50 (lifetime)
- AI agenti pracujú 24/7, zero chyba
- Web: ${CONFIG.WEBSITE}
- Platby: Skrill (${CONFIG.SKRILL_EMAIL})

ÚLOHA: Napíš 1 Instagram post.

TÉMA: ${TOPICS[Math.floor(Math.random() * TOPICS.length)]}

ŠTÝL:
- Emoji na začiatku
- Max 120 slov
- Brutálne sebavedomý tón
- Krátke vety, odrážky
- CTA: "Link v bio" alebo "fordfofer.vercel.app"
- 5-6 hashtagov na konci

ODPOVEDZ LEN TEXTOM POSTU.`;

// ═══════════════════════════════════════════════════════════════
// 🤖 CLAUDE API
// ═══════════════════════════════════════════════════════════════

async function generateContent() {
    console.log('🤖 Generujem obsah cez Claude...');
    
    try {
        const response = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': CONFIG.CLAUDE_API_KEY,
                'anthropic-version': '2023-06-01'
            },
            body: JSON.stringify({
                model: 'claude-sonnet-4-20250514',
                max_tokens: 500,
                messages: [{ role: 'user', content: PROMPT }]
            })
        });
        
        const data = await response.json();
        
        if (data.content && data.content[0]) {
            console.log('✅ Obsah vygenerovaný!');
            return data.content[0].text;
        } else {
            console.log('❌ Chyba:', JSON.stringify(data));
            return null;
        }
    } catch (error) {
        console.log('❌ API Error:', error.message);
        return null;
    }
}

// ═══════════════════════════════════════════════════════════════
// 📤 BUFFER API
// ═══════════════════════════════════════════════════════════════

async function getBufferProfiles() {
    const response = await fetch(
        `https://api.bufferapp.com/1/profiles.json?access_token=${CONFIG.BUFFER_ACCESS_TOKEN}`
    );
    return await response.json();
}

async function postToBuffer(content) {
    console.log('📤 Postujem na Buffer...');
    
    try {
        const profiles = await getBufferProfiles();
        
        if (!Array.isArray(profiles) || profiles.length === 0) {
            console.log('❌ Žiadne Buffer profily!');
            return;
        }
        
        console.log(`📱 Nájdených ${profiles.length} profilov`);
        
        for (const profile of profiles) {
            const response = await fetch('https://api.bufferapp.com/1/updates/create.json', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams({
                    access_token: CONFIG.BUFFER_ACCESS_TOKEN,
                    text: content,
                    profile_ids: profile.id,
                    now: 'true'
                })
            });
            
            const data = await response.json();
            
            if (data.success) {
                console.log(`   ✅ ${profile.service} - Postnuté!`);
            } else {
                console.log(`   ⚠️ ${profile.service} - ${data.message || 'Chyba'}`);
            }
            
            await new Promise(r => setTimeout(r, 2000));
        }
    } catch (error) {
        console.log('❌ Buffer Error:', error.message);
    }
}

// ═══════════════════════════════════════════════════════════════
// 🔄 HLAVNÝ LOOP
// ═══════════════════════════════════════════════════════════════

async function runCycle() {
    console.log('\n' + '═'.repeat(50));
    console.log('🚀 MARKETING CYCLE STARTED');
    console.log('⏰ ' + new Date().toLocaleString('sk-SK'));
    console.log('═'.repeat(50) + '\n');
    
    const content = await generateContent();
    
    if (content) {
        console.log('\n📝 VYGENEROVANÝ POST:\n');
        console.log(content);
        console.log('\n');
        await postToBuffer(content);
    }
    
    console.log('\n✅ CYCLE COMPLETE\n');
}

// ═══════════════════════════════════════════════════════════════
// 🚀 START
// ═══════════════════════════════════════════════════════════════

console.log(`
╔═══════════════════════════════════════════════════════════════╗
║                                                                 ║
║     🤖 FORDFOFER AUTO-MARKETING SYSTEM v2.0                    ║
║                                                                 ║
╠═══════════════════════════════════════════════════════════════╣
║                                                                 ║
║  💰 Skrill:   ${CONFIG.SKRILL_EMAIL}                          ║
║  🌐 Website:  ${CONFIG.WEBSITE}                               ║
║  ⏰ Interval: Každé ${CONFIG.POST_INTERVAL_HOURS} hodiny                                 ║
║                                                                 ║
╚═══════════════════════════════════════════════════════════════╝
`);

// Check config
if (CONFIG.CLAUDE_API_KEY === 'VLOZ_SEM' || CONFIG.BUFFER_ACCESS_TOKEN === 'VLOZ_SEM') {
    console.log(`
╔═══════════════════════════════════════════════════════════════╗
║  ⚠️  SETUP REQUIRED                                            ║
╠═══════════════════════════════════════════════════════════════╣
║                                                                 ║
║  Otvor súbor: config.js                                        ║
║                                                                 ║
║  Vlož svoje API keys:                                          ║
║  1. CLAUDE_API_KEY   (z console.anthropic.com)                 ║
║  2. BUFFER_ACCESS_TOKEN (z buffer.com/developers)              ║
║                                                                 ║
║  Potom spusti: npm start                                       ║
║                                                                 ║
╚═══════════════════════════════════════════════════════════════╝
`);
    process.exit(0);
}

// Run immediately
runCycle();

// Schedule for every X hours
const schedule = `0 */${CONFIG.POST_INTERVAL_HOURS} * * *`;
cron.schedule(schedule, runCycle);

console.log(`✅ Systém beží! Ďalší post o ${CONFIG.POST_INTERVAL_HOURS} hodiny.`);
console.log('   Stlač Ctrl+C pre ukončenie.\n');
