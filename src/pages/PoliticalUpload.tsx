import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import PoliticalHeader from "@/components/political/PoliticalHeader";
import { 
  Mic, 
  Headphones, 
  Film, 
  Building2, 
  Radio,
  Upload,
  Eye,
  EyeOff,
  Lock,
  Calendar,
  Clock,
  MapPin,
  User,
  Tag,
  FileVideo,
  Image,
  AlertTriangle,
  MessageSquare,
  Check
} from "lucide-react";
import { cn } from "@/lib/utils";

type ContentType = "interview" | "podcast" | "reels" | "speeches" | "live";
type Visibility = "public" | "unlisted" | "private";

const contentTypes = [
  { id: "interview" as ContentType, label: "Interview", icon: Mic, description: "Long-form conversations" },
  { id: "podcast" as ContentType, label: "Podcast", icon: Headphones, description: "Audio & video podcasts" },
  { id: "reels" as ContentType, label: "Reels", icon: Film, description: "Short vertical videos" },
  { id: "speeches" as ContentType, label: "Speeches", icon: Building2, description: "Political speeches" },
  { id: "live" as ContentType, label: "Live", icon: Radio, description: "Live streaming" },
];

export default function PoliticalUpload() {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState<ContentType>("interview");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  
  // Common fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [visibility, setVisibility] = useState<Visibility>("public");
  const [commentsEnabled, setCommentsEnabled] = useState(true);
  const [sensitiveContent, setSensitiveContent] = useState(false);
  
  // Interview fields
  const [intervieweeName, setIntervieweeName] = useState("");
  const [politicalTopic, setPoliticalTopic] = useState("");
  
  // Podcast fields
  const [hostName, setHostName] = useState("");
  const [topicTags, setTopicTags] = useState("");
  const [isAudioOnly, setIsAudioOnly] = useState(false);
  
  // Reels fields
  const [caption, setCaption] = useState("");
  
  // Speeches fields
  const [speakerName, setSpeakerName] = useState("");
  const [eventName, setEventName] = useState("");
  const [speechDate, setSpeechDate] = useState("");
  const [location, setLocation] = useState("");
  
  // Live fields
  const [isScheduled, setIsScheduled] = useState(false);
  const [scheduledDate, setScheduledDate] = useState("");
  const [scheduledTime, setScheduledTime] = useState("");
  const [streamCategory, setStreamCategory] = useState("debate");

  // Auth check
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast.error("Please sign in to upload content");
        navigate("/auth");
      }
    };
    checkAuth();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title) {
      toast.error("Please enter a title");
      return;
    }
    
    setIsUploading(true);
    
    // Simulate upload progress
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 200));
      setUploadProgress(i);
    }
    
    toast.success("Content submitted for review!");
    setIsUploading(false);
    navigate("/");
  };

  const renderTypeSpecificFields = () => {
    switch (selectedType) {
      case "interview":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="flex items-center gap-2 mb-2">
                  <User className="w-4 h-4" />
                  Interviewee Name
                </Label>
                <Input
                  value={intervieweeName}
                  onChange={(e) => setIntervieweeName(e.target.value)}
                  placeholder="Name of the person interviewed"
                  className="bg-background/50 border-border/30"
                />
              </div>
              <div>
                <Label className="flex items-center gap-2 mb-2">
                  <Tag className="w-4 h-4" />
                  Political Topic
                </Label>
                <Input
                  value={politicalTopic}
                  onChange={(e) => setPoliticalTopic(e.target.value)}
                  placeholder="e.g., Election 2024, Policy Reform"
                  className="bg-background/50 border-border/30"
                />
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Interviews support long-form horizontal videos with likes, comments, and watchlist enabled by default.
            </p>
          </div>
        );
        
      case "podcast":
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-muted/20 rounded-lg">
              <Switch
                checked={isAudioOnly}
                onCheckedChange={setIsAudioOnly}
              />
              <Label>Audio-only podcast (no video)</Label>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="flex items-center gap-2 mb-2">
                  <User className="w-4 h-4" />
                  Speaker / Host Name
                </Label>
                <Input
                  value={hostName}
                  onChange={(e) => setHostName(e.target.value)}
                  placeholder="Host or speaker name"
                  className="bg-background/50 border-border/30"
                />
              </div>
              <div>
                <Label className="flex items-center gap-2 mb-2">
                  <Tag className="w-4 h-4" />
                  Topic Tags
                </Label>
                <Input
                  value={topicTags}
                  onChange={(e) => setTopicTags(e.target.value)}
                  placeholder="Separate tags with commas"
                  className="bg-background/50 border-border/30"
                />
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Podcasts will appear in podcast-focused carousels and search filters.
            </p>
          </div>
        );
        
      case "reels":
        return (
          <div className="space-y-4">
            <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
              <div className="flex items-center gap-2 text-primary mb-2">
                <Film className="w-5 h-5" />
                <span className="font-medium">Vertical Video (9:16)</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Reels must be 30-90 seconds. Vertical format required.
              </p>
            </div>
            <div>
              <Label className="flex items-center gap-2 mb-2">
                <MessageSquare className="w-4 h-4" />
                Caption
              </Label>
              <Textarea
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Write a catchy caption..."
                rows={2}
                className="bg-background/50 border-border/30"
              />
            </div>
            <div>
              <Label className="flex items-center gap-2 mb-2">
                <Tag className="w-4 h-4" />
                Topic Tags
              </Label>
              <Input
                value={topicTags}
                onChange={(e) => setTopicTags(e.target.value)}
                placeholder="Separate tags with commas"
                className="bg-background/50 border-border/30"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Reels will automatically appear in the reels feed.
            </p>
          </div>
        );
        
      case "speeches":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="flex items-center gap-2 mb-2">
                  <User className="w-4 h-4" />
                  Speaker Name
                </Label>
                <Input
                  value={speakerName}
                  onChange={(e) => setSpeakerName(e.target.value)}
                  placeholder="Name of the speaker"
                  className="bg-background/50 border-border/30"
                />
              </div>
              <div>
                <Label className="flex items-center gap-2 mb-2">
                  <Building2 className="w-4 h-4" />
                  Event Name
                </Label>
                <Input
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                  placeholder="e.g., Parliament Session, Rally"
                  className="bg-background/50 border-border/30"
                />
              </div>
              <div>
                <Label className="flex items-center gap-2 mb-2">
                  <Calendar className="w-4 h-4" />
                  Date of Speech
                </Label>
                <Input
                  type="date"
                  value={speechDate}
                  onChange={(e) => setSpeechDate(e.target.value)}
                  className="bg-background/50 border-border/30"
                />
              </div>
              <div>
                <Label className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4" />
                  Location
                </Label>
                <Input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="City or venue"
                  className="bg-background/50 border-border/30"
                />
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Full-length political speeches. You can add timestamp highlights after upload.
            </p>
          </div>
        );
        
      case "live":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setIsScheduled(false)}
                className={cn(
                  "p-4 rounded-lg border-2 transition-all text-left",
                  !isScheduled 
                    ? "border-destructive bg-destructive/10" 
                    : "border-border/30 bg-background/30 hover:border-border/50"
                )}
              >
                <Radio className={cn("w-6 h-6 mb-2", !isScheduled ? "text-destructive" : "text-muted-foreground")} />
                <div className="font-medium">Go Live Now</div>
                <p className="text-xs text-muted-foreground">Start streaming immediately</p>
              </button>
              <button
                type="button"
                onClick={() => setIsScheduled(true)}
                className={cn(
                  "p-4 rounded-lg border-2 transition-all text-left",
                  isScheduled 
                    ? "border-primary bg-primary/10" 
                    : "border-border/30 bg-background/30 hover:border-border/50"
                )}
              >
                <Calendar className={cn("w-6 h-6 mb-2", isScheduled ? "text-primary" : "text-muted-foreground")} />
                <div className="font-medium">Schedule Stream</div>
                <p className="text-xs text-muted-foreground">Set a future date & time</p>
              </button>
            </div>
            
            {isScheduled && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-muted/20 rounded-lg">
                <div>
                  <Label className="flex items-center gap-2 mb-2">
                    <Calendar className="w-4 h-4" />
                    Scheduled Date
                  </Label>
                  <Input
                    type="date"
                    value={scheduledDate}
                    onChange={(e) => setScheduledDate(e.target.value)}
                    className="bg-background/50 border-border/30"
                  />
                </div>
                <div>
                  <Label className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4" />
                    Scheduled Time
                  </Label>
                  <Input
                    type="time"
                    value={scheduledTime}
                    onChange={(e) => setScheduledTime(e.target.value)}
                    className="bg-background/50 border-border/30"
                  />
                </div>
              </div>
            )}
            
            <div>
              <Label className="flex items-center gap-2 mb-2">
                <Tag className="w-4 h-4" />
                Stream Category
              </Label>
              <select
                value={streamCategory}
                onChange={(e) => setStreamCategory(e.target.value)}
                className="w-full px-3 py-2 bg-background/50 border border-border/30 rounded-md text-foreground"
              >
                <option value="debate">Debate</option>
                <option value="election">Election Coverage</option>
                <option value="press">Press Meet</option>
                <option value="rally">Political Rally</option>
                <option value="interview">Live Interview</option>
                <option value="analysis">News Analysis</option>
              </select>
            </div>
            
            {!isScheduled && (
              <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg flex items-center gap-3">
                <div className="w-3 h-3 bg-destructive rounded-full animate-pulse" />
                <span className="text-sm font-medium text-destructive">Ready to go LIVE</span>
              </div>
            )}
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <PoliticalHeader />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Upload Content</h1>
          <p className="text-muted-foreground mb-8">
            Select your content type and fill in the details
          </p>
          
          {/* Content Type Selection */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
            {contentTypes.map((type) => (
              <button
                key={type.id}
                type="button"
                onClick={() => setSelectedType(type.id)}
                className={cn(
                  "p-4 rounded-xl border-2 transition-all text-center group",
                  selectedType === type.id
                    ? "border-primary bg-primary/10"
                    : "border-border/30 bg-card/30 hover:border-border/50 hover:bg-card/50"
                )}
              >
                <type.icon className={cn(
                  "w-8 h-8 mx-auto mb-2 transition-colors",
                  selectedType === type.id ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                )} />
                <div className={cn(
                  "font-medium text-sm",
                  selectedType === type.id ? "text-primary" : "text-foreground"
                )}>
                  {type.label}
                </div>
                <p className="text-xs text-muted-foreground mt-1 hidden md:block">
                  {type.description}
                </p>
              </button>
            ))}
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Common Fields */}
            <div className="bg-card/30 border border-border/20 rounded-2xl p-6 space-y-4">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <FileVideo className="w-5 h-5" />
                Basic Information
              </h2>
              
              <div>
                <Label className="mb-2 block">Title *</Label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter a compelling title"
                  className="bg-background/50 border-border/30"
                  required
                />
              </div>
              
              <div>
                <Label className="mb-2 block">Description</Label>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your content..."
                  rows={4}
                  className="bg-background/50 border-border/30"
                />
              </div>
              
              <div>
                <Label className="flex items-center gap-2 mb-2">
                  <Image className="w-4 h-4" />
                  Thumbnail URL
                </Label>
                <Input
                  value={thumbnail}
                  onChange={(e) => setThumbnail(e.target.value)}
                  placeholder="https://example.com/thumbnail.jpg"
                  className="bg-background/50 border-border/30"
                />
              </div>
            </div>
            
            {/* Type-Specific Fields */}
            <div className="bg-card/30 border border-border/20 rounded-2xl p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                {contentTypes.find(t => t.id === selectedType)?.icon && (
                  <span className="text-primary">
                    {(() => {
                      const Icon = contentTypes.find(t => t.id === selectedType)?.icon;
                      return Icon ? <Icon className="w-5 h-5" /> : null;
                    })()}
                  </span>
                )}
                {contentTypes.find(t => t.id === selectedType)?.label} Details
              </h2>
              {renderTypeSpecificFields()}
            </div>
            
            {/* Visibility & Settings */}
            <div className="bg-card/30 border border-border/20 rounded-2xl p-6 space-y-4">
              <h2 className="text-lg font-semibold">Visibility & Settings</h2>
              
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setVisibility("public")}
                  className={cn(
                    "p-3 rounded-lg border-2 transition-all flex flex-col items-center gap-2",
                    visibility === "public"
                      ? "border-primary bg-primary/10"
                      : "border-border/30 hover:border-border/50"
                  )}
                >
                  <Eye className={cn("w-5 h-5", visibility === "public" ? "text-primary" : "text-muted-foreground")} />
                  <span className="text-sm font-medium">Public</span>
                </button>
                <button
                  type="button"
                  onClick={() => setVisibility("unlisted")}
                  className={cn(
                    "p-3 rounded-lg border-2 transition-all flex flex-col items-center gap-2",
                    visibility === "unlisted"
                      ? "border-primary bg-primary/10"
                      : "border-border/30 hover:border-border/50"
                  )}
                >
                  <EyeOff className={cn("w-5 h-5", visibility === "unlisted" ? "text-primary" : "text-muted-foreground")} />
                  <span className="text-sm font-medium">Unlisted</span>
                </button>
                <button
                  type="button"
                  onClick={() => setVisibility("private")}
                  className={cn(
                    "p-3 rounded-lg border-2 transition-all flex flex-col items-center gap-2",
                    visibility === "private"
                      ? "border-primary bg-primary/10"
                      : "border-border/30 hover:border-border/50"
                  )}
                >
                  <Lock className={cn("w-5 h-5", visibility === "private" ? "text-primary" : "text-muted-foreground")} />
                  <span className="text-sm font-medium">Private</span>
                </button>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <div className="font-medium text-sm">Enable Comments</div>
                    <p className="text-xs text-muted-foreground">Allow viewers to comment</p>
                  </div>
                </div>
                <Switch
                  checked={commentsEnabled}
                  onCheckedChange={setCommentsEnabled}
                />
              </div>
              
              <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <div className="font-medium text-sm">Sensitive Content</div>
                    <p className="text-xs text-muted-foreground">Flag for age restriction</p>
                  </div>
                </div>
                <Switch
                  checked={sensitiveContent}
                  onCheckedChange={setSensitiveContent}
                />
              </div>
            </div>
            
            {/* Moderation Notice */}
            <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-amber-500">Content Moderation</p>
                <p className="text-xs text-muted-foreground">
                  All uploads are reviewed by our moderation team before public visibility. Verified channels may have expedited review.
                </p>
              </div>
            </div>
            
            {/* Submit Button */}
            <Button 
              type="submit" 
              size="lg" 
              className="w-full h-14 text-lg"
              disabled={isUploading}
            >
              {isUploading ? (
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  <span>Uploading... {uploadProgress}%</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  <span>Submit for Review</span>
                </div>
              )}
            </Button>
            
            {isUploading && (
              <div className="w-full bg-muted/30 rounded-full h-2 overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
