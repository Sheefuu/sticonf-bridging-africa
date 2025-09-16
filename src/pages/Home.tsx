import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Target, Globe } from "lucide-react";
import ImageSlider from "@/components/ImageSlider";
import Footer from "@/components/Footer";

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Image Slider */}
      <section className="py-16 px-4 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900">
        <div className="container mx-auto">
          <ImageSlider />
        </div>
      </section>

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/10 to-accent/10"></div>
        <div className="container mx-auto text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-8 text-accent">
              STIConf 2026
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 font-medium">
              International Conference on Science, Technology and Innovation
            </p>
            <h2 className="text-2xl md:text-3xl font-semibold mb-12 text-white">
              Bridging the Tech Divide – Africa's Path to Global Competitiveness
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-4 bg-white text-blue-900 hover:bg-white/90">
                Register Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-4 border-2 border-white text-white bg-white/10 hover:bg-white hover:text-primary transition-all duration-300">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Key Highlights */}
      <section className="py-20 px-4 bg-background">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Conference Highlights
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A platform for transformative dialogue and collaboration
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="group text-center p-8 rounded-xl bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 hover:-translate-y-2">
              <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Users className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-primary">Global Network</h3>
              <p className="text-muted-foreground leading-relaxed">
                Connect with policymakers, researchers, innovators, and industry leaders from across Africa and beyond.
              </p>
            </div>
            
            <div className="group text-center p-8 rounded-xl bg-gradient-to-br from-accent/5 to-accent/10 border border-accent/20 hover:shadow-xl hover:shadow-accent/20 transition-all duration-300 hover:-translate-y-2">
              <div className="w-20 h-20 bg-gradient-to-br from-accent to-accent/80 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Target className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-accent">Innovation Focus</h3>
              <p className="text-muted-foreground leading-relaxed">
                Showcase cutting-edge innovations, startups, and research addressing Africa's development challenges.
              </p>
            </div>
            
            <div className="group text-center p-8 rounded-xl bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 hover:-translate-y-2">
              <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Globe className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-primary">Global Competitiveness</h3>
              <p className="text-muted-foreground leading-relaxed">
                Position Africa as a global player in AI, biotechnology, renewable energy, and industrial innovation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Conference Theme */}
      <section className="py-20 px-4 bg-gradient-to-br from-muted/30 to-muted/50">
        <div className="container mx-auto">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Conference Theme
            </h2>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl blur-xl"></div>
              <div className="relative bg-gradient-to-br from-card to-card/80 backdrop-blur-sm rounded-2xl p-10 border border-border/50 shadow-2xl">
                <div className="mb-8">
                  <div className="inline-block p-3 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full mb-6">
                    <div className="w-6 h-6 bg-gradient-to-r from-primary to-accent rounded-full"></div>
                  </div>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-8 text-foreground leading-tight">
                  "Bridging the Tech Divide – Africa's Path to Global Competitiveness in Science, Technology and Innovation"
                </h3>
                <div className="mt-8 flex justify-center">
                  <div className="flex items-center gap-2 text-sm text-primary font-medium">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                    Shaping Africa's Digital Future
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      <Footer />
    </div>
  );
};

export default Home;