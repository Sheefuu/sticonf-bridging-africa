import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import AuthenticatedHeader from "./components/AuthenticatedHeader";
import { useAuth } from "./hooks/useAuth";
import Home from "./pages/Home";
import About from "./pages/About";
import Schedule from "./pages/Schedule";
import Sponsorship from "./pages/Sponsorship";
import Contact from "./pages/Contact";
import Registration from "./pages/Registration";
import IndividualRegistration from "./pages/IndividualRegistration";
import OrganizationRegistration from "./pages/OrganizationRegistration";
import StateGovernmentRegistration from "./pages/StateGovernmentRegistration";
import FederalMDARegistration from "./pages/FederalMDARegistration";
import Payment from "./pages/Payment";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen bg-background text-foreground">
            <AuthenticatedHeader />
            <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/sponsorship" element={<Sponsorship />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/registration/individual" element={<IndividualRegistration />} />
          <Route path="/registration/organization" element={<OrganizationRegistration />} />
          <Route path="/registration/state-government" element={<StateGovernmentRegistration />} />
          <Route path="/registration/federal-mda" element={<FederalMDARegistration />} />
          <Route path="/registration/payment" element={<Payment />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);
};

export default App;
