import { ChevronRight, Play } from "lucide-react";

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  category: "interview" | "podcast" | "live" | "reel";
  isLive?: boolean;
  views: string;
  uploadedBy: string;
}

interface VideoSectionProps {
  title: string;
  videos: Video[];
  isReel?: boolean;
}

const VideoSection = ({ title, videos, isReel = false }: VideoSectionProps) => {
  const categoryColors = {
    live: "border-live/50 shadow-[0_0_20px_hsl(var(--live)/0.3)]",
    podcast: "border-podcast/50 shadow-[0_0_20px_hsl(var(--podcast)/0.2)]",
    interview: "border-interview/50 shadow-[0_0_20px_hsl(var(--interview)/0.2)]",
    reel: "border-reel/50 shadow-[0_0_20px_hsl(var(--reel)/0.2)]"
  };

  return (
    <section className="py-4">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold">{title}</h2>
          <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors group">
            See all
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className={`grid ${isReel ? "grid-cols-3 md:grid-cols-4 lg:grid-cols-6" : "grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"} gap-6`}>
          {videos.map((video) => (
            <div key={video.id} className="group cursor-pointer">
              <div className={`relative ${isReel ? "aspect-[9/16]" : "aspect-video"} rounded-lg overflow-hidden bg-card mb-3 border-2 border-transparent transition-all duration-300 hover:border-2 ${categoryColors[video.category]}`}>
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {video.isLive && (
                  <div className="absolute top-3 left-3 bg-live px-2 py-1 rounded text-xs font-bold text-white animate-pulse flex items-center gap-1">
                    <span className="w-2 h-2 bg-white rounded-full"></span>
                    LIVE
                  </div>
                )}

                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-16 h-16 rounded-full bg-primary/90 backdrop-blur-sm flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-300">
                    <Play className="w-8 h-8 text-primary-foreground" fill="currentColor" />
                  </div>
                </div>

                <div className="absolute bottom-3 right-3 bg-background/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold">
                  {video.duration}
                </div>
              </div>

              <h3 className="font-semibold text-sm line-clamp-2 mb-1 group-hover:text-primary transition-colors">
                {video.title}
              </h3>
              <p className="text-xs text-muted-foreground">{video.uploadedBy}</p>
              <p className="text-xs text-muted-foreground">{video.views} views</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
