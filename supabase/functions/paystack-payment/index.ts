import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.4'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    )

    // Get the authorization header from the request
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      throw new Error('No authorization header')
    }

    // Verify the JWT token
    const { data: { user }, error: authError } = await supabaseClient.auth.getUser(
      authHeader.replace('Bearer ', '')
    )

    if (authError || !user) {
      throw new Error('Invalid authentication')
    }

    const { action } = await req.json()

    if (action === 'get-public-key') {
      // Return Paystack public key
      const publicKey = Deno.env.get('PAYSTACK_PUBLIC_KEY')
      
      if (!publicKey) {
        throw new Error('Paystack public key not configured')
      }

      return new Response(
        JSON.stringify({ publicKey }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    if (action === 'verify-payment') {
      const { reference } = await req.json()
      
      if (!reference) {
        throw new Error('Payment reference is required')
      }

      // Verify payment with Paystack
      const paystackSecretKey = Deno.env.get('PAYSTACK_SECRET_KEY')
      if (!paystackSecretKey) {
        throw new Error('Paystack secret key not configured')
      }

      const verifyResponse = await fetch(
        `https://api.paystack.co/transaction/verify/${reference}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${paystackSecretKey}`,
          },
        }
      )

      const verifyData = await verifyResponse.json()

      if (!verifyData.status) {
        throw new Error('Payment verification failed')
      }

      const paymentData = verifyData.data

      // Update payment status in database
      const { error: updateError } = await supabaseClient
        .from('payments')
        .update({
          payment_status: paymentData.status === 'success' ? 'completed' : 'failed',
          paid_at: paymentData.status === 'success' ? new Date().toISOString() : null,
          payment_data: paymentData
        })
        .eq('paystack_reference', reference)

      if (updateError) {
        console.error('Error updating payment:', updateError)
        throw new Error('Failed to update payment status')
      }

      // If payment is successful, update registration and create ticket
      if (paymentData.status === 'success') {
        // Get registration ID from payment record
        const { data: paymentRecord, error: paymentError } = await supabaseClient
          .from('payments')
          .select('registration_id, user_id')
          .eq('paystack_reference', reference)
          .single()

        if (paymentError || !paymentRecord) {
          throw new Error('Payment record not found')
        }

        // Update registration status
        await supabaseClient
          .from('registrations')
          .update({ payment_status: 'completed' })
          .eq('id', paymentRecord.registration_id)

        // Generate ticket
        const ticketNumber = `STI${new Date().getFullYear()}${String(Math.floor(Math.random() * 1000000)).padStart(6, '0')}`
        
        await supabaseClient
          .from('tickets')
          .insert({
            user_id: paymentRecord.user_id,
            registration_id: paymentRecord.registration_id,
            ticket_number: ticketNumber,
            ticket_type: 'Conference Access',
            status: 'active'
          })
      }

      return new Response(
        JSON.stringify({ 
          success: true, 
          status: paymentData.status,
          amount: paymentData.amount / 100 // Convert from kobo to naira
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    throw new Error('Invalid action')

  } catch (error) {
    console.error('Paystack payment error:', error)
    
    return new Response(
      JSON.stringify({ 
        error: error.message || 'An error occurred processing the payment' 
      }),
      { 
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})