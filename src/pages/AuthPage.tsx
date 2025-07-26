import { useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShoppingCart, Store, Mail, Lock, User, Phone } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";


const AuthPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialMode = searchParams.get("mode") || "vendor";
  const [userType, setUserType] = useState<"vendor" | "supplier">(initialMode as "vendor" | "supplier");
  const [isLogin, setIsLogin] = useState(true);

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  const email = (document.getElementById("email") as HTMLInputElement).value;
  const password = (document.getElementById("password") as HTMLInputElement).value;

  if (isLogin) {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return alert("Login failed");

    const { data } = await supabase.from("profiles").select("role").eq("email", email).single();
    if (data?.role === "vendor") {
      window.location.href = "/vendor-dashboard";
    } else {
      window.location.href = "/supplier-dashboard";
    }

  } else {
    const { data: authData, error } = await supabase.auth.signUp({ email, password });
    if (error) return alert("Signup failed");

    const role = userType; // either 'vendor' or 'supplier'
    await supabase.from("profiles").insert([{ email, role }]);
    alert("Signup successful. Please log in.");
    setIsLogin(true);
  }
};



  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        {/* User Type Selection */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            {isLogin ? "Welcome Back" : "Join VendorSathi"}
          </h2>
          <p className="text-muted-foreground">
            {isLogin ? "Sign in to your account" : "Create your account to get started"}
          </p>
        </div>

        <Tabs value={userType} onValueChange={(value) => setUserType(value as "vendor" | "supplier")} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="vendor" className="flex items-center space-x-2">
              <ShoppingCart className="w-4 h-4" />
              <span>Vendor</span>
            </TabsTrigger>
            <TabsTrigger value="supplier" className="flex items-center space-x-2">
              <Store className="w-4 h-4" />
              <span>Supplier</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="vendor">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <ShoppingCart className="w-5 h-5 text-secondary" />
                  <span>Street Food Vendor</span>
                </CardTitle>
                <CardDescription>
                  Order raw materials from verified suppliers in your area
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {!isLogin && (
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="name"
                          placeholder="Enter your full name"
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                  )}
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  {!isLogin && (
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="phone"
                          placeholder="+91 98765 43210"
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <Button type="submit" variant="vendor" className="w-full">
                    {isLogin ? "Sign In as Vendor" : "Create Vendor Account"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="supplier">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Store className="w-5 h-5 text-primary" />
                  <span>Material Supplier</span>
                </CardTitle>
                <CardDescription>
                  Sell raw materials to street food vendors and grow your business
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {!isLogin && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="business-name">Business Name</Label>
                        <div className="relative">
                          <Store className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="business-name"
                            placeholder="Enter your business name"
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="owner-name">Owner Name</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="owner-name"
                            placeholder="Enter owner's full name"
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>
                    </>
                  )}
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  {!isLogin && (
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="phone"
                          placeholder="+91 98765 43210"
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <Button type="submit" variant="supplier" className="w-full">
                    {isLogin ? "Sign In as Supplier" : "Create Supplier Account"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="text-center space-y-4">
          <Button
            variant="ghost"
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm"
          >
            {isLogin 
              ? "Don't have an account? Sign up" 
              : "Already have an account? Sign in"
            }
          </Button>

          <div className="text-xs text-muted-foreground">
            By continuing, you agree to our{" "}
            <Link to="/terms" className="text-primary hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link to="/privacy" className="text-primary hover:underline">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;