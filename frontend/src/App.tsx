import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Homepage from "./pages/Homepage";
import Learningpage from "./pages/Learningpage";
import Quizpage from "./pages/Quizpage";
import Wheelpage from "./pages/Wheelpage";
import Reelspage from "./pages/Reelspage";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import MicroLearning from "./pages/MicroLearning";
import CareerExplorer from "./pages/CareerExplorer";
import ATSChecker from "./pages/ATSChecker";
import { useState } from "react";
import GlassNavbar from "./pages/GlassNavbar";
import GlassFooter from "./pages/GlassFooter";
import Chatbot from "./pages/Chatbot";

function App() {
  const [user, setUser] = useState<{ name?: string } | null>(null);
  const [gameData, setGameData] = useState({
    streak: 7,
    level: 3,
    xp: 230,
    xpToNext: 300,
    totalXp: 830,
  });

  const updateGameData = (updates: Partial<typeof gameData>) => {
    setGameData((prev) => ({ ...prev, ...updates }));
  };

  const navigate = useNavigate();
  return (
    <div>
      <div className="min-h-screen bg-black relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-950/30 to-black"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.05),transparent_70%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(147,51,234,0.05),transparent_70%)]"></div>

        {/* Stars */}
        <div className="absolute inset-0 bg-[radial-gradient(white_0.5px,transparent_0.5px)] bg-[length:120px_120px] opacity-15"></div>
        <div className="absolute inset-0 bg-[radial-gradient(white_0.3px,transparent_0.3px)] bg-[length:80px_80px] opacity-10 animate-pulse"></div>

          <>
            <GlassNavbar
              currentPage="" // currentPage no longer needed since router controls
              onNavigate={() => {}} // not used with router
              gameData={gameData}
            />
          </>

   

        <div className={user ? "pt-20 pb-20" : "py-20"}>
           
          {/* <Navbar /> */}
          <Routes>
            <Route path="/" element={<LandingPage  onNavigate={() => {
                    navigate("/dashboard");
                  }} />} />
            {/* <Route path="/learn" element={<Learningpage />} /> */}
            {/* <Route path="/quiz" element={<Quizpage />} /> */}
            {/* <Route path="/wheel" element={<Wheelpage />} /> */}
            <Route path="/reels" element={<Reelspage />} />
            {/* <Route path="/chatbot" element={<Chatbot />} /> */}
            <Route
              path="/dashboard"
              element={<Dashboard gameData={gameData} user={user} />}
            />
            <Route
              path="/learning"
              element={
                <MicroLearning
                  // onNavigate={() => {
                  //   navigate("/dashboard");
                  // }}
                  // gameData={gameData}
                  // updateGameData={updateGameData}
                />
              }
            />
            <Route
              path="/explorer"
              element={
                <CareerExplorer
                  onNavigate={() => {
                    navigate("/dashboard");
                  }}
                />
              }
            />
            <Route
              path="/ats"
              element={
                <ATSChecker
                  onNavigate={() => {
                    navigate("/dashboard");
                  }}
                  gameData={gameData}
                  updateGameData={updateGameData}
                />
              }
            />
          </Routes>
              <div className="fixed bottom-4 right-4 z-50">
                <Chatbot />
              </div>
        </div>
      </div>

      {!user && <GlassFooter />}
    </div>
  );
}
export default App;
