import { useState } from "react";
import { Play, Clock, Heart, Plus, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Video } from "./ContentCarousel";

interface VideoCardProps {
  video: Video;
  variant?: "default" | "large";
}

const categoryStyles = {
  live: "bg-live text-white shadow-[0_0_20px_hsl(var(--live)/0.5)]",
  podcast: "bg-podcast text-white",
  interview: "bg-interview text-white",
  reels: "bg-reel text-white",
  speeches: "bg-primary text-white",
};

export default function VideoCard({ video, variant = "default" }: VideoCardProps) {
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const isLarge = variant === "large";

  return (
    <div
      className={cn(
        "relative flex-shrink-0 rounded-lg overflow-hidden cursor-pointer group transition-transform duration-300",
        isLarge ? "w-[400px] md:w-[500px]" : "w-[280px] md:w-[320px]",
        isHovered && "scale-105 z-10"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Thumbnail */}
      <div className={cn("relative", isLarge ? "aspect-video" : "aspect-video")}>
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-full object-cover"
        />
        
        {/* Overlay on hover */}
        <div className={cn(
          "absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent transition-opacity",
          isHovered ? "opacity-100" : "opacity-60"
        )} />
        
        {/* Live Badge */}
        {video.isLive && (
          <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2 py-1 rounded bg-live text-white text-xs font-semibold">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </span>
            LIVE
          </div>
        )}
        
        {/* Category Badge */}
        {!video.isLive && (
          <span className={cn(
            "absolute top-3 left-3 px-2 py-1 rounded text-xs font-semibold uppercase",
            categoryStyles[video.category]
          )}>
            {video.category}
          </span>
        )}
        
        {/* Duration */}
        {!video.isLive && (
          <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2 py-1 rounded bg-background/80 backdrop-blur-sm text-xs text-foreground">
            <Clock className="w-3 h-3" />
            {video.duration}
          </div>
        )}
        
        {/* Play Button */}
        <div className={cn(
          "absolute inset-0 flex items-center justify-center transition-opacity",
          isHovered ? "opacity-100" : "opacity-0"
        )}>
          <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-lg">
            <Play className="w-6 h-6 text-primary-foreground fill-current ml-1" />
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className={cn(
          "absolute top-3 right-3 flex flex-col gap-2 transition-opacity",
          isHovered ? "opacity-100" : "opacity-0"
        )}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsInWatchlist(!isInWatchlist);
            }}
            className={cn(
              "p-2 rounded-full backdrop-blur-sm transition-colors",
              isInWatchlist ? "bg-primary text-primary-foreground" : "bg-background/80 hover:bg-background"
            )}
          >
            {isInWatchlist ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsLiked(!isLiked);
            }}
            className={cn(
              "p-2 rounded-full backdrop-blur-sm transition-colors",
              isLiked ? "bg-primary text-primary-foreground" : "bg-background/80 hover:bg-background"
            )}
          >
            <Heart className={cn("w-4 h-4", isLiked && "fill-current")} />
          </button>
        </div>
      </div>
      
      {/* Info */}
      <div className="p-3 bg-card">
        <h3 className="font-semibold text-foreground line-clamp-2 text-sm">
          {video.title}
        </h3>
        {video.channelName && (
          <p className="text-xs text-muted-foreground mt-1">{video.channelName}</p>
        )}
        <p className="text-xs text-muted-foreground mt-1">{video.views} views</p>
      </div>
    </div>
  );
}
