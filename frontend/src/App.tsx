import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Auth from "@/pages/Auth";
import Dashboard from "@/pages/Dashboard";
import Lobby from "@/pages/Lobby";
import Studio from "@/pages/Studio";

// A simple component to check if the user is logged in
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/auth" replace />;
  return <>{children}</>;
};

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-zinc-950 text-white selection:bg-blue-500/30">
        <Routes>
          {/* 1. Public Auth Page */}
          <Route path="/auth" element={<Auth />} />

          {/* 2. Protected Dashboard (Host Only) */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />

          {/* 3. The Lobby (Where guests arrive via Invite Link) */}
          <Route path="/join/:inviteCode" element={<Lobby />} />

          {/* 4. The Studio (The Recording Room) */}
          <Route path="/studio/:studioId" element={<Studio />} />

          {/* 5. Default Redirect: If they go to "/", send them to dashboard */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
