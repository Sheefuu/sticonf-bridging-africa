import { useState } from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeft, Landmark } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";

interface GovernmentFormData {
  organizationName: string;
  email: string;
  phoneNumber: string;
  governmentType: string;
}

const GovernmentRegistration = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedType, setSelectedType] = useState("");
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<GovernmentFormData>();

  const onSubmit = async (data: GovernmentFormData) => {
    setIsSubmitting(true);
    // Simulate form submission
    console.log("Government Registration Data:", data);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    window.location.href = '/registration/payment';
  };

  const handleTypeChange = (value: string) => {
    setSelectedType(value);
    setValue("governmentType", value);
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
              <Landmark className="h-10 w-10 text-primary" />
            </div>
            <CardTitle className="text-3xl mb-4">Government Registration</CardTitle>
            <p className="text-muted-foreground">
              Register your government agency for STIConf 2026
            </p>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                <Label className="text-base font-semibold">Government Type *</Label>
                <RadioGroup
                  value={selectedType}
                  onValueChange={handleTypeChange}
                  className="space-y-4"
                >
                  <Card className="border border-muted hover:border-primary/40 transition-colors">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value="state-government" id="state-government" />
                        <div className="space-y-1">
                          <Label htmlFor="state-government" className="text-base font-medium cursor-pointer">
                            State Government
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            State ministries, departments, agencies, and parastatals
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border border-muted hover:border-primary/40 transition-colors">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value="federal-government-mda" id="federal-government-mda" />
                        <div className="space-y-1">
                          <Label htmlFor="federal-government-mda" className="text-base font-medium cursor-pointer">
                            Federal Government MDAs
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Federal ministries, departments, and agencies
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </RadioGroup>
                <input
                  type="hidden"
                  {...register("governmentType", { required: "Government type selection is required" })}
                />
                {errors.governmentType && (
                  <p className="text-sm text-destructive">{errors.governmentType.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="organizationName">Agency/Ministry Name *</Label>
                <Input
                  id="organizationName"
                  placeholder="Enter your agency or ministry name"
                  {...register("organizationName", { 
                    required: "Agency/Ministry name is required",
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

export default GovernmentRegistration;