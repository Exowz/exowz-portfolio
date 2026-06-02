import { Html, Head, Body, Container, Section, Heading, Text, Hr } from '@react-email/components';

interface Props {
  name: string;
  email: string;
  message: string;
}

export function ContactNotification({ name, email, message }: Props) {
  return (
    <Html>
      <Head />
      <Body style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f5f5f5' }}>
        <Container style={{ maxWidth: 600, margin: '0 auto', padding: 20 }}>
          <Section style={{ backgroundColor: '#ffffff', padding: 30, borderRadius: 10 }}>
            <Heading style={{ color: '#64b5f6' }}>New Contact Form Submission</Heading>
            <Text style={{ color: '#333' }}><strong>Name:</strong></Text>
            <Text style={{ color: '#666' }}>{name}</Text>
            <Text style={{ color: '#333' }}><strong>Email:</strong></Text>
            <Text style={{ color: '#666' }}>{email}</Text>
            <Text style={{ color: '#333' }}><strong>Message:</strong></Text>
            <Text style={{ color: '#666', whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>{message}</Text>
            <Hr style={{ borderColor: '#e0e0e0' }} />
            <Text style={{ color: '#999', fontSize: 12 }}>
              You can reply directly to this email to respond to {name}.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

export default ContactNotification;
