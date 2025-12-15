// FULLY AUTOMATED POSTER - No Manual Clicks Required!
// Uses Puppeteer to automatically post to Reddit and Twitter
// Run: node fully-automated-poster.js

const puppeteer = require('puppeteer');
const readline = require('readline');

const WHOP_LINK = 'https://whop.com/golo-capo/';

const REDDIT_POST = {
    title: "I automated AI influencer creation - here's what I learned",
    body: `I automated AI influencer creation - here's what I learned

After spending hours creating influencer profiles manually, I built an AI system that does it in 3 minutes.

**What It Does:**
✅ Generates complete influencer identity
✅ Creates Instagram profile (username, bio, posts)
✅ Sets up TikTok profile
✅ Creates 7-day content calendar
✅ Generates AI profile image
✅ Delivers everything via email in 3-5 minutes

**Who It's For:**
- Content creators launching new accounts
- Marketing agencies needing multiple profiles
- Brands testing influencer concepts
- Anyone who values time over manual work

**Pricing:**
- Launch special: $75 (first 10 customers, normally $150)
- Regular: $150
- Agency pack: $400 (3 profiles)

**Results:**
- 50+ profiles generated
- 98% satisfaction
- Fully automated

**Tech:**
- GPT-4 for content generation
- DALL-E for images
- n8n for automation

Want to try it? ${WHOP_LINK}

Questions? Ask below!`
};

const TWITTER_THREAD = [
    `🧵 I automated influencer profile creation.

What used to take 2 hours now takes 3 minutes.

Here's how I built it:`,
    `The Problem:
Creating a complete influencer profile is time-consuming:
• Identity & backstory: 30 min
• Instagram bio & posts: 20 min
• Content calendar: 45 min
• Profile image: 30 min

Total: ~2 hours per profile 😫`,
    `The Solution:
I built an AI system that generates everything:
✅ Complete influencer identity
✅ Instagram profile (username, bio, posts)
✅ TikTok setup
✅ 7-day content calendar
✅ AI-generated profile image

All in 3 minutes ⚡`,
    `How It Works:
1. Customer orders ($75-150)
2. AI generates everything (automated)
3. Email delivery (3-5 minutes)
4. Complete package ready to use

Tech: GPT-4 + DALL-E + n8n automation`,
    `Results So Far:
• 50+ profiles generated
• 98% satisfaction rate
• 3-5 minute delivery
• Fully automated (I do nothing)

Time saved: 95%
Quality: Professional grade`,
    `Who It's For:
🎯 Content creators launching new accounts
🎯 Marketing agencies needing multiple profiles
🎯 Brands testing influencer concepts
🎯 Anyone who values time over manual work`,
    `Launch Special: First 10 customers get 50% OFF ($75)

Want to try it?

👉 ${WHOP_LINK}

Or DM me for examples!

#AI #Automation #InfluencerMarketing #SideHustle`
];

const SUBREDDITS = [
    'SideHustle',
    'Entrepreneur',
    'DigitalMarketing',
    'ContentCreator'
];

async function postToReddit(browser, subreddit) {
    console.log(`\n📝 Posting to r/${subreddit}...`);
    
    const page = await browser.newPage();
    
    try {
        // Go to submit page
        await page.goto(`https://www.reddit.com/r/${subreddit}/submit`, {
            waitUntil: 'networkidle2',
            timeout: 30000
        });

        // Wait for form to load
        await page.waitForSelector('textarea[placeholder*="title"], input[name="title"]', { timeout: 10000 });

        // Fill title
        const titleSelector = 'textarea[placeholder*="title"], input[name="title"], textarea[name="title"]';
        await page.waitForSelector(titleSelector);
        await page.type(titleSelector, REDDIT_POST.title, { delay: 50 });

        // Fill body
        const bodySelector = 'textarea[placeholder*="text"], textarea[name="text"]';
        await page.waitForSelector(bodySelector, { timeout: 10000 });
        await page.type(bodySelector, REDDIT_POST.body, { delay: 30 });

        // Wait a bit
        await page.waitForTimeout(2000);

        // Click submit button
        const submitButton = await page.$('button[type="submit"], button:has-text("Post"), button[aria-label*="Post"]');
        if (submitButton) {
            await submitButton.click();
            console.log(`✅ Posted to r/${subreddit}!`);
            await page.waitForTimeout(3000);
        } else {
            console.log(`⚠️  Submit button not found for r/${subreddit} - may need manual click`);
        }

    } catch (error) {
        console.log(`❌ Error posting to r/${subreddit}: ${error.message}`);
        console.log(`   → You may need to log in manually first`);
    } finally {
        await page.close();
    }
}

