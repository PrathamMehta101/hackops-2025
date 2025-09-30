// import { useState } from "react";
// import { Card } from "../components/Card";
// import { Button } from "../components/Button"
// import { Progress } from "../components/Progress";
// import { ImageWithFallback } from "../components/ImageWithFallback";

// interface MicroLearningProps {
//   onNavigate: (page: string) => void;
//   gameData: {
//     streak: number;
//     level: number;
//     xp: number;
//     xpToNext: number;
//     totalXp: number;
//   };
//   updateGameData: (updates: Partial<MicroLearningProps["gameData"]>) => void;
// }

// export default function MicroLearning({
//   onNavigate,
//   gameData,
//   updateGameData,
// }: MicroLearningProps) {
//   const [currentCard, setCurrentCard] = useState(0);
//   const [showQuiz, setShowQuiz] = useState(false);
//   const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
//   const [showResult, setShowResult] = useState(false);
//   const [showSkipRoast, setShowSkipRoast] = useState(false);

//   const learningCards = [
//     {
//       title: "Interstellar Communication 🤝",
//       content:
//         "Quality over quantity! One meaningful exchange beats 50 random space transmissions. Focus on building genuine connections across the galaxy, not just expanding your contact list.",
//       tip: "💡 Cosmic tip: Ask 'What systems are you exploring?' instead of 'Can you beam me up?' - show genuine curiosity!",
//       quiz: {
//         question:
//           "What's the best approach for cosmic networking?",
//         options: [
//           "Broadcast your coordinates to everyone 📡",
//           "Engage meaningfully in space discussions 💬",
//           "Only contact galaxy commanders for missions 📈",
//           "Avoid space stations and explore alone 🏠",
//         ],
//         correct: 1,
//         correctResponse:
//           "Exactly! Quality connections > quantity signals! 🎯",
//         wrongResponse:
//           "Not quite! Remember: one real alliance > 100 space endorsements 😅",
//       },
//     },
//     {
//       title: "Galactic Transmissions That Work 📧",
//       content:
//         "Keep it short, clear, and mission-oriented. Your crew receives 100+ transmissions daily - respect their time. Use star charts, clear coordinates, and always end with next orbital steps.",
//       tip: "💡 Cosmic tip: If it takes more than 2 light-minutes to read, it should be a holographic meeting instead!",
//       quiz: {
//         question: "What makes a great space transmission?",
//         options: [
//           "Write an epic saga explaining every asteroid 📚",
//           "Use only cosmic emojis to communicate 😂",
//           "Keep it short with clear mission items ✅",
//           "CC everyone in the galaxy 📢",
//         ],
//         correct: 2,
//         correctResponse:
//           "Nailed it! Your crew's communication arrays thank you! 🙌",
//         wrongResponse:
//           "Oops! Remember: brevity is the soul of not annoying space stations 😄",
//       },
//     },
//     {
//       title: "Mission Interview Mastery 💪",
//       content:
//         "Research the space station, prepare STAR method stories (Situation, Task, Action, Result), and remember - they already like your flight logs or you wouldn't be here! Ask thoughtful questions about the mission and crew culture.",
//       tip: "💡 Cosmic tip: Interview them too! A mission is a two-way match, not a one-way recruitment.",
//       quiz: {
//         question: "Best way to show mission readiness?",
//         options: [
//           "Memorize scripted responses perfectly 🤖",
//           "Wing it and hope for the best 🎲",
//           "Prepare stories using STAR method 🌟",
//           "Only talk about cosmic credits 💰",
//         ],
//         correct: 2,
//         correctResponse:
//           "STAR method for the win! You're mission-ready! ⭐",
//         wrongResponse:
//           "Close, but STAR method stories are your secret weapon! 🎯",
//       },
//     },
//   ];

//   const card = learningCards[currentCard];
//   const progress =
//     ((currentCard + 1) / learningCards.length) * 100;

//   const handleNext = () => {
//     if (currentCard < learningCards.length - 1) {
//       setCurrentCard(currentCard + 1);
//       setShowQuiz(false);
//       setSelectedAnswer(null);
//       setShowResult(false);
//     } else {
//       // Completed all cards - award XP
//       const xpGained = 50;
//       const newXp = gameData.xp + xpGained;
//       const newLevel =
//         newXp >= gameData.xpToNext
//           ? gameData.level + 1
//           : gameData.level;

