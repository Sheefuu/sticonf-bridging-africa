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

    const wh = new Webhook(hookSecret)
    
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
      verified = wh.verify(payload, headers) as typeof verified
    } catch (e) {
      console.error('send-auth-email: Invalid webhook signature, skipping.', e)
      return new Response(
        JSON.stringify({ success: true, skipped: true, reason: 'invalid_signature' }),
        { status: 200, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      )
    }

    const {
      user,
      email_data: { token, token_hash, redirect_to, email_action_type },
    } = verified

    console.log('Processing auth email for:', user.email, 'Action:', email_action_type)

    // Only handle signup confirmations
    if (email_action_type !== 'signup') {
      console.log('Skipping non-signup email action:', email_action_type)
      return new Response('OK', { status: 200 })
    }

    // Extract user name
    const userName = user.user_metadata?.full_name || user.user_metadata?.name || 'Participant'

    // Render the React Email template
    const html = await renderAsync(
      React.createElement(STIConfConfirmationEmail, {
        userName,
        confirmationUrl: `${Deno.env.get('SUPABASE_URL')}/auth/v1/verify?token=${token_hash}&type=${email_action_type}&redirect_to=${redirect_to}`,
        token,
      })
    )

    const { error } = await resend.emails.send({
      from: 'STIConf 2025 <sticonfinternational@gmail.com>',
      to: [user.email],
      subject: 'Welcome to STIConf 2025 - Confirm Your Email',
      html,
    })

    if (error) {
      console.error('Error sending email via Resend:', error)
      return new Response(
        JSON.stringify({ success: false, reason: 'email_send_failed' }),
        { status: 200, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      )
    }

    console.log('Confirmation email sent successfully to:', user.email)

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