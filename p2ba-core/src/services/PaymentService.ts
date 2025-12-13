/**
 * 💳 PaymentService
 * Unified payment processing - All payments go to Skrill
 * Supports: Cards, Crypto, Bank Transfer, PayPal, Skrill Balance
 */

import axios, { AxiosInstance } from 'axios';
import { NewBusinessLaunch } from '../types/BusinessSchema.js';

export type PaymentMethod = 'card' | 'crypto' | 'bank' | 'paypal' | 'skrill';

export interface PaymentConfig {
  skrillEmail: string;
  skrillMerchantId?: string;
  skrillApiKey?: string;
  amount: number;
  currency: string;
  description: string;
  returnUrl?: string;
  cancelUrl?: string;
}

export interface PaymentResult {
  success: boolean;
  paymentId?: string;
  paymentUrl?: string;
  qrCode?: string;
  instructions?: string;
  error?: string;
}

export class PaymentService {
  private skrillEmail: string;
  private skrillMerchantId?: string;
  private skrillApiKey?: string;
  private useMerchantApi: boolean;

  constructor(config?: {
    skrillEmail?: string;
    skrillMerchantId?: string;
    skrillApiKey?: string;
  }) {
    this.skrillEmail = config?.skrillEmail || process.env.SKRILL_EMAIL || 'gcapovic.biz@proton.me';
    console.log(`[PaymentService] Skrill Email: ${this.skrillEmail}`);
    this.skrillMerchantId = config?.skrillMerchantId || process.env.SKRILL_MERCHANT_ID;
    this.skrillApiKey = config?.skrillApiKey || process.env.SKRILL_API_KEY;
    this.useMerchantApi = !!(this.skrillMerchantId && this.skrillApiKey);

    if (this.useMerchantApi) {
      console.log('[PaymentService] ✅ Initialized with Skrill Merchant API');
    } else {
      console.log('[PaymentService] ✅ Initialized in Hybrid mode (manual confirmation)');
      console.log(`[PaymentService] Skrill Email: ${this.skrillEmail}`);
    }
  }

  /**
   * Create payment - All methods redirect to Skrill
   */
  async createPayment(
    project: NewBusinessLaunch,
    config: PaymentConfig
  ): Promise<PaymentResult> {
    try {
      console.log(`[PaymentService] Creating payment for: ${project.projectName}`);
      console.log(`[PaymentService] Amount: ${config.amount} ${config.currency}`);

      if (this.useMerchantApi) {
        return await this.createMerchantPayment(config);
      } else {
        return await this.createHybridPayment(config);
      }
    } catch (error) {
      console.error('[PaymentService] ❌ Error creating payment:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Create payment via Skrill Merchant API (automatic)
   */
  private async createMerchantPayment(config: PaymentConfig): Promise<PaymentResult> {

    try {
      const response = await axios.post(
        'https://www.moneybookers.com/app/payment.pl',
        {
          pay_to_email: this.skrillEmail,
          amount: config.amount,
          currency: config.currency,
          detail1_description: config.description,
          detail1_text: `Payment for ${config.description}`,
          return_url: config.returnUrl || 'https://fordfofer.vercel.app/payment/success',
          cancel_url: config.cancelUrl || 'https://fordfofer.vercel.app/payment/cancel',
          merchant_id: this.skrillMerchantId,
          api_key: this.skrillApiKey
        },
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      );

      return {
        success: true,
        paymentId: response.data.sid || `skrill-${Date.now()}`,
        paymentUrl: response.data.redirect_url || `https://www.skrill.com/app/payment.pl?sid=${response.data.sid}`
      };
    } catch (error: any) {
      console.warn('[PaymentService] Merchant API failed, falling back to hybrid:', error.message);
      return await this.createHybridPayment(config);
    }
  }

  /**
   * Create hybrid payment (manual confirmation)
   */
  private async createHybridPayment(config: PaymentConfig): Promise<PaymentResult> {
    const paymentId = `payment-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    // Generate payment instructions based on method
    const instructions = this.generatePaymentInstructions(config);

    return {
      success: true,
      paymentId,
      paymentUrl: `https://www.skrill.com/en/send-money/?email=${encodeURIComponent(this.skrillEmail)}&amount=${config.amount}&currency=${config.currency}`,
      instructions,
      qrCode: this.generateQRCode(config)
    };
  }

  /**
   * Generate payment instructions for all methods
   */
  private generatePaymentInstructions(config: PaymentConfig): string {
    return `
💳 PAYMENT INSTRUCTIONS - All methods go to Skrill

📧 SKRILL EMAIL: ${this.skrillEmail}
💰 AMOUNT: ${config.amount} ${config.currency}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💳 PAY WITH CARD:
1. Go to: https://www.skrill.com/en/send-money/
2. Enter email: ${this.skrillEmail}
3. Enter amount: ${config.amount} ${config.currency}
4. Pay with Visa/Mastercard

₿ PAY WITH CRYPTO:
1. Go to: https://www.skrill.com/en/send-money/
2. Enter email: ${this.skrillEmail}
3. Enter amount: ${config.amount} ${config.currency}
4. Select: Crypto (BTC, ETH, USDT)

🏦 PAY WITH BANK TRANSFER:
1. Go to: https://www.skrill.com/en/send-money/
2. Enter email: ${this.skrillEmail}
3. Enter amount: ${config.amount} ${config.currency}
4. Select: Bank Transfer (SEPA)

💵 PAY WITH SKRILL BALANCE:
1. Log in to your Skrill account
2. Send money to: ${this.skrillEmail}
3. Amount: ${config.amount} ${config.currency}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ After payment, send confirmation email to:
${this.skrillEmail}

Subject: Payment Confirmation - ${config.description}
    `.trim();
  }

  /**
   * Generate QR code for mobile payments
   */
  private generateQRCode(config: PaymentConfig): string {
    const qrData = `skrill:${this.skrillEmail}?amount=${config.amount}&currency=${config.currency}`;
    return `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(qrData)}`;
  }

  /**
   * Setup payment processing for a project
   */
  async setupPaymentProcessing(
    project: NewBusinessLaunch
  ): Promise<{
    success: boolean;
    paymentProvider: string;
    accountId: string;
    skrillEmail: string;
    supportedMethods: PaymentMethod[];
  }> {
    console.log(`[PaymentService] Setting up payment processing for: ${project.projectName}`);

    return {
      success: true,
      paymentProvider: 'skrill',
      accountId: `skrill-${project.projectId}`,
      skrillEmail: this.skrillEmail,
      supportedMethods: ['card', 'crypto', 'bank', 'paypal', 'skrill']
    };
  }

  /**
   * Get payment status (if using Merchant API)
   */
  async getPaymentStatus(paymentId: string): Promise<{
    success: boolean;
    status?: 'pending' | 'completed' | 'failed';
    amount?: number;
    currency?: string;
    error?: string;
  }> {
    if (!this.useMerchantApi) {
      return {
        success: false,
        error: 'Merchant API not configured. Manual confirmation required.'
      };
    }

    // In production, this would query Skrill API
    return {
      success: true,
      status: 'pending'
    };
  }
}

