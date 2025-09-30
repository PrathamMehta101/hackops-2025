import { useState } from "react";
import { Card } from "../components/Card";
import { Button } from "../components/Button"
import { Progress } from "../components/Progress";
import { ImageWithFallback } from "../components/ImageWithFallback";

interface MicroLearningProps {
  onNavigate: (page: string) => void;
  gameData: {
    streak: number;
    level: number;
    xp: number;
    xpToNext: number;
    totalXp: number;
  };
  updateGameData: (updates: Partial<MicroLearningProps["gameData"]>) => void;
}

export default function MicroLearning({
  onNavigate,
  gameData,
  updateGameData,
}: MicroLearningProps) {
  const [currentCard, setCurrentCard] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [showSkipRoast, setShowSkipRoast] = useState(false);

  const learningCards = [
    {
      title: "Interstellar Communication 🤝",
      content:
        "Quality over quantity! One meaningful exchange beats 50 random space transmissions. Focus on building genuine connections across the galaxy, not just expanding your contact list.",
      tip: "💡 Cosmic tip: Ask 'What systems are you exploring?' instead of 'Can you beam me up?' - show genuine curiosity!",
      quiz: {
        question:
          "What's the best approach for cosmic networking?",
        options: [
          "Broadcast your coordinates to everyone 📡",
          "Engage meaningfully in space discussions 💬",
          "Only contact galaxy commanders for missions 📈",
          "Avoid space stations and explore alone 🏠",
        ],
        correct: 1,
        correctResponse:
          "Exactly! Quality connections > quantity signals! 🎯",
        wrongResponse:
          "Not quite! Remember: one real alliance > 100 space endorsements 😅",
      },
    },
    {
      title: "Galactic Transmissions That Work 📧",
      content:
        "Keep it short, clear, and mission-oriented. Your crew receives 100+ transmissions daily - respect their time. Use star charts, clear coordinates, and always end with next orbital steps.",
      tip: "💡 Cosmic tip: If it takes more than 2 light-minutes to read, it should be a holographic meeting instead!",
      quiz: {
        question: "What makes a great space transmission?",
        options: [
          "Write an epic saga explaining every asteroid 📚",
          "Use only cosmic emojis to communicate 😂",
          "Keep it short with clear mission items ✅",
          "CC everyone in the galaxy 📢",
        ],
        correct: 2,
        correctResponse:
          "Nailed it! Your crew's communication arrays thank you! 🙌",
        wrongResponse:
          "Oops! Remember: brevity is the soul of not annoying space stations 😄",
      },
    },
    {
      title: "Mission Interview Mastery 💪",
      content:
        "Research the space station, prepare STAR method stories (Situation, Task, Action, Result), and remember - they already like your flight logs or you wouldn't be here! Ask thoughtful questions about the mission and crew culture.",
      tip: "💡 Cosmic tip: Interview them too! A mission is a two-way match, not a one-way recruitment.",
      quiz: {
        question: "Best way to show mission readiness?",
        options: [
          "Memorize scripted responses perfectly 🤖",
          "Wing it and hope for the best 🎲",
          "Prepare stories using STAR method 🌟",
          "Only talk about cosmic credits 💰",
        ],
        correct: 2,
        correctResponse:
          "STAR method for the win! You're mission-ready! ⭐",
        wrongResponse:
          "Close, but STAR method stories are your secret weapon! 🎯",
      },
    },
  ];

  const card = learningCards[currentCard];
  const progress =
    ((currentCard + 1) / learningCards.length) * 100;

  const handleNext = () => {
    if (currentCard < learningCards.length - 1) {
      setCurrentCard(currentCard + 1);
      setShowQuiz(false);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      // Completed all cards - award XP
      const xpGained = 50;
      const newXp = gameData.xp + xpGained;
      const newLevel =
        newXp >= gameData.xpToNext
          ? gameData.level + 1
          : gameData.level;

      updateGameData({
        xp:
          newXp >= gameData.xpToNext
            ? newXp - gameData.xpToNext
            : newXp,
        level: newLevel,
        totalXp: gameData.totalXp + xpGained,
      });

      onNavigate("dashboard");
    }
  };

  const handleStartQuiz = () => {
    setShowQuiz(true);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowResult(true);

    // Award XP for attempting quiz
    const xpGained =
      answerIndex === card.quiz.correct ? 20 : 10;
    updateGameData({
      xp: gameData.xp + xpGained,
      totalXp: gameData.totalXp + xpGained,
    });
  };

  const handleSkip = () => {
    setShowSkipRoast(true);
    setTimeout(() => {
      setShowSkipRoast(false);
      handleNext();
    }, 2000);
  };

  if (showSkipRoast) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-400/20 via-orange-400/20 to-yellow-400/20" />
        <Card className="p-8 bg-slate-800/90 backdrop-blur-sm border-2 border-red-400/50 text-center max-w-md relative z-10">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1706486003955-ed67dc1ed5bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGFjZSUyMGdhbGF4eSUyMHN0YXJzJTIwbmVidWxhJTIwY29zbWljfGVufDF8fHx8MTc1OTIxNDIzOXww&ixlib=rb-4.1.0&q=80&w=400"
            className="w-full h-40 object-cover rounded-lg mb-4"
            alt="Disappointed cosmic scene"
          />
          <h2 className="text-2xl mb-4 text-red-300">Really? 😤</h2>
          <p className="text-slate-300">
            "POV: You skip the free cosmic wisdom that could launch
            your career to the stars" 📚💔
          </p>
          <p className="text-sm text-slate-400 mt-2">
            The universe is not mad, just cosmically disappointed... 😔
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 pb-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 via-blue-400/20 to-purple-400/20" />

      <div className="max-w-2xl mx-auto space-y-6 relative z-10">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl mb-2 text-slate-200">⭐ Stellar Knowledge</h1>
          <p className="text-slate-300">
            Bite-sized cosmic wisdom that travels faster than
            light speed ✨
          </p>
        </div>

        {/* Progress */}
        <Card className="p-4 bg-slate-800/80 backdrop-blur-sm border-2 border-blue-400/50">
          <div className="flex justify-between text-sm mb-2 text-slate-300">
            <span>Mission Progress</span>
            <span>
              {currentCard + 1}/{learningCards.length}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </Card>

        {/* Learning Card */}
        {!showQuiz ? (
          <Card className="p-8 bg-slate-800/90 backdrop-blur-sm border-2 border-green-400/50 shadow-xl">
            <div className="space-y-6">
              <h2 className="text-2xl text-center text-green-300">
                {card.title}
              </h2>

              <div className="bg-slate-700/50 p-6 rounded-lg border-l-4 border-green-400">
                <p className="text-slate-200 leading-relaxed">
                  {card.content}
                </p>
              </div>

              <div className="bg-blue-900/30 p-4 rounded-lg">
                <p className="text-blue-300">{card.tip}</p>
              </div>

              <div className="flex gap-4 justify-center">
                <Button
                  onClick={handleStartQuiz}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                >
                  🧠 Cosmic Quiz Time!
                </Button>

                <Button
                  variant="outline"
                  onClick={handleSkip}
                  className="border-2 border-slate-400 text-slate-300 hover:bg-slate-700/50 px-6 py-3 rounded-full"
                >
                  Skip Mission 👀
                </Button>
              </div>
            </div>
          </Card>
        ) : (
          /* Quiz Card */
          <Card className="p-8 bg-slate-800/90 backdrop-blur-sm border-2 border-purple-400/50 shadow-xl">
            <div className="space-y-6">
              <h3 className="text-xl text-center text-purple-300">
                🎯 Navigation Check!
              </h3>

              <div className="bg-purple-50 p-6 rounded-lg">
                <p className="text-gray-700 mb-6">
                  {card.quiz.question}
                </p>

                <div className="space-y-3">
                  {card.quiz.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() =>
                        !showResult && handleAnswerSelect(index)
                      }
                      disabled={showResult}
                      className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                        showResult
                          ? index === card.quiz.correct
                            ? "bg-green-100 border-green-400 text-green-800"
                            : index === selectedAnswer
                              ? "bg-red-100 border-red-400 text-red-800"
                              : "bg-gray-100 border-gray-300 text-gray-600"
                          : "bg-white border-purple-200 hover:border-purple-400 hover:bg-purple-50"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {showResult && (
                <div
                  className={`p-4 rounded-lg ${
                    selectedAnswer === card.quiz.correct
                      ? "bg-green-100 text-green-800"
                      : "bg-orange-100 text-orange-800"
                  }`}
                >
                  <p>
                    {selectedAnswer === card.quiz.correct
                      ? card.quiz.correctResponse
                      : card.quiz.wrongResponse}
                  </p>
                  <p className="text-sm mt-2 opacity-75">
                    +
                    {selectedAnswer === card.quiz.correct
                      ? "20"
                      : "10"}{" "}
                    XP earned! 🎉
                  </p>
                </div>
              )}

              {showResult && (
                <div className="text-center">
                  <Button
                    onClick={handleNext}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                  >
                    {currentCard < learningCards.length - 1
                      ? "➡️ Next Lesson"
                      : "🎉 Complete!"}
                  </Button>
                </div>
              )}
            </div>
          </Card>
        )}

        {/* Back Button */}
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() => onNavigate("dashboard")}
            className="text-gray-500 hover:text-gray-700"
          >
            ← Back to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}