/**
 * 🚀 FULL AUTO WITH OPENAI - 100% AUTOMATIZÁCIA
 * Generuje content cez OpenAI a automaticky postuje
 */

const cron = require('node-cron');
const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const CONFIG = require('./config.js');

const POSTS_FOLDER = path.join(__dirname, '..', 'generated-posts');
if (!fs.existsSync(POSTS_FOLDER)) fs.mkdirSync(POSTS_FOLDER, { recursive: true });

const TOPICS = [
    'AI pracuje 24/7 zatiaľ čo ty spíš - pasívny príjem',
    '€50 early access - limitované miesta pre investorov',
    'Zero ľudská chyba - prečo AI vyhráva nad tradermi',
    '$1.2B kapacita - škálovateľný systém',
    'Urgencia - cena čoskoro stúpne na €200',
    'Posledná šanca pre early investors',
    'Prečo 95% traderov zlyháva (emócie vs AI)',
    'Lifetime prístup za jednorazový poplatok',
    'Prvých 5 investorov už zaplatilo - social proof',
    'Matematika je jasná - AI vs ľudia'
];

function getPrompt() {
    const topic = TOPICS[Math.floor(Math.random() * TOPICS.length)];
    return `Si marketingový expert pre FordFofer - $1.2B AI trading systém.

FAKTY:
- FordFofer = AI autonómny kapitálový systém
- Early investor prístup: €50 (lifetime)
- AI agenti pracujú 24/7, zero chyba
- Web: ${CONFIG.WEBSITE}
- Platby: Skrill (${CONFIG.SKRILL_EMAIL})

ÚLOHA: Napíš 1 Instagram post.

TÉMA: ${topic}

ŠTÝL:
- Emoji na začiatku (🦄)
- Max 120 slov
- Brutálne sebavedomý tón
- Krátke vety, odrážky
- CTA: "Link v bio" alebo "${CONFIG.WEBSITE}/links"
- 5-6 hashtagov na konci
- Vždy zahrň: 💰 Platba: ${CONFIG.SKRILL_EMAIL}

ODPOVEDZ LEN TEXTOM POSTU, nič iné.`;
}

async function generateWithOpenAI() {
    console.log('🤖 Generujem obsah cez OpenAI...\n');
    
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${CONFIG.OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: 'gpt-4o-mini',
                messages: [
                    { role: 'system', content: 'Si expertný marketingový copywriter pre fintech startup.' },
                    { role: 'user', content: getPrompt() }
                ],
                max_tokens: 500,
                temperature: 0.8
            })
        });
        
        const data = await response.json();
        
        if (data.choices && data.choices[0]) {
            const content = data.choices[0].message.content.trim();
            console.log('✅ Obsah vygenerovaný!\n');
            return content;
        } else {
            console.log('❌ Chyba:', JSON.stringify(data));
            return null;
        }
    } catch (error) {
        console.log('❌ OpenAI Error:', error.message);
        return null;
    }
}

function savePost(content) {
    const timestamp = new Date();
    const dateStr = timestamp.toISOString().split('T')[0];
    const timeStr = timestamp.toTimeString().split(' ')[0].replace(/:/g, '-');
    
    const filename = `post-${dateStr}-${timeStr}.txt`;
    const filepath = path.join(POSTS_FOLDER, filename);
    
    const fileContent = `╔═══════════════════════════════════════════════════════════════╗
║  🦄 POST VYGENEROVANÝ: ${timestamp.toLocaleString('sk-SK')}
║  🤖 OpenAI GPT-4o-mini
╚═══════════════════════════════════════════════════════════════╝

${content}

╔═══════════════════════════════════════════════════════════════╝
║  📋 SKOPÍRUJ TEXT VYŠŠIE A POSTNI!
║  💾 Súbor: ${filename}
╚═══════════════════════════════════════════════════════════════╝
`;
    
    fs.writeFileSync(filepath, fileContent, 'utf8');
    
    console.log(`💾 Uložené: ${filename}\n`);
    
    // Otvor súbor
    try {
        execSync(`start notepad "${filepath}"`, { cwd: path.join(__dirname, '..') });
    } catch (e) {}
    
    return filepath;
}

