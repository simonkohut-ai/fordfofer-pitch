/**
 * 🚀 PROMPT-TO-POST SYSTEM
 * Napíš prompt → Automaticky vygeneruje → Uloží → Otvorí
 * Spustenie: node PROMPT_TO_POST.js
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const POSTS_FOLDER = path.join(__dirname, '..', 'generated-posts');

if (!fs.existsSync(POSTS_FOLDER)) {
    fs.mkdirSync(POSTS_FOLDER, { recursive: true });
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

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
    }
];

function generatePostFromPrompt(prompt) {
    // Jednoduchá logika - ak prompt obsahuje kľúčové slová, použije template
    const lowerPrompt = prompt.toLowerCase();
    
    if (lowerPrompt.includes('urgency') || lowerPrompt.includes('posledné') || lowerPrompt.includes('hodiny')) {
        return POST_TEMPLATES[0];
    } else if (lowerPrompt.includes('update') || lowerPrompt.includes('social proof') || lowerPrompt.includes('investor')) {
        return POST_TEMPLATES[1];
    } else if (lowerPrompt.includes('hot take') || lowerPrompt.includes('controversy') || lowerPrompt.includes('trader')) {
        return POST_TEMPLATES[2];
    } else if (lowerPrompt.includes('value') || lowerPrompt.includes('získaš') || lowerPrompt.includes('€50')) {
        return POST_TEMPLATES[3];
    } else {
        // Default - náhodný template
        return POST_TEMPLATES[Math.floor(Math.random() * POST_TEMPLATES.length)];
    }
}

function savePost(post, prompt) {
    const timestamp = new Date();
    const dateStr = timestamp.toISOString().split('T')[0];
    const timeStr = timestamp.toTimeString().split(' ')[0].replace(/:/g, '-');
    
    const filename = `post-${dateStr}-${timeStr}.txt`;
    const filepath = path.join(POSTS_FOLDER, filename);
    
    const content = `╔═══════════════════════════════════════════════════════════════╗
║  🦄 POST VYGENEROVANÝ: ${timestamp.toLocaleString('sk-SK')}
║  📝 PROMPT: ${prompt}
╚═══════════════════════════════════════════════════════════════╝

${post.text}

╔═══════════════════════════════════════════════════════════════╝
║  📋 SKOPÍRUJ TEXT VYŠŠIE A POSTNI NA INSTAGRAM!
║  💾 Súbor: ${filename}
╚═══════════════════════════════════════════════════════════════╝
`;
    
    fs.writeFileSync(filepath, content, 'utf8');
    
    console.log(`\n✅ POST VYGENEROVANÝ!`);
    console.log(`📁 Súbor: ${filename}`);
    console.log(`\n${post.text}\n`);
    
    // Otvor súbor
    const { exec } = require('child_process');
    exec(`start notepad "${filepath}"`);
    
    return filepath;
}

function askPrompt() {
    rl.question('\n🦄 NAPÍŠ PROMPT (alebo "exit" pre ukončenie): ', (prompt) => {
        if (prompt.toLowerCase() === 'exit') {
            console.log('\n✅ Ukončujem...\n');
            rl.close();
            return;
        }
        
        if (!prompt.trim()) {
            console.log('⚠️ Zadaný prázdny prompt. Skús znova.\n');
            askPrompt();
            return;
        }
        
        console.log('\n🤖 Generujem post...\n');
        
        const postTemplate = generatePostFromPrompt(prompt);
        const post = {
            text: `${postTemplate.emoji} ${postTemplate.title}\n\n${postTemplate.body}\n\n${postTemplate.hashtags}`
        };
        
        savePost(post, prompt);
        
        // Auto-commit
        const { exec } = require('child_process');
        exec(`cd "${__dirname}/.." && git add -A && git commit -m "Auto-generated post from prompt"`, () => {});
        
        // Ďalší prompt
        setTimeout(() => {
            askPrompt();
        }, 2000);
    });
}

console.log(`
╔═══════════════════════════════════════════════════════════════╗
║     🦄 PROMPT-TO-POST SYSTEM                                   ║
║     Napíš prompt → Automaticky vygeneruje → Uloží → Otvorí    ║
╚═══════════════════════════════════════════════════════════════╝
`);

askPrompt();


