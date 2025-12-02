import { Play, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ContentCardProps {
  title: string;
  duration: string;
  thumbnail: string;
  category: "live" | "podcast" | "interview";
  isLive?: boolean;
}

const ContentCard = ({ title, duration, thumbnail, category, isLive }: ContentCardProps) => {
  const categoryColors = {
    live: "bg-live/20 text-live border-live/30",
    podcast: "bg-podcast/20 text-podcast border-podcast/30",
    interview: "bg-interview/20 text-interview border-interview/30",
  };

  const glowColors = {
    live: "group-hover:shadow-[0_0_24px_hsl(var(--live)/0.5)]",
    podcast: "group-hover:shadow-[0_0_24px_hsl(var(--podcast)/0.3)]",
    interview: "group-hover:shadow-[0_0_24px_hsl(var(--interview)/0.3)]",
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
        
        {isLive && (
          <Badge className="absolute top-3 left-3 bg-live text-white border-0 animate-pulse">
            ● LIVE
          </Badge>
        )}
        
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