async function postToBuffer(content) {
    if (CONFIG.BUFFER_ACCESS_TOKEN === 'VLOZ_SEM') {
        console.log('⚠️ Buffer token nie je nastavený - post sa len uložil\n');
        return;
    }
    
    console.log('📤 Postujem na Buffer...\n');
    
    try {
        const profiles = await fetch(
            `https://api.bufferapp.com/1/profiles.json?access_token=${CONFIG.BUFFER_ACCESS_TOKEN}`
        ).then(r => r.json());
        
        if (!Array.isArray(profiles) || profiles.length === 0) {
            console.log('❌ Žiadne Buffer profily!\n');
            return;
        }
        
        console.log(`📱 Nájdených ${profiles.length} profilov\n`);
        
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
        
        console.log('\n✅ Buffer posting complete!\n');
    } catch (error) {
        console.log('❌ Buffer Error:', error.message);
    }
}

function autoCommit() {
    try {
        execSync('git add -A', { cwd: path.join(__dirname, '..'), stdio: 'inherit' });
        const timestamp = new Date().toLocaleString('sk-SK');
        execSync(`git commit -m "Auto-generated post: ${timestamp}"`, { 
            cwd: path.join(__dirname, '..'), 
            stdio: 'inherit' 
        });
        console.log('✅ Git committed\n');
    } catch (e) {
        console.log('⚠️ Git commit skipped\n');
    }
}

async function runCycle() {
    console.log('\n' + '═'.repeat(60));
    console.log('🚀 FULL AUTO CYCLE STARTED');
    console.log('⏰ ' + new Date().toLocaleString('sk-SK'));
    console.log('═'.repeat(60) + '\n');
    
    const content = await generateWithOpenAI();
    
    if (content) {
        console.log('📝 VYGENEROVANÝ POST:\n');
        console.log('─'.repeat(60));
        console.log(content);
        console.log('─'.repeat(60) + '\n');
        
        savePost(content);
        await postToBuffer(content);
        autoCommit();
    }
    
    console.log('✅ CYCLE COMPLETE\n');
}

// Check OpenAI key
if (!CONFIG.OPENAI_API_KEY || CONFIG.OPENAI_API_KEY === 'VLOZ_SEM') {
    console.log(`
╔═══════════════════════════════════════════════════════════════╗
║  ⚠️  OPENAI API KEY CHÝBA                                    ║
║  Vlož OpenAI API key do config.js                            ║
╚═══════════════════════════════════════════════════════════════╝
`);
    process.exit(0);
}

console.log(`
╔═══════════════════════════════════════════════════════════════╗
║     🚀 FULL AUTO WITH OPENAI                                  ║
║     100% AUTOMATIZÁCIA                                        ║
╠═══════════════════════════════════════════════════════════════╣
║                                                                 ║
║  💰 Skrill:   ${CONFIG.SKRILL_EMAIL}                          ║
║  🌐 Website:  ${CONFIG.WEBSITE}                               ║
║  ⏰ Interval: Každé ${CONFIG.POST_INTERVAL_HOURS} hodiny                                 ║
║  🤖 AI:       OpenAI GPT-4o-mini                              ║
║                                                                 ║
╚═══════════════════════════════════════════════════════════════╝
`);

// Run immediately
runCycle();

// Schedule for every X hours
const schedule = `0 */${CONFIG.POST_INTERVAL_HOURS} * * *`;
cron.schedule(schedule, runCycle);

console.log(`✅ Systém beží! Ďalší post o ${CONFIG.POST_INTERVAL_HOURS} hodiny.`);
console.log('   Stlač Ctrl+C pre ukončenie.\n');


