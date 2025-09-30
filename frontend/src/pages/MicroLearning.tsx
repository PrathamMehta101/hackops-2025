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
  // Update streak in sessionStorage based on correct answers
  const currentStreak = parseInt(sessionStorage.getItem("streak") || "0", 10);
  const newStreak = currentStreak + score * 10;
  sessionStorage.setItem("streak", newStreak.toString());

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
            <div className="mt-10 text-center p-8 bg-gradient-nebula/20 border border-cosmic-pink/30 rounded-2xl text-white">
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
