import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import ContentCard from "@/components/ContentCard";
import { toast } from "sonner";

export default function Watchlist() {
  const [watchlist, setWatchlist] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    if (!user) {
      toast.error("Please login to view your watchlist");
      navigate("/auth");
      return;
    }

    const userObj = JSON.parse(user);
    const savedWatchlist = JSON.parse(localStorage.getItem(`watchlist_${userObj.id}`) || "[]");
    setWatchlist(savedWatchlist);
  }, [navigate]);

  const handleRemove = (id: string) => {
    const user = JSON.parse(localStorage.getItem("currentUser") || "{}");
    const updatedWatchlist = watchlist.filter(item => item.id !== id);
    localStorage.setItem(`watchlist_${user.id}`, JSON.stringify(updatedWatchlist));
    setWatchlist(updatedWatchlist);
    toast.success("Removed from watchlist");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-primary bg-clip-text text-transparent">
          My Watchlist
        </h1>
        
        {watchlist.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">Your watchlist is empty</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {watchlist.map((item) => (
              <div key={item.id} className="relative group">
                <ContentCard {...item} />
                <button
                  onClick={() => handleRemove(item.id)}
                  className="absolute top-2 right-2 bg-destructive text-destructive-foreground w-8 h-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
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
