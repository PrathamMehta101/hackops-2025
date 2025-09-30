import React, { useState } from "react";

const quizzes = [
  {
    title: "React Basics Quiz",
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

function Quizpage() {
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

  if (selectedQuiz === null) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200">
        <div className="bg-white shadow-xl rounded-xl p-10 w-full max-w-md">
          <h2 className="text-2xl font-bold mb-8 text-center text-purple-700">
            Select a Quiz
          </h2>
          <div className="flex flex-col gap-6">
            {quizzes.map((quiz, idx) => (
              <button
                key={quiz.title}
                onClick={() => handleQuizSelect(idx)}
                className="py-3 px-6 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold shadow-md hover:scale-105 transition-transform"
              >
                {quiz.title}
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200">
      <div className="bg-white shadow-xl rounded-xl p-10 w-full max-w-xl">
        <button
          onClick={() => setSelectedQuiz(null)}
          className="mb-6 px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium transition"
        >
          ← Back to Quiz List
        </button>
        <h2 className="text-2xl font-bold mb-8 text-center text-purple-700">
          {quiz.title}
        </h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <div className="flex flex-col gap-8">
            {quiz.questions.map((q, qIdx) => (
              <div key={q.question} className="mb-2">
                <div className="font-semibold text-lg mb-3 text-gray-800">
                  {qIdx + 1}. {q.question}
                </div>
                <div className="flex flex-col gap-2">
                  {q.options.map((opt, oIdx) => (
                    <label
                      key={opt}
                      className={`flex items-center gap-3 px-3 py-2 rounded cursor-pointer border transition
                        ${
                          answers[qIdx] === oIdx
                            ? "bg-purple-100 border-purple-400"
                            : "bg-gray-50 border-gray-200 hover:border-purple-300"
                        }
                        ${
                          showScore && q.answer === oIdx
                            ? "ring-2 ring-green-400"
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
                        className="accent-purple-600"
                      />
                      <span className="text-gray-700">{opt}</span>
                      {showScore && q.answer === oIdx && (
                        <span className="ml-2 text-green-600 font-bold">✓</span>
                      )}
                      {showScore &&
                        answers[qIdx] === oIdx &&
                        answers[qIdx] !== q.answer && (
                          <span className="ml-2 text-red-500 font-bold">✗</span>
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
              className={`mt-8 w-full py-3 rounded-lg font-semibold text-lg shadow transition
                ${
                  answers.includes(-1)
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:scale-105"
                }
              `}
            >
              Submit
            </button>
          ) : (
            <div className="mt-8 text-center">
              <h3 className="text-xl font-bold text-purple-700">
                Your Score: {score} / {quiz.questions.length}
              </h3>
              <button
                className="mt-4 px-6 py-2 rounded bg-blue-500 text-white font-semibold hover:bg-blue-600 transition"
                onClick={() => setSelectedQuiz(null)}
              >
                Try Another Quiz
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default Quizpage;
