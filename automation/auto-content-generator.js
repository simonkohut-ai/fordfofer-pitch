/**
 * 🚀 AUTO CONTENT GENERATOR
 * Generuje posty každé 2 hodiny a ukladá do súboru
 * Spustenie: node auto-content-generator.js
 */

const fs = require('fs');
const path = require('path');

const POST_TEMPLATES = [
    {
        emoji: '⏰',
        title: 'POSLEDNÉ HODINY',
        body: `€50 cena platí len DNES.\n\nZajtra: €200\nPozajtra: Dvere zatvorené\n\n10 miest. 24 hodín.\n\nfordfofer.vercel.app/links`,
        hashtags: '#FordFofer #LastChance #Urgency #Investment'
    },
    {
        emoji: '📊',
        title: 'UPDATE',
        body: `Prvých 3 investorov už vstúpilo.\n\nPrečo?\n\nLebo vedia že:\n• AI je budúcnosť\n• Skorý vstup = najväčší výnos\n• €50 dnes = €200 zajtra\n\nfordfofer.vercel.app/links`,
        hashtags: '#FOMO #FordFofer #EarlyBird #Investment'
    },
    {
        emoji: '🔥',
        title: 'HOT TAKE',
        body: `95% traderov by NEMALO obchodovať.\n\nPrečo?\n\nEmócie. Strach. Chamtivosť. Únava.\n\nAI nepozná ani jedno z týchto slov.\n\n€50 = Lifetime prístup.\n\nfordfofer.vercel.app/links`,
        hashtags: '#UnpopularOpinion #FordFofer #AItrading'
    },
    {
        emoji: '💰',
        title: 'ČO ZÍSKAŠ ZA €50',
        body: `→ AI agenty pracujúce 24/7\n→ Zero ľudská chyba\n→ $1.2B kapacita\n→ Lifetime prístup\n→ Early investor status\n\nČo stratíš ak čakáš?\n€150 (cena stúpne na €200)\n\nfordfofer.vercel.app/links`,
        hashtags: '#Value #FordFofer #ROI #SmartInvestment'
    },
    {
        emoji: '🚀',
        title: 'POSLEDNÉ MIESTA',
        body: `€50 = Lifetime prístup k $1.2B AI trading systému.\n\nČo získaš:\n→ AI agenty pracujúce 24/7\n→ Zero ľudská chyba\n→ Early investor status\n→ Šimon Kohút (Founder) z Likavky, SK\n\nZostáva 10 miest.\n\nfordfofer.vercel.app/links`,
        hashtags: '#FordFofer #AICapital #Investment #Slovakia #Startup'
    },
    {
        emoji: '⚡',
        title: 'MATEMATIKA JE JASNÁ',
        body: `AI pracuje 24/7.\nTy spíš 8 hodín.\n\nKto zarobí viac?\n\n€50 vstup. Lifetime prístup.\n\nfordfofer.vercel.app/links`,
        hashtags: '#AItrading #FordFofer #PassiveIncome #SmartMoney'
    }
];

function generatePost() {
    const template = POST_TEMPLATES[Math.floor(Math.random() * POST_TEMPLATES.length)];
    
    const post = `${template.emoji} ${template.title}\n\n${template.body}\n\n${template.hashtags}`;
    
    return post;
}

function savePost(post) {
    const filePath = path.join(__dirname, 'latest-post.txt');
    const timestamp = new Date().toLocaleString('sk-SK');
    
    const content = `╔═══════════════════════════════════════════════════════════════╗
║  POST VYGENEROVANÝ: ${timestamp}
╚═══════════════════════════════════════════════════════════════╝

${post}

╔═══════════════════════════════════════════════════════════════╗
║  📋 SKOPÍRUJ TEXT VYŠŠIE A POSTNI NA INSTAGRAM!
╚═══════════════════════════════════════════════════════════════╝
`;
    
    fs.writeFileSync(filePath, content, 'utf8');
    
    console.log('\n✅ POST VYGENEROVANÝ!\n');
    console.log('═'.repeat(50));
    console.log(post);
    console.log('═'.repeat(50));
    console.log(`\n💾 Uložené do: ${filePath}`);
    console.log('\n📋 SKOPÍRUJ TEXT VYŠŠIE A POSTNI!\n');
    
    // Otvor súbor
    const { exec } = require('child_process');
    exec(`start notepad "${filePath}"`);
}

// Generuj post
const post = generatePost();
savePost(post);

console.log(`
╔═══════════════════════════════════════════════════════════════╗
║     🤖 AUTO CONTENT GENERATOR                                  ║
║     Post vygenerovaný! Skopíruj a postni!                     ║
╚═══════════════════════════════════════════════════════════════╝
`);


