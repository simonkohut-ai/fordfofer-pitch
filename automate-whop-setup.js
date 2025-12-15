// 🤖 AUTOMATED WHOP SETUP SCRIPT
// Run this in browser console on whop.com after logging in

(async function() {
    console.log('🚀 Starting automated Whop setup...');
    
    // Wait for page to load
    await new Promise(r => setTimeout(r, 2000));
    
    // Step 1: Navigate to create product
    console.log('📦 Step 1: Creating product...');
    
    // Click create product button
    const createBtn = document.querySelector('button[data-testid="create-product"], a[href*="create"], button:contains("Create Product")');
    if (createBtn) {
        createBtn.click();
        await new Promise(r => setTimeout(r, 2000));
    }
    
    // Fill product form
    const productName = document.querySelector('input[name="name"], input[placeholder*="name" i]');
    if (productName) {
        productName.value = "AI Influencer - Complete Profile";
        productName.dispatchEvent(new Event('input', { bubbles: true }));
    }
    
    const price = document.querySelector('input[name="price"], input[type="number"]');
    if (price) {
        price.value = "150";
        price.dispatchEvent(new Event('input', { bubbles: true }));
    }
    
    const description = document.querySelector('textarea[name="description"], textarea[placeholder*="description" i]');
    if (description) {
        description.value = `🦄 AI INFLUENCER COMPLETE PACKAGE

Get a professional AI influencer profile delivered in 3-5 minutes!

✅ WHAT YOU GET:
• Complete influencer identity (name, age, personality, backstory)
• Professional Instagram profile (username, bio, posts)
• TikTok profile setup (username, bio, content ideas)
• 7-day content calendar with captions & hashtags
• AI-generated profile image (1024x1024 HD)
• First 3 posts ready to publish
• Target audience analysis

⚡ DELIVERY: 3-5 minutes via email
💯 GUARANTEE: 100% satisfaction or money back
🔒 SECURE: Automated, instant delivery

Perfect for content creators, agencies, and brands!`;
        description.dispatchEvent(new Event('input', { bubbles: true }));
    }
    
    // Select Digital Product type
    const digitalOption = Array.from(document.querySelectorAll('input[type="radio"], button')).find(el => 
        el.textContent?.includes('Digital') || el.value === 'digital'
    );
    if (digitalOption) digitalOption.click();
    
    // Save product
    const saveBtn = document.querySelector('button[type="submit"], button:contains("Save"), button:contains("Create")');
    if (saveBtn) {
        saveBtn.click();
        console.log('✅ Product created!');
    }
    
    console.log('🎉 Setup complete! Check the page for any manual steps.');
})();

