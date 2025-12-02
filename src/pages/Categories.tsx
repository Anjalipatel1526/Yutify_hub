import { useState } from "react";
import YutifyHeader from "@/components/yutify/YutifyHeader";
import { Button } from "@/components/ui/button";
import VideoSection from "@/components/yutify/VideoSection";
import { Mic, Video, Radio, Film } from "lucide-react";

const Categories = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const allVideos = [
    {
      id: "1",
      title: "Election Strategy: Behind The Campaign Trail",
      thumbnail: "https://images.pexels.com/photos/6457579/pexels-photo-6457579.jpeg?auto=compress&cs=tinysrgb&w=800",
      duration: "45:23",
      category: "interview" as const,
      views: "2.3M",
      uploadedBy: "Political Insights"
    },
    {
      id: "2",
      title: "The Weekly Political Roundup",
      thumbnail: "https://images.pexels.com/photos/7876695/pexels-photo-7876695.jpeg?auto=compress&cs=tinysrgb&w=800",
      duration: "65:20",
      category: "podcast" as const,
      views: "3.1M",
      uploadedBy: "Politics Today"
    },
    {
      id: "3",
      title: "Parliament Session LIVE",
      thumbnail: "https://images.pexels.com/photos/8828433/pexels-photo-8828433.jpeg?auto=compress&cs=tinysrgb&w=800",
      duration: "LIVE",
      category: "live" as const,
      isLive: true,
      views: "125K watching",
      uploadedBy: "Parliament TV"
    },
    {
      id: "4",
      title: "Parliament Moment That Shocked Everyone",
      thumbnail: "https://images.pexels.com/photos/6457579/pexels-photo-6457579.jpeg?auto=compress&cs=tinysrgb&w=800",
      duration: "0:45",
      category: "reel" as const,
      views: "4.2M",
      uploadedBy: "Political Shorts"
    },
    {
      id: "5",
      title: "Budget 2025: Economic Policy Deep Dive",
      thumbnail: "https://images.pexels.com/photos/6457579/pexels-photo-6457579.jpeg?auto=compress&cs=tinysrgb&w=800",
      duration: "52:18",
      category: "interview" as const,
      views: "1.8M",
      uploadedBy: "Economy Watch"
    },
    {
      id: "6",
      title: "Inside The Opposition Strategy",
      thumbnail: "https://images.pexels.com/photos/7876695/pexels-photo-7876695.jpeg?auto=compress&cs=tinysrgb&w=800",
      duration: "58:45",
      category: "podcast" as const,
      views: "2.7M",
      uploadedBy: "Opposition Desk"
    },
    {
      id: "7",
      title: "Press Conference: PM Speaks LIVE",
      thumbnail: "https://images.pexels.com/photos/8828433/pexels-photo-8828433.jpeg?auto=compress&cs=tinysrgb&w=800",
      duration: "LIVE",
      category: "live" as const,
      isLive: true,
      views: "98K watching",
      uploadedBy: "Official Channel"
    },
    {
      id: "8",
      title: "Minister's Viral Response",
      thumbnail: "https://images.pexels.com/photos/6457579/pexels-photo-6457579.jpeg?auto=compress&cs=tinysrgb&w=800",
      duration: "0:38",
      category: "reel" as const,
      views: "3.8M",
      uploadedBy: "Viral Politics"
    }
  ];

  const filteredVideos = selectedCategory === "all"
    ? allVideos
    : allVideos.filter(v => v.category === selectedCategory);

  const categories = [
    { id: "all", label: "All", icon: Film, color: "bg-gradient-to-r from-primary to-accent" },
    { id: "podcast", label: "Podcasts", icon: Mic, color: "bg-gradient-to-r from-primary to-primary/80" },
    { id: "interview", label: "Interviews", icon: Video, color: "bg-gradient-to-r from-accent to-accent/80" },
    { id: "live", label: "Live", icon: Radio, color: "bg-gradient-to-r from-live to-live/80" },
    { id: "reel", label: "Reels", icon: Film, color: "bg-gradient-to-r from-reel to-reel/80" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <YutifyHeader />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Browse Categories
          </h1>

          <div className="flex flex-wrap gap-4 mb-12">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <Button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`h-14 px-8 text-base font-semibold transition-all duration-300 ${
                    selectedCategory === cat.id
                      ? `${cat.color} text-white scale-105 shadow-lg`
                      : "bg-secondary hover:bg-secondary/80 text-foreground"
                  }`}
                >
                  <Icon className="w-5 h-5 mr-2" />
                  {cat.label}
                </Button>
              );
            })}
          </div>

          <div className="mb-6">
            <h2 className="text-2xl font-bold text-muted-foreground">
              {selectedCategory === "all" ? "All Content" : `${categories.find(c => c.id === selectedCategory)?.label}`}
              <span className="text-primary ml-2">({filteredVideos.length})</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredVideos.map((video) => (
              <div key={video.id} className="group cursor-pointer">
                <div className="relative aspect-video rounded-lg overflow-hidden bg-card mb-3">
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

                  <div className="absolute bottom-3 right-3 bg-background/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-semibold">
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
      </main>
    </div>
  );
};

export default Categories;
