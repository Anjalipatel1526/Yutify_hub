import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Bookmark, User, LogOut, Menu, X } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Session } from "@supabase/supabase-js";
import SmartSearch from "./SmartSearch";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface PoliticalHeaderProps {
  isScrolled?: boolean;
  onSearch?: (query: string, filter: string) => void;
}

export default function PoliticalHeader({ isScrolled = false, onSearch }: PoliticalHeaderProps) {
  const [session, setSession] = useState<Session | null>(null);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Logged out successfully");
    navigate("/");
  };

  const handleSearch = (query: string, filter: string) => {
    onSearch?.(query, filter);
  };

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      isScrolled || isSearchExpanded
        ? "bg-background/95 backdrop-blur-md border-b border-border"
        : "bg-gradient-to-b from-background/80 to-transparent"
    )}>
      <div className="flex items-center justify-between px-4 md:px-8 py-4">
        {/* Logo */}
        <button
          onClick={() => navigate("/")}
          className="text-2xl font-bold text-primary tracking-tight flex-shrink-0"
        >
          Yutify
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6 flex-1 justify-center">
          <SmartSearch
            onSearch={handleSearch}
            isExpanded={isSearchExpanded}
            onExpandChange={setIsSearchExpanded}
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {session ? (
            <>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("/watchlist")}
                className="hidden md:flex"
              >
                <Bookmark className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleLogout}
                className="hidden md:flex"
              >
                <LogOut className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="hidden md:flex"
              >
                <User className="w-5 h-5" />
              </Button>
            </>
          ) : (
            <Button
              onClick={() => navigate("/auth")}
              className="hidden md:flex"
            >
              Sign In
            </Button>
          )}

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background border-t border-border p-4 space-y-4 animate-in slide-in-from-top-2">
          <SmartSearch
            onSearch={handleSearch}
            isExpanded={true}
            onExpandChange={() => {}}
          />
          
          {session ? (
            <div className="flex flex-col gap-2">
              <Button variant="ghost" onClick={() => navigate("/watchlist")} className="justify-start">
                <Bookmark className="w-5 h-5 mr-2" />
                Watchlist
              </Button>
              <Button variant="ghost" onClick={handleLogout} className="justify-start">
                <LogOut className="w-5 h-5 mr-2" />
                Logout
              </Button>
            </div>
          ) : (
            <Button onClick={() => navigate("/auth")} className="w-full">
              Sign In
            </Button>
          )}
        </div>
      )}
    </header>
  );
}
