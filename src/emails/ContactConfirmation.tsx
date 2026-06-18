import { Html, Head, Body, Container, Section, Heading, Text, Hr, Link } from '@react-email/components';

interface Props {
  name: string;
  message: string;
}

export function ContactConfirmation({ name, message }: Props) {
  return (
    <Html>
      <Head />
      <Body style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f5f5f5' }}>
        <Container style={{ maxWidth: 600, margin: '0 auto', padding: 20 }}>
          <Section style={{ backgroundColor: '#ffffff', padding: 30, borderRadius: 10 }}>
            <Heading style={{ color: '#64b5f6' }}>Thank you for contacting me!</Heading>
            <Text style={{ color: '#666', lineHeight: 1.6 }}>Hi {name},</Text>
            <Text style={{ color: '#666', lineHeight: 1.6 }}>
              Thank you for reaching out through my portfolio! I&apos;ve received your message and will get back to you as soon as possible.
            </Text>
            <Section style={{ backgroundColor: '#f9f9f9', padding: 20, borderRadius: 5 }}>
              <Text style={{ color: '#333', fontSize: 14 }}><strong>Your message:</strong></Text>
              <Text style={{ color: '#666', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>{message}</Text>
            </Section>
            <Text style={{ color: '#666', lineHeight: 1.6 }}>
              I typically respond within 24-48 hours. If urgent, reach me at{' '}
              <Link href="mailto:ewan@mke-kapoor.com" style={{ color: '#64b5f6' }}>ewan@mke-kapoor.com</Link>.
            </Text>
            <Text style={{ color: '#666', lineHeight: 1.6 }}>Best regards,<br />Ewan Kapoor</Text>
            <Hr style={{ borderColor: '#e0e0e0' }} />
            <Text style={{ color: '#999', fontSize: 12, textAlign: 'center' }}>
              This is an automated confirmation email. Please do not reply to this message.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

export default ContactConfirmation;
