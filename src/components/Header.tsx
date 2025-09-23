import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useState } from "react";
import sticonfLogo from "@/assets/sticonf-logo.png";
import {Link} from 'react-router-dom';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b border-border/40">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/home">
              <img src={sticonfLogo} alt="STIConf Logo" className="h-10 w-auto" />
          </Link>
            
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

        {/* Mobile Menu */}
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="mr-2">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <nav className="flex flex-col space-y-4 mt-8">
              <a 
                href="/" 
                className="text-foreground hover:text-primary transition-colors py-2 text-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </a>
              <a 
                href="/about" 
                className="text-foreground hover:text-primary transition-colors py-2 text-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </a>
              <a 
                href="/schedule" 
                className="text-foreground hover:text-primary transition-colors py-2 text-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Schedule
              </a>
              <a 
                href="/sponsorship" 
                className="text-foreground hover:text-primary transition-colors py-2 text-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sponsorship
              </a>
              <a 
                href="/contact" 
                className="text-foreground hover:text-primary transition-colors py-2 text-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </a>
              <div className="pt-4 border-t border-border">
                <Button variant="ghost" className="w-full justify-start mb-2" asChild>
                  <a href="/auth" onClick={() => setIsMobileMenuOpen(false)}>Sign In</a>
                </Button>
                <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90" asChild>
                  <a href="/registration" onClick={() => setIsMobileMenuOpen(false)}>Register Now</a>
                </Button>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
        
        <div className="hidden md:flex gap-2">
          <Button variant="ghost" size="sm" asChild>
            <a href="/auth">Sign In</a>
          </Button>
          <Button className="bg-accent text-accent-foreground hover:bg-accent/90" asChild>
            <a href="/registration">Register Now</a>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;