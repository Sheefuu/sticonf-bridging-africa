import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Phone, X } from "lucide-react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactModal = ({ isOpen, onClose }: ContactModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto">
        <DialogHeader className="text-center">
          <DialogTitle className="text-2xl font-bold mb-4">Contact Us</DialogTitle>
        </DialogHeader>
        
        <div className="text-center py-6">
          <Phone className="w-12 h-12 mx-auto mb-4 text-primary" />
          <p className="text-lg mb-2">Call us at:</p>
          <a 
            href="tel:+2348096430859" 
            className="text-3xl font-bold text-primary hover:text-primary/80 transition-colors"
          >
            +234 80 964 308 59
          </a>
        </div>
        
        <Button 
          onClick={onClose}
          variant="outline" 
          className="w-full mt-4"
        >
          <X className="w-4 h-4 mr-2" />
          Close
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default ContactModal;