import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { 
  Plus,
  Package,
  TrendingUp,
  Users,
  Clock,
  CheckCircle,
  X,
  Edit,
  Eye,
  Star,
  MapPin,
  Calendar,
  DollarSign
} from "lucide-react";

const SupplierDashboard = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Fresh Onions",
      price: 25,
      unit: "kg",
      stock: 100,
      category: "Vegetables",
      status: "active",
      image: "🧅"
    },
    {
      id: 2,
      name: "Red Chili Powder", 
      price: 120,
      unit: "kg",
      stock: 50,
      category: "Spices",
      status: "active",
      image: "🌶️"
    }
  ]);

  const orders = [
    {
      id: "ORD001",
      vendorName: "Ravi's Chaat Corner",
      items: [
        { name: "Fresh Onions", quantity: 5, price: 25 },
        { name: "Tomatoes", quantity: 3, price: 30 }
      ],
      total: 215,
      status: "pending",
      orderDate: "2024-01-20",
      deliveryTime: "Tomorrow 8:00 AM",
      vendorLocation: "Sector 15, Noida"
    },
    {
      id: "ORD002",
      vendorName: "Sharma Ji Samosa",
      items: [
        { name: "Red Chili Powder", quantity: 2, price: 120 }
      ],
      total: 240,
      status: "accepted",
      orderDate: "2024-01-19",
      deliveryTime: "Today 6:00 PM", 
      vendorLocation: "Connaught Place, Delhi"
    }
  ];

  const stats = [
    { title: "Total Sales", value: "₹45,230", icon: DollarSign, color: "text-green-600" },
    { title: "Active Products", value: "12", icon: Package, color: "text-blue-600" },
    { title: "Pending Orders", value: "8", icon: Clock, color: "text-orange-600" },
    { title: "Happy Vendors", value: "156", icon: Users, color: "text-purple-600" }
  ];

  const acceptOrder = (orderId: string) => {
    console.log(`Accepting order ${orderId}`);
    // TODO: Update order status in Supabase
  };

  const rejectOrder = (orderId: string) => {
    console.log(`Rejecting order ${orderId}`);
    // TODO: Update order status in Supabase
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <div className="bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Supplier Dashboard</h1>
              <p className="text-muted-foreground">Manage your products and orders</p>
            </div>
            <Button variant="supplier">
              <Plus className="w-4 h-4 mr-2" />
              Add New Product
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="orders" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="orders" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Incoming Orders</h2>
              <Badge variant="secondary">{orders.filter(o => o.status === 'pending').length} pending</Badge>
            </div>

            <div className="space-y-4">
              {orders.map((order) => (
                <Card key={order.id} className="overflow-hidden">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                        <CardDescription className="flex items-center space-x-4">
                          <span>{order.vendorName}</span>
                          <span>•</span>
                          <div className="flex items-center">
                            <MapPin className="w-3 h-3 mr-1" />
                            {order.vendorLocation}
                          </div>
                        </CardDescription>
                      </div>
                      <Badge 
                        variant={order.status === 'pending' ? 'destructive' : 'default'}
                      >
                        {order.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium mb-2">Order Items:</h4>
                        <div className="space-y-1">
                          {order.items.map((item, index) => (
                            <div key={index} className="flex justify-between text-sm">
                              <span>{item.name} x {item.quantity}</span>
                              <span>₹{item.price * item.quantity}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center text-sm">
                          <Calendar className="w-4 h-4 mr-2 text-muted-foreground" />
                          <span>Ordered: {order.orderDate}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Clock className="w-4 h-4 mr-2 text-muted-foreground" />
                          <span>Delivery: {order.deliveryTime}</span>
                        </div>
                        <div className="text-lg font-semibold">
                          Total: ₹{order.total}
                        </div>
                      </div>
                    </div>
                    
                    {order.status === 'pending' && (
                      <div className="flex space-x-2 pt-4 border-t">
                        <Button 
                          variant="default" 
                          size="sm"
                          onClick={() => acceptOrder(order.id)}
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Accept Order
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => rejectOrder(order.id)}
                        >
                          <X className="w-4 h-4 mr-1" />
                          Decline
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="products" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">My Products</h2>
              <Button variant="supplier">
                <Plus className="w-4 h-4 mr-2" />
                Add Product
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <Card key={product.id}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="text-4xl">{product.image}</div>
                      <Badge variant={product.status === 'active' ? 'default' : 'secondary'}>
                        {product.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <CardTitle className="text-lg">{product.name}</CardTitle>
                      <CardDescription>{product.category}</CardDescription>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xl font-bold text-primary">
                          ₹{product.price}
                          <span className="text-sm font-normal text-muted-foreground">/{product.unit}</span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Stock: {product.stock} {product.unit}
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Add Product Form */}
            <Card>
              <CardHeader>
                <CardTitle>Add New Product</CardTitle>
                <CardDescription>List a new product for vendors to order</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="product-name">Product Name</Label>
                    <Input id="product-name" placeholder="e.g., Fresh Tomatoes" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Input id="category" placeholder="e.g., Vegetables" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price">Price per unit</Label>
                    <Input id="price" type="number" placeholder="₹25" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="unit">Unit</Label>
                    <Input id="unit" placeholder="kg, gram, piece" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="stock">Available Stock</Label>
                    <Input id="stock" type="number" placeholder="100" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Brief description of your product..." />
                </div>
                <Button variant="supplier">Add Product</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Sales Analytics</CardTitle>
                <CardDescription>Track your business performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-6 border rounded-lg">
                    <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <h3 className="font-semibold">Monthly Revenue</h3>
                    <p className="text-2xl font-bold">₹45,230</p>
                    <p className="text-sm text-green-600">+12% from last month</p>
                  </div>
                  <div className="text-center p-6 border rounded-lg">
                    <Package className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <h3 className="font-semibold">Orders Completed</h3>
                    <p className="text-2xl font-bold">186</p>
                    <p className="text-sm text-blue-600">+8% from last month</p>
                  </div>
                  <div className="text-center p-6 border rounded-lg">
                    <Star className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                    <h3 className="font-semibold">Average Rating</h3>
                    <p className="text-2xl font-bold">4.7</p>
                    <p className="text-sm text-yellow-600">Based on 89 reviews</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Supplier Profile</CardTitle>
                <CardDescription>Manage your business information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="business-name">Business Name</Label>
                    <Input id="business-name" defaultValue="Fresh Farm Supplies" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="owner">Owner Name</Label>
                    <Input id="owner" defaultValue="Rajesh Kumar" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" defaultValue="+91 98765 43210" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" defaultValue="rajesh@freshfarm.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Business Address</Label>
                  <Textarea id="address" defaultValue="123 Market Street, Sector 18, Noida, UP 201301" />
                </div>
                <Button variant="supplier">Update Profile</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SupplierDashboard;