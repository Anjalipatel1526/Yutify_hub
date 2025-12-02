import { Play, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import heroImage from "@/assets/hero-podcast.jpg";

const HeroSection = () => {
  return (
    <section className="relative h-[80vh] overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>
      
      <div className="relative container mx-auto px-4 h-full flex items-center">
        <div className="max-w-2xl space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <Badge className="bg-podcast/20 text-podcast border-podcast/30 hover:bg-podcast/30">
            Trending Podcast
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            The Creative <span className="text-primary">Journey</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl">
            Join us for an inspiring conversation with industry leaders sharing their experiences, 
            challenges, and insights on building successful creative careers.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 rounded-full px-8">
              <Play className="w-5 h-5" fill="currentColor" />
              Watch Now
            </Button>
            <Button size="lg" variant="secondary" className="gap-2 rounded-full px-8">
              <Plus className="w-5 h-5" />
              My List
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
