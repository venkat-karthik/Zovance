/* eslint-env node */
import nodemailer from 'nodemailer';

const ADMIN_EMAIL = process.env.VITE_ADMIN_EMAIL || process.env.ADMIN_EMAIL || 'zovance6@gmail.com';
const GMAIL_APP_PASSWORD = process.env.VITE_GMAIL_APP_PASSWORD || process.env.GMAIL_APP_PASSWORD || 'jxmh ycna qlln mctt';

// Create nodemailer transporter using Gmail App Password
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: ADMIN_EMAIL,
    pass: GMAIL_APP_PASSWORD,
  },
});

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { type, data } = req.body || {};
    if (!data || !data.email) {
      return res.status(400).json({ error: 'Missing required email field' });
    }

    const isContact = type === 'contact';
    const clientName = data.name || 'Valued Client';
    const clientEmail = data.email;
    const clientPhone = data.phone || 'Not provided';
    const serviceRequested = data.service || 'General Inquiry';
    const messageOrAgenda = data.message || 'Discovery Call & Consultation';

    // Google Calendar 1-click URL
    const calendarTitle = isContact
      ? `Zovance Consultation: ${clientName}`
      : `Zovance Discovery Call: ${clientName}`;
    const calendarDetails = `Meeting with Zovance AI Engineering Team.\n\nClient Name: ${clientName}\nEmail: ${clientEmail}\nPhone: ${clientPhone}\nService: ${serviceRequested}\nNotes:\n${messageOrAgenda}\n\n👉 NOTE: Click "Add Google Meet video conferencing" inside Google Calendar before saving.`;
    const formattedDate = !isContact && data.date ? data.date.replace(/-/g, '') : '';
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(calendarTitle)}&details=${encodeURIComponent(calendarDetails)}&dates=${formattedDate ? formattedDate + 'T090000Z/' + formattedDate + 'T100000Z' : ''}&add=${encodeURIComponent(clientEmail)}`;
    const whatsappUrl = clientPhone !== 'Not provided' ? `https://wa.me/${clientPhone.replace(/[^0-9]/g, '')}` : 'https://wa.me/918309827125';

    // 1. Admin Email HTML
    const adminSubject = isContact
      ? `⚡ New Project Inquiry from ${clientName} - Zovance AI Hub`
      : `📅 Discovery Call Booked: ${clientName} (${data.date || 'Soon'} at ${data.time || 'TBD'})`;

    const adminHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0f172a; color: #f8fafc; padding: 24px; border-radius: 12px; border: 1px solid #1e293b;">
        <h2 style="color: #38bdf8; margin-top: 0;">${adminSubject}</h2>
        <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
          <tr style="border-bottom: 1px solid #1e293b;"><td style="padding: 10px 0; color: #94a3b8; width: 140px;">Client Name</td><td style="padding: 10px 0; font-weight: bold; color: #ffffff;">${clientName}</td></tr>
          <tr style="border-bottom: 1px solid #1e293b;"><td style="padding: 10px 0; color: #94a3b8;">Email</td><td style="padding: 10px 0;"><a href="mailto:${clientEmail}" style="color: #38bdf8;">${clientEmail}</a></td></tr>
          <tr style="border-bottom: 1px solid #1e293b;"><td style="padding: 10px 0; color: #94a3b8;">Phone</td><td style="padding: 10px 0;"><a href="${whatsappUrl}" style="color: #4ade80;">${clientPhone} (Chat on WhatsApp)</a></td></tr>
          ${isContact ? `<tr style="border-bottom: 1px solid #1e293b;"><td style="padding: 10px 0; color: #94a3b8;">Service</td><td style="padding: 10px 0; color: #facc15;">${serviceRequested}</td></tr>` : ''}
          ${!isContact ? `<tr style="border-bottom: 1px solid #1e293b;"><td style="padding: 10px 0; color: #94a3b8;">Date & Time</td><td style="padding: 10px 0; color: #facc15;">${data.date} at ${data.time}</td></tr>` : ''}
          <tr style="border-bottom: 1px solid #1e293b;"><td style="padding: 10px 0; color: #94a3b8;">Message / Agenda</td><td style="padding: 10px 0; color: #cbd5e1;">${messageOrAgenda}</td></tr>
        </table>
        <div style="margin-top: 24px; padding: 16px; background: #1e293b; border-radius: 8px;">
          <p style="margin: 0 0 12px 0; font-weight: bold; color: #38bdf8;">📅 Quick Calendar & Google Meet Setup:</p>
          <a href="${googleCalendarUrl}" target="_blank" style="display: inline-block; background: #2563eb; color: #ffffff; text-decoration: none; padding: 10px 18px; border-radius: 6px; font-weight: bold;">➕ Add to Google Calendar (+ Google Meet)</a>
        </div>
      </div>
    `;

    // 2. Client Confirmation Email HTML
    const clientSubject = isContact
      ? `We received your inquiry - Zovance AI Hub`
      : `Discovery Call Confirmed - Zovance AI Hub`;

    const clientHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0f172a; color: #f8fafc; padding: 24px; border-radius: 12px; border: 1px solid #1e293b;">
        <h2 style="color: #38bdf8; margin-top: 0;">Hi ${clientName},</h2>
        <p style="font-size: 16px; line-height: 1.5; color: #cbd5e1;">
          Thank you for connecting with <strong>Zovance AI Hub</strong>! We have received your ${isContact ? `project inquiry regarding <strong style="color: #facc15;">${serviceRequested}</strong>` : `Discovery Call booking for <strong style="color: #facc15;">${data.date} at ${data.time}</strong>`}.
        </p>
        <p style="font-size: 16px; line-height: 1.5; color: #cbd5e1;">
          Our AI Engineering & Architecture team will review your requirements and get back to you within 2 hours.
        </p>
        <div style="margin: 24px 0; padding: 16px; background: #1e293b; border-radius: 8px;">
          <p style="margin: 0 0 12px 0; font-weight: bold; color: #38bdf8;">📅 Add to your Calendar:</p>
          <a href="${googleCalendarUrl}" target="_blank" style="display: inline-block; background: #2563eb; color: #ffffff; text-decoration: none; padding: 10px 18px; border-radius: 6px; font-weight: bold;">➕ Add to Google Calendar</a>
        </div>
        <p style="font-size: 15px; color: #94a3b8; border-top: 1px solid #1e293b; padding-top: 16px;">
          Need immediate answers or want to chat with us right now?<br>
          👉 <strong>WhatsApp Direct Chat:</strong> <a href="https://wa.me/918309827125" style="color: #4ade80;">+91 83098 27125</a><br>
          👉 <strong>Official Support:</strong> <a href="mailto:${ADMIN_EMAIL}" style="color: #38bdf8;">${ADMIN_EMAIL}</a>
        </p>
      </div>
    `;

    // Send email to Admin
    await transporter.sendMail({
      from: `"Zovance AI Hub" <${ADMIN_EMAIL}>`,
      to: ADMIN_EMAIL,
      replyTo: clientEmail,
      subject: adminSubject,
      html: adminHtml,
    });

    // Send confirmation email to Client
    await transporter.sendMail({
      from: `"Zovance AI Hub" <${ADMIN_EMAIL}>`,
      to: clientEmail,
      subject: clientSubject,
      html: clientHtml,
    });

    return res.status(200).json({ success: true, message: 'Emails sent via Nodemailer successfully' });
  } catch (error) {
    console.error('Error in sendEmail API handler:', error);
    return res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}
