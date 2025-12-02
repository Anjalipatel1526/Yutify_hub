import { Play, Clock, Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import { toast } from "sonner";

interface ContentCardProps {
  id?: string;
  title: string;
  duration: string;
  thumbnail: string;
  category: "live" | "podcast" | "interview" | "politics";
  isLive?: boolean;
}

const ContentCard = ({ id, title, duration, thumbnail, category, isLive }: ContentCardProps) => {
  const [isInWatchlist, setIsInWatchlist] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    if (user && id) {
      const userObj = JSON.parse(user);
      const watchlist = JSON.parse(localStorage.getItem(`watchlist_${userObj.id}`) || "[]");
      setIsInWatchlist(watchlist.some((item: any) => item.id === id));
    }
  }, [id]);

  const toggleWatchlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    const user = localStorage.getItem("currentUser");
    if (!user) {
      toast.error("Please login to add to watchlist");
      return;
    }

    const userObj = JSON.parse(user);
    const watchlist = JSON.parse(localStorage.getItem(`watchlist_${userObj.id}`) || "[]");
    
    if (isInWatchlist) {
      const updated = watchlist.filter((item: any) => item.id !== id);
      localStorage.setItem(`watchlist_${userObj.id}`, JSON.stringify(updated));
      setIsInWatchlist(false);
      toast.success("Removed from watchlist");
    } else {
      watchlist.push({ id, title, thumbnail, duration, category });
      localStorage.setItem(`watchlist_${userObj.id}`, JSON.stringify(watchlist));
      setIsInWatchlist(true);
      toast.success("Added to watchlist");
    }
  };

  const categoryColors = {
    live: "bg-live/20 text-live border-live/30",
    podcast: "bg-podcast/20 text-podcast border-podcast/30",
    interview: "bg-interview/20 text-interview border-interview/30",
    politics: "bg-primary/20 text-primary border-primary/30",
  };

  const glowColors = {
    live: "group-hover:shadow-[0_0_24px_hsl(var(--live)/0.5)]",
    podcast: "group-hover:shadow-[0_0_24px_hsl(var(--podcast)/0.3)]",
    interview: "group-hover:shadow-[0_0_24px_hsl(var(--interview)/0.3)]",
    politics: "group-hover:shadow-[0_0_24px_hsl(var(--primary)/0.3)]",
  };

  return (
    <div className={`group relative cursor-pointer transition-all duration-300 hover:-translate-y-2 ${glowColors[category]}`}>
      <div className="relative aspect-video rounded-xl overflow-hidden bg-card">
        <img 
          src={thumbnail} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
          {isLive && (
            <Badge className="bg-live text-white border-0 animate-pulse">
              ● LIVE
            </Badge>
          )}
          
          {id && (
            <button
              onClick={toggleWatchlist}
              className="ml-auto p-2 bg-background/80 backdrop-blur-sm rounded-full hover:bg-background transition-colors"
            >
              <Heart className={`w-4 h-4 ${isInWatchlist ? "fill-live text-live" : "text-muted-foreground"}`} />
            </button>
          )}
        </div>
        
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-16 h-16 rounded-full bg-primary/90 backdrop-blur-sm flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-300">
            <Play className="w-8 h-8 text-primary-foreground" fill="currentColor" />
          </div>
        </div>

        <div className="absolute bottom-3 right-3 flex items-center gap-1 text-xs bg-background/80 backdrop-blur-sm px-2 py-1 rounded">
          <Clock className="w-3 h-3" />
          {duration}
        </div>
      </div>
      
      <div className="mt-3 space-y-1">
        <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <Badge variant="outline" className={`${categoryColors[category]} text-xs`}>
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </Badge>
      </div>
    </div>
  );
};

export default ContentCard;
