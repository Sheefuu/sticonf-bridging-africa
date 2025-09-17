import { useState } from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";

interface StateGovernmentFormData {
  organizationName: string;
  email: string;
  phoneNumber: string;
}

const StateGovernmentRegistration = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<StateGovernmentFormData>();

  const onSubmit = async (data: StateGovernmentFormData) => {
    setIsSubmitting(true);
    console.log("State Government Registration Data:", data);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    
    // State Government: Fixed package ₦5,500,000 (Exhibition Pavilion + 7 participants)
    const params = new URLSearchParams({
      type: 'government',
      subtype: 'state',
      totalAmount: '5500000'
    });
    window.location.href = `/registration/payment?${params.toString()}`;
  };

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="container mx-auto max-w-2xl">
        <div className="mb-8">
          <Link 
            to="/registration" 
            className="inline-flex items-center gap-2 text-primary hover:underline mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Registration Options
          </Link>
        </div>

        <Card className="border-2 border-primary/20">
          <CardHeader className="text-center pb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-primary/10 to-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <MapPin className="h-10 w-10 text-primary" />
            </div>
            <CardTitle className="text-3xl mb-4">State Government Registration</CardTitle>
            <p className="text-muted-foreground">
              Register your state ministry, department, agency, or parastatal for STIConf 2026
            </p>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="organizationName">Name of State*</Label>
                <Input
                  id="organizationName"
                  placeholder="Enter your State"
                  {...register("organizationName", { 
                    required: "Ministry/Department/Agency name is required",
                    minLength: { value: 2, message: "Name must be at least 2 characters" }
                  })}
                  className={errors.organizationName ? "border-destructive" : ""}
                />
                {errors.organizationName && (
                  <p className="text-sm text-destructive">{errors.organizationName.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your official email address"
                  {...register("email", { 
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Please enter a valid email address"
                    }
                  })}
                  className={errors.email ? "border-destructive" : ""}
                />
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone Number *</Label>
                <Input
                  id="phoneNumber"
                  type="tel"
                  placeholder="e.g., 08012345678"
                  {...register("phoneNumber", { 
                    required: "Phone number is required",
                    pattern: {
                      value: /^[\+]?\d{1,16}$/,
                      message: "Please enter a valid phone number"
                    }
                  })}
                  className={errors.phoneNumber ? "border-destructive" : ""}
                />
                {errors.phoneNumber && (
                  <p className="text-sm text-destructive">{errors.phoneNumber.message}</p>
                )}
              </div>

              <Button 
                type="submit" 
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Complete Registration"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
};

export default StateGovernmentRegistration;