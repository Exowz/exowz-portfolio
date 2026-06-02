import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { render } from '@react-email/render';
import { validateContact } from '@/lib/validation';
import ContactNotification from '@/emails/ContactNotification';
import ContactConfirmation from '@/emails/ContactConfirmation';

const resend = new Resend(process.env.RESEND_API_KEY);

// Minimum plausible time (ms) between form render and submit. Faster = bot.
const MIN_SUBMIT_MS = 2000;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null);

    // Honeypot + timing: silently accept (no send) so bots get no signal.
    if (body && typeof body === 'object') {
      const honey = (body as Record<string, unknown>).company;
      const renderedAt = Number((body as Record<string, unknown>).renderedAt);
      const tooFast = Number.isFinite(renderedAt) && Date.now() - renderedAt < MIN_SUBMIT_MS;
      if ((typeof honey === 'string' && honey.trim() !== '') || tooFast) {
        return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
      }
    }

    const result = validateContact(body);
    if (!result.ok) {
      return NextResponse.json({ error: 'Invalid input', errors: result.errors }, { status: 400 });
    }
    const { name, email, message } = result.data;

    const from = process.env.CONTACT_FROM;
    const to = process.env.CONTACT_TO;
    const confirmFrom = process.env.CONTACT_CONFIRM_FROM;
    if (!from || !to || !confirmFrom) {
      console.error('Contact email misconfigured: missing CONTACT_* env vars');
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }

    const notificationHtml = await render(ContactNotification({ name, email, message }));
    const notification = await resend.emails.send({
      from,
      to: [to],
      replyTo: email,
      subject: `Portfolio Contact from ${name}`,
      html: notificationHtml,
    });

    if (notification.error) {
      console.error('Contact notification email failed');
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }

    const confirmationHtml = await render(ContactConfirmation({ name, message }));
    const confirmation = await resend.emails.send({
      from: confirmFrom,
      to: [email],
      subject: `Thanks for reaching out, ${name}!`,
      html: confirmationHtml,
    });
    if (confirmation.error) {
      // Non-fatal: the owner was already notified.
      console.error('Contact confirmation email failed');
    }

    return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
  } catch {
    console.error('Contact form error');
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
