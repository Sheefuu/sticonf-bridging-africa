import footerImage from "@/assets/footer-cta.png";
import sticonfLogo from "@/assets/sticonf-logo.png";

const Footer = () => {
  return (
    <footer className="mt-20">
      {/* CTA Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Be Part of the Transformation</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join industry leaders, researchers, and innovators in shaping the future of science-driven industrialization. 
            Your participation can make a difference in economic transformation.
          </p>
          <div className="text-2xl font-bold text-yellow-600 mb-8">
            ...the future is NOW!
          </div>
        </div>
      </section>

      {/* Footer Content */}
      <section className="py-12 px-4 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Conference Info */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 flex items-center justify-center">
                  <img src={sticonfLogo} alt="STIConf Logo" className="w-full h-full object-contain" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">STIConf 2026</h3>
                  <p className="text-sm text-blue-100">Science • Technology • Innovation</p>
                </div>
              </div>
              <p className="text-blue-100 text-sm mb-4">
                International Conference on Science, Technology & Innovation - 
                Innovate to Industrialize: The Role of Science and Technology in 
                Economic Transformation
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-blue-100">
                <li><a href="/about" className="hover:text-white transition-colors">About Conference</a></li>
                <li><a href="/schedule" className="hover:text-white transition-colors">Schedule</a></li>
                <li><a href="/sponsorship" className="hover:text-white transition-colors">Registration</a></li>
                <li><a href="/contact" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="/sponsorship" className="hover:text-white transition-colors">Sponsorship</a></li>
              </ul>
            </div>

            {/* Contact Information */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Information</h4>
              <div className="space-y-3 text-blue-100">
                <div>
                  <p className="font-medium">Email:</p>
                  <p className="text-sm"> sticonfinternational@gmail.com</p>
                </div>
                <div>
                  <p className="font-medium">Phone:</p>
                  <p className="text-sm">+234 (0) 80 964 308 59</p>
                </div>
                <div>
                  <p className="font-medium">Location:</p>
                  <p className="text-sm">Abuja, Nigeria</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-blue-400/30 mt-8 pt-8 text-center">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-blue-100 text-sm">© 2009-2025 wellcometonigera. All rights reserved.</p>
              <div className="flex gap-6 text-sm text-blue-100">
              </div>
            </div>
            <div className="mt-4 text-center">
              <p className="text-yellow-400 font-semibold">...the future is NOW!</p>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
};

export default Footer;