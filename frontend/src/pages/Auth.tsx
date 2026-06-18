import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/lib/api";
import {
  Mic,
  Zap,
  Shield,
  Sparkles,
  ChevronRight,
  Loader2,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const BrandLogo = () => (
  <div className="flex items-center gap-3 group cursor-pointer">
    <div className="relative">
      <div className="absolute -inset-6 bg-violet-400/20 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      <div className="absolute -inset-3 bg-violet-500/15 blur-xl rounded-full animate-pulse" />
      <div className="relative bg-gradient-to-br from-violet-400 via-fuchsia-500 to-purple-600 p-2.5 rounded-2xl shadow-xl shadow-violet-500/40 ring-1 ring-white/20">
        <Mic className="text-white h-5 w-5" strokeWidth={2.5} />
      </div>
    </div>
    <span className="text-2xl font-bold tracking-tight bg-gradient-to-r from-white via-zinc-100 to-zinc-300 bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(139,92,246,0.3)]">
      podOn
    </span>
  </div>
);

const FeatureItem = ({ icon: Icon, title, desc }: any) => (
  <div className="flex gap-4 p-4 rounded-2xl bg-black/40 border border-white/[0.06] hover:bg-black/60 hover:border-violet-500/30 transition-all duration-300 group cursor-default hover:shadow-[0_0_30px_rgba(139,92,246,0.08)]">
    <div className="h-10 w-10 shrink-0 rounded-xl bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 border border-violet-500/20 flex items-center justify-center shadow-[inset_0_0_20px_rgba(139,92,246,0.05)]">
      <Icon className="h-5 w-5 text-violet-300 group-hover:scale-110 group-hover:text-violet-200 transition-all duration-300 drop-shadow-[0_0_6px_rgba(139,92,246,0.3)]" />
    </div>
    <div>
      <h4 className="text-sm font-semibold text-zinc-100">{title}</h4>
      <p className="text-xs text-zinc-500 leading-relaxed mt-0.5">{desc}</p>
    </div>
  </div>
);

export default function Auth() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e: any) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleAuth = async () => {
    setIsLoading(true);
    try {
      const endpoint = isLogin ? "/api/auth/login" : "/api/auth/signup";
      const response = await api.post(endpoint, formData);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate("/dashboard");
    } catch (error: any) {
      alert(error.response?.data?.message || "Auth Failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-black flex items-center justify-center p-6 selection:bg-violet-500/30 overflow-hidden">
      {/* Animated gradient orbs - heavy glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-15%] w-[60%] h-[60%] bg-violet-600/25 blur-[180px] rounded-full animate-pulse" />
        <div className="absolute top-[30%] right-[-20%] w-[50%] h-[50%] bg-fuchsia-600/20 blur-[180px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-20%] left-[10%] w-[45%] h-[45%] bg-purple-600/20 blur-[180px] rounded-full animate-pulse" />
        <div className="absolute top-[10%] left-[40%] w-[30%] h-[30%] bg-violet-500/10 blur-[140px] rounded-full animate-pulse" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.06] brightness-0 invert" />
      </div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* Rotating glow blob top-left */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] -translate-x-1/4 -translate-y-1/4 pointer-events-none">
        <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent,violet,fuchsia,purple,transparent)] blur-[80px] rounded-full animate-spin" style={{ animationDuration: '8s' }} />
        <div className="absolute inset-[15%] bg-black rounded-full blur-[40px]" />
      </div>

      {/* Outer glow ring behind card */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] bg-violet-500/5 blur-[200px] rounded-full pointer-events-none" />

      <div className="relative z-10 w-full max-w-[1000px] bg-zinc-900/80 border border-white/[0.06] rounded-[32px] overflow-hidden shadow-[0_0_60px_rgba(139,92,246,0.12),0_0_120px_rgba(139,92,246,0.06)] grid grid-cols-1 lg:grid-cols-5">
        {/* LEFT PANEL */}
        <div className="hidden lg:flex col-span-2 flex-col justify-between p-12 border-r border-white/[0.05] bg-gradient-to-b from-violet-600/[0.06] via-fuchsia-600/[0.03] to-transparent relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-500/[0.04] to-transparent pointer-events-none" />
          <div className="absolute top-[-50%] right-[-50%] w-full h-full bg-violet-500/5 blur-[100px] rounded-full pointer-events-none" />
          <div className="relative z-10 space-y-8">
            <BrandLogo />

            <div className="space-y-6">
              <h1 className="text-4xl font-bold tracking-tight leading-[1.1]">
                <span className="bg-gradient-to-r from-white via-zinc-100 to-zinc-300 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                  The studio
                </span>
                <br />
                <span className="text-zinc-500 italic font-light">
                  in your browser.
                </span>
              </h1>

              <div className="space-y-2.5">
                <FeatureItem
                  icon={Zap}
                  title="Zero Latency"
                  desc="Local recording ensures internet drops never ruin a session."
                />
                <FeatureItem
                  icon={Shield}
                  title="Resilient Uploads"
                  desc="Progressive chunking saves your data every 10 seconds."
                />
                <FeatureItem
                  icon={Sparkles}
                  title="Studio Polish"
                  desc="Automated level-matching and AI noise removal."
                />
              </div>
            </div>
          </div>

          <div className="relative z-10">
            <Badge variant="gradient" className="text-[10px] tracking-widest uppercase px-3 py-1 rounded-full shadow-[0_0_20px_rgba(139,92,246,0.15)]">
              Trusted by the top 1%
            </Badge>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="col-span-3 p-8 lg:p-16 flex flex-col justify-center bg-black/40">
          <div className="max-w-[360px] mx-auto w-full space-y-8">
            {/* Header */}
            <div className="space-y-2 text-center lg:text-left">
              <h2 className="text-3xl font-bold tracking-tight">
                <span className="bg-gradient-to-r from-white via-zinc-100 to-zinc-300 bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(255,255,255,0.04)]">
                  {isLogin ? "Welcome back" : "Get started"}
                </span>
              </h2>
              <p className="text-zinc-500 text-sm">
                {isLogin
                  ? "Enter your keys to enter the studio."
                  : "Join the next generation of podcasters."}
              </p>
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-violet-400/20 to-transparent" />

            {/* Form */}
            <div className="space-y-5">
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-zinc-400 text-xs font-medium">
                    Username
                  </Label>
                  <Input
                    id="username"
                    name="username"
                    placeholder="alex_creator"
                    onChange={handleChange}
                    size="xl"
                  />
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-zinc-400 text-xs font-medium">
                  Email Address
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@company.com"
                  onChange={handleChange}
                  size="xl"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-zinc-400 text-xs font-medium">
                  Password
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  onChange={handleChange}
                  size="xl"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-4 pt-2">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-violet-600/15 via-fuchsia-600/15 to-purple-600/15 blur-2xl rounded-3xl opacity-75" />
                <Button
                  variant="gradient"
                  size="xl"
                  onClick={handleAuth}
                  disabled={isLoading}
                  className="relative w-full shadow-[0_0_30px_rgba(139,92,246,0.25)] hover:shadow-[0_0_45px_rgba(139,92,246,0.35)] transition-shadow duration-300"
                >
                  {isLoading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <>
                      {isLogin ? "Enter Dashboard" : "Create Account"}
                      <ChevronRight className="h-4 w-4 group-hover/button:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>
              </div>

              <button
                onClick={() => setIsLogin(!isLogin)}
                className="w-full text-center text-xs text-zinc-500 hover:text-violet-300 transition-colors duration-300 group cursor-pointer bg-transparent border-0"
              >
                <span className="relative">
                  {isLogin
                    ? "Need an account? Sign up"
                    : "Already have an account? Log in"}
                  <span className="absolute -bottom-px left-0 w-0 h-px bg-violet-400/50 group-hover:w-full transition-all duration-300" />
                </span>
              </button>
            </div>

            {/* Legal */}
            <div className="pt-6">
              <div className="h-px bg-gradient-to-r from-transparent via-violet-400/20 to-transparent mb-6" />
              <p className="text-[10px] text-zinc-600 text-center uppercase tracking-[0.2em] leading-loose">
                By entering, you agree to our{" "}
                <span className="text-zinc-500 hover:text-violet-400 cursor-pointer transition-colors underline underline-offset-4 decoration-white/[0.06] hover:decoration-violet-400/30">
                  Legal Framework
                </span>{" "}
                &{" "}
                <span className="text-zinc-500 hover:text-violet-400 cursor-pointer transition-colors underline underline-offset-4 decoration-white/[0.06] hover:decoration-violet-400/30">
                  Privacy Protocol
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
