import { Button } from "../components/Button";
import {
  Home,
  Compass,
  BookOpen,
  Users,
  User,
  Flame,
  Trophy,
} from "lucide-react";
import { useAuth0 } from "@auth0/auth0-react";

interface GlassNavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  gameData: {
    streak: number;
    level: number;
  };
}

export default function GlassNavbar({
  currentPage,
  onNavigate,
  gameData,
}: GlassNavbarProps) {
  const navItems = [
    { id: "dashboard", icon: Home, label: "Base", color: "text-blue-400" },
    {
      id: "explorer",
      icon: Compass,
      label: "Explore",
      color: "text-purple-400",
    },
    {
      id: "learning",
      icon: BookOpen,
      label: "Knowledge",
      color: "text-green-400",
    },
    { id: "ats", icon: Users, label: "Trajectory", color: "text-cyan-400" },
    { id: "profile", icon: User, label: "Pilot", color: "text-pink-400" },
  ];

  const handleNavClick = (pageId: string) => {
    if (pageId === "profile") {
      // Profile is placeholder for now
      return;
    }
    onNavigate(pageId);
  };
  const { loginWithRedirect, isAuthenticated, logout, user } = useAuth0();

  return (
    <div className="fixed top-0 left-0 right-0 z-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">🌌</span>
            </div>
            <span className="text-white/90 font-semibold text-xl">
              Career Cosmos
            </span>
          </div>

          {/* Center Navigation */}
          <div className="bg-black/50 backdrop-blur-xl border border-white/20 rounded-full shadow-2xl p-1">
            <div className="flex items-center space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;
                const isDisabled = item.id === "profile";

                return (
                  <>
                    <Button
                      key={item.id}
                      variant="ghost"
                      size="sm"
                      onClick={() => handleNavClick(item.id)}
                      disabled={isDisabled}
                      className={`flex items-center space-x-2 rounded-full px-4 py-2 transition-all duration-200 hover:bg-white/10 ${
                        isActive ? "bg-white/20 shadow-lg" : ""
                      } ${
                        isDisabled
                          ? "opacity-50 cursor-not-allowed"
                          : "hover:scale-105"
                      }`}
                    >
                      <Icon
                        className={`w-4 h-4 ${
                          isActive ? item.color : "text-white/70"
                        }`}
                      />
                      <span
                        className={`text-sm ${
                          isActive ? item.color : "text-white/70"
                        }`}
                      >
                        {item.label}
                      </span>
                      {isDisabled && (
                        <span className="text-xs text-white/40">Soon</span>
                      )}
                    </Button>
                  </>
                );
              })}
            </div>
          </div>

          {/* Right Stats */}
          <div className="flex items-center space-x-3">
            {isAuthenticated && (
              <p className="text-white/80 text-sm">{user?.name}</p>
            )}
            {isAuthenticated ? (
              <li>
                <button
                  onClick={() =>
                    logout({
                      logoutParams: { returnTo: window.location.origin },
                    })
                  }
                  className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
                >
                  Log Out
                </button>
              </li>
            ) : (
              <li>
                <button
                  onClick={() => loginWithRedirect()}
                  className="bg-green-500 px-3 py-1 rounded hover:bg-green-600"
                >
                  Log In
                </button>
              </li>
            )}
            <div className="bg-orange-500/30 backdrop-blur-xl border border-orange-400/30 rounded-full px-3 py-1 flex items-center space-x-2">
              <Flame className="w-4 h-4 text-orange-400" />
              <span className="text-sm font-medium text-orange-300">
                {gameData.streak}
              </span>
            </div>

            <div className="bg-purple-500/30 backdrop-blur-xl border border-purple-400/30 rounded-full px-3 py-1 flex items-center space-x-2">
              <Trophy className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-medium text-purple-300">
                L{gameData.level}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
