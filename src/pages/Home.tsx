import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Target, Globe } from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10"></div>
        <div className="container mx-auto text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              STIConf 2025
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-4 font-medium">
              International Conference on Science, Technology and Innovation
            </p>
            <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-foreground">
              Bridging the Tech Divide – Africa's Path to Global Competitiveness
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
              Join global leaders, innovators, and researchers as we chart Africa's path to technological excellence and economic transformation through Science, Technology and Innovation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-4">
                Register Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Key Highlights */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Conference Highlights</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A platform for transformative dialogue and collaboration
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-lg bg-card border border-border/50 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Global Network</h3>
              <p className="text-muted-foreground">
                Connect with policymakers, researchers, innovators, and industry leaders from across Africa and beyond.
              </p>
            </div>
            
            <div className="text-center p-8 rounded-lg bg-card border border-border/50 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Innovation Focus</h3>
              <p className="text-muted-foreground">
                Showcase cutting-edge innovations, startups, and research addressing Africa's development challenges.
              </p>
            </div>
            
            <div className="text-center p-8 rounded-lg bg-card border border-border/50 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Globe className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Global Competitiveness</h3>
              <p className="text-muted-foreground">
                Position Africa as a global player in AI, biotechnology, renewable energy, and industrial innovation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Conference Theme */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Conference Theme</h2>
            <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg p-8 border border-border/50">
              <h3 className="text-2xl md:text-3xl font-semibold mb-6 text-primary">
                "Bridging the Tech Divide – Africa's Path to Global Competitiveness in Science, Technology and Innovation"
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Science, Technology and Innovation (STI) are the driving forces of economic transformation in the 21st century. 
                For Africa, the technology divide presents both a challenge and an opportunity. This conference will focus on 
                bridging the technology divide through collaboration, knowledge exchange, and scalable innovation ecosystems.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Shape Africa's Future?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join us at STIConf 2025 and be part of the transformation
          </p>
          <Button size="lg" className="text-lg px-8 py-4">
            Register Today
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;