import { useState } from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Building2 } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";

interface OrganizationFormData {
  organizationName: string;
  email: string;
  phoneNumber: string;
  sector: string;
  wantsExhibition: boolean;
  wantsConference: boolean;
  numberOfParticipants: number;
}

const OrganizationRegistration = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedSector, setSelectedSector] = useState("");
  const [wantsExhibition, setWantsExhibition] = useState(false);
  const [wantsConference, setWantsConference] = useState(false);
  const [numberOfParticipants, setNumberOfParticipants] = useState(1);
  
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<OrganizationFormData>();

  const handleSectorChange = (value: string) => {
    setSelectedSector(value);
    setValue("sector", value);
    
    // Set default options based on sector
    if (value === "education") {
      setWantsExhibition(true);
      setWantsConference(false);
      setValue("wantsExhibition", true);
      setValue("wantsConference", false);
    } else {
      setWantsExhibition(true);
      setWantsConference(false);
      setValue("wantsExhibition", true);  
      setValue("wantsConference", false);
    }
  };

  const calculateTotal = () => {
    let exhibitionFee = 0;
    let conferenceFee = 0;
    
    if (wantsExhibition) {
      if (selectedSector === "education") exhibitionFee = 350000;
      else if (selectedSector === "professional-bodies") exhibitionFee = 500000;
      else if (selectedSector === "product-company") exhibitionFee = 350000;
    }
    
    if (wantsConference) {
      if (selectedSector === "professional-bodies") conferenceFee = 300000 * numberOfParticipants;
      else if (selectedSector === "product-company") conferenceFee = 250000 * numberOfParticipants;
    }
    
    return exhibitionFee + conferenceFee;
  };

  const onSubmit = async (data: OrganizationFormData) => {
    setIsSubmitting(true);
    console.log("Organization Registration Data:", data);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    
    const total = calculateTotal();
    let exhibitionFee = 0;
    let conferenceFee = 0;
    
    if (wantsExhibition) {
      if (selectedSector === "education") exhibitionFee = 350000;
      else if (selectedSector === "professional-bodies") exhibitionFee = 500000;
      else if (selectedSector === "product-company") exhibitionFee = 350000;
    }
    
    if (wantsConference) {
      if (selectedSector === "professional-bodies") conferenceFee = 300000;
      else if (selectedSector === "product-company") conferenceFee = 250000;
    }
    
    // Redirect to payment with organization details
    const params = new URLSearchParams({
      type: 'organization',
      sector: selectedSector,
      wantsExhibition: wantsExhibition.toString(),
      wantsConference: wantsConference.toString(),
      numberOfParticipants: numberOfParticipants.toString(),
      exhibitionFee: exhibitionFee.toString(),
      conferenceFee: conferenceFee.toString(),
      totalAmount: total.toString()
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
              <Building2 className="h-10 w-10 text-primary" />
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
                <Select value={selectedSector} onValueChange={handleSectorChange}>
                  <SelectTrigger className={!selectedSector ? "border-destructive" : ""}>
                    <SelectValue placeholder="Select your organization sector" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="education">Universities/Higher Institutions</SelectItem>
                    <SelectItem value="professional-bodies">Professional Bodies</SelectItem>
                    <SelectItem value="product-company">Product Companies</SelectItem>
                  </SelectContent>
                </Select>
                {!selectedSector && (
                  <p className="text-sm text-destructive">Sector is required</p>
                )}
              </div>

              {selectedSector && (
                <div className="space-y-4 p-4 bg-muted/30 rounded-lg">
                  <h4 className="font-semibold">Registration Options</h4>
                  
                  {/* Exhibition Option */}
                  <div className="flex items-start space-x-3">
                    <Checkbox 
                      id="exhibition"
                      checked={wantsExhibition}
                      onCheckedChange={(checked) => {
                        setWantsExhibition(checked as boolean);
                        setValue("wantsExhibition", checked as boolean);
                      }}
                      disabled={selectedSector === "education"} // Universities must have exhibition
                    />
                    <div className="space-y-1">
                      <Label htmlFor="exhibition" className="text-sm font-medium">
                        Exhibition {selectedSector === "education" ? "Booth" : "Booth"} 
                        {selectedSector === "education" && " (Required)"}
                      </Label>
                      <p className="text-xs text-muted-foreground">
                        {selectedSector === "education" && "₦350,000"}
                        {selectedSector === "professional-bodies" && "₦500,000"}  
                        {selectedSector === "product-company" && "₦350,000"}
                      </p>
                    </div>
                  </div>

                  {/* Conference Option - Only for Professional Bodies and Product Companies */}
                  {(selectedSector === "professional-bodies" || selectedSector === "product-company") && (
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <Checkbox 
                          id="conference"
                          checked={wantsConference}
                          onCheckedChange={(checked) => {
                            setWantsConference(checked as boolean);
                            setValue("wantsConference", checked as boolean);
                          }}
                        />
                        <div className="space-y-1">
                          <Label htmlFor="conference" className="text-sm font-medium">
                            Conference Participation
                          </Label>
                          <p className="text-xs text-muted-foreground">
                            {selectedSector === "professional-bodies" && "₦300,000 per participant"}
                            {selectedSector === "product-company" && "₦250,000 per participant"}
                          </p>
                        </div>
                      </div>
                      
                      {wantsConference && (
                        <div className="ml-6 space-y-2">
                          <Label htmlFor="participants">Number of Participants *</Label>
                          <Input
                            id="participants"
                            type="number"
                            min="1"
                            value={numberOfParticipants}
                            onChange={(e) => {
                              const value = parseInt(e.target.value) || 1;
                              setNumberOfParticipants(value);
                              setValue("numberOfParticipants", value);
                            }}
                            className="w-32"
                          />
                        </div>
                      )}
                    </div>
                  )}

                  {/* Total Preview */}
                  <div className="pt-3 border-t border-border">
                    <div className="flex justify-between items-center font-semibold">
                      <span>Estimated Total:</span>
                      <span className="text-primary">₦{calculateTotal().toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                disabled={isSubmitting || !selectedSector}
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