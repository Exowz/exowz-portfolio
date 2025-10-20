import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    // Debug: Check if API key is loaded
    console.log('API Key loaded:', process.env.RESEND_API_KEY ? `Yes (starts with ${process.env.RESEND_API_KEY.substring(0, 8)})` : 'NO - MISSING!');

    const body = await request.json();
    const { name, email, message } = body;

    // Validate input
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Send notification email to you
    console.log('Attempting to send notification email to:', 'ewan@mke-kapoor.com');
    const notificationEmail = await resend.emails.send({
      from: 'Portfolio Contact <no-reply@mke-kapoor.com>',
      to: ['ewan@mke-kapoor.com'],
      replyTo: email, // Sender's email so you can reply directly
      subject: `Portfolio Contact from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
          <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #64b5f6; margin-bottom: 20px;">New Contact Form Submission</h2>

            <div style="margin-bottom: 15px;">
              <strong style="color: #333;">Name:</strong>
              <p style="margin: 5px 0; color: #666;">${name}</p>
            </div>

            <div style="margin-bottom: 15px;">
              <strong style="color: #333;">Email:</strong>
              <p style="margin: 5px 0; color: #666;">${email}</p>
            </div>

            <div style="margin-bottom: 15px;">
              <strong style="color: #333;">Message:</strong>
              <div style="margin: 10px 0; padding: 15px; background-color: #f9f9f9; border-left: 4px solid #64b5f6; border-radius: 5px;">
                <p style="color: #666; line-height: 1.6; margin: 0;">${message.replace(/\n/g, '<br>')}</p>
              </div>
            </div>

            <hr style="margin: 25px 0; border: none; border-top: 1px solid #e0e0e0;">

            <p style="color: #999; font-size: 12px; margin: 0;">
              You can reply directly to this email to respond to ${name}.
            </p>
          </div>
        </div>
      `,
    });

    console.log('Notification email response:', notificationEmail);

    if (notificationEmail.error) {
      console.error('Failed to send notification email:', notificationEmail.error);
      return NextResponse.json(
        { error: 'Failed to send email', details: notificationEmail.error },
        { status: 500 }
      );
    }

    // Send confirmation email to the user
    const confirmationEmail = await resend.emails.send({
      from: 'Ewan Kapoor <no-reply@mke-kapoor.com>',
      to: [email],
      subject: `Thanks for reaching out, ${name}!`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
          <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #64b5f6; margin-bottom: 20px;">Thank you for contacting me!</h2>

            <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
              Hi ${name},
            </p>

            <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
              Thank you for reaching out through my portfolio! I've received your message and will get back to you as soon as possible.
            </p>

            <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px; margin-bottom: 20px;">
              <p style="color: #333; font-size: 14px; margin: 0 0 10px 0;"><strong>Your message:</strong></p>
              <p style="color: #666; line-height: 1.6; margin: 0;">${message.replace(/\n/g, '<br>')}</p>
            </div>

            <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
              I typically respond within 24-48 hours. If your inquiry is urgent, feel free to reach out to me directly at
              <a href="mailto:ewan@mke-kapoor.com" style="color: #64b5f6; text-decoration: none;">ewan@mke-kapoor.com</a>.
            </p>

            <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
              Best regards,<br>
              <strong style="color: #333;">Ewan Kapoor</strong><br>
              <span style="color: #999; font-size: 14px;">Data & AI Development Student</span>
            </p>

            <hr style="margin: 25px 0; border: none; border-top: 1px solid #e0e0e0;">

            <p style="color: #999; font-size: 12px; text-align: center; margin: 0;">
              This is an automated confirmation email. Please do not reply to this message.
            </p>
          </div>
        </div>
      `,
    });

    console.log('Confirmation email response:', confirmationEmail);

    if (confirmationEmail.error) {
      console.error('Failed to send confirmation email:', confirmationEmail.error);
      // Don't fail the request if confirmation email fails, notification was sent
    }

    return NextResponse.json(
      {
        message: 'Email sent successfully',
        data: {
          notificationId: notificationEmail.data?.id,
          confirmationId: confirmationEmail.data?.id
        }
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
