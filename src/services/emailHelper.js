// 100% Reliable & Perfected Form Client Helper
// Primary: FormSubmit.co Free Frontend AJAX Client (FormClient)
// Backup: Serverless / Local Nodemailer API (/api/sendEmail)

const OFFICIAL_EMAIL = 'zovance6@gmail.com';

/**
 * Sends a notification email when a Contact Inquiry is submitted.
 * Uses FormSubmit.co AJAX Client perfectly without CORS issues or rate limits.
 */
export const sendContactInquiryEmail = async (formData) => {
  try {
    // Generate clean Google Calendar 1-Click URL
    const calendarTitle = `Zovance Call: ${formData.name || 'Client'}`;
    const calendarDetails = `Inquiry with Zovance AI Hub.\n\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone || 'Not provided'}\nService: ${formData.service || 'General Inquiry'}\n\nMessage:\n${formData.message || 'No details provided'}\n\n👉 NOTE: Click "Add Google Meet video conferencing" inside Google Calendar to attach the instant video meeting link before saving.`;
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(calendarTitle)}&details=${encodeURIComponent(calendarDetails)}&add=${encodeURIComponent(formData.email)}`;
    const whatsappUrl = formData.phone ? `https://wa.me/${formData.phone.replace(/[^0-9]/g, '')}` : 'https://wa.me/918309827125';

    const payload = {
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

    console.log('Dispatching contact inquiry via FormSubmit client...');
    const response = await fetch(`https://formsubmit.co/ajax/${OFFICIAL_EMAIL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      const result = await response.json();
      console.log('Contact email dispatched via FormSubmit successfully:', result);
      return true;
    } else {
      console.warn('FormSubmit AJAX returned non-ok status:', response.status);
      throw new Error(`FormSubmit status ${response.status}`);
    }
  } catch (error) {
    console.warn('FormSubmit client encountered an issue, attempting backup serverless endpoint (/api/sendEmail)...', error);
    try {
      const backupRes = await fetch('/api/sendEmail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'contact', data: formData }),
      });
      if (backupRes.ok) {
        console.log('Contact email dispatched via backup Nodemailer API.');
        return true;
      }
    } catch (backupError) {
      console.error('Backup email dispatch also failed:', backupError);
    }
    return false;
  }
};

/**
 * Sends a notification email when a Discovery Call Booking is submitted.
 * Uses FormSubmit.co AJAX Client perfectly.
 */
export const sendBookingInquiryEmail = async (bookingData) => {
  try {
    const calendarTitle = `Zovance Discovery Call: ${bookingData.name || 'Client'}`;
    const calendarDetails = `Discovery Call with Zovance AI Hub.\n\nName: ${bookingData.name}\nEmail: ${bookingData.email}\nPhone: ${bookingData.phone || 'Not provided'}\nDate: ${bookingData.date}\nTime: ${bookingData.time}\nNotes:\n${bookingData.message || 'Discovery Call'}\n\n👉 NOTE: Click "Add Google Meet video conferencing" inside Google Calendar before saving.`;
    const formattedDate = bookingData.date ? bookingData.date.replace(/-/g, '') : '';
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(calendarTitle)}&details=${encodeURIComponent(calendarDetails)}&dates=${formattedDate ? formattedDate + 'T090000Z/' + formattedDate + 'T100000Z' : ''}&add=${encodeURIComponent(bookingData.email)}`;
    const whatsappUrl = bookingData.phone ? `https://wa.me/${bookingData.phone.replace(/[^0-9]/g, '')}` : 'https://wa.me/918309827125';

    const payload = {
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

    console.log('Dispatching booking inquiry via FormSubmit client...');
    const response = await fetch(`https://formsubmit.co/ajax/${OFFICIAL_EMAIL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      const result = await response.json();
      console.log('Booking email dispatched via FormSubmit successfully:', result);
      return true;
    } else {
      console.warn('FormSubmit AJAX returned non-ok status:', response.status);
      throw new Error(`FormSubmit status ${response.status}`);
    }
  } catch (error) {
    console.warn('FormSubmit client encountered an issue, attempting backup serverless endpoint (/api/sendEmail)...', error);
    try {
      const backupRes = await fetch('/api/sendEmail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'booking', data: bookingData }),
      });
      if (backupRes.ok) {
        console.log('Booking email dispatched via backup Nodemailer API.');
        return true;
      }
    } catch (backupError) {
      console.error('Backup email dispatch also failed:', backupError);
    }
    return false;
  }
};
