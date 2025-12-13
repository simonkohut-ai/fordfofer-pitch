/**
 * 🦄 INFLUENCER SYSTEM - Vytvára influencer content a posiela emails
 * Spustenie: node INFLUENCER_SYSTEM.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const cron = require('node-cron');

const INFLUENCERS_FOLDER = path.join(__dirname, '..', 'influencers');
const EMAILS_FOLDER = path.join(__dirname, '..', 'emails');

if (!fs.existsSync(INFLUENCERS_FOLDER)) fs.mkdirSync(INFLUENCERS_FOLDER, { recursive: true });
if (!fs.existsSync(EMAILS_FOLDER)) fs.mkdirSync(EMAILS_FOLDER, { recursive: true });

// Influencer database
const INFLUENCERS = [
    { name: 'TechSlovakia', email: 'tech@slovakia.sk', platform: 'Instagram', followers: '50K', niche: 'Tech' },
    { name: 'CryptoSlovakia', email: 'crypto@slovakia.sk', platform: 'Twitter', followers: '30K', niche: 'Crypto' },
    { name: 'StartupSK', email: 'startup@sk.sk', platform: 'LinkedIn', followers: '25K', niche: 'Startups' },
    { name: 'AISlovakia', email: 'ai@slovakia.sk', platform: 'Instagram', followers: '40K', niche: 'AI' },
    { name: 'FinTechSK', email: 'fintech@sk.sk', platform: 'Twitter', followers: '35K', niche: 'FinTech' },
    { name: 'YoungEntrepreneurs', email: 'young@entrepreneurs.sk', platform: 'Instagram', followers: '60K', niche: 'Entrepreneurship' },
    { name: 'SlovakInvestors', email: 'investors@sk.sk', platform: 'LinkedIn', followers: '45K', niche: 'Investment' },
    { name: 'TechNewsSK', email: 'news@tech.sk', platform: 'Twitter', followers: '55K', niche: 'Tech News' }
];

// Email templates
const EMAIL_TEMPLATES = {
    collaboration: (influencer) => `Subject: 🦄 Collaboration Opportunity - $1.2B AI Project

Ahoj ${influencer.name},

Som Šimon Kohút, 18-ročný podnikateľ zo Slovenska.

Práve som spustil FordFofer - $1.2B AI trading systém a hľadám partnervov na spoluprácu.

Prečo by ťa to malo zaujímať:
• Revolučný AI systém
• Skorý prístup k projektu
• Možnosť byť súčasťou histórie

Máš ${influencer.followers} followerov v ${influencer.niche} - perfektné pre našu spoluprácu.

Záujem? Odpíš a pošlem ti viac info.

Link: fordfofer.vercel.app/links

S pozdravom,
Šimon Kohút
Founder @ FordFofer`,

    partnership: (influencer) => `Subject: 🦄 Partnership Opportunity - Early Access

Ahoj ${influencer.name},

Mám pre teba exkluzívnu ponuku.

FordFofer - $1.2B AI systém hľadá partnervov.

Ako influencer v ${influencer.niche} s ${influencer.followers} followerov, môžeš získať:
• Early access za €50 (normálne €200)
• Revenue share možnosť
• Exkluzívny content

Záujem? Odpíš.

Link: fordfofer.vercel.app/links

Šimon Kohút`,

    press: (influencer) => `Subject: 🦄 Press Release - 18 y/o Slovak Builds $1.2B AI System

Ahoj ${influencer.name},

Mám pre teba exkluzívny príbeh.

18-ročný zo Slovenska stavia $1.2B AI trading systém.

FordFofer je projekt ktorý mení pravidlá hry.

Chcel by som ti poslať press release a možno urobiť rozhovor.

Záujem?

Link: fordfofer.vercel.app/links

Šimon Kohút`
};

function generateInfluencerContent(influencer) {
    const templates = [
        {
            type: 'collaboration',
            subject: `🦄 Collaboration Opportunity - $1.2B AI Project`,
            body: EMAIL_TEMPLATES.collaboration(influencer)
        },
        {
            type: 'partnership',
            subject: `🦄 Partnership Opportunity - Early Access`,
            body: EMAIL_TEMPLATES.partnership(influencer)
        },
        {
            type: 'press',
            subject: `🦄 Press Release - 18 y/o Slovak Builds $1.2B AI System`,
            body: EMAIL_TEMPLATES.press(influencer)
        }
    ];
    
    return templates[Math.floor(Math.random() * templates.length)];
}

function saveEmail(influencer, emailContent) {
    const timestamp = new Date();
    const dateStr = timestamp.toISOString().split('T')[0];
    const timeStr = timestamp.toTimeString().split(' ')[0].replace(/:/g, '-');
    
    const filename = `email-${influencer.name.replace(/\s+/g, '-')}-${dateStr}-${timeStr}.txt`;
    const filepath = path.join(EMAILS_FOLDER, filename);
    
    const content = `╔═══════════════════════════════════════════════════════════════╗
║  📧 EMAIL PRE: ${influencer.name}
║  📅 ${timestamp.toLocaleString('sk-SK')}
║  🎯 Typ: ${emailContent.type}
╚═══════════════════════════════════════════════════════════════╝

TO: ${influencer.email}
SUBJECT: ${emailContent.subject}

${emailContent.body}

╔═══════════════════════════════════════════════════════════════╝
║  📋 SKOPÍRUJ EMAIL VYŠŠIE A POŠLI!
║  💾 Súbor: ${filename}
╚═══════════════════════════════════════════════════════════════╝
`;
    
    fs.writeFileSync(filepath, content, 'utf8');
    
    console.log(`\n✅ EMAIL VYGENEROVANÝ: ${filename}`);
    console.log(`📧 Pre: ${influencer.name} (${influencer.email})`);
    console.log(`📁 ${filepath}\n`);
    
    // Otvor súbor
    try {
        execSync(`start notepad "${filepath}"`, { cwd: path.join(__dirname, '..') });
    } catch (e) {
        // Ignore
    }
    
    return filepath;
}

function createInfluencerList() {
    const listFile = path.join(INFLUENCERS_FOLDER, 'influencers-list.txt');
    
    let content = `╔═══════════════════════════════════════════════════════════════╗
║  🦄 INFLUENCER DATABASE - ${INFLUENCERS.length} INFLUENCEROV
╚═══════════════════════════════════════════════════════════════╝

`;
    
    INFLUENCERS.forEach((inf, index) => {
        content += `${index + 1}. ${inf.name}
   📧 Email: ${inf.email}
   📱 Platform: ${inf.platform}
   👥 Followers: ${inf.followers}
   🎯 Niche: ${inf.niche}
   
`;
    });
    
    fs.writeFileSync(listFile, content, 'utf8');
    console.log(`✅ Influencer list vytvorený: ${listFile}\n`);
    
    return listFile;
}

function sendEmailsToAll() {
    console.log('\n' + '═'.repeat(60));
    console.log('📧 POSIELAM EMAILY VŠETKÝM INFLUENCEROM...');
    console.log('═'.repeat(60));
    
    INFLUENCERS.forEach((influencer, index) => {
        console.log(`\n[${index + 1}/${INFLUENCERS.length}] ${influencer.name}...`);
        
        const emailContent = generateInfluencerContent(influencer);
        saveEmail(influencer, emailContent);
        
        // Delay medzi emailmi
        setTimeout(() => {}, 1000);
    });
    
    console.log('\n✅ VŠETKY EMAILY VYGENEROVANÉ!\n');
}

// Spusti
console.log(`
╔═══════════════════════════════════════════════════════════════╗
║     🦄 INFLUENCER SYSTEM                                       ║
║     Vytvára influencer content a posiela emaily              ║
╚═══════════════════════════════════════════════════════════════╝
`);

// Vytvor influencer list
createInfluencerList();

// Pošli emaily všetkým
sendEmailsToAll();

// Automaticky každý deň o 9:00
cron.schedule('0 9 * * *', () => {
    console.log('\n📧 RANNÉ EMAILY POSIELAM...\n');
    sendEmailsToAll();
});

console.log('✅ Systém beží! Emaily sa generujú automaticky.\n');
console.log('📧 Emaily nájdeš v: emails/\n');


