import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import YutifyUpload from "./pages/YutifyUpload";
import Watchlist from "./pages/Watchlist";
import Categories from "./pages/Categories";
import Reels from "./pages/Reels";
import MyChannel from "./pages/MyChannel";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/yutify-upload" element={<YutifyUpload />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/reels" element={<Reels />} />
          <Route path="/my-channel" element={<MyChannel />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
