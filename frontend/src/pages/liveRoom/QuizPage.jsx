
import React, { useState, useEffect } from "react";
import {
  Eye,
  Edit2,
  Download,
  Printer,
  Share2,
  Clock,
  Hash,
  BookOpen,
  CheckCircle,
  XCircle,
  Code,
  FileText,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  Timer,
  Users,
  BarChart3,
  Award,
  Copy,
  CheckSquare,
  Type as TypeIcon,
  Layers,
  PenTool,
  BookOpenCheck,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

import ResponsiveContainer from "../../components/ResponsiveContainer";

const QuizPage = () => {
  const location = useLocation();
  const [quizData, setQuizData] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [studentAnswers, setStudentAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(30 * 60); // 30 minutes in seconds
  const [isTimerRunning, setIsTimerRunning] = useState(true);

  // Sample quiz data (in real app, this would come from props/location state/API)
  const sampleQuizData = {
    id: "quiz_001",
    title: "JavaScript Fundamentals Quiz",
    description:
      "Test your understanding of basic JavaScript concepts including variables, functions, and control flow.",
    timeLimit: 30, // in minutes
    totalMarks: 100,
    difficulty: "Intermediate",
    topic: "JavaScript Programming",
    createdDate: "2024-01-15",
    status: "published",
    createdBy: "John Doe",
    totalQuestions: 10,
    passingMarks: 60,
    instructions: [
      "This quiz contains 10 questions",
      "Total time allotted is 30 minutes",
      "Each question carries equal marks",
      "No negative marking for wrong answers",
      "You cannot go back to previous questions",
      "Submit before time runs out",
    ],
    questions: [
      {
        id: "q1",
        type: "mcq",
        question:
          "What is the output of `console.log(typeof null)` in JavaScript?",
        marks: 10,
        options: [
          { id: "a", text: "null" },
          { id: "b", text: "object" },
          { id: "c", text: "undefined" },
          { id: "d", text: "string" },
        ],
        correctAnswer: "b",
        explanation:
          'In JavaScript, `typeof null` returns "object" which is a known historical bug in the language.',
      },
      {
        id: "q2",
        type: "true-false",
        question: "JavaScript is a single-threaded language.",
        marks: 10,
        options: [
          { id: "a", text: "True" },
          { id: "b", text: "False" },
        ],
        correctAnswer: "a",
        explanation:
          "JavaScript is indeed single-threaded, though it can handle asynchronous operations through its event loop.",
      },
      {
        id: "q3",
        type: "code",
        question:
          "Write a function that takes an array of numbers and returns the sum of all positive numbers.",
        marks: 15,
        codeTemplate:
          "function sumPositiveNumbers(arr) {\n  // Your code here\n}",
        correctAnswer:
          "function sumPositiveNumbers(arr) {\n  return arr.filter(num => num > 0).reduce((a, b) => a + b, 0);\n}",
        testCases: [
          { input: "[1, -2, 3, -4, 5]", output: "9" },
          { input: "[-1, -2, -3]", output: "0" },
        ],
        explanation: "Remember to filter out negative numbers before summing.",
      },
      {
        id: "q4",
        type: "short-answer",
        question:
          "Explain the difference between `let`, `const`, and `var` in JavaScript.",
        marks: 10,
        correctAnswer:
          "`var` is function-scoped, `let` and `const` are block-scoped. `let` allows reassignment, `const` does not.",
        explanation:
          "These are the three ways to declare variables in modern JavaScript.",
      },
      {
        id: "q5",
        type: "mcq",
        question:
          "Which method is used to add an element to the end of an array?",
        marks: 10,
        options: [
          { id: "a", text: "push()" },
          { id: "b", text: "pop()" },
          { id: "c", text: "shift()" },
          { id: "d", text: "unshift()" },
        ],
        correctAnswer: "a",
        explanation:
          "The push() method adds one or more elements to the end of an array.",
      },
      {
        id: "q6",
        type: "fill-blanks",
        question: "The ______ loop is used to iterate over object properties.",
        marks: 10,
        blanks: [{ id: "blank1", correct: "for...in", studentAnswer: "" }],
        explanation:
          "The for...in loop iterates over the enumerable properties of an object.",
      },
      {
        id: "q7",
        type: "matching",
        question: "Match the following JavaScript methods with their purposes:",
        marks: 15,
        leftItems: [
          { id: "l1", text: "map()" },
          { id: "l2", text: "filter()" },
          { id: "l3", text: "reduce()" },
        ],
        rightItems: [
          { id: "r1", text: "Transforms each element" },
          { id: "r2", text: "Filters elements based on condition" },
          { id: "r3", text: "Reduces array to single value" },
        ],
        correctMatches: { l1: "r1", l2: "r2", l3: "r3" },
        explanation: "These are common array methods in JavaScript.",
      },
      {
        id: "q8",
        type: "code",
        question: "Write a function to check if a string is a palindrome.",
        marks: 10,
        codeTemplate: "function isPalindrome(str) {\n  // Your code here\n}",
        correctAnswer:
          'function isPalindrome(str) {\n  return str === str.split("").reverse().join("");\n}',
        explanation: "Compare the string with its reversed version.",
      },
    ],
  };

  useEffect(() => {
    // In real app, fetch quiz data from API or location state
    setQuizData(sampleQuizData);

    // Initialize student answers
    const initialAnswers = {};
    sampleQuizData.questions.forEach((q) => {
      if (q.type === "mcq" || q.type === "true-false") {
        initialAnswers[q.id] = "";
      } else if (q.type === "short-answer") {
        initialAnswers[q.id] = "";
      } else if (q.type === "code") {
        initialAnswers[q.id] = q.codeTemplate || "";
      } else if (q.type === "fill-blanks") {
        initialAnswers[q.id] = q.blanks.map((b) => ({ id: b.id, answer: "" }));
      } else if (q.type === "matching") {
        initialAnswers[q.id] = {};
      }
    });
    setStudentAnswers(initialAnswers);
  }, []);

  // Timer effect
  useEffect(() => {
    let interval;
    if (isTimerRunning && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            handleSubmitQuiz();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timeRemaining]);

  const handleAnswerSelect = (questionId, answer) => {
    setStudentAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const handleCodeChange = (questionId, code) => {
    setStudentAnswers((prev) => ({
      ...prev,
      [questionId]: code,
    }));
  };

  const handleFillBlankChange = (questionId, blankId, answer) => {
    setStudentAnswers((prev) => {
      const questionAnswers = [...prev[questionId]];
      const blankIndex = questionAnswers.findIndex((b) => b.id === blankId);
      if (blankIndex !== -1) {
        questionAnswers[blankIndex] = {
          ...questionAnswers[blankIndex],
          answer,
        };
      }
      return {
        ...prev,
        [questionId]: questionAnswers,
      };
    });
  };

  const handleMatchingChange = (questionId, leftId, rightId) => {
    setStudentAnswers((prev) => ({
      ...prev,
      [questionId]: {
        ...prev[questionId],
        [leftId]: rightId,
      },
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizData.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleSubmitQuiz = () => {
    setIsTimerRunning(false);
    setShowResults(true);
    calculateResults();
  };

  const calculateResults = () => {
    // Calculate score based on correct answers
    let totalScore = 0;
    let correctAnswers = 0;

    quizData.questions.forEach((q) => {
      const studentAnswer = studentAnswers[q.id];
      let isCorrect = false;

      if (q.type === "mcq" || q.type === "true-false") {
        isCorrect = studentAnswer === q.correctAnswer;
      } else if (q.type === "short-answer") {
        // Simple comparison for demo - in real app would be more sophisticated
        isCorrect = studentAnswer
          .toLowerCase()
          .includes(q.correctAnswer.toLowerCase());
      } else if (q.type === "fill-blanks") {
        isCorrect = studentAnswer.every(
          (blank, index) =>
            blank.answer.toLowerCase() === q.blanks[index].correct.toLowerCase()
        );
      } else if (q.type === "matching") {
        const studentMatches = studentAnswers[q.id];
        isCorrect = Object.keys(studentMatches).every(
          (key) => studentMatches[key] === q.correctMatches[key]
        );
      }

      if (isCorrect) {
        totalScore += q.marks;
        correctAnswers++;
      }
    });

    return {
      totalScore,
      correctAnswers,
      percentage: (totalScore / quizData.totalMarks) * 100,
      passed: totalScore >= quizData.passingMarks,
    };
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const getQuestionTypeIcon = (type) => {
    switch (type) {
      case "mcq":
        return CheckSquare;
      case "true-false":
        return TypeIcon;
      case "code":
        return Code;
      case "short-answer":
        return FileText;
      case "fill-blanks":
        return PenTool;
      case "matching":
        return Layers;
      default:
        return BookOpen;
    }
  };

  const getQuestionTypeColor = (type) => {
    switch (type) {
      case "mcq":
        return "bg-purple-600";
      case "true-false":
        return "bg-teal";
      case "code":
        return "bg-blue-600";
      case "short-answer":
        return "bg-yellow-600";
      case "fill-blanks":
        return "bg-green-600";
      case "matching":
        return "bg-pink-600";
      default:
        return "bg-gray-600";
    }
  };

  if (!quizData) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white">Loading quiz...</div>
      </div>
    );
  }

  const currentQuestion = quizData.questions[currentQuestionIndex];
  const results = showResults ? calculateResults() : null;

  return (
    <div className="min-h-screen relative w-full flex bg-gray-900">
      {/* Background Particles */}
    
      <div className="w-full h-[90vh] overflow-y-auto px-6 scrollbar z-10">
        {/* Quiz Header */}
        <div className="w-full my-8">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-4 mb-2">
                <Link
                  to="/teacher/quiz-generator"
                  className="p-2 rounded-lg  transition-colors"
                >
                  <BookOpenCheck className=" text-teal h-7 w-7" />
                </Link>
                <div className="text-4xl font-bold text-white">
                  {quizData.title}
                </div>
              </div>
              <p className="text-gray-300 font-semibold mt-2 max-w-3xl">
                {quizData.description}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <button className="p-2 px-4 rounded-lg bg-dark-navy text-white font-semibold hover:bg-gray-700 transition-colors flex items-center gap-2">
                <Edit2 className="h-4 w-4" />
                Edit Quiz
              </button>
              <button className="p-2 px-4 rounded-lg bg-teal text-white font-semibold hover:bg-teal-dark transition-colors flex items-center gap-2">
                <Share2 className="h-4 w-4" />
                Share
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-12">
          {/* Left Column - Quiz Stats & Navigation */}
          <div className="lg:col-span-1 space-y-6">
            {/* Quiz Info Card */}
            <div className="bg-dark-navy rounded-2xl border border-gray-700 p-6">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-teal" />
                Quiz Details
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Created by</span>
                  <span className="text-white font-semibold">
                    {quizData.createdBy}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Difficulty</span>
                  <span className="px-3 py-1 bg-purple-900 text-purple-300 rounded-full text-sm font-semibold">
                    {quizData.difficulty}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Topic</span>
                  <span className="text-white font-semibold">
                    {quizData.topic}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Total Marks</span>
                  <span className="text-teal font-bold">
                    {quizData.totalMarks}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Passing Marks</span>
                  <span className="text-teal font-bold">
                    {quizData.passingMarks}
                  </span>
                </div>
              </div>
            </div>

            {/* Timer Card */}
            <div className="bg-dark-navy rounded-2xl border border-gray-700 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Timer className="h-5 w-5 text-red-400" />
                  Time Remaining
                </h3>
                {!showResults && (
                  <button
                    onClick={() => setIsTimerRunning(!isTimerRunning)}
                    className="text-sm text-teal hover:text-teal-light"
                  >
                    {isTimerRunning ? "Pause" : "Resume"}
                  </button>
                )}
              </div>

              <div className="text-center">
                <div
                  className={`text-5xl font-bold mb-2 ${
                    timeRemaining < 300
                      ? "text-red-400 animate-pulse"
                      : "text-white"
                  }`}
                >
                  {formatTime(timeRemaining)}
                </div>
                <div className="text-gray-400 text-sm">
                  {showResults ? "Quiz Completed" : "Minutes : Seconds"}
                </div>
              </div>

              {!showResults && (
                <div className="mt-6">
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-teal transition-all duration-1000"
                      style={{
                        width: `${
                          (timeRemaining / (quizData.timeLimit * 60)) * 100
                        }%`,
                      }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-sm text-gray-400 mt-2">
                    <span>0 min</span>
                    <span>{quizData.timeLimit} min</span>
                  </div>
                </div>
              )}
            </div>

            {/* Question Navigation */}
            <div className="bg-dark-navy rounded-2xl border border-gray-700 p-6">
              <h3 className="text-xl font-bold text-white mb-4">Questions</h3>

              <div className="grid grid-cols-4 gap-2">
                {quizData.questions.map((q, index) => (
                  <button
                    key={q.id}
                    onClick={() => setCurrentQuestionIndex(index)}
                    className={`aspect-square rounded-lg flex flex-col items-center justify-center transition-all ${
                      currentQuestionIndex === index
                        ? "bg-teal text-white scale-105"
                        : studentAnswers[q.id] && studentAnswers[q.id] !== ""
                        ? "bg-purple-600 text-white"
                        : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                    }`}
                  >
                    <span className="font-bold">{index + 1}</span>
                    {studentAnswers[q.id] && studentAnswers[q.id] !== "" && (
                      <div className="w-1 h-1 bg-green-400 rounded-full mt-1"></div>
                    )}
                  </button>
                ))}
              </div>

              <div className="mt-6 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-teal rounded"></div>
                  <span className="text-sm text-gray-400">
                    Current Question
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-purple-600 rounded"></div>
                  <span className="text-sm text-gray-400">Answered</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-gray-800 rounded"></div>
                  <span className="text-sm text-gray-400">Unanswered</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            {!showResults && (
              <div className="bg-dark-navy rounded-2xl border border-gray-700 p-6">
                <h3 className="text-xl font-bold text-white mb-4">Actions</h3>

                <div className="space-y-3">
                  <button
                    onClick={handleSubmitQuiz}
                    className="w-full p-3 rounded-lg bg-gradient-to-r from-teal to-purple-600 text-white font-semibold hover:shadow-lg transition-all"
                  >
                    Submit Quiz
                  </button>

                  <button className="w-full p-3 rounded-lg bg-gray-800 hover:bg-gray-700 text-white font-semibold transition-colors flex items-center justify-center gap-2">
                    <Download className="h-4 w-4" />
                    Save Progress
                  </button>

                  <button className="w-full p-3 rounded-lg bg-gray-800 hover:bg-gray-700 text-white font-semibold transition-colors flex items-center justify-center gap-2">
                    <Printer className="h-4 w-4" />
                    Print Quiz
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Main Content - Question & Answer */}
          <div className="lg:col-span-2">
            <div className="bg-dark-navy rounded-2xl border border-gray-700 overflow-hidden">
              {/* Question Header */}
              <div className="p-6 border-b border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-lg ${getQuestionTypeColor(
                        currentQuestion.type
                      )}`}
                    >
                      {React.createElement(
                        getQuestionTypeIcon(currentQuestion.type),
                        {
                          className: "h-5 w-5 text-white",
                        }
                      )}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">
                        Question {currentQuestionIndex + 1} of{" "}
                        {quizData.questions.length}
                      </h3>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="text-sm text-gray-400">
                          {currentQuestion.type === "mcq"
                            ? "Multiple Choice"
                            : currentQuestion.type === "true-false"
                            ? "True/False"
                            : currentQuestion.type === "code"
                            ? "Code Implementation"
                            : currentQuestion.type === "short-answer"
                            ? "Short Answer"
                            : currentQuestion.type === "fill-blanks"
                            ? "Fill in Blanks"
                            : "Matching"}
                        </span>
                        <span className="text-teal font-semibold">
                          {currentQuestion.marks} marks
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-2xl font-bold text-white">
                      {currentQuestion.marks}
                    </div>
                    <div className="text-sm text-gray-400">Points</div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="h-1 bg-gray-700 rounded-full">
                      <div
                        className="h-1 bg-teal rounded-full"
                        style={{
                          width: `${
                            ((currentQuestionIndex + 1) /
                              quizData.questions.length) *
                            100
                          }%`,
                        }}
                      ></div>
                    </div>
                  </div>
                  <span className="text-sm text-gray-400">
                    {currentQuestionIndex + 1}/{quizData.questions.length}
                  </span>
                </div>
              </div>

              {/* Question Body */}
              <div className="p-6">
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-white mb-4">
                    {currentQuestion.question}
                  </h4>

                  {currentQuestion.type === "code" && (
                    <div className="bg-gray-900 p-4 rounded-lg border border-gray-700 mb-4">
                      <pre className="text-gray-300 font-mono text-sm whitespace-pre-wrap">
                        {currentQuestion.codeTemplate}
                      </pre>
                    </div>
                  )}
                </div>

                {/* Answer Input */}
                {!showResults ? (
                  <div className="space-y-4">
                    {/* MCQ Options */}
                    {(currentQuestion.type === "mcq" ||
                      currentQuestion.type === "true-false") && (
                      <div className="space-y-3">
                        {currentQuestion.options.map((option) => (
                          <div
                            key={option.id}
                            onClick={() =>
                              handleAnswerSelect(currentQuestion.id, option.id)
                            }
                            className={`p-4 rounded-lg border cursor-pointer transition-all ${
                              studentAnswers[currentQuestion.id] === option.id
                                ? "border-teal bg-teal bg-opacity-10"
                                : "border-gray-700 hover:border-gray-600 hover:bg-gray-800"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-6 h-6 rounded-full border flex items-center justify-center ${
                                  studentAnswers[currentQuestion.id] ===
                                  option.id
                                    ? "border-teal bg-teal text-white"
                                    : "border-gray-600 text-gray-400"
                                }`}
                              >
                                {option.id.toUpperCase()}
                              </div>
                              <span className="text-white">{option.text}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Code Editor */}
                    {currentQuestion.type === "code" && (
                      <div className="space-y-4">
                        <div className="bg-gray-900 rounded-lg overflow-hidden">
                          <div className="bg-gray-800 px-4 py-2 text-sm text-gray-400 border-b border-gray-700">
                            Code Editor
                          </div>
                          <textarea
                            value={studentAnswers[currentQuestion.id]}
                            onChange={(e) =>
                              handleCodeChange(
                                currentQuestion.id,
                                e.target.value
                              )
                            }
                            className="w-full h-48 font-mono text-sm p-4 bg-gray-900 text-white focus:outline-none resize-none"
                            placeholder="Write your code here..."
                          />
                        </div>

                        {currentQuestion.testCases && (
                          <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
                            <h5 className="font-semibold text-white mb-3">
                              Test Cases
                            </h5>
                            <div className="space-y-2">
                              {currentQuestion.testCases.map(
                                (testCase, index) => (
                                  <div key={index} className="text-sm">
                                    <span className="text-gray-400">
                                      Input:{" "}
                                    </span>
                                    <code className="text-teal">
                                      {testCase.input}
                                    </code>
                                    <span className="text-gray-400 ml-3">
                                      Output:{" "}
                                    </span>
                                    <code className="text-green-400">
                                      {testCase.output}
                                    </code>
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Short Answer */}
                    {currentQuestion.type === "short-answer" && (
                      <textarea
                        value={studentAnswers[currentQuestion.id]}
                        onChange={(e) =>
                          handleAnswerSelect(currentQuestion.id, e.target.value)
                        }
                        className="w-full h-32 p-4 bg-gray-900 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal resize-none"
                        placeholder="Type your answer here..."
                      />
                    )}

                    {/* Fill in Blanks */}
                    {currentQuestion.type === "fill-blanks" && (
                      <div className="space-y-3">
                        <div className="text-white mb-4">
                          {currentQuestion.question
                            .split("______")
                            .map((part, index, array) => (
                              <span key={index}>
                                {part}
                                {index < array.length - 1 && (
                                  <input
                                    type="text"
                                    value={
                                      studentAnswers[currentQuestion.id][index]
                                        ?.answer || ""
                                    }
                                    onChange={(e) =>
                                      handleFillBlankChange(
                                        currentQuestion.id,
                                        `blank${index + 1}`,
                                        e.target.value
                                      )
                                    }
                                    className="inline-block mx-2 w-32 p-2 bg-gray-900 border-b-2 border-teal text-white focus:outline-none"
                                  />
                                )}
                              </span>
                            ))}
                        </div>
                      </div>
                    )}

                    {/* Matching */}
                    {currentQuestion.type === "matching" && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-3">
                            <h5 className="font-semibold text-white text-center">
                              Items
                            </h5>
                            {currentQuestion.leftItems.map((item) => (
                              <div
                                key={item.id}
                                className="p-3 bg-gray-800 rounded-lg text-white text-center"
                              >
                                {item.text}
                              </div>
                            ))}
                          </div>

                          <div className="space-y-3">
                            <h5 className="font-semibold text-white text-center">
                              Matches
                            </h5>
                            {currentQuestion.rightItems.map((item) => (
                              <div
                                key={item.id}
                                onClick={() => {
                                  const leftItem = currentQuestion.leftItems[0]; // Simplified for demo
                                  handleMatchingChange(
                                    currentQuestion.id,
                                    leftItem.id,
                                    item.id
                                  );
                                }}
                                className={`p-3 rounded-lg cursor-pointer text-center ${
                                  studentAnswers[currentQuestion.id] &&
                                  studentAnswers[currentQuestion.id][
                                    currentQuestion.leftItems[0].id
                                  ] === item.id
                                    ? "bg-teal text-white"
                                    : "bg-gray-800 text-white hover:bg-gray-700"
                                }`}
                              >
                                {item.text}
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="text-sm text-gray-400 text-center">
                          Click on a match to connect it with the item
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  /* Results View */
                  <div className="space-y-6">
                    <div
                      className={`p-4 rounded-lg border ${
                        results.passed
                          ? "border-green-600 bg-green-900 bg-opacity-20"
                          : "border-red-600 bg-red-900 bg-opacity-20"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {results.passed ? (
                          <CheckCircle className="h-6 w-6 text-green-400" />
                        ) : (
                          <XCircle className="h-6 w-6 text-red-400" />
                        )}
                        <div>
                          <h4 className="font-bold text-white">
                            {results.passed ? "Quiz Passed!" : "Quiz Failed"}
                          </h4>
                          <p className="text-gray-300 text-sm mt-1">
                            You scored {results.totalScore} out of{" "}
                            {quizData.totalMarks} marks (
                            {results.percentage.toFixed(1)}%)
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Explanation */}
                    <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
                      <h5 className="font-semibold text-white mb-2 flex items-center gap-2">
                        <AlertCircle className="h-4 w-4 text-teal" />
                        Explanation
                      </h5>
                      <p className="text-gray-300">
                        {currentQuestion.explanation}
                      </p>

                      {currentQuestion.type !== "code" &&
                        currentQuestion.type !== "short-answer" && (
                          <div className="mt-3">
                            <span className="text-gray-400">
                              Correct Answer:{" "}
                            </span>
                            <span className="text-teal font-semibold">
                              {currentQuestion.type === "mcq" ||
                              currentQuestion.type === "true-false"
                                ? currentQuestion.options.find(
                                    (opt) =>
                                      opt.id === currentQuestion.correctAnswer
                                  )?.text
                                : currentQuestion.correctAnswer}
                            </span>
                          </div>
                        )}
                    </div>
                  </div>
                )}
              </div>

              {/* Navigation Footer */}
              <div className="p-6 border-t border-gray-700">
                <div className="flex justify-between items-center">
                  <button
                    onClick={handlePrevQuestion}
                    disabled={currentQuestionIndex === 0}
                    className="p-2 px-4 rounded-lg bg-gray-800 text-white font-semibold hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </button>

                  <div className="flex items-center gap-3">
                    {!showResults && (
                      <button
                        onClick={() =>
                          handleAnswerSelect(currentQuestion.id, "")
                        }
                        className="p-2 px-4 rounded-lg bg-gray-800 text-gray-300 font-semibold hover:bg-gray-700 transition-colors"
                      >
                        Clear Answer
                      </button>
                    )}

                    <button
                      onClick={handleNextQuestion}
                      disabled={
                        currentQuestionIndex === quizData.questions.length - 1
                      }
                      className="p-2 px-6 rounded-lg bg-teal text-white font-semibold hover:bg-teal-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                    >
                      {currentQuestionIndex === quizData.questions.length - 1
                        ? "Finish"
                        : "Next"}
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Quiz Instructions */}
            {!showResults && (
              <div className="mt-6 bg-dark-navy rounded-2xl border border-gray-700 p-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-yellow-400" />
                  Quiz Instructions
                </h3>
                <ul className="space-y-2">
                  {quizData.instructions.map((instruction, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-teal rounded-full mt-2"></div>
                      <span className="text-gray-300">{instruction}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right Column - Results & Analytics */}
          <div className="lg:col-span-1 space-y-6">
            {/* Results Summary */}
            {showResults ? (
              <div className="bg-dark-navy rounded-2xl border border-gray-700 p-6">
                <h3 className="text-xl font-bold text-white mb-6">
                  Quiz Results
                </h3>

                <div className="space-y-6">
                  <div className="text-center">
                    <div className="text-6xl font-bold text-teal mb-2">
                      {results.percentage.toFixed(1)}%
                    </div>
                    <div className="text-gray-400">Final Score</div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-900 p-4 rounded-lg border border-gray-700 text-center">
                      <div className="text-2xl font-bold text-white">
                        {results.correctAnswers}
                      </div>
                      <div className="text-sm text-gray-400">Correct</div>
                    </div>
                    <div className="bg-gray-900 p-4 rounded-lg border border-gray-700 text-center">
                      <div className="text-2xl font-bold text-white">
                        {quizData.questions.length - results.correctAnswers}
                      </div>
                      <div className="text-sm text-gray-400">Incorrect</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Total Marks</span>
                      <span className="text-white font-semibold">
                        {quizData.totalMarks}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Score Obtained</span>
                      <span className="text-teal font-bold">
                        {results.totalScore}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Passing Marks</span>
                      <span className="text-white font-semibold">
                        {quizData.passingMarks}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Status</span>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          results.passed
                            ? "bg-green-900 text-green-300"
                            : "bg-red-900 text-red-300"
                        }`}
                      >
                        {results.passed ? "PASSED" : "FAILED"}
                      </span>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-gray-700">
                    <button className="w-full p-3 rounded-lg bg-purple-600 text-white font-semibold hover:bg-purple-700 transition-colors mb-3">
                      Review Answers
                    </button>
                    <button className="w-full p-3 rounded-lg bg-gray-800 hover:bg-gray-700 text-white font-semibold transition-colors">
                      Retake Quiz
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* Analytics Preview */
              <div className="bg-dark-navy rounded-2xl border border-gray-700 p-6">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-teal" />
                  Progress
                </h3>

                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-400">Answered</span>
                      <span className="text-white font-semibold">
                        {
                          Object.values(studentAnswers).filter(
                            (ans) =>
                              ans &&
                              ans !== "" &&
                              (typeof ans !== "object" ||
                                Object.keys(ans).length > 0)
                          ).length
                        }
                        /{quizData.questions.length}
                      </span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-teal transition-all duration-500"
                        style={{
                          width: `${
                            (Object.values(studentAnswers).filter(
                              (ans) =>
                                ans &&
                                ans !== "" &&
                                (typeof ans !== "object" ||
                                  Object.keys(ans).length > 0)
                            ).length /
                              quizData.questions.length) *
                            100
                          }%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-900 p-4 rounded-lg border border-gray-700 text-center">
                      <div className="text-2xl font-bold text-teal">
                        {Math.round(
                          ((currentQuestionIndex + 1) /
                            quizData.questions.length) *
                            100
                        )}
                        %
                      </div>
                      <div className="text-sm text-gray-400">Completion</div>
                    </div>
                    <div className="bg-gray-900 p-4 rounded-lg border border-gray-700 text-center">
                      <div className="text-2xl font-bold text-teal">
                        {Math.round(
                          (timeRemaining / (quizData.timeLimit * 60)) * 100
                        )}
                        %
                      </div>
                      <div className="text-sm text-gray-400">Time Left</div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-white mb-3">
                      Question Types
                    </h4>
                    <div className="space-y-2">
                      {["mcq", "true-false", "code", "short-answer"].map(
                        (type) => {
                          const count = quizData.questions.filter(
                            (q) => q.type === type
                          ).length;
                          if (count === 0) return null;

                          const Icon = getQuestionTypeIcon(type);
                          const color = getQuestionTypeColor(type);

                          return (
                            <div
                              key={type}
                              className="flex items-center justify-between"
                            >
                              <div className="flex items-center gap-2">
                                <div className={`p-1 rounded ${color}`}>
                                  <Icon className="h-3 w-3 text-white" />
                                </div>
                                <span className="text-sm text-gray-400">
                                  {type === "mcq"
                                    ? "MCQ"
                                    : type === "true-false"
                                    ? "True/False"
                                    : type === "code"
                                    ? "Code"
                                    : "Short Answer"}
                                </span>
                              </div>
                              <span className="text-white font-semibold">
                                {count}
                              </span>
                            </div>
                          );
                        }
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Performance Stats */}
            <div className="bg-dark-navy rounded-2xl border border-gray-700 p-6">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Award className="h-5 w-5 text-yellow-400" />
                Performance
              </h3>

              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-gray-400">Accuracy</span>
                    <span className="text-white font-semibold">
                      {showResults ? `${results.percentage.toFixed(1)}%` : "--"}
                    </span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full">
                    <div
                      className="h-full bg-teal rounded-full"
                      style={{
                        width: showResults ? `${results.percentage}%` : "0%",
                      }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-gray-400">Speed</span>
                    <span className="text-white font-semibold">
                      {showResults
                        ? `${Math.round(
                            (quizData.questions.length /
                              (quizData.timeLimit * 60 - timeRemaining)) *
                              60
                          )} Q/hr`
                        : "--"}
                    </span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full">
                    <div
                      className="h-full bg-purple-600 rounded-full"
                      style={{ width: showResults ? "75%" : "0%" }}
                    ></div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-700">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white">
                      {showResults ? (results.passed ? "🎉" : "💪") : "📝"}
                    </div>
                    <p className="text-gray-400 text-sm mt-2">
                      {showResults
                        ? results.passed
                          ? "Excellent work! Keep it up!"
                          : "Good attempt! Review and try again."
                        : "Complete all questions to see your results"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Share Options */}
            {showResults && (
              <div className="bg-dark-navy rounded-2xl border border-gray-700 p-6">
                <h3 className="text-xl font-bold text-white mb-4">
                  Share Results
                </h3>

                <div className="space-y-3">
                  <button className="w-full p-3 rounded-lg bg-gray-800 hover:bg-gray-700 text-white font-semibold transition-colors flex items-center justify-center gap-2">
                    <Copy className="h-4 w-4" />
                    Copy Score Link
                  </button>

                  <button className="w-full p-3 rounded-lg bg-gray-800 hover:bg-gray-700 text-white font-semibold transition-colors flex items-center justify-center gap-2">
                    <Download className="h-4 w-4" />
                    Download Certificate
                  </button>

                  <button className="w-full p-3 rounded-lg bg-gray-800 hover:bg-gray-700 text-white font-semibold transition-colors flex items-center justify-center gap-2">
                    <Printer className="h-4 w-4" />
                    Print Results
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
