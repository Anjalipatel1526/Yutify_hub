import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ContentRow from "@/components/ContentRow";
import liveImage from "@/assets/live-1.jpg";
import podcastImage1 from "@/assets/podcast-1.jpg";
import podcastImage2 from "@/assets/podcast-2.jpg";
import interviewImage1 from "@/assets/interview-1.jpg";
import interviewImage2 from "@/assets/interview-2.jpg";

const Index = () => {
  const liveContent = [
    {
      id: "1",
      title: "Tech Talk Live: Future of AI",
      duration: "LIVE",
      thumbnail: liveImage,
      isLive: true,
    },
    {
      id: "2",
      title: "Gaming Championship Finals",
      duration: "2h 30m",
      thumbnail: liveImage,
    },
    {
      id: "3",
      title: "Startup Pitch Night",
      duration: "1h 45m",
      thumbnail: liveImage,
    },
    {
      id: "4",
      title: "Music Session Live",
      duration: "3h 00m",
      thumbnail: liveImage,
    },
    {
      id: "5",
      title: "Q&A with Industry Leaders",
      duration: "1h 30m",
      thumbnail: liveImage,
    },
  ];

  const podcastContent = [
    {
      id: "1",
      title: "The Creative Journey: Building Your Brand",
      duration: "45m",
      thumbnail: podcastImage1,
    },
    {
      id: "2",
      title: "Entrepreneurship Unfiltered",
      duration: "52m",
      thumbnail: podcastImage2,
    },
    {
      id: "3",
      title: "Tech Trends & Tomorrow",
      duration: "38m",
      thumbnail: podcastImage1,
    },
    {
      id: "4",
      title: "Mental Health Matters",
      duration: "41m",
      thumbnail: podcastImage2,
    },
    {
      id: "5",
      title: "Design Thinking Decoded",
      duration: "35m",
      thumbnail: podcastImage1,
    },
  ];

  const interviewContent = [
    {
      id: "1",
      title: "CEO Insights: Leading Through Change",
      duration: "28m",
      thumbnail: interviewImage1,
    },
    {
      id: "2",
      title: "Artist Spotlight: Creative Process",
      duration: "33m",
      thumbnail: interviewImage2,
    },
    {
      id: "3",
      title: "Founder's Story: From Zero to Success",
      duration: "42m",
      thumbnail: interviewImage1,
    },
    {
      id: "4",
      title: "Innovation Leaders Roundtable",
      duration: "55m",
      thumbnail: interviewImage2,
    },
    {
      id: "5",
      title: "Industry Expert Q&A",
      duration: "31m",
      thumbnail: interviewImage1,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <HeroSection />
        <div className="space-y-8 pb-16">
          <ContentRow title="Live Now" category="live" contents={liveContent} />
          <ContentRow title="Trending Podcasts" category="podcast" contents={podcastContent} />
          <ContentRow title="Featured Interviews" category="interview" contents={interviewContent} />
        </div>
      </main>
    </div>
  );
};

export default Index;
