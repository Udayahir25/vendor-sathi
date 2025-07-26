import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Heart, Users, Zap, Shield } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-muted/30 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-foreground">About VendorSathi</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Empowering India's street food ecosystem with technology, trust, and community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Heart className="w-5 h-5 mr-2 text-secondary" />
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                To simplify the supply chain for street food vendors across India, helping them save time, 
                reduce costs, and focus on what they do best - serving delicious food to their communities.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="w-5 h-5 mr-2 text-primary" />
                Community First
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Built by understanding real challenges faced by vendors. Every feature is designed 
                with feedback from street food entrepreneurs across Mumbai, Delhi, Bangalore, and beyond.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Zap className="w-5 h-5 mr-2 text-secondary" />
                Simple & Fast
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                No complicated processes. Order materials in minutes, track deliveries in real-time, 
                and manage your supply chain from your mobile phone.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="w-5 h-5 mr-2 text-primary" />
                Trust & Quality
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                All suppliers are verified through background checks. Community ratings and reviews 
                ensure you always get fresh, quality materials at fair prices.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4 text-foreground">Ready to Join?</h2>
          <p className="text-muted-foreground mb-6">
            Whether you're a vendor looking for reliable supplies or a supplier wanting to reach more customers,
            VendorSathi is here for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth?mode=vendor">
              <Button variant="vendor" size="lg">
                Join as Vendor
              </Button>
            </Link>
            <Link to="/auth?mode=supplier">
              <Button variant="supplier" size="lg">
                Join as Supplier
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
