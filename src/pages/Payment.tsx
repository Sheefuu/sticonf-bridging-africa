import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowLeft, CreditCard } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import Footer from "@/components/Footer";

const Payment = () => {
  const [searchParams] = useSearchParams();
  const type = searchParams.get('type') || 'individual';
  const sector = searchParams.get('sector') || '';
  const category = searchParams.get('category') || '';
  const subtype = searchParams.get('subtype') || '';
  
  // For complex pricing
  const wantsExhibition = searchParams.get('wantsExhibition') === 'true';
  const wantsConference = searchParams.get('wantsConference') === 'true';
  const numberOfParticipants = parseInt(searchParams.get('numberOfParticipants') || '1');
  const exhibitionFee = parseInt(searchParams.get('exhibitionFee') || '0');
  const conferenceFee = parseInt(searchParams.get('conferenceFee') || '0');
  const totalAmount = parseInt(searchParams.get('totalAmount') || searchParams.get('amount') || '200000');
  
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
            <span className="text-lg">Exhibition Pavilion + 7 Participants</span>
            <span className="text-lg font-semibold">₦{formatAmount(5500000)}</span>
          </div>
        </div>
      );
    }

    // For organizations and federal government with itemized breakdown
    const items = [];
    
    if (wantsExhibition && exhibitionFee > 0) {
      let exhibitionLabel = 'Exhibition Booth';
      if (type === 'government' && subtype === 'state') {
        exhibitionLabel = 'Exhibition Pavilion';
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

    return <div className="space-y-4">{items}</div>;
  };
  
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="container mx-auto max-w-3xl">
        <div className="mb-8">
          <Link 
            to="/registration/individual" 
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
                <p>• Access to all conference sessions</p>
                <p>• Networking opportunities with industry leaders</p>
                <p>• Conference materials and digital resources</p>
                <p>• Certificate of participation</p>
                <p>• Welcome kit and refreshments</p>
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
              <Button 
                size="lg"
                className="w-full max-w-md bg-gradient-to-r from-primary to-primary/80 text-primary-foreground hover:from-primary/90 hover:to-primary/70 text-lg py-6 font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Proceed to Payment
              </Button>
              
              <p className="text-sm text-muted-foreground mt-4">
                Secure payment processing • Your information is protected
              </p>
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