//       updateGameData({
//         xp:
//           newXp >= gameData.xpToNext
//             ? newXp - gameData.xpToNext
//             : newXp,
//         level: newLevel,
//         totalXp: gameData.totalXp + xpGained,
//       });

//       onNavigate("dashboard");
//     }
//   };

//   const handleStartQuiz = () => {
//     setShowQuiz(true);
//   };

//   const handleAnswerSelect = (answerIndex: number) => {
//     setSelectedAnswer(answerIndex);
//     setShowResult(true);

//     // Award XP for attempting quiz
//     const xpGained =
//       answerIndex === card.quiz.correct ? 20 : 10;
//     updateGameData({
//       xp: gameData.xp + xpGained,
//       totalXp: gameData.totalXp + xpGained,
//     });
//   };

//   const handleSkip = () => {
//     setShowSkipRoast(true);
//     setTimeout(() => {
//       setShowSkipRoast(false);
//       handleNext();
//     }, 2000);
//   };

//   if (showSkipRoast) {
//     return (
//       <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
//         <div className="absolute inset-0 bg-gradient-to-br from-red-400/20 via-orange-400/20 to-yellow-400/20" />
//         <Card className="p-8 bg-slate-800/90 backdrop-blur-sm border-2 border-red-400/50 text-center max-w-md relative z-10">
//           <ImageWithFallback
//             src="https://images.unsplash.com/photo-1706486003955-ed67dc1ed5bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGFjZSUyMGdhbGF4eSUyMHN0YXJzJTIwbmVidWxhJTIwY29zbWljfGVufDF8fHx8MTc1OTIxNDIzOXww&ixlib=rb-4.1.0&q=80&w=400"
//             className="w-full h-40 object-cover rounded-lg mb-4"
//             alt="Disappointed cosmic scene"
//           />
//           <h2 className="text-2xl mb-4 text-red-300">Really? 😤</h2>
//           <p className="text-slate-300">
//             "POV: You skip the free cosmic wisdom that could launch
//             your career to the stars" 📚💔
//           </p>
//           <p className="text-sm text-slate-400 mt-2">
//             The universe is not mad, just cosmically disappointed... 😔
//           </p>
//         </Card>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen p-4 pb-24 relative overflow-hidden">
//       {/* Background decoration */}
//       <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 via-blue-400/20 to-purple-400/20" />

//       <div className="max-w-2xl mx-auto space-y-6 relative z-10">
//         {/* Header */}
//         <div className="text-center">
//           <h1 className="text-3xl mb-2 text-slate-200">⭐ Stellar Knowledge</h1>
//           <p className="text-slate-300">
//             Bite-sized cosmic wisdom that travels faster than
//             light speed ✨
//           </p>
//         </div>

//         {/* Progress */}
//         <Card className="p-4 bg-slate-800/80 backdrop-blur-sm border-2 border-blue-400/50">
//           <div className="flex justify-between text-sm mb-2 text-slate-300">
//             <span>Mission Progress</span>
//             <span>
//               {currentCard + 1}/{learningCards.length}
//             </span>
//           </div>
//           <Progress value={progress} className="h-2" />
//         </Card>

//         {/* Learning Card */}
//         {!showQuiz ? (
//           <Card className="p-8 bg-slate-800/90 backdrop-blur-sm border-2 border-green-400/50 shadow-xl">
//             <div className="space-y-6">
//               <h2 className="text-2xl text-center text-green-300">
//                 {card.title}
//               </h2>

//               <div className="bg-slate-700/50 p-6 rounded-lg border-l-4 border-green-400">
//                 <p className="text-slate-200 leading-relaxed">
//                   {card.content}
//                 </p>
//               </div>

//               <div className="bg-blue-900/30 p-4 rounded-lg">
//                 <p className="text-blue-300">{card.tip}</p>
//               </div>

//               <div className="flex gap-4 justify-center">
//                 <Button
//                   onClick={handleStartQuiz}
//                   className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
//                 >
//                   🧠 Cosmic Quiz Time!
//                 </Button>

