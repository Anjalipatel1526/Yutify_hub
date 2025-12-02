import { useState } from "react";
import YutifyHeader from "@/components/yutify/YutifyHeader";
import { Play, Heart, Share2, MessageCircle, Volume2, VolumeX } from "lucide-react";

const Reels = () => {
  const [currentReel, setCurrentReel] = useState(0);
  const [muted, setMuted] = useState(false);

  const reels = [
    {
      id: "1",
      title: "Parliament Moment That Shocked Everyone",
      thumbnail: "https://images.pexels.com/photos/6457579/pexels-photo-6457579.jpeg?auto=compress&cs=tinysrgb&w=800",
      uploadedBy: "Political Shorts",
      likes: "420K",
      comments: "12.3K",
      shares: "8.5K"
    },
    {
      id: "2",
      title: "Minister's Viral Response",
      thumbnail: "https://images.pexels.com/photos/8828433/pexels-photo-8828433.jpeg?auto=compress&cs=tinysrgb&w=800",
      uploadedBy: "Viral Politics",
      likes: "380K",
      comments: "10.1K",
      shares: "7.2K"
    },
    {
      id: "3",
      title: "Policy Explained in 60 Seconds",
      thumbnail: "https://images.pexels.com/photos/7876695/pexels-photo-7876695.jpeg?auto=compress&cs=tinysrgb&w=800",
      uploadedBy: "Quick Politics",
      likes: "350K",
      comments: "9.8K",
      shares: "6.9K"
    },
    {
      id: "4",
      title: "Historic Vote Moment",
      thumbnail: "https://images.pexels.com/photos/6457579/pexels-photo-6457579.jpeg?auto=compress&cs=tinysrgb&w=800",
      uploadedBy: "Historic Moments",
      likes: "310K",
      comments: "8.4K",
      shares: "5.6K"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <YutifyHeader />
      <main className="pt-16">
        <div className="h-[calc(100vh-4rem)] flex items-center justify-center bg-background">
          <div className="relative w-full max-w-md h-full">
            <div className="absolute inset-0 flex flex-col snap-y snap-mandatory overflow-y-scroll">
              {reels.map((reel, index) => (
                <div
                  key={reel.id}
                  className="relative h-full snap-start flex-shrink-0"
                >
                  <div className="absolute inset-0">
                    <img
                      src={reel.thumbnail}
                      alt={reel.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center">
                    <button className="w-20 h-20 rounded-full bg-primary/20 backdrop-blur-sm flex items-center justify-center hover:bg-primary/30 transition-all duration-300 hover:scale-110">
                      <Play className="w-10 h-10 text-white" fill="white" />
                    </button>
                  </div>

                  <div className="absolute bottom-20 left-6 right-20 text-white">
                    <h3 className="text-lg font-bold mb-2 line-clamp-2">
                      {reel.title}
                    </h3>
                    <p className="text-sm opacity-90">@{reel.uploadedBy}</p>
                  </div>

                  <div className="absolute bottom-32 right-6 flex flex-col gap-6">
                    <button className="flex flex-col items-center gap-1">
                      <div className="w-12 h-12 rounded-full bg-primary/20 backdrop-blur-sm flex items-center justify-center hover:bg-primary/30 transition-all">
                        <Heart className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-xs font-semibold text-white">{reel.likes}</span>
                    </button>

                    <button className="flex flex-col items-center gap-1">
                      <div className="w-12 h-12 rounded-full bg-primary/20 backdrop-blur-sm flex items-center justify-center hover:bg-primary/30 transition-all">
                        <MessageCircle className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-xs font-semibold text-white">{reel.comments}</span>
                    </button>

                    <button className="flex flex-col items-center gap-1">
                      <div className="w-12 h-12 rounded-full bg-primary/20 backdrop-blur-sm flex items-center justify-center hover:bg-primary/30 transition-all">
                        <Share2 className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-xs font-semibold text-white">{reel.shares}</span>
                    </button>

                    <button
                      onClick={() => setMuted(!muted)}
                      className="flex flex-col items-center gap-1"
                    >
                      <div className="w-12 h-12 rounded-full bg-primary/20 backdrop-blur-sm flex items-center justify-center hover:bg-primary/30 transition-all">
                        {muted ? (
                          <VolumeX className="w-6 h-6 text-white" />
                        ) : (
                          <Volume2 className="w-6 h-6 text-white" />
                        )}
                      </div>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Reels;
