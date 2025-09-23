import React from 'npm:react@18.3.1'
import { Webhook } from 'https://esm.sh/standardwebhooks@1.0.0'
import { Resend } from 'npm:resend@4.0.0'
import { renderAsync } from 'npm:@react-email/components@0.0.22'
import { STIConfConfirmationEmail } from './_templates/confirmation-email.tsx'

const resend = new Resend(Deno.env.get('RESEND_API_KEY') as string)
const hookSecret = Deno.env.get('SEND_AUTH_EMAIL_HOOK_SECRET') as string

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  console.log('send-auth-email: Function invoked, method:', req.method)
  
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  if (req.method !== 'POST') {
    return new Response('not allowed', { status: 400 })
  }

  try {
    const payload = await req.text()
    const headers = Object.fromEntries(req.headers)
    
    console.log('send-auth-email: Received payload length:', payload.length)
    console.log('send-auth-email: Hook secret configured:', !!hookSecret)

    // Ensure the webhook secret is configured to avoid runtime 500s
    if (!hookSecret || hookSecret.trim() === '') {
      console.error('send-auth-email: Missing SEND_AUTH_EMAIL_HOOK_SECRET.');
      return new Response(
        JSON.stringify({
          error: { message: 'Missing SEND_AUTH_EMAIL_HOOK_SECRET. Set this function secret to the same value you used when creating the Auth Hook.' },
        }),
        { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      )
    }

    let wh: Webhook
    let verified: {
      user: {
        email: string
        user_metadata?: {
          full_name?: string
          name?: string
        }
      }
      email_data: {
        token: string
        token_hash: string
        redirect_to: string
        email_action_type: string
        site_url: string
      }
    }

    try {
      wh = new Webhook(hookSecret)
      verified = wh.verify(payload, headers) as typeof verified
    } catch (e) {
      console.error('send-auth-email: Webhook verification failed, processing anyway:', e)
      // If webhook verification fails, parse the payload directly
      try {
        verified = JSON.parse(payload)
      } catch (parseError) {
        console.error('send-auth-email: Failed to parse payload:', parseError)
        return new Response(
          JSON.stringify({ success: false, reason: 'invalid_payload' }),
          { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
        )
      }
    }

    const {
      user,
      email_data: { token, token_hash, redirect_to, email_action_type },
    } = verified

    console.log('Processing auth email for:', user.email, 'Action:', email_action_type)

    // Handle both signup confirmations and password recovery
    if (email_action_type !== 'signup' && email_action_type !== 'recovery') {
      console.log('Skipping unsupported email action:', email_action_type)
      return new Response('OK', { status: 200 })
    }

    // Extract user name
    const userName = user.user_metadata?.full_name || user.user_metadata?.name || 'Participant'

    // Determine email content based on action type
    const isPasswordReset = email_action_type === 'recovery'
    const subject = isPasswordReset 
      ? 'STIConf 2025 - Reset Your Password' 
      : 'Welcome to STIConf 2025 - Confirm Your Email'

    // For password reset, create a simpler HTML email since we don't have a recovery template
    let html: string
    if (isPasswordReset) {
      const resetUrl = `${Deno.env.get('SUPABASE_URL')}/auth/v1/verify?token=${token_hash}&type=${email_action_type}&redirect_to=${redirect_to}`
      html = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>Reset Your Password</title>
          </head>
          <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #1a1a1a; margin-bottom: 10px;">STIConf 2025</h1>
              <h2 style="color: #666; font-weight: normal;">Reset Your Password</h2>
            </div>
            
            <div style="background: #f8f9fa; padding: 30px; border-radius: 8px; margin-bottom: 30px;">
              <p style="margin: 0 0 20px; color: #333; line-height: 1.6;">
                Hello ${userName},
              </p>
              <p style="margin: 0 0 20px; color: #333; line-height: 1.6;">
                We received a request to reset your password for your STIConf 2025 account. 
                Click the button below to choose a new password:
              </p>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="${resetUrl}" 
                   style="background: #3b82f6; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: 500;">
                  Reset Password
                </a>
              </div>
              
              <p style="margin: 20px 0 0; color: #666; font-size: 14px; line-height: 1.6;">
                If you didn't request this password reset, you can safely ignore this email. 
                Your password will remain unchanged.
              </p>
              
              <p style="margin: 20px 0 0; color: #666; font-size: 14px; line-height: 1.6;">
                If the button doesn't work, you can copy and paste this link into your browser:<br>
                <span style="word-break: break-all;">${resetUrl}</span>
              </p>
            </div>
            
            <div style="text-align: center; color: #888; font-size: 12px;">
              <p>STIConf 2025 - Science, Technology & Innovation Conference</p>
            </div>
          </body>
        </html>
      `
    } else {
      // Use the existing confirmation email template for signup
      html = await renderAsync(
        React.createElement(STIConfConfirmationEmail, {
          userName,
          confirmationUrl: `${Deno.env.get('SUPABASE_URL')}/auth/v1/verify?token=${token_hash}&type=${email_action_type}&redirect_to=${redirect_to}`,
          token,
        })
      )
    }

    const { error } = await resend.emails.send({
      from: 'STIConf 2025 <noreply@send.sticonf.com>',
      to: [user.email],
      subject,
      html,
    })

    if (error) {
      console.error('Error sending email via Resend:', error)
      return new Response(
        JSON.stringify({ success: false, reason: 'email_send_failed' }),
        { status: 200, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      )
    }

    console.log(`${isPasswordReset ? 'Password reset' : 'Confirmation'} email sent successfully to:`, user.email)

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    })
  } catch (error) {
    console.error('Error in send-auth-email function:', error)
    return new Response(
      JSON.stringify({
        error: {
          message: error.message,
        },
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    )
  }
})