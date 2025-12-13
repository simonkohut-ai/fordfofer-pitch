/**
 * 💾 AUTO-SAVE POSTS SYSTEM
 * Generuje a ukladá posty do lokálneho folderu
 * Spustenie: node auto-save-posts.js
 */

const fs = require('fs');
const path = require('path');
const cron = require('node-cron');

const POSTS_FOLDER = path.join(__dirname, '..', 'generated-posts');
const IMAGES_FOLDER = path.join(__dirname, '..', 'generated-posts', 'images');

// Vytvor foldery ak neexistujú
if (!fs.existsSync(POSTS_FOLDER)) fs.mkdirSync(POSTS_FOLDER, { recursive: true });
if (!fs.existsSync(IMAGES_FOLDER)) fs.mkdirSync(IMAGES_FOLDER, { recursive: true });

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
    }
];

function generatePost() {
    const template = POST_TEMPLATES[Math.floor(Math.random() * POST_TEMPLATES.length)];
    return {
        text: `${template.emoji} ${template.title}\n\n${template.body}\n\n${template.hashtags}`,
        emoji: template.emoji,
        title: template.title
    };
}

function savePost(post) {
    const timestamp = new Date();
    const dateStr = timestamp.toISOString().split('T')[0];
    const timeStr = timestamp.toTimeString().split(' ')[0].replace(/:/g, '-');
    
    const filename = `post-${dateStr}-${timeStr}.txt`;
    const filepath = path.join(POSTS_FOLDER, filename);
    
    const content = `╔═══════════════════════════════════════════════════════════════╗
║  🦄 POST VYGENEROVANÝ: ${timestamp.toLocaleString('sk-SK')}
╚═══════════════════════════════════════════════════════════════╝

${post.text}

╔═══════════════════════════════════════════════════════════════╝
║  📋 SKOPÍRUJ TEXT VYŠŠIE A POSTNI NA INSTAGRAM!
║  💾 Súbor: ${filename}
╚═══════════════════════════════════════════════════════════════╝
`;
    
    fs.writeFileSync(filepath, content, 'utf8');
    
    // Vytvor HTML preview
    const htmlFile = filepath.replace('.txt', '.html');
    const htmlContent = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Post Preview</title>
    <style>
        body { font-family: Arial; padding: 2rem; background: #000; color: #fff; }
        .post { background: #111; padding: 2rem; border: 2px solid #FF004D; border-radius: 12px; white-space: pre-wrap; }
    </style>
</head>
<body>
    <div class="post">${post.text.replace(/\n/g, '<br>')}</div>
</body>
</html>`;
    fs.writeFileSync(htmlFile, htmlContent, 'utf8');
    
    console.log(`\n✅ POST ULOŽENÝ: ${filename}`);
    console.log(`📁 Cesta: ${filepath}`);
    console.log(`🌐 Preview: ${htmlFile}\n`);
    
    // Otvor súbor
    const { exec } = require('child_process');
    exec(`start notepad "${filepath}"`);
    
    return { filename, filepath, htmlFile };
}

function generateImageSpec(post) {
    // Vytvor špecifikáciu pre obrázok
    const imageSpec = {
        text: post.title,
        emoji: post.emoji,
        colors: {
            background: '#000000',
            text: '#FFFFFF',
            accent: '#FF004D'
        },
        size: '1080x1080',
        font: 'Space Mono',
        instructions: `Create Instagram post image:
- Background: Black (#000000)
- Main text: "${post.title}" in white, large, bold
- Emoji: ${post.emoji} in Cyber Pink (#FF004D)
- Style: Neobrutalism - thick borders, high contrast
- Size: 1080x1080px`
    };
    
    const specFile = path.join(IMAGES_FOLDER, `image-spec-${Date.now()}.json`);
    fs.writeFileSync(specFile, JSON.stringify(imageSpec, null, 2), 'utf8');
    
    console.log(`📸 Image spec saved: ${specFile}`);
    
    return specFile;
}

// Generuj teraz
console.log(`
╔═══════════════════════════════════════════════════════════════╗
║     💾 AUTO-SAVE POSTS SYSTEM                                 ║
╚═══════════════════════════════════════════════════════════════╝
`);

const post = generatePost();
const saved = savePost(post);
generateImageSpec(post);

console.log(`\n📂 Folders:`);
console.log(`   Posts: ${POSTS_FOLDER}`);
console.log(`   Images: ${IMAGES_FOLDER}`);

// Automaticky každé 2 hodiny
cron.schedule('0 */2 * * *', () => {
    console.log('\n🦄 Auto-generujem nový post...\n');
    const newPost = generatePost();
    savePost(newPost);
    generateImageSpec(newPost);
});

console.log('\n✅ Systém beží! Ďalší post o 2 hodiny.');
console.log('   Stlač Ctrl+C pre ukončenie.\n');