//                 <Button
//                   variant="outline"
//                   onClick={handleSkip}
//                   className="border-2 border-slate-400 text-slate-300 hover:bg-slate-700/50 px-6 py-3 rounded-full"
//                 >
//                   Skip Mission 👀
//                 </Button>
//               </div>
//             </div>
//           </Card>
//         ) : (
//           /* Quiz Card */
//           <Card className="p-8 bg-slate-800/90 backdrop-blur-sm border-2 border-purple-400/50 shadow-xl">
//             <div className="space-y-6">
//               <h3 className="text-xl text-center text-purple-300">
//                 🎯 Navigation Check!
//               </h3>

//               <div className="bg-purple-50 p-6 rounded-lg">
//                 <p className="text-gray-700 mb-6">
//                   {card.quiz.question}
//                 </p>

//                 <div className="space-y-3">
//                   {card.quiz.options.map((option, index) => (
//                     <button
//                       key={index}
//                       onClick={() =>
//                         !showResult && handleAnswerSelect(index)
//                       }
//                       disabled={showResult}
//                       className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
//                         showResult
//                           ? index === card.quiz.correct
//                             ? "bg-green-100 border-green-400 text-green-800"
//                             : index === selectedAnswer
//                               ? "bg-red-100 border-red-400 text-red-800"
//                               : "bg-gray-100 border-gray-300 text-gray-600"
//                           : "bg-white border-purple-200 hover:border-purple-400 hover:bg-purple-50"
//                       }`}
//                     >
//                       {option}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {showResult && (
//                 <div
//                   className={`p-4 rounded-lg ${
//                     selectedAnswer === card.quiz.correct
//                       ? "bg-green-100 text-green-800"
//                       : "bg-orange-100 text-orange-800"
//                   }`}
//                 >
//                   <p>
//                     {selectedAnswer === card.quiz.correct
//                       ? card.quiz.correctResponse
//                       : card.quiz.wrongResponse}
//                   </p>
//                   <p className="text-sm mt-2 opacity-75">
//                     +
//                     {selectedAnswer === card.quiz.correct
//                       ? "20"
//                       : "10"}{" "}
//                     XP earned! 🎉
//                   </p>
//                 </div>
//               )}

//               {showResult && (
//                 <div className="text-center">
//                   <Button
//                     onClick={handleNext}
//                     className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
//                   >
//                     {currentCard < learningCards.length - 1
//                       ? "➡️ Next Lesson"
//                       : "🎉 Complete!"}
//                   </Button>
//                 </div>
//               )}
//             </div>
//           </Card>
//         )}

//         {/* Back Button */}
//         <div className="text-center">
//           <Button
//             variant="ghost"
//             onClick={() => onNavigate("dashboard")}
//             className="text-gray-500 hover:text-gray-700"
//           >
//             ← Back to Dashboard
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import spaceBackground from "../assets/space-background.jpg";
import { useNavigate } from "react-router";

const quizzes = [
  {
    title: "React Basics Quiz",
    planetColor: "cosmic-purple",
    questions: [
      {
        question: "What is the purpose of useState in React?",
        options: [
          "To manage component state",
          "To fetch data from APIs",
          "To style components",
          "To navigate between pages",
        ],
        answer: 0,
      },
      {
        question: "Which method is used to render React elements to the DOM?",
        options: [
          "ReactDOM.render()",
          "renderComponent()",
          "React.render()",
          "DOM.render()",
        ],
        answer: 0,
      },
      {
        question: "What is a React component?",
        options: [
          "A reusable piece of UI",
          "A database",
          "A CSS file",
          "A backend API",
        ],
        answer: 0,
      },
      {
        question: "Which hook is used for side effects in React?",
        options: ["useEffect", "useState", "useRef", "useMemo"],
        answer: 0,
      },
      {
        question: "What is JSX?",
        options: [
          "A syntax extension for JavaScript",
          "A CSS preprocessor",
          "A database query language",
          "A type of API",
        ],
        answer: 0,
      },
    ],
  },
  {
    title: "Generative AI Quiz",
    planetColor: "cosmic-blue",
    questions: [
      {
        question: "What does 'generative' mean in Generative AI?",
        options: [
          "It generates new content",
          "It only classifies data",
          "It deletes data",
          "It compresses files",
        ],
        answer: 0,
      },
      {
        question: "Which of the following is a popular generative AI model?",
        options: ["GPT-4", "SVM", "Random Forest", "K-Means"],
        answer: 0,
      },
      {
        question:
          "Which type of neural network is commonly used for image generation?",
        options: [
          "GAN (Generative Adversarial Network)",
          "RNN (Recurrent Neural Network)",
          "CNN (Convolutional Neural Network)",
          "SVM (Support Vector Machine)",
        ],
        answer: 0,
      },
      {
        question: "What is a common application of generative AI?",
        options: [
          "Text generation",
          "Sorting numbers",
          "Data encryption",
          "Network routing",
        ],
        answer: 0,
      },
      {
        question: "Which company developed the GPT series of models?",
        options: ["OpenAI", "Google", "Meta", "Microsoft"],
        answer: 0,
      },
    ],
  },
];

