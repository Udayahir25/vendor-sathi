import { useLocation, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { Menu, X, ShoppingCart, Store, User } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [role, setRole] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
        const { data, error } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", user.id)
          .single();
        if (!error && data) {
          setRole(data.role);
        }
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setRole(null);
    navigate("/auth");
  };

  const isActive = (path: string) => location.pathname === path;

  const baseNavigation = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
  ];

  const vendorLinks = [
    { name: "Vendor Dashboard", href: "/vendor" },
    { name: "Orders", href: "/vendor/orders" },
  ];

  const supplierLinks = [
    { name: "Supplier Dashboard", href: "/supplier" },
    { name: "Manage Stock", href: "/supplier/manage" },
  ];

  const roleBasedNavigation = role === "vendor" ? vendorLinks
                          : role === "supplier" ? supplierLinks
                          : [
                              { name: "For Vendors", href: "/vendor" },
                              { name: "For Suppliers", href: "/supplier" }
                            ];

  const navigation = [...baseNavigation, ...roleBasedNavigation];

  return (
    <nav className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-primary-glow rounded-lg flex items-center justify-center">
                <Store className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-primary">VendorSathi</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? "text-primary border-b-2 border-primary"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-sm text-muted-foreground">Hi, {user.email}</span>
                <Button onClick={handleLogout} variant="outline" size="sm">
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/auth">
                  <Button variant="outline" size="sm">
                    <User className="w-4 h-4 mr-2" />
                    Login
                  </Button>
                </Link>
                <Link to="/auth?mode=vendor">
                  <Button variant="vendor" size="sm">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Order Now
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-muted-foreground hover:text-primary hover:bg-accent"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-background border-t border-border">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 text-base font-medium transition-colors ${
                  isActive(item.href)
                    ? "text-primary bg-accent"
                    : "text-muted-foreground hover:text-primary hover:bg-accent"
                }`}
              >
                {item.name}
              </Link>
            ))}

            {user ? (
              <div className="flex items-center gap-4 px-3 py-2">
                <button onClick={handleLogout} className="text-sm text-muted-foreground hover:underline">
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/auth" onClick={() => setIsOpen(false)}>
                <Button variant="outline" size="sm" className="w-full">
                  Login
                </Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
