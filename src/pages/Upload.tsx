import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import Header from "@/components/Header";

export default function Upload() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("podcast");
  const [thumbnail, setThumbnail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    if (!user) {
      toast.error("Please login to upload content");
      navigate("/auth");
    }
  }, [navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !description || !thumbnail) {
      toast.error("Please fill in all fields");
      return;
    }

    const user = JSON.parse(localStorage.getItem("currentUser") || "{}");
    const videos = JSON.parse(localStorage.getItem("userVideos") || "[]");
    
    const newVideo = {
      id: Date.now().toString(),
      title,
      description,
      category,
      thumbnail,
      duration: "0:00",
      uploadedBy: user.username,
      userId: user.id,
      createdAt: new Date().toISOString()
    };
    
    videos.push(newVideo);
    localStorage.setItem("userVideos", JSON.stringify(videos));
    
    toast.success("Content uploaded successfully!");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 bg-gradient-primary bg-clip-text text-transparent">
            Upload Content
          </h1>
          
          <form onSubmit={handleSubmit} className="space-y-6 bg-surface/30 p-8 rounded-2xl border border-border/20">
            <div>
              <label className="block text-sm font-medium mb-2">Title</label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter content title"
                className="bg-background/50"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter description"
                rows={4}
                className="w-full px-3 py-2 bg-background/50 border border-input rounded-md"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 bg-background/50 border border-input rounded-md"
              >
                <option value="podcast">Podcast</option>
                <option value="interview">Interview</option>
                <option value="live">Live</option>
                <option value="politics">Politics</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Thumbnail URL</label>
              <Input
                value={thumbnail}
                onChange={(e) => setThumbnail(e.target.value)}
                placeholder="Enter thumbnail URL"
                className="bg-background/50"
              />
            </div>
            
            <Button type="submit" size="lg" className="w-full">
              Upload Content
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