function MicroLearning() {
  const [selectedQuiz, setSelectedQuiz] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showScore, setShowScore] = useState(false);

  const handleQuizSelect = (idx: number) => {
    setSelectedQuiz(idx);
    setAnswers(Array(quizzes[idx].questions.length).fill(-1));
    setShowScore(false);
  };

  const handleOptionChange = (qIdx: number, oIdx: number) => {
    const newAnswers = [...answers];
    newAnswers[qIdx] = oIdx;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    setShowScore(true);
  };
  const navigate = useNavigate();

  if (selectedQuiz === null) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden text-white "
        style={{
          backgroundImage: `url(${spaceBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        {/* Cosmic overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-cosmic-space/80 via-cosmic-purple/20 to-cosmic-blue/30"></div>

        {/* Floating stars */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-cosmic-white rounded-full cosmic-twinkle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 bg-card/90 backdrop-blur-2xl border border-cosmic-purple/30 shadow-planet rounded-3xl p-12 w-full max-w-lg cosmic-float text-white ">
          <button
            onClick={() => navigate("/dashboard")}
            className="mb-8 px-6 py-3 rounded-xl bg-secondary/80 hover:bg-secondary border border-cosmic-purple/30 
            text-foreground font-medium transition-all duration-300 hover:shadow-glow text-white"
          >
            ← Back to Galaxy
          </button>
          <div className="text-center mb-12">
            <div className="inline-block p-4 rounded-full bg-gradient-galaxy mb-6 cosmic-glow">
              <div className="w-12 h-12 rounded-full bg-cosmic-white/20 flex items-center justify-center">
                {/* <span className="text-2xl">🌌</span> */}
              </div>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-cosmic-purple to-cosmic-blue bg-clip-text text-transparent mb-4">
              Cosmic Quiz Explorer
            </h1>
            <p className="text-muted-foreground text-lg">
              Choose your planetary quiz destination
            </p>
          </div>

          <div className="flex flex-col gap-6">
            {quizzes.map((quiz, idx) => (
              <button
                key={quiz.title}
                onClick={() => handleQuizSelect(idx)}
                className={`group relative py-6 px-8 rounded-2xl bg-gradient-galaxy border border-cosmic-purple/40 
                  text-white font-semibold text-lg shadow-planet hover:shadow-glow 
                  transform hover:scale-105 transition-all duration-500 cosmic-float overflow-hidden`}
                style={{ animationDelay: `${idx * 0.2}s` }}
              >
                <div className="absolute inset-0 bg-gradient-stellar opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10 flex items-center justify-between">
                  <span>{quiz.title}</span>
                  <div
                    className={`w-8 h-8 rounded-full bg-${quiz.planetColor} shadow-glow cosmic-rotate`}
                  ></div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const quiz = quizzes[selectedQuiz];
  const score = answers.filter(
    (ans, idx) => ans === quiz.questions[idx].answer
  ).length;

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden p-4"
      style={{
        backgroundImage: `url(${spaceBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Cosmic overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-cosmic-space/80 via-cosmic-purple/20 to-cosmic-blue/30"></div>

      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-cosmic-pink/40 rounded-full cosmic-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 bg-card/90 backdrop-blur-lg border border-cosmic-purple/30 shadow-planet rounded-3xl p-8 w-full max-w-3xl cosmic-float">
        <button
          onClick={() => setSelectedQuiz(null)}
          className="mb-8 px-6 py-3 rounded-xl bg-secondary/80 hover:bg-secondary border border-cosmic-purple/30 
            text-foreground font-medium transition-all duration-300 hover:shadow-glow text-white"
        >
          ← Back to Galaxy
        </button>

        <div className="text-center mb-10">
          <div
            className={`inline-block w-16 h-16 rounded-full bg-${quiz.planetColor} shadow-glow cosmic-rotate mb-4`}
          ></div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-cosmic-purple to-cosmic-blue bg-clip-text text-transparent">
            {quiz.title}
          </h2>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <div className="flex flex-col gap-8">
            {quiz.questions.map((q, qIdx) => (
              <div
                key={q.question}
                className="p-6 bg-secondary/40 backdrop-blur-xl border border-cosmic-purple/20 rounded-2xl text-white"
              >
                <div className="font-semibold text-xl mb-6 text-foreground flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-gradient-galaxy flex items-center justify-center text-sm">
                    {qIdx + 1}
                  </span>
                  {q.question}
                </div>
                <div className="flex flex-col gap-3">
                  {q.options.map((opt, oIdx) => (
                    <label
                      key={opt}
                      className={`group flex items-center gap-4 px-4 py-3 rounded-xl cursor-pointer border transition-all duration-300
                        ${
                          answers[qIdx] === oIdx
                            ? "bg-cosmic-purple/20 border-cosmic-purple shadow-glow"
                            : "bg-muted/30 border-cosmic-purple/20 hover:border-cosmic-purple/50 hover:bg-cosmic-purple/10"
                        }
                        ${
                          showScore && q.answer === oIdx
                            ? "ring-2 ring-cosmic-green shadow-nebula"
                            : ""
                        }
                      `}
                    >
                      <input
                        type="radio"
                        name={`q${qIdx}`}
                        checked={answers[qIdx] === oIdx}
                        onChange={() => handleOptionChange(qIdx, oIdx)}
                        disabled={showScore}
                        className="w-5 h-5 accent-cosmic-purple"
                      />
                      <span className="text-foreground flex-1">{opt}</span>
                      {showScore && q.answer === oIdx && (
                        <span className="text-cosmic-green font-bold text-xl">
                          ✓
                        </span>
                      )}
                      {showScore &&
                        answers[qIdx] === oIdx &&
                        answers[qIdx] !== q.answer && (
                          <span className="text-red-400 font-bold text-xl">
                            ✗
                          </span>
                        )}
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {!showScore ? (
            <button
              type="submit"
              disabled={answers.includes(-1)}
              className={`mt-10 w-full py-4 rounded-2xl font-semibold text-xl shadow-planet transition-all duration-500 text-white
                ${
                  answers.includes(-1)
                    ? "bg-muted/50 text-muted-foreground cursor-not-allowed"
                    : "bg-gradient-galaxy text-cosmic-white hover:shadow-glow hover:scale-105 cosmic-glow"
                }
              `}
            >
              {answers.includes(-1)
                ? "Complete All Questions"
                : "Launch Quiz Results"}
            </button>
          ) : (
            <div className="mt-10 text-center p-8 bg-gradient-nebula/20 border border-cosmic-pink/30 rounded-2xl">
              <div className="mb-6">
                <div className="inline-block w-20 h-20 rounded-full bg-gradient-galaxy flex items-center justify-center text-3xl mb-4 cosmic-glow">
                  🎯
                </div>
                <h3 className="text-3xl font-bold bg-gradient-to-r from-cosmic-purple to-cosmic-pink bg-clip-text text-transparent mb-2">
                  Mission Complete!
                </h3>
                <p className="text-2xl font-bold text-cosmic-white">
                  Score: {score} / {quiz.questions.length}
                </p>
                <p className="text-muted-foreground mt-2">
                  {score === quiz.questions.length
                    ? "Perfect orbit achieved! 🌟"
                    : score >= quiz.questions.length * 0.7
                    ? "Excellent navigation! 🚀"
                    : "Keep exploring the cosmos! 🌌"}
                </p>
              </div>
              <button
                className="px-8 py-3 rounded-xl bg-gradient-galaxy text-cosmic-white font-semibold 
                  hover:shadow-glow transform hover:scale-105 transition-all duration-300"
                onClick={() => setSelectedQuiz(null)}
              >
                Explore Another Planet
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default MicroLearning;
