import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Award,
  Trophy,
  Star,
  CheckCircle,
  XCircle,
  AlertCircle,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Clock,
  Hash,
  Users,
  Target,
  Zap,
  Brain,
  BookOpen,
  ChevronRight,
  Download,
  Share2,
  Printer,
  Home,
  RefreshCw,
  Eye,
  EyeOff,
  Filter,
  Search,
  Calendar,
  User,
  Crown,
  Sparkles,
  Flag,
  Medal,
  Lightbulb,
  ThumbsUp,
  MessageSquare,
  Bookmark,
  Heart,
  Award as AwardIcon,
  Target as TargetIcon,
  BarChart as BarChartIcon,
  PieChart,
  LineChart,
  AreaChart,
  HomeIcon,
} from "lucide-react";
import axios from "axios";
import ResponsiveContainer from "../../components/ResponsiveContainer";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { downloadQuizReportPDF } from "../utils";

const QuizResultPage = ({ result: rs, setresults, setselectedQuizData }) => {
  const { resultId } = useParams();
  const [resultData, setResultData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAllExplanations, setShowAllExplanations] = useState(false);
  const [filterCorrect, setFilterCorrect] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const navigate = useNavigate()

  useEffect(() => {
    fetchResultData();
  }, [resultId, rs]);

  useEffect(()=>{
    console.log(rs)
  },[rs])

  function calculatePerformance(resultData) {
    const {
      questionAnswerExplanations = [],
      totalQuestions = 0,
      timeTaken = 0,
    } = resultData;

    // Correct answers
    const correctCount = questionAnswerExplanations?.filter(
      (q) => q.isCorrect
    ).length;

    // Accuracy %
    const accuracy = totalQuestions
      ? Math.round((correctCount / totalQuestions) * 100)
      : 0;

    // Speed (questions per minute)
    const speed = timeTaken
      ? +(totalQuestions / (timeTaken / 60)).toFixed(2)
      : 0;

    // Avg time per question (seconds)
    const avgTimePerQuestion = totalQuestions ? timeTaken / totalQuestions : 0;

    // Time management (lower time = better score)
    let timeManagement = 100;
    if (avgTimePerQuestion > 120) timeManagement = 60;
    else if (avgTimePerQuestion > 90) timeManagement = 70;
    else if (avgTimePerQuestion > 60) timeManagement = 85;

    // Improvement areas (from wrong answers)
    const improvementAreas = questionAnswerExplanations
      ?.filter((q) => !q.isCorrect)
      .map((q) => q.question);

    return {
      accuracy,
      speed,
      timeManagement,
      improvementAreas,
    };
  }

  const fetchResultData = async () => {
    try {
      // if this component using as child then props result set to state results
      if (rs) {
        const performance = calculatePerformance(rs);
        return setResultData({ ...rs, performance });
      }

      // if this is not using as child component but using as new page then fetching result from backend
      const res = await axios.get(
        `http://localhost:8888/api/quiz-result/${resultId}/get`
      );

      const performance = calculatePerformance(res?.data?.result);
      setResultData({ ...res?.data?.result, performance });

      // const mockResult = {
      //   _id: resultId,
      //   quizId: "quiz_001",
      //   userId: "user_001",
      //   passed: true,
      //   totalScore: 85,
      //   percentage: 85,
      //   totalQuestions: 10,
      //   correctAnswers: 8,
      //   createdAt: new Date().toISOString(),
      //   timeTaken: 1250, // seconds

      //   // remove ----
      //   rank: 4,
      //   totalParticipants: 150,
      //   // remove end ---
      //   quizDetails: {
      //     title: "JavaScript Fundamentals Quiz",
      //     difficulty: "Intermediate",
      //     topic: "JavaScript Programming",
      //     totalMarks: 100,
      //     passingMarks: 60,
      //     timeLimit: 1800, // seconds
      //     createdBy: "John Doe",
      //   },
      //   questionAnswerExplanations: [
      //     {
      //       questionId: 1,
      //       question: "What is the output of `console.log(typeof null)`?",
      //       explanation:
      //         'In JavaScript, `typeof null` returns "object" which is a known historical bug.',
      //       isCorrect: true,
      //       marks: 10,
      //       userAnswer: "object",
      //       correctAnswer: "object",
      //     },
      //     {
      //       questionId: 2,
      //       question: "JavaScript is a single-threaded language.",
      //       explanation:
      //         "JavaScript is indeed single-threaded, though it can handle asynchronous operations.",
      //       isCorrect: true,
      //       marks: 10,
      //       userAnswer: "True",
      //       correctAnswer: "True",
      //     },
      //     {
      //       questionId: 3,
      //       question: "Write a function to sum positive numbers.",
      //       explanation:
      //         "You correctly filtered negative numbers before summing.",
      //       isCorrect: true,
      //       marks: 15,
      //       userAnswer:
      //         "function sumPositive(arr) { return arr.filter(n => n > 0).reduce((a,b) => a+b, 0); }",
      //       correctAnswer:
      //         "function sumPositive(arr) { return arr.filter(num => num > 0).reduce((a, b) => a + b, 0); }",
      //     },
      //     {
      //       questionId: 4,
      //       question: "Explain let, const, and var.",
      //       explanation: "Your explanation missed some details about hoisting.",
      //       isCorrect: false,
      //       marks: 10,
      //       userAnswer: "var is old, let and const are new",
      //       correctAnswer:
      //         "var is function-scoped, let and const are block-scoped. let allows reassignment, const does not.",
      //     },
      //     {
      //       questionId: 5,
      //       question: "Which method adds element to array end?",
      //       explanation: "push() method adds elements to the end of an array.",
      //       isCorrect: true,
      //       marks: 10,
      //       userAnswer: "push()",
      //       correctAnswer: "push()",
      //     },
      //     {
      //       questionId: 6,
      //       question: "The ______ loop iterates over object properties.",
      //       explanation: "for...in loop is used for object property iteration.",
      //       isCorrect: true,
      //       marks: 10,
      //       userAnswer: "for...in",
      //       correctAnswer: "for...in",
      //     },
      //     {
      //       questionId: 7,
      //       question: "Write palindrome function.",
      //       explanation: "Good implementation but consider case sensitivity.",
      //       isCorrect: true,
      //       marks: 10,
      //       userAnswer:
      //         'function isPalindrome(str) { return str === str.split("").reverse().join(""); }',
      //       correctAnswer:
      //         'function isPalindrome(str) { return str === str.split("").reverse().join(""); }',
      //     },
      //     {
      //       questionId: 8,
      //       question: "What is closure in JavaScript?",
      //       explanation:
      //         "Closure is when a function remembers its lexical scope.",
      //       isCorrect: true,
      //       marks: 15,
      //       userAnswer: "Function with access to outer scope",
      //       correctAnswer:
      //         "A closure is a function that has access to its outer function scope even after the outer function has returned.",
      //     },
      //     {
      //       questionId: 9,
      //       question: "Array method for transformation?",
      //       explanation: "map() transforms each element of an array.",
      //       isCorrect: false,
      //       marks: 10,
      //       userAnswer: "forEach()",
      //       correctAnswer: "map()",
      //     },
      //     {
      //       questionId: 10,
      //       question: "What is event bubbling?",
      //       explanation:
      //         "Event bubbling is when an event propagates from target to root.",
      //       isCorrect: true,
      //       marks: 10,
      //       userAnswer: "Event propagation from child to parent",
      //       correctAnswer:
      //         "Event bubbling is a type of event propagation where the event starts from the target element and bubbles up to the root.",
      //     },
      //   ],
      //   performance: {
      //     accuracy: 85,
      //     speed: 12, // questions per minute
      //     timeManagement: 92,
      //     rankPercentile: 95,
      //     // remove --------------- down
      //     improvementAreas: ["Closures", "Event Handling", "Array Methods"],
      //   },
      // };

      // setResultData(mockResult);
    } catch (error) {
      console.error("Error fetching result:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const calculateTimeSaved = () => {
    if (!resultData) return 0;
    return resultData.quizDetails.timeLimit - resultData.timeTaken;
  };

  const getPerformanceMessage = () => {
    if (!resultData) return "";
    const percentage = resultData.percentage;

    if (percentage >= 90) return "Outstanding Performance! 🎯";
    if (percentage >= 80) return "Excellent Work! 🚀";
    if (percentage >= 70) return "Great Job! 👍";
    if (percentage >= 60) return "Good Attempt! 💪";
    if (percentage >= 50) return "Fair Performance 📝";
    return "Needs Improvement 📚";
  };

  const getPerformanceColor = () => {
    if (!resultData) return "";
    const percentage = resultData.percentage;

    if (percentage >= 90) return "text-green-400";
    if (percentage >= 80) return "text-teal";
    if (percentage >= 70) return "text-blue-400";
    if (percentage >= 60) return "text-yellow-400";
    if (percentage >= 50) return "text-orange-400";
    return "text-red-400";
  };

  const filteredExplanations = resultData?.questionAnswerExplanations?.filter(
    (item) => {
      if (filterCorrect === "all") return true;
      if (filterCorrect === "correct") return item.isCorrect;
      if (filterCorrect === "incorrect") return !item.isCorrect;
      return true;
    }
  );

  if (loading) {
    return (
      <ResponsiveContainer>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal mx-auto"></div>
            <p className="text-white mt-4">Loading your results...</p>
          </div>
        </div>
      </ResponsiveContainer>
    );
  }

  if (!resultData) {
    return (
      <>
        {/* <Header /> */}
        <ResponsiveContainer>
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <AlertCircle className="h-16 w-16 text-red-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">
                Result Not Found
              </h2>
              <p className="text-gray-400 mb-6">
                The quiz result you're looking for doesn't exist.
              </p>
              <Link
                to="/dashboard"
                className="px-6 py-3 bg-teal hover:bg-teal/80 text-white font-semibold rounded-lg transition-colors"
              >
                Go to Dashboard
              </Link>
            </div>
          </div>
        </ResponsiveContainer>
        {/* <Footer /> */}
      </>
    );
  }

  return (
    <ResponsiveContainer className={"scrollbar p-5 overflow-y-auto"}>
      <div className="h-screen  bg-gray-900 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <button
                  onClick={() => {
                    if (rs) {
                      setresults(null);
                      setselectedQuizData(null);
                    }else{
                      navigate('/home')
                    }
                  }}
                  to="/home"
                  className="p-2 rounded-lg bg-dark-navy hover:bg-gray-800"
                >
                  <ChevronRight className="h-5 w-5 text-white rotate-180" />
                </button>
                <h1 className="text-3xl font-bold text-white">Quiz Results</h1>
              </div>
              <p className="text-gray-400">
                Detailed analysis of your performance
              </p>
            </div>
            <div className="flex items-center gap-3">
              {/* <button className="p-2 px-4 rounded-lg bg-dark-navy border border-gray-700 text-white hover:bg-gray-800 transition-colors flex items-center gap-2">
                <Share2 className="h-4 w-4" />
                Share
              </button> */}
              <button
                onClick={() => downloadQuizReportPDF(resultData)}
                className="p-2 px-4 rounded-lg bg-gradient-to-r from-teal to-purple-600 text-white hover:shadow-lg transition-all flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                Download PDF
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Summary */}
          <div className="lg:col-span-2 space-y-6">
            {/* Result Card */}
            <div className="bg-dark-navy border border-gray-800 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    {resultData.quizDetails.title}
                  </h2>
                  <p className="text-gray-400">
                    Completed on{" "}
                    {new Date(resultData.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div
                  className={`px-4 py-2 rounded-full font-semibold ${
                    resultData.passed
                      ? "bg-green-900 text-green-300"
                      : "bg-red-900 text-red-300"
                  }`}
                >
                  {resultData.passed ? "PASSED" : "FAILED"}
                </div>
              </div>

              {/* Score Overview */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-900 rounded-xl p-4">
                  <div className="text-3xl font-bold text-white mb-1">
                    {resultData.percentage}%
                  </div>
                  <div className="text-gray-400 text-sm">Score</div>
                </div>
                <div className="bg-gray-900 rounded-xl p-4">
                  <div className="text-3xl font-bold text-teal mb-1">
                    {resultData.correctAnswers}/{resultData.totalQuestions}
                  </div>
                  <div className="text-gray-400 text-sm">Correct Answers</div>
                </div>
                <div className="bg-gray-900 rounded-xl p-4">
                  <div className="text-3xl font-bold text-yellow-400 mb-1">
                    {formatTime(resultData.timeTaken)}
                  </div>
                  <div className="text-gray-400 text-sm">Time Taken</div>
                </div>
                {/* <div className="bg-gray-900 rounded-xl p-4">
                  <div className="text-3xl font-bold text-purple-400 mb-1">
                    150
                  </div>
                  <div className="text-gray-400 text-sm">Rank</div>
                </div> */}
              </div>

              {/* Performance Message */}
              <div
                className={`p-4 rounded-xl ${
                  resultData.passed
                    ? "bg-green-900/20 border border-green-800/50"
                    : "bg-red-900/20 border border-red-800/50"
                }`}
              >
                <div className="flex items-center gap-3">
                  {resultData.passed ? (
                    <CheckCircle className="h-6 w-6 text-green-400" />
                  ) : (
                    <XCircle className="h-6 w-6 text-red-400" />
                  )}
                  <div>
                    <h3
                      className={`font-bold text-lg ${getPerformanceColor()}`}
                    >
                      {getPerformanceMessage()}
                    </h3>
                    <p className="text-gray-300 text-sm mt-1">
                      You scored {resultData.totalScore} out of{" "}
                      {resultData.quizDetails.totalMarks} marks.
                      {resultData.passed ? " Well done!" : " Keep practicing!"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Detailed Analysis */}
            <div className="bg-dark-navy border border-gray-800 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-teal" />
                Detailed Question Analysis
              </h3>

              {/* Filter Controls */}
              <div className="flex flex-wrap gap-3 mb-6">
                <button
                  onClick={() => setFilterCorrect("all")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    filterCorrect === "all"
                      ? "bg-teal text-white"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  All Questions ({resultData.totalQuestions})
                </button>
                <button
                  onClick={() => setFilterCorrect("correct")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    filterCorrect === "correct"
                      ? "bg-green-600 text-white"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  Correct ({resultData.correctAnswers})
                </button>
                <button
                  onClick={() => setFilterCorrect("incorrect")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    filterCorrect === "incorrect"
                      ? "bg-red-600 text-white"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  Incorrect (
                  {resultData.totalQuestions - resultData.correctAnswers})
                </button>
                <button
                  onClick={() => setShowAllExplanations(!showAllExplanations)}
                  className="ml-auto px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg text-sm font-medium flex items-center gap-2"
                >
                  {showAllExplanations ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                  {showAllExplanations
                    ? "Hide Explanations"
                    : "Show All Explanations"}
                </button>
              </div>

              {/* Questions List */}
              <div className="space-y-4">
                {filteredExplanations.map((item) => (
                  <div
                    key={item.questionId}
                    className={`border rounded-xl p-4 ${
                      item.isCorrect
                        ? "border-green-800 bg-green-900/10"
                        : "border-red-800 bg-red-900/10"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div
                          className={`h-8 w-8 rounded-full flex items-center justify-center ${
                            item.isCorrect
                              ? "bg-green-600 text-white"
                              : "bg-red-600 text-white"
                          }`}
                        >
                          {item.isCorrect ? "✓" : "✗"}
                        </div>
                        <div>
                          <h4 className="font-semibold text-white">
                            Question {item.questionId}
                          </h4>
                          <p className="text-gray-300 text-sm mt-1">
                            {item.question}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-white font-bold">
                          {item.marks} pts
                        </div>
                        <div className="text-xs text-gray-400">
                          {item.isCorrect ? "Earned" : "Lost"}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                      <div>
                        <p className="text-sm text-gray-400 mb-1">
                          Your Answer
                        </p>
                        <p
                          style={{ color: !item.userAnswer && "yellow" }}
                          className="text-white min-h-8 bg-gray-900 rounded p-2 text-sm"
                        >
                          {item.userAnswer || "Not Answered"}{" "}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400 mb-1">
                          Correct Answer
                        </p>
                        <p className="text-green-400 bg-gray-900 rounded p-2 text-sm">
                          {item.correctAnswer}
                        </p>
                      </div>
                    </div>

                    {showAllExplanations && (
                      <div className="mt-3 pt-3 border-t border-gray-800">
                        <p className="text-sm text-gray-400 mb-1">
                          Explanation
                        </p>
                        <p className="text-gray-300 text-sm">
                          {item.explanation}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Improvement Areas */}
            <div className="bg-dark-navy border !mb-36  border-gray-800 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-yellow-400" />
                Areas for Improvement
              </h3>

              <div className="space-y-4">
                {(
                  resultData?.performance?.improvementAreas || ["a", "b", "c"]
                ).map((area, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 bg-gray-900 rounded-lg"
                  >
                    <div className="p-2 bg-red-600/20 rounded">
                      <AlertCircle className="h-4 w-4 text-red-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium">{area}</p>
                      <p className="text-gray-400 text-sm">
                        Review concepts and practice more questions
                      </p>
                    </div>
                  </div>
                ))}

                {/* <div className="mt-6">
                  <h4 className="text-white font-medium mb-3">
                    Recommendations
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <button className="p-3 bg-gray-800 hover:bg-gray-700 rounded-lg text-white text-sm transition-colors flex items-center gap-2">
                      <BookOpen className="h-4 w-4" />
                      Study Materials
                    </button>
                    <button className="p-3 bg-gray-800 hover:bg-gray-700 rounded-lg text-white text-sm transition-colors flex items-center gap-2">
                      <RefreshCw className="h-4 w-4" />
                      Retake Quiz
                    </button>
                  </div>
                </div> */}
              </div>
            </div>
          </div>

          {/* Right Column - Stats & Actions */}
          <div className="space-y-6">
            {/* Performance Stats */}
            <div className="bg-dark-navy border border-gray-800 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Target className="h-5 w-5 text-teal" />
                Performance Metrics
              </h3>

              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400">Accuracy</span>
                    <span className="text-white font-bold">
                      {resultData?.performance?.accuracy || 150}%
                    </span>
                  </div>
                  <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-teal to-teal-dark"
                      style={{
                        width: `${resultData?.performance?.accuracy || 150}%`,
                      }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400">Speed</span>
                    <span className="text-white font-bold">
                      {resultData?.performance?.speed || 150} Q/min
                    </span>
                  </div>
                  <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-600 to-purple-700"
                      style={{ width: "85%" }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400">Time Management</span>
                    <span className="text-white font-bold">
                      {resultData?.performance?.timeManagement}%
                    </span>
                  </div>
                  <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-yellow-600 to-yellow-700"
                      style={{
                        width: `${resultData?.performance?.timeManagement}%`,
                      }}
                    ></div>
                  </div>
                </div>

                <div>
                  {/* <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400">Rank Percentile</span>
                    <span className="text-white font-bold">
                      Top {resultData?.performance?.rankPercentile} 4%
                    </span>
                  </div> */}
                  {/* <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-600 to-blue-700"
                      style={{
                        width: `${
                          resultData?.performance?.rankPercentile || 50
                        }%`,
                      }}
                    ></div>
                  </div> */}
                </div>
              </div>
            </div>

            {/* Quiz Info */}
            <div className="bg-dark-navy border border-gray-800 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-6">
                Quiz Information
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Difficulty</span>
                  <span className="px-3 py-1 bg-purple-900 text-purple-300 rounded-full text-sm font-semibold">
                    {resultData.quizDetails.difficulty}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Topic</span>
                  <span className="text-white font-semibold">
                    {resultData.quizDetails.topic}
                  </span>
                </div>

                {/* <div className="flex items-center justify-between">
                  <span className="text-gray-400">Created By</span>
                  <span className="text-white font-semibold">
                    {resultData.quizDetails.createdBy}
                  </span>
                </div> */}

                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Time Limit</span>
                  <span className="text-white">
                    {formatTime(resultData.quizDetails.timeLimit)}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Time Saved</span>
                  <span className="text-green-400 font-semibold">
                    +{formatTime(calculateTimeSaved())}
                  </span>
                </div>
              </div>
            </div>

            {/* Achievement Badges */}
            {/* <div className="bg-dark-navy border border-gray-800 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Medal className="h-5 w-5 text-yellow-400" />
                Achievements
              </h3>

              <div className="grid grid-cols-3 gap-3">
                <div className="text-center">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-r from-yellow-600 to-yellow-700 flex items-center justify-center mx-auto mb-2">
                    <Trophy className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-xs text-gray-400">Quiz Passed</span>
                </div>

                <div className="text-center">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-r from-teal to-teal-dark flex items-center justify-center mx-auto mb-2">
                    <Zap className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-xs text-gray-400">Fast Learner</span>
                </div>

                <div className="text-center">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-r from-purple-600 to-purple-700 flex items-center justify-center mx-auto mb-2">
                    <Brain className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-xs text-gray-400">Top 5%</span>
                </div>
              </div>
            </div> */}

            {/* Action Buttons */}
            <div className="bg-dark-navy border border-gray-800 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Actions</h3>

              <div className="space-y-3">
                <Link
                  to={"/home"}
                  className="w-full py-3 bg-gradient-to-r from-teal to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <HomeIcon className="h-4 w-4" />
                  Home
                </Link>

                {/* <button className="w-full py-3 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2">
                  <Printer className="h-4 w-4" />
                  Print Certificate
                </button> */}

                {/* <button className="w-full py-3 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2">
                  <Share2 className="h-4 w-4" />
                  Share Results
                </button> */}

                {/* <Link
                  to="/dashboard"
                  className="block w-full py-3 border border-gray-700 text-gray-300 hover:text-white hover:border-gray-600 rounded-lg transition-colors text-center flex items-center justify-center gap-2"
                >
                  <Home className="h-4 w-4" />
                  Back to Dashboard
                </Link> */}
              </div>
            </div>

            {/* Share Stats */}
            <div className="bg-dark-navy border border-gray-800 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">
                Share Your Success
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                You scored higher than{" "}
                {100 - resultData?.performance?.rankPercentile}% of
                participants!
              </p>
              <div className="flex gap-2">
                <button className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors">
                  Twitter
                </button>
                <button className="flex-1 py-2 bg-blue-800 hover:bg-blue-900 text-white rounded-lg text-sm transition-colors">
                  LinkedIn
                </button>
                <button className="flex-1 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm transition-colors">
                  WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ResponsiveContainer>
  );
};

export default QuizResultPage;
