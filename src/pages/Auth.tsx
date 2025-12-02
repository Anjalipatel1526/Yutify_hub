import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password || (!isLogin && !username)) {
      toast.error("Please fill in all fields");
      return;
    }

    if (isLogin) {
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const user = users.find((u: any) => u.email === email && u.password === password);
      
      if (user) {
        localStorage.setItem("currentUser", JSON.stringify(user));
        toast.success("Welcome back!");
        navigate("/");
      } else {
        toast.error("Invalid credentials");
      }
    } else {
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      
      if (users.find((u: any) => u.email === email)) {
        toast.error("Email already exists");
        return;
      }
      
      const newUser = { id: Date.now().toString(), email, password, username };
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem("currentUser", JSON.stringify(newUser));
      toast.success("Account created successfully!");
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-surface/50 backdrop-blur-lg p-8 rounded-2xl border border-border/20">
          <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-primary bg-clip-text text-transparent">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h1>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <Input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-background/50 border-border/30"
                />
              </div>
            )}
            
            <div>
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-background/50 border-border/30"
              />
            </div>
            
            <div>
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-background/50 border-border/30"
              />
            </div>
            
            <Button type="submit" className="w-full" size="lg">
              {isLogin ? "Sign In" : "Sign Up"}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
