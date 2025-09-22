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

    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      throw new Error('User must be authenticated');
    }

    const { data, error } = await supabase.functions.invoke('paystack-payment', {
      body: { action: 'get-public-key' },
      headers: {
        Authorization: `Bearer ${session.access_token}`,
      },
    });

    if (error) {
      throw new Error('Failed to get Paystack public key');
    }

    this.publicKey = data.publicKey;
    return this.publicKey;
  }

  async initializePayment(paymentData: PaystackPaymentData): Promise<string> {
    const publicKey = await this.getPublicKey();
    const reference = `STI_${Date.now()}_${Math.random().toString(36).substring(7)}`;

    return new Promise((resolve, reject) => {
      if (!window.PaystackPop) {
        reject(new Error('Paystack script not loaded'));
        return;
      }

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
          if (response.status === 'success') {
            resolve(response.reference);
          } else {
            reject(new Error('Payment failed'));
          }
        },
        onClose: () => {
          reject(new Error('Payment cancelled'));
        },
      });

      handler.openIframe();
    });
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
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://js.paystack.co/v1/inline.js';
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Failed to load Paystack script'));
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