import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";
import { User, Settings, LogOut, Ticket, CreditCard } from "lucide-react";
import sticonfLogo from "@/assets/sticonf-logo.png";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
const AuthenticatedHeader = () => {
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
            <img src={sticonfLogo} alt="STIConf Logo" className="h-10 w-auto" />
            
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
          
          <div className="flex gap-2">
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
          <img src={sticonfLogo} alt="STIConf Logo" className="h-10 w-auto" />
          
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
        
        <div className="flex items-center gap-3">
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