import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  ShoppingCart, 
  Filter,
  Star,
  MapPin,
  Clock,
  Plus,
  Minus,
  Package,
  TrendingUp,
  Calendar
} from "lucide-react";

const VendorDashboard = () => {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  // ✅ Role check inside component
  useEffect(() => {
    const fetchUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        window.location.href = "/auth";
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", session.user.id)
        .single();

      if (error || data?.role !== "vendor") {
        window.location.href = "/auth";
      }
    };

    fetchUser();
  }, []);

  const categories = [
    { id: "vegetables", name: "Vegetables", icon: "🥬" },
    { id: "spices", name: "Spices", icon: "🌶️" },
    { id: "grains", name: "Grains & Pulses", icon: "🌾" },
    { id: "dairy", name: "Dairy", icon: "🥛" },
  ];

  const products = [
    {
      id: 1,
      name: "Fresh Onions",
      category: "vegetables",
      price: 25,
      unit: "kg",
      supplier: "Ram Vegetables",
      rating: 4.5,
      distance: "2.3 km",
      image: "🧅",
      stock: 100
    },
    {
      id: 2,
      name: "Tomatoes",
      category: "vegetables", 
      price: 30,
      unit: "kg",
      supplier: "Fresh Farm Co.",
      rating: 4.8,
      distance: "1.8 km",
      image: "🍅",
      stock: 150
    },
    {
      id: 3,
      name: "Red Chili Powder",
      category: "spices",
      price: 120,
      unit: "kg",
      supplier: "Spice Master",
      rating: 4.7,
      distance: "3.1 km", 
      image: "🌶️",
      stock: 50
    },
    {
      id: 4,
      name: "Basmati Rice",
      category: "grains",
      price: 85,
      unit: "kg",
      supplier: "Grain Valley",
      rating: 4.6,
      distance: "2.9 km",
      image: "🌾",
      stock: 200
    }
  ];

  const recentOrders = [
    {
      id: "ORD001",
      date: "2024-01-20",
      status: "Delivered",
      total: 450,
      items: 5,
      supplier: "Ram Vegetables"
    },
    {
      id: "ORD002", 
      date: "2024-01-18",
      status: "In Transit",
      total: 320,
      items: 3,
      supplier: "Spice Master"
    }
  ];

  const addToCart = (product: any) => {
    const existingItem = cartItems.find(item => item.id === product.id);
    if (existingItem) {
      setCartItems(cartItems.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const updateQuantity = (productId: number, change: number) => {
    setCartItems(cartItems.map(item => {
      if (item.id === productId) {
        const newQuantity = item.quantity + change;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
      }
      return item;
    }).filter(Boolean));
  };

  const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <div className="min-h-screen bg-muted/30">
      {/* --- HEADER, MAIN, TABS, PRODUCTS, CART CODE REMAINS SAME --- */}
      {/* The rest of your component is unchanged */}
    </div>
  );
};

export default VendorDashboard;
