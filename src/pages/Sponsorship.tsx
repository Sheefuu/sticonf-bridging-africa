import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Star, Crown, Award, Gem } from "lucide-react";
import Footer from "@/components/Footer";

const Sponsorship = () => {
  const sponsorshipPackages = [
    {
      name: "Exclusive Partner",
      price: "₦35,000,000",
      icon: Crown,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200",
      features: [
        "Exclusive naming rights by your organisation",
        "Branding on all event's component",
        "Prime logo placement on all event scheme materials, and media materials associated with the conference",
        "Speaking opportunity at the event's opening & closing ceremony/closing",
        "VIP access for key executives meetings",
        "Prominent branding on digital platforms & event merchandise/full feature/ad on event programme",
        "Mainstream media mention – articles, stories, etc",
        "Customized exhibition pavilion (premium location)",
        "Social Media visibility for 3 months – pre and post event"
      ]
    },
    {
      name: "Platinum Sponsor",
      price: "₦30,000,000",
      icon: Gem,
      color: "text-gray-700",
      bgColor: "bg-gray-50",
      borderColor: "border-gray-200",
      features: [
        "Branding presence at the fair and 2 festivals of choice",
        "Prime logo placement on event scheme materials, and media materials associated with the conference",
        "Speaking opportunity at the event's opening & closing ceremonies",
        "VIP access for key executives meetings",
        "Prominent branding on digital platforms & event merchandise/full feature/ad on event programme",
        "Mainstream media mention – articles, stories, etc",
        "Free customized exhibition pavilion (premium location)",
        "Social Media visibility for 1 month – pre and post event"
      ]
    },
    {
      name: "Gold Sponsor",
      price: "₦25,500,000",
      icon: Award,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200",
      features: [
        "Speaking opportunity at the event's opening ceremonies",
        "Branding presence at the conference venue",
        "Prime logo placement on conference scheme materials",
        "Prominent branding on digital platforms & event merchandise/full feature/ad on event programme",
        "Mainstream media mention – articles, stories, etc",
        "Free exhibition booth/space (premium location)",
        "Logo on social media advertisement"
      ]
    },
    {
      name: "Silver Sponsor",
      price: "₦20,000,000",
      icon: Star,
      color: "text-gray-500",
      bgColor: "bg-gray-50",
      borderColor: "border-gray-200",
      features: [
        "Speaking opportunity at the event's conference closing ceremony",
        "Branding presence at the conference",
        "Prime logo placement on conference scheme materials",
        "Free exhibition booth",
        "Logo on social media advertisement"
      ]
    },
    {
      name: "Bronze Sponsor",
      price: "₦15,500,000",
      icon: Award,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
      features: [
        "Speaking opportunity at the event's closing ceremony",
        "Branding presence at the conference",
        "Prime logo placement on conference programme",
        "Free exhibition booth"
      ]
    }
  ];

  const brandingOptions = [
    { name: "Billboard", location: "Abuja", price: "₦10.5 million" },
    { name: "Road signage", location: "Abuja", price: "₦8.5 million" },
    { name: "Backdrop + Gift Items", price: "₦3,500,000" },
    { name: "Venue + branding", price: "₦3,500,000" },
    { name: "Booths + branding", price: "₦5,800,000" },
    { name: "T-shirt/Facecaps", price: "₦4,200,000" },
    { name: "ENEXFEST Programme", price: "₦3,500,000" }
  ];

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Sponsorship Opportunities</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Partner with us to shape Africa's future in Science, Technology and Innovation
          </p>
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-6 max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold mb-2">STIConf 2026 - 2nd Edition</h2>
            <p className="text-lg text-muted-foreground">"...the future is NOW!"</p>
          </div>
        </div>

        {/* Sponsorship Packages */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Sponsorship Packages</h2>
          <div className="grid lg:grid-cols-3 gap-8">
            {sponsorshipPackages.map((pkg, index) => {
              const IconComponent = pkg.icon;
              return (
                <Card 
                  key={index} 
                  className={`relative border-2 ${pkg.borderColor} ${pkg.bgColor} hover:shadow-lg transition-shadow`}
                >
                  <CardHeader className="text-center pb-4">
                    <div className={`w-16 h-16 ${pkg.bgColor} rounded-full flex items-center justify-center mx-auto mb-4 border-2 ${pkg.borderColor}`}>
                      <IconComponent className={`h-8 w-8 ${pkg.color}`} />
                    </div>
                    <CardTitle className="text-xl mb-2">{pkg.name}</CardTitle>
                    <div className="text-3xl font-bold text-primary">{pkg.price}</div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {pkg.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start gap-3">
                          <Check className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full mt-6">
                      Contact Us
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Branding Sponsorship */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Branding Sponsorship Options</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {brandingOptions.map((option, index) => (
              <Card key={index} className="border-border/50 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold mb-2">{option.name}</h3>
                    {option.location && (
                      <Badge variant="outline" className="mb-3">{option.location}</Badge>
                    )}
                    <div className="text-2xl font-bold text-primary mb-4">{option.price}</div>
                    <Button variant="outline" className="w-full">
                      Learn More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Why Sponsor */}
        <section className="mb-16">
          <Card className="border-border/50 bg-gradient-to-r from-primary/5 to-accent/5">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Why Sponsor STIConf 2026?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold mb-4">Brand Visibility</h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-600" />
                      Reach thousands of industry leaders and decision-makers
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-600" />
                      High-quality media coverage and social media exposure
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-600" />
                      Association with Africa's premier STI conference
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-4">Networking Opportunities</h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-600" />
                      Direct access to government officials and policymakers
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-600" />
                      Connect with leading researchers and innovators
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-600" />
                      Build partnerships for future collaborations
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Contact Information */}
        <section>
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Ready to Partner With Us?</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-lg text-muted-foreground mb-6">
                Contact our sponsorship team to discuss custom packages and opportunities
              </p>
              <div className="space-y-4 mb-8">
                <div>
                  <h4 className="font-semibold mb-2">For Collaboration and Sponsorship:</h4>
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
              <div className="bg-muted/30 rounded-lg p-6">
                <p className="text-sm text-muted-foreground mb-2">
                  In Partnership with:
                </p>
                <p className="font-semibold">
                  Federal Ministry of Innovation, Science And Technology
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  "...for Country, for People!"
                </p>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
      
      <Footer />
    </div>
  );
};

export default Sponsorship;