import { useState } from 'react';
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { motion } from "motion/react";

interface CareerExplorerProps {
  onNavigate: (page: string) => void;
}

interface Career {
  title: string;
  description: string;
  skills: string[];
  resources: string[];
  funFact: string;
}

export default function CareerExplorer({ onNavigate }: CareerExplorerProps) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedCareer, setSelectedCareer] = useState<Career | null>(null);
  const [rotation, setRotation] = useState(0);

  const careers: Career[] = [
    {
      title: "Chief Cosmic Communications 😂",
      description: "Lead interstellar humor initiatives and crew engagement through strategic cosmic content deployment.",
      skills: ["Space Media", "Content Creation", "Alien Psychology", "Perfect Timing"],
      resources: [
        "📚 'The Art of Viral Transmissions' Course",
        "🎨 Holographic Design Suite Mastery",
        "📊 Galaxy Analytics Bootcamp"
      ],
      funFact: "Average salary: 75k cosmic credits + unlimited stellar inspiration"
    },
    {
      title: "Data Constellation Mapper 🧙‍♀️",
      description: "Transform cosmic data streams into magical insights that make space commanders say 'wow' instead of 'what?'",
      skills: ["Python", "Quantum SQL", "Storytelling", "Dark Matter Analysis"],
      resources: [
        "💻 Python for Cosmic Science",
        "📈 Nebula Visualization Masterclass",
        "🧠 Statistics From Beyond the Stars"
      ],
      funFact: "92% of data mappers prefer void mode (the other 8% are from bright nebulas)"
    },
    {
      title: "Experience Architect 🦄",
      description: "Create spacecraft interfaces so intuitive, pilots forget they're navigating - they just feel like they're flying.",
      skills: ["Design Thinking", "Holo-Figma", "Pilot Research", "Cosmic Empathy"],
      resources: [
        "🎨 Galactic Design Systems Guide",
        "👥 Alien Psychology 101",
        "🔬 A/B Testing Across Dimensions"
      ],
      funFact: "Experience architects test 47 shades of starlight to find the perfect one"
    },
    {
      title: "Growth Trajectory Specialist 🚀",
      description: "Find creative, unconventional ways to expand across galaxies faster than competitors can say 'what just happened?'",
      skills: ["Stellar Marketing", "Cosmic Analytics", "Creativity", "Persistence"],
      resources: [
        "📊 Growth Metrics Across the Universe",
        "🎯 Multi-Dimensional Testing",
        "🧪 Experiment Design Workshop"
      ],
      funFact: "Growth specialists see expansion rates in their dreams"
    },
    {
      title: "AI Consciousness Guide 🤖",
      description: "Teach quantum computers to think, learn, and hopefully help expand across the cosmos (fingers crossed).",
      skills: ["Quantum Learning", "Cosmic Python", "Math", "Infinite Patience"],
      resources: [
        "🧠 Neural Networks From Other Dimensions",
        "📊 MLOps in Zero Gravity",
        "🔬 AI Ethics Across Species"
      ],
      funFact: "AI guides speak in quantum algorithms and dream in cosmic code"
    },
    {
      title: "Product Mission Commander 🥷",
      description: "Stealthily build products that space travelers didn't know they needed but can't explore without.",
      skills: ["Strategy", "Crew Research", "Communication", "Stealth Maneuvers"],
      resources: [
        "📋 Product Management in Space",
        "📊 Metrics and KPIs for Galaxies",
        "🎯 Crew Interview Mastery"
      ],
      funFact: "Mission commanders can pivot faster than you can say 'warp speed'"
    }
  ];

  const spinWheel = () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    setSelectedCareer(null);
    
    // Random rotation between 1440° and 2160° (4-6 full spins)
    const spins = 1440 + Math.random() * 720;
    const finalRotation = rotation + spins;
    setRotation(finalRotation);
    
    // Determine which career was selected
    setTimeout(() => {
      const normalizedRotation = finalRotation % 360;
      const sectionSize = 360 / careers.length;
      const selectedIndex = Math.floor((360 - normalizedRotation) / sectionSize) % careers.length;
      
      setSelectedCareer(careers[selectedIndex]);
      setIsSpinning(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen p-4 pb-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-400/20 via-purple-400/20 to-indigo-400/20" />
      
      <div className="max-w-4xl mx-auto space-y-8 relative z-10">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl mb-2">🎡 Career Explorer</h1>
          <p className="text-gray-600">Spin the wheel of fortune... career fortune! ✨</p>
        </div>

        {/* Spin Wheel */}
        <div className="flex flex-col items-center space-y-8">
          <div className="relative">
            {/* Wheel Pointer */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 z-20">
              <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-red-500"></div>
            </div>
            
            {/* Wheel */}
            <motion.div
              className="w-80 h-80 rounded-full border-8 border-white shadow-2xl relative overflow-hidden bg-gradient-to-br from-purple-400 via-pink-400 to-indigo-400"
              animate={{ rotate: rotation }}
              transition={{ duration: 3, ease: "easeOut" }}
            >
              {careers.map((career, index) => {
                const angle = (360 / careers.length) * index;
                const nextAngle = (360 / careers.length) * (index + 1);
                
                return (
                  <div
                    key={index}
                    className="absolute inset-0 flex items-center justify-center"
                    style={{
                      clipPath: `polygon(50% 50%, ${50 + 40 * Math.cos((angle - 90) * Math.PI / 180)}% ${50 + 40 * Math.sin((angle - 90) * Math.PI / 180)}%, ${50 + 40 * Math.cos((nextAngle - 90) * Math.PI / 180)}% ${50 + 40 * Math.sin((nextAngle - 90) * Math.PI / 180)}%)`,
                      backgroundColor: `hsl(${(index * 60) % 360}, 70%, 60%)`
                    }}
                  >
                    <div 
                      className="text-white text-xs font-bold text-center px-2"
                      style={{
                        transform: `rotate(${angle + (360 / careers.length) / 2}deg) translateY(-60px)`
                      }}
                    >
                      {career.title.split(' ')[0]}
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </div>

          <Button
            onClick={spinWheel}
            disabled={isSpinning}
            className={`px-12 py-6 text-xl rounded-full shadow-xl transition-all duration-200 transform ${
              isSpinning
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 hover:scale-105'
            } text-white`}
          >
            {isSpinning ? '🎡 Spinning...' : '🎰 Spin the Wheel!'}
          </Button>
        </div>

        {/* Career Result */}
        {selectedCareer && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="p-8 bg-white/90 backdrop-blur-sm border-2 border-pink-200 shadow-xl">
              <div className="text-center mb-6">
                <h2 className="text-3xl mb-2">🎉 Your Career Destiny!</h2>
                <h3 className="text-2xl text-pink-600">{selectedCareer.title}</h3>
              </div>

              <div className="space-y-6">
                <div className="bg-pink-50 p-6 rounded-lg border-l-4 border-pink-400">
                  <p className="text-gray-700">{selectedCareer.description}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="mb-3">🛠️ Skills You'll Need:</h4>
                    <ul className="space-y-2">
                      {selectedCareer.skills.map((skill, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <span className="w-2 h-2 bg-pink-400 rounded-full"></span>
                          <span>{skill}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="mb-3">📚 Learning Resources:</h4>
                    <ul className="space-y-2">
                      {selectedCareer.resources.map((resource, index) => (
                        <li key={index} className="text-sm text-gray-600">
                          {resource}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <p className="text-yellow-800">💡 {selectedCareer.funFact}</p>
                </div>

                <div className="flex gap-4 justify-center">
                  <Button
                    onClick={spinWheel}
                    variant="outline"
                    className="border-2 border-pink-300 text-pink-700 hover:bg-pink-50 px-6 py-3 rounded-full"
                  >
                    🔄 Spin Again
                  </Button>
                  
                  <Button
                    onClick={() => onNavigate('dashboard')}
                    className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white px-6 py-3 rounded-full"
                  >
                    🏠 Back to Dashboard
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Instructions */}
        {!selectedCareer && !isSpinning && (
          <Card className="p-6 bg-white/60 backdrop-blur-sm border border-gray-200 text-center">
            <p className="text-gray-600">
              🎯 Spin the wheel to discover a random career path! Each spin reveals new opportunities, 
              skills to develop, and learning resources to get you started. Who knows? Your dream job might be just one spin away! ✨
            </p>
          </Card>
        )}

        {/* Back Button */}
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() => onNavigate('dashboard')}
            className="text-gray-500 hover:text-gray-700"
          >
            ← Back to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}