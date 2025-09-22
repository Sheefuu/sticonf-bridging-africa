import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { CreditCard, Lock, CheckCircle, AlertCircle } from 'lucide-react';

interface PaystackPaymentProps {
  registrationId: string;
  amount: number;
  email: string;
  onSuccess?: (reference: string) => void;
  onError?: (error: string) => void;
}

declare global {
  interface Window {
    PaystackPop: any;
  }
}

const PaystackPayment = ({ 
  registrationId, 
  amount, 
  email, 
  onSuccess, 
  onError 
}: PaystackPaymentProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const loadPaystackScript = () => {
      if (window.PaystackPop) {
        setScriptLoaded(true);
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://js.paystack.co/v1/inline.js';
      script.async = true;
      script.onload = () => setScriptLoaded(true);
      script.onerror = () => {
        toast({
          title: "Payment Error",
          description: "Failed to load payment system. Please refresh and try again.",
          variant: "destructive"
        });
      };
      document.head.appendChild(script);
    };

    loadPaystackScript();
  }, [toast]);

  const createPaymentRecord = async (reference: string) => {
    const { error } = await supabase
      .from('payments')
      .insert({
        user_id: user?.id,
        registration_id: registrationId,
        payment_reference: reference,
        amount: amount,
        currency: 'NGN',
        payment_method: 'paystack',
        payment_status: 'pending',
        paystack_reference: reference
      });

    if (error) {
      console.error('Error creating payment record:', error);
    }
  };

  const updatePaymentStatus = async (reference: string, status: 'completed' | 'failed') => {
    const { error } = await supabase
      .from('payments')
      .update({
        payment_status: status,
        paid_at: status === 'completed' ? new Date().toISOString() : null
      })
      .eq('paystack_reference', reference);

    if (error) {
      console.error('Error updating payment status:', error);
    }

    // Update registration status
    if (status === 'completed') {
      await supabase
        .from('registrations')
        .update({ payment_status: 'completed' })
        .eq('id', registrationId);
    }
  };

  const generateTicket = async (reference: string) => {
    try {
      const ticketNumber = `STI${new Date().getFullYear()}${String(Math.floor(Math.random() * 1000000)).padStart(6, '0')}`;
      
      const { error } = await supabase
        .from('tickets')
        .insert({
          user_id: user?.id,
          registration_id: registrationId,
          ticket_number: ticketNumber,
          ticket_type: 'Conference Access',
          status: 'active'
        });

      if (error) {
        console.error('Error generating ticket:', error);
      }
    } catch (error) {
      console.error('Error in ticket generation:', error);
    }
  };

  const handlePayment = async () => {
    if (!scriptLoaded || !window.PaystackPop) {
      toast({
        title: "Payment System Loading",
        description: "Please wait for the payment system to load and try again.",
        variant: "destructive"
      });
      return;
    }

    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to complete payment.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    const reference = `STI_${Date.now()}_${Math.random().toString(36).substring(7)}`;

    try {
      // Create payment record
      await createPaymentRecord(reference);

      const handler = window.PaystackPop.setup({
        key: 'pk_test_your_public_key_here', // This will be replaced with actual key from secrets
        email: email,
        amount: amount * 100, // Paystack uses kobo
        currency: 'NGN',
        ref: reference,
        metadata: {
          registration_id: registrationId,
          user_id: user.id
        },
        callback: async (response: any) => {
          setIsLoading(false);
          
          if (response.status === 'success') {
            await updatePaymentStatus(reference, 'completed');
            await generateTicket(reference);
            
            toast({
              title: "Payment Successful!",
              description: "Your registration has been completed. Your ticket is now available in your dashboard."
            });
            
            onSuccess?.(response.reference);
          }
        },
        onClose: () => {
          setIsLoading(false);
          updatePaymentStatus(reference, 'failed');
          
          toast({
            title: "Payment Cancelled",
            description: "Your payment was cancelled. You can try again anytime.",
            variant: "destructive"
          });
          
          onError?.("Payment was cancelled by user");
        }
      });

      handler.openIframe();
    } catch (error) {
      setIsLoading(false);
      console.error('Payment error:', error);
      
      toast({
        title: "Payment Error",
        description: "An error occurred while processing your payment. Please try again.",
        variant: "destructive"
      });
      
      onError?.("An error occurred while processing payment");
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2">
          <CreditCard className="h-5 w-5 text-primary" />
          Secure Payment
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-muted/50 rounded-lg p-4 space-y-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Registration Fee:</span>
            <span className="font-medium">₦{amount.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Payment Method:</span>
            <Badge variant="secondary">Paystack</Badge>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Lock className="h-4 w-4" />
          <span>Your payment is secured by Paystack</span>
        </div>

        <Button 
          onClick={handlePayment}
          disabled={isLoading || !scriptLoaded}
          className="w-full"
          size="lg"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Processing...
            </>
          ) : (
            <>
              <CreditCard className="h-4 w-4 mr-2" />
              Pay ₦{amount.toLocaleString()}
            </>
          )}
        </Button>

        <div className="text-xs text-muted-foreground text-center">
          By proceeding, you agree to our terms and conditions
        </div>
      </CardContent>
    </Card>
  );
};

export default PaystackPayment;