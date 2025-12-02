import { useState } from "react";
import YutifyHeader from "@/components/yutify/YutifyHeader";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, Users, Eye, Heart } from "lucide-react";

const MyChannel = () => {
  const channelStats = {
    subscribers: "125K",
    totalViews: "5.2M",
    totalVideos: 42,
    totalLikes: "890K"
  };

  const myVideos = [
    {
      id: "1",
      title: "Election Strategy: Behind The Campaign Trail",
      thumbnail: "https://images.pexels.com/photos/6457579/pexels-photo-6457579.jpeg?auto=compress&cs=tinysrgb&w=800",
      duration: "45:23",
      views: "2.3M",
      uploadedDate: "2 days ago"
    },
    {
      id: "2",
      title: "Budget 2025: Economic Policy Deep Dive",
      thumbnail: "https://images.pexels.com/photos/7876695/pexels-photo-7876695.jpeg?auto=compress&cs=tinysrgb&w=800",
      duration: "52:18",
      views: "1.8M",
      uploadedDate: "5 days ago"
    },
    {
      id: "3",
      title: "Foreign Policy in the Modern Era",
      thumbnail: "https://images.pexels.com/photos/8828433/pexels-photo-8828433.jpeg?auto=compress&cs=tinysrgb&w=800",
      duration: "38:45",
      views: "1.5M",
      uploadedDate: "1 week ago"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <YutifyHeader />
      <main className="pt-16">
        <div className="h-64 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 relative">
          <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/6457579/pexels-photo-6457579.jpeg?auto=compress&cs=tinysrgb&w=1920')] bg-cover bg-center opacity-20"></div>
        </div>

        <div className="container mx-auto px-4">
          <div className="relative -mt-20 mb-8">
            <div className="flex items-end gap-6">
              <div className="w-40 h-40 rounded-full bg-gradient-to-br from-primary to-accent border-4 border-background flex items-center justify-center">
                <span className="text-6xl font-bold text-white">PC</span>
              </div>
              <div className="flex-1 pb-4">
                <h1 className="text-4xl font-bold mb-2">Political Channel</h1>
                <p className="text-muted-foreground mb-4">
                  Bringing you the latest political insights, interviews, and analysis
                </p>
                <div className="flex gap-4">
                  <Button className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90">
                    Edit Channel
                  </Button>
                  <Button variant="outline">View Analytics</Button>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-6 mb-8">
            <div className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors">
              <Users className="w-8 h-8 text-primary mb-2" />
              <p className="text-3xl font-bold mb-1">{channelStats.subscribers}</p>
              <p className="text-sm text-muted-foreground">Subscribers</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6 hover:border-accent/50 transition-colors">
              <Eye className="w-8 h-8 text-accent mb-2" />
              <p className="text-3xl font-bold mb-1">{channelStats.totalViews}</p>
              <p className="text-sm text-muted-foreground">Total Views</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors">
              <Play className="w-8 h-8 text-primary mb-2" />
              <p className="text-3xl font-bold mb-1">{channelStats.totalVideos}</p>
              <p className="text-sm text-muted-foreground">Videos</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6 hover:border-live/50 transition-colors">
              <Heart className="w-8 h-8 text-live mb-2" />
              <p className="text-3xl font-bold mb-1">{channelStats.totalLikes}</p>
              <p className="text-sm text-muted-foreground">Total Likes</p>
            </div>
          </div>

          <Tabs defaultValue="videos" className="mb-16">
            <TabsList className="mb-8">
              <TabsTrigger value="videos">Videos</TabsTrigger>
              <TabsTrigger value="reels">Reels</TabsTrigger>
              <TabsTrigger value="playlists">Playlists</TabsTrigger>
              <TabsTrigger value="about">About</TabsTrigger>
            </TabsList>

            <TabsContent value="videos">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {myVideos.map((video) => (
                  <div key={video.id} className="group cursor-pointer">
                    <div className="relative aspect-video rounded-lg overflow-hidden bg-card mb-3 border-2 border-transparent hover:border-primary/50 transition-all">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-16 h-16 rounded-full bg-primary/90 backdrop-blur-sm flex items-center justify-center">
                          <Play className="w-8 h-8 text-white" fill="white" />
                        </div>
                      </div>
                      <div className="absolute bottom-3 right-3 bg-background/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold">
                        {video.duration}
                      </div>
                    </div>
                    <h3 className="font-semibold text-sm line-clamp-2 mb-1 group-hover:text-primary transition-colors">
                      {video.title}
                    </h3>
                    <p className="text-xs text-muted-foreground">{video.views} views</p>
                    <p className="text-xs text-muted-foreground">{video.uploadedDate}</p>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="reels">
              <p className="text-center text-muted-foreground py-16">No reels uploaded yet</p>
            </TabsContent>

            <TabsContent value="playlists">
              <p className="text-center text-muted-foreground py-16">No playlists created yet</p>
            </TabsContent>

            <TabsContent value="about">
              <div className="bg-card border border-border rounded-lg p-8">
                <h3 className="text-xl font-bold mb-4">About This Channel</h3>
                <p className="text-muted-foreground mb-6">
                  Welcome to Political Channel - your source for in-depth political analysis,
                  interviews with key leaders, and comprehensive coverage of policy debates.
                  We bring you unbiased, fact-based political content to help you make informed decisions.
                </p>
                <div className="space-y-2">
                  <p className="text-sm">
                    <span className="text-muted-foreground">Joined:</span>{" "}
                    <span className="font-semibold">January 2023</span>
                  </p>
                  <p className="text-sm">
                    <span className="text-muted-foreground">Location:</span>{" "}
                    <span className="font-semibold">India</span>
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default MyChannel;
