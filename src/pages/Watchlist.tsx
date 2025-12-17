import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import PoliticalHeader from "@/components/political/PoliticalHeader";
import { toast } from "sonner";

export default function Watchlist() {
  const [watchlist, setWatchlist] = useState<any[]>([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast.error("Please login to view your watchlist");
        navigate("/auth");
        return;
      }
      // For now, using localStorage until database is set up
      const savedWatchlist = JSON.parse(localStorage.getItem(`watchlist_${session.user.id}`) || "[]");
      setWatchlist(savedWatchlist);
    };
    checkAuth();
  }, [navigate]);

  const handleRemove = async (id: string) => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;
    
    const updatedWatchlist = watchlist.filter(item => item.id !== id);
    localStorage.setItem(`watchlist_${session.user.id}`, JSON.stringify(updatedWatchlist));
    setWatchlist(updatedWatchlist);
    toast.success("Removed from watchlist");
  };

  return (
    <div className="min-h-screen bg-background">
      <PoliticalHeader isScrolled={isScrolled} />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <h1 className="text-4xl font-bold mb-8 text-foreground">
          My Watchlist
        </h1>
        
        {watchlist.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">Your watchlist is empty</p>
            <p className="text-muted-foreground text-sm mt-2">Browse content and add videos to your watchlist</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {watchlist.map((item) => (
              <div key={item.id} className="relative group rounded-lg overflow-hidden bg-card">
                <div className="aspect-video relative">
                  <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-3">
                  <h3 className="font-semibold text-foreground line-clamp-2 text-sm">{item.title}</h3>
                </div>
                <button
                  onClick={() => handleRemove(item.id)}
                  className="absolute top-2 right-2 bg-destructive text-destructive-foreground w-8 h-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
