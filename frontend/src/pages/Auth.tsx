import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/lib/api"; 
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Mic, Waves, ShieldCheck, Zap } from "lucide-react";

export default function Auth() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAuth = async (type: "login" | "signup") => {
    setIsLoading(true);
    try {
      const endpoint = type === "login" ? "/api/auth/login" : "/api/auth/signup";
      const response = await api.post(endpoint, formData);
      
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate("/dashboard");
    } catch (error: any) {
      alert(error.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2 bg-zinc-950">
      {/* LEFT SIDE: BRANDING */}
      <div className="hidden lg:flex flex-col justify-between p-12 bg-gradient-to-br from-violet-900/20 via-zinc-950 to-zinc-950 border-r border-zinc-800">
        <div className="flex items-center gap-2">
          <div className="bg-violet-600 p-2 rounded-xl">
            <Mic className="text-white h-6 w-6" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-white">podOn</span>
        </div>

        <div className="space-y-6">
          <h2 className="text-5xl font-bold text-white leading-tight">
            Record crystal clear <br />
            <span className="text-violet-500">studio quality</span> podcasts.
          </h2>
          <div className="grid grid-cols-1 gap-4 text-zinc-400">
            <div className="flex items-center gap-3">
              <Zap className="text-violet-500 h-5 w-5" />
              <span>Local 4K video recording, no internet lag.</span>
            </div>
            <div className="flex items-center gap-3">
              <Waves className="text-violet-500 h-5 w-5" />
              <span>Multi-track audio for professional editing.</span>
            </div>
            <div className="flex items-center gap-3">
              <ShieldCheck className="text-violet-500 h-5 w-5" />
              <span>Resilient chunked uploads to prevent data loss.</span>
            </div>
          </div>
        </div>

        <p className="text-sm text-zinc-500">© 2025 podOn Inc.</p>
      </div>

      {/* RIGHT SIDE: FORM */}
      <div className="flex items-center justify-center p-8">
        <div className="w-full max-w-[400px] space-y-8">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8 bg-zinc-900 border border-zinc-800">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <Card className="bg-zinc-900 border-zinc-800 text-white border-none shadow-none">
                <CardHeader className="px-0 pt-0">
                  <CardTitle className="text-2xl">Welcome back</CardTitle>
                  <CardDescription>Enter your email to sign in to your account</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 px-0">
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input 
                      name="email" 
                      type="email" 
                      placeholder="name@example.com" 
                      onChange={handleChange}
                      className="bg-zinc-950 border-zinc-800"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Password</Label>
                    <Input 
                      name="password" 
                      type="password" 
                      onChange={handleChange}
                      className="bg-zinc-950 border-zinc-800"
                    />
                  </div>
                </CardContent>
                <CardFooter className="px-0 pb-0 pt-4">
                  <Button 
                    onClick={() => handleAuth("login")} 
                    disabled={isLoading} 
                    className="w-full bg-violet-600 hover:bg-violet-700"
                  >
                    {isLoading ? "Signing in..." : "Sign In"}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="signup">
              <Card className="bg-zinc-900 border-zinc-800 text-white border-none shadow-none">
                <CardHeader className="px-0 pt-0">
                  <CardTitle className="text-2xl">Create an account</CardTitle>
                  <CardDescription>Enter your details below to create your account</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 px-0">
                  <div className="space-y-2">
                    <Label>Username</Label>
                    <Input 
                      name="username" 
                      placeholder="johndoe" 
                      onChange={handleChange}
                      className="bg-zinc-950 border-zinc-800"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input 
                      name="email" 
                      type="email" 
                      placeholder="name@example.com" 
                      onChange={handleChange}
                      className="bg-zinc-950 border-zinc-800"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Password</Label>
                    <Input 
                      name="password" 
                      type="password" 
                      onChange={handleChange}
                      className="bg-zinc-950 border-zinc-800"
                    />
                  </div>
                </CardContent>
                <CardFooter className="px-0 pb-0 pt-4">
                  <Button 
                    onClick={() => handleAuth("signup")} 
                    disabled={isLoading} 
                    className="w-full bg-violet-600 hover:bg-violet-700"
                  >
                    {isLoading ? "Creating account..." : "Create Account"}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
