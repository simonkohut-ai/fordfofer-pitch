// ═══════════════════════════════════════════════════════════════
//  PAYMENT CONFIGURATION - ALL PAYMENT METHODS
//  Anonymous: Golo Čapo
// ═══════════════════════════════════════════════════════════════

const PAYMENT_CONFIG = {
    
    // ═══ IDENTITY (ANONYMOUS) ═══
    pseudonym: "Golo Čapo",
    business_name: "Golo Čapo Studio",
    email: "gcapovic.biz@proton.me", // Anonymous ProtonMail
    
    // ═══ PAYMENT METHODS ═══
    
    // 1. SKRILL (✅ Configured)
    skrill: {
        email: "gcapovic.biz@proton.me",
        link: "https://www.skrill.com/en/send-money/",
        status: "active"
    },
    
    // 2. PAYPAL (⚠️ Need to verify)
    paypal: {
        me: "gcapovic", // paypal.me/gcapovic
        email: "gcapovic.biz@proton.me",
        link: "https://paypal.me/gcapovic",
        status: "active"
    },
    
    // 3. CRYPTO - BITCOIN (❌ Need address)
    bitcoin: {
        address: "YOUR_BTC_WALLET_ADDRESS", // ⚠️ FILL THIS
        network: "BTC",
        qr_code: true,
        status: "pending"
    },
    
    // 4. CRYPTO - ETHEREUM (❌ Need address)
    ethereum: {
        address: "YOUR_ETH_WALLET_ADDRESS", // ⚠️ FILL THIS
        network: "ETH",
        qr_code: true,
        status: "pending"
    },
    
    // 5. CRYPTO - USDT (TETHER) (❌ Need address)
    usdt: {
        address: "YOUR_USDT_WALLET_ADDRESS", // ⚠️ FILL THIS
        network: "USDT",
        chain: "TRC20", // or ERC20
        qr_code: true,
        status: "pending"
    },
    
    // 6. BANK TRANSFER / SEPA (❌ Need IBAN)
    bank_transfer: {
        iban: "YOUR_IBAN_HERE", // ⚠️ FILL THIS
        swift: "YOUR_SWIFT_CODE", // ⚠️ FILL THIS (optional)
        bank_name: "YOUR_BANK_NAME", // ⚠️ FILL THIS
        account_name: "Golo Čapo", // Anonymous name
        status: "pending"
    },
    
    // 7. WISE (FORMERLY TRANSFERWISE) (❌ Need details)
    wise: {
        email: "gcapovic.biz@proton.me",
        link: "https://wise.com/",
        status: "pending"
    },
    
    // 8. REVOLUT (❌ Need payment link)
    revolut: {
        link: "YOUR_REVOLUT_PAYMENT_LINK", // ⚠️ FILL THIS
        username: "golocapo", // Suggested
        status: "pending"
    },
    
    // 9. CASH APP (❌ Need $tag)
    cashapp: {
        tag: "YOUR_CASHAPP_TAG", // $golocapo (example) ⚠️ FILL THIS
        link: "https://cash.app/$YOUR_TAG", // ⚠️ FILL THIS
        status: "pending"
    },
    
    // 10. VENMO (❌ Need username - US only)
    venmo: {
        username: "YOUR_VENMO_USERNAME", // ⚠️ FILL THIS
        link: "https://venmo.com/YOUR_USERNAME", // ⚠️ FILL THIS
        status: "pending",
        note: "US only"
    },
    
    // 11. CRYPTO.COM PAY (❌ Need merchant ID)
    cryptocom: {
        merchant_id: "YOUR_MERCHANT_ID", // ⚠️ FILL THIS
        link: "https://crypto.com/pay",
        status: "pending"
    },
    
    // 12. STRIPE (Via Whop - ✅ Configured)
    stripe: {
        via: "whop",
        whop_store: "https://whop.com/golo-capo/",
        status: "active"
    },
    
    // 13. WHOP STORE (✅ Configured)
    whop: {
        store_url: "https://whop.com/golo-capo/",
        api_key: "REMOVED_WHOP_KEY",
        status: "active"
    }
};

// Export
if (typeof module !== 'undefined') {
    module.exports = PAYMENT_CONFIG;
}
