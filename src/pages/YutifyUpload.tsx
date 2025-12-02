import { useState } from "react";
import { useNavigate } from "react-router-dom";
import YutifyHeader from "@/components/yutify/YutifyHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Upload, Video, Mic, Radio, Film } from "lucide-react";

const YutifyUpload = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<"interview" | "podcast" | "reel" | "live">("interview");
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [video, setVideo] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setThumbnail(e.target.files[0]);
    }
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      if (category === "reel") {
        const videoElement = document.createElement("video");
        videoElement.preload = "metadata";

        videoElement.onloadedmetadata = () => {
          window.URL.revokeObjectURL(videoElement.src);
          if (videoElement.duration > 60) {
            toast.error("Reels must be 60 seconds or less");
            e.target.value = "";
            return;
          }
          setVideo(file);
        };

        videoElement.src = URL.createObjectURL(file);
      } else {
        setVideo(file);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description || !thumbnail || !video) {
      toast.error("Please fill in all fields");
      return;
    }

    setUploading(true);

    setTimeout(() => {
      setUploading(false);
      toast.success("Content uploaded successfully!");
      navigate("/");
    }, 2000);
  };

  const categories = [
    { id: "interview" as const, label: "Interview Video", icon: Video, description: "Political interviews and discussions" },
    { id: "podcast" as const, label: "Podcast Video", icon: Mic, description: "Long-form political podcasts" },
    { id: "reel" as const, label: "Reel (Max 60s)", icon: Film, description: "Short political content" },
    { id: "live" as const, label: "Start Live Session", icon: Radio, description: "Stream live political coverage" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <YutifyHeader />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Upload Political Content
          </h1>
          <p className="text-muted-foreground mb-8">
            Share your political insights, interviews, and analysis with millions
          </p>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Upload className="w-5 h-5 text-primary" />
                Content Type
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {categories.map((cat) => {
                  const Icon = cat.icon;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setCategory(cat.id)}
                      className={`p-6 rounded-lg border-2 transition-all duration-300 text-left ${
                        category === cat.id
                          ? "border-primary bg-primary/10 shadow-lg shadow-primary/20"
                          : "border-border bg-card hover:border-primary/50"
                      }`}
                    >
                      <Icon className={`w-8 h-8 mb-3 ${category === cat.id ? "text-primary" : "text-muted-foreground"}`} />
                      <h3 className="font-semibold text-lg mb-1">{cat.label}</h3>
                      <p className="text-sm text-muted-foreground">{cat.description}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6 space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-2">Title *</label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter a compelling title for your content"
                  className="bg-background/50"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Description *</label>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your content, key topics, and what viewers will learn"
                  rows={5}
                  className="bg-background/50"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Thumbnail Image *</label>
                <div className="flex items-center gap-4">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleThumbnailChange}
                    className="bg-background/50"
                    required
                  />
                  {thumbnail && (
                    <span className="text-sm text-muted-foreground">
                      {thumbnail.name}
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Recommended: 1280x720px (16:9 ratio)
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  {category === "live" ? "Start Live Stream" : "Video File *"}
                </label>
                {category === "live" ? (
                  <div className="bg-background/50 border border-border rounded-lg p-8 text-center">
                    <Radio className="w-16 h-16 mx-auto mb-4 text-live" />
                    <h3 className="text-lg font-semibold mb-2">Ready to Go Live?</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      You'll be able to configure your stream settings on the next page
                    </p>
                  </div>
                ) : (
                  <>
                    <Input
                      type="file"
                      accept="video/*"
                      onChange={handleVideoChange}
                      className="bg-background/50"
                      required
                    />
                    {category === "reel" && (
                      <p className="text-xs text-live mt-1 font-semibold">
                        Maximum duration: 60 seconds
                      </p>
                    )}
                    {video && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Selected: {video.name}
                      </p>
                    )}
                  </>
                )}
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/")}
                className="flex-1"
                disabled={uploading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 font-semibold"
                disabled={uploading}
              >
                {uploading ? "Uploading..." : category === "live" ? "Start Live Stream" : "Upload Content"}
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default YutifyUpload;
