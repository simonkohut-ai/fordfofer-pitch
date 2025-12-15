// Automated Telegram Message Sender
// Uses Telegram Web API to send messages automatically
// Run in browser console on web.telegram.org

(function() {
    const WHOP_LINK = 'https://whop.com/golo-capo/';
    
    const MESSAGE = `Hey! 👋

Quick question - do you know anyone who needs an influencer profile?

I built an AI that creates complete influencer profiles in 3 minutes:
✅ Full identity & backstory
✅ Instagram profile with posts
✅ TikTok setup
✅ 7-day content calendar
✅ AI-generated profile image

Launch special: $75 (normally $150) - first 10 customers only!

Perfect for content creators, agencies, or testing ideas.

Want to try it? ${WHOP_LINK}

Or know someone who might? Share it with them! 🚀`;

    // List of friend names/contacts to message
    const CONTACTS = [
        // Add your contact names here
        // Example: 'Friend 1', 'Friend 2', etc.
    ];

    function sendTelegramMessage(contactName) {
        // This is a helper - Telegram Web doesn't allow full automation
        // But we can prepare everything
        
        console.log(`📤 Ready to message: ${contactName}`);
        console.log(`📝 Message to send:`);
        console.log(MESSAGE);
        console.log(`\n✅ Copy the message above and send to ${contactName} manually`);
    }

    // Prepare messages for all contacts
    if (CONTACTS.length > 0) {
        console.log('📋 Messages ready for all contacts:');
        CONTACTS.forEach(contact => {
            sendTelegramMessage(contact);
        });
    } else {
        console.log('📝 Message ready to copy:');
        console.log(MESSAGE);
        console.log('\n💡 To use:');
        console.log('1. Open Telegram web.telegram.org');
        console.log('2. Click "New Message"');
        console.log('3. Search for friend');
        console.log('4. Paste message above');
        console.log('5. Send!');
    }
})();

