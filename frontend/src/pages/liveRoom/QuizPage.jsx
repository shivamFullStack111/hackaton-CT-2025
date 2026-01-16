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
  Play,
  Sparkles,
  BadgeQuestionMark,
  Target,
} from "lucide-react";
import { Link } from "react-router-dom";

import ResponsiveContainer from "../../components/ResponsiveContainer";
import axios from "axios";
import QuizResultPage from "./QuizResultPage";
import LoadingSpinner from "../../components/LoadingSpinner";

const QuizPage = ({ roomData, user }) => {
  const [selectedQuizData, setselectedQuizData] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [studentAnswers, setStudentAnswers] = useState({});

  const [loadingQuizes, setloadingQuizes] = useState(true);
  const [allQuizes, setallQuizes] = useState([]);
  const [timeLeft, settimeLeft] = useState({
    min: 0,
    sec: 0,
  });
  const [results, setresults] = useState(null);

  const [isSubmitingQuiz, setisSubmitingQuiz] = useState(false);

  // useEffect(() => {
  //   if (!selectedQuizData || !user) return;
  //   const getResult = async () => {
  //     try {
  //       const sessionId = selectedQuizData?._id;
  //       const userId = user?._id;
  //       const res = await axios.post(
  //         `http://localhost:8888/api/quiz-result/${sessionId}/${userId}/get`
  //       );
  //     } catch (error) {
  //       console.log(error.message);
  //     }
  //   };

  //   getResult();
  // }, [selectedQuizData, user]);

  // get current sessions all quizzes
  useEffect(() => {
    try {
      const getQuizes = async () => {
        const res = await axios.post(
          `http://localhost:8888/api/quiz/${roomData?._id}/get-all`
        );

        console.log(res?.data);
        setallQuizes(res?.data?.quizes);
      };
      getQuizes();
    } catch (error) {
      console.log(error.message);
    } finally {
      setloadingQuizes(false);
    }
  }, [selectedQuizData]);

  // set timer
  useEffect(() => {
    if (!selectedQuizData) return;
    // const timeLimit = selectedQuizData?.timeLimit;

    settimeLeft(selectedQuizData?.timeLimit);
  }, [selectedQuizData]);

  useEffect(() => {
    if (!timeLeft) return;
    const interval = setInterval(() => {
      if (timeLeft > 0) {
        settimeLeft((p) => p - 1);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [timeLeft]);

  // submitting quiz when times up
  useEffect(() => {
    if (timeLeft == 0) {
      handleSubmitQuiz();
    }
  }, [timeLeft]);

  // Timer Effect create
  // useEffect(() => {
  //   if (timeLeft?.min > 0 || timeLeft?.sec > 0) {
  //     setInterval(() => {
  //       if (timeLeft.sec > 0) {
  //         settimeLeft((p) => ({
  //           min: p.min,
  //           sec: p.sec - 1,
  //         }));
  //       } else {
  //         settimeLeft((p) => ({
  //           min: p.min - 1,
  //           sec: 60,
  //         }));
  //       }
  //     }, 1000);
  //   }
  // }, [currentQuestion]);

  const handleAnswerSelect = (questionId, answer) => {
    setStudentAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  useEffect(() => {
    console.log(studentAnswers);
  }, [studentAnswers]);

  const handleCodeChange = (questionId, code) => {
    setStudentAnswers((prev) => ({
      ...prev,
      [questionId]: code,
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < selectedQuizData?.questions?.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleSubmitQuiz = async () => {
    try {
      console.log(studentAnswers);
      setisSubmitingQuiz(true);

      const payload = {
        userId: user?._id,
        quizId: selectedQuizData?._id,
        studentAnswers,
        quiz: selectedQuizData,
        time: {
          totalQuizTime: selectedQuizData?.timeLimit,
          timeLeft: timeLeft,
        },
      };
      const res = await axios.post(
        "http://localhost:8888/api/ai/quiz-check",
        payload
      );

      // setresults({ totalScore, correctAnswers, percentage, passed });

      setresults(res?.data?.result);
    } catch (error) {
      console.log(error.message);
    } finally {
      setisSubmitingQuiz(false);
    }
  };

  // const calculateResults = () => {
  //   // Calculate score based on correct answers
  //   let totalScore = 0;
  //   let correctAnswers = 0;

  //   selectedQuizData?.questions?.forEach((q) => {
  //     const studentAnswer = studentAnswers[q.id];
  //     let isCorrect = false;

  //     if (q.type === "mcq" || q.type === "true-false") {
  //       isCorrect = studentAnswer === q.correctAnswer;
  //     } else if (q.type === "short-answer") {
  //       // Simple comparison for demo - in real app would be more sophisticated
  //       isCorrect = studentAnswer
  //         ?.toLowerCase()
  //         .includes(q.correctAnswer?.toLowerCase());
  //     } else if (q.type === "fill-blanks") {
  //       isCorrect = studentAnswer?.every(
  //         (blank, index) =>
  //           blank.answer.toLowerCase() === q.blanks[index].correct.toLowerCase()
  //       );
  //     } else if (q.type === "matching") {
  //       const studentMatches = studentAnswers[q.id];
  //       isCorrect = Object.keys(studentMatches).every(
  //         (key) => studentMatches[key] === q.correctMatches[key]
  //       );
  //     }

  //     if (isCorrect) {
  //       totalScore += q.marks;
  //       correctAnswers++;
  //     }
  //   });

  //   return {
  //     totalScore,
  //     correctAnswers,
  //     percentage: (totalScore / selectedQuizData.totalMarks) * 100,
  //     passed: totalScore >= selectedQuizData.passingMarks,
  //   };
  // };

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

  const currentQuestion = selectedQuizData?.questions[currentQuestionIndex];
  // const results = showResults ? calculateResults() : null;

  return (
    <ResponsiveContainer>
      <div className="min-h-screen relative w-full flex bg-gray-900">
        {results && (
          <QuizResultPage
            setselectedQuizData={setselectedQuizData}
            setresults={setresults}
            result={results}
          />
        )}
        {!results && (
          <>
            {loadingQuizes && (
              <div className="flex w-full flex-col gap-2 h-min justify-center items-center p-16">
                <div className="rounded-full h-8 w-8 border-l-2 border-r-2 border-b-2 animate-spin"></div>
                <p className="text-white font-semibold animate-pulse">
                  {" "}
                  Fetching...
                </p>
              </div>
            )}

            {!selectedQuizData && !loadingQuizes && (
              <CompactQuizBoxes
                setselectedQuizData={setselectedQuizData}
                quizzes={allQuizes}
              />
            )}

            {!loadingQuizes && selectedQuizData && (
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
                          {selectedQuizData.title}
                        </div>
                      </div>
                      <p className="text-gray-300 font-semibold mt-2 max-w-3xl">
                        {selectedQuizData.description}
                      </p>
                    </div>

                    {/* <div className="flex items-center gap-4">
                  <button className="p-2 px-4 rounded-lg bg-dark-navy text-white font-semibold hover:bg-gray-700 transition-colors flex items-center gap-2">
                    <Edit2 className="h-4 w-4" />
                    Edit Quiz
                  </button>
                  <button className="p-2 px-4 rounded-lg bg-teal text-white font-semibold hover:bg-teal-dark transition-colors flex items-center gap-2">
                    <Share2 className="h-4 w-4" />
                    Share
                  </button>
                </div> */}
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
                        {/* <div className="flex items-center justify-between">
                      <span className="text-gray-400">Created by</span>
                      <span className="text-white font-semibold">
                        {selectedQuizData?.createdBy}
                      </span>
                    </div> */}

                        <div className="flex items-center justify-between">
                          <span className="text-gray-400">Difficulty</span>
                          <span className="px-3 py-1 bg-purple-900 text-purple-300 rounded-full text-sm font-semibold">
                            {selectedQuizData.difficulty}
                          </span>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-gray-400">Topic</span>
                          <span className="text-white font-semibold">
                            {selectedQuizData?.topic}
                          </span>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-gray-400">Total Marks</span>
                          <span className="text-teal font-bold">
                            {selectedQuizData?.totalMarks}
                          </span>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-gray-400">Passing Marks</span>
                          <span className="text-teal font-bold">
                            {Math.ceil(selectedQuizData?.totalMarks * 0.6)}
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
                      </div>

                      <div className="text-center">
                        <div
                          className={`text-5xl font-bold mb-2 ${
                            timeLeft < 300
                              ? "text-red-400 animate-pulse"
                              : "text-white"
                          }`}
                        >
                          {formatTime(timeLeft)}
                        </div>
                        <div className="text-gray-400 text-sm">
                          Minutes : Seconds
                        </div>
                      </div>

                      <div className="mt-6">
                        <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-teal transition-all duration-1000"
                            // style={{
                            //   width: `${
                            //     (timeLeft / (selectedQuizData?.timeLimit * 60)) *
                            //     100
                            //   }%`,
                            // }}
                            style={{
                              width: `${
                                (timeLeft / selectedQuizData?.timeLimit) * 100
                              }%`,
                            }}
                          ></div>
                        </div>
                        <div className="flex justify-between text-sm text-gray-400 mt-2">
                          {/* <span>
                          0 min 
                        </span>
                        <span>
                          {Math.floor(selectedQuizData?.timeLimit / 60)} min{" "}
                          {selectedQuizData?.timeLimit % 60} sec
                        </span> */}
                        </div>
                      </div>
                    </div>

                    {/* Question Navigation */}
                    <div className="bg-dark-navy rounded-2xl border border-gray-700 p-6">
                      <h3 className="text-xl font-bold text-white mb-4">
                        Questions
                      </h3>

                      <div className="grid grid-cols-4 gap-2">
                        {selectedQuizData?.questions?.map((q, index) => (
                          <button
                            key={q.id}
                            onClick={() => setCurrentQuestionIndex(index)}
                            className={`aspect-square rounded-lg flex flex-col items-center justify-center transition-all ${
                              currentQuestionIndex === index
                                ? "bg-teal text-white scale-105"
                                : studentAnswers[q.id] &&
                                  studentAnswers[q.id] !== ""
                                ? "bg-purple-600 text-white"
                                : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                            }`}
                          >
                            <span className="font-bold">{index + 1}</span>
                            {studentAnswers[q.id] &&
                              studentAnswers[q.id] !== "" && (
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
                          <span className="text-sm text-gray-400">
                            Answered
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-gray-800 rounded"></div>
                          <span className="text-sm text-gray-400">
                            Unanswered
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Quick Actions */}
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
                                {selectedQuizData?.questions?.length}
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
                                    : ""}
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
                                      selectedQuizData?.questions?.length) *
                                    100
                                  }%`,
                                }}
                              ></div>
                            </div>
                          </div>
                          <span className="text-sm text-gray-400">
                            {currentQuestionIndex + 1}/
                            {selectedQuizData?.questions.length}
                          </span>
                        </div>
                      </div>

                      {/* Question Body */}
                      <div className="p-6">
                        <div className="mb-6">
                          <h4 className="text-lg font-semibold text-white mb-4">
                            {currentQuestion.question}
                          </h4>

                          {currentQuestion?.type === "code" && (
                            <div className="bg-gray-900 p-4 rounded-lg border border-gray-700 mb-4">
                              <pre className="text-gray-300 font-mono text-sm whitespace-pre-wrap">
                                {currentQuestion?.codeTemplate}
                              </pre>
                            </div>
                          )}
                        </div>

                        {/* Answer Input */}

                        <div className="space-y-4">
                          {/* MCQ Options */}
                          {(currentQuestion.type === "mcq" ||
                            currentQuestion.type === "true-false") && (
                            <div className="space-y-3">
                              {currentQuestion?.options?.map((option) => (
                                <div
                                  key={option.id}
                                  onClick={() =>
                                    handleAnswerSelect(
                                      currentQuestion.id,
                                      option.id
                                    )
                                  }
                                  className={`p-4 rounded-lg border cursor-pointer transition-all ${
                                    studentAnswers[currentQuestion.id] ===
                                    option.id
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
                                    <span className="text-white">
                                      {option.text}
                                    </span>
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

                              {currentQuestion?.testCases && (
                                <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
                                  <h5 className="font-semibold text-white mb-3">
                                    Test Cases
                                  </h5>
                                  <div className="space-y-2">
                                    {currentQuestion?.testCases?.map(
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
                                handleAnswerSelect(
                                  currentQuestion.id,
                                  e.target.value
                                )
                              }
                              className="w-full h-32 p-4 bg-gray-900 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal resize-none"
                              placeholder="Type your answer here..."
                            />
                          )}

                          {/* Fill in Blanks */}
                          {currentQuestion.type === "fill-blanks" && (
                            <div className="space-y-3">
                              <div className="text-white mb-4">
                                {/* {currentQuestion.question
                                  .split("______")
                                  .map((part, index, array) => (
                                    <span key={index}>
                                      {part}
                                      {index < array.length - 1 && (
                                        <input
                                          type="text"
                                          value={
                                            studentAnswers[currentQuestion.id][
                                              index
                                            ]?.answer || ""
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
                                  ))} */}

                                <textarea
                                  value={studentAnswers[currentQuestion.id]}
                                  onChange={(e) =>
                                    handleAnswerSelect(
                                      currentQuestion.id,
                                      e.target.value
                                    )
                                  }
                                  className="w-full  p-4 bg-gray-900 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal resize-none"
                                  placeholder="Type your answer here..."
                                />
                              </div>
                            </div>
                          )}
                        </div>
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
                            <button
                              onClick={() =>
                                handleAnswerSelect(currentQuestion.id, "")
                              }
                              className="p-2 px-4 rounded-lg bg-gray-800 text-gray-300 font-semibold hover:bg-gray-700 transition-colors"
                            >
                              Clear Answer
                            </button>

                            <button
                              disabled={isSubmitingQuiz}
                              onClick={
                                currentQuestionIndex ===
                                selectedQuizData?.questions.length - 1
                                  ? handleSubmitQuiz
                                  : handleNextQuestion
                              }
                              // disabled={
                              //   currentQuestionIndex ===
                              //   selectedQuizData?.questions.length - 1
                              // }
                              className={`${
                                isSubmitingQuiz ? "bg-gray-500" : "bg-teal"
                              } p-2 px-6 rounded-lg  text-white font-semibold hover:bg-teal-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2`}
                            >
                              {currentQuestionIndex ===
                              selectedQuizData?.questions.length - 1 ? (
                                isSubmitingQuiz ? (
                                  <>
                                    <LoadingSpinner></LoadingSpinner>
                                  </>
                                ) : (
                                  "Finish"
                                )
                              ) : (
                                "Next"
                              )}
                              <ChevronRight className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Quiz Instructions */}

                    <div className="mt-6 bg-dark-navy rounded-2xl border border-gray-700 p-6">
                      <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <AlertCircle className="h-5 w-5 text-yellow-400" />
                        Quiz Instructions
                      </h3>
                      <ul className="space-y-2">
                        {/* {selectedQuizData?.instructions?.map(
                        (instruction, index) => ( */}
                        <li className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-teal rounded-full mt-2"></div>
                          <span className="text-gray-300">
                            This quiz contains{" "}
                            {selectedQuizData?.questions?.length} questions
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-teal rounded-full mt-2"></div>
                          <span className="text-gray-300">
                            Total time allotted is{" "}
                            {Math.floor(selectedQuizData?.timeLimit / 60)}{" "}
                            minutes {selectedQuizData?.timeLimit % 60} seconds
                          </span>
                        </li>
                        {/* <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-teal rounded-full mt-2"></div>
                        <span className="text-gray-300">
                          Each question carries equal marks
                        </span>
                      </li> */}
                        <li className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-teal rounded-full mt-2"></div>
                          <span className="text-gray-300">
                            No negative marking for wrong answers
                          </span>
                        </li>
                        {/* <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-teal rounded-full mt-2"></div>
                        <span className="text-gray-300">
                          You cannot go back to previous questions
                        </span>
                      </li> */}
                        <li className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-teal rounded-full mt-2"></div>
                          <span className="text-gray-300">
                            Submit before time runs out
                          </span>
                        </li>

                        {/* )
                      )} */}
                      </ul>
                    </div>
                  </div>

                  {/* Right Column - Results & Analytics */}
                  <div className="lg:col-span-1 space-y-6">
                    {/* Results Summary */}

                    {/* Analytics Preview */}
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
                                Object?.values(studentAnswers)?.filter(
                                  (ans) =>
                                    ans &&
                                    ans !== "" &&
                                    (typeof ans !== "object" ||
                                      Object.keys(ans).length > 0)
                                ).length
                              }
                              /{selectedQuizData?.questions.length}
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
                                    selectedQuizData?.questions.length) *
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
                                  selectedQuizData?.questions.length) *
                                  100
                              )}
                              %
                            </div>
                            <div className="text-sm text-gray-400">
                              Completion
                            </div>
                          </div>
                          <div className="bg-gray-900 p-4 rounded-lg border border-gray-700 text-center">
                            <div className="text-2xl font-bold text-teal">
                              {Math.round(
                                (timeLeft / selectedQuizData?.timeLimit) * 100
                              )}
                              %
                            </div>
                            <div className="text-sm text-gray-400">
                              Time Left
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold text-white mb-3">
                            Question Types
                          </h4>
                          <div className="space-y-2">
                            {["mcq", "true-false", "code", "short-answer"]?.map(
                              (type) => {
                                const count =
                                  selectedQuizData?.questions.filter(
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

                    {/* Performance Stats */}
                    {/* <div className="bg-dark-navy rounded-2xl border border-gray-700 p-6">
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <Award className="h-5 w-5 text-yellow-400" />
                    Performance
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-gray-400">Accuracy</span>
                        <span className="text-white font-semibold">
                          {showResults
                            ? `${results.percentage.toFixed(1)}%`
                            : "--"}
                        </span>
                      </div>
                      <div className="h-2 bg-gray-700 rounded-full">
                        <div
                          className="h-full bg-teal rounded-full"
                          style={{
                            width: showResults
                              ? `${results.percentage}%`
                              : "0%",
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
                                (selectedQuizData?.questions.length /
                                  (selectedQuizData?.timeLimit * 60 -
                                    timeLeft)) *
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
                </div> */}
                    <div className="bg-dark-navy rounded-2xl border border-gray-700 p-6">
                      <h3 className="text-xl font-bold text-white mb-4">
                        Actions
                      </h3>

                      <div className="space-y-3">
                        <button
                          disabled={isSubmitingQuiz}
                          onClick={handleSubmitQuiz}
                          className={`w-full ${
                            isSubmitingQuiz ? "bg-gray-600" : "bg-gradient-to-r"
                          }  p-3 flex justify-center items-center rounded-lg  from-teal to-purple-600 text-white font-semibold hover:shadow-lg transition-all `}
                        >
                          {isSubmitingQuiz ? (
                            <>
                              <LoadingSpinner></LoadingSpinner>
                            </>
                          ) : (
                            "Submit Quiz"
                          )}
                        </button>

                        {/* <button className="w-full p-3 rounded-lg bg-gray-800 hover:bg-gray-700 text-white font-semibold transition-colors flex items-center justify-center gap-2">
                        <Download className="h-4 w-4" />
                        Save Progress
                      </button>

                      <button className="w-full p-3 rounded-lg bg-gray-800 hover:bg-gray-700 text-white font-semibold transition-colors flex items-center justify-center gap-2">
                        <Printer className="h-4 w-4" />
                        Print Quiz
                      </button> */}
                      </div>
                    </div>

                    {/* Share Options */}
                    {/* {showResults && (
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
                )} */}
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </ResponsiveContainer>
  );
};

export default QuizPage;

const CompactQuizBoxes = ({ quizzes = [], setselectedQuizData }) => {
  // const generateQuizzes = () => {
  //   return Array.from({ length: 12 }, (_, i) => ({
  //     id: `quiz_${i + 1}`,
  //     title: `Quiz ${i + 1}: Programming Challenge`,
  //     questions: [5, 10, 15, 20][i % 4],
  //     marks: [50, 100, 150, 200][i % 4],
  //     time: [15, 30, 45, 60][i % 4],
  //     participants: Math.floor(Math.random() * 200) + 50,
  //     rating: (4.0 + Math.random() * 1.0).toFixed(1),
  //   }));
  // };

  const getTotalMarks = (selectedQuizData) => {
    const totalMarks = selectedQuizData?.questions?.reduce(
      (total, val) => (total += val.marks),
      0
    );
    return totalMarks;
  };

  // const quizList = quizzes.length > 0 ? quizzes : generateQuizzes();

  return (
    <div className="w-full h-[90vh] overflow-y-auto px-6 pb-12 scrollbar">
      <div className="w-full overflow-y-auto my-8">
        <div className="flex justify-between items-start">
          <div>
            <div className="text-4xl font-bold text-white flex items-center gap-3">
              <BadgeQuestionMark className="text-teal" />
              Quizzes of Current Session
            </div>
            <p className="text-gray-300 font-semibold mt-2">
              Pick a quiz from the list below and begin answering to test your
              knowledge!
            </p>
          </div>
        </div>
      </div>
      <div className="   grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full h-min gap-6  ">
        {quizzes?.map((quiz) => (
          <div
            key={quiz?.id}
            className="bg-dark-navy h-min col-span-1 border border-gray-800 rounded-xl p-5 hover:border-teal transition-all duration-300 group"
          >
            {/* Icon and Title */}
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-gradient-to-r from-teal to-purple-600 rounded-lg">
                <Target className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-white font-bold group-hover:text-teal transition-colors line-clamp-1">
                {quiz?.title}
              </h3>
            </div>

            {/* Stats */}
            <div className="space-y-3 mb-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Hash className="h-4 w-4 text-gray-400" />
                  <span className="text-white">
                    {quiz?.questions?.length} Questions
                  </span>
                </div>
                <div className="text-white font-bold">
                  {getTotalMarks(quiz)} Marks
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <span className="text-white">
                    {Math.floor(quiz?.timeLimit / 60)} min{" "}
                    {quiz?.timeLimit % 60 > 0 ? (
                      `${quiz?.timeLimit % 60} sec`
                    ) : (
                      <></>
                    )}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-purple-400" />
                  <span className="text-white">{quiz?.participants}</span>
                </div>
              </div>

              {/* <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="text-white">{quiz?.rating}</span>
              <span className="text-gray-500 text-sm">rating</span>
            </div> */}
            </div>

            {/* Start Button */}
            <button
              onClick={() => setselectedQuizData(quiz)}
              className="w-full py-3 bg-gradient-to-r from-teal to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2 group-hover:scale-[1.02]"
            >
              <Play className="h-4 w-4" />
              Start Now
            </button>
          </div>
        ))}

        {!quizzes?.length && (
          <div className="flex w-full col-span-3 justify-center items-center">
            {/* <div className="flex rounded-lg border border-gray-700 bg-slate-900 p-12"> */}
              <p className="text-gray-500 mt-10 ">No Quiz Found!</p>
            {/* </div> */}
          </div>
        )}
      </div>
    </div>
  );
};
