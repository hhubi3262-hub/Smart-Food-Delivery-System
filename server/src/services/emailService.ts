import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const sendOrderConfirmationEmail = async (
  email: string,
  orderId: string,
  totalAmount: number
) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Order Confirmation - Afamia Café #${orderId}`,
      html: `
        <h2>Your order has been confirmed!</h2>
        <p>Order ID: ${orderId}</p>
        <p>Total Amount: $${totalAmount.toFixed(2)}</p>
        <p>We'll prepare your order and notify you when it's ready.</p>
        <p>Thank you for ordering from Afamia Café!</p>
      `,
    });
    console.log(`✅ Order confirmation email sent to ${email}`);
  } catch (error) {
    console.error('❌ Email sending failed:', error);
  }
};

export const sendReservationConfirmationEmail = async (
  email: string,
  name: string,
  date: string,
  time: string,
  guests: number
) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Reservation Confirmed - Afamia Café`,
      html: `
        <h2>Your table has been reserved!</h2>
        <p>Name: ${name}</p>
        <p>Date: ${date}</p>
        <p>Time: ${time}</p>
        <p>Guests: ${guests}</p>
        <p>We look forward to seeing you!</p>
        <p>Afamia Café Team</p>
      `,
    });
    console.log(`✅ Reservation confirmation email sent to ${email}`);
  } catch (error) {
    console.error('❌ Email sending failed:', error);
  }
};
