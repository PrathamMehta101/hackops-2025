import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { ImageWithFallback } from "../components/ImageWithFallback";
interface LandingPageProps {
  onNavigate: (page: string) => void;
}

export default function LandingPage({ onNavigate }: LandingPageProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 via-pink-400/20 to-indigo-400/20" />
      <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-300/30 rounded-full blur-xl" />
      <div className="absolute bottom-20 right-20 w-32 h-32 bg-pink-300/30 rounded-full blur-xl" />
      
      <div className="max-w-4xl w-full text-center space-y-8 relative z-10">
        {/* Hero Section */}
        <div className="space-y-6">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Career Galaxy 🌌
            </h1>
            <p className="text-2xl md:text-3xl text-slate-200">
              Navigate Your Career Across the Universe ✨
            </p>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              Chart your course through the cosmos with orbital streaks, AI-powered trajectory analysis, and stellar insights that make professional growth an adventure 🚀
            </p>
          </div>

          {/* Cosmic Inspiration */}
          <Card className="p-6 bg-slate-800/80 backdrop-blur-sm border-2 border-blue-400/50 max-w-md mx-auto">
            <h3 className="text-lg mb-4 text-blue-300">🌟 Cosmic Inspiration</h3>
            <div className="relative">
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1706486003955-ed67dc1ed5bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGFjZSUyMGdhbGF4eSUyMHN0YXJzJTIwbmVidWxhJTIwY29zbWljfGVufDF8fHx8MTc1OTIxNDIzOXww&ixlib=rb-4.1.0&q=80&w=400"
                className="w-full h-48 object-cover rounded-lg"
                alt="Daily cosmic inspiration"
              />
              <div className="absolute bottom-2 left-2 right-2 bg-black/70 text-white p-2 rounded text-sm">
                "Your career trajectory needs recalibration? Let's launch you to the stars! ✨"
              </div>
            </div>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            onClick={() => onNavigate('login')}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
          >
            🚀 Launch Mission
          </Button>
          
          <Button 
            variant="outline"
            onClick={() => onNavigate('ats')}
            className="border-2 border-cyan-400 text-cyan-300 hover:bg-cyan-400/10 px-8 py-3 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
          >
            🛸 Trajectory Analysis
          </Button>
          
          <Button 
            variant="outline"
            onClick={() => onNavigate('explorer')}
            className="border-2 border-pink-400 text-pink-300 hover:bg-pink-400/10 px-8 py-3 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
          >
            🌍 Explore Planets
          </Button>
        </div>

        {/* Feature Preview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          <Card className="p-6 bg-slate-800/60 backdrop-blur-sm border border-blue-400/50 hover:shadow-lg hover:shadow-blue-400/20 transition-all">
            <div className="text-4xl mb-4">🌟</div>
            <h4 className="mb-2 text-blue-300">Orbital Streaks</h4>
            <p className="text-sm text-slate-300">Daily cosmic visits! Miss a day and your orbit decays into a black hole 🕳️</p>
          </Card>
          
          <Card className="p-6 bg-slate-800/60 backdrop-blur-sm border border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-400/20 transition-all">
            <div className="text-4xl mb-4">🛸</div>
            <h4 className="mb-2 text-cyan-300">Trajectory Calculator</h4>
            <p className="text-sm text-slate-300">AI-powered path analyzer that determines if you're ready for interstellar travel 🚀</p>
          </Card>
          
          <Card className="p-6 bg-slate-800/60 backdrop-blur-sm border border-purple-400/50 hover:shadow-lg hover:shadow-purple-400/20 transition-all">
            <div className="text-4xl mb-4">⭐</div>
            <h4 className="mb-2 text-purple-300">Stellar Knowledge</h4>
            <p className="text-sm text-slate-300">Bite-sized cosmic wisdom that travels faster than light</p>
          </Card>
        </div>
      </div>
    </div>
  );
}