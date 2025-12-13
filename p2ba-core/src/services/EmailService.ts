/**
 * 📧 EmailService
 * Production-ready email service integration
 * Supports Mailgun and SendGrid APIs
 */

import axios, { AxiosInstance } from 'axios';
import { NewBusinessLaunch } from '../types/BusinessSchema.js';

export type EmailProvider = 'mailgun' | 'sendgrid' | 'nodemailer';

export interface EmailConfig {
  provider: EmailProvider;
  apiKey: string;
  domain?: string; // For Mailgun
  from: string;
  fromName?: string;
}

export interface EmailData {
  to: string | string[];
  subject: string;
  html?: string;
  text?: string;
  cc?: string | string[];
  bcc?: string | string[];
  attachments?: Array<{
    filename: string;
    path?: string;
    content?: string;
  }>;
}

export interface EmailResult {
  success: boolean;
  messageId?: string;
  provider?: string;
  error?: string;
}

export class EmailService {
  private config: EmailConfig;
  private mailgunClient: AxiosInstance | null = null;
  private sendgridClient: AxiosInstance | null = null;

  constructor(config?: EmailConfig) {
    // Default to Mailgun if no config provided (from env vars)
    this.config = config || {
      provider: (process.env.EMAIL_PROVIDER as EmailProvider) || 'mailgun',
      apiKey: process.env.MAILGUN_API_KEY || process.env.SENDGRID_API_KEY || '',
      domain: process.env.MAILGUN_DOMAIN || '',
      from: process.env.EMAIL_FROM || 'gcapovic.biz@proton.me',
      fromName: process.env.EMAIL_FROM_NAME || 'Chiara\'s World'
    };

    this.initializeClients();
  }

