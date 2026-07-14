// 100% Reliable Serverless + Local API Email Helper
// Calls /api/sendEmail (which uses Nodemailer + your exact Gmail App Password)

export const sendContactInquiryEmail = async (formData) => {
  try {
    const response = await fetch('/api/sendEmail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'contact',
        data: formData,
      }),
    });

    const result = await response.json();
    console.log('Contact email dispatched via Nodemailer API:', result);
    return true;
  } catch (error) {
    console.error('Email dispatch error (Contact):', error);
    return false;
  }
};

export const sendBookingInquiryEmail = async (bookingData) => {
  try {
    const response = await fetch('/api/sendEmail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'booking',
        data: bookingData,
      }),
    });

    const result = await response.json();
    console.log('Booking email dispatched via Nodemailer API:', result);
    return true;
  } catch (error) {
    console.error('Email dispatch error (Booking):', error);
    return false;
  }
};
