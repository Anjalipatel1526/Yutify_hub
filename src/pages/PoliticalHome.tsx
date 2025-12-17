import { useState, useEffect, useCallback } from "react";
import PoliticalHeader from "@/components/political/PoliticalHeader";
import VideoHero from "@/components/political/VideoHero";
import ContentCarousel from "@/components/political/ContentCarousel";
import {
  heroVideo,
  liveNowVideos,
  trendingVideos,
  reelsVideos,
  podcastVideos,
  interviewVideos,
  speechesVideos,
  allVideos,
} from "@/data/mockVideos";
import type { Video } from "@/components/political/ContentCarousel";

export default function PoliticalHome() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFilter, setSearchFilter] = useState("all");
  const [filteredVideos, setFilteredVideos] = useState<Video[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = useCallback((query: string, filter: string) => {
    setSearchQuery(query);
    setSearchFilter(filter);
    setIsSearching(query.length > 0 || filter !== "all");

    if (query.length === 0 && filter === "all") {
      setFilteredVideos([]);
      return;
    }

    let results = allVideos;

    if (filter !== "all") {
      results = results.filter((v) => v.category === filter);
    }

    if (query.length > 0) {
      const lowerQuery = query.toLowerCase();
      results = results.filter(
        (v) =>
          v.title.toLowerCase().includes(lowerQuery) ||
          v.channelName?.toLowerCase().includes(lowerQuery)
      );
    }

    setFilteredVideos(results);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <PoliticalHeader isScrolled={isScrolled} onSearch={handleSearch} />

      {!isSearching ? (
        <>
          {/* Hero Section */}
          <VideoHero {...heroVideo} />

          {/* Content Sections */}
          <div className="relative -mt-32 z-10 pb-16 space-y-2">
            <ContentCarousel title="🔴 Live Now" videos={liveNowVideos} />
            <ContentCarousel title="🔥 Trending Political Videos" videos={trendingVideos} />
            <ContentCarousel title="📱 Latest Reels" videos={reelsVideos} />
            <ContentCarousel title="🎙️ Top Political Podcasts" videos={podcastVideos} />
            <ContentCarousel title="🎤 Interviews You Should Watch" videos={interviewVideos} />
            <ContentCarousel title="📢 Important Speeches" videos={speechesVideos} />
          </div>
        </>
      ) : (
        /* Search Results */
        <div className="pt-32 px-4 md:px-16 pb-16 min-h-screen">
          <h2 className="text-2xl font-bold mb-6">
            {filteredVideos.length > 0
              ? `Search Results (${filteredVideos.length})`
              : "No results found"}
          </h2>
          
          {filteredVideos.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredVideos.map((video) => (
                <div key={video.id} className="flex-shrink-0">
                  <div className="relative rounded-lg overflow-hidden cursor-pointer group">
                    <div className="aspect-video relative">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover"
                      />
                      {video.isLive && (
                        <div className="absolute top-2 left-2 px-2 py-1 bg-live text-white text-xs font-bold rounded">
                          LIVE
                        </div>
                      )}
                    </div>
                    <div className="p-3 bg-card">
                      <h3 className="font-semibold text-foreground line-clamp-2 text-sm">
                        {video.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        {video.channelName}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {video.views} views
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">
              Try adjusting your search or filters.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
