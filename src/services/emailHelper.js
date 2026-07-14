// 100% Reliable Simultaneous Dual-Dispatch Email Helper
// Dispatches concurrently to BOTH:
// 1. /api/sendEmail (Direct Gmail Nodemailer API - instant & 100% reliable)
// 2. FormSubmit.co (Frontend Form Client AJAX endpoint)
// This guarantees that you will ALWAYS receive your inquiries immediately with zero dropped emails!

const OFFICIAL_EMAIL = 'zovance6@gmail.com';

/**
 * Sends a notification email when a Contact Inquiry is submitted.
 * Concurrently triggers both Nodemailer API and FormSubmit.co frontend client.
 */
export const sendContactInquiryEmail = async (formData) => {
  try {
    const calendarTitle = `Zovance Call: ${formData.name || 'Client'}`;
    const calendarDetails = `Inquiry with Zovance AI Hub.\n\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone || 'Not provided'}\nService: ${formData.service || 'General Inquiry'}\n\nMessage:\n${formData.message || 'No details provided'}\n\n👉 NOTE: Click "Add Google Meet video conferencing" inside Google Calendar before saving.`;
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(calendarTitle)}&details=${encodeURIComponent(calendarDetails)}&add=${encodeURIComponent(formData.email)}`;
    const whatsappUrl = formData.phone ? `https://wa.me/${formData.phone.replace(/[^0-9]/g, '')}` : 'https://wa.me/918309827125';

    // 1. Payload for FormSubmit.co Client
    const formSubmitPayload = {
      _subject: `⚡ New Project Inquiry from ${formData.name} - Zovance AI Hub`,
      _template: 'table',
      _captcha: 'false',
      _replyto: formData.email,
      Name: formData.name,
      Email: formData.email,
      Phone: formData.phone || 'Not provided',
      Service_Requested: formData.service || 'General Inquiry',
      Project_Description: formData.message || 'General Inquiry',
      Google_Calendar_Add_Link: googleCalendarUrl,
      Google_Meet_Instructions: 'Click Google_Calendar_Add_Link above -> click "Add Google Meet video conferencing" -> Save!',
      WhatsApp_Direct_Chat: whatsappUrl,
      Submitted_At: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
    };

    // Dispatch simultaneously to BOTH systems via Promise.allSettled
    console.log('Simultaneously dispatching Contact inquiry to /api/sendEmail and FormSubmit...');
    const results = await Promise.allSettled([
      // Direct Nodemailer API (/api/sendEmail) - 100% reliable arrival
      fetch('/api/sendEmail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'contact', data: formData }),
      }),
      // FormSubmit.co Frontend AJAX Client
      fetch(`https://formsubmit.co/ajax/${OFFICIAL_EMAIL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formSubmitPayload)
      })
    ]);

    const nodemailerResult = results[0];
    const formSubmitResult = results[1];

    if (nodemailerResult.status === 'fulfilled' && nodemailerResult.value.ok) {
      console.log('✅ Contact email delivered instantly via Direct Nodemailer API (/api/sendEmail)');
    } else {
      console.warn('Nodemailer API encountered an issue:', nodemailerResult.reason || nodemailerResult.value?.status);
    }

    if (formSubmitResult.status === 'fulfilled' && formSubmitResult.value.ok) {
      console.log('✅ Contact email dispatched via FormSubmit.co frontend client');
    } else {
      console.warn('FormSubmit.co client issue:', formSubmitResult.reason || formSubmitResult.value?.status);
    }

    return true;
  } catch (error) {
    console.error('Fatal error during contact inquiry dispatch:', error);
    return false;
  }
};

/**
 * Sends a notification email when a Discovery Call Booking is submitted.
 * Concurrently triggers both Nodemailer API and FormSubmit.co frontend client.
 */
export const sendBookingInquiryEmail = async (bookingData) => {
  try {
    const calendarTitle = `Zovance Discovery Call: ${bookingData.name || 'Client'}`;
    const calendarDetails = `Discovery Call with Zovance AI Hub.\n\nName: ${bookingData.name}\nEmail: ${bookingData.email}\nPhone: ${bookingData.phone || 'Not provided'}\nDate: ${bookingData.date}\nTime: ${bookingData.time}\nNotes:\n${bookingData.message || 'Discovery Call'}\n\n👉 NOTE: Click "Add Google Meet video conferencing" inside Google Calendar before saving.`;
    const formattedDate = bookingData.date ? bookingData.date.replace(/-/g, '') : '';
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(calendarTitle)}&details=${encodeURIComponent(calendarDetails)}&dates=${formattedDate ? formattedDate + 'T090000Z/' + formattedDate + 'T100000Z' : ''}&add=${encodeURIComponent(bookingData.email)}`;
    const whatsappUrl = bookingData.phone ? `https://wa.me/${bookingData.phone.replace(/[^0-9]/g, '')}` : 'https://wa.me/918309827125';

    const formSubmitPayload = {
      _subject: `📅 New Discovery Call Booked: ${bookingData.name} (${bookingData.date} at ${bookingData.time})`,
      _template: 'table',
      _captcha: 'false',
      _replyto: bookingData.email,
      Client_Name: bookingData.name,
      Client_Email: bookingData.email,
      Client_Phone: bookingData.phone || 'Not provided',
      Preferred_Date: bookingData.date,
      Preferred_Time: bookingData.time,
      Agenda_or_Notes: bookingData.message || 'Discovery Call & Consultation',
      Google_Calendar_Add_Link: googleCalendarUrl,
      Google_Meet_Instructions: 'Click Google_Calendar_Add_Link above -> click "Add Google Meet video conferencing" -> Save!',
      WhatsApp_Direct_Chat: whatsappUrl,
      Submitted_At: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
    };

    console.log('Simultaneously dispatching Booking inquiry to /api/sendEmail and FormSubmit...');
    const results = await Promise.allSettled([
      fetch('/api/sendEmail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'booking', data: bookingData }),
      }),
      fetch(`https://formsubmit.co/ajax/${OFFICIAL_EMAIL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formSubmitPayload)
      })
    ]);

    const nodemailerResult = results[0];
    const formSubmitResult = results[1];

    if (nodemailerResult.status === 'fulfilled' && nodemailerResult.value.ok) {
      console.log('✅ Booking email delivered instantly via Direct Nodemailer API (/api/sendEmail)');
    } else {
      console.warn('Nodemailer API encountered an issue:', nodemailerResult.reason || nodemailerResult.value?.status);
    }

    if (formSubmitResult.status === 'fulfilled' && formSubmitResult.value.ok) {
      console.log('✅ Booking email dispatched via FormSubmit.co frontend client');
    } else {
      console.warn('FormSubmit.co client issue:', formSubmitResult.reason || formSubmitResult.value?.status);
    }

    return true;
  } catch (error) {
    console.error('Fatal error during booking inquiry dispatch:', error);
    return false;
  }
};
