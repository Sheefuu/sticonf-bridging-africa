import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from 'npm:@react-email/components@0.0.22'
import * as React from 'npm:react@18.3.1'

interface STIConfConfirmationEmailProps {
  userName: string
  confirmationUrl: string
  token: string
}

export const STIConfConfirmationEmail = ({
  userName,
  confirmationUrl,
  token,
}: STIConfConfirmationEmailProps) => (
  <Html>
    <Head />
    <Preview>Welcome to STIConf 2026 - Confirm your email to get started</Preview>
    <Body style={main}>
      <Container style={container}>
        {/* Header with Logo */}
        <Section style={header}>
          <Img
            src="https://cwzdrudtrbbenftvhgza.supabase.co/storage/v1/object/public/assets/sticonf-logo.png"
            width="120"
            height="40"
            alt="STIConf 2026"
            style={logo}
          />
        </Section>

        {/* Main Content */}
        <Section style={content}>
          <Heading style={h1}>Welcome to STIConf 2026!</Heading>
          
          <Text style={greeting}>Hello {userName},</Text>
          
          <Text style={text}>
            Thank you for registering for the <strong>International Conference on Science, Technology & Innovation 2026</strong>. 
            We're excited to have you join us for this groundbreaking event where <em>the future is NOW!</em>
          </Text>

          <Text style={text}>
            To complete your registration and secure your spot at STIConf 2026, please confirm your email address by clicking the button below:
          </Text>

          {/* Call to Action Button */}
          <Section style={buttonContainer}>
            <Button href={confirmationUrl} style={button}>
              Confirm Your Email
            </Button>
          </Section>

          <Text style={alternativeText}>
            If the button doesn't work, you can also copy and paste this link into your browser:
          </Text>
          
          <Text style={linkText}>
            <Link href={confirmationUrl} style={link}>
              {confirmationUrl}
            </Link>
          </Text>

          <Text style={tokenText}>
            Or use this confirmation code: <strong style={tokenCode}>{token}</strong>
          </Text>

          <Hr style={divider} />

          {/* Conference Information */}
          <Section style={infoSection}>
            <Heading style={h2}>Conference Details</Heading>
            <Text style={infoText}>
              <strong>Event:</strong> International Conference on Science, Technology & Innovation 2026<br />
              <strong>Theme:</strong> The Future is NOW!<br />
              <strong>Registration:</strong> Secure your spot today for this premier innovation gathering
            </Text>
          </Section>

          <Text style={disclaimerText}>
            If you didn't create an account with STIConf 2026, you can safely ignore this email.
          </Text>
        </Section>

        {/* Footer */}
        <Section style={footer}>
          <Hr style={footerDivider} />
          <Text style={footerText}>
            <strong>STIConf 2026</strong><br />
            International Conference on Science, Technology & Innovation<br />
            Email: <Link href="mailto:sticonfinternational@gmail.com" style={footerLink}>sticonfinternational@gmail.com</Link>
          </Text>
          <Text style={footerCopyright}>
            © 2026 STIConf. All rights reserved.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
)

export default STIConfConfirmationEmail

// Styles
const main = {
  backgroundColor: '#f8fafc',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
}

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
  width: '580px',
  maxWidth: '100%',
}

const header = {
  backgroundColor: '#ffffff',
  borderRadius: '12px 12px 0 0',
  padding: '32px 24px 24px',
  textAlign: 'center' as const,
  background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
}

const logo = {
  margin: '0 auto',
  filter: 'brightness(0) invert(1)', // Make logo white on blue background
}

const content = {
  backgroundColor: '#ffffff',
  padding: '32px 24px',
  borderRadius: '0 0 12px 12px',
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
}

const h1 = {
  color: '#1f2937',
  fontSize: '28px',
  fontWeight: '700',
  lineHeight: '36px',
  margin: '0 0 24px',
  textAlign: 'center' as const,
}

const h2 = {
  color: '#374151',
  fontSize: '20px',
  fontWeight: '600',
  lineHeight: '28px',
  margin: '0 0 16px',
}

const greeting = {
  color: '#374151',
  fontSize: '18px',
  fontWeight: '600',
  lineHeight: '24px',
  margin: '0 0 16px',
}

const text = {
  color: '#4b5563',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '0 0 16px',
}

const buttonContainer = {
  textAlign: 'center' as const,
  margin: '32px 0',
}

const button = {
  backgroundColor: '#2563eb',
  borderRadius: '8px',
  color: '#ffffff',
  fontSize: '16px',
  fontWeight: '600',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '16px 32px',
  boxShadow: '0 4px 6px -1px rgba(37, 99, 235, 0.3)',
}

const alternativeText = {
  color: '#6b7280',
  fontSize: '14px',
  lineHeight: '20px',
  margin: '24px 0 8px',
  textAlign: 'center' as const,
}

const linkText = {
  textAlign: 'center' as const,
  margin: '0 0 16px',
}

const link = {
  color: '#2563eb',
  fontSize: '14px',
  textDecoration: 'underline',
  wordBreak: 'break-all' as const,
}

const tokenText = {
  color: '#6b7280',
  fontSize: '14px',
  lineHeight: '20px',
  margin: '16px 0',
  textAlign: 'center' as const,
}

const tokenCode = {
  backgroundColor: '#f3f4f6',
  borderRadius: '4px',
  color: '#1f2937',
  fontFamily: 'monospace',
  fontSize: '16px',
  padding: '4px 8px',
}

const divider = {
  borderColor: '#e5e7eb',
  margin: '32px 0',
}

const infoSection = {
  backgroundColor: '#f8fafc',
  borderRadius: '8px',
  padding: '20px',
  margin: '24px 0',
}

const infoText = {
  color: '#4b5563',
  fontSize: '14px',
  lineHeight: '20px',
  margin: '0',
}

const disclaimerText = {
  color: '#9ca3af',
  fontSize: '12px',
  lineHeight: '16px',
  margin: '24px 0 0',
  textAlign: 'center' as const,
}

const footer = {
  margin: '32px 0 0',
}

const footerDivider = {
  borderColor: '#e5e7eb',
  margin: '0 0 24px',
}

const footerText = {
  color: '#6b7280',
  fontSize: '12px',
  lineHeight: '16px',
  margin: '0 0 8px',
  textAlign: 'center' as const,
}

const footerLink = {
  color: '#2563eb',
  textDecoration: 'underline',
}

const footerCopyright = {
  color: '#9ca3af',
  fontSize: '11px',
  lineHeight: '16px',
  margin: '0',
  textAlign: 'center' as const,
}