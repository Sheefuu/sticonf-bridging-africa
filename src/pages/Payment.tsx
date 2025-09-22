import { useAuth } from "@/hooks/useAuth";
import { paystackService } from "@/lib/paystack";
import { supabase } from "@/integrations/supabase/client";
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { 
  CreditCard, 
  ArrowLeft, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Phone,
  Mail,
  User,
  Lock,
  Loader2
} from "lucide-react";
import Footer from "@/components/Footer";

const Payment = () => {
  const { user, loading: authLoading } = useAuth();
  const [searchParams] = useSearchParams();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'processing' | 'success' | 'error'>('pending');
  const { toast } = useToast();
  const navigate = useNavigate();

  // Redirect to auth if not logged in
  useEffect(() => {
    if (!authLoading && !user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to complete your registration payment.",
        variant: "destructive"
      });
      navigate('/auth');
    }
  }, [user, authLoading, navigate, toast]);

  // Load Paystack script on component mount
  useEffect(() => {
    if (user) {
      paystackService.loadPaystackScript().catch(error => {
        console.error('Failed to load Paystack:', error);
        toast({
          title: "Payment System Error",
          description: "Failed to load payment system. Please refresh and try again.",
          variant: "destructive"
        });
      });
    }
  }, [user, toast]);
  const type = searchParams.get('type') || 'individual';
  const sector = searchParams.get('sector') || '';
  const category = searchParams.get('category') || '';
  const subtype = searchParams.get('subtype') || '';
  
  // For complex pricing
  const wantsExhibition = searchParams.get('wantsExhibition') === 'true';
  const wantsConference = searchParams.get('wantsConference') === 'true';
  const numberOfParticipants = parseInt(searchParams.get('numberOfParticipants') || '1');
  const createRegistrationRecord = async () => {
    if (!user) return null;

    const registrationData = {
      type,
      sector,
      category,
      subtype,
      wantsExhibition,
      wantsConference,
      numberOfParticipants,
      searchParams: Object.fromEntries(searchParams.entries())
    };

    const { data, error } = await supabase
      .from('registrations')
      .insert({
        user_id: user.id,
        registration_type: type === 'government' ? `${type}-${subtype}` : type,
        sector,
        category,
        accommodation: false,
        exhibition: wantsExhibition,
        dinner: false,
        total_amount: totalAmount,
        payment_status: 'pending',
        registration_data: registrationData
      })
      .select()
      .single();

    if (error) {
      console.error('Registration creation error:', error);
      throw new Error('Failed to create registration record');
    }

    return data;
  };

  const createPaymentRecord = async (registrationId: string, reference: string) => {
    if (!user) return null;

    const { data, error } = await supabase
      .from('payments')
      .insert({
        user_id: user.id,
        registration_id: registrationId,
        payment_reference: reference,
        amount: totalAmount,
        currency: 'NGN',
        payment_method: 'paystack',
        payment_status: 'pending',
        paystack_reference: reference
      })
      .select()
      .single();

    if (error) {
      console.error('Payment creation error:', error);
      throw new Error('Failed to create payment record');
    }

    return data;
  };

  const handlePayment = async () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to complete payment.",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    setPaymentStatus('processing');

    try {
      // Create registration record first
      const registration = await createRegistrationRecord();
      if (!registration) {
        throw new Error('Failed to create registration');
      }

      // Get Paystack public key and initialize payment
      const publicKey = await paystackService.getPublicKey();
      const reference = `STI_${Date.now()}_${Math.random().toString(36).substring(7)}`;
      
      // Create payment record
      await createPaymentRecord(registration.id, reference);

      // Initialize Paystack payment
      const handler = (window as any).PaystackPop.setup({
        key: publicKey,
        email: user.email || '',
        amount: totalAmount * 100, // Convert to kobo
        currency: 'NGN',
        ref: reference,
        metadata: {
          registration_id: registration.id,
          user_id: user.id,
          registration_type: type
        },
        callback: async (response: any) => {
          if (response.status === 'success') {
            try {
              // Verify payment on backend
              await paystackService.verifyPayment(response.reference);
              
              setPaymentStatus('success');
              toast({
                title: "Payment Successful!",
                description: "Your registration has been completed. Redirecting to your dashboard..."
              });

              // Redirect to dashboard after a short delay
              setTimeout(() => {
                navigate('/dashboard');
              }, 2000);

            } catch (error) {
              console.error('Payment verification error:', error);
              setPaymentStatus('error');
              toast({
                title: "Payment Verification Failed",
                description: "Please contact support for assistance.",
                variant: "destructive"
              });
            }
          }
        },
        onClose: () => {
          setPaymentStatus('pending');
          setIsProcessing(false);
          toast({
            title: "Payment Cancelled",
            description: "Your payment was cancelled. You can try again anytime.",
            variant: "destructive"
          });
        }
      });

      handler.openIframe();

    } catch (error) {
      console.error('Payment initiation error:', error);
      setPaymentStatus('error');
      setIsProcessing(false);
      
      toast({
        title: "Payment Error",
        description: error instanceof Error ? error.message : "Failed to initialize payment. Please try again.",
        variant: "destructive"
      });
    }
  };
  const calculateFees = () => {
    let exhibitionFee = 0;
    let conferenceFee = 0;
    let totalAmount = 0;

    if (type === 'individual') {
      // Individuals: ₦200,000 flat rate for both categories
      totalAmount = 200000;
      return { exhibitionFee: 0, conferenceFee: 200000, totalAmount };
    }

    if (type === 'government' && subtype === 'state') {
      // State Government: ₦5,500,000 flat package
      totalAmount = 5500000;
      return { exhibitionFee: 0, conferenceFee: 0, totalAmount };
    }

    if (type === 'organization') {
      if (sector === 'education') {
        // Universities/Higher Institutions: ₦350,000 (Exhibition only)
        exhibitionFee = wantsExhibition ? 350000 : 0;
        totalAmount = exhibitionFee;
      } else if (sector === 'professional-bodies') {
        // Professional Bodies: Exhibition ₦500,000 + Conference ₦300,000 × participants
        exhibitionFee = wantsExhibition ? 500000 : 0;
        conferenceFee = wantsConference ? 300000 : 0;
        totalAmount = exhibitionFee + (conferenceFee * numberOfParticipants);
      } else if (sector === 'product-company') {
        // Product Companies: Exhibition ₦350,000 + Conference ₦250,000 × participants
        exhibitionFee = wantsExhibition ? 350000 : 0;
        conferenceFee = wantsConference ? 250000 : 0;
        totalAmount = exhibitionFee + (conferenceFee * numberOfParticipants);
      }
    }

    if (type === 'government' && subtype === 'federal') {
      // Federal MDAs: Exhibition ₦500,000 + Conference ₦250,000 × participants
      exhibitionFee = wantsExhibition ? 500000 : 0;
      conferenceFee = wantsConference ? 250000 : 0;
      totalAmount = exhibitionFee + (conferenceFee * numberOfParticipants);
    }

    return { exhibitionFee, conferenceFee, totalAmount };
  };

  const { exhibitionFee, conferenceFee, totalAmount } = calculateFees();

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect to auth page
  }
  
  const getRegistrationTitle = () => {
    if (type === 'individual') {
      if (category === 'innovative-entrepreneurs') {
        return 'STIConf 2026 - Individual Registration (Innovative Entrepreneurs)';
      } else if (category === 'universities') {
        return 'STIConf 2026 - Individual Registration (Universities)';
      }
      return 'STIConf 2026 - Individual Registration';
    }
    
    if (type === 'organization') {
      switch (sector) {
        case 'education':
          return 'STIConf 2026 - Organization Registration (Universities/Higher Institutions)';
        case 'professional-bodies':
          return 'STIConf 2026 - Organization Registration (Professional Bodies)';
        case 'product-company':
          return 'STIConf 2026 - Organization Registration (Product Companies)';
        default:
          return 'STIConf 2026 - Organization Registration';
      }
    }
    
    if (type === 'government') {
      if (subtype === 'state') {
        return 'STIConf 2026 - State Government Registration';
      } else if (subtype === 'federal') {
        return 'STIConf 2026 - Federal MDA Registration';
      }
      return 'STIConf 2026 - Government Registration';
    }
    
    return 'STIConf 2026 - Registration';
  };
  
  const formatAmount = (amount: number) => {
    return amount.toLocaleString();
  };

  const renderPaymentBreakdown = () => {
    if (type === 'individual') {
      return (
        <div className="space-y-4">
          <div className="flex justify-between items-center py-3 border-b border-border/50">
            <span className="text-lg">Conference Participation</span>
            <span className="text-lg font-semibold">₦{formatAmount(200000)}</span>
          </div>
        </div>
      );
    }

    if (type === 'government' && subtype === 'state') {
      return (
        <div className="space-y-4">
          <div className="flex justify-between items-center py-3 border-b border-border/50">
            <span className="text-lg">Exhibition Pavilion + Conference Participation (7 participants)</span>
            <span className="text-lg font-semibold">₦{formatAmount(5500000)}</span>
          </div>
        </div>
      );
    }

    // For organizations and federal government with itemized breakdown
    const items = [];
    
    if (wantsExhibition && exhibitionFee > 0) {
      let exhibitionLabel = 'Exhibition Booth';
      if (type === 'government' && subtype === 'federal') {
        exhibitionLabel = 'Exhibition Booth';
      }
      items.push(
        <div key="exhibition" className="flex justify-between items-center py-3 border-b border-border/50">
          <span className="text-lg">{exhibitionLabel}</span>
          <span className="text-lg font-semibold">₦{formatAmount(exhibitionFee)}</span>
        </div>
      );
    }

    if (wantsConference && conferenceFee > 0) {
      const conferenceTotal = conferenceFee * numberOfParticipants;
      items.push(
        <div key="conference" className="flex justify-between items-center py-3 border-b border-border/50">
          <span className="text-lg">
            Conference Participation ({numberOfParticipants} participant{numberOfParticipants > 1 ? 's' : ''})
          </span>
          <span className="text-lg font-semibold">₦{formatAmount(conferenceTotal)}</span>
        </div>
      );
    }

    // Special case for education sector (exhibition only)
    if (type === 'organization' && sector === 'education' && exhibitionFee > 0) {
      return (
        <div className="space-y-4">
          <div className="flex justify-between items-center py-3 border-b border-border/50">
            <span className="text-lg">Exhibition Booth (Universities/Higher Institutions)</span>
            <span className="text-lg font-semibold">₦{formatAmount(exhibitionFee)}</span>
          </div>
        </div>
      );
    }

    return <div className="space-y-4">{items}</div>;
  };
  
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="container mx-auto max-w-3xl">
        <div className="mb-8">
          <Link 
            to={
              type === 'individual' ? '/registration/individual' :
              type === 'organization' ? '/registration/organization' :
              type === 'government' && subtype === 'state' ? '/registration/state-government' :
              type === 'government' && subtype === 'federal' ? '/registration/federal-mda' :
              '/registration'
            }
            className="inline-flex items-center gap-2 text-primary hover:underline mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Registration
          </Link>
        </div>

        <Card className="border-2 border-primary/20 overflow-hidden">
          <CardHeader className="text-center pb-6 bg-gradient-to-r from-primary/5 to-primary/10">
            <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-primary" />
            </div>
            <CardTitle className="text-3xl mb-4">Registration Summary</CardTitle>
            <p className="text-muted-foreground">
              Please review your registration details and proceed with payment
            </p>
          </CardHeader>
          
          <CardContent className="p-8">
            {/* Registration Details */}
            <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg p-6 mb-8">
              <h3 className="text-xl font-semibold mb-4">{getRegistrationTitle()}</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                {type === 'individual' && (
                  <>
                    <p>• Access to all conference sessions and workshops</p>
                    <p>• Networking opportunities with industry leaders</p>
                    <p>• Conference materials and digital resources</p>
                    <p>• Certificate of participation</p>
                    <p>• Welcome kit and refreshments</p>
                  </>
                )}
                {type === 'government' && subtype === 'state' && (
                  <>
                    <p>• Premium exhibition pavilion space</p>
                    <p>• Conference participation for up to 7 participants</p>
                    <p>• Priority networking sessions</p>
                    <p>• Dedicated support and coordination</p>
                    <p>• Enhanced promotional opportunities</p>
                  </>
                )}
                {type === 'organization' && sector === 'education' && (
                  <>
                    <p>• Exhibition booth for showcasing innovations</p>
                    <p>• University/institutional branding opportunities</p>
                    <p>• Student and faculty networking sessions</p>
                    <p>• Academic collaboration platforms</p>
                    <p>• Research presentation opportunities</p>
                  </>
                )}
                {(type === 'organization' && (sector === 'professional-bodies' || sector === 'product-company')) && (
                  <>
                    {wantsExhibition && <p>• Exhibition booth for product/service showcase</p>}
                    {wantsConference && <p>• Conference participation for selected participants</p>}
                    <p>• Business networking and partnership opportunities</p>
                    <p>• Industry-specific breakout sessions</p>
                    <p>• Marketing and promotional benefits</p>
                    <p>• Access to investor and buyer meetings</p>
                  </>
                )}
                {type === 'government' && subtype === 'federal' && (
                  <>
                    {wantsExhibition && <p>• Government exhibition booth</p>}
                    {wantsConference && <p>• Conference participation for selected staff</p>}
                    <p>• Policy and strategy presentation opportunities</p>
                    <p>• Inter-agency collaboration platforms</p>
                    <p>• Public sector innovation showcase</p>
                    <p>• Certificate of participation for all attendees</p>
                  </>
                )}
              </div>
            </div>

            {/* Payment Summary */}
            <div className="border-2 border-primary/20 rounded-xl p-8 mb-8 bg-gradient-to-br from-background to-primary/5">
              <div className="flex items-center justify-center mb-6">
                <CreditCard className="h-8 w-8 text-primary mr-3" />
                <h3 className="text-2xl font-bold">Payment Summary</h3>
              </div>
              
              <div className="space-y-4">
                {renderPaymentBreakdown()}
                <div className="flex justify-between items-center py-3 border-b-2 border-primary/20">
                  <span className="text-xl font-semibold">Total Amount</span>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-primary">₦{formatAmount(totalAmount)}</div>
                    <div className="text-sm text-muted-foreground">Nigerian Naira</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Button */}
            <div className="text-center">
              {paymentStatus === 'success' ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-center text-green-600 mb-4">
                    <CheckCircle className="h-8 w-8 mr-2" />
                    <span className="text-lg font-semibold">Payment Successful!</span>
                  </div>
                  <p className="text-muted-foreground">
                    Redirecting to your dashboard...
                  </p>
                </div>
              ) : (
                <>
                  <Button 
                    size="lg"
                    onClick={handlePayment}
                    disabled={isProcessing || paymentStatus === 'processing'}
                    className="w-full max-w-md bg-gradient-to-r from-primary to-primary/80 text-primary-foreground hover:from-primary/90 hover:to-primary/70 text-lg py-6 font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin mr-2" />
                        Processing Payment...
                      </>
                    ) : (
                      <>
                        <Lock className="h-5 w-5 mr-2" />
                        Pay ₦{formatAmount(totalAmount)} Securely
                      </>
                    )}
                  </Button>
                  
                  <div className="flex items-center justify-center gap-2 mt-4 text-sm text-muted-foreground">
                    <Lock className="h-4 w-4" />
                    <span>Secured by Paystack • SSL Encrypted</span>
                  </div>
                </>
              )}
            </div>

            {/* Contact Support */}
            <div className="mt-12 text-center p-6 bg-muted/30 rounded-lg">
              <h4 className="font-semibold mb-2">Need Help?</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Contact our registration support team for assistance
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="tel:+2348096430859" 
                  className="text-primary hover:underline font-medium"
                >
                  +234 809 643 0859
                </a>
                <a 
                  href="tel:+2348036500822" 
                  className="text-primary hover:underline font-medium"
                >
                  +234 803 650 0822
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
};

export default Payment;