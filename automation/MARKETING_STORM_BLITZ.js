/**
 * 🌪️ MARKETING STORM BLITZ - MASÍVNA KAMPAŇ NARAZ
 * Generuje všetok content naraz pre maximálny dosah
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const BLITZ_FOLDER = path.join(__dirname, '..', 'blitz-content');
const PROJECT_ROOT = path.join(__dirname, '..');

if (!fs.existsSync(BLITZ_FOLDER)) {
    fs.mkdirSync(BLITZ_FOLDER, { recursive: true });
}

const POST_TEMPLATES = [
    {
        emoji: '🦄⏰',
        title: 'POSLEDNÉ HODINY',
        body: `€50 cena platí len DNES.\n\nZajtra: €200\nPozajtra: Dvere zatvorené\n\n10 miest. 24 hodín.\n\nfordfofer.vercel.app/links`,
        hashtags: '#FordFofer #LastChance #Urgency #Investment #AICapital #Money'
    },
    {
        emoji: '🦄📊',
        title: 'UPDATE',
        body: `Prvých 5 investorov už vstúpilo.\n\nPrečo?\n\nLebo vedia že:\n• AI je budúcnosť\n• Skorý vstup = najväčší výnos\n• €50 dnes = €200 zajtra\n\nfordfofer.vercel.app/links`,
        hashtags: '#FOMO #FordFofer #EarlyBird #Investment #Money'
    },
    {
        emoji: '🦄🔥',
        title: 'HOT TAKE',
        body: `95% traderov by NEMALO obchodovať.\n\nPrečo?\n\nEmócie. Strach. Chamtivosť.\n\nAI nepozná ani jedno z týchto slov.\n\n€50 = Lifetime prístup.\n\nfordfofer.vercel.app/links`,
        hashtags: '#UnpopularOpinion #FordFofer #AItrading #NoEmotions #Money'
    },
    {
        emoji: '🦄💰',
        title: 'ČO ZÍSKAŠ ZA €50',
        body: `→ AI agenty 24/7\n→ Zero chyba\n→ $1.2B kapacita\n→ Lifetime prístup\n\nČo stratíš ak čakáš?\n€150 (cena stúpne)\n\nfordfofer.vercel.app/links`,
        hashtags: '#Value #FordFofer #ROI #SmartInvestment #Money'
    },
    {
        emoji: '🦄🚀',
        title: 'POSLEDNÉ MIESTA',
        body: `€50 = Lifetime prístup k $1.2B AI systému.\n\nČo získaš:\n→ AI agenty 24/7\n→ Zero chyba\n→ Early investor status\n\nZostáva 10 miest.\n\nfordfofer.vercel.app/links`,
        hashtags: '#FordFofer #AICapital #Investment #Slovakia #Startup'
    },
    {
        emoji: '🦄⚡',
        title: 'MATEMATIKA JE JASNÁ',
        body: `AI pracuje 24/7.\nTy spíš 8 hodín.\n\nKto zarobí viac?\n\n€50 vstup. Lifetime prístup.\n\nfordfofer.vercel.app/links`,
        hashtags: '#AItrading #FordFofer #PassiveIncome #SmartMoney'
    },
    {
        emoji: '🦄🎯',
        title: 'EXKLUZÍVNY PRÍSTUP',
        body: `Nie je to pre každého.\n\nJe to pre tých, ktorí:\n• Rozumejú AI\n• Chcú pasívny príjem\n• Vedia že budúcnosť je teraz\n\n€50 = Lifetime.\n\nfordfofer.vercel.app/links`,
        hashtags: '#Exclusive #FordFofer #Elite #AI'
    },
    {
        emoji: '🦄💎',
        title: 'DIAMOND HANDS',
        body: `Diamond hands nie sú len meme.\n\nSú stratégia.\n\nAI má diamond hands 24/7.\n\n€50 = Lifetime prístup k systému bez emócií.\n\nfordfofer.vercel.app/links`,
        hashtags: '#DiamondHands #FordFofer #HODL #AI'
    }
];

const STORY_TEMPLATES = [
    '⏰ POSLEDNÉ HODINY',
    '€50 → €200',
    '10 MIEST ZOSTÁVA',
    'fordfofer.vercel.app/links',
    'KLIKNI TERAZ →',
    '🦄 THE MOST WANTED',
    '$1.2B CAPACITY',
    'ZERO HUMAN ERROR',
    '24/7 AI TRADING',
    'LIFETIME ACCESS'
];

const TWITTER_THREADS = [
    `🧵 Práve som spustil $1.2B projekt.

Nie je to clickbait.

Thread o tom ako 18-ročný zo Slovenska stavia AI trading systém ⬇️

1/ FordFofer = AI autonómny kapitálový systém

2/ Prečo? 95% traderov stráca kvôli emóciám. AI emócie nemá.

3/ €50 early access. Lifetime prístup.

4/ Link: fordfofer.vercel.app/links

RT ak to dáva zmysel.`,

    `🧵 HOT TAKE: 95% traderov by nemalo obchodovať.

Prečo?

Thread ⬇️

1/ Emócie. Strach. Chamtivosť. Únava.

2/ AI nepozná ani jedno z týchto slov.

3/ €50 = Lifetime prístup k systému bez emócií.

4/ fordfofer.vercel.app/links

RT ak súhlasíš.`,

    `🧵 Príbeh 18-ročného zo Slovenska:

Ktorý stavia $1.2B AI systém.

Thread ⬇️

1/ Začal som v 2024.

2/ Cieľ: Zero ľudská chyba v tradingu.

3/ €50 early access. Lifetime.

4/ fordfofer.vercel.app/links

RT ak chceš vedieť viac.`
];

const DM_TEMPLATES = [
    `Ahoj! Rýchla otázka - zaujíma ťa AI trading?

Práve otváram prístup k $1.2B systému za €50 (lifetime).

Zostáva 10 miest.

Záujem? fordfofer.vercel.app/links`,

    `Ahoj [MENO]!

Videl som že sa zaujímaš o [TÉMA].

Práve som spustil FordFofer - $1.2B AI trading systém.

€50 = Lifetime prístup.

Záujem? fordfofer.vercel.app/links`,

    `Ahoj!

Posledná šanca - €50 early access sa zatvára o 24h.

Potom cena stúpne na €200.

Záujem? fordfofer.vercel.app/links`
];

function generateBlitzContent() {
    const timestamp = new Date();
    const dateStr = timestamp.toISOString().split('T')[0];
    const timeStr = timestamp.toTimeString().split(' ')[0].replace(/:/g, '-');
    
    let content = `╔═══════════════════════════════════════════════════════════════╗
║  🌪️ MARKETING STORM BLITZ - ${timestamp.toLocaleString('sk-SK')}
║  MASÍVNA KAMPAŇ - VŠETOK CONTENT NARAZ
╚═══════════════════════════════════════════════════════════════╝

`;

    // Instagram Posts (10x)
    content += `\n📱 INSTAGRAM POSTS (10x):\n`;
    content += '═'.repeat(60) + '\n\n';
    
    for (let i = 0; i < 10; i++) {
        const template = POST_TEMPLATES[Math.floor(Math.random() * POST_TEMPLATES.length)];
        const post = `${template.emoji} ${template.title}\n\n${template.body}\n\n${template.hashtags}`;
        content += `POST ${i + 1}:\n${post}\n\n${'─'.repeat(60)}\n\n`;
    }
    
    // Stories (10x)
    content += `\n📸 INSTAGRAM STORIES (10x):\n`;
    content += '═'.repeat(60) + '\n\n';
    
    STORY_TEMPLATES.forEach((story, i) => {
        content += `STORY ${i + 1}: ${story}\n\n`;
    });
    
    // Twitter Threads (3x)
    content += `\n🐦 TWITTER THREADS (3x):\n`;
    content += '═'.repeat(60) + '\n\n';
    
    TWITTER_THREADS.forEach((thread, i) => {
        content += `THREAD ${i + 1}:\n${thread}\n\n${'─'.repeat(60)}\n\n`;
    });
    
    // DMs (10x)
    content += `\n💬 DM TEMPLATES (10x):\n`;
    content += '═'.repeat(60) + '\n\n';
    
    for (let i = 0; i < 10; i++) {
        const template = DM_TEMPLATES[Math.floor(Math.random() * DM_TEMPLATES.length)];
        content += `DM ${i + 1}:\n${template}\n\n${'─'.repeat(60)}\n\n`;
    }
    
    // LinkedIn Post
    content += `\n💼 LINKEDIN POST:\n`;
    content += '═'.repeat(60) + '\n\n';
    content += `🚀 Launching FordFofer - $1.2B AI Trading System

As an 18-year-old entrepreneur from Slovakia, I'm building something different.

FordFofer eliminates human error in trading through autonomous AI agents.

Key facts:
• 24/7 operation
• Zero emotional interference  
• $1.2B capacity
• Early investor access: €50

This isn't about replacing traders. It's about augmenting them.

Interested? Comment "INFO" or visit: fordfofer.vercel.app/links

#FinTech #AI #Startup #Entrepreneurship #Investment #Slovakia

`;
    
    content += `\n╔═══════════════════════════════════════════════════════════════╝
║  ✅ BLITZ COMPLETE - VŠETOK CONTENT VYGENEROVANÝ!
║  📋 Skopíruj a postni všetko!
╚═══════════════════════════════════════════════════════════════╝
`;
    
    return content;
}

function saveBlitzContent(content) {
    const timestamp = new Date();
    const dateStr = timestamp.toISOString().split('T')[0];
    const timeStr = timestamp.toTimeString().split(' ')[0].replace(/:/g, '-');
    
    const filename = `BLITZ-${dateStr}-${timeStr}.txt`;
    const filepath = path.join(BLITZ_FOLDER, filename);
    
    fs.writeFileSync(filepath, content, 'utf8');
    
    console.log(`\n✅ BLITZ CONTENT ULOŽENÝ: ${filename}`);
    console.log(`📁 ${filepath}\n`);
    
    // Otvor súbor
    try {
        execSync(`start notepad "${filepath}"`, { cwd: PROJECT_ROOT });
    } catch (e) {
        // Ignore
    }
    
    return filepath;
}

function generateIndividualFiles() {
    const timestamp = new Date();
    const dateStr = timestamp.toISOString().split('T')[0];
    const timeStr = timestamp.toTimeString().split(' ')[0].replace(/:/g, '-');
    
    // Instagram Posts
    for (let i = 0; i < 10; i++) {
        const template = POST_TEMPLATES[Math.floor(Math.random() * POST_TEMPLATES.length)];
        const post = `${template.emoji} ${template.title}\n\n${template.body}\n\n${template.hashtags}`;
        
        const filename = `instagram-post-${i + 1}-${dateStr}-${timeStr}.txt`;
        const filepath = path.join(BLITZ_FOLDER, filename);
        
        fs.writeFileSync(filepath, post, 'utf8');
    }
    
    // Stories
    STORY_TEMPLATES.forEach((story, i) => {
        const filename = `story-${i + 1}-${dateStr}-${timeStr}.txt`;
        const filepath = path.join(BLITZ_FOLDER, filename);
        fs.writeFileSync(filepath, story, 'utf8');
    });
    
    // Twitter Threads
    TWITTER_THREADS.forEach((thread, i) => {
        const filename = `twitter-thread-${i + 1}-${dateStr}-${timeStr}.txt`;
        const filepath = path.join(BLITZ_FOLDER, filename);
        fs.writeFileSync(filepath, thread, 'utf8');
    });
    
    // DMs
    for (let i = 0; i < 10; i++) {
        const template = DM_TEMPLATES[Math.floor(Math.random() * DM_TEMPLATES.length)];
        const filename = `dm-${i + 1}-${dateStr}-${timeStr}.txt`;
        const filepath = path.join(BLITZ_FOLDER, filename);
        fs.writeFileSync(filepath, template, 'utf8');
    }
    
    console.log('✅ Individual files created!\n');
}

// Spusti BLITZ
console.log(`
╔═══════════════════════════════════════════════════════════════╗
║     🌪️ MARKETING STORM BLITZ                                  ║
║     GENERUJEM VŠETOK CONTENT NARAZ!                            ║
╚═══════════════════════════════════════════════════════════════╝
`);

console.log('🚀 Generujem content...\n');

const blitzContent = generateBlitzContent();
saveBlitzContent(blitzContent);

console.log('📁 Generujem individual files...\n');
generateIndividualFiles();

// Auto-commit
try {
    console.log('💾 Auto-committing...\n');
    execSync('git add -A', { cwd: PROJECT_ROOT, stdio: 'inherit' });
    execSync(`git commit -m "MARKETING STORM BLITZ: Massive content generation"`, { 
        cwd: PROJECT_ROOT, 
        stdio: 'inherit' 
    });
} catch (e) {
    console.log('⚠️ Commit skipped\n');
}

console.log(`
╔═══════════════════════════════════════════════════════════════╗
║     ✅ BLITZ COMPLETE!                                          ║
║                                                                ║
║     📱 10 Instagram Posts                                       ║
║     📸 10 Stories                                              ║
║     🐦 3 Twitter Threads                                       ║
║     💬 10 DM Templates                                         ║
║     💼 1 LinkedIn Post                                         ║
║                                                                ║
║     📁 Všetko v: blitz-content/                                ║
╚═══════════════════════════════════════════════════════════════╝
`);


