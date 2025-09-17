import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowLeft, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";

const Payment = () => {
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
              <h3 className="text-xl font-semibold mb-4">STIConf 2026 - Individual Registration</h3>
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
                <div className="flex justify-between items-center py-3 border-b border-border/50">
                  <span className="text-lg">Individual Registration Fee</span>
                  <span className="text-lg font-semibold">₦200,000</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b-2 border-primary/20">
                  <span className="text-xl font-semibold">Total Amount</span>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-primary">₦200,000</div>
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