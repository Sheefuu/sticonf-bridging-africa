import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar, MapPin, Users } from "lucide-react";
import { useState } from "react";
import ContactModal from "./ContactModal";
import heroImage from "@/assets/hero-conference.jpg";

const Hero = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <section id="home" className="min-h-screen bg-gradient-hero flex items-center text-white">
      <div className="container mx-auto px-4 py-20">
        <div className="text-center max-w-6xl mx-auto">
          {/* Conference Image */}
          <div className="mb-12 mx-auto w-full max-w-4xl h-64 rounded-lg overflow-hidden">
            <img 
              src={heroImage} 
              alt="STIConf International Conference on Science, Technology & Innovation" 
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Main Title */}
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            International Conference on Science, Technology
            <br />
            & Innovation
          </h1>
          
          {/* Subtitle */}
          <div className="text-xl md:text-2xl text-accent font-semibold mb-4">
            STIConf 2026
          </div>
          
          {/* Theme */}
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Bridging the Tech Divide
          </h2>
          
          {/* Subtitle description */}
          <p className="text-lg md:text-xl text-white/90 mb-12 max-w-4xl mx-auto">
            Africa's Path to Global Competitiveness in Science, Technology and Innovation
          </p>
          
          {/* Info Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
            <Card className="bg-white/10 backdrop-blur border-white/20 p-6 text-center">
              <Calendar className="w-12 h-12 mx-auto mb-4 text-accent" />
              <h3 className="text-lg font-semibold mb-2">Conference Dates</h3>
              <p className="text-white/90">March 26-27, 2026</p>
            </Card>
            
            <Card className="bg-white/10 backdrop-blur border-white/20 p-6 text-center">
              <MapPin className="w-12 h-12 mx-auto mb-4 text-accent" />
              <h3 className="text-lg font-semibold mb-2">Location</h3>
              <p className="text-white/90">Abuja, Nigeria</p>
            </Card>
            
            <Card className="bg-white/10 backdrop-blur border-white/20 p-6 text-center">
              <Users className="w-12 h-12 mx-auto mb-4 text-accent" />
              <h3 className="text-lg font-semibold mb-2">Expected Attendees</h3>
              <p className="text-white/90">500+ Participants</p>
            </Card>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-accent text-accent-foreground hover:bg-accent/90 px-8 py-3 text-lg"
              onClick={() => setIsContactModalOpen(true)}
            >
              Contact Us
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary px-8 py-3 text-lg">
              View Program
            </Button>
          </div>
        </div>
      </div>
      
      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
    </section>
  );
};

export default Hero;