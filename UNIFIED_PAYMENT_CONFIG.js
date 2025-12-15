// ═══════════════════════════════════════════════════════════════
//  UNIFIED PAYMENT CONFIGURATION
//  All payments route to ONE secure account (Stripe via Whop)
//  Secondary: Skrill (for crypto & international)
//  Anonymous: Golo Čapo
// ═══════════════════════════════════════════════════════════════

const UNIFIED_PAYMENT_CONFIG = {
    
    // ═══ PRIMARY ACCOUNT: STRIPE (VIA WHOP) ⭐ RECOMMENDED ═══
    primary: {
        provider: "stripe",
        via: "whop",
        account_name: "Golo Čapo Studio",
        store_url: "https://whop.com/golo-capo/",
        status: "active",
        priority: 1,
        
        // What goes here:
        accepts: [
            "credit_cards",      // Visa, Mastercard, Amex
            "debit_cards",       // All debit cards
            "apple_pay",         // Apple Pay
            "google_pay",        // Google Pay
            "stripe_link"        // Saved cards
        ],
        
        // Routing rules:
        route_if: {
            payment_type: ["card", "apple_pay", "google_pay"],
            amount: "any",
            country: "any"
        },
        
        // Fees:
        fees: {
            card: "2.9% + $0.30",
            international: "2.9% + $0.30",
            payout: "Free (instant)"
        },
        
        // Security:
        security: {
            pci_compliant: true,
            fraud_protection: true,
            encryption: "bank_level",
            insurance: true
        }
    },
    
    // ═══ SECONDARY ACCOUNT: SKRILL (FOR CRYPTO & INTERNATIONAL) ═══
    secondary: {
        provider: "skrill",
        account_name: "Golo Čapo",
        email: "gcapovic.biz@proton.me",
        status: "active",
        priority: 2,
        
        // What goes here:
        accepts: [
            "crypto",            // BTC, ETH, USDT
            "bank_transfer",     // SEPA, international
            "skrill_wallet",     // Skrill balance
            "cards"              // Backup for cards (lower fees)
        ],
        
        // Routing rules:
        route_if: {
            payment_type: ["crypto", "bank_transfer"],
            amount: ">=$100",  // Large payments (lower fees)
            country: "international"
        },
        
        // Fees:
        fees: {
            card: "1.9% + $0.30",
            crypto: "Free (native)",
            bank_transfer: "Free",
            withdrawal: "1.45% (min $5.50)"
        },
        
        // Security:
        security: {
            pci_compliant: true,
            fraud_protection: true,
            encryption: "high",
            insurance: "limited"
        }
    },
    
    // ═══ PAYMENT ROUTING LOGIC ═══
    routing: {
        // Default: Route to Stripe (primary)
        default: "stripe",
        
        // Exceptions: Route to Skrill
        exceptions: [
            {
                condition: "payment_type === 'crypto'",
                route_to: "skrill"
            },
            {
                condition: "payment_type === 'bank_transfer'",
                route_to: "skrill"
            },
            {
                condition: "amount >= 100 && country !== 'US'",
                route_to: "skrill"  // Lower fees for large international
            }
        ],
        
        // Fallback: If Stripe fails, try Skrill
        fallback: "skrill"
    },
    
    // ═══ OTHER PAYMENT METHODS (ROUTE TO PRIMARY/SECONDARY) ═══
    other_methods: {
        paypal: {
            route_to: "stripe",  // Transfer to Stripe monthly
            note: "Accept via PayPal, transfer to Stripe monthly"
        },
        bitcoin: {
            route_to: "skrill",  // Skrill crypto wallet
            note: "Native crypto support"
        },
        ethereum: {
            route_to: "skrill",
            note: "Native crypto support"
        },
        usdt: {
            route_to: "skrill",
            note: "Native crypto support"
        },
        bank_transfer: {
            route_to: "skrill",
            note: "Lower fees, better for international"
        }
    },
    
    // ═══ CONSOLIDATION STRATEGY ═══
    consolidation: {
        // Transfer from Skrill to Stripe monthly
        auto_transfer: {
            enabled: false,  // Set to true if you want auto-transfer
            from: "skrill",
            to: "stripe",
            frequency: "monthly",
            min_amount: 100  // Only transfer if >$100
        },
        
        // Or keep separate (recommended)
        keep_separate: {
            enabled: true,
            reason: "Different use cases (cards vs crypto)"
        }
    },
    
    // ═══ SUMMARY ═══
    summary: {
        primary_account: "Stripe (via Whop)",
        primary_use: "Cards, most payments, professional",
        secondary_account: "Skrill",
        secondary_use: "Crypto, bank transfers, international",
        all_payments_collect_in: "Stripe (primary) or Skrill (secondary)",
        recommendation: "Use Stripe for most, Skrill for crypto/international"
    }
};

// Export
if (typeof module !== 'undefined') {
    module.exports = UNIFIED_PAYMENT_CONFIG;
}
