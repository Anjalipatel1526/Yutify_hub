import { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

const filterChips = [
  { id: "all", label: "All", color: "bg-foreground/10" },
  { id: "live", label: "Live", color: "bg-live/20 text-live border-live/30" },
  { id: "podcast", label: "Podcast", color: "bg-podcast/20 text-podcast border-podcast/30" },
  { id: "interview", label: "Interview", color: "bg-interview/20 text-interview border-interview/30" },
  { id: "reels", label: "Reels", color: "bg-reel/20 text-reel border-reel/30" },
  { id: "speeches", label: "Speeches", color: "bg-primary/20 text-primary border-primary/30" },
];

interface SmartSearchProps {
  onSearch: (query: string, filter: string) => void;
  isExpanded: boolean;
  onExpandChange: (expanded: boolean) => void;
}

export default function SmartSearch({ onSearch, isExpanded, onExpandChange }: SmartSearchProps) {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isExpanded]);

  useEffect(() => {
    onSearch(query, activeFilter);
  }, [query, activeFilter, onSearch]);

  const handleFilterClick = (filterId: string) => {
    setActiveFilter(filterId);
  };

  return (
    <div className={cn(
      "transition-all duration-300",
      isExpanded ? "w-full max-w-2xl" : "w-auto"
    )}>
      <div className="relative">
        {/* Search Input */}
        <div className={cn(
          "flex items-center gap-3 bg-secondary/50 backdrop-blur-sm rounded-full border border-border transition-all",
          isExpanded ? "px-4 py-3" : "p-3"
        )}>
          <Search className="w-5 h-5 text-muted-foreground flex-shrink-0" />
          
          {isExpanded ? (
            <>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search political content..."
                className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground outline-none"
              />
              {query && (
                <button onClick={() => setQuery("")} className="text-muted-foreground hover:text-foreground">
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={() => onExpandChange(false)}
                className="text-muted-foreground hover:text-foreground text-sm"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => onExpandChange(true)}
              className="text-muted-foreground hover:text-foreground hidden md:block"
            >
              Search
            </button>
          )}
        </div>
        
        {/* Filter Chips */}
        {isExpanded && (
          <div className="flex flex-wrap gap-2 mt-3 px-2 animate-in fade-in slide-in-from-top-2 duration-200">
            {filterChips.map((chip) => (
              <button
                key={chip.id}
                onClick={() => handleFilterClick(chip.id)}
                className={cn(
                  "px-4 py-1.5 rounded-full text-sm font-medium border transition-all",
                  activeFilter === chip.id
                    ? chip.id === "all" 
                      ? "bg-foreground text-background border-foreground" 
                      : chip.color + " border"
                    : "bg-transparent text-muted-foreground border-border hover:border-foreground/30"
                )}
              >
                {chip.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
