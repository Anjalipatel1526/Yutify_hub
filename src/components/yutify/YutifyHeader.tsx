import { Search, Plus, User, Heart, Home, Film, Upload as UploadIcon, TvMinimal } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const YutifyHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { id: "home", label: "Home", icon: Home, path: "/" },
    { id: "reels", label: "Reels", icon: Film, path: "/reels" },
    { id: "categories", label: "Categories", icon: TvMinimal, path: "/categories" },
    { id: "upload", label: "Upload", icon: UploadIcon, path: "/yutify-upload" },
    { id: "channel", label: "My Channel", icon: User, path: "/my-channel" }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-xl border-b border-border/50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <h1
              className="text-3xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent cursor-pointer"
              onClick={() => navigate("/")}
            >
              Yutify
            </h1>

            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <button
                    key={item.id}
                    onClick={() => navigate(item.path)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-2 bg-secondary/50 rounded-full px-4 py-2 w-80">
              <Search className="w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search political content..."
                className="border-0 bg-transparent focus-visible:ring-0 text-sm"
              />
            </div>

            <Button
              onClick={() => navigate("/watchlist")}
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-primary/10 hover:text-primary"
              title="Watchlist"
            >
              <Plus className="w-5 h-5" />
            </Button>

            <Button
              onClick={() => navigate("/watchlist")}
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-primary/10 hover:text-primary"
              title="Liked Videos"
            >
              <Heart className="w-5 h-5" />
            </Button>

            <Button
              onClick={() => navigate("/auth")}
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-primary/10 hover:text-primary"
              title="Account"
            >
              <User className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default YutifyHeader;
