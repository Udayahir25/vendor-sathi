import { Link } from "react-router-dom";
import { Store, Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-foreground/20 rounded-lg flex items-center justify-center">
                <Store className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">VendorSathi</span>
            </div>
            <p className="text-primary-foreground/80 text-sm">
              Empowering street food vendors across India with reliable supply chain solutions.
            </p>
          </div>

          {/* For Vendors */}
          <div className="space-y-4">
            <h3 className="font-semibold">For Vendors</h3>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li><Link to="/vendor" className="hover:text-primary-foreground transition-colors">Browse Materials</Link></li>
              <li><Link to="/vendor/orders" className="hover:text-primary-foreground transition-colors">Track Orders</Link></li>
              <li><Link to="/vendor/suppliers" className="hover:text-primary-foreground transition-colors">Find Suppliers</Link></li>
              <li><Link to="/vendor/help" className="hover:text-primary-foreground transition-colors">Help & Support</Link></li>
            </ul>
          </div>

          {/* For Suppliers */}
          <div className="space-y-4">
            <h3 className="font-semibold">For Suppliers</h3>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li><Link to="/supplier" className="hover:text-primary-foreground transition-colors">List Products</Link></li>
              <li><Link to="/supplier/orders" className="hover:text-primary-foreground transition-colors">Manage Orders</Link></li>
              <li><Link to="/supplier/analytics" className="hover:text-primary-foreground transition-colors">Sales Analytics</Link></li>
              <li><Link to="/supplier/help" className="hover:text-primary-foreground transition-colors">Seller Support</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold">Contact Us</h3>
            <div className="space-y-2 text-sm text-primary-foreground/80">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>hello@vendorsathi.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>Mumbai, Maharashtra</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-sm text-primary-foreground/60">
          <p>&copy; 2024 VendorSathi. All rights reserved. Made with ❤️ for Indian street food vendors.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;