import { ChevronRight } from "lucide-react";
import ContentCard from "./ContentCard";

interface Content {
  id: string;
  title: string;
  duration: string;
  thumbnail: string;
  isLive?: boolean;
}

interface ContentRowProps {
  title: string;
  category: "live" | "podcast" | "interview";
  contents: Content[];
}

const ContentRow = ({ title, category, contents }: ContentRowProps) => {
  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">{title}</h2>
          <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors">
            See all
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {contents.map((content) => (
            <ContentCard
              key={content.id}
              title={content.title}
              duration={content.duration}
              thumbnail={content.thumbnail}
              category={category}
              isLive={content.isLive}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContentRow;
