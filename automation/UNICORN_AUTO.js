/**
 * 🦄 FORDFOFER AUTO-MARKETING s UNICORN tajným znakom
 * 
 * Každý post obsahuje 🦄 = automaticky vygenerovaný
 */

const fs = require('fs');
const path = require('path');
const cron = require('node-cron');

const UNICORN = '🦄'; // Tajný znak

const POSTS = [
    {
        emoji: '🦄⏰',
        title: 'POSLEDNÉ HODINY',
        body: `€50 cena platí len DNES.\n\nZajtra: €200\nPozajtra: Dvere zatvorené\n\n10 miest. 24 hodín.\n\nfordfofer.vercel.app/links`,
        hashtags: '#FordFofer #LastChance #Urgency'
    },
    {
        emoji: '🦄📊',
        title: 'UPDATE',
        body: `Prvých 3 investorov už vstúpilo.\n\nPrečo?\n\nLebo vedia že:\n• AI je budúcnosť\n• Skorý vstup = najväčší výnos\n• €50 dnes = €200 zajtra\n\nfordfofer.vercel.app/links`,
        hashtags: '#FOMO #FordFofer #EarlyBird'
    },
    {
        emoji: '🦄🔥',
        title: 'HOT TAKE',
        body: `95% traderov by NEMALO obchodovať.\n\nPrečo?\n\nEmócie. Strach. Chamtivosť.\n\nAI nepozná ani jedno z týchto slov.\n\n€50 = Lifetime prístup.\n\nfordfofer.vercel.app/links`,
        hashtags: '#UnpopularOpinion #FordFofer'
    },
    {
        emoji: '🦄💰',
        title: 'ČO ZÍSKAŠ ZA €50',
        body: `→ AI agenty 24/7\n→ Zero chyba\n→ $1.2B kapacita\n→ Lifetime prístup\n\nČo stratíš ak čakáš?\n€150 (cena stúpne)\n\nfordfofer.vercel.app/links`,
        hashtags: '#Value #FordFofer #ROI'
    },
    {
        emoji: '🦄🚀',
        title: 'POSLEDNÉ MIESTA',
        body: `€50 = Lifetime prístup k $1.2B AI systému.\n\nČo získaš:\n→ AI agenty 24/7\n→ Zero chyba\n→ Early investor status\n\nZostáva 10 miest.\n\nfordfofer.vercel.app/links`,
        hashtags: '#FordFofer #AICapital #Investment'
    }
];

function generatePost() {
    const post = POSTS[Math.floor(Math.random() * POSTS.length)];
    return `${post.emoji} ${post.title}\n\n${post.body}\n\n${post.hashtags}`;
}

function savePost(post) {
    const filePath = path.join(__dirname, 'latest-post.txt');
    const timestamp = new Date().toLocaleString('sk-SK');
    
    const content = `╔═══════════════════════════════════════════════════════════════╗
║  🦄 POST VYGENEROVANÝ: ${timestamp}
╚═══════════════════════════════════════════════════════════════╝

${post}

╔═══════════════════════════════════════════════════════════════╝
║  📋 SKOPÍRUJ A POSTNI!
╚═══════════════════════════════════════════════════════════════╝
`;
    
    fs.writeFileSync(filePath, content, 'utf8');
    
    console.log('\n🦄 POST VYGENEROVANÝ!\n');
    console.log('═'.repeat(50));
    console.log(post);
    console.log('═'.repeat(50));
    console.log(`\n💾 Uložené do: ${filePath}\n`);
    
    // Otvor súbor
    const { exec } = require('child_process');
    exec(`start notepad "${filePath}"`);
}

// Generuj teraz
const post = generatePost();
savePost(post);

// Automaticky každé 2 hodiny
cron.schedule('0 */2 * * *', () => {
    console.log('\n🦄 Auto-generujem nový post...\n');
    const newPost = generatePost();
    savePost(newPost);
});

console.log(`
╔═══════════════════════════════════════════════════════════════╗
║     🦄 UNICORN AUTO-MARKETING                                  ║
║     Post vygenerovaný! Ďalší o 2 hodiny.                      ║
╚═══════════════════════════════════════════════════════════════╝
`);

console.log('🦄 Systém beží! Stlač Ctrl+C pre ukončenie.\n');


