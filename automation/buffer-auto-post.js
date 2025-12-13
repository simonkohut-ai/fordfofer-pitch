/**
 * BUFFER AUTO-POST SCRIPT
 * 
 * Tento script automaticky postuje na Buffer
 * Potrebuješ: Buffer Access Token
 * 
 * Ako získať token:
 * 1. Choď na: https://buffer.com/developers/apps
 * 2. Vytvor novú app
 * 3. Skopíruj Access Token
 */

const BUFFER_ACCESS_TOKEN = 'YOUR_BUFFER_TOKEN_HERE'; // ← Vlož sem svoj token

// Predpripravené posty
const POSTS = [
    {
        text: `🔒 LIMITOVANÝ PRÍSTUP - 24 HODÍN

FordFofer otvára dvere pre 10 early investors.
$1.2 MILIARDY AI kapitálová architektúra.

Vstupný poplatok: €50
Lifetime prístup k AI trading systému.

🔗 fordfofer.vercel.app

#FordFofer #AICapital #Investment`
    },
    {
        text: `💰 AI TRADING SYSTÉM

Zatiaľ čo ty spíš, naše AI agenty zarábajú.

24/7 prevádzka.
Zero ľudská chyba.
$1.2B kapacita.

€50 = Lifetime prístup.

Link v bio.

#AItrading #FordFofer #PassiveIncome`
    },
    {
        text: `⚡ POSLEDNÉ MIESTA

Early investor prístup sa zatvára.

✓ 10 miest
✓ €50 vstup
✓ $1.2B AI systém

Rozhodnutie je na tebe.

fordfofer.vercel.app

#FordFofer #LastChance #Investment`
    },
    {
        text: `🤖 PREČO AI?

Ľudia robia chyby.
AI nie.

Ľudia potrebujú spánok.
AI nie.

Ľudia majú emócie.
AI nie.

Výsledok: $1.2B kapacita.

€50 vstup. Link v bio.

#AIvsHuman #FordFofer #SmartInvesting`
    },
    {
        text: `📈 MATEMATIKA JE JASNÁ

10 investorov × €50 = €500
100 investorov × €50 = €5,000

My máme kapacitu na $1.2 MILIARDY.

Prvých 10 = najnižšia cena navždy.

Si medzi nimi?

#FordFofer #EarlyInvestor #Math`
    }
];

// Funkcia na postovanie
async function postToBuffer(text) {
    const response = await fetch('https://api.bufferapp.com/1/updates/create.json', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            access_token: BUFFER_ACCESS_TOKEN,
            text: text,
            profile_ids: 'YOUR_PROFILE_ID', // Získaš cez Buffer API
            now: 'true' // Postne ihneď
        })
    });
    
    const data = await response.json();
    console.log('Posted:', data);
    return data;
}

// Hlavná funkcia
async function autoPost() {
    console.log('🚀 Starting auto-post...');
    
    for (let i = 0; i < POSTS.length; i++) {
        console.log(`📝 Posting ${i + 1}/${POSTS.length}...`);
        await postToBuffer(POSTS[i].text);
        
        // Počkaj 4 hodiny medzi postami
        if (i < POSTS.length - 1) {
            console.log('⏰ Waiting 4 hours...');
            await new Promise(r => setTimeout(r, 4 * 60 * 60 * 1000));
        }
    }
    
    console.log('✅ All posts completed!');
}

// Spusti
// autoPost();

console.log(`
╔═══════════════════════════════════════════════════════════════╗
║  BUFFER AUTO-POST SCRIPT                                       ║
╠═══════════════════════════════════════════════════════════════╣
║  1. Získaj Buffer Access Token (link vyššie)                   ║
║  2. Vlož token do BUFFER_ACCESS_TOKEN                          ║
║  3. Odkomentuj autoPost() na konci                             ║
║  4. Spusti: node buffer-auto-post.js                           ║
╚═══════════════════════════════════════════════════════════════╝
`);



