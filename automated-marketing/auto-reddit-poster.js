// Automated Reddit Posting Script
// Run this in browser console on Reddit submit page

(function() {
    const WHOP_LINK = 'https://whop.com/golo-capo/';
    
    const REDDIT_POST = `I automated AI influencer creation - here's what I learned

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

Questions? Ask below!`;

    // Auto-fill Reddit post form
    function fillRedditPost() {
        // Wait for page to load
        setTimeout(() => {
            // Find title field
            const titleField = document.querySelector('textarea[placeholder*="title"], input[name="title"], textarea[name="title"]');
            if (titleField) {
                titleField.value = "I automated AI influencer creation - here's what I learned";
                titleField.dispatchEvent(new Event('input', { bubbles: true }));
                console.log('✅ Title filled');
            }

            // Find post body field
            const bodyField = document.querySelector('textarea[placeholder*="text"], textarea[name="text"], .public-DraftEditor-content');
            if (bodyField) {
                if (bodyField.tagName === 'TEXTAREA') {
                    bodyField.value = REDDIT_POST;
                    bodyField.dispatchEvent(new Event('input', { bubbles: true }));
                } else {
                    // For Draft.js editors
                    bodyField.focus();
                    document.execCommand('insertText', false, REDDIT_POST);
                }
                console.log('✅ Post body filled');
            }

            console.log('✅ Reddit post ready! Just click Submit!');
        }, 2000);
    }

    fillRedditPost();
})();

