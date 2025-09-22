import { supabase } from '@/integrations/supabase/client';

export interface PaystackPaymentData {
  email: string;
  amount: number;
  registrationId: string;
  metadata?: Record<string, any>;
}

export interface PaystackResponse {
  status: boolean;
  message: string;
  data?: any;
}

export class PaystackService {
  private publicKey: string | null = null;

  async getPublicKey(): Promise<string> {
    if (this.publicKey) {
      return this.publicKey;
    }

    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        throw new Error('User must be authenticated');
      }

      console.log('Getting Paystack public key...');
      
      const { data, error } = await supabase.functions.invoke('paystack-payment', {
        body: { action: 'get-public-key' },
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (error) {
        console.error('Edge function error:', error);
        throw new Error(`Failed to get Paystack public key: ${error.message}`);
      }

      if (!data || !data.publicKey) {
        console.error('Invalid response from edge function:', data);
        throw new Error('Invalid response from payment service');
      }

      console.log('Public key retrieved successfully');
      this.publicKey = data.publicKey;
      return this.publicKey;
    } catch (error) {
      console.error('Error getting public key:', error);
      throw error;
    }
  }

  async initializePayment(paymentData: PaystackPaymentData): Promise<string> {
    try {
      const publicKey = await this.getPublicKey();
      const reference = `STI_${Date.now()}_${Math.random().toString(36).substring(7)}`;

      return new Promise((resolve, reject) => {
        if (!window.PaystackPop) {
          reject(new Error('Paystack script not loaded'));
          return;
        }

        console.log('Initializing Paystack payment with:', {
          key: publicKey,
          email: paymentData.email,
          amount: paymentData.amount * 100,
          reference
        });

        const handler = window.PaystackPop.setup({
          key: publicKey,
          email: paymentData.email,
          amount: paymentData.amount * 100, // Convert to kobo
          currency: 'NGN',
          ref: reference,
          metadata: {
            registration_id: paymentData.registrationId,
            ...paymentData.metadata,
          },
          callback: (response: any) => {
            console.log('Payment callback response:', response);
            if (response.status === 'success') {
              resolve(response.reference);
            } else {
              reject(new Error('Payment failed'));
            }
          },
          onClose: () => {
            console.log('Payment modal closed');
            reject(new Error('Payment cancelled'));
          },
        });

        handler.openIframe();
      });
    } catch (error) {
      console.error('Error initializing payment:', error);
      throw error;
    }
  }

  async verifyPayment(reference: string): Promise<PaystackResponse> {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      throw new Error('User must be authenticated');
    }

    const { data, error } = await supabase.functions.invoke('paystack-payment', {
      body: { 
        action: 'verify-payment',
        reference: reference 
      },
      headers: {
        Authorization: `Bearer ${session.access_token}`,
      },
    });

    if (error) {
      throw new Error('Failed to verify payment');
    }

    return data;
  }

  loadPaystackScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (window.PaystackPop) {
        console.log('Paystack script already loaded');
        resolve();
        return;
      }

      console.log('Loading Paystack script...');
      const script = document.createElement('script');
      script.src = 'https://js.paystack.co/v1/inline.js';
      script.async = true;
      script.onload = () => {
        console.log('Paystack script loaded successfully');
        resolve();
      };
      script.onerror = (error) => {
        console.error('Failed to load Paystack script:', error);
        reject(new Error('Failed to load Paystack script'));
      };
      document.head.appendChild(script);
    });
  }
}

export const paystackService = new PaystackService();

declare global {
  interface Window {
    PaystackPop: any;
  }
}