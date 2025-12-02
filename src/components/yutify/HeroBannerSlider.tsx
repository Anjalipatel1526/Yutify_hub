import { useState, useEffect } from "react";
import { Play, Info, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroBannerSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const banners = [
    {
      id: 1,
      title: "Parliament Winter Session 2025",
      description: "Watch live coverage and analysis of the historic parliamentary debates on economic reforms",
      image: "https://images.pexels.com/photos/8828433/pexels-photo-8828433.jpeg?auto=compress&cs=tinysrgb&w=1920",
      category: "LIVE NOW",
      isLive: true
    },
    {
      id: 2,
      title: "Election 2025: The Road Ahead",
      description: "In-depth interviews with key political leaders about their vision for the nation's future",
      image: "https://images.pexels.com/photos/6457579/pexels-photo-6457579.jpeg?auto=compress&cs=tinysrgb&w=1920",
      category: "TRENDING",
      isLive: false
    },
    {
      id: 3,
      title: "Budget Analysis Special",
      description: "Expert economists break down the latest budget proposals and their impact on citizens",
      image: "https://images.pexels.com/photos/7876695/pexels-photo-7876695.jpeg?auto=compress&cs=tinysrgb&w=1920",
      category: "FEATURED",
      isLive: false
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [banners.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const currentBanner = banners[currentSlide];

  return (
    <section className="relative h-[85vh] overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
        style={{
          backgroundImage: `url(${currentBanner.image})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      <div className="relative container mx-auto px-4 h-full flex items-center">
        <div className="max-w-2xl space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="flex items-center gap-3">
            {currentBanner.isLive && (
              <div className="bg-live px-3 py-1 rounded-md text-xs font-bold text-white animate-pulse flex items-center gap-2">
                <span className="w-2 h-2 bg-white rounded-full"></span>
                LIVE
              </div>
            )}
            <span className="bg-primary/20 text-primary px-3 py-1 rounded-md text-xs font-bold border border-primary/30">
              {currentBanner.category}
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            {currentBanner.title}
          </h1>

          <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
            {currentBanner.description}
          </p>

          <div className="flex flex-wrap gap-4">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 rounded-md px-8 h-12 text-base font-semibold shadow-lg shadow-primary/20"
            >
              <Play className="w-5 h-5" fill="currentColor" />
              Watch Now
            </Button>
            <Button
              size="lg"
              variant="secondary"
              className="gap-2 rounded-md px-8 h-12 text-base font-semibold bg-secondary/80 backdrop-blur-sm hover:bg-secondary"
            >
              <Info className="w-5 h-5" />
              More Info
            </Button>
          </div>
        </div>
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background/50 backdrop-blur-sm hover:bg-background/80 flex items-center justify-center transition-all duration-200 hover:scale-110"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background/50 backdrop-blur-sm hover:bg-background/80 flex items-center justify-center transition-all duration-200 hover:scale-110"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-12 h-1 rounded-full transition-all duration-300 ${
              index === currentSlide ? "bg-primary w-16" : "bg-white/30 hover:bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroBannerSlider;
