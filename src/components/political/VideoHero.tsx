import { useState, useRef, useEffect } from "react";
import { Play, Volume2, VolumeX, Info } from "lucide-react";
import { Button } from "@/components/ui/button";

interface VideoHeroProps {
  videoUrl: string;
  title: string;
  description: string;
  category: string;
  isLive?: boolean;
}

export default function VideoHero({ videoUrl, title, description, category, isLive }: VideoHeroProps) {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Video */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        src={videoUrl}
        autoPlay
        loop
        muted={isMuted}
        playsInline
      />
      
      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-transparent" />
      
      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 pb-32">
        <div className="max-w-2xl space-y-4">
          {isLive && (
            <div className="flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-live opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-live"></span>
              </span>
              <span className="text-sm font-semibold text-live uppercase tracking-wider">Live Now</span>
            </div>
          )}
          
          <span className="inline-block px-3 py-1 text-xs font-medium bg-primary/20 text-primary rounded-full uppercase tracking-wider">
            {category}
          </span>
          
          <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
            {title}
          </h1>
          
          <p className="text-lg text-muted-foreground line-clamp-2 max-w-xl">
            {description}
          </p>
          
          <div className="flex items-center gap-4 pt-4">
            <Button size="lg" className="gap-2 bg-primary hover:bg-primary/90">
              <Play className="w-5 h-5 fill-current" />
              Watch Now
            </Button>
            <Button size="lg" variant="outline" className="gap-2 border-foreground/20 hover:bg-foreground/10">
              <Info className="w-5 h-5" />
              More Info
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mute Toggle */}
      <button
        onClick={toggleMute}
        className="absolute bottom-8 right-8 md:bottom-16 md:right-16 p-3 rounded-full border border-foreground/20 bg-background/50 backdrop-blur-sm hover:bg-background/70 transition-colors"
      >
        {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
      </button>
    </div>
  );
}
