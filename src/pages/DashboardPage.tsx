import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { LogOut, UserCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) {
        navigate("/auth");
      } else {
        setUser(data.user);
      }
    };
    fetchUser();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/auth";
  };

  return (
    <div className="min-h-screen bg-muted/30 py-16 px-4">
      <div className="max-w-4xl mx-auto bg-background shadow-md rounded-xl p-8">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-3">
            <UserCircle className="w-10 h-10 text-primary" />
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                Welcome, {user?.user_metadata?.full_name || user?.user_metadata?.owner_name || "User"}
              </h1>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
            </div>
          </div>

          <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2">
            <LogOut className="w-4 h-4" /> Logout
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-primary/10 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-primary mb-2">Account Type</h2>
            <p className="text-muted-foreground capitalize">{user?.user_metadata?.type || "vendor"}</p>
          </div>

          <div className="bg-secondary/10 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-secondary mb-2">Phone Number</h2>
            <p className="text-muted-foreground">{user?.user_metadata?.phone || "Not Provided"}</p>
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-lg font-semibold mb-2">Next Steps</h2>
          <ul className="list-disc list-inside text-muted-foreground space-y-1">
            <li>Browse available raw materials</li>
            <li>Track your previous orders</li>
            <li>Rate suppliers you’ve worked with</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
