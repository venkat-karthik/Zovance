const functions = require('firebase-functions');
const nodemailer = require('nodemailer');

// Configure your email service
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'zovance6@gmail.com',
    pass: process.env.EMAIL_PASSWORD || 'jxmh ycna qlln mctt',
  },
});

exports.sendContactNotification = functions.https.onRequest(async (req, res) => {
  // Enable CORS
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(204).send('');
    return;
  }

  try {
    const { adminEmail, contactData } = req.body;

    if (!adminEmail || !contactData) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Email to admin
    const adminMailOptions = {
      from: process.env.EMAIL_USER || '"Zovance AI Hub" <zovance6@gmail.com>',
      to: adminEmail,
      subject: `New Contact Inquiry from ${contactData.name} - Zovance`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #111;">
          <h2 style="color: #c9a84c; border-bottom: 2px solid #c9a84c; padding-bottom: 10px;">New Contact Inquiry Received</h2>
          
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 8px 0;"><strong>Name:</strong> ${contactData.name}</p>
            <p style="margin: 8px 0;"><strong>Email:</strong> <a href="mailto:${contactData.email}">${contactData.email}</a></p>
            <p style="margin: 8px 0;"><strong>Phone:</strong> ${contactData.phone ? `<a href="tel:${contactData.phone}">${contactData.phone}</a>` : 'Not provided'}</p>
            <p style="margin: 8px 0;"><strong>Service Interested In:</strong> ${contactData.service || 'General Inquiry'}</p>
          </div>

          <div style="background: #f9f9f9; padding: 18px; border-left: 4px solid #3b82f6; margin: 20px 0; border-radius: 4px;">
            <p style="margin: 0 0 10px 0; color: #555;"><strong>Message / Project Description:</strong></p>
            <p style="margin: 0; white-space: pre-wrap; line-height: 1.6;">${contactData.message}</p>
          </div>

          <div style="text-align: center; margin: 30px 0;">
            <a href="mailto:${contactData.email}?subject=Re: Your inquiry with Zovance AI Hub" style="background: #3b82f6; color: #ffffff; padding: 12px 24px; border-radius: 8px; font-weight: bold; text-decoration: none; display: inline-block; font-size: 14px;">
              ✉️ Reply Directly to Client
            </a>
          </div>

          <p style="color: #666; font-size: 12px; margin-top: 30px; border-top: 1px solid #ddd; padding-top: 15px;">
            This is an automated notification from Zovance AI Hub. Log in to your Admin CRM Panel to manage all inquiries and statuses.
          </p>
        </div>
      `,
    };

    // Email to client (Auto-confirmation)
    const clientMailOptions = {
      from: process.env.EMAIL_USER || '"Zovance AI Hub" <zovance6@gmail.com>',
      to: contactData.email,
      subject: 'We received your inquiry! - Zovance AI Hub',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #111;">
          <h2 style="color: #c9a84c; border-bottom: 2px solid #c9a84c; padding-bottom: 10px;">Inquiry Received!</h2>
          
          <p>Hi ${contactData.name},</p>
          
          <p>Thank you for reaching out to <strong>Zovance AI Hub</strong>. We've received your project inquiry and one of our AI Engineering & Architecture leads will review it and get back to you within 2 hours (Mon–Sat, 9AM–8PM IST).</p>
          
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0 0 10px 0; color: #555;"><strong>Your Submitted Summary:</strong></p>
            <p style="margin: 4px 0;"><strong>Service:</strong> ${contactData.service || 'General Inquiry'}</p>
            <p style="margin: 4px 0;"><strong>Message:</strong> ${contactData.message}</p>
          </div>

          <div style="background: #f0fdf4; border: 1px solid #bbf7d0; padding: 16px; border-radius: 8px; margin: 24px 0;">
            <p style="margin: 0; color: #166534; font-size: 14px;">
              <strong>Need to discuss right away?</strong><br/>
              Feel free to connect with our team directly on WhatsApp or book a consultation call:
            </p>
            <div style="margin-top: 14px;">
              <a href="https://wa.me/918309827125" target="_blank" style="color: #16a34a; font-weight: bold; text-decoration: none; margin-right: 20px;">💬 Chat on WhatsApp (+91 83098 27125)</a>
            </div>
          </div>

          <p>If you have any urgent details or attachments to add, simply reply directly to this email at <a href="mailto:zovance6@gmail.com">zovance6@gmail.com</a>.</p>
          
          <p style="color: #555; margin-top: 30px;">
            Best regards,<br/>
            <strong>The Zovance Team</strong><br/>
            <span style="font-size: 12px; color: #888;">AI & Automation Solutions • Bangalore, India</span>
          </p>
        </div>
      `,
    };

    // Send both emails in parallel
    await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(clientMailOptions),
    ]);

    res.status(200).json({ success: true, message: 'Contact notification emails sent successfully' });
  } catch (error) {
    console.error('Error sending contact email:', error);
    res.status(500).json({ error: 'Failed to send contact email notification' });
  }
});
