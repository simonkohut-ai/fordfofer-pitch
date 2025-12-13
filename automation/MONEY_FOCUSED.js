/**
 * 💰 MONEY-FOCUSED MARKETING - PRIAMO NA PLATBY
 * Generuje content ktorý priamo vedie k Skrill platbám
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const MONEY_FOLDER = path.join(__dirname, '..', 'money-content');
if (!fs.existsSync(MONEY_FOLDER)) fs.mkdirSync(MONEY_FOLDER, { recursive: true });

const MONEY_POSTS = [
    {
        emoji: '🦄💰',
        title: 'PLATBA JE JEDNODUCHÁ - 3 KLIKY',
        body: `€50 = Lifetime prístup k $1.2B AI systému.

JAK ZAPLATIŤ:
1. Klikni na link v bio
2. Skopíruj Skrill email: gcapovic.biz@proton.me
3. Pošli €50 cez Skrill

Všetky platby podporované:
💳 Karty | ₿ Crypto | 🏦 Bank | 💵 Skrill

Zostáva 10 miest. 24 hodín.

fordfofer.vercel.app/links`,
        hashtags: '#Payment #FordFofer #Skrill #EasyPayment #Money'
    },
    {
        emoji: '🦄⏰',
        title: 'POSLEDNÉ HODINY - €50 → €200',
        body: `Cena stúpne ZAJTRA.

DNES: €50
ZAJTRA: €200
POZAJTRA: Dvere zatvorené

PLATBA: gcapovic.biz@proton.me (Skrill)

Všetky spôsoby platby podporované.

10 miest. 24 hodín.

fordfofer.vercel.app/links`,
        hashtags: '#Urgency #LastChance #Payment #Skrill #Money'
    },
    {
        emoji: '🦄💎',
        title: 'PRVÝCH 5 INVESTOROV UŽ ZAPLATILO',
        body: `Social proof: Prvých 5 investorov už zaplatilo €50.

Prečo?

Lebo vedia že:
• AI je budúcnosť
• Skorý vstup = najväčší výnos
• €50 dnes = €200 zajtra

PLATBA: gcapovic.biz@proton.me

Zapoj sa teraz.

fordfofer.vercel.app/links`,
        hashtags: '#SocialProof #FOMO #Payment #Skrill #Money'
    },
    {
        emoji: '🦄🔥',
        title: 'HOT TAKE: 95% TRADEROV STRÁCA',
        body: `Prečo? Emócie. Strach. Chamtivosť.

AI emócie nemá.

€50 = Lifetime prístup k systému bez emócií.

PLATBA: gcapovic.biz@proton.me (Skrill)

Všetky platby podporované.

fordfofer.vercel.app/links`,
        hashtags: '#HotTake #AItrading #Payment #Skrill'
    },
    {
        emoji: '🦄📊',
        title: 'MATEMATIKA JE JASNÁ',
        body: `AI pracuje 24/7.
Ty spíš 8 hodín.

Kto zarobí viac?

€50 = Lifetime prístup.

PLATBA: gcapovic.biz@proton.me

💳 Karty | ₿ Crypto | 🏦 Bank | 💵 Skrill

fordfofer.vercel.app/links`,
        hashtags: '#Math #ROI #Payment #Skrill #Money'
    },
    {
        emoji: '🦄🚀',
        title: 'EXKLUZÍVNY PRÍSTUP - €50',
        body: `Nie je to pre každého.

Je to pre tých, ktorí:
• Rozumejú AI
• Chcú pasívny príjem
• Vedia že budúcnosť je teraz

€50 = Lifetime.

PLATBA: gcapovic.biz@proton.me (Skrill)

Všetky platby podporované.

fordfofer.vercel.app/links`,
        hashtags: '#Exclusive #Elite #Payment #Skrill'
    }
];

const MONEY_STORIES = [
    '💰 €50 → €200 ZAJTRA',
    '⏰ POSLEDNÉ HODINY',
    '💳 PLATBA: gcapovic.biz@proton.me',
    '✅ VŠETKY PLATBY PODPOROVANÉ',
    '🚀 10 MIEST ZOSTÁVA',
    '💎 PRVÝCH 5 UŽ ZAPLATILO',
    '🔥 €50 = LIFETIME',
    '📊 AI PRACUJE 24/7',
    '🦄 THE MOST WANTED',
    '💰 SKRILL: gcapovic.biz@proton.me'
];

const MONEY_DMS = [
    `Ahoj! Rýchla otázka - zaujíma ťa AI trading?

€50 = Lifetime prístup k $1.2B systému.

PLATBA: gcapovic.biz@proton.me (Skrill)

Všetky platby podporované.

Záujem? fordfofer.vercel.app/links`,

    `Ahoj [MENO]!

Posledná šanca - €50 early access sa zatvára o 24h.

Potom cena stúpne na €200.

PLATBA: gcapovic.biz@proton.me

Záujem? fordfofer.vercel.app/links`,

    `Ahoj!

Prvých 5 investorov už zaplatilo €50.

Prečo? Lebo vedia že AI je budúcnosť.

PLATBA: gcapovic.biz@proton.me (Skrill)

Záujem? fordfofer.vercel.app/links`
];

function generateMoneyContent() {
    const timestamp = new Date();
    const dateStr = timestamp.toISOString().split('T')[0];
    const timeStr = timestamp.toTimeString().split(' ')[0].replace(/:/g, '-');
    
    let content = `╔═══════════════════════════════════════════════════════════════╗
║  💰 MONEY-FOCUSED CONTENT - ${timestamp.toLocaleString('sk-SK')}
║  PRIAMO NA SKRILL PLATBY
╚═══════════════════════════════════════════════════════════════╝

🦄 SKRILL EMAIL: gcapovic.biz@proton.me
💰 SUMA: €50
💳 VŠETKY PLATBY PODPOROVANÉ

`;

    // Instagram Posts (6x)
    content += `\n📱 INSTAGRAM POSTS (6x):\n`;
    content += '═'.repeat(60) + '\n\n';
    
    MONEY_POSTS.forEach((post, i) => {
        const postText = `${post.emoji} ${post.title}\n\n${post.body}\n\n${post.hashtags}`;
        content += `POST ${i + 1}:\n${postText}\n\n${'─'.repeat(60)}\n\n`;
        
        // Ulož individual file
        const filename = `money-post-${i + 1}-${dateStr}-${timeStr}.txt`;
        const filepath = path.join(MONEY_FOLDER, filename);
        fs.writeFileSync(filepath, postText, 'utf8');
    });
    
    // Stories (10x)
    content += `\n📸 INSTAGRAM STORIES (10x):\n`;
    content += '═'.repeat(60) + '\n\n';
    
    MONEY_STORIES.forEach((story, i) => {
        content += `STORY ${i + 1}: ${story}\n\n`;
        
        // Ulož individual file
        const filename = `money-story-${i + 1}-${dateStr}-${timeStr}.txt`;
        const filepath = path.join(MONEY_FOLDER, filename);
        fs.writeFileSync(filepath, story, 'utf8');
    });
    
    // DMs (3x)
    content += `\n💬 DM TEMPLATES (3x):\n`;
    content += '═'.repeat(60) + '\n\n';
    
    MONEY_DMS.forEach((dm, i) => {
        content += `DM ${i + 1}:\n${dm}\n\n${'─'.repeat(60)}\n\n`;
        
        // Ulož individual file
        const filename = `money-dm-${i + 1}-${dateStr}-${timeStr}.txt`;
        const filepath = path.join(MONEY_FOLDER, filename);
        fs.writeFileSync(filepath, dm, 'utf8');
    });
    
    content += `\n╔═══════════════════════════════════════════════════════════════╝
║  ✅ MONEY CONTENT VYGENEROVANÝ!
║  💰 Všetko smeruje na: gcapovic.biz@proton.me
╚═══════════════════════════════════════════════════════════════╝
`;
    
    // Ulož hlavný súbor
    const mainFile = path.join(MONEY_FOLDER, `MONEY-ALL-${dateStr}-${timeStr}.txt`);
    fs.writeFileSync(mainFile, content, 'utf8');
    
    console.log(`\n✅ MONEY CONTENT VYGENEROVANÝ!`);
    console.log(`📁 ${mainFile}\n`);
    
    // Otvor súbor
    try {
        execSync(`start notepad "${mainFile}"`, { cwd: path.join(__dirname, '..') });
    } catch (e) {}
    
    return mainFile;
}

// Spusti
console.log(`
╔═══════════════════════════════════════════════════════════════╗
║     💰 MONEY-FOCUSED MARKETING                                 ║
║     Generujem content priamo na Skrill platby!                ║
╚═══════════════════════════════════════════════════════════════╝
`);

generateMoneyContent();

console.log('✅ Hotovo! Content je v money-content/ folderi\n');


