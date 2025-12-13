/**
 * 🦄 AUTO MARKETING MACHINE - VŠETKO AUTOMATICKY
 * Generuje Instagram content, influencer content, DMs - všetko pre Skrill platby
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const cron = require('node-cron');

const MARKETING_FOLDER = path.join(__dirname, '..', 'auto-marketing');
const INSTAGRAM_FOLDER = path.join(__dirname, '..', 'auto-marketing', 'instagram');
const INFLUENCER_FOLDER = path.join(__dirname, '..', 'auto-marketing', 'influencers');
const PROJECT_ROOT = path.join(__dirname, '..');

[MARKETING_FOLDER, INSTAGRAM_FOLDER, INFLUENCER_FOLDER].forEach(folder => {
    if (!fs.existsSync(folder)) fs.mkdirSync(folder, { recursive: true });
});

const INSTAGRAM_POSTS = [
    {
        emoji: '🦄⏰',
        title: 'POSLEDNÉ HODINY',
        body: `€50 cena platí len DNES.\n\nZajtra: €200\nPozajtra: Dvere zatvorené\n\n10 miest. 24 hodín.\n\n💰 Platba: gcapovic.biz@proton.me (Skrill)\n\nfordfofer.vercel.app/links`,
        hashtags: '#FordFofer #LastChance #Urgency #Investment #AICapital #Money #Skrill'
    },
    {
        emoji: '🦄💰',
        title: 'PLATBA JE JEDNODUCHÁ',
        body: `Všetky spôsoby platby podporované:\n\n💳 Karty (Visa, Mastercard)\n₿ Crypto (BTC, ETH, USDT)\n🏦 Bank Transfer\n💵 Skrill Balance\n\nVšetko ide na:\ngcapovic.biz@proton.me\n\n€50 = Lifetime prístup.\n\nfordfofer.vercel.app/links`,
        hashtags: '#Payment #FordFofer #Skrill #Crypto #EasyPayment'
    },
    {
        emoji: '🦄📊',
        title: 'UPDATE',
        body: `Prvých 5 investorov už zaplatilo.\n\nPrečo?\n\nLebo vedia že:\n• AI je budúcnosť\n• Skorý vstup = najväčší výnos\n• €50 dnes = €200 zajtra\n\n💰 Platba: gcapovic.biz@proton.me\n\nfordfofer.vercel.app/links`,
        hashtags: '#FOMO #FordFofer #EarlyBird #Payment'
    },
    {
        emoji: '🦄🔥',
        title: 'HOT TAKE',
        body: `95% traderov by NEMALO obchodovať.\n\nPrečo?\n\nEmócie. Strach. Chamtivosť.\n\nAI nepozná ani jedno z týchto slov.\n\n€50 = Lifetime prístup.\n💰 gcapovic.biz@proton.me\n\nfordfofer.vercel.app/links`,
        hashtags: '#UnpopularOpinion #FordFofer #AItrading'
    },
    {
        emoji: '🦄💎',
        title: 'DIAMOND HANDS',
        body: `Diamond hands nie sú len meme.\n\nSú stratégia.\n\nAI má diamond hands 24/7.\n\n€50 = Lifetime prístup.\n💰 Platba: gcapovic.biz@proton.me\n\nfordfofer.vercel.app/links`,
        hashtags: '#DiamondHands #FordFofer #HODL'
    }
];

const INFLUENCER_EMAILS = [
    { name: 'TechSlovakia', email: 'tech@slovakia.sk', followers: '50K' },
    { name: 'CryptoSlovakia', email: 'crypto@slovakia.sk', followers: '30K' },
    { name: 'StartupSK', email: 'startup@sk.sk', followers: '25K' },
    { name: 'AISlovakia', email: 'ai@slovakia.sk', followers: '40K' },
    { name: 'FinTechSK', email: 'fintech@sk.sk', followers: '35K' }
];

function generateInstagramPost() {
    const template = INSTAGRAM_POSTS[Math.floor(Math.random() * INSTAGRAM_POSTS.length)];
    return `${template.emoji} ${template.title}\n\n${template.body}\n\n${template.hashtags}`;
}

function generateInfluencerEmail(influencer) {
    return `Subject: 🦄 Collaboration - $1.2B AI Project | Revenue Share Opportunity

Ahoj ${influencer.name},

Som Šimon Kohút, 18-ročný podnikateľ zo Slovenska.

Práve som spustil FordFofer - $1.2B AI trading systém.

MÁM PRE TEBA EXKLUZÍVNU PONUKU:

💰 Revenue Share Partnership
• Získaj % z každého investora ktorého privedieš
• Early access za €50 (normálne €200)
• Exkluzívny content pre tvojich ${influencer.followers} followerov

PLATBA JE JEDNODUCHÁ:
Všetky platby idú na Skrill: gcapovic.biz@proton.me

Záujem? Odpíš a pošlem ti viac info.

Link: fordfofer.vercel.app/links

S pozdravom,
Šimon Kohút
Founder @ FordFofer`;
}

function saveContent(type, content, filename) {
    const folder = type === 'instagram' ? INSTAGRAM_FOLDER : INFLUENCER_FOLDER;
    const filepath = path.join(folder, filename);
    fs.writeFileSync(filepath, content, 'utf8');
    
    console.log(`✅ ${type.toUpperCase()}: ${filename}`);
    
    // Otvor súbor
    try {
        execSync(`start notepad "${filepath}"`, { cwd: PROJECT_ROOT });
    } catch (e) {}
    
    return filepath;
}

function generateDailyContent() {
    const timestamp = new Date();
    const dateStr = timestamp.toISOString().split('T')[0];
    const timeStr = timestamp.toTimeString().split(' ')[0].replace(/:/g, '-');
    
    console.log('\n' + '═'.repeat(60));
    console.log('🦄 GENERUJEM DENNÝ CONTENT...');
    console.log('═'.repeat(60));
    
    // Instagram Posts (5x)
    for (let i = 1; i <= 5; i++) {
        const post = generateInstagramPost();
        const filename = `instagram-post-${i}-${dateStr}-${timeStr}.txt`;
        saveContent('instagram', post, filename);
    }
    
    // Influencer Emails
    INFLUENCER_EMAILS.forEach((inf, i) => {
        const email = generateInfluencerEmail(inf);
        const filename = `email-${inf.name}-${dateStr}-${timeStr}.txt`;
        saveContent('influencer', email, filename);
    });
    
    console.log('\n✅ DENNÝ CONTENT VYGENEROVANÝ!\n');
}

// Spusti teraz
generateDailyContent();

// Automaticky každé 2 hodiny
cron.schedule('0 */2 * * *', () => {
    generateDailyContent();
});

// Automaticky každý deň o 8:00
cron.schedule('0 8 * * *', () => {
    console.log('\n🌅 RANNÝ MARKETING...\n');
    generateDailyContent();
});

console.log(`
╔═══════════════════════════════════════════════════════════════╗
║     🦄 AUTO MARKETING MACHINE - BEŽÍ                          ║
║                                                                ║
║     ✅ Generuje Instagram posts každé 2h                      ║
║     ✅ Generuje influencer emails                             ║
║     ✅ Všetko smeruje na Skrill platby                        ║
║                                                                ║
║     Stlač Ctrl+C pre ukončenie                                ║
╚═══════════════════════════════════════════════════════════════╝
`);


