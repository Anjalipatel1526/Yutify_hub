import { useEffect, useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ContentRow from "@/components/ContentRow";
import liveImage from "@/assets/live-1.jpg";
import podcastImage1 from "@/assets/podcast-1.jpg";
import podcastImage2 from "@/assets/podcast-2.jpg";
import interviewImage1 from "@/assets/interview-1.jpg";
import interviewImage2 from "@/assets/interview-2.jpg";

const Index = () => {
  const [userVideos, setUserVideos] = useState<any[]>([]);

  useEffect(() => {
    const videos = JSON.parse(localStorage.getItem("userVideos") || "[]");
    setUserVideos(videos);
  }, []);

  const liveContent = [
    {
      id: "1",
      title: "Tech Talk Live: Future of AI",
      duration: "LIVE",
      thumbnail: liveImage,
      category: "live" as const,
      isLive: true,
    },
    {
      id: "2",
      title: "Gaming Championship Finals",
      duration: "2h 30m",
      thumbnail: liveImage,
      category: "live" as const,
    },
    {
      id: "3",
      title: "Startup Pitch Night",
      duration: "1h 45m",
      thumbnail: liveImage,
      category: "live" as const,
    },
    {
      id: "4",
      title: "Music Session Live",
      duration: "3h 00m",
      thumbnail: liveImage,
      category: "live" as const,
    },
    {
      id: "5",
      title: "Q&A with Industry Leaders",
      duration: "1h 30m",
      thumbnail: liveImage,
      category: "live" as const,
    },
  ];

  const podcastContent = [
    {
      id: "6",
      title: "The Creative Journey: Building Your Brand",
      duration: "45m",
      thumbnail: podcastImage1,
      category: "podcast" as const,
    },
    {
      id: "7",
      title: "Entrepreneurship Unfiltered",
      duration: "52m",
      thumbnail: podcastImage2,
      category: "podcast" as const,
    },
    {
      id: "8",
      title: "Tech Trends & Tomorrow",
      duration: "38m",
      thumbnail: podcastImage1,
      category: "podcast" as const,
    },
    {
      id: "9",
      title: "Mental Health Matters",
      duration: "41m",
      thumbnail: podcastImage2,
      category: "podcast" as const,
    },
    {
      id: "10",
      title: "Design Thinking Decoded",
      duration: "35m",
      thumbnail: podcastImage1,
      category: "podcast" as const,
    },
  ];

  const interviewContent = [
    {
      id: "11",
      title: "CEO Insights: Leading Through Change",
      duration: "28m",
      thumbnail: interviewImage1,
      category: "interview" as const,
    },
    {
      id: "12",
      title: "Artist Spotlight: Creative Process",
      duration: "33m",
      thumbnail: interviewImage2,
      category: "interview" as const,
    },
    {
      id: "13",
      title: "Founder's Story: From Zero to Success",
      duration: "42m",
      thumbnail: interviewImage1,
      category: "interview" as const,
    },
    {
      id: "14",
      title: "Innovation Leaders Roundtable",
      duration: "55m",
      thumbnail: interviewImage2,
      category: "interview" as const,
    },
    {
      id: "15",
      title: "Industry Expert Q&A",
      duration: "31m",
      thumbnail: interviewImage1,
      category: "interview" as const,
    },
  ];

  const politicsContent = userVideos.filter(v => v.category === "politics");
  const otherUserContent = userVideos.filter(v => v.category !== "politics");

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <HeroSection />
        <div className="space-y-8 pb-16">
          <ContentRow title="Live Now" category="live" contents={liveContent} />
          <ContentRow title="Trending Podcasts" category="podcast" contents={podcastContent} />
          <ContentRow title="Featured Interviews" category="interview" contents={interviewContent} />
          {politicsContent.length > 0 && (
            <ContentRow title="Politics" category="politics" contents={politicsContent} />
          )}
          {otherUserContent.length > 0 && (
            <ContentRow title="User Uploads" category="podcast" contents={otherUserContent} />
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