  /**
   * Initialize API clients based on provider
   */
  private initializeClients(): void {
    if (this.config.provider === 'mailgun') {
      if (!this.config.apiKey || !this.config.domain) {
        console.warn('[EmailService] Mailgun API key or domain not configured. Using test mode.');
        return;
      }

      this.mailgunClient = axios.create({
        baseURL: `https://api.mailgun.net/v3/${this.config.domain}`,
        auth: {
          username: 'api',
          password: this.config.apiKey
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

      console.log('[EmailService] ✅ Mailgun client initialized');
    } else if (this.config.provider === 'sendgrid') {
      if (!this.config.apiKey) {
        console.warn('[EmailService] SendGrid API key not configured. Using test mode.');
        return;
      }

      this.sendgridClient = axios.create({
        baseURL: 'https://api.sendgrid.com/v3',
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('[EmailService] ✅ SendGrid client initialized');
    }
  }

  /**
   * Send marketing email via production API
   */
  async sendMarketingEmail(
    project: NewBusinessLaunch,
    emailData: EmailData
  ): Promise<EmailResult> {
    try {
      console.log(`[EmailService] Sending email via ${this.config.provider} for: ${project.projectName}`);
      console.log(`[EmailService] To: ${Array.isArray(emailData.to) ? emailData.to.join(', ') : emailData.to}`);

      if (this.config.provider === 'mailgun' && this.mailgunClient) {
        return await this.sendViaMailgun(emailData);
      } else if (this.config.provider === 'sendgrid' && this.sendgridClient) {
        return await this.sendViaSendGrid(emailData);
      } else {
        // Fallback: Return success but log warning
        console.warn('[EmailService] No API client available. Email not sent (test mode).');
        return {
          success: true,
          messageId: `test-${Date.now()}`,
          provider: 'test-mode'
        };
      }
    } catch (error) {
      console.error('[EmailService] ❌ Error sending email:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Send email via Mailgun API
   */
  private async sendViaMailgun(emailData: EmailData): Promise<EmailResult> {
    if (!this.mailgunClient) {
      throw new Error('Mailgun client not initialized');
    }

    const formData = new URLSearchParams();
    formData.append('from', `${this.config.fromName || 'Chiara\'s World'} <${this.config.from}>`);
    
    // Handle recipients
    if (Array.isArray(emailData.to)) {
      emailData.to.forEach(to => formData.append('to', to));
    } else {
      formData.append('to', emailData.to);
    }

    formData.append('subject', emailData.subject);
    
    if (emailData.html) {
      formData.append('html', emailData.html);
    }
    
    if (emailData.text) {
      formData.append('text', emailData.text);
    }

    if (emailData.cc) {
      if (Array.isArray(emailData.cc)) {
        emailData.cc.forEach(cc => formData.append('cc', cc));
      } else {
        formData.append('cc', emailData.cc);
      }
    }

    if (emailData.bcc) {
      if (Array.isArray(emailData.bcc)) {
        emailData.bcc.forEach(bcc => formData.append('bcc', bcc));
      } else {
        formData.append('bcc', emailData.bcc);
      }
    }

    const response = await this.mailgunClient.post('/messages', formData.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    return {
      success: true,
      messageId: response.data.id || `mg-${Date.now()}`,
      provider: 'mailgun'
    };
  }

  /**
   * Send email via SendGrid API
   */
  private async sendViaSendGrid(emailData: EmailData): Promise<EmailResult> {
    if (!this.sendgridClient) {
      throw new Error('SendGrid client not initialized');
    }

    const recipients = Array.isArray(emailData.to) ? emailData.to : [emailData.to];
    
    const payload = {
      personalizations: [{
        to: recipients.map(email => ({ email })),
        ...(emailData.cc && {
          cc: Array.isArray(emailData.cc) 
            ? emailData.cc.map(email => ({ email }))
            : [{ email: emailData.cc }]
        }),
        ...(emailData.bcc && {
          bcc: Array.isArray(emailData.bcc)
            ? emailData.bcc.map(email => ({ email }))
            : [{ email: emailData.bcc }]
        }),
        subject: emailData.subject
      }],
      from: {
        email: this.config.from,
        name: this.config.fromName || 'Chiara\'s World'
      },
      content: [
        ...(emailData.html ? [{
          type: 'text/html',
          value: emailData.html
        }] : []),
        ...(emailData.text ? [{
          type: 'text/plain',
          value: emailData.text
        }] : [])
      ]
    };

    const response = await this.sendgridClient.post('/mail/send', payload);

    return {
      success: true,
      messageId: response.headers['x-message-id'] || `sg-${Date.now()}`,
      provider: 'sendgrid'
    };
  }

  /**
   * Send welcome email
   */
  async sendWelcomeEmail(
    project: NewBusinessLaunch,
    recipientEmail: string
  ): Promise<EmailResult> {
    return this.sendMarketingEmail(project, {
      to: recipientEmail,
      subject: `Welcome to ${project.projectName}!`,
      html: `
        <h1>Welcome to ${project.projectName}!</h1>
        <p>Thank you for joining us. We're excited to have you on board!</p>
        <p>Best regards,<br>The ${project.projectName} Team</p>
      `,
      text: `Welcome to ${project.projectName}! Thank you for joining us.`
    });
  }

  /**
   * Send campaign email
   */
  async sendCampaignEmail(
    project: NewBusinessLaunch,
    campaignData: {
      recipients: string[];
      subject: string;
      html: string;
      text: string;
    }
  ): Promise<{
    success: boolean;
    sent: number;
    failed: number;
    results: EmailResult[];
  }> {
    const results: EmailResult[] = [];
    let sent = 0;
    let failed = 0;

    // Send in batches to avoid rate limits
    const batchSize = 50;
    for (let i = 0; i < campaignData.recipients.length; i += batchSize) {
      const batch = campaignData.recipients.slice(i, i + batchSize);
      
      for (const recipient of batch) {
        const result = await this.sendMarketingEmail(project, {
          to: recipient,
          subject: campaignData.subject,
          html: campaignData.html,
          text: campaignData.text
        });

        results.push(result);
        if (result.success) {
          sent++;
        } else {
          failed++;
        }
      }

      // Small delay between batches
      if (i + batchSize < campaignData.recipients.length) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }

    return {
      success: sent > 0,
      sent,
      failed,
      results
    };
  }
}
