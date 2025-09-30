import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { Progress } from "../components/Progress";

interface DashboardProps {
  gameData: {
    streak: number;
    level: number;
    xp: number;
    xpToNext: number;
    totalXp: number;
  };
  onNavigate: (page: string) => void;
  user?: {
    name?: string;
  };
}

export default function Dashboard({ gameData, onNavigate, user }: DashboardProps) {
  const { streak, level, xp, xpToNext, totalXp } = gameData;
  
  const progressPercentage = (xp / xpToNext) * 100;
  
  const dailyCareerBytes = [
    "💡 73% of astronauts experience space vertigo - you're not lost, you're exploring!",
    "🎯 The average space explorer visits 3 new systems per year - embrace the vastness!",
    "🔥 Teams with dual navigation have 15% fewer trajectory errors - two minds > one mind",
    "💼 Remote space workers discover 13% more planets (but take 47% more stargazing breaks ☕)",
    "🚀 85% of cosmic opportunities aren't broadcasted publicly - networking > space boards!"
  ];
  
  const dailyByte = dailyCareerBytes[Math.floor(Math.random() * dailyCareerBytes.length)];
  
  const getLevelTitle = (level: number) => {
    const titles = {
      1: "Space Cadet 🚀",
      2: "Asteroid Explorer 🌑",
      3: "Planet Navigator 🪐",
      4: "Solar Pilot ☀️",
      5: "Galaxy Commander 🌌",
      6: "Universe Master 🌟"
    };
    return titles[level as keyof typeof titles] || "Cosmic Legend ✨";
  };

  const getStreakMessage = (streak: number) => {
    if (streak >= 30) return "Orbital pattern legendary! 🔥🔥🔥";
    if (streak >= 14) return "Two weeks of stellar navigation! 💪";
    if (streak >= 7) return "One week in orbit - you're cosmic! 🚀";
    if (streak >= 3) return "Building that flight path! 📈";
    return "Mission log: Day 1 - Journey initiated 🌱";
  };

  const getProductivityMessage = () => {
    const messages = [
      "Navigation system status: 67% accuracy (better than GPS in space) 🛰️😅",
      "Autopilot mode: 'Course set for success' activated 🤷‍♀️",
      "Current status: 42% starlight, 58% cosmic wisdom ☕",
      "Today's energy: Launch, orbit, and aim for the stars 🎭",
      "Mission status: No asteroid collisions detected (yet) 😂✨"
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  return (
    <div className="min-h-screen p-4 pb-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 via-purple-400/20 to-pink-400/20" />
      
      <div className="max-w-4xl mx-auto space-y-6 relative z-10">
        {/* Welcome Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl mb-2 text-slate-200">Welcome back to base, {user?.name}! 👋</h1>
          <p className="text-slate-300">{getProductivityMessage()}</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Streak Card */}
          <Card className="p-6 bg-slate-800/80 backdrop-blur-sm border-2 border-orange-400/50 hover:shadow-lg hover:shadow-orange-400/20 transition-all">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl text-orange-300">🌟 Orbital Streak</h3>
              <div className="text-3xl font-bold text-orange-400">{streak}</div>
            </div>
            <p className="text-slate-300 mb-4">{getStreakMessage(streak)}</p>
            <div className="bg-slate-700/50 p-3 rounded-lg font-mono text-sm">
              <p className="text-orange-300">
                $ mission-log --daily "orbital pattern maintained"<br/>
                Don't let your trajectory decay into a black hole! 🕳️
              </p>
            </div>
          </Card>

          {/* Level Card */}
          <Card className="p-6 bg-slate-800/80 backdrop-blur-sm border-2 border-purple-400/50 hover:shadow-lg hover:shadow-purple-400/20 transition-all">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl text-purple-300">🪐 Rank {level}</h3>
              <div className="text-lg font-medium text-purple-400">{getLevelTitle(level)}</div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-sm text-slate-300">
                <span>Cosmic Energy</span>
                <span>{xp}/{xpToNext} CE</span>
              </div>
              <Progress value={progressPercentage} className="h-3" />
              <p className="text-xs text-slate-400">
                {xpToNext - xp} CE until rank {level + 1}! 🚀
              </p>
            </div>
          </Card>
        </div>

        {/* Daily Career Byte */}
        <Card className="p-6 bg-slate-800/80 backdrop-blur-sm border-2 border-blue-400/50">
          <div className="flex items-start space-x-4">
            <div className="text-4xl">⭐</div>
            <div className="flex-1">
              <h3 className="text-xl mb-3 text-blue-300">Today's Cosmic Wisdom</h3>
              <div className="bg-slate-900 text-cyan-400 p-4 rounded-lg font-mono text-sm border-l-4 border-blue-400">
                <div className="text-slate-500 mb-2">// Daily navigation insight</div>
                <div className="text-slate-200">{dailyByte}</div>
              </div>
              <p className="text-xs text-slate-400 mt-2">
                Transmitted by deep space AI • orbital sync daily 🔄
              </p>
            </div>
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Button
            onClick={() => onNavigate('learning')}
            className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white p-6 h-auto rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
          >
            <div className="text-center">
              <div className="text-3xl mb-2">⭐</div>
              <div className="text-lg">Stellar Knowledge</div>
              <div className="text-sm opacity-90">Cosmic micro-learning</div>
            </div>
          </Button>

          <Button
            onClick={() => onNavigate('explorer')}
            className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white p-6 h-auto rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
          >
            <div className="text-center">
              <div className="text-3xl mb-2">🌍</div>
              <div className="text-lg">Planet Explorer</div>
              <div className="text-sm opacity-90">Discover new worlds</div>
            </div>
          </Button>

          <Button
            onClick={() => onNavigate('ats')}
            className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white p-6 h-auto rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
          >
            <div className="text-center">
              <div className="text-3xl mb-2">🛸</div>
              <div className="text-lg">Trajectory Calc</div>
              <div className="text-sm opacity-90">Path analyzer</div>
            </div>
          </Button>

          <Button
            variant="outline"
            className="border-2 border-purple-300 text-purple-300 hover:bg-purple-400/10 p-6 h-auto rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
          >
            <div className="text-center">
              <div className="text-3xl mb-2">🏆</div>
              <div className="text-lg">Galaxy Ranks</div>
              <div className="text-sm opacity-75">Coming Soon!</div>
            </div>
          </Button>
        </div>

        {/* CI/CD Pipeline Stats */}
        <Card className="p-6 bg-white/80 backdrop-blur-sm border-2 border-indigo-200">
          <h3 className="text-xl mb-4">📊 Your Development Pipeline</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-indigo-600">{totalXp}</div>
              <div className="text-sm text-gray-600">Total XP</div>
              <div className="text-xs text-gray-400">Code Points</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">{Math.floor(totalXp / 50)}</div>
              <div className="text-sm text-gray-600">Builds Passed</div>
              <div className="text-xs text-gray-400">Successful Deploys</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-600">{streak}</div>
              <div className="text-sm text-gray-600">Commit Streak</div>
              <div className="text-xs text-gray-400">Days Active</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">{level}</div>
              <div className="text-sm text-gray-600">Dev Level</div>
              <div className="text-xs text-gray-400">Experience Tier</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}