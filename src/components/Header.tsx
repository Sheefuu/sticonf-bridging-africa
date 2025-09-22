import { Button } from "@/components/ui/button";
import sticonfLogo from "@/assets/sticonf-logo.png";

const Header = () => {
  return (
    <header className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b border-border/40">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <img 
            src={sticonfLogo} 
            alt="STIConf Logo" 
            className="h-10 w-auto"
          />
          <div className="text-lg font-semibold text-primary">STIConf 2026</div>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6 ml-auto mr-4">
          <a href="/" className="text-foreground hover:text-primary transition-colors">
            Home
          </a>
          <a href="/about" className="text-foreground hover:text-primary transition-colors">
            About
          </a>
          <a href="/schedule" className="text-foreground hover:text-primary transition-colors">
            Schedule
          </a>
          <a href="/sponsorship" className="text-foreground hover:text-primary transition-colors">
            Sponsorship
          </a>
          <a href="/contact" className="text-foreground hover:text-primary transition-colors">
            Contact
          </a>
        </nav>
        
        <Button className="bg-accent text-accent-foreground hover:bg-accent/90" asChild>
          <a href="/registration">Register Now</a>
        </Button>
      </div>
    </header>
  );
};

export default Header;