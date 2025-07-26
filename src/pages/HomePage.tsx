import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ShoppingCart, 
  Store, 
  Clock, 
  MapPin, 
  Star, 
  TrendingUp,
  Truck,
  Shield,
  Users,
  CheckCircle
} from "lucide-react";
import heroImage from "@/assets/hero-market.jpg";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";


const HomePage = () => {
  const features = [
    {
      icon: ShoppingCart,
      title: "Easy Ordering",
      description: "Browse fresh vegetables, grains, and spices. Add to cart and order in minutes."
    },
    {
      icon: MapPin,
      title: "Local Suppliers",
      description: "Find verified suppliers near you with real-time pricing and availability."
    },
    {
      icon: Clock,
      title: "Schedule Delivery",
      description: "Choose delivery time that works for your business. Early morning deliveries available."
    },
    {
      icon: Star,
      title: "Rate & Review",
      description: "Share feedback about suppliers to help the community make informed choices."
    }
  ];

  const benefits = [
    {
      icon: TrendingUp,
      title: "Save Time",
      description: "No more early morning trips to wholesale markets"
    },
    {
      icon: Shield,
      title: "Verified Suppliers",
      description: "All suppliers are background-checked and verified"
    },
    {
      icon: Truck,
      title: "Doorstep Delivery",
      description: "Fresh materials delivered directly to your location"
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "Built by vendors, for vendors with community reviews"
    }
  ];

  const stats = [
    { number: "1000+", label: "Street Vendors" },
    { number: "500+", label: "Verified Suppliers" },
    { number: "50+", label: "Cities Covered" },
    { number: "10k+", label: "Orders Completed" }
  ];
  const [vendors, setVendors] = useState<any[]>([]);

useEffect(() => {
  const fetchVendors = async () => {
    const { data, error } = await supabase.from("vendors").select("*");
    if (error) {
      console.error("Supabase Error:", error.message);
    } else {
      setVendors(data);
    }
  };

  fetchVendors();
}, []);


  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-primary/80"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-6">
            Raw Materials for Street Food Vendors,
            <span className="text-secondary"> Delivered Fresh</span>
          </h1>
          <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 max-w-3xl mx-auto">
            Connect with verified suppliers. Order vegetables, spices, and grains. 
            Focus on cooking while we handle your supply chain.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/auth?mode=vendor">
              <Button variant="hero" size="lg" className="text-lg px-8 py-4">
                <ShoppingCart className="w-5 h-5 mr-2" />
                Start Ordering Today
              </Button>
            </Link>
            <Link to="/auth?mode=supplier">
              <Button variant="supplier" size="lg" className="text-lg px-8 py-4">
                <Store className="w-5 h-5 mr-2" />
                Become a Supplier
              </Button>
            </Link>
          </div>
          
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary-foreground">
                  {stat.number}
                </div>
                <div className="text-primary-foreground/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How VendorSathi Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Simple, fast, and reliable. Get the materials you need for your street food business.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Why Street Food Vendors Choose VendorSathi
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                We understand the challenges of running a street food business. 
                That's why we've built a platform that saves you time, money, and effort.
              </p>
              
              <div className="space-y-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <benefit.icon className="w-5 h-5 text-secondary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-foreground">{benefit.title}</h3>
                      <p className="text-muted-foreground">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-6 text-center">
                <CheckCircle className="w-8 h-8 text-primary mx-auto mb-2" />
                <h3 className="font-semibold mb-1">Quality Assured</h3>
                <p className="text-sm text-muted-foreground">Fresh materials only</p>
              </Card>
              <Card className="p-6 text-center mt-8">
                <Shield className="w-8 h-8 text-primary mx-auto mb-2" />
                <h3 className="font-semibold mb-1">Secure Payments</h3>
                <p className="text-sm text-muted-foreground">Multiple payment options</p>
              </Card>
              <Card className="p-6 text-center">
                <Truck className="w-8 h-8 text-primary mx-auto mb-2" />
                <h3 className="font-semibold mb-1">Fast Delivery</h3>
                <p className="text-sm text-muted-foreground">Same day delivery</p>
              </Card>
              <Card className="p-6 text-center mt-8">
                <Users className="w-8 h-8 text-primary mx-auto mb-2" />
                <h3 className="font-semibold mb-1">24/7 Support</h3>
                <p className="text-sm text-muted-foreground">Always here to help</p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary-glow">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8">
            Join thousands of street food vendors who are already saving time and money with VendorSathi.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth?mode=vendor">
              <Button variant="secondary" size="lg" className="text-lg px-8 py-4">
                <ShoppingCart className="w-5 h-5 mr-2" />
                Start Ordering - It's Free
              </Button>
            </Link>
            <Link to="/about">
              <Button variant="outline" size="lg" className="text-lg px-8 py-4 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>
      {/* Vendor List from Supabase */}
<section className="py-16 bg-muted/50">
  <div className="max-w-6xl mx-auto px-4">
    <h2 className="text-2xl font-bold mb-6">Vendors on Our Platform</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {vendors.map((vendor) => (
        <Card key={vendor.id} className="p-4">
          <CardHeader>
            <CardTitle>{vendor.name}</CardTitle>
            <CardDescription>{vendor.city}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{vendor.description || "No description available."}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
</section>

    </div>
  );
};

export default HomePage;