#!/usr/bin/env node
/**
 * MikoRK pohrebníctvo - Content Generator
 * 
 * Generates respectful, educational content for local marketing.
 * All content requires manual approval before publishing.
 * 
 * Usage:
 *   node scripts/mikork_content_generator.mjs --type post --topic "Dušičky"
 *   node scripts/mikork_content_generator.mjs --type article --topic "Organizácia pohrebu"
 */

import OpenAI from 'openai';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_MODEL = process.env.OPENAI_MODEL || 'gpt-4o-mini';
const OPENAI_TEMPERATURE = parseFloat(process.env.OPENAI_TEMPERATURE || '0.7');

if (!OPENAI_API_KEY) {
  console.error('❌ Error: OPENAI_API_KEY environment variable not set');
  process.exit(1);
}

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

/**
 * Content generation prompts
 */
const PROMPTS = {
  post: `Generujte krátky, rešpektujúci príspevok pre Google Business Profile alebo Facebook pre pohrebníctvo.

Požiadavky:
- Dôstojný, profesionálny tón
- Žiadna agresívna marketingová reč
- Žiadne "kúpte teraz" alebo "obmedzená ponuka"
- Informačný alebo vzdelávací charakter
- Maximálne 150 slov
- V slovenčine
- Rešpektujúci a súcitný prístup

Téma: {topic}

Príspevok:`,

  article: `Napíšte vzdelávací článok pre blog pohrebníctva.

Požiadavky:
- Dôstojný, profesionálny tón
- Vzdelávací charakter (nie predajný)
- Pomocný a informačný obsah
- 300-500 slov
- V slovenčine
- Rešpektujúci a súcitný prístup
- Struktúrovaný (nadpisy, odseky)

Téma: {topic}

Článok:`,

  reminder: `Generujte rešpektujúci príspevok na pripomienku významného dňa (napr. Dušičky, pamätné dni).

Požiadavky:
- Dôstojný, súcitný tón
- Rešpektujúci význam dňa
- Žiadna predajná reč
- Maximálne 100 slov
- V slovenčine
- Empatický prístup

Téma: {topic}

Príspevok:`,
};

/**
 * Generate content using OpenAI
 */
async function generateContent(type, topic) {
  if (!PROMPTS[type]) {
    throw new Error(`Unknown content type: ${type}. Available types: ${Object.keys(PROMPTS).join(', ')}`);
  }

  const prompt = PROMPTS[type].replace('{topic}', topic);

  console.log(`📝 Generating ${type} content...`);
  console.log(`📌 Topic: ${topic}`);
  console.log('');

  try {
    const response = await openai.chat.completions.create({
      model: OPENAI_MODEL,
      messages: [
        {
          role: 'system',
          content: 'Ste profesionálny copywriter pre pohrebné služby. Píšete dôstojným, rešpektujúcim tónom. Nikdy nepoužívate agresívnu marketingovú reč, "kúpte teraz", "obmedzená ponuka" alebo podobné predajné taktiky. Váš obsah je informačný, vzdelávací a súcitný.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: OPENAI_TEMPERATURE,
      max_tokens: type === 'article' ? 1000 : 300,
    });

    const content = response.choices[0].message.content.trim();

    // Log prompt and response
    const logEntry = {
      timestamp: new Date().toISOString(),
      type,
      topic,
      prompt,
      content,
      model: OPENAI_MODEL,
      temperature: OPENAI_TEMPERATURE,
    };

    // Save to log file
    const logDir = path.join(__dirname, '../logs/mikork');
    await fs.mkdir(logDir, { recursive: true });
    const logFile = path.join(logDir, `content-${Date.now()}.json`);
    await fs.writeFile(logFile, JSON.stringify(logEntry, null, 2));

    return {
      success: true,
      content,
      logFile,
    };
  } catch (error) {
    console.error('❌ Error generating content:', error.message);
    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * Save content to file
 */
async function saveContent(type, topic, content) {
  const outputDir = path.join(__dirname, '../content/mikork');
  await fs.mkdir(outputDir, { recursive: true });

  const timestamp = new Date().toISOString().split('T')[0];
  const filename = `${type}-${topic.toLowerCase().replace(/\s+/g, '-')}-${timestamp}.txt`;
  const filepath = path.join(outputDir, filename);

  await fs.writeFile(filepath, content, 'utf-8');

  return filepath;
}

/**
 * Main function
 */
async function main() {
  const args = process.argv.slice(2);
  const typeIndex = args.indexOf('--type');
  const topicIndex = args.indexOf('--topic');

  if (typeIndex === -1 || topicIndex === -1) {
    console.error('Usage: node scripts/mikork_content_generator.mjs --type <post|article|reminder> --topic "<topic>"');
    process.exit(1);
  }

  const type = args[typeIndex + 1];
  const topic = args[topicIndex + 1];

  if (!type || !topic) {
    console.error('Error: --type and --topic are required');
    process.exit(1);
  }

  console.log('🎯 MikoRK pohrebníctvo - Content Generator');
  console.log('==========================================');
  console.log('');

  const result = await generateContent(type, topic);

  if (!result.success) {
    console.error('❌ Failed to generate content');
    process.exit(1);
  }

  console.log('✅ Content generated successfully');
  console.log('');
  console.log('📄 Content:');
  console.log('─'.repeat(50));
  console.log(result.content);
  console.log('─'.repeat(50));
  console.log('');

  // Save to file
  const filepath = await saveContent(type, topic, result.content);
  console.log(`💾 Saved to: ${filepath}`);
  console.log('');

  // Log file location
  console.log(`📋 Log saved to: ${result.logFile}`);
  console.log('');

  console.log('⚠️  IMPORTANT: Review content before publishing!');
  console.log('   All content requires manual approval.');
  console.log('');

  return result;
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((error) => {
    console.error('❌ Fatal error:', error);
    process.exit(1);
  });
}

export { generateContent, saveContent };

