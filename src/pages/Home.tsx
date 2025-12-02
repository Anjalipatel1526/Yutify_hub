import { useState } from "react";
import YutifyHeader from "@/components/yutify/YutifyHeader";
import HeroBannerSlider from "@/components/yutify/HeroBannerSlider";
import VideoSection from "@/components/yutify/VideoSection";

const Home = () => {
  const trendingInterviews = [
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
      title: "Budget 2025: Economic Policy Deep Dive",
      thumbnail: "https://images.pexels.com/photos/6457579/pexels-photo-6457579.jpeg?auto=compress&cs=tinysrgb&w=800",
      duration: "52:18",
      category: "interview" as const,
      views: "1.8M",
      uploadedBy: "Economy Watch"
    },
    {
      id: "3",
      title: "Foreign Policy in the Modern Era",
      thumbnail: "https://images.pexels.com/photos/6457579/pexels-photo-6457579.jpeg?auto=compress&cs=tinysrgb&w=800",
      duration: "38:45",
      category: "interview" as const,
      views: "1.5M",
      uploadedBy: "Global Politics"
    },
    {
      id: "4",
      title: "Climate Action: Political Will & Reality",
      thumbnail: "https://images.pexels.com/photos/6457579/pexels-photo-6457579.jpeg?auto=compress&cs=tinysrgb&w=800",
      duration: "41:30",
      category: "interview" as const,
      views: "1.2M",
      uploadedBy: "Green Policy"
    },
    {
      id: "5",
      title: "Healthcare Reform: The Political Battle",
      thumbnail: "https://images.pexels.com/photos/6457579/pexels-photo-6457579.jpeg?auto=compress&cs=tinysrgb&w=800",
      duration: "48:12",
      category: "interview" as const,
      views: "980K",
      uploadedBy: "Health Watch"
    }
  ];

  const topPodcasts = [
    {
      id: "6",
      title: "The Weekly Political Roundup",
      thumbnail: "https://images.pexels.com/photos/7876695/pexels-photo-7876695.jpeg?auto=compress&cs=tinysrgb&w=800",
      duration: "65:20",
      category: "podcast" as const,
      views: "3.1M",
      uploadedBy: "Politics Today"
    },
    {
      id: "7",
      title: "Inside The Opposition Strategy",
      thumbnail: "https://images.pexels.com/photos/7876695/pexels-photo-7876695.jpeg?auto=compress&cs=tinysrgb&w=800",
      duration: "58:45",
      category: "podcast" as const,
      views: "2.7M",
      uploadedBy: "Opposition Desk"
    },
    {
      id: "8",
      title: "Constitutional Debates Explained",
      thumbnail: "https://images.pexels.com/photos/7876695/pexels-photo-7876695.jpeg?auto=compress&cs=tinysrgb&w=800",
      duration: "72:10",
      category: "podcast" as const,
      views: "2.2M",
      uploadedBy: "Law & Politics"
    },
    {
      id: "9",
      title: "State Politics: Ground Reality",
      thumbnail: "https://images.pexels.com/photos/7876695/pexels-photo-7876695.jpeg?auto=compress&cs=tinysrgb&w=800",
      duration: "55:30",
      category: "podcast" as const,
      views: "1.9M",
      uploadedBy: "State Affairs"
    },
    {
      id: "10",
      title: "Youth Politics & Future Leaders",
      thumbnail: "https://images.pexels.com/photos/7876695/pexels-photo-7876695.jpeg?auto=compress&cs=tinysrgb&w=800",
      duration: "62:40",
      category: "podcast" as const,
      views: "1.6M",
      uploadedBy: "Youth Voice"
    }
  ];

  const liveNow = [
    {
      id: "11",
      title: "Parliament Session LIVE",
      thumbnail: "https://images.pexels.com/photos/8828433/pexels-photo-8828433.jpeg?auto=compress&cs=tinysrgb&w=800",
      duration: "LIVE",
      category: "live" as const,
      isLive: true,
      views: "125K watching",
      uploadedBy: "Parliament TV"
    },
    {
      id: "12",
      title: "Press Conference: PM Speaks LIVE",
      thumbnail: "https://images.pexels.com/photos/8828433/pexels-photo-8828433.jpeg?auto=compress&cs=tinysrgb&w=800",
      duration: "LIVE",
      category: "live" as const,
      isLive: true,
      views: "98K watching",
      uploadedBy: "Official Channel"
    },
    {
      id: "13",
      title: "Election Results Coverage LIVE",
      thumbnail: "https://images.pexels.com/photos/8828433/pexels-photo-8828433.jpeg?auto=compress&cs=tinysrgb&w=800",
      duration: "LIVE",
      category: "live" as const,
      isLive: true,
      views: "87K watching",
      uploadedBy: "Election Desk"
    },
    {
      id: "14",
      title: "Political Debate LIVE",
      thumbnail: "https://images.pexels.com/photos/8828433/pexels-photo-8828433.jpeg?auto=compress&cs=tinysrgb&w=800",
      duration: "LIVE",
      category: "live" as const,
      isLive: true,
      views: "76K watching",
      uploadedBy: "Debate Arena"
    }
  ];

  const reelsForYou = [
    {
      id: "15",
      title: "Parliament Moment That Shocked Everyone",
      thumbnail: "https://images.pexels.com/photos/6457579/pexels-photo-6457579.jpeg?auto=compress&cs=tinysrgb&w=800",
      duration: "0:45",
      category: "reel" as const,
      views: "4.2M",
      uploadedBy: "Political Shorts"
    },
    {
      id: "16",
      title: "Minister's Viral Response",
      thumbnail: "https://images.pexels.com/photos/6457579/pexels-photo-6457579.jpeg?auto=compress&cs=tinysrgb&w=800",
      duration: "0:38",
      category: "reel" as const,
      views: "3.8M",
      uploadedBy: "Viral Politics"
    },
    {
      id: "17",
      title: "Policy Explained in 60 Seconds",
      thumbnail: "https://images.pexels.com/photos/6457579/pexels-photo-6457579.jpeg?auto=compress&cs=tinysrgb&w=800",
      duration: "0:58",
      category: "reel" as const,
      views: "3.5M",
      uploadedBy: "Quick Politics"
    },
    {
      id: "18",
      title: "Historic Vote Moment",
      thumbnail: "https://images.pexels.com/photos/6457579/pexels-photo-6457579.jpeg?auto=compress&cs=tinysrgb&w=800",
      duration: "0:52",
      category: "reel" as const,
      views: "3.1M",
      uploadedBy: "Historic Moments"
    },
    {
      id: "19",
      title: "Opposition Leader's Sharp Reply",
      thumbnail: "https://images.pexels.com/photos/6457579/pexels-photo-6457579.jpeg?auto=compress&cs=tinysrgb&w=800",
      duration: "0:42",
      category: "reel" as const,
      views: "2.9M",
      uploadedBy: "Political Clips"
    }
  ];

  const recommended = [
    {
      id: "20",
      title: "Democracy & Digital Age",
      thumbnail: "https://images.pexels.com/photos/7876695/pexels-photo-7876695.jpeg?auto=compress&cs=tinysrgb&w=800",
      duration: "44:15",
      category: "interview" as const,
      views: "850K",
      uploadedBy: "Digital Politics"
    },
    {
      id: "21",
      title: "Grassroots Politics Explained",
      thumbnail: "https://images.pexels.com/photos/7876695/pexels-photo-7876695.jpeg?auto=compress&cs=tinysrgb&w=800",
      duration: "39:28",
      category: "podcast" as const,
      views: "720K",
      uploadedBy: "Ground Report"
    },
    {
      id: "22",
      title: "Coalition Politics: The Art of Compromise",
      thumbnail: "https://images.pexels.com/photos/7876695/pexels-photo-7876695.jpeg?auto=compress&cs=tinysrgb&w=800",
      duration: "51:33",
      category: "interview" as const,
      views: "680K",
      uploadedBy: "Alliance Watch"
    },
    {
      id: "23",
      title: "Media & Politics: Power Dynamics",
      thumbnail: "https://images.pexels.com/photos/7876695/pexels-photo-7876695.jpeg?auto=compress&cs=tinysrgb&w=800",
      duration: "47:20",
      category: "podcast" as const,
      views: "620K",
      uploadedBy: "Media Politics"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <YutifyHeader />
      <main className="pt-16">
        <HeroBannerSlider />
        <div className="space-y-12 pb-16">
          <VideoSection title="Trending Interviews" videos={trendingInterviews} />
          <VideoSection title="Top Political Podcasts" videos={topPodcasts} />
          <VideoSection title="Live Now" videos={liveNow} />
          <VideoSection title="Reels For You" videos={reelsForYou} isReel />
          <VideoSection title="Recommended For You" videos={recommended} />
        </div>
      </main>
    </div>
  );
};

export default Home;
