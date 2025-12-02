import { Search, Upload, Heart, LogOut, User } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const Header = () => {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      setUser(JSON.parse(currentUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setUser(null);
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <h1 
            className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent cursor-pointer"
            onClick={() => navigate("/")}
          >
            StreamHub
          </h1>
          <nav className="hidden md:flex items-center gap-6">
            <button onClick={() => navigate("/")} className="text-sm font-medium hover:text-primary transition-colors">
              Home
            </button>
            {user && (
              <>
                <button onClick={() => navigate("/watchlist")} className="text-sm font-medium hover:text-primary transition-colors">
                  Watchlist
                </button>
                <button onClick={() => navigate("/upload")} className="text-sm font-medium hover:text-primary transition-colors">
                  Upload
                </button>
              </>
            )}
          </nav>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 bg-secondary rounded-full px-4 py-2">
            <Search className="w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search content..." 
              className="border-0 bg-transparent focus-visible:ring-0 w-64 text-sm"
            />
          </div>
          
          {user ? (
            <>
              <Button onClick={() => navigate("/upload")} variant="ghost" size="icon" className="rounded-full" title="Upload">
                <Upload className="w-5 h-5" />
              </Button>
              
              <Button onClick={() => navigate("/watchlist")} variant="ghost" size="icon" className="rounded-full" title="Watchlist">
                <Heart className="w-5 h-5" />
              </Button>
              
              <Button onClick={handleLogout} variant="ghost" size="icon" className="rounded-full" title="Logout">
                <LogOut className="w-5 h-5" />
              </Button>
              
              <div className="flex items-center gap-2 px-3 py-2 bg-secondary rounded-full">
                <User className="w-4 h-4" />
                <span className="text-sm font-medium">{user.username}</span>
              </div>
            </>
          ) : (
            <Button onClick={() => navigate("/auth")}>
              Sign In
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
