/**
 * 🚀 META BUSINESS SUITE AUTO POST
 * 100% automatické postovanie na Instagram cez Meta Graph API
 * 
 * NASTAVENIE:
 * 1. V config.js vlož:
 *    META_ACCESS_TOKEN: 'tvoj_long_lived_token'
 *    INSTAGRAM_BUSINESS_ACCOUNT_ID: 'tvoj_account_id'
 * 
 * 2. Spusti: node META_AUTO_POST.js
 */

const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { OpenAI } = require('openai');
const config = require('./config');

const openai = new OpenAI({
    apiKey: config.OPENAI_API_KEY
});

// Meta Graph API endpoint
const META_API_BASE = 'https://graph.facebook.com/v18.0';

/**
 * Generuje Instagram post pomocou OpenAI
 */
async function generatePost() {
    const prompt = `Si marketingový expert pre FordFofer - $1.2B AI trading systém.

FAKTY:
- Early investor prístup: €50 (lifetime)
- AI agenti pracujú 24/7, zero chyba
- Web: fordfofer.vercel.app
- Platby: Skrill (gcapovic.biz@proton.me)

ÚLOHA: Napíš 1 Instagram post.

ŠTÝL:
- Emoji na začiatku (🦄)
- Max 120 slov
- Brutálne sebavedomý tón
- CTA: "Link v bio"
- 5-6 hashtagov
- Vždy zahrň: 💰 Platba: gcapovic.biz@proton.me

ODPOVEDZ LEN TEXTOM POSTU.`;

    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                { role: 'system', content: 'Si expertný marketingový copywriter pre AI fintech startup.' },
                { role: 'user', content: prompt }
            ],
            max_tokens: 300,
            temperature: 0.9
        });

        return response.choices[0].message.content.trim();
    } catch (error) {
        console.error('❌ Chyba pri generovaní postu:', error.message);
        throw error;
    }
}

/**
 * Postne na Instagram cez Meta Graph API
 */
async function postToInstagram(caption) {
    try {
        // Krok 1: Získaj Instagram Container ID
        const containerResponse = await axios.post(
            `${META_API_BASE}/${config.INSTAGRAM_BUSINESS_ACCOUNT_ID}/media`,
            {
                caption: caption,
                access_token: config.META_ACCESS_TOKEN
            }
        );

        const containerId = containerResponse.data.id;
        console.log('✅ Container vytvorený:', containerId);

        // Krok 2: Publikuj post
        const publishResponse = await axios.post(
            `${META_API_BASE}/${config.INSTAGRAM_BUSINESS_ACCOUNT_ID}/media_publish`,
            {
                creation_id: containerId,
                access_token: config.META_ACCESS_TOKEN
            }
        );

        console.log('✅ Post publikovaný:', publishResponse.data.id);
        return publishResponse.data;
    } catch (error) {
        console.error('❌ Chyba pri postovaní:', error.response?.data || error.message);
        throw error;
    }
}

/**
 * Uloží post do súboru
 */
function savePost(caption, postId) {
    const timestamp = new Date().toISOString().replace(/:/g, '-');
    const filename = `meta-post-${timestamp}.txt`;
    const filepath = path.join(__dirname, 'generated-posts', filename);

    // Vytvor priečinok ak neexistuje
    const dir = path.dirname(filepath);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    const content = `🦄 FORDFOFER AUTO POST
Generated: ${new Date().toLocaleString('sk-SK')}
Post ID: ${postId || 'N/A'}

---
${caption}
---

✅ Automaticky postnuté cez Meta Graph API`;

    fs.writeFileSync(filepath, content, 'utf-8');
    console.log('✅ Post uložený:', filepath);
}

/**
 * Hlavná funkcia
 */
async function main() {
    console.log('🚀 META AUTO POST - Začíname...\n');

    // Kontrola config
    if (!config.META_ACCESS_TOKEN || config.META_ACCESS_TOKEN === 'VLOZ_SEM') {
        console.error('❌ CHYBA: META_ACCESS_TOKEN nie je nastavený v config.js');
        console.log('📋 Postupuj podľa: automation/META_BUSINESS_SETUP.md');
        process.exit(1);
    }

    if (!config.INSTAGRAM_BUSINESS_ACCOUNT_ID || config.INSTAGRAM_BUSINESS_ACCOUNT_ID === 'VLOZ_SEM') {
        console.error('❌ CHYBA: INSTAGRAM_BUSINESS_ACCOUNT_ID nie je nastavený v config.js');
        console.log('📋 Postupuj podľa: automation/META_BUSINESS_SETUP.md');
        process.exit(1);
    }

    try {
        // 1. Generuj post
        console.log('📝 Generujem post...');
        const caption = await generatePost();
        console.log('✅ Post vygenerovaný:\n');
        console.log(caption);
        console.log('\n');

        // 2. Postni na Instagram
        console.log('📤 Postujem na Instagram...');
        const postResult = await postToInstagram(caption);
        const postId = postResult.id;

        // 3. Ulož do súboru
        savePost(caption, postId);

        console.log('\n✅ HOTOVO! Post je online na Instagrame!');
        console.log(`🔗 Post ID: ${postId}`);

    } catch (error) {
        console.error('\n❌ CHYBA:', error.message);
        process.exit(1);
    }
}

// Spusti
if (require.main === module) {
    main();
}

module.exports = { generatePost, postToInstagram };


