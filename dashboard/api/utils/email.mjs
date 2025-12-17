// Email sending utilities
// Uses Resend API for transactional emails

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const RESEND_FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'Golo Čapo <noreply@golocapo.com>';

// Email templates
const templates = {
  'prelaunch-confirmation': (data) => ({
    subject: 'You\'re in. 21.12.',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: rgba(255, 255, 255, 0.92); background: #0B0B12; }
          .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; background: #0B0B12; }
          .header { text-align: center; margin-bottom: 40px; }
          .logo { font-size: 48px; margin-bottom: 16px; }
          h1 { font-size: 28px; font-weight: 700; color: rgba(255, 255, 255, 0.92); margin-bottom: 16px; }
          p { font-size: 18px; color: rgba(255, 255, 255, 0.70); margin-bottom: 16px; text-align: center; }
          .footer { margin-top: 40px; padding-top: 32px; border-top: 1px solid rgba(255, 255, 255, 0.12); text-align: center; font-size: 13px; color: rgba(255, 255, 255, 0.50); }
          a { color: #C080B0; text-decoration: none; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">⚡</div>
            <h1>You're In</h1>
          </div>
          <p>21.12.</p>
          <p style="margin-top: 32px; font-size: 14px; color: #64748b;">No selling. Just confirmation.</p>
          <div class="footer">
            <p>Golo Čapo</p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `You're in. 21.12.`,
  }),
  
  'launch-day': (data) => ({
    subject: 'Access is live',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #0f172a; background: #0f172a; }
          .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; background: #0f172a; }
          .header { text-align: center; margin-bottom: 40px; }
          .logo { font-size: 48px; margin-bottom: 16px; }
          h1 { font-size: 28px; font-weight: 700; color: #f1f5f9; margin-bottom: 16px; }
          p { font-size: 16px; color: #94a3b8; margin-bottom: 16px; }
          .cta { text-align: center; margin: 32px 0; }
          .btn { display: inline-block; padding: 14px 32px; background: #667eea; color: white; text-decoration: none; border-radius: 8px; font-weight: 600; }
          .footer { margin-top: 40px; padding-top: 32px; border-top: 1px solid #334155; text-align: center; font-size: 13px; color: #64748b; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">⚡</div>
            <h1>Access is Live</h1>
          </div>
          <p>AI Marketing Studio is now available.</p>
          <div class="cta">
            <a href="https://golocapo.com/pricing" class="btn">Get Access</a>
          </div>
          <div class="footer">
            <p>Golo Čapo</p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `Access is live. Get access at https://golocapo.com/pricing`,
  }),
  
  'payment-confirmation': (data) => ({
    subject: 'Welcome to AI Marketing Studio',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: rgba(255, 255, 255, 0.92); background: #0B0B12; }
          .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; background: #0B0B12; }
          .header { text-align: center; margin-bottom: 40px; }
          .logo { font-size: 48px; margin-bottom: 16px; }
          h1 { font-size: 28px; font-weight: 700; color: rgba(255, 255, 255, 0.92); margin-bottom: 16px; }
          p { font-size: 16px; color: rgba(255, 255, 255, 0.70); margin-bottom: 16px; }
          .cta { text-align: center; margin: 32px 0; }
          .btn { display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #C080B0, #A070B0); color: white; text-decoration: none; border-radius: 12px; font-weight: 600; box-shadow: 0 4px 16px rgba(192, 128, 176, 0.3); }
          .footer { margin-top: 40px; padding-top: 32px; border-top: 1px solid rgba(255, 255, 255, 0.12); text-align: center; font-size: 13px; color: rgba(255, 255, 255, 0.50); }
          a { color: #C080B0; text-decoration: none; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">⚡</div>
            <h1>Welcome</h1>
          </div>
          <p>Your payment was successful. You now have early access.</p>
          <div class="cta">
            <a href="https://golocapo.com/dashboard" class="btn">Go to Dashboard</a>
          </div>
          <div class="footer">
            <p>Golo Čapo</p>
            <p>Questions? Reply to this email.</p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `Welcome! Your payment was successful. Log in at https://golocapo.com/dashboard`,
  }),
  
  'client-confirmation': (data) => ({
    subject: 'Ďakujeme za správu',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: rgba(255, 255, 255, 0.92); background: #0B0B12; }
          .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; background: #0B0B12; }
          .header { text-align: center; margin-bottom: 40px; }
          h1 { font-size: 28px; font-weight: 700; color: rgba(255, 255, 255, 0.92); margin-bottom: 16px; }
          p { font-size: 16px; color: rgba(255, 255, 255, 0.70); margin-bottom: 16px; }
          .footer { margin-top: 40px; padding-top: 32px; border-top: 1px solid rgba(255, 255, 255, 0.12); text-align: center; font-size: 13px; color: rgba(255, 255, 255, 0.50); }
          a { color: #C080B0; text-decoration: none; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Ďakujeme za správu</h1>
          </div>
          <p>Vážený/á ${data.name || 'klient'},</p>
          <p>Ďakujeme za váš záujem. Vaša správa bola prijatá a čoskoro vás budeme kontaktovať.</p>
          <div class="footer">
            <p>${data.brand === 'mikork' ? 'MikoRK' : 'Komfortreality'}</p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `Ďakujeme za správu. Čoskoro vás budeme kontaktovať.`,
  }),
  
  'lead-notification': (data) => ({
    subject: `New Prelaunch Lead: ${data.email}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: rgba(255, 255, 255, 0.92); background: #0B0B12; }
          .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; background: #0B0B12; }
          h1 { font-size: 24px; font-weight: 700; color: rgba(255, 255, 255, 0.92); margin-bottom: 16px; }
          p { font-size: 16px; color: rgba(255, 255, 255, 0.70); margin-bottom: 12px; }
          .info { background: rgba(255, 255, 255, 0.06); border: 1px solid rgba(255, 255, 255, 0.12); padding: 16px; border-radius: 12px; margin: 16px 0; }
          .info strong { color: rgba(255, 255, 255, 0.92); }
          a { color: #C080B0; text-decoration: none; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>New Prelaunch Lead</h1>
          <div class="info">
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Source:</strong> ${data.source || 'prelaunch'}</p>
            <p><strong>Lead ID:</strong> ${data.leadId || 'N/A'}</p>
          </div>
          <p>Reply to their confirmation email to start a conversation.</p>
        </div>
      </body>
      </html>
    `,
    text: `New Prelaunch Lead: ${data.email}\nSource: ${data.source || 'prelaunch'}\nLead ID: ${data.leadId || 'N/A'}`,
  }),
};

// Send email via Resend
export async function sendEmail({ to, subject, template, data = {} }) {
  if (!RESEND_API_KEY) {
    console.warn('RESEND_API_KEY not configured. Email not sent.');
    return { success: false, error: 'Email service not configured' };
  }
  
  const templateFn = templates[template];
  if (!templateFn) {
    console.error(`Email template "${template}" not found`);
    return { success: false, error: 'Template not found' };
  }
  
  const emailContent = templateFn(data);
  
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: RESEND_FROM_EMAIL,
        to: [to],
        subject: subject || emailContent.subject,
        html: emailContent.html,
        text: emailContent.text,
      }),
    });
    
    const result = await response.json();
    
    if (!response.ok) {
      console.error('Resend API error:', result);
      return { success: false, error: result.message || 'Email send failed' };
    }
    
    console.log('Email sent successfully:', { to: to.split('@')[0] + '@***', template });
    return { success: true, id: result.id };
    
  } catch (error) {
    console.error('Email send error:', error.message);
    return { success: false, error: error.message };
  }
}
