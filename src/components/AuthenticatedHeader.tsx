import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/hooks/useAuth";
import { User, Settings, LogOut, Ticket, CreditCard, Menu } from "lucide-react";
import sticonfLogo from "@/assets/sticonf-logo.png";
import { useNavigate, Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
const AuthenticatedHeader = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const {
    user,
    signOut
  } = useAuth();
  const navigate = useNavigate();
  const {
    toast
  } = useToast();
  const handleSignOut = async () => {
    const {
      error
    } = await signOut();
    if (error) {
      toast({
        title: "Error signing out",
        description: error.message,
        variant: "destructive"
      });
    } else {
      navigate('/');
    }
  };
  if (!user) {
    return <header className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b border-border/40">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/">
              <img src={sticonfLogo} alt="STIConf Logo" className="h-10 w-auto" />
            </Link>
            
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
      </header>;
  }
  return <header className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b border-border/40">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/">
            <img src={sticonfLogo} alt="STIConf Logo" className="h-10 w-auto" />
          </Link>
          
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
              <div className="pt-4 border-t border-border space-y-2">
                <Button size="sm" className="w-full" asChild>
                  <a href="/registration" onClick={() => setIsMobileMenuOpen(false)}>
                    <Ticket className="h-4 w-4 mr-2" />
                    Register
                  </a>
                </Button>
                
                <div className="space-y-2 pt-2">
                  <a 
                    href="/dashboard" 
                    className="flex items-center text-foreground hover:text-primary transition-colors py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Ticket className="h-4 w-4 mr-2" />
                    My Dashboard
                  </a>
                  <a 
                    href="/registration" 
                    className="flex items-center text-foreground hover:text-primary transition-colors py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <CreditCard className="h-4 w-4 mr-2" />
                    New Registration
                  </a>
                  <button 
                    onClick={handleSignOut}
                    className="flex items-center text-red-600 hover:text-red-700 transition-colors py-2 w-full text-left"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign out
                  </button>
                </div>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
        
        <div className="hidden md:flex items-center gap-3">
          <Button size="sm" asChild>
            <a href="/registration">
              <Ticket className="h-4 w-4 mr-2" />
              Register
            </a>
          </Button>
          
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-primary" />
                </div>
                <span className="hidden sm:inline">Account</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuLabel>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Signed in as</p>
                  <p className="text-xs text-muted-foreground truncate">
                    {user.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              
              <DropdownMenuItem asChild>
                <a href="/dashboard" className="flex items-center">
                  <Ticket className="h-4 w-4 mr-2" />
                  <span>My Dashboard</span>
                </a>
              </DropdownMenuItem>
              
              <DropdownMenuItem asChild>
                <a href="/registration" className="flex items-center">
                  <CreditCard className="h-4 w-4 mr-2" />
                  <span>New Registration</span>
                </a>
              </DropdownMenuItem>
              
              <DropdownMenuItem disabled>
                <Settings className="h-4 w-4 mr-2" />
                <span>Settings</span>
                <Badge variant="secondary" className="ml-auto text-xs">
                  Soon
                </Badge>
              </DropdownMenuItem>
              
              <DropdownMenuSeparator />
              
              <DropdownMenuItem onClick={handleSignOut} className="text-red-600">
                <LogOut className="h-4 w-4 mr-2" />
                <span>Sign out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>;
};
export default AuthenticatedHeader;