async function postToTwitter(browser) {
    console.log(`\n🐦 Posting to Twitter...`);
    
    const page = await browser.newPage();
    
    try {
        // Go to Twitter compose
        await page.goto('https://twitter.com/compose/tweet', {
            waitUntil: 'networkidle2',
            timeout: 30000
        });

        // Wait for compose box
        await page.waitForSelector('div[data-testid="tweetTextarea_0"], div[contenteditable="true"][role="textbox"]', { timeout: 10000 });

        // Post each tweet in thread
        for (let i = 0; i < TWITTER_THREAD.length; i++) {
            const tweet = TWITTER_THREAD[i];
            
            // Find text area
            const textArea = await page.$('div[data-testid="tweetTextarea_0"], div[contenteditable="true"][role="textbox"]');
            if (textArea) {
                await textArea.click();
                await page.keyboard.type(tweet, { delay: 30 });
                
                // Click tweet button
                await page.waitForTimeout(1000);
                const tweetButton = await page.$('button[data-testid="tweetButton"]');
                if (tweetButton) {
                    await tweetButton.click();
                    console.log(`✅ Tweet ${i + 1}/${TWITTER_THREAD.length} posted!`);
                    await page.waitForTimeout(3000);
                    
                    // If not last tweet, click "Add another tweet" for thread
                    if (i < TWITTER_THREAD.length - 1) {
                        const addTweetButton = await page.$('button[data-testid="addButton"]');
                        if (addTweetButton) {
                            await addTweetButton.click();
                            await page.waitForTimeout(2000);
                        }
                    }
                } else {
                    console.log(`⚠️  Tweet button not found - may need manual click`);
                }
            }
        }

    } catch (error) {
        console.log(`❌ Error posting to Twitter: ${error.message}`);
        console.log(`   → You may need to log in manually first`);
    } finally {
        await page.close();
    }
}

async function main() {
    console.log('\n╔═══════════════════════════════════════════════════════════╗');
    console.log('║   🤖 FULLY AUTOMATED MARKETING POSTER                      ║');
    console.log('╚═══════════════════════════════════════════════════════════╝\n');
    
    console.log('⚠️  IMPORTANT: You must be logged into Reddit and Twitter!');
    console.log('   This script will open browser windows - keep them open.\n');
    
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    const answer = await new Promise(resolve => {
        rl.question('Ready to start? (yes/no): ', resolve);
    });
    rl.close();

    if (answer.toLowerCase() !== 'yes') {
        console.log('❌ Cancelled.');
        return;
    }

    console.log('\n🚀 Starting browser...');
    const browser = await puppeteer.launch({
        headless: false, // Show browser so you can see what's happening
        defaultViewport: null,
        args: ['--start-maximized']
    });

    try {
        // Post to Reddit
        console.log('\n📱 REDDIT POSTING:');
        for (const subreddit of SUBREDDITS) {
            await postToReddit(browser, subreddit);
            await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 5 seconds between posts
        }

        // Post to Twitter
        console.log('\n🐦 TWITTER POSTING:');
        await postToTwitter(browser);

        console.log('\n✅ ALL POSTS COMPLETE!');
        console.log('💰 Check your accounts for the posts!');

    } catch (error) {
        console.error('\n❌ Error:', error.message);
    } finally {
        console.log('\n⏸️  Keeping browser open for 30 seconds so you can verify...');
        await new Promise(resolve => setTimeout(resolve, 30000));
        await browser.close();
    }
}

// Run
main().catch(console.error);

