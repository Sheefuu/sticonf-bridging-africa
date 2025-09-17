import { useState } from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Building } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";

interface OrganizationFormData {
  organizationName: string;
  email: string;
  phoneNumber: string;
  sector: string;
}

const OrganizationRegistration = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedSector, setSelectedSector] = useState("");
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<OrganizationFormData>();

  const onSubmit = async (data: OrganizationFormData) => {
    setIsSubmitting(true);
    // Simulate form submission
    console.log("Organization Registration Data:", data);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    window.location.href = '/registration/payment';
  };

  const handleSectorChange = (value: string) => {
    setSelectedSector(value);
    setValue("sector", value);
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

        <Card className="border-2 border-accent/20">
          <CardHeader className="text-center pb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-accent/10 to-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Building className="h-10 w-10 text-accent" />
            </div>
            <CardTitle className="text-3xl mb-4">Organization Registration</CardTitle>
            <p className="text-muted-foreground">
              Register your organization for STIConf 2026
            </p>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="organizationName">Organization/Company Name *</Label>
                <Input
                  id="organizationName"
                  placeholder="Enter your organization name"
                  {...register("organizationName", { 
                    required: "Organization name is required",
                    minLength: { value: 2, message: "Organization name must be at least 2 characters" }
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
                  placeholder="Enter your email address"
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

              <div className="space-y-2">
                <Label htmlFor="sector">Sector *</Label>
                <Select onValueChange={handleSectorChange} value={selectedSector}>
                  <SelectTrigger className={errors.sector ? "border-destructive" : ""}>
                    <SelectValue placeholder="Select your sector" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="professional-bodies">Professional Bodies</SelectItem>
                    <SelectItem value="product-company">Product Company</SelectItem>
                  </SelectContent>
                </Select>
                <input
                  type="hidden"
                  {...register("sector", { required: "Sector selection is required" })}
                />
                {errors.sector && (
                  <p className="text-sm text-destructive">{errors.sector.message}</p>
                )}
              </div>

              <Button 
                type="submit" 
                className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
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

export default OrganizationRegistration;