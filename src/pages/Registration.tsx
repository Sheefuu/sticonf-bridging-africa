import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { User, Building, MapPin, Building2 } from "lucide-react";
import { useState } from "react";
import Footer from "@/components/Footer";

const Registration = () => {
  const [showGovernmentModal, setShowGovernmentModal] = useState(false);

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Register for STIConf 2026</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Choose your registration type to join Africa's premier Science, Technology & Innovation conference
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {/* Individual Registration */}
          <Card className="border-2 border-primary/20 hover:border-primary/40 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <CardHeader className="text-center pb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-primary/10 to-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <User className="h-10 w-10 text-primary" />
              </div>
              <CardTitle className="text-2xl mb-4">Individual</CardTitle>
              <p className="text-muted-foreground">
                Perfect for researchers, academics, students, and professionals
              </p>
            </CardHeader>
            <CardContent className="text-center">
              <Button 
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={() => window.location.href = '/registration/individual'}
              >
                Register Now
              </Button>
            </CardContent>
          </Card>

          {/* Organization Registration */}
          <Card className="border-2 border-accent/20 hover:border-accent/40 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <CardHeader className="text-center pb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-accent/10 to-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Building className="h-10 w-10 text-accent" />
              </div>
              <CardTitle className="text-2xl mb-4">Organization</CardTitle>
              <p className="text-muted-foreground">
                Ideal for companies, NGOs, research institutions, and startups
              </p>
            </CardHeader>
            <CardContent className="text-center">
              <Button 
                className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
                onClick={() => window.location.href = '/registration/organization'}
              >
                Register Now
              </Button>
            </CardContent>
          </Card>

          {/* Government Registration */}
          <Card className="border-2 border-secondary/20 hover:border-secondary/40 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <CardHeader className="text-center pb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-secondary/10 to-secondary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Building2 className="h-10 w-10 text-secondary" />
              </div>
              <CardTitle className="text-2xl mb-4">Government</CardTitle>
              <p className="text-muted-foreground">
                For state and federal government ministries, departments, and agencies
              </p>
            </CardHeader>
            <CardContent className="text-center">
              <Button 
                className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90"
                onClick={() => setShowGovernmentModal(true)}
              >
               Register Now
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Government Options Modal */}
        <Dialog open={showGovernmentModal} onOpenChange={setShowGovernmentModal}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-center text-2xl">Choose Government Type</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              {/* State Government Option */}
              <Card className="border-2 border-primary/20 hover:border-primary/40 hover:shadow-lg transition-all duration-300 cursor-pointer"
                    onClick={() => {
                      setShowGovernmentModal(false);
                      window.location.href = '/registration/state-government';
                    }}>
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MapPin className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl mb-2">State Government</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    For state ministries, departments, agencies, and parastatals
                  </p>
                </CardHeader>
              </Card>

              {/* Federal MDA Option */}
              <Card className="border-2 border-primary/20 hover:border-primary/40 hover:shadow-lg transition-all duration-300 cursor-pointer"
                    onClick={() => {
                      setShowGovernmentModal(false);
                      window.location.href = '/registration/federal-mda';
                    }}>
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Building2 className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl mb-2">Federal MDA</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    For federal ministries, departments, and agencies
                  </p>
                </CardHeader>
              </Card>
            </div>
          </DialogContent>
        </Dialog>

        {/* Contact Information */}
        <section className="mt-20">
          <Card className="border-border/50 bg-gradient-to-r from-primary/5 to-accent/5">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Need Help with Registration?</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-lg text-muted-foreground mb-6">
                Contact our registration team for assistance or custom group packages
              </p>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Registration Support:</h4>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a 
                      href="tel:+2348096430859" 
                      className="text-primary hover:underline font-medium"
                    >
                      +234 809 643 0859
                    </a>
                    {/* <a 
                      href="tel:+2348036500822" 
                      className="text-primary hover:underline font-medium"
                    >
                      +234 803 650 0822
                    </a> */}
                  </div>
                </div>
                <div>
                  <a 
                    href="http://www.sticonf.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline font-medium"
                  >
                    www.sticonf.com
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
      
      <Footer />
    </div>
  );
};

export default Registration;